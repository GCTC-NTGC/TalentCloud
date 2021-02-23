import React, { useMemo, useState } from "react";
import { useIntl, defineMessages } from "react-intl";
import {
  Experience,
  ExperienceSkill,
  Skill,
  SkillSkillCategory,
  SkillCategory,
} from "../../../models/types";
import { getExperiencesOfSkill } from "../../Application/helpers";
import { localizeFieldNonNull, getLocale } from "../../../helpers/localize";
import { toIdMap } from "../../../helpers/queries";
import SkillAccordion from "./Accordion";
import { sortByLocalizedName } from "../../../helpers/sorting";

const messages = defineMessages({
  group: {
    id: "applicantProfile.skills.list.group",
    defaultMessage: "Group",
    description: "Text for the 'Group' option on the sort toggle UI.",
  },
  alpha: {
    id: "applicantProfile.skills.list.alpha",
    defaultMessage: "A-Z",
    description: "Text for the 'A-Z' option on the sort toggle UI.",
  },
  journey: {
    id: "applicantProfile.skills.list.journey",
    defaultMessage: "Journey",
    description: "Text for the 'Journey' option on the sort toggle UI.",
  },
  sortBy: {
    id: "applicantProfile.skills.list.sortBy",
    defaultMessage: "Sort By:",
    description: "Text for the label on the sort toggle UI.",
  },
});

enum SortTypes {
  Group = "group",
  Alpha = "alpha",
  // Journey = "journey", Future enhancement according to designs.
}
interface SortButtonProps {
  text: string;
  active: boolean;
  handleClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  text,
  active,
  handleClick,
}) => (
  <button
    data-h2-button={`${active ? "theme-1" : "black"}, square, medium, clear`}
    type="button"
    onClick={handleClick}
  >
    <span data-h2-button-label>{text}</span>
  </button>
);
interface ListProps {
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
  skillCategories: SkillCategory[];
  skillSkillCategories: SkillSkillCategory[];
  skills: Skill[];
  applicantId: number;
  handleDeleteSkill: (skillId: number) => Promise<void>;
}

const List: React.FC<ListProps> = ({
  experiences,
  experienceSkills,
  skillCategories,
  skillSkillCategories,
  skills,
  applicantId,
  handleDeleteSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Group);

  // Groups parent categories with the list of skills that belong to them or any of their subcategories.
  const skillCategoriesGrouped: {
    category: SkillCategory;
    skills: Skill[];
  }[] = useMemo(() => {
    const idToSkill: Map<number, Skill> = toIdMap(skills);
    const idToSkillCategory: Map<number, SkillCategory> = toIdMap(
      skillCategories,
    );
    const categoryToSkills: Map<
      SkillCategory,
      Skill[]
    > = skillSkillCategories.reduce(
      (m: Map<SkillCategory, Skill[]>, skillSkillCategory) => {
        const skill = idToSkill.get(skillSkillCategory.skill_id);
        const category = idToSkillCategory.get(
          skillSkillCategory.skill_category_id,
        );
        if (skill && category) {
          if (!m.has(category)) {
            m.set(category, []);
          }
          m.get(category)?.push(skill);
        }
        return m;
      },
      new Map(),
    );
    const parentToSubCategories: Map<
      SkillCategory,
      SkillCategory[]
    > = skillCategories.reduce(
      (map: Map<SkillCategory, SkillCategory[]>, skillCategory) => {
        if (skillCategory.parent_id === null) {
          const parent = skillCategory;
          if (parent && !map.has(parent)) {
            map.set(parent, []);
          }
        } else {
          const parent = idToSkillCategory.get(skillCategory.parent_id);
          const subCategory = skillCategory;
          if (parent && subCategory) {
            if (!map.has(parent)) {
              map.set(parent, []);
            }
            map.get(parent)?.push(subCategory);
          }
        }
        return map;
      },
      new Map(),
    );

    // TODO: Do we want to sort these in any particular way?
    const parentCategories = Array.from(parentToSubCategories.keys());
    return parentCategories.map((parent) => {
      const subCategories = parentToSubCategories.get(parent) ?? [];
      return {
        category: parent,
        skills: [
          ...(categoryToSkills.get(parent) ?? []),
          ...subCategories.flatMap(
            (subCategory) => categoryToSkills.get(subCategory) ?? [],
          ),
        ],
      };
    });
  }, [skills, skillCategories, skillSkillCategories]);

  return (
    <div>
      <p data-h2-margin="b(bottom, .5)">
        {intl.formatMessage(messages.sortBy)}{" "}
        <SortButton
          text={intl.formatMessage(messages[SortTypes.Group])}
          active={sortType === SortTypes.Group}
          handleClick={() => setSortType(SortTypes.Group)}
        />{" "}
        <SortButton
          text={intl.formatMessage(messages[SortTypes.Alpha])}
          active={sortType === SortTypes.Alpha}
          handleClick={() => setSortType(SortTypes.Alpha)}
        />
      </p>
      {sortType === "group" &&
        skillCategoriesGrouped.map((group) => (
          <div key={group.category.id}>
            <h5 data-h2-margin="b(top, 1) b(bottom, .5)">
              {localizeFieldNonNull(locale, group.category, "name")}
            </h5>
            {group.skills
              .sort(sortByLocalizedName(locale))
              .map((skill: Skill) => {
                const experiencesOfSkill = getExperiencesOfSkill(
                  skill,
                  experienceSkills,
                );
                return (
                  <SkillAccordion
                    key={`skill-accordion-group-${skill.id}`}
                    skill={skill}
                    experiences={experiences}
                    experiencesOfSkill={experiencesOfSkill}
                    applicantId={applicantId}
                    handleDeleteSkill={handleDeleteSkill}
                  />
                );
              })}
          </div>
        ))}
      {sortType === "alpha" &&
        skills.sort(sortByLocalizedName(locale)).map((skill: Skill) => {
          const experiencesOfSkill = getExperiencesOfSkill(
            skill,
            experienceSkills,
          );
          return (
            <SkillAccordion
              key={`skill-accordion-alpha-${skill.id}`}
              skill={skill}
              experiences={experiences}
              experiencesOfSkill={experiencesOfSkill}
              applicantId={applicantId}
              handleDeleteSkill={handleDeleteSkill}
            />
          );
        })}
    </div>
  );
};

export default List;

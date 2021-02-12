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
import { hasKey, sortLocalizedAlphabetical } from "../../../helpers/queries";
import { localizedFieldNonNull } from "../../../models/app";
import SkillAccordion from "./Accordion";

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
}

const List: React.FC<ListProps> = ({
  experiences,
  experienceSkills,
  skillCategories,
  skillSkillCategories,
  skills,
  applicantId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Group);

  const skillCategoriesGroupedObject = useMemo(
    () =>
      skillCategories
        .filter((skillCategory) => skillCategory.depth !== 1) // Filter out non-top-level categories.
        .reduce(
          (
            accumulator: {
              [catId: number]: {
                title: localizedFieldNonNull | undefined;
                skills: Skill[];
              };
            },
            currentCategory,
          ) => {
            if (currentCategory.parent_id !== null) {
              // Ensure there is a parent category set.
              const titleValue = skillCategories
                .filter((skillCategory) => skillCategory.depth === 1)
                .find((x) => x.id === currentCategory.parent_id)?.name;

              const skillsValue = skills.filter(
                (currentSkill) =>
                  currentSkill.id ===
                  skillSkillCategories.find(
                    (y) =>
                      y.skill_id === currentSkill.id &&
                      y.skill_category_id === currentCategory.id,
                  )?.skill_id,
              );

              if (hasKey(accumulator, currentCategory.parent_id)) {
                accumulator[currentCategory.parent_id].skills = [
                  ...skillsValue,
                  ...accumulator[currentCategory.parent_id].skills,
                ]; // Add child category to existing parent category group.
              } else {
                accumulator[currentCategory.parent_id] = {
                  title: titleValue,
                  skills: skillsValue,
                }; // Add child category to new parent category group.
              }
            }
            return accumulator;
          },
          [],
        ),
    [skillSkillCategories, skillCategories, skills],
  );

  const skillCategoriesGrouped = Object.keys(skillCategoriesGroupedObject).map(
    (z) => {
      if (
        skillCategoriesGroupedObject[z] !== null &&
        (!skillCategoriesGroupedObject[z].skills ||
          skillCategoriesGroupedObject[z].skills.length > 0)
      ) {
        return skillCategoriesGroupedObject[z]; // Return only non-empty objects and groups that have skills.
      }
      return false;
    },
  );

  const deleteSkill = (): Promise<void> => {
    return Promise.resolve();
  };

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
        skillCategoriesGrouped.map((category) => (
          <div key={category.catId}>
            <h5 data-h2-margin="b(top, 1) b(bottom, .5)">
              {localizeFieldNonNull(locale, category, "title")}
            </h5>
            {category.skills
              .sort(sortLocalizedAlphabetical(locale))
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
                    handleDeleteSkill={deleteSkill}
                  />
                );
              })}
          </div>
        ))}
      {sortType === "alpha" &&
        skills.sort(sortLocalizedAlphabetical(locale)).map((skill: Skill) => {
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
              handleDeleteSkill={deleteSkill}
            />
          );
        })}
    </div>
  );
};

export default List;

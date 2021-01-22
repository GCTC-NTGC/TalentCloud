import React, { useState } from "react";
import { useIntl, defineMessages } from "react-intl";
import {
  Experience,
  ExperienceSkill,
  Skill,
  SkillSkillCategory,
  SkillCategory,
} from "../../../models/types";
import {
  getExperiencesOfSkill,
  getExperienceOfExperienceSkill,
} from "../../Application/helpers";
import { localizeFieldNonNull, getLocale } from "../../../helpers/localize";
import { sortLocalizedAlphabetical } from "../../../helpers/queries";
import Accordion from "./Accordion";

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
  experiencesLabel: {
    id: "applicantProfile,skills.list.experiencesLabel",
    defaultMessage:
      "{experienceCount, plural, =0 {No Experiences} one {1 Experience} other {{experienceCount Experiences}}}",
    description:
      "Subheading that displays the count of experiences on each accordion.",
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
}

const List: React.FC<ListProps> = ({
  experiences,
  experienceSkills,
  skillCategories,
  skillSkillCategories,
  skills,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Group);

  return (
    <div>
      <p>
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
      {skillCategories.map((skillCategory: SkillCategory) => (
        <div key={skillCategory.id}>
          <h2>{localizeFieldNonNull(locale, skillCategory, "name")}</h2>
          {skills
            .sort(sortLocalizedAlphabetical(locale))
            .map((skill: Skill) => {
              const experienceCount = getExperiencesOfSkill(
                skill,
                experienceSkills,
              ).length;

              return (
                <Accordion
                  key={skill.id}
                  title={
                    <p data-h2-font-size="small">
                      {localizeFieldNonNull(locale, skill, "name")}
                    </p>
                  }
                  subtitle={
                    <p data-h2-font-size="small">
                      {intl.formatMessage(messages.experiencesLabel, {
                        experienceCount,
                      })}
                    </p>
                  }
                >
                  <div>Content</div>
                </Accordion>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default List;

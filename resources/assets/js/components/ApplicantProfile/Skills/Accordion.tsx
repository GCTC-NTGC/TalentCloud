import React from "react";
import { useIntl, defineMessages } from "react-intl";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { Skill, Experience, ExperienceSkill } from "../../../models/types";
import { getExperienceOfExperienceSkill } from "../../Application/helpers";
import Accordion from "../../H2Components/Accordion";

const messages = defineMessages({
  experiencesLabel: {
    id: "applicantProfile.skills.list.experiencesLabel",
    defaultMessage:
      "{experienceCount, plural, =0 {No Experiences} one {1 Experience} other {{experienceCount} Experiences}}",
    description:
      "Subheading that displays the count of experiences on each accordion.",
  },
  missingExperiences: {
    id: "applicantProfile.skills.list.missingExperiences",
    defaultMessage:
      "Go to My Experience section to add context to how you have used this skill.",
    description: "Text for accordion when no experiences within accordion.",
  },
  skillRemoveLabel: {
    id: "applicantProfile.skills.list.skillRemoveLabel",
    defaultMessage: "Remove Skill",
    description: "Text for the button to remove a skill on each accordion.",
  },
});

const getExperienceIcon = (type: string): string => {
  switch (type) {
    case "experience_award":
      return "fas fa-trophy";
    case "experience_community":
      return "fas fa-people-carry";
    case "experience_education":
      return "fas fa-book";
    case "experience_personal":
      return "fas fa-mountain";
    case "experience_work":
      return "fas fa-briefcase";
    default:
      return "";
  }
};
interface SkillAccordionProps {
  skill: Skill;
  experiences: Experience[];
  experiencesOfSkill: ExperienceSkill[];
}

export const SkillAccordion: React.FC<SkillAccordionProps> = ({
  skill,
  experiences,
  experiencesOfSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  return (
    <Accordion
      triggerPos="right"
      data-h2-card="white, round"
      data-h2-margin="b(bottom, .25)"
    >
      <Accordion.Btn>
        <div data-h2-grid="b(middle, contained, flush, 1)">
          <div
            data-h2-grid-item="b(1of2)"
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-align="b(left)"
          >
            <div
              data-h2-grid-content
              data-h2-font-color="b(black)"
              data-h2-padding="b(left, .5)"
            >
              {localizeFieldNonNull(locale, skill, "name")}
            </div>
          </div>
          <div
            data-h2-grid-item="b(1of2)"
            data-h2-padding="b(all, .5) b(left, 1)"
            data-h2-align="b(center)"
          >
            <div
              data-h2-grid-content
              data-h2-font-color={
                experiencesOfSkill && experiencesOfSkill.length !== 0
                  ? "b(black)"
                  : "b(theme-1-light)"
              }
            >
              {intl.formatMessage(messages.experiencesLabel, {
                experienceCount:
                  experiencesOfSkill && experiencesOfSkill.length,
              })}
            </div>
          </div>
        </div>
      </Accordion.Btn>
      <Accordion.Content data-h2-border="b(gray-2, top, solid, thin)">
        <div>
          <p
            data-h2-focus
            data-h2-font-color="b(black)"
            data-h2-padding="b(all, .5) b(left, 1)"
          >
            {localizeFieldNonNull(locale, skill, "description")}
          </p>
          <p data-h2-margin="b(top, 1)" data-h2-padding="b(all, .5) b(left, 1)">
            {experiencesOfSkill && experiencesOfSkill.length !== 0 ? (
              experiencesOfSkill.map((experienceSkill) => {
                const currentExperience = getExperienceOfExperienceSkill(
                  experienceSkill,
                  experiences,
                );
                const currentExperienceTitle: string =
                  currentExperience?.type !== "experience_education"
                    ? `${currentExperience?.title}${
                        currentExperience?.group
                          ? `- ${currentExperience?.group}`
                          : ""
                      }`
                    : `${currentExperience?.area_of_study} - ${currentExperience?.institution}`;

                return (
                  <button
                    key={`experience-${currentExperience?.id}`}
                    type="button"
                    data-h2-display="b(block)"
                    data-h2-button="black, round, medium, clear"
                  >
                    <i
                      className={getExperienceIcon(
                        experienceSkill.experience_type,
                      )}
                      data-h2-font-color="b(theme-1)"
                      data-h2-padding="b(right, .5)"
                    />
                    <span
                      data-h2-button-label
                      data-h2-font-style="b(underline)"
                    >
                      {currentExperienceTitle}
                    </span>
                  </button>
                );
              })
            ) : (
              <p
                data-h2-bg-color="b(gray-1, .5)"
                data-h2-align="b(center)"
                data-h2-padding="b(all, .5)"
                data-h2-font-color="b(theme-1)"
              >
                <a href="experience" data-h2-font-weight="b(600)">
                  {intl.formatMessage(messages.missingExperiences)}
                </a>
              </p>
            )}
          </p>
          <p data-h2-padding="b(all, 1) b(left, 1)">
            <button
              type="button"
              data-h2-display="b(block)"
              data-h2-button="gray-1, round, medium, solid"
            >
              <i
                className="fas fa-trash"
                data-h2-font-color="b(theme-1)"
                data-h2-padding="b(right, .5)"
              />
              <span data-h2-button-label data-h2-font-color="b(theme-1)">
                {intl.formatMessage(messages.skillRemoveLabel)}
              </span>
            </button>
          </p>
        </div>
      </Accordion.Content>
    </Accordion>
  );
};

export default SkillAccordion;

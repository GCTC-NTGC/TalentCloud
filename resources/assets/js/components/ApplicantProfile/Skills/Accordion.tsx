import React from "react";
import { useIntl, defineMessages } from "react-intl";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { getApplicantExperienceUrl } from "../../../helpers/routes";
import { Skill, Experience, ExperienceSkill } from "../../../models/types";
import { getExperienceOfExperienceSkill } from "../../Application/helpers";
import Accordion from "../../H2Components/Accordion";
import Dialog from "../../H2Components/Dialog";
import ExperienceAwardDetails from "../ExperienceDetails/ExperienceAwardDetails";
import ExperienceCommunityDetails from "../ExperienceDetails/ExperienceCommunityDetails";
import ExperienceEducationDetails from "../ExperienceDetails/ExperienceEducationDetails";
import ExperiencePersonalDetails from "../ExperienceDetails/ExperiencePersonalDetails";
import ExperienceWorkDetails from "../ExperienceDetails/ExperienceWorkDetails";

const messages = defineMessages({
  experiencesLabel: {
    id: "applicantProfile.skills.accordion.experiencesLabel",
    defaultMessage:
      "{experienceCount, plural, =0 {No Experiences} one {1 Experience} other {{experienceCount} Experiences}}",
    description:
      "Subheading that displays the count of experiences on each accordion.",
  },
  missingExperiences: {
    id: "applicantProfile.skills.accordion.missingExperiences",
    defaultMessage:
      "Go to {link} section to add context to how you have used this skill.",
    description: "Text for accordion when no experiences within accordion.",
  },
  missingExperiencesLinkText: {
    id: "applicantProfile.skills.accordion.missingExperiencesLinkText",
    defaultMessage: "My Experience",
    description: "Link text when no experiences within accordion.",
  },
  skillRemoveLabel: {
    id: "applicantProfile.skills.accordion.skillRemoveLabel",
    defaultMessage: "Remove Skill",
    description: "Text for the button to remove a skill on each accordion.",
  },
  skillRemoveDialogTitle: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogTitle",
    defaultMessage: "Remove Skill",
    description: "Text for title of dialog to remove a skill.",
  },
  skillRemoveDialogHeading: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogHeading",
    defaultMessage: "WARNING!",
    description: "Text for heading of dialog to remove a skill.",
  },
  skillRemoveDialogParagraph1: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogParagraph1",
    defaultMessage:
      "This skill is linked to one or more experiences. Deleting this skill from your profile will also remove it from your experiences.",
    description:
      "First section of text for content of dialog to remove a skill.",
  },
  skillRemoveDialogParagraph2: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogParagraph2",
    defaultMessage:
      "Are you sure you want to remove this skill from your profile?",
    description:
      "Second section of text for content of dialog to remove a skill.",
  },
  skillRemoveDialogActionConfirm: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogActionConfirm",
    defaultMessage: "Remove this skill from my profile",
    description:
      "Text for the button to confirm removal of a skill within the Dialog.",
  },
  skillRemoveDialogActionCancel: {
    id: "applicantProfile.skills.accordion.skillRemoveDialogActionCancel",
    defaultMessage: "Cancel",
    description:
      "Text for the button to cancel removal of a skill within the Dialog.",
  },
  educationExperienceTitle: {
    id: "applicantProfile.skills.accordion.educationExperienceTitle",
    defaultMessage: "Education",
    description: "Type of experience: Education Experience.",
  },
  workExperienceTitle: {
    id: "applicantProfile.skills.accordion.workExperienceTitle",
    defaultMessage: "Work Experience",
    description: "Type of experience: Work Experience.",
  },
  communityExperienceTitle: {
    id: "applicantProfile.skills.accordion.communityExperienceTitle",
    defaultMessage: "Community Experience",
    description: "Type of experience: Community Experience.",
  },
  personalExperienceTitle: {
    id: "applicantProfile.skills.accordion.personalExperienceTitle",
    defaultMessage: "Personal Experience",
    description: "Type of experience: Personal Experience.",
  },
  awardExperienceTitle: {
    id: "applicantProfile.skills.accordion.awardExperienceTitle",
    defaultMessage: "Award",
    description: "Type of experience: Award Experience.",
  },
  skillExperienceDialogHeading: {
    id: "applicantProfile.skills.accordion.skillExperienceDialogHeading",
    defaultMessage: "Details of this experience",
    description: "Text for heading of dialog to edit a skill.",
  },
  skillExperienceDialogActionEdit: {
    id: "applicantProfile.skills.accordion.skillExperienceDialogActionEdit",
    defaultMessage: "Edit this experience",
    description:
      "Text for the button to edit an experience on profile within the Dialog.",
  },
  skillExperienceDialogActionClose: {
    id: "applicantProfile.skills.accordion.skillExperienceDialogActionClose",
    defaultMessage: "Close",
    description: "Text for the button to close dialog within the Dialog.",
  },
  skillExperienceDialogJustificationTitle: {
    id:
      "applicantProfile.skills.accordion.skillExperienceDialogJustificationTitle",
    defaultMessage:
      "How I used {skillName}{locationExists, plural, =0 {} one { at {locationTitle}}}:",
    description: "Text for the justification title within the Dialog.",
  },
  skillExperienceDialogJustificationMissing: {
    id:
      "applicantProfile.skills.accordion.skillExperienceDialogJustificationMissing",
    defaultMessage:
      "You haven't written an explanation of how you used this skill during this experience.",
    description: "Text for missing justification within the Dialog.",
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

const getExperienceDialogTitleKey = (type: string): string => {
  switch (type) {
    case "experience_award":
      return "awardExperienceTitle";
    case "experience_community":
      return "communityExperienceTitle";
    case "experience_education":
      return "educationExperienceTitle";
    case "experience_personal":
      return "personalExperienceTitle";
    case "experience_work":
      return "workExperienceTitle";
    default:
      return "";
  }
};

const getExperienceTitle = (experience: Experience): string => {
  switch (experience.type) {
    case "experience_award":
      return experience.title;
    case "experience_community":
      return experience.title;
    case "experience_education":
      return `${experience.area_of_study} - ${experience.institution}`;
    case "experience_personal":
      return experience.title;
    case "experience_work":
      return `${experience.title} - ${experience.group}`;
    default:
      return "";
  }
};

const getExperienceLocationTitle = (experience: Experience | null): string => {
  switch (experience?.type) {
    case "experience_award":
      return experience.issued_by;
    case "experience_community":
      return experience.group;
    case "experience_education":
      return experience.institution;
    case "experience_personal":
      return "";
    case "experience_work":
      return experience.organization;
    default:
      return "";
  }
};
interface SkillAccordionProps {
  skill: Skill;
  experiences: Experience[];
  experiencesOfSkill: ExperienceSkill[];
  applicantId: number;
  handleDeleteSkill: (skillId: number) => Promise<void>;
}

export const SkillAccordion: React.FC<SkillAccordionProps> = ({
  skill,
  experiences,
  experiencesOfSkill,
  applicantId,
  handleDeleteSkill,
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
          <div data-h2-padding="b(all, .5) b(left, 1)">
            {experiencesOfSkill &&
              experiencesOfSkill.length !== 0 &&
              experiencesOfSkill.map((experienceSkill) => {
                const currentExperience = getExperienceOfExperienceSkill(
                  experienceSkill,
                  experiences,
                );
                if (currentExperience === null) {
                  return null;
                }
                return (
                  <div key={experienceSkill.id}>
                    <Dialog.Trigger
                      id={`skill-experience-dialog-${currentExperience.type}-${currentExperience.id}`}
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
                        {getExperienceTitle(currentExperience)}
                      </span>
                    </Dialog.Trigger>
                    <Dialog
                      id={`skill-experience-dialog-${currentExperience.type}-${currentExperience.id}`}
                    >
                      <Dialog.Header
                        data-h2-grid="b(middle, contained, padded, .5)"
                        data-h2-bg-color="b(theme-1, 1)"
                      >
                        <div
                          data-h2-grid-item="b(1of2)"
                          data-h2-align="b(left)"
                        >
                          <Dialog.Title
                            data-h2-margin="b(all, .5) b(left, 1)"
                            data-h2-padding="b(left, .5)"
                            data-h2-font-color="b(white)"
                            data-h2-font-size="b(h5)"
                          >
                            <i
                              className={getExperienceIcon(
                                experienceSkill.experience_type,
                              )}
                              data-h2-font-color="b(white)"
                              data-h2-padding="b(right, .5)"
                            />
                            {intl.formatMessage(
                              messages[
                                getExperienceDialogTitleKey(
                                  currentExperience.type,
                                )
                              ],
                            )}
                          </Dialog.Title>
                        </div>
                        <div
                          data-h2-grid-item="b(1of2)"
                          data-h2-align="b(right)"
                        >
                          <Dialog.ActionBtn
                            data-h2-button="round, small, solid"
                            data-h2-margin="b(right, 1)"
                          >
                            <i
                              data-h2-font-size="b(normal)"
                              data-h2-font-color="b(white)"
                              className="fas fa-times"
                              aria-hidden="true"
                            />
                          </Dialog.ActionBtn>
                        </div>
                      </Dialog.Header>
                      <Dialog.Content data-h2-padding="b(tb, 1) b(rl, 2)">
                        <p
                          data-h2-padding="b(tb, .5)"
                          data-h2-font-size="b(h5)"
                          data-h2-font-color="b(theme-3)"
                        >
                          {intl.formatMessage(
                            messages.skillExperienceDialogHeading,
                          )}
                        </p>
                        <div data-h2-padding="b(tb, .5)">
                          {currentExperience.type === "experience_award" && (
                            <ExperienceAwardDetails
                              experience={currentExperience}
                            />
                          )}
                          {currentExperience.type ===
                            "experience_community" && (
                            <ExperienceCommunityDetails
                              experience={currentExperience}
                            />
                          )}
                          {currentExperience.type ===
                            "experience_education" && (
                            <ExperienceEducationDetails
                              experience={currentExperience}
                            />
                          )}
                          {currentExperience.type === "experience_personal" && (
                            <ExperiencePersonalDetails
                              experience={currentExperience}
                            />
                          )}
                          {currentExperience.type === "experience_work" && (
                            <ExperienceWorkDetails
                              experience={currentExperience}
                            />
                          )}
                        </div>
                        <p data-h2-padding="b(top, 2) b(bottom, .5)">
                          {intl.formatMessage(
                            messages.skillExperienceDialogJustificationTitle,
                            {
                              skillName: (
                                <strong>
                                  {localizeFieldNonNull(locale, skill, "name")}
                                </strong>
                              ),
                              locationExists:
                                getExperienceLocationTitle(
                                  currentExperience,
                                ) !== ""
                                  ? 1
                                  : 0,
                              locationTitle: (
                                <strong>
                                  {getExperienceLocationTitle(
                                    currentExperience,
                                  )}
                                </strong>
                              ),
                            },
                          )}
                        </p>
                        <p data-h2-padding="b(tb, .5)">
                          {experienceSkill.justification ? (
                            experienceSkill.justification
                          ) : (
                            <span data-h2-font-color="b(stop)">
                              {intl.formatMessage(
                                messages.skillExperienceDialogJustificationMissing,
                              )}
                            </span>
                          )}
                        </p>
                      </Dialog.Content>
                      <Dialog.Actions
                        data-h2-padding="b(tb, 1) b(rl, 2)"
                        data-h2-align="b(center)"
                        data-h2-grid="b(middle, expanded, flush, 1)"
                      >
                        <div
                          data-h2-grid-item="b(1of2)"
                          data-h2-align="b(left)"
                        >
                          <div data-h2-grid-content>
                            <p>
                              <a
                                href={`${`${getApplicantExperienceUrl(
                                  locale,
                                  applicantId,
                                )}#${currentExperience?.type}`}_${
                                  currentExperience?.id
                                }`}
                                title={intl.formatMessage(
                                  messages.skillExperienceDialogActionEdit,
                                )}
                                data-h2-font-weight="b(600)"
                              >
                                {intl.formatMessage(
                                  messages.skillExperienceDialogActionEdit,
                                )}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div
                          data-h2-grid-item="b(1of2)"
                          data-h2-align="b(right)"
                        >
                          <div data-h2-grid-content>
                            <Dialog.ActionBtn
                              buttonStyling="gray-4, round, solid"
                              data-h2-padding="b(rl, 2) b(tb, .5)"
                            >
                              {intl.formatMessage(
                                messages.skillExperienceDialogActionClose,
                              )}
                            </Dialog.ActionBtn>
                          </div>
                        </div>
                      </Dialog.Actions>
                    </Dialog>
                  </div>
                );
              })}
            {experiencesOfSkill && experiencesOfSkill.length !== 0 && (
              <div data-h2-padding="b(tb, .5)">
                <Dialog.Trigger
                  id={`skill-remove-dialog-${skill.id}`}
                  data-h2-button="gray-1, round, medium, solid"
                  data-h2-padding="b(all, .5)"
                  data-h2-margin="b(right, 1)"
                >
                  <i
                    className="fas fa-trash"
                    data-h2-font-color="b(theme-1)"
                    data-h2-padding="b(right, .5)"
                  />
                  <span data-h2-button-label data-h2-font-color="b(theme-1)">
                    {intl.formatMessage(messages.skillRemoveLabel)}
                  </span>
                </Dialog.Trigger>
                <Dialog id={`skill-remove-dialog-${skill.id}`}>
                  <Dialog.Header
                    data-h2-grid="b(middle, contained, padded, .5)"
                    data-h2-bg-color="b(theme-1, 1)"
                  >
                    <div data-h2-grid-item="b(1of2)" data-h2-align="b(left)">
                      <Dialog.Title
                        data-h2-margin="b(all, .5) b(left, 1)"
                        data-h2-padding="b(left, .5)"
                        data-h2-font-color="b(white)"
                        data-h2-font-size="b(h5)"
                      >
                        <i
                          className="fas fa-trash"
                          data-h2-font-color="b(white)"
                          data-h2-padding="b(right, .5)"
                        />
                        {intl.formatMessage(messages.skillRemoveDialogTitle)}
                      </Dialog.Title>
                    </div>
                    <div data-h2-grid-item="b(1of2)" data-h2-align="b(right)">
                      <Dialog.ActionBtn
                        data-h2-button="round, small, solid"
                        data-h2-margin="b(right, 1)"
                      >
                        <i
                          data-h2-font-size="b(normal)"
                          data-h2-font-color="b(white)"
                          className="fas fa-times"
                          aria-hidden="true"
                        />
                      </Dialog.ActionBtn>
                    </div>
                  </Dialog.Header>
                  <Dialog.Content>
                    <p
                      data-h2-padding="b(tb, 1), b(rl, 2)"
                      data-h2-font-size="b(h5)"
                      data-h2-font-color="b(theme-3)"
                    >
                      {intl.formatMessage(messages.skillRemoveDialogHeading)}
                    </p>
                    <p data-h2-padding="b(tb, .5), b(rl, 2)">
                      {intl.formatMessage(messages.skillRemoveDialogParagraph1)}
                      <br />
                      <br />
                      {intl.formatMessage(messages.skillRemoveDialogParagraph2)}
                    </p>
                  </Dialog.Content>
                  <Dialog.Actions
                    data-h2-padding="b(tb, 1) b(rl, 2)"
                    data-h2-align="b(center)"
                    data-h2-grid="b(middle, expanded, flush, 1)"
                  >
                    <div data-h2-grid-item="b(1of2)" data-h2-align="b(left)">
                      <div data-h2-grid-content>
                        <Dialog.ActionBtn
                          buttonStyling="gray-1, round, solid"
                          data-h2-padding="b(rl, 2) b(tb, .5)"
                          onClick={() => {
                            handleDeleteSkill(skill.id);
                          }}
                        >
                          {intl.formatMessage(
                            messages.skillRemoveDialogActionConfirm,
                          )}
                        </Dialog.ActionBtn>
                      </div>
                    </div>
                    <div data-h2-grid-item="b(1of2)" data-h2-align="b(right)">
                      <div data-h2-grid-content>
                        <Dialog.ActionBtn
                          buttonStyling="theme-1, round, solid"
                          data-h2-padding="b(rl, 2) b(tb, .5)"
                        >
                          {intl.formatMessage(
                            messages.skillRemoveDialogActionCancel,
                          )}
                        </Dialog.ActionBtn>
                      </div>
                    </div>
                  </Dialog.Actions>
                </Dialog>
              </div>
            )}
            {experiencesOfSkill && experiencesOfSkill.length === 0 && (
              <div>
                <p
                  data-h2-bg-color="b(gray-1, .5)"
                  data-h2-align="b(center)"
                  data-h2-padding="b(tb, .5)"
                  data-h2-font-color="b(theme-1)"
                >
                  {intl.formatMessage(messages.missingExperiences, {
                    link: (
                      <a
                        href={getApplicantExperienceUrl(locale, applicantId)}
                        title={intl.formatMessage(
                          messages.missingExperiencesLinkText,
                        )}
                        data-h2-font-weight="b(600)"
                      >
                        {intl.formatMessage(
                          messages.missingExperiencesLinkText,
                        )}
                      </a>
                    ),
                  })}
                </p>
                <p data-h2-padding="b(tb, .5)">
                  <button
                    type="button"
                    data-h2-display="b(block)"
                    data-h2-button="gray-1, round, medium, solid"
                    onClick={() => {
                      handleDeleteSkill(skill.id);
                    }}
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
            )}
          </div>
        </div>
      </Accordion.Content>
    </Accordion>
  );
};

export default SkillAccordion;

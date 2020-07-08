/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useState } from "react";
import {
  FormattedMessage,
  useIntl,
  defineMessages,
  IntlShape,
} from "react-intl";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { ExperienceSkill, Skill, Criteria } from "../../../models/types";
import { slugify } from "../../../helpers/routes";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { validationMessages } from "../../Form/Messages";
import {
  getExperienceHeading,
  getExperienceSubheading,
  getExperienceJustificationLabel,
} from "../../../models/localizedConstants";
import { getId, hasKey, mapToObject } from "../../../helpers/queries";
import { getSkillLevelName } from "../../../models/jobUtil";
import AlertWhenUnsaved from "../../Form/AlertWhenUnsaved";
import TextAreaInput from "../../Form/TextAreaInput";
import WordCounter from "../../WordCounter/WordCounter";
import { countNumberOfWords } from "../../WordCounter/helpers";

const displayMessages = defineMessages({
  sidebarLinkTitle: {
    id: "application.skills.sidebarLinkTitle",
    defaultMessage: "Go to this skill.",
    description: "Title attribute for sidebar links.",
  },
  accessibleAccordionButtonText: {
    id: "application.skills.accessibleAccordionButtonText",
    defaultMessage: "Click to view...",
    description: "Hidden accordion button text for accessibility.",
  },
  save: {
    id: "application.skills.saveButtonText",
    defaultMessage: "Save",
    description: "Button text for saving an experience skill justification.",
  },
  saved: {
    id: "application.skills.savedButtonText",
    defaultMessage: "Saved",
    description:
      "Button text for after an experience skill justification is saved.",
  },
  wordCountUnderMax: {
    id: "application.skills.wordCountUnderMax",
    defaultMessage: " words left.",
    description:
      "Message displayed next to word counter when user is under the maximum count.",
  },
  wordCountOverMax: {
    id: "application.skills.wordCountOverMax",
    defaultMessage: " words over the limit.",
    description:
      "Message displayed next to word counter when user is over the maximum count.",
  },
});

const JUSTIFICATION_WORD_LIMIT = 100;

enum IconStatus {
  COMPLETE = "fas fa-check-circle",
  DEFAULT = "far fa-circle",
  ERROR = "fas fa-exclamation-circle",
}

interface StatusIconProps {
  status: IconStatus;
  size: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size,
}): React.ReactElement => {
  let color: string;
  switch (status) {
    case IconStatus.COMPLETE:
      color = "go";
      break;
    case IconStatus.ERROR:
      color = "stop";
      break;
    default:
      color = "c1";
  }

  return <i className={status} data-c-color={color} data-c-font-size={size} />;
};

interface SidebarProps {
  menuSkills: string[];
  intl: IntlShape;
  status: {
    [k: string]: IconStatus;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ menuSkills, intl, status }) => {
  return (
    <div data-c-padding="top(3)" className="application-skill-navigation">
      <p
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(1)"
      >
        <FormattedMessage
          id="application.skills.sidebarHeading"
          defaultMessage="On this page:"
          description="Heading for the sidebar on the Skills page."
        />
      </p>
      <ul>
        {menuSkills.map((skillName: string) => (
          <li key={slugify(skillName)}>
            <StatusIcon status={status[slugify(skillName)]} size="" />
            <a
              href={`#${slugify(skillName)}`}
              title={intl.formatMessage(displayMessages.sidebarLinkTitle)}
            >
              {skillName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ExperienceAccordionProps {
  experienceSkill: ExperienceSkill;
  intl: IntlShape;
  status: {
    [k: string]: IconStatus;
  };
  skillName: string;
  handleUpdateExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<ExperienceSkill>;
  handleUpdateStatus: React.Dispatch<
    React.SetStateAction<{
      [k: string]: IconStatus;
    }>
  >;
}

interface ExperienceSkillFormValues {
  justification: string;
}

const ExperienceAccordion: React.FC<ExperienceAccordionProps> = ({
  experienceSkill,
  intl,
  status,
  skillName,
  handleUpdateExperienceJustification,
  handleUpdateStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let heading = "";
  let subHeading = "";
  let label = "";

  const initialValues: ExperienceSkillFormValues = {
    justification: experienceSkill.justification || "",
  };

  const experienceSkillSchema = Yup.object().shape({
    justification: Yup.string()
      .test(
        "wordCount",
        intl.formatMessage(validationMessages.overMaxWords, {
          numberOfWords: JUSTIFICATION_WORD_LIMIT,
        }),
        (value) => countNumberOfWords(value) <= JUSTIFICATION_WORD_LIMIT,
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  if (experienceSkill.experience !== null) {
    heading = getExperienceHeading(experienceSkill.experience, intl);
    subHeading = getExperienceSubheading(experienceSkill.experience, intl);
    label = getExperienceJustificationLabel(
      experienceSkill.experience,
      intl,
      skillName,
    );
  }

  const handleExpandClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  const updateExperienceSkill = (
    oldExperience: ExperienceSkill,
    values: ExperienceSkillFormValues,
  ): ExperienceSkill => {
    const experienceJustification: ExperienceSkill = {
      ...oldExperience,
      justification: values.justification || "",
    };
    return experienceJustification;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={experienceSkillSchema}
      onSubmit={(values, { setSubmitting, resetForm }): void => {
        const experienceJustification = updateExperienceSkill(
          experienceSkill,
          values,
        );
        handleUpdateExperienceJustification(experienceJustification)
          .then(() => {
            handleUpdateStatus({
              ...status,
              [slugify(skillName)]: IconStatus.COMPLETE,
            });
            setSubmitting(false);
            resetForm();
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ dirty, isSubmitting }): React.ReactElement => (
        <div
          data-c-accordion=""
          data-c-background="white(100)"
          data-c-card=""
          data-c-margin="bottom(.5)"
          className={`application-skill-explanation${
            isExpanded ? " active" : ""
          }`}
        >
          <button
            aria-expanded={isExpanded ? "true" : "false"}
            data-c-accordion-trigger=""
            tabIndex={0}
            type="button"
            onClick={handleExpandClick}
          >
            <div data-c-grid="">
              <div data-c-grid-item="base(1of4) tl(1of6) equal-col">
                <div className="skill-status-indicator">
                  <StatusIcon status={status[slugify(skillName)]} size="h4" />
                </div>
              </div>
              <div data-c-grid-item="base(3of4) tl(5of6)">
                <div data-c-padding="all(1)">
                  <div data-c-grid="middle">
                    <div data-c-grid-item="tl(3of4)">
                      <p>{heading}</p>
                      <p
                        data-c-margin="top(quarter)"
                        data-c-colour="c1"
                        data-c-font-size="small"
                      >
                        {subHeading}
                      </p>
                    </div>
                    <div
                      data-c-grid-item="tl(1of4)"
                      data-c-align="base(left) tl(center)"
                    >
                      {experienceSkill.justification.length === 0 && (
                        <span data-c-color="stop" className="missing-info">
                          <FormattedMessage
                            id="application.skills.justificationMissing"
                            defaultMessage="Missing Information"
                            description="Accordion heading error that displays when the justification is empty."
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span data-c-visibility="invisible">
              {intl.formatMessage(
                displayMessages.accessibleAccordionButtonText,
              )}
            </span>
            {isExpanded ? (
              <i
                aria-hidden="true"
                className="fas fa-angle-up"
                data-c-colour="black"
                data-c-accordion-remove=""
              />
            ) : (
              <i
                aria-hidden="true"
                className="fas fa-angle-down"
                data-c-colour="black"
                data-c-accordion-add=""
              />
            )}
          </button>
          {isExpanded && (
            <div
              aria-hidden={isExpanded ? "false" : "true"}
              data-c-accordion-content=""
              data-c-background="gray(10)"
            >
              <Form>
                <AlertWhenUnsaved />
                <hr data-c-hr="thin(gray)" data-c-margin="bottom(1)" />
                <div data-c-padding="lr(1)">
                  <FastField
                    id={`experience-skill-textarea-${experienceSkill.experience_type}-${experienceSkill.skill_id}-${experienceSkill.experience_id}`}
                    name="justification"
                    label={label}
                    component={TextAreaInput}
                    placeholder="Start writing here..."
                    required
                  />
                </div>
                <div data-c-padding="all(1)">
                  <div data-c-grid="gutter(all, 1) middle">
                    <div
                      data-c-grid-item="tp(1of2)"
                      data-c-align="base(center) tp(left)"
                    >
                      <button
                        data-c-button="outline(c1)"
                        data-c-radius="rounded"
                        data-c-dialog-id="confirm-deletion"
                        type="button"
                        data-c-dialog-action="open"
                      >
                        <span>
                          <FormattedMessage
                            id="application.skills.deleteExperienceButtonText"
                            defaultMessage="Remove Experience From Skill"
                            description="Text for the delete experience button."
                          />
                        </span>
                      </button>
                    </div>
                    <div
                      data-c-grid-item="tp(1of2)"
                      data-c-align="base(center) tp(right)"
                    >
                      <WordCounter
                        elementId={`experience-skill-textarea-${experienceSkill.experience_type}-${experienceSkill.skill_id}-${experienceSkill.experience_id}`}
                        maxWords={JUSTIFICATION_WORD_LIMIT}
                        minWords={0}
                        absoluteValue
                        dataAttributes={{ "data-c-margin": "right(1)" }}
                        underMaxMessage={intl.formatMessage(
                          displayMessages.wordCountUnderMax,
                        )}
                        overMaxMessage={intl.formatMessage(
                          displayMessages.wordCountOverMax,
                        )}
                      />
                      <button
                        data-c-button="solid(c1)"
                        data-c-radius="rounded"
                        type="submit"
                        disabled={!dirty || isSubmitting}
                      >
                        <span>
                          {dirty
                            ? intl.formatMessage(displayMessages.save)
                            : intl.formatMessage(displayMessages.saved)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

interface SkillsProps {
  criteria: Criteria[];
  experiences: ExperienceSkill[];
  skills: Skill[];
  handleUpdateExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<ExperienceSkill>;
}

const Skills: React.FC<SkillsProps> = ({
  criteria,
  experiences,
  skills,
  handleUpdateExperienceJustification,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const skillsById = mapToObject(skills, getId);
  const getSkillOfCriteria = (criterion: Criteria): Skill | null => {
    return hasKey(skillsById, criterion.skill_id)
      ? skillsById[criterion.skill_id]
      : null;
  };

  const getExperiencesOfSkill = (skill: Skill): ExperienceSkill[] =>
    experiences.filter((experience) => experience.skill_id === skill.id);

  const menuSkills = criteria.flatMap((criterion: Criteria) => {
    const skill = getSkillOfCriteria(criterion);
    if (skill) {
      return [localizeFieldNonNull(locale, skill, "name")];
    }
    return [];
  });

  const [experienceSkillStatus, setExperienceSkillStatus] = useState(
    Object.fromEntries(
      menuSkills.map((menuSkill) => [slugify(menuSkill), IconStatus.DEFAULT]),
    ),
  );

  return (
    <div data-c-container="large">
      <div data-c-grid="gutter(all, 1)">
        <div data-c-grid-item="tl(1of4)">
          <Sidebar
            menuSkills={menuSkills}
            intl={intl}
            status={experienceSkillStatus}
          />
        </div>
        <div data-c-grid-item="tl(3of4)">
          <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
            <FormattedMessage
              id="application.skills.heading"
              defaultMessage="How You Used Each Skill"
              description="Heading text on the Skills step."
            />
          </h2>
          <p data-c-margin="bottom(1)">
            <span data-c-font-weight="bold">
              This is the most important part of your application.
            </span>{" "}
            Each box only needs a couple of sentences, but make them good ones!
          </p>
          <p data-c-margin="bottom(.5)">
            Try answering one or two of the following questions:
          </p>
          <ul data-c-margin="bottom(1)">
            <li>
              What did you accomplish, create, or deliver using this skill?
            </li>
            <li>
              What tasks or activities did you do that relate to this skill?
            </li>
            <li>
              Were there any special techniques or approaches that you used?
            </li>
            <li>How much responsibility did you have in this role?</li>
          </ul>
          <p>
            If a skill is only loosely connected to an experience, consider
            removing it. This can help the manager focus on your best examples.
          </p>
          <div className="skills-list">
            {criteria.map((criterion) => {
              const skill = getSkillOfCriteria(criterion);
              if (skill === null) {
                return null;
              }
              const skillName = localizeFieldNonNull(locale, skill, "name");
              const skillHtmlId = slugify(skillName);

              return (
                <>
                  <h3
                    className="application-skill-title"
                    data-c-heading="h3"
                    data-c-padding="top(3) bottom(1)"
                    data-c-margin="bottom(1)"
                    id={skillHtmlId}
                  >
                    <button
                      data-c-font-size="h3"
                      data-c-dialog-id="skill-description"
                      type="button"
                      data-c-dialog-action="open"
                    >
                      {skillName}
                    </button>
                    <br />
                    <button
                      data-c-font-size="normal"
                      data-c-font-weight="bold"
                      data-c-dialog-id="level-description"
                      type="button"
                      data-c-dialog-action="open"
                    >
                      {intl.formatMessage(getSkillLevelName(criterion, skill))}
                    </button>
                  </h3>
                  {getExperiencesOfSkill(skill).length === 0 ? (
                    <div
                      data-c-background="gray(10)"
                      data-c-radius="rounded"
                      data-c-border="all(thin, solid, gray)"
                      data-c-padding="all(1)"
                    >
                      <div data-c-align="base(center)">
                        <p data-c-color="gray">
                          <FormattedMessage
                            id="application.skills.noLinkedExperiences"
                            defaultMessage="Looks like you don't have any experiences linked to this skill. You can link experiences to skills in the previous step."
                            description="Text displayed under a skill section with no experiences."
                          />
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div data-c-accordion-group="">
                      {getExperiencesOfSkill(skill).map((experienceSkill) => (
                        <ExperienceAccordion
                          key={`experience-skill-textarea-${experienceSkill.experience_type}-${experienceSkill.skill_id}-${experienceSkill.experience_id}`}
                          experienceSkill={experienceSkill}
                          intl={intl}
                          status={experienceSkillStatus}
                          handleUpdateStatus={setExperienceSkillStatus}
                          skillName={skillName}
                          handleUpdateExperienceJustification={
                            handleUpdateExperienceJustification
                          }
                        />
                      ))}
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

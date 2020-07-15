/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, { useState, useReducer } from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
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
import { getSkillLevelName } from "../../../models/jobUtil";
import StatusIcon, { IconStatus } from "../../StatusIcon";
import AlertWhenUnsaved from "../../Form/AlertWhenUnsaved";
import TextAreaInput from "../../Form/TextAreaInput";
import WordCounter from "../../WordCounter/WordCounter";
import { countNumberOfWords } from "../../WordCounter/helpers";
import displayMessages from "./SkillsMessages";
import {
  getSkillOfCriteria,
  getExperiencesOfSkill,
  statusReducer,
  initialStatus,
  computeParentStatus,
  SkillStatus,
} from "./SkillsHelpers";

const JUSTIFICATION_WORD_LIMIT = 100;

interface SidebarProps {
  menuSkills: { [x: number]: string };
  intl: IntlShape;
  status: SkillStatus;
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
        {Object.keys(menuSkills).map((skillId) => (
          <li key={skillId}>
            <StatusIcon
              status={computeParentStatus(status, Number(skillId))}
              size=""
            />
            <a
              href={`#${slugify(menuSkills[skillId])}`}
              title={intl.formatMessage(displayMessages.sidebarLinkTitle)}
            >
              {menuSkills[skillId]}
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
  status: SkillStatus;
  skillName: string;
  handleUpdateExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<ExperienceSkill>;
  handleUpdateStatus: (action: {
    payload: {
      skillId: number;
      experienceId: number;
      status: IconStatus;
    };
  }) => void;
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
              payload: {
                skillId: experienceSkill.skill_id,
                experienceId: experienceSkill.experience_id,
                status: IconStatus.COMPLETE,
              },
            });
            setSubmitting(false);
            resetForm();
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ dirty, isSubmitting, isValid, submitForm }): React.ReactElement => (
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
                  <StatusIcon
                    status={
                      status[experienceSkill.skill_id].experiences[
                        experienceSkill.experience_id
                      ]
                    }
                    size="h4"
                  />
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
                        type="button"
                        disabled={!dirty || isSubmitting}
                        onClick={() => {
                          if (!isValid) {
                            handleUpdateStatus({
                              payload: {
                                skillId: experienceSkill.skill_id,
                                experienceId: experienceSkill.experience_id,
                                status: IconStatus.ERROR,
                              },
                            });
                          } else {
                            submitForm();
                          }
                        }}
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
  const initial = initialStatus(experiences);

  const [status, dispatchStatus] = useReducer(statusReducer, initial);

  const menuSkills = criteria.reduce(
    (collection: { [x: number]: string }, criterion: Criteria) => {
      const skill = getSkillOfCriteria(criterion, skills);
      if (skill && !collection[criterion.skill_id]) {
        collection[criterion.skill_id] = localizeFieldNonNull(
          locale,
          skill,
          "name",
        );
      }
      return collection;
    },
    [],
  );

  return (
    <div data-c-container="large">
      <div data-c-grid="gutter(all, 1)">
        <div data-c-grid-item="tl(1of4)">
          <Sidebar menuSkills={menuSkills} intl={intl} status={status} />
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
              const skill = getSkillOfCriteria(criterion, skills);
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
                  {getExperiencesOfSkill(skill, experiences).length === 0 ? (
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
                      {getExperiencesOfSkill(skill, experiences).map(
                        (experienceSkill) => (
                          <ExperienceAccordion
                            key={`experience-skill-textarea-${experienceSkill.experience_type}-${experienceSkill.skill_id}-${experienceSkill.experience_id}`}
                            experienceSkill={experienceSkill}
                            intl={intl}
                            status={status}
                            handleUpdateStatus={dispatchStatus}
                            skillName={skillName}
                            handleUpdateExperienceJustification={
                              handleUpdateExperienceJustification
                            }
                          />
                        ),
                      )}
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

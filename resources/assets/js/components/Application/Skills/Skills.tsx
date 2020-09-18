/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import React, {
  useState,
  useReducer,
  useRef,
  createRef,
  RefObject,
} from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { Formik, Form, FastField, FormikProps } from "formik";
import * as Yup from "yup";
import Swal, { SweetAlertResult } from "sweetalert2";
import {
  ExperienceSkill,
  Skill,
  Criteria,
  Experience,
} from "../../../models/types";
import { slugify, applicantFaq } from "../../../helpers/routes";
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
import { navigationMessages } from "../applicationMessages";
import displayMessages from "./skillsMessages";
import {
  getSkillOfCriteria,
  getExperiencesOfSkill,
  getExperienceOfExperienceSkills,
} from "../helpers";
import {
  statusReducer,
  initialStatus,
  computeParentStatus,
  SkillStatus,
  computeEperienceStatus,
} from "./skillsHelpers";
import Modal from "../../Modal";
import {
  validateAllForms,
  submitAllForms,
  focusOnElement,
} from "../../../helpers/forms";
import { getId, mapToObjectTrans, notEmpty } from "../../../helpers/queries";

const JUSTIFICATION_WORD_LIMIT = 100;

interface SidebarProps {
  menuSkills: { [skillId: number]: string };
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
          <li key={`application-skills-sidebar-skill-${skillId}`}>
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

interface ExperienceSkillAccordionProps {
  experience: Experience;
  experienceSkill: ExperienceSkill;
  intl: IntlShape;
  status: IconStatus;
  skillName: string;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  formRef: RefObject<FormikProps<ExperienceSkillFormValues>>;
  handleUpdateExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<ExperienceSkill>;
  handleUpdateStatus: (action: {
    payload: {
      skillId: number;
      experienceId: number;
      experienceType: string;
      status: IconStatus;
    };
  }) => void;
  handleRemoveExperience: (experience: ExperienceSkill) => Promise<void>;
}

interface ExperienceSkillFormValues {
  justification: string;
}

const ExperienceSkillAccordion: React.FC<ExperienceSkillAccordionProps> = ({
  experience,
  experienceSkill,
  intl,
  status,
  skillName,
  isExpanded,
  setIsExpanded,
  handleUpdateExperienceJustification,
  handleUpdateStatus,
  handleRemoveExperience,
  formRef,
}) => {
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
        (value: string) =>
          countNumberOfWords(value) <= JUSTIFICATION_WORD_LIMIT,
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  if (experience !== null) {
    heading = getExperienceHeading(experience, intl);
    subHeading = getExperienceSubheading(experience, intl);
    label = getExperienceJustificationLabel(experience, intl, skillName);
  }

  const handleExpandClick = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveButtonClick = (): void => {
    Swal.fire({
      title: intl.formatMessage(displayMessages.modalConfirmHeading),
      text: intl.formatMessage(displayMessages.modalConfirmBody),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A6CBC",
      cancelButtonColor: "#F94D4D",
      cancelButtonText: intl.formatMessage(displayMessages.cancel),
      confirmButtonText: intl.formatMessage(displayMessages.confirm),
    }).then((result: SweetAlertResult) => {
      if (result && result.value !== undefined) {
        handleRemoveExperience(experienceSkill);
      }
    });
  };

  const updateExperienceSkill = (
    oldExperienceSkill: ExperienceSkill,
    values: ExperienceSkillFormValues,
  ): ExperienceSkill => {
    const experienceJustification: ExperienceSkill = {
      ...oldExperienceSkill,
      justification: values.justification || "",
    };
    return experienceJustification;
  };

  return (
    <div
      data-c-accordion
      data-c-background="white(100)"
      data-c-card=""
      data-c-margin="bottom(.5)"
      className={`application-skill-explanation${isExpanded ? " active" : ""}`}
    >
      <button
        aria-expanded={isExpanded ? "true" : "false"}
        data-c-accordion-trigger
        tabIndex={0}
        type="button"
        onClick={handleExpandClick}
      >
        <div data-c-grid="">
          <div data-c-grid-item="base(1of4) tl(1of6) equal-col">
            <div className="skill-status-indicator">
              <StatusIcon status={status} size="h4" />
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
                  {(experienceSkill.justification === null ||
                    experienceSkill.justification.length === 0) && (
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
          {intl.formatMessage(displayMessages.accessibleAccordionButtonText)}
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
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={experienceSkillSchema}
        onSubmit={(values, { setSubmitting, resetForm }): Promise<void> => {
          const experienceSkillJustification = updateExperienceSkill(
            experienceSkill,
            values,
          );
          return handleUpdateExperienceJustification(
            experienceSkillJustification,
          )
            .then(() => {
              handleUpdateStatus({
                payload: {
                  skillId: experienceSkill.skill_id,
                  experienceId: experienceSkill.experience_id,
                  experienceType: experienceSkill.experience_type,
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
            aria-hidden={isExpanded ? "false" : "true"}
            data-c-accordion-content=""
            data-c-background="gray(10)"
          >
            <Form>
              <AlertWhenUnsaved />
              <hr data-c-hr="thin(gray)" data-c-margin="bottom(1)" />
              <div data-c-padding="lr(1)">
                <FastField
                  id={`experience-skill-textarea-${experienceSkill.id}`}
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
                      type="button"
                      onClick={handleRemoveButtonClick}
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
                      elementId={`experience-skill-textarea-${experienceSkill.id}`}
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
                      onClick={(): void => {
                        if (!isValid) {
                          handleUpdateStatus({
                            payload: {
                              skillId: experienceSkill.skill_id,
                              experienceId: experienceSkill.experience_id,
                              experienceType: experienceSkill.experience_type,
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
      </Formik>
    </div>
  );
};

interface SkillsProps {
  criteria: Criteria[];
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
  skills: Skill[];
  handleUpdateExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<ExperienceSkill>;
  handleRemoveExperienceJustification: (
    experience: ExperienceSkill,
  ) => Promise<void>;
  handleContinue: () => void;
  handleQuit: () => void;
  handleReturn: () => void;
}

const Skills: React.FC<SkillsProps> = ({
  criteria,
  experiences,
  experienceSkills,
  skills,
  handleUpdateExperienceJustification,
  handleRemoveExperienceJustification,
  handleContinue,
  handleQuit,
  handleReturn,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const initial = initialStatus(experienceSkills);

  const [status, dispatchStatus] = useReducer(statusReducer, initial);

  const modalId = "skill-description";
  const [visible, setVisible] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const modalParentRef = useRef<HTMLDivElement>(null);

  // Maps ExperienceSkill ids to their accordion expansion state.
  const [accordionExpansions, setAccordionExpansions] = useState<{
    [experienceSkillId: number]: boolean;
  }>(mapToObjectTrans(experienceSkills, getId, () => false));

  const menuSkills = criteria.reduce(
    (collection: { [skillId: number]: string }, criterion: Criteria) => {
      const skill = getSkillOfCriteria(criterion, skills);
      if (skill && !collection[criterion.skill_id]) {
        // eslint-disable-next-line no-param-reassign
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * Validate many Formik forms, and submit all of them if all are valid.
   * @param refMap A map of experienceSkill id to formik Form ref
   * @returns A promise that resolves if submission succeeds, and rejects if validation or submission fails.
   */
  const validateAndSubmitMany = async (
    refMap: Map<
      number,
      React.RefObject<FormikProps<ExperienceSkillFormValues>>
    >,
  ): Promise<void> => {
    setIsSubmitting(true);
    const refs = Array.from(refMap.values()).filter(notEmpty);
    const formsAreValid = await validateAllForms(refs);
    if (formsAreValid) {
      try {
        await submitAllForms(refs);
        setIsSubmitting(false);
        return Promise.resolve();
      } catch {
        setIsSubmitting(false);
        return Promise.reject();
      }
    } else {
      Array.from(refMap.entries()).some(([experienceSkillId, formRef]) => {
        if (formRef.current !== null && !formRef.current.isValid) {
          // Ensure the accordion is expanded before focussing on it.
          setAccordionExpansions({
            ...accordionExpansions,
            [experienceSkillId]: true,
          });
          focusOnElement(`experience-skill-textarea-${experienceSkillId}`);
          return true;
        }
        return false;
      });
      setIsSubmitting(false);
      return Promise.reject();
    }
  };

  // formRefs holds a dictionary of experienceSkill.id to refs to Formik forms.
  const formRefs = React.useRef<
    Map<number, React.RefObject<FormikProps<ExperienceSkillFormValues>>>
  >(new Map());

  // Ensure each experienceSkill has a corresponding form ref
  experienceSkills.forEach((expSkill) => {
    if (!formRefs.current.has(expSkill.id)) {
      const ref = createRef<FormikProps<ExperienceSkillFormValues>>();
      formRefs.current.set(expSkill.id, ref);
    }
  });

  return (
    <div data-c-container="large" ref={modalParentRef}>
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
            <FormattedMessage
              id="application.skills.instructionHeading"
              defaultMessage="<bold>This is the most important part of your application.</bold> Each box only needs a couple of sentences, but make them good ones!"
              description="Heading for the instruction section on the Skills step."
              values={{
                bold: (chunks) => (
                  <span data-c-font-weight="bold">{chunks}</span>
                ),
              }}
            />
          </p>
          <p data-c-margin="bottom(.5)">
            <FormattedMessage
              id="application.skills.instructionListStart"
              defaultMessage="Try answering one or two of the following questions:"
              description="Paragraph before the instruction list on the Skills step."
            />
          </p>
          <ul data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.skills.instructionList"
              defaultMessage="<bullet>What did you accomplish, create, or deliver using this skill?</bullet><bullet>What tasks or activities did you do that relate to this skill?</bullet><bullet>Were there any special techniques or approaches that you used?</bullet><bullet>How much responsibility did you have in this role?</bullet>"
              description="List of potential justification helpers on the Skills step."
              values={{
                bullet: (chunks) => <li>{chunks}</li>,
              }}
            />
          </ul>
          <p>
            <FormattedMessage
              id="application.skills.instructionListEnd"
              defaultMessage="If a skill is only loosely connected to an experience, consider removing it. This can help the manager focus on your best examples."
              description="Paragraph after the instruction list on the Skills step."
            />
          </p>
          <div className="skills-list">
            {criteria.map((criterion) => {
              const skill = getSkillOfCriteria(criterion, skills);
              if (skill === null) {
                return null;
              }
              const skillName = localizeFieldNonNull(locale, skill, "name");
              const skillDescription = localizeFieldNonNull(
                locale,
                skill,
                "description",
              );
              const skillHtmlId = slugify(skillName);

              return (
                <div key={`application-skill-criterion-${criterion.id}`}>
                  <h3
                    className="application-skill-title"
                    data-c-heading="h3"
                    data-c-padding="top(3) bottom(1)"
                    data-c-margin="bottom(1)"
                    id={skillHtmlId}
                  >
                    <button
                      data-c-font-size="h3"
                      data-c-dialog-id={modalId}
                      type="button"
                      onClick={(e): void => {
                        setModalHeading(skillName);
                        setModalBody(skillDescription);
                        setVisible(true);
                      }}
                    >
                      {skillName}
                    </button>
                    <br />
                    <a
                      data-c-font-size="normal"
                      data-c-font-weight="bold"
                      href={applicantFaq(locale, "levels")}
                    >
                      {intl.formatMessage(getSkillLevelName(criterion, skill))}
                    </a>
                  </h3>
                  {getExperiencesOfSkill(skill, experienceSkills).length ===
                  0 ? (
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
                      {getExperiencesOfSkill(skill, experienceSkills).map(
                        (experienceSkill) => {
                          const experienceStatus = computeEperienceStatus(
                            status,
                            experienceSkill,
                          );
                          const relevantExperience = getExperienceOfExperienceSkills(
                            experienceSkill,
                            experiences,
                          );
                          const elementKey = `experience-skill-textarea-${experienceSkill.id}`;
                          if (relevantExperience === null) {
                            return (
                              <div
                                key={elementKey}
                                data-c-background="gray(10)"
                                data-c-radius="rounded"
                                data-c-border="all(thin, solid, gray)"
                                data-c-padding="all(1)"
                              >
                                <div data-c-align="base(center)">
                                  <p data-c-color="gray">
                                    <FormattedMessage
                                      id="application.skills.missingExperience"
                                      defaultMessage="Looks like something went wrong on our end and your experience can't be displayed. Please try again later."
                                      description="Text displayed under a skill section with a missing linked experience."
                                    />
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          if (!formRefs.current.has(experienceSkill.id)) {
                            const ref = createRef<
                              FormikProps<ExperienceSkillFormValues>
                            >();
                            formRefs.current.set(experienceSkill.id, ref);
                          }
                          return (
                            <ExperienceSkillAccordion
                              key={elementKey}
                              experience={relevantExperience}
                              experienceSkill={experienceSkill}
                              intl={intl}
                              status={experienceStatus}
                              handleUpdateStatus={dispatchStatus}
                              skillName={skillName}
                              isExpanded={
                                accordionExpansions[experienceSkill.id]
                              }
                              setIsExpanded={(value: boolean): void =>
                                setAccordionExpansions({
                                  ...accordionExpansions,
                                  [experienceSkill.id]: value,
                                })
                              }
                              formRef={
                                formRefs.current.get(experienceSkill.id)! // Can assert this is not null, becuase if it was we just added it to map.
                              }
                              handleUpdateExperienceJustification={
                                handleUpdateExperienceJustification
                              }
                              handleRemoveExperience={
                                handleRemoveExperienceJustification
                              }
                            />
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div data-c-container="medium" data-c-padding="tb(2)">
            <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
            <div data-c-grid="gutter">
              <div
                data-c-alignment="base(centre) tp(left)"
                data-c-grid-item="tp(1of2)"
              >
                <button
                  data-c-button="outline(c2)"
                  data-c-radius="rounded"
                  type="button"
                  disabled={isSubmitting}
                  onClick={(): Promise<void> =>
                    validateAndSubmitMany(formRefs.current)
                      .then(handleReturn)
                      .catch(() => {
                        // Validation failed, do nothing.
                      })
                  }
                >
                  {intl.formatMessage(navigationMessages.return)}
                </button>
              </div>
              <div
                data-c-alignment="base(centre) tp(right)"
                data-c-grid-item="tp(1of2)"
              >
                <button
                  data-c-button="outline(c2)"
                  data-c-radius="rounded"
                  type="button"
                  disabled={isSubmitting}
                  onClick={(): Promise<void> =>
                    validateAndSubmitMany(formRefs.current)
                      .then(handleQuit)
                      .catch(() => {
                        // Validation failed, do nothing.
                      })
                  }
                >
                  {intl.formatMessage(navigationMessages.quit)}
                </button>
                <button
                  data-c-button="solid(c1)"
                  data-c-radius="rounded"
                  data-c-margin="left(1)"
                  disabled={isSubmitting}
                  type="button"
                  onClick={(): Promise<void> =>
                    validateAndSubmitMany(formRefs.current)
                      .then(handleContinue)
                      .catch(() => {
                        // Validation failed, do nothing.
                      })
                  }
                >
                  {intl.formatMessage(navigationMessages.continue)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-c-dialog-overlay={visible ? "active" : ""} />
      <Modal
        id={modalId}
        parentElement={modalParentRef.current}
        visible={visible}
        onModalConfirm={(e): void => setVisible(false)}
        onModalCancel={(e): void => setVisible(false)}
      >
        <Modal.Header>
          <div
            data-c-padding="tb(1)"
            data-c-border="bottom(thin, solid, black)"
            data-c-background="c1(100)"
            className="dialog-header"
          >
            <div data-c-container="medium">
              <h5
                data-c-font-size="h3"
                data-c-font-weight="bold"
                id={`${modalId}-title`}
                data-c-dialog-focus=""
                data-c-color="white"
              >
                {modalHeading}
              </h5>
              <button
                data-c-dialog-action="close"
                data-c-dialog-id={`${modalId}`}
                type="button"
                data-c-color="white"
                tabIndex={0}
                onClick={(e): void => setVisible(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div data-c-border="bottom(thin, solid, black)">
            <div id={`${modalId}-description`}>
              <div data-c-container="medium" data-c-padding="tb(1)">
                <p>{modalBody}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterConfirmBtn>
            <FormattedMessage
              id="application.skills.modal.confirmButton"
              defaultMessage="Okay"
            />
          </Modal.FooterConfirmBtn>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Skills;

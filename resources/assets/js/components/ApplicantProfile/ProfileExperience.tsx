/* eslint-disable camelcase */
import React, { FunctionComponent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  Experience,
  Skill,
  ExperienceSkill,
  ExperienceEducation,
  ExperienceWork,
  ExperienceCommunity,
  ExperiencePersonal,
  ExperienceAward,
} from "../../models/types";
import {
  modalButtonProps,
  ModalButton,
} from "../Application/Experience/Experience";
import {
  AwardRecipientType,
  AwardRecognitionType,
  ProfileAwardModal,
} from "../Application/ExperienceModals/AwardExperienceModal";
import {
  EducationStatus,
  EducationType,
  ProfileEducationModal,
} from "../Application/ExperienceModals/EducationExperienceModal";
import { find, hasKey, mapToObject, getId } from "../../helpers/queries";
import Modal from "../Modal";
import AlertWhenUnsaved from "../Form/AlertWhenUnsaved";
import TextAreaInput from "../Form/TextAreaInput";
import {
  experienceMessages,
  skillMessages,
} from "../Application/applicationMessages";
import { validationMessages } from "../Form/Messages";
import { JUSTIFICATION_WORD_LIMIT } from "../Application/Skills/Skills";
import { countNumberOfWords } from "../WordCounter/helpers";
import WordCounter from "../WordCounter/WordCounter";
import displayMessages from "../Application/Skills/skillsMessages";
import {
  getExperienceHeading,
  getExperienceJustificationLabel,
  getExperienceSubheading,
} from "../../models/localizedConstants";
import { getLocale, localizeFieldNonNull } from "../../helpers/localize";
import {
  getExperienceOfExperienceSkill,
  getExperienceSkillsOfExperience,
} from "../Application/helpers";
import { ProfileWorkModal } from "../Application/ExperienceModals/WorkExperienceModal";
import { ProfileCommunityModal } from "../Application/ExperienceModals/CommunityExperienceModal";
import { ProfilePersonalModal } from "../Application/ExperienceModals/PersonalExperienceModal";
import { ProfileEducationAccordion } from "../Application/ExperienceAccordions/ExperienceEducationAccordion";
import { ProfileWorkAccordion } from "../Application/ExperienceAccordions/ExperienceWorkAccordion";
import { ProfileCommunityAccordion } from "../Application/ExperienceAccordions/ExperienceCommunityAccordion";
import { ProfilePersonalAccordion } from "../Application/ExperienceAccordions/ExperiencePersonalAccordion";
import { ProfileAwardAccordion } from "../Application/ExperienceAccordions/ExperienceAwardAccordion";

const profileExperienceAccordion = (
  experience: Experience,
  relevantSkills: ExperienceSkill[],
  skillsById: { [id: number]: Skill },
  handleEdit: () => void,
  handleDelete: () => Promise<void>,
  handleEditSkill: (experienceSkillId: number) => void,
): React.ReactElement | null => {
  switch (experience.type) {
    case "experience_education":
      return (
        <ProfileEducationAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSkill={handleEditSkill}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_work":
      return (
        <ProfileWorkAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSkill={handleEditSkill}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_community":
      return (
        <ProfileCommunityAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSkill={handleEditSkill}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_personal":
      return (
        <ProfilePersonalAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSkill={handleEditSkill}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    case "experience_award":
      return (
        <ProfileAwardAccordion
          key={`${experience.id}-${experience.type}`}
          experience={experience}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleEditSkill={handleEditSkill}
          relevantSkills={relevantSkills}
          skillsById={skillsById}
        />
      );
    default:
      return null;
  }
};

const SkillExperienceModal: FunctionComponent<{
  experienceSkill: ExperienceSkill | null;
  experiences: Experience[];
  skillsById: { [id: number]: Skill };
  handleCancel: () => void;
  handleConfirm: (data: ExperienceSkill) => Promise<void>;
  handleDelete: () => Promise<void>;
}> = ({
  experienceSkill,
  handleCancel,
  handleConfirm,
  handleDelete,
  skillsById,
  experiences,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const [isDeleting, setIsDeleting] = useState(false);

  const initialValues = {
    justification: experienceSkill?.justification ?? "",
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

  const experience =
    experienceSkill !== null
      ? getExperienceOfExperienceSkill(experienceSkill, experiences)
      : null;
  let textareaLabel = "";
  let heading = "";
  let subheading = "";

  if (
    experienceSkill !== null &&
    experience !== null &&
    hasKey(skillsById, experienceSkill.skill_id)
  ) {
    const skill = skillsById[experienceSkill.skill_id];
    const skillName = localizeFieldNonNull(locale, skill, "name");
    textareaLabel = getExperienceJustificationLabel(
      experience,
      intl,
      skillName,
    );
    heading = getExperienceHeading(experience, intl);
    subheading = getExperienceSubheading(experience, intl);
  }

  return (
    <Modal
      id="profile-experience-skill-modal"
      parentElement={document.getElementById("modal-root")}
      visible={experienceSkill !== null}
      onModalConfirm={handleCancel}
      onModalCancel={handleCancel}
    >
      <div
        className="dialog-header"
        data-c-background="c1(100)"
        data-c-border="bottom(thin, solid, black)"
        data-c-padding="tb(1)"
      >
        <div data-c-container="medium">
          <h5
            data-c-colour="white"
            data-c-font-size="h3"
            data-c-font-weight="bold"
            data-c-dialog-focus
          >
            {heading}
          </h5>
          <p
            data-c-margin="top(quarter)"
            data-c-colour="white"
            data-c-font-size="small"
          >
            {subheading}
          </p>
        </div>
      </div>
      {experienceSkill !== null && (
        <Formik
          initialValues={initialValues}
          validationSchema={experienceSkillSchema}
          onSubmit={(values, { setSubmitting, resetForm }): void => {
            handleConfirm({
              ...experienceSkill,
              justification: values.justification,
            })
              .then(() => {
                setSubmitting(false);
                resetForm();
              })
              .catch(() => {
                // If there is an error, don't reset the form, allowing user to retry.
                setSubmitting(false);
              });
          }}
        >
          {({ dirty, isSubmitting, resetForm }): React.ReactElement => (
            <Form>
              <AlertWhenUnsaved />
              <hr data-c-hr="thin(gray)" data-c-margin="bottom(1)" />
              <div data-c-padding="lr(1)">
                <Field
                  id="experience-skill-textarea"
                  name="justification"
                  label={textareaLabel}
                  component={TextAreaInput}
                  placeholder={intl.formatMessage(
                    skillMessages.experienceSkillPlaceholder,
                  )}
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
                      data-c-margin="right(1)"
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting || isDeleting}
                    >
                      <span>
                        <FormattedMessage
                          id="profileExperience.skillExperienceModal.cancel"
                          defaultMessage="Cancel"
                          description="Cancel button text"
                        />
                      </span>
                    </button>
                    <button
                      data-c-button="outline(stop)"
                      data-c-radius="rounded"
                      type="button"
                      onClick={() => {
                        setIsDeleting(true);
                        handleDelete()
                          .then(() => {
                            setIsDeleting(false);
                            resetForm();
                          })
                          .catch(() => {
                            setIsDeleting(false);
                          });
                      }}
                      disabled={isSubmitting || isDeleting}
                    >
                      <span>
                        <FormattedMessage
                          id="profileExperience.skillExperienceModal.delete"
                          defaultMessage="Delete"
                          description="Delete button text"
                        />
                      </span>
                    </button>
                  </div>
                  <div
                    data-c-grid-item="tp(1of2)"
                    data-c-align="base(center) tp(right)"
                  >
                    <WordCounter
                      elementId="experience-skill-textarea"
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
                      disabled={!dirty || isSubmitting || isDeleting}
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
          )}
        </Formik>
      )}
    </Modal>
  );
};

export interface ProfileExperienceProps {
  experiences: Experience[];
  educationStatuses: EducationStatus[];
  educationTypes: EducationType[];
  experienceSkills: ExperienceSkill[];
  skills: Skill[];
  recipientTypes: AwardRecipientType[];
  recognitionTypes: AwardRecognitionType[];
  handleSubmitExperience: (data: Experience) => Promise<void>;
  handleDeleteExperience: (
    id: number,
    type: Experience["type"],
  ) => Promise<void>;
  handleUpdateExperienceSkill: (expSkill: ExperienceSkill) => Promise<void>;
  handleDeleteExperienceSkill: (id: number) => Promise<void>;
}

export const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experiences,
  educationStatuses,
  educationTypes,
  experienceSkills,
  skills,
  handleSubmitExperience,
  handleDeleteExperience,
  handleUpdateExperienceSkill,
  handleDeleteExperienceSkill,
  recipientTypes,
  recognitionTypes,
}) => {
  const intl = useIntl();

  const [isModalVisible, setIsModalVisible] = React.useState<{
    id: Experience["type"] | "";
    visible: boolean;
  }>({
    id: "",
    visible: false,
  });

  const [experienceData, setExperienceData] = React.useState<Experience | null>(
    null,
  );

  const modalButtons = modalButtonProps(intl);

  const openModal = (id: Experience["type"]): void => {
    setIsModalVisible({ id, visible: true });
  };

  const closeModal = (): void => {
    setExperienceData(null);
    setIsModalVisible({ id: "", visible: false });
  };

  const submitExperience = (data) =>
    handleSubmitExperience(data).then(closeModal);

  const editExperience = (experience: Experience): void => {
    setExperienceData(experience);
    setIsModalVisible({ id: experience.type, visible: true });
  };

  const deleteExperience = (experience: Experience): Promise<void> =>
    handleDeleteExperience(experience.id, experience.type).then(closeModal);

  const [editedExperienceSkillId, setEditedExperienceSkillId] = useState<
    number | null
  >(null);
  const editedExpSkill =
    editedExperienceSkillId !== null
      ? find(experienceSkills, editedExperienceSkillId)
      : null;

  const skillsById = mapToObject(skills, getId);

  const modalRoot = document.getElementById("modal-root");

  return (
    <>
      <div data-c-container="medium">
        <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
          {intl.formatMessage(experienceMessages.heading)}
        </h2>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="profile.experience.preamble"
            defaultMessage="Use the buttons below to add experiences you want to share with the manager. Experiences you have added in the past also appear below, and you can edit them to link them to skills required for this job when necessary."
            description="First section of text on the experience step of the Application Timeline."
          />
        </p>
        {/* Experience Modal Buttons */}
        <div data-c-grid="gutter(all, 1)">
          {Object.values(modalButtons).map((buttonProps) => {
            const { id, title, icon } = buttonProps;
            return (
              <ModalButton
                id={id}
                title={title}
                icon={icon}
                openModal={openModal}
              />
            );
          })}
        </div>
        {/* Experience Accordion List */}
        {experiences && experiences.length > 0 ? (
          <div className="experience-list" data-c-margin="top(2)">
            <div data-c-accordion-group>
              {experiences.map((experience) => {
                const relevantSkills: ExperienceSkill[] = getExperienceSkillsOfExperience(
                  experienceSkills,
                  experience,
                );
                const handleEdit = () => editExperience(experience);
                const handleDelete = () => deleteExperience(experience);
                const errorAccordion = () => (
                  <div
                    data-c-background="gray(10)"
                    data-c-radius="rounded"
                    data-c-border="all(thin, solid, gray)"
                    data-c-margin="top(1)"
                    data-c-padding="all(1)"
                  >
                    <div data-c-align="base(center)">
                      <p data-c-color="stop">
                        {intl.formatMessage(
                          experienceMessages.errorRenderingExperience,
                        )}
                      </p>
                    </div>
                  </div>
                );
                return (
                  profileExperienceAccordion(
                    experience,
                    relevantSkills,
                    skillsById,
                    handleEdit,
                    handleDelete,
                    setEditedExperienceSkillId,
                  ) ?? errorAccordion()
                );
              })}
            </div>
          </div>
        ) : (
          <div
            data-c-background="gray(10)"
            data-c-radius="rounded"
            data-c-border="all(thin, solid, gray)"
            data-c-margin="top(2)"
            data-c-padding="all(1)"
          >
            <div data-c-align="base(center)">
              <p data-c-color="gray">
                <FormattedMessage
                  id="profile.experience.noExperiences"
                  defaultMessage="Looks like you don't have any experience added yet. Use the buttons above to add experience. Don't forget that experience will always be saved to your profile so that you can use it on future applications!"
                  description="Message displayed when application has no experiences."
                />
              </p>
            </div>
          </div>
        )}
      </div>
      <div
        data-c-dialog-overlay={
          isModalVisible.visible || editedExperienceSkillId !== null
            ? "active"
            : ""
        }
      />
      <ProfileEducationModal
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        experienceEducation={experienceData as ExperienceEducation}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.education.id}
        onModalCancel={closeModal}
        onModalConfirm={submitExperience}
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.education.id
        }
      />
      <ProfileWorkModal
        experienceWork={experienceData as ExperienceWork}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.work.id}
        onModalCancel={closeModal}
        onModalConfirm={submitExperience}
        parentElement={modalRoot}
        visible={
          isModalVisible.visible && isModalVisible.id === modalButtons.work.id
        }
      />
      <ProfileCommunityModal
        experienceCommunity={experienceData as ExperienceCommunity}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.community.id}
        onModalCancel={closeModal}
        onModalConfirm={submitExperience}
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.community.id
        }
      />
      <ProfilePersonalModal
        experiencePersonal={experienceData as ExperiencePersonal}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.personal.id}
        onModalCancel={closeModal}
        onModalConfirm={submitExperience}
        parentElement={modalRoot}
        visible={
          isModalVisible.visible &&
          isModalVisible.id === modalButtons.personal.id
        }
      />
      <ProfileAwardModal
        experienceAward={experienceData as ExperienceAward}
        experienceableId={experienceData?.experienceable_id ?? 0}
        experienceableType={
          experienceData?.experienceable_type ?? "application"
        }
        modalId={modalButtons.award.id}
        onModalCancel={closeModal}
        onModalConfirm={submitExperience}
        parentElement={modalRoot}
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        visible={
          isModalVisible.visible && isModalVisible.id === modalButtons.award.id
        }
      />
      <SkillExperienceModal
        experienceSkill={editedExpSkill}
        handleCancel={() => setEditedExperienceSkillId(null)}
        handleConfirm={async (expSkill): Promise<void> => {
          return handleUpdateExperienceSkill(expSkill).then(() => {
            setEditedExperienceSkillId(null);
          });
        }}
        handleDelete={async (): Promise<void> => {
          if (editedExperienceSkillId !== null) {
            return handleDeleteExperienceSkill(editedExperienceSkillId).then(
              () => {
                setEditedExperienceSkillId(null);
              },
            );
          }
        }}
        experiences={experiences}
        skillsById={skillsById}
      />
    </>
  );
};

export default ProfileExperience;

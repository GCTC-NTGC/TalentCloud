import React, { FunctionComponent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  Criteria,
  Experience,
  Skill,
  ExperienceSkill,
} from "../../models/types";
import { MyExperience } from "../Application/Experience/Experience";
import {
  AwardRecipientType,
  AwardRecognitionType,
} from "../Application/ExperienceModals/AwardExperienceModal";
import {
  EducationStatus,
  EducationType,
} from "../Application/ExperienceModals/EducationExperienceModal";
import { find, hasKey, mapToObject, getId } from "../../helpers/queries";
import Modal from "../Modal";
import AlertWhenUnsaved from "../Form/AlertWhenUnsaved";
import TextAreaInput from "../Form/TextAreaInput";
import { skillMessages } from "../Application/applicationMessages";
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
import { getExperienceOfExperienceSkill } from "../Application/helpers";

const SkillExperienceModal: FunctionComponent<{
  experienceSkill: ExperienceSkill | null;
  experiences: Experience[];
  skillsById: { [id: number]: Skill };
  handleCancel: () => void;
  handleConfirm: () => void;
}> = ({
  experienceSkill,
  handleCancel,
  handleConfirm,
  skillsById,
  experiences,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

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
      onModalConfirm={handleConfirm}
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
            handleConfirm();
            setSubmitting(false);
          }}
        >
          {({
            dirty,
            isSubmitting,
            isValid,
            submitForm,
          }): React.ReactElement => (
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
                      type="button"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      <span>
                        <FormattedMessage
                          id="profileExperience.skillExperienceModal.cancel"
                          defaultMessage="Cancel"
                          description="Cancel button text"
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
  criteria: Criteria[];
  skills: Skill[];
  jobId: number;
  jobClassificationId: number | null;
  jobEducationRequirements: string | null;
  recipientTypes: AwardRecipientType[];
  recognitionTypes: AwardRecognitionType[];
  handleSubmitExperience: (data: Experience) => Promise<void>;
  handleDeleteExperience: (
    id: number,
    type: Experience["type"],
  ) => Promise<void>;
}

export const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experiences,
  educationStatuses,
  educationTypes,
  experienceSkills,
  criteria,
  skills,
  handleSubmitExperience,
  handleDeleteExperience,
  jobId,
  jobClassificationId,
  jobEducationRequirements,
  recipientTypes,
  recognitionTypes,
}) => {
  const [editedExperienceSkillId, setEditedExperienceSkillId] = useState<
    number | null
  >(null);

  const skillsById = mapToObject(skills, getId);

  return (
    <>
      <MyExperience
        experiences={experiences}
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        experienceSkills={experienceSkills}
        criteria={criteria}
        skills={skills}
        jobId={jobId}
        jobClassificationId={jobClassificationId}
        jobEducationRequirements={jobEducationRequirements}
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        handleSubmitExperience={handleSubmitExperience}
        handleDeleteExperience={handleDeleteExperience}
        handleEditSkill={setEditedExperienceSkillId}
        context="profile"
      />
      <div
        data-c-dialog-overlay={editedExperienceSkillId !== null ? "active" : ""}
      />
      <SkillExperienceModal
        experienceSkill={
          editedExperienceSkillId !== null
            ? find(experienceSkills, editedExperienceSkillId)
            : null
        }
        handleCancel={() => setEditedExperienceSkillId(null)}
        handleConfirm={() => setEditedExperienceSkillId(null)}
        experiences={experiences}
        skillsById={skillsById}
      />
    </>
  );
};

export default ProfileExperience;

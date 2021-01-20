import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  ProfileSkillSubform,
  SkillFormValues,
  submitDataToFormSkills,
  validationShape as skillValidationShape,
} from "./ProfileSkillSubform";
import {
  Skill,
  ExperienceEducation,
  ExperienceSkill,
} from "../../../models/types";
import { ExperienceSubmitData } from "./ExperienceModalCommon";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import Modal from "../../Modal";
import {
  EducationDetailsSubform,
  EducationDetailsFormValues,
  newExperienceEducation,
  experienceToDetails,
  educationExperienceValidationShape,
  detailsToExperience,
  messages,
  FormEducationType,
  FormEducationStatus,
} from "../../Application/ExperienceModals/EducationExperienceModal";

type EducationExperienceFormValues = SkillFormValues &
  EducationDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceEducation>,
  allSkills: Skill[],
  creatingNew: boolean,
): EducationExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience, creatingNew),
    ...submitDataToFormSkills(data, allSkills),
  };
};

interface ProfileEducationModalProps {
  modalId: string;
  experienceEducation: ExperienceEducation | null;
  educationTypes: FormEducationType[];
  educationStatuses: FormEducationStatus[];
  experienceableId: number;
  experienceableType: ExperienceEducation["experienceable_type"];
  userSkills: Skill[];
  experienceSkills: ExperienceSkill[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (experience: ExperienceEducation) => Promise<void>;
}

export const ProfileEducationModal: FunctionComponent<ProfileEducationModalProps> = ({
  modalId,
  experienceEducation,
  educationTypes,
  educationStatuses,
  experienceableId,
  experienceableType,
  userSkills,
  experienceSkills,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
}) => {
  const intl = useIntl();

  const originalExperience =
    experienceEducation ??
    newExperienceEducation(experienceableId, experienceableType);

  const relevantExperienceSkills = experienceSkills.filter(
    (expSkill) =>
      expSkill.experience_id === experienceEducation?.id &&
      expSkill.experience_type === "experience_education",
  );

  const validationSchema = Yup.object().shape({
    ...educationExperienceValidationShape(intl),
    ...skillValidationShape(intl),
  });

  const initialFormValues = dataToFormValues(
    {
      experience: originalExperience,
      savedSkills: relevantExperienceSkills.map((expSkill) => ({
        skillId: expSkill.skill_id,
        justification: expSkill.justification ?? "",
      })),
    },
    userSkills,
    experienceEducation === null,
  );

  return (
    <Modal
      id={modalId}
      parentElement={parentElement}
      visible={visible}
      onModalCancel={onModalCancel}
      onModalConfirm={onModalCancel}
      className="application-experience-dialog"
    >
      <ExperienceModalHeader
        title={intl.formatMessage(messages.modalTitle)}
        iconClass="fa-book"
      />
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={async (values, actions): Promise<void> => {
          await onModalConfirm(detailsToExperience(values, originalExperience));
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validationSchema={validationSchema}
      >
        {(formikProps): React.ReactElement => (
          <Form>
            <Modal.Body>
              <ExperienceDetailsIntro
                description={intl.formatMessage(messages.modalDescription)}
              />
              <EducationDetailsSubform
                educationTypes={educationTypes}
                educationStatuses={educationStatuses}
              />
              <ProfileSkillSubform keyPrefix="education" skills={userSkills} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileEducationModal;

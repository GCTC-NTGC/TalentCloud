import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  ProfileSkillSubform,
  SkillFormValues,
  validationShape as skillValidationShape,
  dataToFormSkills,
  formSkillsToData,
} from "./ProfileSkillSubform";
import { ExperienceSkill, ExperienceWork, Skill } from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import Modal from "../../Modal";
import {
  WorkDetailsFormValues,
  experienceToDetails,
  newExperienceWork,
  workValidationShape,
  messages,
  detailsToExperience,
  WorkDetailsSubform,
} from "../../Application/ExperienceModals/WorkExperienceModal";

type WorkExperienceFormValues = SkillFormValues & WorkDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceWork>,
  allSkills: Skill[],
): WorkExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience),
    ...dataToFormSkills(data, allSkills),
  };
};

const formValuesToData = (
  formValues: WorkExperienceFormValues,
  originalExperience: ExperienceWork,
): ExperienceSubmitData<ExperienceWork> => {
  return {
    experience: detailsToExperience(formValues, originalExperience),
    savedSkills: formSkillsToData(formValues),
  };
};

interface ProfileWorkModalProps {
  modalId: string;
  experienceWork: ExperienceWork | null;
  experienceableId: number;
  experienceableType: ExperienceWork["experienceable_type"];
  userSkills: Skill[];
  experienceSkills: ExperienceSkill[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: ExperienceSubmitData<ExperienceWork>) => Promise<void>;
}

export const ProfileWorkModal: FunctionComponent<ProfileWorkModalProps> = ({
  modalId,
  experienceWork,
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
    experienceWork ?? newExperienceWork(experienceableId, experienceableType);

  const relevantExperienceSkills = experienceSkills.filter(
    (expSkill) =>
      expSkill.experience_id === experienceWork?.id &&
      expSkill.experience_type === "experience_work",
  );

  const validationSchema = Yup.object().shape({
    ...workValidationShape(intl),
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
        iconClass="fa-briefcase"
      />
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={async (values, actions): Promise<void> => {
          await onModalConfirm(formValuesToData(values, originalExperience));
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
              <WorkDetailsSubform />
              <ProfileSkillSubform keyPrefix="work" skills={userSkills} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileWorkModal;

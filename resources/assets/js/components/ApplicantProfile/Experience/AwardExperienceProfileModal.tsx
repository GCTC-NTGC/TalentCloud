import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  dataToFormSkills,
  formSkillsToData,
  ProfileSkillSubform,
  SkillFormValues,
  validationShape as skillValidationShape,
} from "./ProfileSkillSubform";
import { Skill, ExperienceAward, ExperienceSkill } from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import Modal from "../../Modal";
import {
  AwardDetailsSubform,
  awardValidationShape,
  messages,
  experienceToDetails,
  newExperienceAward,
  detailsToExperience,
  AwardDetailsFormValues,
  FormAwardRecipientType,
  FormAwardRecognitionType,
} from "../../Application/ExperienceModals/AwardExperienceModal";
import { objectMap } from "../../../helpers/queries";

type AwardExperienceFormValues = SkillFormValues & AwardDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceAward>,
  allSkills: Skill[],
  creatingNew: boolean,
): AwardExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience, creatingNew),
    ...dataToFormSkills(data, allSkills),
  };
};

const formValuesToData = (
  formValues: AwardExperienceFormValues,
  originalExperience: ExperienceAward,
): ExperienceSubmitData<ExperienceAward> => {
  return {
    experience: detailsToExperience(formValues, originalExperience),
    savedSkills: formSkillsToData(formValues),
  };
};

interface ProfileAwardModalProps {
  modalId: string;
  experienceAward: ExperienceAward | null;
  recipientTypes: FormAwardRecipientType[];
  recognitionTypes: FormAwardRecognitionType[];
  experienceableId: number;
  experienceableType: ExperienceAward["experienceable_type"];
  userSkills: Skill[];
  experienceSkills: ExperienceSkill[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (
    data: ExperienceSubmitData<ExperienceAward>,
  ) => Promise<void>;
}

export const ProfileAwardModal: FunctionComponent<ProfileAwardModalProps> = ({
  modalId,
  experienceAward,
  recipientTypes,
  recognitionTypes,
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
    experienceAward ?? newExperienceAward(experienceableId, experienceableType);

  const relevantExperienceSkills = experienceSkills.filter(
    (expSkill) =>
      expSkill.experience_id === experienceAward?.id &&
      expSkill.experience_type === "experience_award",
  );

  const validationSchema = Yup.object().shape({
    ...awardValidationShape(intl),
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
    experienceAward === null,
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
        iconClass="fa-trophy"
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
              <AwardDetailsSubform
                recipientTypes={recipientTypes}
                recognitionTypes={recognitionTypes}
              />
              <ProfileSkillSubform keyPrefix="award" skills={userSkills} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileAwardModal;

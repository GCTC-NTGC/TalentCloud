import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  ProfileSkillSubform,
  SkillFormValues,
  dataToFormSkills,
  validationShape as skillValidationShape,
  formSkillsToData,
} from "./ProfileSkillSubform";
import {
  Skill,
  ExperiencePersonal,
  ExperienceSkill,
} from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import Modal from "../../Modal";
import {
  PersonalDetailsFormValues,
  messages,
  PersonalDetailsSubform,
  experienceToDetails,
  detailsToExperience,
  personalValidationShape,
  newPersonalExperience,
} from "../../Application/ExperienceModals/PersonalExperienceModal";
import { getId } from "../../../helpers/queries";

type PersonalExperienceFormValues = SkillFormValues & PersonalDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperiencePersonal>,
  allSkills: Skill[],
): PersonalExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience),
    ...dataToFormSkills(data, allSkills),
  };
};

const formValuesToData = (
  formValues: PersonalExperienceFormValues,
  originalExperience: ExperiencePersonal,
): ExperienceSubmitData<ExperiencePersonal> => {
  return {
    experience: detailsToExperience(formValues, originalExperience),
    savedSkills: formSkillsToData(formValues),
  };
};

interface ProfilePersonalModalProps {
  modalId: string;
  experiencePersonal: ExperiencePersonal | null;
  experienceableId: number;
  experienceableType: ExperiencePersonal["experienceable_type"];
  userSkills: Skill[];
  experienceSkills: ExperienceSkill[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (
    data: ExperienceSubmitData<ExperiencePersonal>,
  ) => Promise<void>;
}

export const ProfilePersonalModal: FunctionComponent<ProfilePersonalModalProps> = ({
  modalId,
  experiencePersonal,
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
    experiencePersonal ??
    newPersonalExperience(experienceableId, experienceableType);

  const relevantExperienceSkills = experienceSkills.filter(
    (expSkill) =>
      expSkill.experience_id === experiencePersonal?.id &&
      expSkill.experience_type === "experience_personal",
  );

  const validationSchema = Yup.object().shape({
    ...personalValidationShape(intl),
    ...skillValidationShape(intl, userSkills.map(getId)),
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
        iconClass="fa-mountain"
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
              <PersonalDetailsSubform />
              <ProfileSkillSubform keyPrefix="personal" skills={userSkills} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfilePersonalModal;

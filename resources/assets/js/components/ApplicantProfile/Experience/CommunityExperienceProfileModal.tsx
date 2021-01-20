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
  ExperienceCommunity,
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
  newCommunityExperience,
  CommunityDetailsFormValues,
  messages,
  communityValidationShape,
  CommunityDetailsSubform,
  detailsToExperience,
  experienceToDetails,
} from "../../Application/ExperienceModals/CommunityExperienceModal";

type CommunityExperienceFormValues = SkillFormValues &
  CommunityDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceCommunity>,
  allSkills: Skill[],
): CommunityExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience),
    ...dataToFormSkills(data, allSkills),
  };
};

const formValuesToData = (
  formValues: CommunityExperienceFormValues,
  originalExperience: ExperienceCommunity,
): ExperienceSubmitData<ExperienceCommunity> => {
  return {
    experience: detailsToExperience(formValues, originalExperience),
    savedSkills: formSkillsToData(formValues),
  };
};

interface ProfileCommunityModalProps {
  modalId: string;
  experienceCommunity: ExperienceCommunity | null;
  experienceableId: number;
  experienceableType: ExperienceCommunity["experienceable_type"];
  userSkills: Skill[];
  experienceSkills: ExperienceSkill[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (
    data: ExperienceSubmitData<ExperienceCommunity>,
  ) => Promise<void>;
}

export const ProfileCommunityModal: FunctionComponent<ProfileCommunityModalProps> = ({
  modalId,
  experienceCommunity,
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
    experienceCommunity ??
    newCommunityExperience(experienceableId, experienceableType);

  const relevantExperienceSkills = experienceSkills.filter(
    (expSkill) =>
      expSkill.experience_id === experienceCommunity?.id &&
      expSkill.experience_type === "experience_community",
  );

  const validationSchema = Yup.object().shape({
    ...communityValidationShape(intl),
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
        iconClass="fa-people-carry"
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
              <CommunityDetailsSubform />
              <ProfileSkillSubform keyPrefix="community" skills={userSkills} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProfileCommunityModal;

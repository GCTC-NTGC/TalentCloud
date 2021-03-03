import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  SkillFormValues,
  dataToFormSkills,
  validationShape as skillValidationShape,
  formSkillsToData,
  ProfileSkillSubformH2,
} from "./ProfileSkillSubform";
import {
  Skill,
  ExperienceCommunity,
  ExperienceSkill,
} from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeaderH2,
  ExperienceDetailsIntroH2,
  ExperienceModalFooterH2,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import {
  newCommunityExperience,
  CommunityDetailsFormValues,
  messages,
  communityValidationShape,
  CommunityDetailsSubformH2,
  detailsToExperience,
  experienceToDetails,
} from "../../Application/ExperienceModals/CommunityExperienceModal";
import { getId } from "../../../helpers/queries";
import Dialog from "../../H2Components/Dialog";

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
    <div data-h2-system>
      <Dialog id={modalId} className="application-experience-dialog">
        <ExperienceModalHeaderH2
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
              <Dialog.Content>
                <ExperienceDetailsIntroH2
                  description={intl.formatMessage(messages.modalDescription)}
                />
                <CommunityDetailsSubformH2 />
                <ProfileSkillSubformH2
                  keyPrefix="community"
                  skills={userSkills}
                />
              </Dialog.Content>
              <ExperienceModalFooterH2
                buttonsDisabled={formikProps.isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default ProfileCommunityModal;

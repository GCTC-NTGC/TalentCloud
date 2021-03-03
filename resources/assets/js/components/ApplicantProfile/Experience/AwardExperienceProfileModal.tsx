import React, { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import {
  dataToFormSkills,
  formSkillsToData,
  ProfileSkillSubformH2,
  SkillFormValues,
  validationShape as skillValidationShape,
} from "./ProfileSkillSubform";
import { Skill, ExperienceAward, ExperienceSkill } from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeaderH2,
  ExperienceDetailsIntroH2,
  ExperienceModalFooterH2,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import {
  AwardDetailsSubformH2,
  awardValidationShape,
  messages,
  experienceToDetails,
  newExperienceAward,
  detailsToExperience,
  AwardDetailsFormValues,
  FormAwardRecipientType,
  FormAwardRecognitionType,
} from "../../Application/ExperienceModals/AwardExperienceModal";
import { getId } from "../../../helpers/queries";
import Dialog from "../../H2Components/Dialog";

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
    experienceAward === null,
  );

  return (
    <div data-h2-system>
      <Dialog id={modalId} className="application-experience-dialog">
        <ExperienceModalHeaderH2
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
              <Dialog.Content>
                <ExperienceDetailsIntroH2
                  description={intl.formatMessage(messages.modalDescription)}
                />
                <AwardDetailsSubformH2
                  recipientTypes={recipientTypes}
                  recognitionTypes={recognitionTypes}
                />
                <ProfileSkillSubformH2 keyPrefix="award" skills={userSkills} />
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

export default ProfileAwardModal;

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
  ExperienceDetailsIntroH2,
  ExperienceModalFooterH2,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import {
  PersonalDetailsFormValues,
  messages,
  PersonalDetailsSubformH2,
  experienceToDetails,
  detailsToExperience,
  personalValidationShape,
  newPersonalExperience,
} from "../../Application/ExperienceModals/PersonalExperienceModal";
import { getId } from "../../../helpers/queries";
import Dialog from "../../H2Components/Dialog";

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
    <div data-h2-system>
      <Dialog id={modalId} className="application-experience-dialog">
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
              <Dialog.Content>
                <ExperienceDetailsIntroH2
                  description={intl.formatMessage(messages.modalDescription)}
                />
                <PersonalDetailsSubformH2 />
                <ProfileSkillSubform keyPrefix="personal" skills={userSkills} />
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

export default ProfilePersonalModal;

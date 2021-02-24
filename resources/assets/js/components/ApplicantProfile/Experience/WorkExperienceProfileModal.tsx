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
  ProfileSkillSubformH2,
} from "./ProfileSkillSubform";
import { ExperienceSkill, ExperienceWork, Skill } from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
  ExperienceModalHeaderH2,
  ExperienceDetailsIntroH2,
  ExperienceModalFooterH2,
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
  WorkDetailsSubformH2,
} from "../../Application/ExperienceModals/WorkExperienceModal";
import { getId } from "../../../helpers/queries";
import Dialog from "../../H2Components/Dialog";

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
              <Dialog.Content>
                <ExperienceDetailsIntroH2
                  description={intl.formatMessage(messages.modalDescription)}
                />
                <WorkDetailsSubformH2 />
                <ProfileSkillSubformH2 keyPrefix="work" skills={userSkills} />
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

export default ProfileWorkModal;

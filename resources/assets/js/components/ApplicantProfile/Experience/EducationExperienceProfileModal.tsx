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
  ExperienceEducation,
  ExperienceSkill,
} from "../../../models/types";
import { ExperienceSubmitData } from "./ProfileExperienceCommon";
import {
  ExperienceModalHeaderH2,
  ExperienceDetailsIntroH2,
  ExperienceModalFooterH2,
} from "../../Application/ExperienceModals/ExperienceModalCommon";
import {
  EducationDetailsSubformH2,
  EducationDetailsFormValues,
  newExperienceEducation,
  experienceToDetails,
  educationExperienceValidationShape,
  detailsToExperience,
  messages,
  FormEducationType,
  FormEducationStatus,
} from "../../Application/ExperienceModals/EducationExperienceModal";
import { getId } from "../../../helpers/queries";
import Dialog from "../../H2Components/Dialog";

type EducationExperienceFormValues = SkillFormValues &
  EducationDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceEducation>,
  allSkills: Skill[],
  creatingNew: boolean,
): EducationExperienceFormValues => {
  return {
    ...experienceToDetails(data.experience, creatingNew),
    ...dataToFormSkills(data, allSkills),
  };
};

const formValuesToData = (
  formValues: EducationExperienceFormValues,
  originalExperience: ExperienceEducation,
): ExperienceSubmitData<ExperienceEducation> => {
  return {
    experience: detailsToExperience(formValues, originalExperience),
    savedSkills: formSkillsToData(formValues),
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
  onModalConfirm: (
    experience: ExperienceSubmitData<ExperienceEducation>,
  ) => Promise<void>;
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
    experienceEducation === null,
  );

  return (
    <div data-h2-system>
      <Dialog id={modalId} className="application-experience-dialog">
        <ExperienceModalHeaderH2
          title={intl.formatMessage(messages.modalTitle)}
          iconClass="fa-book"
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
                <EducationDetailsSubformH2
                  educationTypes={educationTypes}
                  educationStatuses={educationStatuses}
                />
                <ProfileSkillSubformH2
                  keyPrefix="education"
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

export default ProfileEducationModal;

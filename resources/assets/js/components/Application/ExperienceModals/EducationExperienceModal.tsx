import React, { FunctionComponent } from "react";
import { FastField, Field, Formik, Form } from "formik";
import { defineMessages, useIntl, IntlShape } from "react-intl";
import * as Yup from "yup";
import {
  EducationFormValues,
  EducationSubform,
  validationShape as educationValidationShape,
} from "./EducationSubform";
import TextInput from "../../Form/TextInput";
import CheckboxInput from "../../Form/CheckboxInput";
import { validationMessages } from "../../Form/Messages";
import SkillSubform, {
  SkillFormValues,
  validationShape as skillValidationShape,
} from "./SkillSubform";
import {
  Skill,
  ExperienceEducation,
  EducationType,
  EducationStatus,
} from "../../../models/types";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
  ExperienceSubmitData,
} from "./ExperienceModalCommon";
import Modal from "../../Modal";
import DateInput from "../../Form/DateInput";
import { toInputDateString, fromInputDateString } from "../../../helpers/dates";
import {
  Locales,
  localizeFieldNonNull,
  getLocale,
  matchValueToModel,
} from "../../../helpers/localize";
import { notEmpty } from "../../../helpers/queries";
import SelectInput from "../../Form/SelectInput";

export type FormEducationType = Pick<EducationType, "id" | "name">;

export type FormEducationStatus = Pick<EducationStatus, "id" | "name">;

interface EducationExperienceModalProps {
  modalId: string;
  experienceEducation: ExperienceEducation | null;
  educationTypes: FormEducationType[];
  educationStatuses: FormEducationStatus[];
  jobId: number;
  jobClassification: string;
  jobEducationRequirements: string | null;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperienceEducation["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (
    data: ExperienceSubmitData<ExperienceEducation>,
  ) => Promise<void>;
}

export const messages = defineMessages({
  modalTitle: {
    id: "application.educationExperienceModal.modalTitle",
    defaultMessage: "Add Education",
  },
  modalDescription: {
    id: "application.educationExperienceModal.modalDescription",
    defaultMessage:
      'Got creds? Share your degree, certificates, online courses, a trade apprenticeship, licences or alternative credentials. If you’ve learned something from a recognized educational provider, include your experiences here.  (Learned something from your community or on your own? Share this as a "Community Experience" or "Personal Experience".)',
  },
  educationTypeLabel: {
    id: "application.educationExperienceModal.educationTypeLabel",
    defaultMessage: "Type of Education",
  },
  educationTypeDefault: {
    id: "application.educationExperienceModal.educationTypeDefault",
    defaultMessage: "Select an education type...",
    description: "Default selection in the Education Type dropdown menu.",
  },
  areaStudyLabel: {
    id: "application.educationExperienceModal.areaStudyLabel",
    defaultMessage: "Area of Study",
  },
  areaStudyPlaceholder: {
    id: "application.educationExperienceModal.areaStudyPlaceholder",
    defaultMessage: "e.g. Organic Chemistry",
  },
  institutionLabel: {
    id: "application.educationExperienceModal.institutionLabel",
    defaultMessage: "Institution",
  },
  institutionPlaceholder: {
    id: "application.educationExperienceModal.institutionPlaceholder",
    defaultMessage: "e.g. Bishop's University",
  },
  completionLabel: {
    id: "application.educationExperienceModal.completionLabel",
    defaultMessage: "Completion Status",
  },
  completionDefault: {
    id: "application.educationExperienceModal.completionDefault",
    defaultMessage: "Select a completion status...",
  },
  thesisLabel: {
    id: "application.educationExperienceModal.thesisLabel",
    defaultMessage: "Thesis Title (Optional)",
  },
  thesisPlaceholder: {
    id: "application.educationExperienceModal.thesisPlaceholder",
    defaultMessage: "e.g. How bats navigate between each other during flight",
  },
  blockcertLabel: {
    id: "application.educationExperienceModal.blockcertLabel",
    defaultMessage: "Blockcert Link (Optional)",
  },
  blockcertInlineLabel: {
    id: "application.educationExperienceModal.blockcertInlineLabel",
    defaultMessage:
      "Yes, I have a Blockcert and can provide it on request. (Optional)",
  },
  startDateLabel: {
    id: "application.educationExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "application.educationExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "application.educationExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "application.educationExperienceModal.endDateLabel",
    defaultMessage: "Select an End Date",
  },
});

export const EducationDetailsSubform: FunctionComponent<{
  educationTypes: FormEducationType[];
  educationStatuses: FormEducationStatus[];
}> = ({ educationTypes, educationStatuses }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  return (
    <div data-c-container="medium">
      <div data-c-grid="gutter(all, 1) middle">
        <FastField
          id="education-educationTypeId"
          name="educationTypeId"
          label={intl.formatMessage(messages.educationTypeLabel)}
          grid="tl(1of2)"
          component={SelectInput}
          required
          nullSelection={intl.formatMessage(messages.educationTypeDefault)}
          options={educationTypes.map((type) => ({
            value: type.id,
            label: localizeFieldNonNull(locale, type, "name"),
          }))}
        />
        <FastField
          id="education-areaOfStudy"
          type="text"
          name="areaOfStudy"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.areaStudyLabel)}
          placeholder={intl.formatMessage(messages.areaStudyPlaceholder)}
        />
        <FastField
          id="education-institution"
          type="text"
          name="institution"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.institutionLabel)}
          placeholder={intl.formatMessage(messages.institutionPlaceholder)}
        />
        <FastField
          id="education-educationStatusId"
          name="educationStatusId"
          label={intl.formatMessage(messages.completionLabel)}
          grid="tl(1of2)"
          component={SelectInput}
          required
          nullSelection={intl.formatMessage(messages.completionDefault)}
          options={educationStatuses.map((status) => ({
            value: status.id,
            label: localizeFieldNonNull(locale, status, "name"),
          }))}
        />
        <FastField
          id="education-startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="education-isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="education-endDate"
          name="endDate"
          component={DateInput}
          grid="base(1of2)"
          label={intl.formatMessage(messages.endDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <FastField
          id="education-thesisTitle"
          type="text"
          name="thesisTitle"
          component={TextInput}
          grid="base(1of1)"
          label={intl.formatMessage(messages.thesisLabel)}
          placeholder={intl.formatMessage(messages.thesisPlaceholder)}
        />
        <div data-c-grid-item="base(1of1)">
          <FastField
            id="education-hasBlockcert"
            name="hasBlockcert"
            component={CheckboxInput}
            grid="base(1of1)"
            label={intl.formatMessage(messages.blockcertInlineLabel)}
            checkboxBorder
            borderLabel={intl.formatMessage(messages.blockcertLabel)}
          />
        </div>
      </div>
    </div>
  );
};

export interface EducationDetailsFormValues {
  educationTypeId: number | "";
  areaOfStudy: string;
  institution: string;
  educationStatusId: number | "";
  thesisTitle: string;
  startDate: string;
  isActive: boolean;
  endDate: string;
  hasBlockcert: boolean;
}

export const experienceToDetails = (
  experience: ExperienceEducation,
  creatingNew: boolean,
): EducationDetailsFormValues => {
  return {
    educationTypeId: creatingNew ? "" : experience.education_type_id,
    areaOfStudy: experience.area_of_study,
    institution: experience.institution,
    educationStatusId: creatingNew ? "" : experience.education_status_id,
    thesisTitle: experience.thesis_title ?? "",
    hasBlockcert: experience.has_blockcert,
    startDate: toInputDateString(experience.start_date),
    isActive: experience.is_active,
    endDate: experience.end_date ? toInputDateString(experience.end_date) : "",
  };
};

export const detailsToExperience = (
  formValues: EducationDetailsFormValues,
  originalExperience: ExperienceEducation,
): ExperienceEducation => {
  return {
    ...originalExperience,
    education_type_id: formValues.educationTypeId
      ? Number(formValues.educationTypeId)
      : 1,
    area_of_study: formValues.areaOfStudy,
    institution: formValues.institution,
    education_status_id: formValues.educationStatusId
      ? Number(formValues.educationStatusId)
      : 1,
    thesis_title: formValues.thesisTitle ? formValues.thesisTitle : "",
    has_blockcert: formValues.hasBlockcert,
    start_date: fromInputDateString(formValues.startDate),
    is_active: formValues.isActive,
    end_date: formValues.endDate
      ? fromInputDateString(formValues.endDate)
      : null,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const educationExperienceValidationShape = (intl: IntlShape) => {
  const requiredMsg = intl.formatMessage(validationMessages.required);
  const conditionalRequiredMsg = intl.formatMessage(
    validationMessages.endDateRequiredIfNotOngoing,
  );
  const inPastMsg = intl.formatMessage(validationMessages.dateMustBePast);
  const afterStartDateMsg = intl.formatMessage(
    validationMessages.endDateAfterStart,
  );
  return {
    educationTypeId: Yup.number().required(requiredMsg),
    areaOfStudy: Yup.string().required(requiredMsg),
    institution: Yup.string().required(requiredMsg),
    educationStatusId: Yup.number().required(requiredMsg),
    thesisTitle: Yup.string(),
    hasBlockcert: Yup.boolean(),
    startDate: Yup.date().required(requiredMsg).max(new Date(), inPastMsg),
    isActive: Yup.boolean(),
    endDate: Yup.date().when("isActive", {
      is: false,
      then: Yup.date()
        .required(conditionalRequiredMsg)
        .min(Yup.ref("startDate"), afterStartDateMsg),
      otherwise: Yup.date().min(Yup.ref("startDate"), afterStartDateMsg),
    }),
  };
};

export const newExperienceEducation = (
  experienceableId: number,
  experienceableType: ExperienceEducation["experienceable_type"],
): ExperienceEducation => ({
  id: 0,
  education_type_id: 0,
  education_type: { en: "", fr: "" },
  area_of_study: "",
  institution: "",
  education_status_id: 0,
  education_status: { en: "", fr: "" },
  thesis_title: "",
  has_blockcert: false,
  is_active: false,
  start_date: new Date(),
  end_date: null,
  is_education_requirement: false,
  experienceable_id: experienceableId,
  experienceable_type: experienceableType,
  type: "experience_education",
});

type EducationExperienceFormValues = SkillFormValues &
  EducationFormValues &
  EducationDetailsFormValues;

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceEducation>,
  locale: Locales,
  creatingNew: boolean,
): EducationExperienceFormValues => {
  const { experience, savedRequiredSkills, savedOptionalSkills } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experience.is_education_requirement,
    ...experienceToDetails(data.experience, creatingNew),
  };
};

const formValuesToData = (
  formValues: EducationExperienceFormValues,
  originalExperience: ExperienceEducation,
  locale: Locales,
  skills: Skill[],
): ExperienceSubmitData<ExperienceEducation> => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experience: {
      ...detailsToExperience(formValues, originalExperience),
      is_education_requirement: formValues.useAsEducationRequirement,
    },
    savedRequiredSkills: formValues.requiredSkills
      .map(nameToSkill)
      .filter(notEmpty),
    savedOptionalSkills: formValues.optionalSkills
      .map(nameToSkill)
      .filter(notEmpty),
  };
};

export const EducationExperienceModal: React.FC<EducationExperienceModalProps> = ({
  modalId,
  experienceEducation,
  educationTypes,
  educationStatuses,
  jobId,
  jobClassification,
  jobEducationRequirements,
  requiredSkills,
  savedRequiredSkills,
  optionalSkills,
  savedOptionalSkills,
  experienceableId,
  experienceableType,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const originalExperience =
    experienceEducation ??
    newExperienceEducation(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experience: originalExperience,
      savedRequiredSkills,
      savedOptionalSkills,
    },
    locale,
    experienceEducation === null,
  );

  const validationSchema = Yup.object().shape({
    ...skillValidationShape,
    ...educationValidationShape,
    ...educationExperienceValidationShape(intl),
  });

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
          await onModalConfirm(
            formValuesToData(values, originalExperience, locale, [
              ...requiredSkills,
              ...optionalSkills,
            ]),
          );
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
              <SkillSubform
                keyPrefix="education"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="education"
                jobClassification={jobClassification}
                jobEducationRequirements={jobEducationRequirements}
              />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EducationExperienceModal;

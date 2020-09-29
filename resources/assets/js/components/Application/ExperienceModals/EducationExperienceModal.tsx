import React from "react";
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
import { Skill, ExperienceEducation } from "../../../models/types";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
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
import { localizedFieldNonNull } from "../../../models/app";
import SelectInput from "../../Form/SelectInput";

export interface EducationType {
  id: number;
  name: localizedFieldNonNull;
}

export interface EducationStatus {
  id: number;
  name: localizedFieldNonNull;
}

interface EducationExperienceModalProps {
  modalId: string;
  experienceEducation: ExperienceEducation | null;
  educationTypes: EducationType[];
  educationStatuses: EducationStatus[];
  jobId: number;
  jobClassification: string;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperienceEducation["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: EducationExperienceSubmitData) => Promise<void>;
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
      "I have a Blockcert and can provide it on request. (Optional)",
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

type EducationExperienceFormValues = SkillFormValues &
  EducationFormValues &
  EducationDetailsFormValues;
export interface EducationExperienceSubmitData {
  experienceEducation: ExperienceEducation;
  savedRequiredSkills: Skill[];
  savedOptionalSkills: Skill[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validationShape = (intl: IntlShape) => {
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

const dataToFormValues = (
  data: EducationExperienceSubmitData,
  locale: Locales,
  creatingNew: boolean,
): EducationExperienceFormValues => {
  const {
    experienceEducation,
    savedRequiredSkills,
    savedOptionalSkills,
  } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experienceEducation.is_education_requirement,
    educationTypeId: creatingNew ? "" : experienceEducation.education_type_id,
    areaOfStudy: experienceEducation.area_of_study,
    institution: experienceEducation.institution,
    educationStatusId: creatingNew
      ? ""
      : experienceEducation.education_status_id,
    thesisTitle: experienceEducation.thesis_title ?? "",
    hasBlockcert: experienceEducation.has_blockcert,
    startDate: toInputDateString(experienceEducation.start_date),
    isActive: experienceEducation.is_active,
    endDate: experienceEducation.end_date
      ? toInputDateString(experienceEducation.end_date)
      : "",
  };
};

/* eslint-disable @typescript-eslint/camelcase */
const formValuesToData = (
  formValues: EducationExperienceFormValues,
  originalExperience: ExperienceEducation,
  locale: Locales,
  skills: Skill[],
): EducationExperienceSubmitData => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experienceEducation: {
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

const newExperienceEducation = (
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
/* eslint-enable @typescript-eslint/camelcase */

export const EducationExperienceModal: React.FC<EducationExperienceModalProps> = ({
  modalId,
  experienceEducation,
  educationTypes,
  educationStatuses,
  jobId,
  jobClassification,
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
      experienceEducation: originalExperience,
      savedRequiredSkills,
      savedOptionalSkills,
    },
    locale,
    experienceEducation === null,
  );

  const validationSchema = Yup.object().shape({
    ...skillValidationShape,
    ...educationValidationShape,
    ...validationShape(intl),
  });

  const detailsSubform = (
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
              {detailsSubform}
              <SkillSubform
                keyPrefix="education"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="education"
                jobClassification={jobClassification}
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

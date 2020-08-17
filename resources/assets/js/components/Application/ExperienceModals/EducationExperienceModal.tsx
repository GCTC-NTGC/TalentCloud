import React from "react";
import { FastField, Field, Formik, Form } from "formik";
import { defineMessages, useIntl, IntlShape } from "react-intl";
import * as Yup from "yup";
import {
  EducationSubformProps,
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

interface EducationType {
  id: number;
  name: localizedFieldNonNull;
}

interface EducationStatus {
  id: number;
  name: localizedFieldNonNull;
}

interface EducationExperienceModalProps {
  modalId: string;
  experienceEducation: ExperienceEducation | null;
  educationTypes: EducationType[];
  educationStatuses: EducationStatus[];
  jobId: number;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceRequirments: EducationSubformProps;
  experienceableId: number;
  experienceableType: ExperienceEducation["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: EducationExperienceSubmitData) => Promise<void>;
}

const messages = defineMessages({
  modalTitle: {
    id: "educationExperienceModal.modalTitle",
    defaultMessage: "Add Edcuation Experience",
  },
  modalDescription: {
    id: "educationExperienceModal.modalDescription",
    defaultMessage:
      'Got creds? Share your degree, certificates, online courses, a trade apprenticeship, licences or alternative credentials. If you’ve learned something from a recognized educational provider, include your experiences here.  (Learned something from your community or on your own? Share this as a "Community Experience" or "Personal Experience".)',
  },
  educationTypeLabel: {
    id: "educationExperienceModal.educationTypeLabel",
    defaultMessage: "Type of Education",
  },
  educationTypeDefault: {
    id: "educationExperienceModal.educationTypeDefault",
    defaultMessage: "Select an education type...",
    description: "Default selection in the Education Type dropdown menu.",
  },
  areaStudyLabel: {
    id: "educationExperienceModal.areaStudyLabel",
    defaultMessage: "Area of Study",
  },
  areaStudyPlaceholder: {
    id: "educationExperienceModal.areaStudyPlaceholder",
    defaultMessage: "e.g. Organic Chemistry",
  },
  institutionLabel: {
    id: "educationExperienceModal.institutionLabel",
    defaultMessage: "Institution",
  },
  institutionPlaceholder: {
    id: "educationExperienceModal.institutionPlaceholder",
    defaultMessage: "e.g. Bishop's University",
  },
  completionLabel: {
    id: "educationExperienceModal.completionLabel",
    defaultMessage: "Completion Status",
  },
  completionDefault: {
    id: "educationExperienceModal.completionDefault",
    defaultMessage: "Select a completion status...",
  },
  thesisLabel: {
    id: "educationExperienceModal.thesisLabel",
    defaultMessage: "Thesis Title (Optional)",
  },
  thesisPlaceholder: {
    id: "educationExperienceModal.thesisPlaceholder",
    defaultMessage: "e.g. How bats navigate between each other during flight",
  },
  blockcertLabel: {
    id: "educationExperienceModal.blockcertLabel",
    defaultMessage: "Blockcert Link (Optional)",
  },
  blockcertInlineLabel: {
    id: "educationExperienceModal.blockcertInlineLabel",
    defaultMessage:
      "I have a Blockcert and can provide it on request. (Optional)",
  },
  startDateLabel: {
    id: "educationExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "educationExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "educationExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "educationExperienceModal.endDateLabel",
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
interface EducationExperienceSubmitData {
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
  area_of_study: "",
  institution: "",
  education_status_id: 0,
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
  requiredSkills,
  savedRequiredSkills,
  optionalSkills,
  savedOptionalSkills,
  experienceRequirments,
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
          id="educationTypeId"
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
          id="areaOfStudy"
          type="text"
          name="areaOfStudy"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.areaStudyLabel)}
          placeholder={intl.formatMessage(messages.areaStudyPlaceholder)}
        />
        <FastField
          id="institution"
          type="text"
          name="institution"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.institutionLabel)}
          placeholder={intl.formatMessage(messages.institutionPlaceholder)}
        />
        <FastField
          id="educationStatusId"
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
          id="startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="endDate"
          name="endDate"
          component={DateInput}
          grid="base(1of2)"
          label={intl.formatMessage(messages.endDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <FastField
          id="thesisTitle"
          type="text"
          name="thesisTitle"
          component={TextInput}
          grid="base(1of1)"
          label={intl.formatMessage(messages.thesisLabel)}
          placeholder={intl.formatMessage(messages.thesisPlaceholder)}
        />
        <div data-c-input="checkbox(group)" data-c-grid-item="base(1of1)">
          <label>{intl.formatMessage(messages.blockcertLabel)}</label>
          <FastField
            id="hasBlockcert"
            name="hasBlockcert"
            component={CheckboxInput}
            grid="base(1of1)"
            label={intl.formatMessage(messages.blockcertInlineLabel)}
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
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform {...experienceRequirments} />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EducationExperienceModal;

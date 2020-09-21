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
import { Skill, ExperiencePersonal } from "../../../models/types";
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
import TextAreaInput from "../../Form/TextAreaInput";
import { countNumberOfWords } from "../../WordCounter/helpers";

interface PersonalExperienceModalProps {
  modalId: string;
  experiencePersonal: ExperiencePersonal | null;
  jobId: number;
  jobClassification: string;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperiencePersonal["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: PersonalExperienceSubmitData) => Promise<void>;
}

export const messages = defineMessages({
  modalTitle: {
    id: "application.personalExperienceModal.modalTitle",
    defaultMessage: "Add Personal Experience",
  },
  modalDescription: {
    id: "application.personalExperienceModal.modalDescription",
    defaultMessage:
      "People are more than just education and work experiences. We want to make space for you to share your learning from other experiences. To protect your privacy, please don't share sensitive information about yourself or others. A good measure would be if you are comfortable with all your colleagues knowing it. (Hint: Focus on the skills for the job when you decide on what examples to share.)",
  },
  titleLabel: {
    id: "application.personalExperienceModal.titleLabel",
    defaultMessage: "Give this experience a title:",
  },
  titlePlaceholder: {
    id: "application.personalExperienceModal.titlePlaceholder",
    defaultMessage: "e.g. My Parenting Experience",
  },
  descriptionLabel: {
    id: "application.personalExperienceModal.descriptionLabel",
    defaultMessage: "Describe the project or activity:",
  },
  descriptionPlaceholder: {
    id: "application.personalExperienceModal.descriptionPlaceholder",
    defaultMessage: "e.g. I have extensive experience in...",
  },
  isShareableLabel: {
    id: "application.personalExperienceModal.isShareableLabel",
    defaultMessage: "Sharing Consent",
  },
  isShareableInlineLabel: {
    id: "application.personalExperienceModal.isShareableInlineLabel",
    defaultMessage:
      "This information is not sensitive in nature and I am comfortable sharing it with the staff managing this job application.",
  },
  startDateLabel: {
    id: "application.personalExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "application.personalExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "application.personalExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "application.personalExperienceModal.endDateLabel",
    defaultMessage: "Select an End Date",
  },
});

export interface PersonalDetailsFormValues {
  title: string;
  description: string;
  isShareable: boolean;
  startDate: string;
  isActive: boolean;
  endDate: string;
}

type PersonalExperienceFormValues = SkillFormValues &
  EducationFormValues &
  PersonalDetailsFormValues;
export interface PersonalExperienceSubmitData {
  experiencePersonal: ExperiencePersonal;
  savedRequiredSkills: Skill[];
  savedOptionalSkills: Skill[];
}

const DESCRIPTION_WORD_LIMIT = 100;

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
  const tooLong = intl.formatMessage(validationMessages.tooLong);
  return {
    title: Yup.string().required(requiredMsg),
    description: Yup.string()
      .required(requiredMsg)
      .test(
        "under-word-limit",
        tooLong,
        (value: string) => countNumberOfWords(value) <= DESCRIPTION_WORD_LIMIT,
      ),
    isShareable: Yup.boolean(),
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
  data: PersonalExperienceSubmitData,
  locale: Locales,
): PersonalExperienceFormValues => {
  const { experiencePersonal, savedRequiredSkills, savedOptionalSkills } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experiencePersonal.is_education_requirement,
    title: experiencePersonal.title,
    description: experiencePersonal.description,
    isShareable: experiencePersonal.is_shareable,
    startDate: toInputDateString(experiencePersonal.start_date),
    isActive: experiencePersonal.is_active,
    endDate: experiencePersonal.end_date
      ? toInputDateString(experiencePersonal.end_date)
      : "",
  };
};

/* eslint-disable @typescript-eslint/camelcase */
const formValuesToData = (
  formValues: PersonalExperienceFormValues,
  originalExperience: ExperiencePersonal,
  locale: Locales,
  skills: Skill[],
): PersonalExperienceSubmitData => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experiencePersonal: {
      ...originalExperience,
      title: formValues.title,
      description: formValues.description,
      is_shareable: formValues.isShareable,
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

const newPersonalExperience = (
  experienceableId: number,
  experienceableType: ExperiencePersonal["experienceable_type"],
): ExperiencePersonal => ({
  id: 0,
  title: "",
  description: "",
  is_shareable: false,
  is_active: false,
  start_date: new Date(),
  end_date: null,
  is_education_requirement: false,
  experienceable_id: experienceableId,
  experienceable_type: experienceableType,
  type: "experience_personal",
});
/* eslint-enable @typescript-eslint/camelcase */

export const PersonalExperienceModal: React.FC<PersonalExperienceModalProps> = ({
  modalId,
  experiencePersonal,
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
    experiencePersonal ??
    newPersonalExperience(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experiencePersonal: originalExperience,
      savedRequiredSkills,
      savedOptionalSkills,
    },
    locale,
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
          id="personal-title"
          name="title"
          type="text"
          grid="base(1of1)"
          component={TextInput}
          required
          label={intl.formatMessage(messages.titleLabel)}
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
        />
        <FastField
          id="personal-description"
          type="text"
          name="description"
          component={TextAreaInput}
          required
          grid="tl(1of1)"
          label={intl.formatMessage(messages.descriptionLabel)}
          placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
          wordLimit={DESCRIPTION_WORD_LIMIT}
        />
        <div data-c-input="checkbox(group)" data-c-grid-item="base(1of1)">
          <label>{intl.formatMessage(messages.isShareableLabel)}</label>
          <FastField
            id="personal-isShareable"
            name="isShareable"
            component={CheckboxInput}
            grid="base(1of1)"
            label={intl.formatMessage(messages.isShareableInlineLabel)}
            checkboxGroup
          />
        </div>
        <FastField
          id="personal-startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="personal-isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="personal-endDate"
          name="endDate"
          component={DateInput}
          grid="base(1of2)"
          label={intl.formatMessage(messages.endDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
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
        iconClass="fa-mountain"
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
                keyPrefix="personal"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="personal"
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

export default PersonalExperienceModal;

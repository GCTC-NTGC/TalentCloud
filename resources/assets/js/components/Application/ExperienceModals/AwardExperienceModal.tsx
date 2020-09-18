import React from "react";
import { FastField, Formik, Form } from "formik";
import { defineMessages, useIntl, IntlShape } from "react-intl";
import * as Yup from "yup";
import {
  EducationFormValues,
  EducationSubform,
  validationShape as educationValidationShape,
} from "./EducationSubform";
import TextInput from "../../Form/TextInput";
import { validationMessages } from "../../Form/Messages";
import SkillSubform, {
  SkillFormValues,
  validationShape as skillValidationShape,
} from "./SkillSubform";
import { Skill, ExperienceAward } from "../../../models/types";
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

export interface AwardRecipientType {
  id: number;
  name: localizedFieldNonNull;
}

export interface AwardRecognitionType {
  id: number;
  name: localizedFieldNonNull;
}

interface AwardExperienceModalProps {
  modalId: string;
  experienceAward: ExperienceAward | null;
  recipientTypes: AwardRecipientType[];
  recognitionTypes: AwardRecognitionType[];
  jobId: number;
  jobClassification: string;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperienceAward["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: AwardExperienceSubmitData) => Promise<void>;
}

export const messages = defineMessages({
  modalTitle: {
    id: "application.awardExperienceModal.modalTitle",
    defaultMessage: "Add an Award",
  },
  modalDescription: {
    id: "application.awardExperienceModal.modalDescription",
    defaultMessage:
      "Did you get recognized for going above and beyond? There are many ways to get recognized, awards are just one of them. (Here’s an opportunity to share how you’ve been recognized.)",
  },
  titleLabel: {
    id: "application.awardExperienceModal.titleLabel",
    defaultMessage: "Award Title",
  },
  titlePlaceholder: {
    id: "application.awardExperienceModal.titlePlaceholder",
    defaultMessage: "e.g. My Award",
  },
  recipientTypeLabel: {
    id: "application.awardExperienceModal.recipientTypeLabel",
    defaultMessage: "Awarded to...",
  },
  recipientTypePlaceholder: {
    id: "application.awardExperienceModal.recipientTypePlaceholder",
    defaultMessage: "Select an option...",
    description: "Default selection in the Recipient Type dropdown menu.",
  },
  issuerLabel: {
    id: "application.awardExperienceModal.issuerLabel",
    defaultMessage: "Issuing Organization or Institution",
  },
  issuerPlaceholder: {
    id: "application.awardExperienceModal.issuerPlaceholder",
    defaultMessage: "e.g. Government of Canada",
  },
  recognitionTypeLabel: {
    id: "application.awardExperienceModal.recognitionTypeLabel",
    defaultMessage: "Scope of the Award",
  },
  recognitionTypePlaceholder: {
    id: "application.awardExperienceModal.recognitionTypePlaceholder",
    defaultMessage: "Select a scope...",
  },
  awardedDateLabel: {
    id: "application.awardExperienceModal.awardedDateLabel",
    defaultMessage: "Date Awarded",
  },
  datePlaceholder: {
    id: "application.awardExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
});

export interface AwardDetailsFormValues {
  title: string;
  recipientTypeId: number | "";
  issuedBy: string;
  recognitionTypeId: number | "";
  awardedDate: string;
}

type AwardExperienceFormValues = SkillFormValues &
  EducationFormValues &
  AwardDetailsFormValues;
export interface AwardExperienceSubmitData {
  experienceAward: ExperienceAward;
  savedRequiredSkills: Skill[];
  savedOptionalSkills: Skill[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validationShape = (intl: IntlShape) => {
  const requiredMsg = intl.formatMessage(validationMessages.required);
  const inPastMsg = intl.formatMessage(validationMessages.dateMustBePast);
  return {
    title: Yup.string().required(requiredMsg),
    recipientTypeId: Yup.number().required(requiredMsg),
    issuedBy: Yup.string().required(requiredMsg),
    recognitionTypeId: Yup.number().required(requiredMsg),
    awardedDate: Yup.date().required(requiredMsg).max(new Date(), inPastMsg),
  };
};

const dataToFormValues = (
  data: AwardExperienceSubmitData,
  locale: Locales,
  creatingNew: boolean,
): AwardExperienceFormValues => {
  const { experienceAward, savedRequiredSkills, savedOptionalSkills } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experienceAward.is_education_requirement,
    title: experienceAward.title,
    recipientTypeId: creatingNew ? "" : experienceAward.award_recipient_type_id,
    issuedBy: experienceAward.issued_by,
    recognitionTypeId: creatingNew
      ? ""
      : experienceAward.award_recognition_type_id,
    awardedDate: toInputDateString(experienceAward.awarded_date),
  };
};

/* eslint-disable @typescript-eslint/camelcase */
const formValuesToData = (
  formValues: AwardExperienceFormValues,
  originalExperience: ExperienceAward,
  locale: Locales,
  skills: Skill[],
): AwardExperienceSubmitData => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experienceAward: {
      ...originalExperience,
      title: formValues.title,
      award_recipient_type_id: formValues.recipientTypeId
        ? Number(formValues.recipientTypeId)
        : 1,
      issued_by: formValues.issuedBy,
      award_recognition_type_id: formValues.recognitionTypeId
        ? Number(formValues.recognitionTypeId)
        : 1,
      awarded_date: fromInputDateString(formValues.awardedDate),
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

const newExperienceAward = (
  experienceableId: number,
  experienceableType: ExperienceAward["experienceable_type"],
): ExperienceAward => ({
  id: 0,
  title: "",
  award_recipient_type_id: 0,
  award_recipient_type: { en: "", fr: "" },
  issued_by: "",
  award_recognition_type_id: 0,
  award_recognition_type: { en: "", fr: "" },
  awarded_date: new Date(),
  is_education_requirement: false,
  experienceable_id: experienceableId,
  experienceable_type: experienceableType,
  type: "experience_award",
});
/* eslint-enable @typescript-eslint/camelcase */

export const AwardExperienceModal: React.FC<AwardExperienceModalProps> = ({
  modalId,
  experienceAward,
  recipientTypes,
  recognitionTypes,
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
    experienceAward ?? newExperienceAward(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experienceAward: originalExperience,
      savedRequiredSkills,
      savedOptionalSkills,
    },
    locale,
    experienceAward === null,
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
          id="award-title"
          type="text"
          name="title"
          component={TextInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.titleLabel)}
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
        />
        <FastField
          id="award-recipientTypeId"
          name="recipientTypeId"
          label={intl.formatMessage(messages.recipientTypeLabel)}
          grid="tl(1of2)"
          component={SelectInput}
          required
          nullSelection={intl.formatMessage(messages.recipientTypePlaceholder)}
          options={recipientTypes.map((type) => ({
            value: type.id,
            label: localizeFieldNonNull(locale, type, "name"),
          }))}
        />
        <FastField
          id="award-issuedBy"
          type="text"
          name="issuedBy"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.issuerLabel)}
          placeholder={intl.formatMessage(messages.issuerPlaceholder)}
        />
        <FastField
          id="award-recognitionTypeId"
          name="recognitionTypeId"
          label={intl.formatMessage(messages.recognitionTypeLabel)}
          grid="tl(1of2)"
          component={SelectInput}
          required
          nullSelection={intl.formatMessage(
            messages.recognitionTypePlaceholder,
          )}
          options={recognitionTypes.map((status) => ({
            value: status.id,
            label: localizeFieldNonNull(locale, status, "name"),
          }))}
        />
        <FastField
          id="award-awardedDate"
          name="awardedDate"
          component={DateInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.awardedDateLabel)}
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
                keyPrefix="award"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="award"
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

export default AwardExperienceModal;

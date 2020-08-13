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
import { ExperienceWork, Skill } from "../../../models/types";
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

interface WorkExperienceModalProps {
  modalId: string;
  experienceWork: ExperienceWork | null;
  jobId: number;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceRequirments: EducationSubformProps;
  experienceableId: number;
  experienceableType: ExperienceWork["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: WorkExperienceSubmitData) => Promise<void>;
}

const messages = defineMessages({
  modalTitle: {
    id: "workExperienceModal.modalTitle",
    defaultMessage: "Add Work Experience",
  },
  modalDescription: {
    id: "workExperienceModal.modalDescription",
    defaultMessage:
      'Did work? Share your experiences gained from full-time positions, part-time positions, self-employment, fellowships or internships.  (Did some volunteering? Share this as a "Community Experience".)',
  },
  jobTitleLabel: {
    id: "workExperienceModal.jobTitleLabel",
    defaultMessage: "My Role/Job Title",
  },
  jobTitlePlaceholder: {
    id: "workExperienceModal.jobTitlePlaceholder",
    defaultMessage: "e.g. Front-end Development",
  },
  orgNameLabel: {
    id: "workExperienceModal.orgNameLabel",
    defaultMessage: "Organization/Company",
  },
  orgNamePlaceholder: {
    id: "workExperienceModal.orgNamePlaceholder",
    defaultMessage: "e.g. Government of Canada",
  },
  groupLabel: {
    id: "workExperienceModal.groupLabel",
    defaultMessage: "Team, Group, or Division",
  },
  groupPlaceholder: {
    id: "workExperienceModal.groupPlaceholder",
    defaultMessage: "e.g. Talent Cloud",
  },
  startDateLabel: {
    id: "workExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "workExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "workExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "workExperienceModal.endDateLabel",
    defaultMessage: "Select an End Date",
  },
});

export interface WorkDetailsFormValues {
  title: string;
  organization: string;
  group: string;
  startDate: string;
  isActive: boolean;
  endDate: string;
}

type WorkExperienceFormValues = SkillFormValues &
  EducationFormValues &
  WorkDetailsFormValues;
interface WorkExperienceSubmitData {
  experienceWork: ExperienceWork;
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
    title: Yup.string().required(requiredMsg),
    organization: Yup.string().required(requiredMsg),
    group: Yup.string().required(requiredMsg),
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
  data: WorkExperienceSubmitData,
  locale: Locales,
): WorkExperienceFormValues => {
  const { experienceWork, savedRequiredSkills, savedOptionalSkills } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experienceWork.is_education_requirement,
    title: experienceWork.title,
    organization: experienceWork.organization,
    group: experienceWork.group,
    startDate: toInputDateString(experienceWork.start_date),
    isActive: experienceWork.is_active,
    endDate: experienceWork.end_date
      ? toInputDateString(experienceWork.end_date)
      : "",
  };
};

/* eslint-disable @typescript-eslint/camelcase */
const formValuesToData = (
  formValues: WorkExperienceFormValues,
  originalExperience: ExperienceWork,
  locale: Locales,
  skills: Skill[],
): WorkExperienceSubmitData => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experienceWork: {
      ...originalExperience,
      title: formValues.title,
      organization: formValues.organization,
      group: formValues.group,
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

const newExperienceWork = (
  experienceableId: number,
  experienceableType: ExperienceWork["experienceable_type"],
): ExperienceWork => ({
  id: 0,
  title: "",
  organization: "",
  group: "",
  is_active: false,
  start_date: new Date(),
  end_date: null,
  is_education_requirement: false,
  experienceable_id: experienceableId,
  experienceable_type: experienceableType,
  type: "experience_work",
});
/* eslint-enable @typescript-eslint/camelcase */

export const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  modalId,
  experienceWork,
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
    experienceWork ?? newExperienceWork(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experienceWork: originalExperience,
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
          id="title"
          type="text"
          name="title"
          component={TextInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.jobTitleLabel)}
          placeholder={intl.formatMessage(messages.jobTitlePlaceholder)}
        />
        <FastField
          id="organization"
          type="text"
          name="organization"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.orgNameLabel)}
          placeholder={intl.formatMessage(messages.orgNamePlaceholder)}
        />
        <FastField
          id="group"
          type="text"
          name="group"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.groupLabel)}
          placeholder={intl.formatMessage(messages.groupPlaceholder)}
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
        iconClass="fa-briefcase"
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

export default WorkExperienceModal;

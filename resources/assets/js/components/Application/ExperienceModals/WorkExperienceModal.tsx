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
import { ExperienceWork, Skill } from "../../../models/types";
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

export const messages = defineMessages({
  modalTitle: {
    id: "application.workExperienceModal.modalTitle",
    defaultMessage: "Add Work Experience",
  },
  modalDescription: {
    id: "application.workExperienceModal.modalDescription",
    defaultMessage:
      'Did work? Share your experiences gained from full-time positions, part-time positions, self-employment, fellowships or internships.  (Did some volunteering? Share this as a "Community Experience".)',
  },
  jobTitleLabel: {
    id: "application.workExperienceModal.jobTitleLabel",
    defaultMessage: "My Role/Job Title",
  },
  jobTitlePlaceholder: {
    id: "application.workExperienceModal.jobTitlePlaceholder",
    defaultMessage: "e.g. Front-end Development",
  },
  orgNameLabel: {
    id: "application.workExperienceModal.orgNameLabel",
    defaultMessage: "Organization/Company",
  },
  orgNamePlaceholder: {
    id: "application.workExperienceModal.orgNamePlaceholder",
    defaultMessage: "e.g. Government of Canada",
  },
  groupLabel: {
    id: "application.workExperienceModal.groupLabel",
    defaultMessage: "Team, Group, or Division",
  },
  groupPlaceholder: {
    id: "application.workExperienceModal.groupPlaceholder",
    defaultMessage: "e.g. Talent Cloud",
  },
  startDateLabel: {
    id: "application.workExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "application.workExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "application.workExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "application.workExperienceModal.endDateLabel",
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const workValidationShape = (intl: IntlShape) => {
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

export const experienceToDetails = (
  experienceWork: ExperienceWork,
): WorkDetailsFormValues => {
  return {
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

const dataToFormValues = (
  data: ExperienceSubmitData<ExperienceWork>,
  locale: Locales,
): WorkExperienceFormValues => {
  const { experience, savedRequiredSkills, savedOptionalSkills } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    ...experienceToDetails(data.experience),
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experience.is_education_requirement,
  };
};

export const detailsToExperience = (
  formValues: WorkDetailsFormValues,
  originalExperience: ExperienceWork,
): ExperienceWork => {
  return {
    ...originalExperience,
    title: formValues.title,
    organization: formValues.organization,
    group: formValues.group,
    start_date: fromInputDateString(formValues.startDate),
    is_active: formValues.isActive,
    end_date: formValues.endDate
      ? fromInputDateString(formValues.endDate)
      : null,
  };
};

const formValuesToData = (
  formValues: WorkExperienceFormValues,
  originalExperience: ExperienceWork,
  locale: Locales,
  skills: Skill[],
): ExperienceSubmitData<ExperienceWork> => {
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

export const newExperienceWork = (
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

export const WorkDetailsSubform: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <div data-c-container="medium">
      <div data-c-grid="gutter(all, 1) middle">
        <FastField
          id="work-title"
          type="text"
          name="title"
          component={TextInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.jobTitleLabel)}
          placeholder={intl.formatMessage(messages.jobTitlePlaceholder)}
        />
        <FastField
          id="work-organization"
          type="text"
          name="organization"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.orgNameLabel)}
          placeholder={intl.formatMessage(messages.orgNamePlaceholder)}
        />
        <FastField
          id="work-group"
          type="text"
          name="group"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.groupLabel)}
          placeholder={intl.formatMessage(messages.groupPlaceholder)}
        />
        <FastField
          id="work-startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="work-isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="work-endDate"
          name="endDate"
          component={DateInput}
          grid="base(1of2)"
          label={intl.formatMessage(messages.endDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
      </div>
    </div>
  );
};
export const WorkDetailsSubformH2: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <div data-h2-container="b(center, medium)">
      {/** TODO: Change to H2 grid. But this requires H2 versions of input elements as well. */}
      <div data-c-grid="gutter(all, 1) middle">
        <FastField
          id="work-title"
          type="text"
          name="title"
          component={TextInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.jobTitleLabel)}
          placeholder={intl.formatMessage(messages.jobTitlePlaceholder)}
        />
        <FastField
          id="work-organization"
          type="text"
          name="organization"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.orgNameLabel)}
          placeholder={intl.formatMessage(messages.orgNamePlaceholder)}
        />
        <FastField
          id="work-group"
          type="text"
          name="group"
          component={TextInput}
          required
          grid="base(1of2)"
          label={intl.formatMessage(messages.groupLabel)}
          placeholder={intl.formatMessage(messages.groupPlaceholder)}
        />
        <FastField
          id="work-startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="work-isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="work-endDate"
          name="endDate"
          component={DateInput}
          grid="base(1of2)"
          label={intl.formatMessage(messages.endDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
      </div>
    </div>
  );
};

interface WorkExperienceModalProps {
  modalId: string;
  experienceWork: ExperienceWork | null;
  jobId: number;
  classificationEducationRequirements: string | null;
  jobEducationRequirements: string | null;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperienceWork["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: ExperienceSubmitData<ExperienceWork>) => Promise<void>;
}

export const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  modalId,
  experienceWork,
  jobId,
  classificationEducationRequirements,
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
    experienceWork ?? newExperienceWork(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experience: originalExperience,
      savedRequiredSkills,
      savedOptionalSkills,
    },
    locale,
  );

  const validationSchema = Yup.object().shape({
    ...skillValidationShape,
    ...educationValidationShape,
    ...workValidationShape(intl),
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
              <WorkDetailsSubform />
              <SkillSubform
                keyPrefix="work"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="work"
                classificationEducationRequirements={
                  classificationEducationRequirements
                }
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

export default WorkExperienceModal;

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
import { Skill, ExperienceCommunity } from "../../../models/types";
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

export const messages = defineMessages({
  modalTitle: {
    id: "application.communityExperienceModal.modalTitle",
    defaultMessage: "Add Community Experience",
  },
  modalDescription: {
    id: "application.communityExperienceModal.modalDescription",
    defaultMessage:
      "Gained experience by being part of or giving back to a community? People learn skills from a wide range of experiences like volunteering or being part of non-profit organizations, indigenous communities, or virtual collaborations. (Here’s an opportunity to share the skills that your community has helped you develop.)",
  },
  titleLabel: {
    id: "application.communityExperienceModal.titleLabel",
    defaultMessage: "My Role / Job Title",
  },
  titlePlaceholder: {
    id: "application.communityExperienceModal.titlePlaceholder",
    defaultMessage: "e.g. Front-end Development",
  },
  groupLabel: {
    id: "application.communityExperienceModal.groupLabel",
    defaultMessage: "Group / Organization / Community",
  },
  groupPlaceholder: {
    id: "application.communityExperienceModal.groupPlaceholder",
    defaultMessage: "e.g. Government of Canada",
  },
  projectLabel: {
    id: "application.communityExperienceModal.projectLabel",
    defaultMessage: "Project / Product Name",
  },
  projectPlaceholder: {
    id: "application.communityExperienceModal.projectPlaceholder",
    defaultMessage: "e.g. Talent Cloud",
  },
  startDateLabel: {
    id: "application.communityExperienceModal.startDateLabel",
    defaultMessage: "Select a Start Date",
  },
  datePlaceholder: {
    id: "application.communityExperienceModal.datePlaceholder",
    defaultMessage: "yyyy-mm-dd",
  },
  isActiveLabel: {
    id: "application.communityExperienceModal.isActiveLabel",
    defaultMessage: "This experience is still ongoing, or...",
    description: "Label for checkbox that indicates work is still ongoing.",
  },
  endDateLabel: {
    id: "application.communityExperienceModal.endDateLabel",
    defaultMessage: "Select an End Date",
  },
});

export interface CommunityDetailsFormValues {
  title: string;
  group: string;
  project: string;
  startDate: string;
  isActive: boolean;
  endDate: string;
}

type CommunityExperienceFormValues = SkillFormValues &
  EducationFormValues &
  CommunityDetailsFormValues;
export interface CommunityExperienceSubmitData {
  experienceCommunity: ExperienceCommunity;
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
    group: Yup.string().required(requiredMsg),
    project: Yup.string().required(requiredMsg),
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

const experienceToDetails = (
  experienceCommunity: ExperienceCommunity,
): CommunityDetailsFormValues => {
  return {
    title: experienceCommunity.title,
    group: experienceCommunity.group,
    project: experienceCommunity.project,
    startDate: toInputDateString(experienceCommunity.start_date),
    isActive: experienceCommunity.is_active,
    endDate: experienceCommunity.end_date
      ? toInputDateString(experienceCommunity.end_date)
      : "",
  };
};

const dataToFormValues = (
  data: CommunityExperienceSubmitData,
  locale: Locales,
): CommunityExperienceFormValues => {
  const {
    experienceCommunity,
    savedRequiredSkills,
    savedOptionalSkills,
  } = data;
  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");
  return {
    ...experienceToDetails(data.experienceCommunity),
    requiredSkills: savedRequiredSkills.map(skillToName),
    optionalSkills: savedOptionalSkills.map(skillToName),
    useAsEducationRequirement: experienceCommunity.is_education_requirement,
  };
};

const detailsToExperience = (
  formValues: CommunityDetailsFormValues,
  originalExperience: ExperienceCommunity,
): ExperienceCommunity => {
  return {
    ...originalExperience,
    title: formValues.title,
    group: formValues.group,
    project: formValues.project,
    start_date: fromInputDateString(formValues.startDate),
    is_active: formValues.isActive,
    end_date: formValues.endDate
      ? fromInputDateString(formValues.endDate)
      : null,
  };
};

const formValuesToData = (
  formValues: CommunityExperienceFormValues,
  originalExperience: ExperienceCommunity,
  locale: Locales,
  skills: Skill[],
): CommunityExperienceSubmitData => {
  const nameToSkill = (name: string): Skill | null =>
    matchValueToModel(locale, "name", name, skills);
  return {
    experienceCommunity: {
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

const newCommunityExperience = (
  experienceableId: number,
  experienceableType: ExperienceCommunity["experienceable_type"],
): ExperienceCommunity => ({
  id: 0,
  title: "",
  group: "",
  project: "",
  is_active: false,
  start_date: new Date(),
  end_date: null,
  is_education_requirement: false,
  experienceable_id: experienceableId,
  experienceable_type: experienceableType,
  type: "experience_community",
});

const DetailsSubform: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <div data-c-container="medium">
      <div data-c-grid="gutter(all, 1) middle">
        <FastField
          id="community-title"
          name="title"
          type="text"
          grid="base(1of1)"
          component={TextInput}
          required
          label={intl.formatMessage(messages.titleLabel)}
          placeholder={intl.formatMessage(messages.titlePlaceholder)}
        />
        <FastField
          id="community-group"
          type="text"
          name="group"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.groupLabel)}
          placeholder={intl.formatMessage(messages.groupPlaceholder)}
        />
        <FastField
          id="community-project"
          type="text"
          name="project"
          component={TextInput}
          required
          grid="tl(1of2)"
          label={intl.formatMessage(messages.projectLabel)}
          placeholder={intl.formatMessage(messages.projectPlaceholder)}
        />
        <FastField
          id="community-startDate"
          name="startDate"
          component={DateInput}
          required
          grid="base(1of1)"
          label={intl.formatMessage(messages.startDateLabel)}
          placeholder={intl.formatMessage(messages.datePlaceholder)}
        />
        <Field
          id="community-isActive"
          name="isActive"
          component={CheckboxInput}
          grid="tl(1of2)"
          label={intl.formatMessage(messages.isActiveLabel)}
        />
        <Field
          id="community-endDate"
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

interface ProfileCommunityModalProps {
  modalId: string;
  experienceCommunity: ExperienceCommunity | null;
  experienceableId: number;
  experienceableType: ExperienceCommunity["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: ExperienceCommunity) => Promise<void>;
}

export const ProfileCommunityModal: FunctionComponent<ProfileCommunityModalProps> = ({
  modalId,
  experienceCommunity,
  experienceableId,
  experienceableType,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
}) => {
  const intl = useIntl();

  const originalExperience =
    experienceCommunity ??
    newCommunityExperience(experienceableId, experienceableType);

  const initialFormValues = experienceToDetails(originalExperience);

  const validationSchema = Yup.object().shape({
    ...validationShape(intl),
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
        iconClass="fa-people-carry"
      />
      <Formik
        enableReinitialize
        initialValues={initialFormValues}
        onSubmit={async (values, actions): Promise<void> => {
          await onModalConfirm(detailsToExperience(values, originalExperience));
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
              <DetailsSubform />
            </Modal.Body>
            <ExperienceModalFooter buttonsDisabled={formikProps.isSubmitting} />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
interface CommunityExperienceModalProps {
  modalId: string;
  experienceCommunity: ExperienceCommunity | null;
  jobId: number;
  classificationEducationRequirements: string | null;
  jobEducationRequirements: string | null;
  requiredSkills: Skill[];
  savedRequiredSkills: Skill[];
  optionalSkills: Skill[];
  savedOptionalSkills: Skill[];
  experienceableId: number;
  experienceableType: ExperienceCommunity["experienceable_type"];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: CommunityExperienceSubmitData) => Promise<void>;
}

export const CommunityExperienceModal: React.FC<CommunityExperienceModalProps> = ({
  modalId,
  experienceCommunity,
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
    experienceCommunity ??
    newCommunityExperience(experienceableId, experienceableType);

  const skillToName = (skill: Skill): string =>
    localizeFieldNonNull(locale, skill, "name");

  const initialFormValues = dataToFormValues(
    {
      experienceCommunity: originalExperience,
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
        iconClass="fa-people-carry"
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
              <DetailsSubform />
              <SkillSubform
                keyPrefix="community"
                jobId={jobId}
                jobRequiredSkills={requiredSkills.map(skillToName)}
                jobOptionalSkills={optionalSkills.map(skillToName)}
              />
              <EducationSubform
                keyPrefix="community"
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

export default CommunityExperienceModal;

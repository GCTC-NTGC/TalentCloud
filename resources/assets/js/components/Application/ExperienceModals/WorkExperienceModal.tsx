import React from "react";
import { FastField, Field, Formik, Form } from "formik";
import { defineMessages, useIntl, IntlShape } from "react-intl";
import * as Yup from "yup";
import {
  EducationSubformProps,
  EducationFormValues,
  EducationSubform,
} from "./EducationSubform";
import BaseExperienceModal from "./BaseExperienceModal";
import TextInput from "../../Form/TextInput";
import Input from "../../Input";
import CheckboxInput from "../../Form/CheckboxInput";
import { validationMessages } from "../../Form/Messages";
import SkillSubform, { SkillFormValues } from "./SkillSubform";
import { ExperienceWork } from "../../../models/types";
import {
  ExperienceModalHeader,
  ExperienceDetailsIntro,
  ExperienceModalFooter,
} from "./ExperienceModalCommon";
import Modal from "../../Modal";

interface WorkExperienceModalProps {
  modalId: string;
  title: string;
  iconClass: string;
  description: string;
  experienceWork: ExperienceWork;
  jobId: number;
  requiredSkills: string[];
  savedRequiredSkills: string[];
  optionalSkills: string[];
  savedOptionalSkills: string[];
  experienceRequirments: EducationSubformProps;
  useAsEducationRequirement: boolean;
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: any) => void;
}

const messages = defineMessages({
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
  startDate: Date;
  isActive: boolean;
  endDate: Date | null;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const validationShape = (intl: IntlShape) => {
  const requiredMsg = intl.formatMessage(validationMessages.required);
  const conditionalRequiredMsg = intl.formatMessage(
    validationMessages.endDateRequiredIfNotOngoing,
  );
  return {
    title: Yup.string().required(requiredMsg),
    organization: Yup.string().required(requiredMsg),
    group: Yup.string().required(requiredMsg),
    startDate: Yup.date().required(requiredMsg),
    isActive: Yup.boolean(),
    endDate: Yup.date().when("isActive", {
      is: false,
      then: Yup.date().required(conditionalRequiredMsg),
      otherwise: Yup.date(),
    }),
  };
};

export const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  modalId,
  title,
  iconClass,
  description,
  experienceWork,
  jobId,
  requiredSkills,
  savedRequiredSkills,
  optionalSkills,
  savedOptionalSkills,
  experienceRequirments,
  useAsEducationRequirement,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
}) => {
  const intl = useIntl();

  const initialFormValues: SkillFormValues &
    EducationFormValues &
    WorkDetailsFormValues = {
    requiredSkills: savedRequiredSkills,
    optionalSkills: savedOptionalSkills,
    useAsEducationRequirement,
    title: experienceWork.title,
    organization: experienceWork.organization,
    group: experienceWork.group,
    startDate: experienceWork.start_date,
    isActive: experienceWork.is_active,
    endDate: experienceWork.end_date,
  };

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
          type="date"
          name="startDate"
          component={Input}
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
        <FastField
          id="endDate"
          type="date"
          name="endDate"
          component={Input}
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
      onModalConfirm={onModalConfirm}
      className="application-experience-dialog"
    >
      <ExperienceModalHeader title={title} iconClass={iconClass} />
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values, actions): void => {
          // TODO: do something with values
          onModalConfirm(values);
          actions.setSubmitting(false);
        }}
      >
        {(formikProps): React.ReactElement => (
          <Form>
            <Modal.Body>
              <ExperienceDetailsIntro description={description} />
              {detailsSubform}
              <SkillSubform
                jobId={jobId}
                jobRequiredSkills={requiredSkills}
                jobOptionalSkills={optionalSkills}
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

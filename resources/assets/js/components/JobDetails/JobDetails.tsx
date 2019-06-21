/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import { Formik, Form, Field, FormikValues } from "formik";
import * as Yup from "yup";

import RadioGroupFormik from "../Form/RadioGroupFormik";
import InputFormik from "../Form/InputFormik";
import SelectFormik from "../Form/SelectFormik";
import JobPreview from "../JobPreview";
import Modal from "../Modal";

import { Job } from "../../models/types";

import { validationMessages } from "../Form/Messages";

const formMessages = defineMessages({
  titleLabel: {
    id: "jobDetails.titleLabel",
    defaultMessage: "What is the job title?",
    description: "The form label displayed on the title input.",
  },
  titlePlaceholder: {
    id: "jobDetails.titlePlaceholder",
    defaultMessage: "e.g. Product Designer",
    description: "The form placeholder displayed on the title input.",
  },
  termLengthLabel: {
    id: "jobDetails.termLengthLabel",
    defaultMessage: "How long is the term (in months)?",
    description: "The form label displayed on the term length input.",
  },
  termLengthPlaceholder: {
    id: "jobDetails.termLengthPlaceholder",
    defaultMessage: "e.g. 3",
    description: "The form placeholder displayed on the term length input.",
  },
  classificationLabel: {
    id: "jobDetails.classificationLabel",
    defaultMessage: "What is the classification?",
    description: "The form label displayed on the classification input.",
  },
  classificationNullSelection: {
    id: "jobDetails.classificationNullSelection",
    defaultMessage: "Select a classification...",
    description:
      "The default selection option displayed on the classification input.",
  },
  levelLabel: {
    id: "jobDetails.levelLabel",
    defaultMessage: "What is the level?",
    description: "The form label displayed on the level input.",
  },
  levelNullSelection: {
    id: "jobDetails.levelNullSelection",
    defaultMessage: "Select a level...",
    description: "The default selection option displayed on the level input.",
  },
  securityLevelLabel: {
    id: "jobDetails.securityLevelLabel",
    defaultMessage: "What is the security level?",
    description: "The form label displayed on the security level input.",
  },
  securityLevelNullSelection: {
    id: "jobDetails.securityLevelNullSelection",
    defaultMessage: "Select a security level...",
    description:
      "The default selection option displayed on the security level input.",
  },
  languageLabel: {
    id: "jobDetails.languageLabel",
    defaultMessage: "What is the language profile?",
    description: "The form label displayed on the language input.",
  },
  languageNullSelection: {
    id: "jobDetails.languageNullSelection",
    defaultMessage: "Select a language profile...",
    description:
      "The default selection option displayed on the language input.",
  },
  cityLabel: {
    id: "jobDetails.cityLabel",
    defaultMessage: "What city is the team located in?",
    description: "The form label displayed on the city input.",
  },
  cityPlaceholder: {
    id: "jobDetails.cityPlaceholder",
    defaultMessage: "e.g. Ottawa",
    description: "The form placeholder displayed on the city input.",
  },
  provinceLabel: {
    id: "jobDetails.provinceLabel",
    defaultMessage: "What province is the team located in?",
    description: "The form label displayed on the province input.",
  },
  provinceNullSelection: {
    id: "jobDetails.provinceNullSelection",
    defaultMessage: "Select a province...",
    description:
      "The default selection option displayed on the province input.",
  },
  remoteWorkGroupLabel: {
    id: "jobDetails.remoteWorkGroupLabel",
    defaultMessage: "Select a remote work option:",
    description: "The form label displayed on the remote work radio group.",
  },
  remoteWorkWorldLabel: {
    id: "jobDetails.remoteWorkWorldLabel",
    defaultMessage:
      "Yes, I’m willing to supervise employees anywhere in the world.",
    description:
      "The form label displayed on the 'world' remote work radio option.",
  },
  remoteWorkCanadaLabel: {
    id: "jobDetails.remoteWorkCanadaLabel",
    defaultMessage:
      "Yes, I’m willing to supervise employees in any province or territory in Canada.",
    description:
      "The form label displayed on the 'canada' remote work radio option.",
  },
  remoteWorkNoneLabel: {
    id: "jobDetails.remoteWorkNoneLabel",
    defaultMessage:
      "No, I require the employee in this position to be in the same geographic location as the office.",
    description:
      "The form label displayed on the 'none' remote work radio option.",
  },
  teleworkGroupLabel: {
    id: "jobDetails.teleworkGroupLabel",
    defaultMessage: "Select a telework option:",
    description: "The form label displayed on the telework radio group.",
  },
  flexHoursGroupLabel: {
    id: "jobDetails.flexHoursGroupLabel",
    defaultMessage: "Select a flexible hours option:",
    description: "The form label displayed on the flex hours radio group.",
  },
  frequencyAlwaysLabel: {
    id: "jobDetails.frequencyAlwaysLabel",
    defaultMessage: "Almost Always",
    description: "The form label displayed on 'always' frequency options.",
  },
  frequencyFrequentlyLabel: {
    id: "jobDetails.frequencyFrequentlyLabel",
    defaultMessage: "Frequently",
    description: "The form label displayed on 'frequently' frequency options.",
  },
  frequencySometimesLabel: {
    id: "jobDetails.frequencySometimesLabel",
    defaultMessage: "Sometimes",
    description: "The form label displayed on 'sometimes' frequency options.",
  },
  frequencyOccasionallyLabel: {
    id: "jobDetails.frequencyOccasionallyLabel",
    defaultMessage: "Occasionally",
    description:
      "The form label displayed on 'occasionally' frequency options.",
  },
  frequencyNeverLabel: {
    id: "jobDetails.frequencyNeverLabel",
    defaultMessage: "Almost Never",
    description: "The form label displayed on 'never' frequency options.",
  },
});

interface JobDetailsProps {
  // Optional Job to prepopulate form values from.
  job?: Job;
  // Parent element to place the modal contents within (uses React Portal).
  modalParent: Element;
  // Function to run after successful form validation.
  handleSubmit: (values: FormikValues) => void;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
}

const JobDetails: React.FunctionComponent<
  JobDetailsProps & InjectedIntlProps
> = ({
  job,
  modalParent,
  handleSubmit,
  handleModalCancel,
  handleModalConfirm,
  intl,
}: JobDetailsProps & InjectedIntlProps): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { locale } = intl;
  let initialValues;
  if (job !== undefined) {
    initialValues = {
      title: job[locale].title,
      termLength: job.term_qty,
      classification: job.classification_code,
      level: job.classification_level,
      securityLevel: job.security_clearance_id,
      language: job.language_requirement_id,
      city: job[locale].city,
      province: job.province_id,
      remoteWork: "remoteWorkCanada",
      telework: "teleworkFrequently",
      flexHours: "flexHoursFrequently",
    };
  } else {
    initialValues = {
      title: "",
      termLength: "",
      classification: "",
      level: "",
      securityLevel: "",
      language: "",
      city: "",
      province: "",
      remoteWork: "",
      telework: "",
      flexHours: "",
    };
  }
  const jobSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, intl.formatMessage(validationMessages.tooShort))
      .max(50, intl.formatMessage(validationMessages.tooLong))
      .required(intl.formatMessage(validationMessages.required)),
    termLength: Yup.number()
      .min(1, intl.formatMessage(validationMessages.tooShort))
      .max(36, intl.formatMessage(validationMessages.tooLong))
      .required(intl.formatMessage(validationMessages.required)),
    classification: Yup.mixed()
      .oneOf(
        [
          "AS",
          "BI",
          "CO",
          "CR",
          "CS",
          "EC",
          "EX",
          "FO",
          "IS",
          "PC",
          "PE",
          "PM",
        ],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    level: Yup.number()
      .min(1, intl.formatMessage(validationMessages.invalidSelection))
      .max(9, intl.formatMessage(validationMessages.invalidSelection))
      .required(intl.formatMessage(validationMessages.required)),
    securityLevel: Yup.number()
      .min(1, intl.formatMessage(validationMessages.invalidSelection))
      .max(3, intl.formatMessage(validationMessages.invalidSelection))
      .required(intl.formatMessage(validationMessages.required)),
    language: Yup.number()
      .min(1, intl.formatMessage(validationMessages.invalidSelection))
      .max(5, intl.formatMessage(validationMessages.invalidSelection))
      .required(intl.formatMessage(validationMessages.required)),
    city: Yup.string()
      .min(3, intl.formatMessage(validationMessages.tooShort))
      .max(50, intl.formatMessage(validationMessages.tooLong))
      .required(intl.formatMessage(validationMessages.required)),
    province: Yup.mixed()
      .oneOf(
        [
          "AB",
          "BC",
          "MB",
          "NB",
          "NL",
          "NS",
          "NT",
          "NU",
          "ON",
          "PE",
          "QC",
          "SK",
          "YT",
        ],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    remoteWork: Yup.mixed()
      .oneOf(
        ["remoteWorkWorld", "remoteWorkCanada", "remoteWorkNone"],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    telework: Yup.mixed()
      .oneOf(
        [
          "teleworkAlways",
          "teleworkFrequently",
          "teleworkOccasionally",
          "teleworkSometimes",
          "teleworkNever",
        ],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    flexHours: Yup.mixed()
      .oneOf(
        [
          "flexHoursAlways",
          "flexHoursFrequently",
          "flexHoursOccasionally",
          "flexHoursSometimes",
          "flexHoursNever",
        ],
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  const remoteWorkOptions = [
    {
      id: "remoteWorkWorld",
      value: "remoteWorkWorld",
      label: intl.formatMessage(formMessages.remoteWorkWorldLabel),
    },
    {
      id: "remoteWorkCanada",
      value: "remoteWorkCanada",
      label: intl.formatMessage(formMessages.remoteWorkCanadaLabel),
    },
    {
      id: "remoteWorkNone",
      value: "remoteWorkNone",
      label: intl.formatMessage(formMessages.remoteWorkNoneLabel),
    },
  ];

  const teleworkOptions = [
    {
      id: "teleworkAlways",
      value: "teleworkAlways",
      label: intl.formatMessage(formMessages.frequencyAlwaysLabel),
    },
    {
      id: "teleworkFrequently",
      value: "teleworkFrequently",
      label: intl.formatMessage(formMessages.frequencyFrequentlyLabel),
    },
    {
      id: "teleworkSometimes",
      value: "teleworkSometimes",
      label: intl.formatMessage(formMessages.frequencySometimesLabel),
    },
    {
      id: "teleworkOccasionally",
      value: "teleworkOccasionally",
      label: intl.formatMessage(formMessages.frequencyOccasionallyLabel),
    },
    {
      id: "teleworkNever",
      value: "teleworkNever",
      label: intl.formatMessage(formMessages.frequencyNeverLabel),
    },
  ];

  const flexHoursOptions = [
    {
      id: "flexHoursAlways",
      value: "flexHoursAlways",
      label: intl.formatMessage(formMessages.frequencyAlwaysLabel),
    },
    {
      id: "flexHoursFrequently",
      value: "flexHoursFrequently",
      label: intl.formatMessage(formMessages.frequencyFrequentlyLabel),
    },
    {
      id: "flexHoursSometimes",
      value: "flexHoursSometimes",
      label: intl.formatMessage(formMessages.frequencySometimesLabel),
    },
    {
      id: "flexHoursOccasionally",
      value: "flexHoursOccasionally",
      label: intl.formatMessage(formMessages.frequencyOccasionallyLabel),
    },
    {
      id: "flexHoursNever",
      value: "flexHoursNever",
      label: intl.formatMessage(formMessages.frequencyNeverLabel),
    },
  ];
  return (
    <>
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          <FormattedMessage
            id="jobDetails.heading"
            defaultMessage="Job Information"
            description="Job Details page heading"
          />
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={jobSchema}
          onSubmit={(values, actions): void => {
            // The following only triggers after validations pass
            setIsModalVisible(true);
            handleSubmit(values);
            actions.setSubmitting(false); // Required by Formik to finish the submission cycle
          }}
          render={({
            errors,
            touched,
            isSubmitting,
            values,
          }): React.ReactElement => (
            <>
              <Form id="job-information" data-c-grid="gutter">
                <Field
                  inputType="text"
                  name="title"
                  component={InputFormik}
                  required
                  grid="tl(1of2)"
                  id="builder02JobTitle"
                  label={intl.formatMessage(formMessages.titleLabel)}
                  placeholder={intl.formatMessage(
                    formMessages.titlePlaceholder,
                  )}
                />
                <Field
                  inputType="number"
                  name="termLength"
                  component={InputFormik}
                  placeholder={intl.formatMessage(
                    formMessages.termLengthPlaceholder,
                  )}
                  required
                  grid="tl(1of2)"
                  id="builder02TermLength"
                  label={intl.formatMessage(formMessages.termLengthLabel)}
                />
                <Field
                  name="classification"
                  id="builder02Classification"
                  label={intl.formatMessage(formMessages.classificationLabel)}
                  grid="tl(1of2)"
                  component={SelectFormik}
                  required
                  nullSelection={intl.formatMessage(
                    formMessages.classificationNullSelection,
                  )}
                  options={[
                    { value: "AS", label: "AS - Administrative Services" },
                    { value: "BI", label: "BI - Biological Sciences" },
                    { value: "CO", label: "CO - Commerce" },
                    { value: "CR", label: "CR - Clerical and Regulatory" },
                    { value: "CS", label: "CS - Computer Systems" },
                    {
                      value: "EC",
                      label: "EC - Economics and Social Science Services",
                    },
                    { value: "EX", label: "EX - Executive" },
                    { value: "FO", label: "FO - Forestry" },
                    { value: "IS", label: "IS - Information Services" },
                    { value: "PC", label: "PC - Physical Sciences" },
                    { value: "PE", label: "PE - Personnel Administration" },
                    { value: "PM", label: "PM - Programme Administration" },
                  ]}
                />
                <Field
                  name="level"
                  id="builder02Level"
                  component={SelectFormik}
                  required
                  label={intl.formatMessage(formMessages.levelLabel)}
                  grid="tl(1of2)"
                  nullSelection={intl.formatMessage(
                    formMessages.levelNullSelection,
                  )}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                    { value: "8", label: "8" },
                    { value: "9", label: "9" },
                  ]}
                />
                <Field
                  name="securityLevel"
                  id="builder02SecurityLevel"
                  component={SelectFormik}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.securityLevelLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.securityLevelNullSelection,
                  )}
                  options={[
                    { value: "1", label: "Reliability" },
                    { value: "2", label: "Secret" },
                    { value: "3", label: "Top Secret" },
                  ]}
                />
                <Field
                  name="language"
                  id="builder02Language"
                  component={SelectFormik}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.languageLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.languageNullSelection,
                  )}
                  options={[
                    { value: "1", label: "English - Essential" },
                    { value: "2", label: "French - Essential" },
                    { value: "3", label: "Bilingual - Advanced (CBC)" },
                    { value: "4", label: "Bilingual - Intermediate (BBB)" },
                    { value: "5", label: "English or French" },
                  ]}
                />
                <Field
                  name="city"
                  inputType="text"
                  component={InputFormik}
                  required
                  grid="tl(1of2)"
                  id="builder02City"
                  label={intl.formatMessage(formMessages.cityLabel)}
                  placeholder={intl.formatMessage(formMessages.cityPlaceholder)}
                />
                <Field
                  name="province"
                  id="builder02Province"
                  component={SelectFormik}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.provinceLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.provinceNullSelection,
                  )}
                  options={[
                    { value: "AB", label: "Alberta" },
                    { value: "BC", label: "British Columbia" },
                    { value: "MB", label: "Manitoba" },
                    { value: "NB", label: "New Brunswick" },
                    { value: "NL", label: "Newfoundland and Labrador" },
                    { value: "NS", label: "Nova Scotia" },
                    { value: "NT", label: "Northwest Territories" },
                    { value: "NU", label: "Nunavut" },
                    { value: "ON", label: "Ontario" },
                    { value: "PE", label: "Prince Edward Island" },
                    { value: "QC", label: "Quebec" },
                    { value: "SK", label: "Saskatchewan" },
                    { value: "YT", label: "Yukon" },
                  ]}
                />
                <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                  <FormattedMessage
                    id="jobDetails.remoteWorkGroupHeader"
                    defaultMessage="Is remote work allowed?"
                    description="Header message displayed on the remote work group input."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobDetails.remoteWorkGroupBody"
                    defaultMessage="Want the best talent in Canada? You increase your chances when you allow those in other parts of Canada to apply. Regional diversity also adds perspective to your team culture. Make sure to discuss this in advance with your HR Advisor."
                    description="Body message displayed on the remote work group input."
                  />
                </p>
                <RadioGroupFormik
                  id="remoteWork"
                  label={intl.formatMessage(formMessages.remoteWorkGroupLabel)}
                  required
                  grid="base(1of1)"
                  error={errors.remoteWork}
                  touched={touched.remoteWork}
                >
                  {remoteWorkOptions.map(
                    ({ id, value, label }): React.ReactElement => {
                      return (
                        <Field
                          name="remoteWork"
                          component={InputFormik}
                          id={id}
                          inputType="radio"
                          label={label}
                          value={value}
                        />
                      );
                    },
                  )}
                </RadioGroupFormik>
                <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                  <FormattedMessage
                    id="jobDetails.teleworkGroupHeader"
                    defaultMessage="How often is telework allowed?"
                    description="Header message displayed on the telework group input."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobDetails.teleworkGroupBody"
                    defaultMessage="Demonstrate that you trust your employees and you have a positive workplace culture. Allow telework as an option."
                    description="Body message displayed on the telework group input."
                  />
                </p>
                <RadioGroupFormik
                  id="telework"
                  label={intl.formatMessage(formMessages.teleworkGroupLabel)}
                  required
                  grid="base(1of1)"
                  error={errors.telework}
                  touched={touched.telework}
                >
                  {teleworkOptions.map(
                    ({ id, value, label }): React.ReactElement => {
                      return (
                        <Field
                          name="telework"
                          component={InputFormik}
                          id={id}
                          inputType="radio"
                          label={label}
                          value={value}
                        />
                      );
                    },
                  )}
                </RadioGroupFormik>
                <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                  <FormattedMessage
                    id="jobDetails.flexHoursGroupHeader"
                    defaultMessage="How often are flexible hours allowed?"
                    description="Header message displayed on the flex hours group input."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobDetails.flexHoursGroupBody"
                    defaultMessage={`Want to support a more gender inclusive workplace?
                          Studies show allowing flex hours is a great way to improve opportunities for women and parents.`}
                    description="Body message displayed on the flex hours group input."
                  />
                </p>
                <RadioGroupFormik
                  id="flexHours"
                  required
                  grid="base(1of1)"
                  label={intl.formatMessage(formMessages.flexHoursGroupLabel)}
                  error={errors.flexHours}
                  touched={touched.flexHours}
                >
                  {flexHoursOptions.map(
                    ({ id, value, label }): React.ReactElement => {
                      return (
                        <Field
                          name="flexHours"
                          component={InputFormik}
                          id={id}
                          inputType="radio"
                          label={label}
                          value={value}
                        />
                      );
                    },
                  )}
                </RadioGroupFormik>
                <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
                  <button
                    data-c-button="solid(c1)"
                    data-c-dialog-action="open"
                    data-c-dialog-id="job-details-preview"
                    data-c-radius="rounded"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <FormattedMessage
                      id="jobDetails.submitButtonLabel"
                      defaultMessage="Next"
                      description="The text displayed on the submit button for the Job Details form."
                    />
                  </button>
                </div>
              </Form>
              <Modal
                id="job-details-preview"
                parentElement={modalParent}
                visible={isModalVisible}
                onModalConfirm={(): void => {
                  handleModalConfirm();
                  setIsModalVisible(false);
                }}
                onModalCancel={(): void => {
                  handleModalCancel();
                  setIsModalVisible(false);
                }}
              >
                <Modal.Header>
                  <div
                    data-c-background="c1(100)"
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                  >
                    <h5
                      data-c-colour="white"
                      data-c-font-size="h4"
                      id="job-details-preview-title"
                    >
                      <FormattedMessage
                        id="jobDetails.modalHeader"
                        defaultMessage="You're off to a great start!"
                        description="The text displayed in the header of the Job Details modal."
                      />
                    </h5>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                    id="job-details-preview-description"
                  >
                    <FormattedMessage
                      id="jobDetails.modalBody"
                      defaultMessage="Here's a preview of the Job Information you just entered. Feel free to go back and edit things or move to the next step if you're happy with it."
                      description="The text displayed in the body of the Job Details modal."
                    />
                  </div>
                  <div
                    data-c-background="grey(20)"
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                  >
                    {/* TODO: Pull in the signed-in Manager's department */}
                    {/* TODO: Get the actual value for things like language and security level */}
                    <JobPreview
                      title={values.title}
                      department="Department"
                      remoteWork={values.remoteWork !== "none"}
                      language={values.language}
                      city={values.city}
                      province={values.province}
                      termLength={Number(values.termLength)}
                      securityLevel={values.securityLevel}
                      classification={values.classification}
                      level={values.level}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Modal.FooterCancelBtn>
                    <FormattedMessage
                      id="jobDetails.modalCancelLabel"
                      defaultMessage="Go Back"
                      description="The text displayed on the cancel button of the Job Details modal."
                    />
                  </Modal.FooterCancelBtn>
                  <Modal.FooterConfirmBtn>
                    <FormattedMessage
                      id="jobDetails.modalConfirmLabel"
                      defaultMessage="Next Step"
                      description="The text displayed on the confirm button of the Job Details modal."
                    />
                  </Modal.FooterConfirmBtn>
                </Modal.Footer>
              </Modal>
            </>
          )}
        />
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </>
  );
};

export default injectIntl(JobDetails);

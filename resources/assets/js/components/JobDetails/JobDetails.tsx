/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import RadioGroup from "../Form/RadioGroup";
import TextInput from "../Form/TextInput";
import SelectInput from "../Form/SelectInput";
import JobPreview from "../JobPreview";
import Modal from "../Modal";
import { RootState } from "../../store/store";
import { getJob as selectJob } from "../../store/Job/jobSelector";
import { Job } from "../../models/types";
import { DispatchType } from "../../configureStore";
import { updateJob, createJob } from "../../store/Job/jobActions";
import { validationMessages } from "../Form/Messages";
import RadioInput from "../Form/RadioInput";
import {
  LanguageRequirementId,
  SecurityClearanceId,
  ProvinceId,
} from "../../models/lookupConstants";
import { emptyJob } from "../../models/jobUtil";
import {
  securityClearance,
  languageRequirment,
  provinceName,
} from "../../models/localizedConstants";

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
  job: Job | null;
  // Function to run after successful form validation.
  // It must return true if the submission was succesful, false otherwise.
  handleSubmit: (values: Job) => Promise<boolean>;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
}

type RemoteWorkType = "remoteWorkNone" | "remoteWorkCanada" | "remoteWorkWorld";
const remoteWorkOptions = [
  {
    id: "remoteWorkWorld",
    label: formMessages.remoteWorkWorldLabel,
  },
  {
    id: "remoteWorkCanada",
    label: formMessages.remoteWorkCanadaLabel,
  },
  {
    id: "remoteWorkNone",
    label: formMessages.remoteWorkNoneLabel,
  },
];

interface JobFormValues {
  title: string;
  termLength: number | "";
  classification: string;
  level: number | "";
  securityLevel: number | "";
  language: number | "";
  city: string;
  province: number | "";
  remoteWork: RemoteWorkType;
  telework: TeleworkOptionType;
  flexHours: FlexHourOptionType;
}

type TeleworkOptionType =
  | "teleworkNever"
  | "teleworkOccasionally"
  | "teleworkSometimes"
  | "teleworkFrequently"
  | "teleworkAlways";
const teleworkOptions: {
  id: TeleworkOptionType;
  label: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "teleworkNever",
    label: formMessages.frequencyNeverLabel,
  },
  {
    id: "teleworkOccasionally",
    label: formMessages.frequencyOccasionallyLabel,
  },
  {
    id: "teleworkSometimes",
    label: formMessages.frequencySometimesLabel,
  },
  {
    id: "teleworkFrequently",
    label: formMessages.frequencyFrequentlyLabel,
  },
  {
    id: "teleworkAlways",
    label: formMessages.frequencyAlwaysLabel,
  },
];
const teleworkFrequencies: TeleworkOptionType[] = teleworkOptions.map(
  option => option.id,
);

type FlexHourOptionType =
  | "flexHoursNever"
  | "flexHoursOccasionally"
  | "flexHoursSometimes"
  | "flexHoursFrequently"
  | "flexHoursAlways";
const flexHoursOptions: {
  id: FlexHourOptionType;
  label: FormattedMessage.MessageDescriptor;
}[] = [
  {
    id: "flexHoursNever",
    label: formMessages.frequencyNeverLabel,
  },
  {
    id: "flexHoursOccasionally",
    label: formMessages.frequencyOccasionallyLabel,
  },
  {
    id: "flexHoursSometimes",
    label: formMessages.frequencySometimesLabel,
  },
  {
    id: "flexHoursFrequently",
    label: formMessages.frequencyFrequentlyLabel,
  },
  {
    id: "flexHoursAlways",
    label: formMessages.frequencyAlwaysLabel,
  },
];
const flexHourFequencies = flexHoursOptions.map(option => option.id);

const jobToValues = (job: Job | null, locale: string): JobFormValues =>
  job
    ? {
        title: job[locale].title ? String(job[locale].title) : "", // TODO: use utility method
        termLength: job.term_qty || "",
        classification: job.classification_code || "",
        level: job.classification_level || "",
        securityLevel: job.security_clearance_id || "",
        language: job.language_requirement_id || "",
        city: job[locale].city || "",
        province: job.province_id || "",
        remoteWork: job.remote_work_allowed
          ? "remoteWorkCanada"
          : "remoteWorkNone",
        // frequency ids range from 1-5
        telework: job.telework_allowed_frequency_id
          ? teleworkFrequencies[job.telework_allowed_frequency_id - 1]
          : "teleworkFrequently",
        flexHours: job.flexible_hours_frequency_id
          ? flexHourFequencies[job.flexible_hours_frequency_id - 1]
          : "flexHoursFrequently",
      }
    : {
        title: "",
        termLength: "",
        classification: "",
        level: "",
        securityLevel: "",
        language: "",
        city: "",
        province: "",
        remoteWork: "remoteWorkCanada",
        telework: "teleworkFrequently",
        flexHours: "flexHoursFrequently",
      };

const updateJobWithValues = (
  initialJob: Job,
  locale: "en" | "fr",
  {
    title,
    termLength,
    classification,
    level,
    securityLevel,
    language,
    city,
    province,
    remoteWork,
    telework,
    flexHours,
  }: JobFormValues,
): Job => ({
  ...initialJob,
  term_qty: termLength || null,
  classification_code: classification,
  classification_level: level || null,
  security_clearance_id: securityLevel || null,
  language_requirement_id: language || null,
  province_id: province || null,
  remote_work_allowed: remoteWork !== "remoteWorkNone",
  telework_allowed_frequency_id: teleworkFrequencies.indexOf(telework) + 1,
  flexible_hours_frequency_id: flexHourFequencies.indexOf(flexHours) + 1,
  [locale]: {
    ...initialJob[locale],
    title,
    city,
  },
});

const JobDetails: React.FunctionComponent<
  JobDetailsProps & InjectedIntlProps
> = ({
  job,
  handleSubmit,
  handleModalCancel,
  handleModalConfirm,
  intl,
}: JobDetailsProps & InjectedIntlProps): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const modalParentRef = useRef<HTMLDivElement>(null);
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const initialValues: JobFormValues = jobToValues(job || null, locale);

  const remoteWorkPossibleValues: RemoteWorkType[] = [
    "remoteWorkNone",
    "remoteWorkCanada",
    "remoteWorkWorld",
  ];
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
      .oneOf(
        Object.values(SecurityClearanceId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    language: Yup.number()
      .oneOf(
        Object.values(LanguageRequirementId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    city: Yup.string()
      .min(3, intl.formatMessage(validationMessages.tooShort))
      .max(50, intl.formatMessage(validationMessages.tooLong))
      .required(intl.formatMessage(validationMessages.required)),
    province: Yup.number()
      .oneOf(
        Object.values(ProvinceId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    remoteWork: Yup.mixed()
      .oneOf(
        remoteWorkPossibleValues,
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    telework: Yup.mixed()
      .oneOf(
        teleworkFrequencies,
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    flexHours: Yup.mixed()
      .oneOf(
        flexHourFequencies,
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <>
      <div
        data-c-container="form"
        data-c-padding="top(triple) bottom(triple)"
        ref={modalParentRef}
      >
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
          enableReinitialize
          initialValues={initialValues}
          validationSchema={jobSchema}
          onSubmit={(values, actions): void => {
            // The following only triggers after validations pass
            handleSubmit(updateJobWithValues(job || emptyJob(), locale, values))
              .then((isSuccessful: boolean): void => {
                if (isSuccessful) {
                  setIsModalVisible(true);
                }
              })
              .finally(
                (): void => actions.setSubmitting(false), // Required by Formik to finish the submission cycle
              );
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
                  type="text"
                  name="title"
                  component={TextInput}
                  required
                  grid="tl(1of2)"
                  id="builder02JobTitle"
                  label={intl.formatMessage(formMessages.titleLabel)}
                  placeholder={intl.formatMessage(
                    formMessages.titlePlaceholder,
                  )}
                />
                <Field
                  type="number"
                  name="termLength"
                  component={TextInput}
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
                  component={SelectInput}
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
                  component={SelectInput}
                  required
                  label={intl.formatMessage(formMessages.levelLabel)}
                  grid="tl(1of2)"
                  nullSelection={intl.formatMessage(
                    formMessages.levelNullSelection,
                  )}
                  options={[
                    { value: 1, label: "1" },
                    { value: 2, label: "2" },
                    { value: 3, label: "3" },
                    { value: 4, label: "4" },
                    { value: 5, label: "5" },
                    { value: 6, label: "6" },
                    { value: 7, label: "7" },
                    { value: 8, label: "8" },
                    { value: 9, label: "9" },
                  ]}
                />
                <Field
                  name="securityLevel"
                  id="builder02SecurityLevel"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.securityLevelLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.securityLevelNullSelection,
                  )}
                  options={Object.values(SecurityClearanceId).map(
                    (id: number): { value: number; label: string } => ({
                      value: id,
                      label: intl.formatMessage(securityClearance(id)),
                    }),
                  )}
                />
                <Field
                  name="language"
                  id="builder02Language"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.languageLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.languageNullSelection,
                  )}
                  options={Object.values(LanguageRequirementId).map(
                    (id: number): { value: number; label: string } => ({
                      value: id,
                      label: intl.formatMessage(languageRequirment(id)),
                    }),
                  )}
                />
                <Field
                  name="city"
                  type="text"
                  component={TextInput}
                  required
                  grid="tl(1of2)"
                  id="builder02City"
                  label={intl.formatMessage(formMessages.cityLabel)}
                  placeholder={intl.formatMessage(formMessages.cityPlaceholder)}
                />
                <Field
                  name="province"
                  id="builder02Province"
                  component={SelectInput}
                  required
                  grid="tl(1of2)"
                  label={intl.formatMessage(formMessages.provinceLabel)}
                  nullSelection={intl.formatMessage(
                    formMessages.provinceNullSelection,
                  )}
                  options={Object.values(ProvinceId).map((id: number): {
                    value: number;
                    label: string;
                  } => ({
                    value: id,
                    label: intl.formatMessage(provinceName(id)),
                  }))}
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
                <RadioGroup
                  id="remoteWork"
                  label={intl.formatMessage(formMessages.remoteWorkGroupLabel)}
                  required
                  grid="base(1of1)"
                  error={errors.remoteWork}
                  touched={touched.remoteWork}
                  value={values.remoteWork}
                >
                  {remoteWorkOptions.map(
                    ({ id, label }): React.ReactElement => {
                      return (
                        <Field
                          key={id}
                          name="remoteWork"
                          component={RadioInput}
                          id={id}
                          label={intl.formatMessage(label)}
                        />
                      );
                    },
                  )}
                </RadioGroup>
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
                <RadioGroup
                  id="telework"
                  label={intl.formatMessage(formMessages.teleworkGroupLabel)}
                  required
                  grid="base(1of1)"
                  error={errors.telework}
                  touched={touched.telework}
                  value={values.telework}
                >
                  {teleworkOptions.map(
                    ({ id, label }): React.ReactElement => {
                      return (
                        <Field
                          key={id}
                          name="telework"
                          component={RadioInput}
                          id={id}
                          label={intl.formatMessage(label)}
                        />
                      );
                    },
                  )}
                </RadioGroup>
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
                <RadioGroup
                  id="flexHours"
                  required
                  grid="base(1of1)"
                  label={intl.formatMessage(formMessages.flexHoursGroupLabel)}
                  error={errors.flexHours}
                  touched={touched.flexHours}
                  value={values.flexHours}
                >
                  {flexHoursOptions.map(
                    ({ id, label }): React.ReactElement => {
                      return (
                        <Field
                          key={id}
                          name="flexHours"
                          component={RadioInput}
                          id={id}
                          label={intl.formatMessage(label)}
                        />
                      );
                    },
                  )}
                </RadioGroup>
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
              {isModalVisible && (
                <Modal
                  id="job-details-preview"
                  parentElement={modalParentRef.current}
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
                        remoteWork={values.remoteWork !== "remoteWorkNone"}
                        language={String(values.language)} // TODO: remove String() cast
                        city={values.city}
                        province={String(values.province)} // TODO: remove String() cast
                        termLength={Number(values.termLength)}
                        securityLevel={String(values.securityLevel)} // TODO: remove String() cast
                        classification={String(values.classification)} // TODO: remove String() cast
                        level={String(values.level)} // TODO: remove String() cast
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
              )}
            </>
          )}
        />
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </>
  );
};

export const JobDetailsIntl = injectIntl(JobDetails);

interface JobDetailsContainerProps {
  jobId: number | null;
  handleModalCancel: () => void;
  handleModalConfirm: () => void;
}

const mapStateToProps = (
  state: RootState,
  ownProps: JobDetailsContainerProps,
): {
  job: Job | null;
} => ({
  job: ownProps.jobId ? selectJob(state, ownProps as { jobId: number }) : null,
});

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: JobDetailsContainerProps,
): {
  handleSubmit: (newJob: Job) => Promise<boolean>;
} => ({
  handleSubmit: ownProps.jobId
    ? async (newJob: Job): Promise<boolean> => {
        const result = await dispatch(updateJob(newJob));
        return !result.error;
      }
    : async (newJob: Job): Promise<boolean> => {
        const result = await dispatch(createJob(newJob));
        return !result.error;
      },
});

// @ts-ignore
export const JobDetailsContainer: React.FunctionComponent<
  JobDetailsContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(JobDetails));

export default JobDetailsContainer;

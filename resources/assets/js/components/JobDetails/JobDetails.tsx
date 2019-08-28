/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import nprogress from "nprogress";
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
  FrequencyId,
  TravelRequirementId,
  OvertimeRequirementId,
} from "../../models/lookupConstants";
import { emptyJob } from "../../models/jobUtil";
import {
  securityClearance,
  languageRequirement,
  provinceName,
  frequencyName,
  travelRequirementDescription,
  overtimeRequirementDescription,
} from "../../models/localizedConstants";
import ContextBlockItem from "../ContextBlock/ContextBlockItem";
import CopyToClipboardButton from "../CopyToClipboardButton";
import TextAreaInput from "../Form/TextAreaInput";
import {
  formMessages,
  classificationOptionMessages,
  educationMessages,
} from "./JobDetailsMessages";
import { hasKey } from "../../helpers/queries";

interface JobDetailsProps {
  // Optional Job to prepopulate form values from.
  job: Job | null;
  // Function to run after successful form validation.
  // It must return true if the submission was succesful, false otherwise.
  handleSubmit: (values: Job) => Promise<boolean>;
  // The function to run when user clicks Prev Page
  handleReturn: () => void;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
  jobIsComplete: boolean;
  handleSkipToReview: () => Promise<void>;
}

type RemoteWorkType = "remoteWorkNone" | "remoteWorkCanada" | "remoteWorkWorld";

const remoteWorkMessages = {
  remoteWorkWorld: formMessages.remoteWorkWorldLabel,
  remoteWorkCanada: formMessages.remoteWorkCanadaLabel,
  remoteWorkNone: formMessages.remoteWorkNoneLabel,
};

type TeleworkOptionType =
  | "teleworkNever"
  | "teleworkOccasionally"
  | "teleworkSometimes"
  | "teleworkFrequently"
  | "teleworkAlways";

const teleworkMessages: {
  [key in TeleworkOptionType]: FormattedMessage.MessageDescriptor;
} = {
  teleworkNever: frequencyName(FrequencyId.never),
  teleworkOccasionally: frequencyName(FrequencyId.rarely),
  teleworkSometimes: frequencyName(FrequencyId.sometimes),
  teleworkFrequently: frequencyName(FrequencyId.often),
  teleworkAlways: frequencyName(FrequencyId.always),
};

const teleworkFrequencies: TeleworkOptionType[] = Object.keys(
  teleworkMessages,
) as TeleworkOptionType[];

type FlexHourOptionType =
  | "flexHoursNever"
  | "flexHoursOccasionally"
  | "flexHoursSometimes"
  | "flexHoursFrequently"
  | "flexHoursAlways";

const flexHourMessages: {
  [key in FlexHourOptionType]: FormattedMessage.MessageDescriptor;
} = {
  flexHoursNever: frequencyName(FrequencyId.never),
  flexHoursOccasionally: frequencyName(FrequencyId.sometimes),
  flexHoursFrequently: frequencyName(FrequencyId.rarely),
  flexHoursSometimes: frequencyName(FrequencyId.often),
  flexHoursAlways: frequencyName(FrequencyId.always),
};
const flexHourFequencies: FlexHourOptionType[] = Object.keys(
  flexHourMessages,
) as FlexHourOptionType[];

type TravelOptionType =
  | "travelFrequently"
  | "travelOpportunitiesAvailable"
  | "travelNoneRequired";

const travelMessages: {
  [key in TravelOptionType]: FormattedMessage.MessageDescriptor;
} = {
  travelFrequently: travelRequirementDescription(
    TravelRequirementId.frequently,
  ),
  travelOpportunitiesAvailable: travelRequirementDescription(
    TravelRequirementId.available,
  ),
  travelNoneRequired: travelRequirementDescription(TravelRequirementId.none),
};
const travelRequirements: TravelOptionType[] = Object.keys(
  travelMessages,
) as TravelOptionType[];

type OvertimeOptionType =
  | "overtimeFrequently"
  | "overtimeOpportunitiesAvailable"
  | "overtimeNoneRequired";

const overtimeMessages: {
  [key in OvertimeOptionType]: FormattedMessage.MessageDescriptor;
} = {
  overtimeFrequently: overtimeRequirementDescription(
    OvertimeRequirementId.frequently,
  ),
  overtimeOpportunitiesAvailable: overtimeRequirementDescription(
    OvertimeRequirementId.available,
  ),
  overtimeNoneRequired: overtimeRequirementDescription(
    OvertimeRequirementId.none,
  ),
};
const overtimeRequirements: OvertimeOptionType[] = Object.keys(
  overtimeMessages,
) as OvertimeOptionType[];

interface JobFormValues {
  title: string;
  termLength: number | "";
  classification: string;
  level: number | "";
  educationRequirements: string;
  securityLevel: number | "";
  language: number | "";
  city: string;
  province: number | "";
  remoteWork: RemoteWorkType;
  telework: TeleworkOptionType;
  flexHours: FlexHourOptionType;
  travel: TravelOptionType;
  overtime: OvertimeOptionType;
}

const isClassificationSet = (values: JobFormValues): boolean => {
  return values.classification.length > 0 && values.level !== "";
};

const getEducationMsgForClassification = (
  classification: string,
  intl: ReactIntl.InjectedIntl,
): string => {
  return hasKey(educationMessages, classification)
    ? intl.formatMessage(educationMessages[classification])
    : "";
};

const jobToValues = (
  job: Job | null,
  locale: string,
  intl: ReactIntl.InjectedIntl,
): JobFormValues => {
  const values: JobFormValues = job
    ? {
        title: job[locale].title ? String(job[locale].title) : "", // TODO: use utility method
        termLength: job.term_qty || "",
        classification: job.classification_code || "",
        level: job.classification_level || "",
        educationRequirements: job[locale].education || "",
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
        travel: job.travel_requirement_id
          ? travelRequirements[job.travel_requirement_id - 1]
          : "travelFrequently",
        overtime: job.overtime_requirement_id
          ? overtimeRequirements[job.overtime_requirement_id - 1]
          : "overtimeFrequently",
      }
    : {
        title: "",
        termLength: "",
        classification: "",
        level: "",
        educationRequirements: "",
        securityLevel: "",
        language: "",
        city: "",
        province: "",
        remoteWork: "remoteWorkCanada",
        telework: "teleworkFrequently",
        flexHours: "flexHoursFrequently",
        travel: "travelFrequently",
        overtime: "overtimeFrequently",
      };
  // If the job has the standard education requirments saved, no need to fill the custom textbox
  if (
    values.classification &&
    values.educationRequirements ===
      getEducationMsgForClassification(values.classification, intl)
  ) {
    return {
      ...values,
      educationRequirements: "",
    };
  }
  return values;
};

const updateJobWithValues = (
  initialJob: Job,
  locale: "en" | "fr",
  {
    title,
    termLength,
    classification,
    level,
    educationRequirements,
    securityLevel,
    language,
    city,
    province,
    remoteWork,
    telework,
    flexHours,
    travel,
    overtime,
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
  travel_requirement_id: travelRequirements.indexOf(travel) + 1,
  overtime_requirement_id: overtimeRequirements.indexOf(overtime) + 1,
  [locale]: {
    ...initialJob[locale],
    title,
    city,
    education: educationRequirements,
  },
});

const JobDetails: React.FunctionComponent<
  JobDetailsProps & InjectedIntlProps
> = ({
  job,
  handleSubmit,
  handleReturn,
  handleModalCancel,
  handleModalConfirm,
  jobIsComplete,
  handleSkipToReview,
  intl,
}: JobDetailsProps & InjectedIntlProps): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [returnOnSubmit, setReturnOnSubmit] = useState(false);

  const modalParentRef = useRef<HTMLDivElement>(null);
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const initialValues: JobFormValues = jobToValues(job || null, locale, intl);

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
    educationRequirements: Yup.string(),
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
    travel: Yup.mixed()
      .oneOf(
        travelRequirements,
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    overtime: Yup.mixed()
      .oneOf(
        overtimeRequirements,
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <section>
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
            defaultMessage="Job Details"
            description="Job Details page heading"
          />
        </h3>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={jobSchema}
          onSubmit={(values, actions): void => {
            // The following only triggers after validations pass
            const educationRequirements: string =
              values.educationRequirements.length > 0
                ? values.educationRequirements
                : getEducationMsgForClassification(values.classification, intl);
            const modifiedValues: JobFormValues = {
              ...values,
              educationRequirements,
            };

            nprogress.start();
            handleSubmit(
              updateJobWithValues(job || emptyJob(), locale, modifiedValues),
            )
              .then((isSuccessful: boolean): void => {
                if (isSuccessful) {
                  if (returnOnSubmit) {
                    handleReturn();
                  } else {
                    nprogress.done();
                    setIsModalVisible(true);
                  }
                }
              })
              .finally((): void => {
                setReturnOnSubmit(false);
                actions.setSubmitting(false); // Required by Formik to finish the submission cycle
              });
          }}
          render={({
            errors,
            touched,
            isSubmitting,
            values,
            submitForm,
          }): React.ReactElement => (
            <section>
              <Form
                id="job-information"
                data-c-container="form"
                data-c-grid="gutter"
              >
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
                    {
                      value: "AS",
                      label: intl.formatMessage(
                        classificationOptionMessages.AdministrativeServices,
                      ),
                    },
                    {
                      value: "BI",
                      label: intl.formatMessage(
                        classificationOptionMessages.BiologicalSciences,
                      ),
                    },
                    {
                      value: "CO",
                      label: intl.formatMessage(
                        classificationOptionMessages.Commerce,
                      ),
                    },
                    {
                      value: "CR",
                      label: intl.formatMessage(
                        classificationOptionMessages.ClericalRegulatory,
                      ),
                    },
                    {
                      value: "CS",
                      label: intl.formatMessage(
                        classificationOptionMessages.ComputerSystems,
                      ),
                    },
                    {
                      value: "EC",
                      label: intl.formatMessage(
                        classificationOptionMessages.EconomicsSocialSciences,
                      ),
                    },
                    {
                      value: "EX",
                      label: intl.formatMessage(
                        classificationOptionMessages.Executive,
                      ),
                    },
                    {
                      value: "FO",
                      label: intl.formatMessage(
                        classificationOptionMessages.Forestry,
                      ),
                    },
                    {
                      value: "IS",
                      label: intl.formatMessage(
                        classificationOptionMessages.InformationServices,
                      ),
                    },
                    {
                      value: "PC",
                      label: intl.formatMessage(
                        classificationOptionMessages.PhysicalSciences,
                      ),
                    },
                    {
                      value: "PE",
                      label: intl.formatMessage(
                        classificationOptionMessages.PersonnelAdministration,
                      ),
                    },
                    {
                      value: "PM",
                      label: intl.formatMessage(
                        classificationOptionMessages.ProgrammeAdministration,
                      ),
                    },
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
                <div data-c-grid-item="base(1of1)">
                  {!isClassificationSet(values) ? (
                    <p
                      data-c-font-weight="bold"
                      data-c-margin="bottom(normal)"
                      data-c-colour="grey"
                      data-c-border="all(thin, solid, grey)"
                      data-c-background="white(100)"
                      data-c-padding="all(normal)"
                      data-c-alignment="base(center)"
                    >
                      <FormattedMessage
                        id="jobDetails.SelectClassAndLvlMessage"
                        defaultMessage="Please select a classification and level before preparing the education requirements."
                        description="Message displayed after classification and level select boxes."
                      />
                    </p>
                  ) : (
                    <>
                      <p
                        data-c-font-weight="bold"
                        data-c-margin="bottom(normal)"
                      >
                        <FormattedMessage
                          id="jobDetails.educationRequirementHeader"
                          defaultMessage="Based on the classification level you selected, this standard paragraph will appear on the job poster."
                          description="Header message displayed for the Education requirement section."
                        />
                      </p>
                      <div>
                        <ContextBlockItem
                          wrapperMargin="bottom(normal)"
                          subtext={getEducationMsgForClassification(
                            values.classification,
                            intl,
                          )}
                        />
                      </div>

                      <div className="job-builder-education-customization active">
                        <p data-c-margin="bottom(normal)">
                          <FormattedMessage
                            id="jobDetails.educationRequirementCopyAndPaste"
                            defaultMessage="If you want to customize this paragraph, copy and paste it into the textbox below."
                            description="Footer message displayed for the Education requirement section."
                          />
                        </p>
                        <p
                          data-c-font-weight="bold"
                          data-c-margin="bottom(normal)"
                        >
                          <FormattedMessage
                            id="jobDetails.educationRequirementReviewChanges"
                            defaultMessage="Your HR advisor will review your changes."
                            description="Footer message displayed for the Education requirement section."
                          />
                        </p>
                        <div
                          data-c-alignment="base(centre)"
                          data-c-margin="top(normal) bottom(half)"
                        >
                          <CopyToClipboardButton
                            text={getEducationMsgForClassification(
                              values.classification,
                              intl,
                            )}
                          />
                        </div>
                        <Field
                          type="textarea"
                          id="education_requirements"
                          name="educationRequirements"
                          label={intl.formatMessage(
                            formMessages.educationRequirementsLabel,
                          )}
                          placeholder={intl.formatMessage(
                            formMessages.educationRequirementPlaceholder,
                          )}
                          component={TextAreaInput}
                          grid="base(1of1)"
                        />
                      </div>
                    </>
                  )}
                </div>
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
                      label: intl.formatMessage(languageRequirement(id)),
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
                  {Object.keys(remoteWorkMessages).map(
                    (key): React.ReactElement => {
                      return (
                        <Field
                          key={key}
                          name="remoteWork"
                          component={RadioInput}
                          id={key}
                          label={intl.formatMessage(remoteWorkMessages[key])}
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
                  {Object.keys(teleworkMessages).map(
                    (key): React.ReactElement => {
                      return (
                        <Field
                          key={key}
                          name="telework"
                          component={RadioInput}
                          id={key}
                          label={intl.formatMessage(teleworkMessages[key])}
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
                  {Object.keys(flexHourMessages).map(
                    (key): React.ReactElement => {
                      return (
                        <Field
                          key={key}
                          name="flexHours"
                          component={RadioInput}
                          id={key}
                          label={intl.formatMessage(flexHourMessages[key])}
                        />
                      );
                    },
                  )}
                </RadioGroup>
                <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                  <FormattedMessage
                    id="jobDetails.travelGroupHeader"
                    defaultMessage="Is travel required?"
                    description="Header message displayed on the travel group input."
                  />
                </p>
                <RadioGroup
                  id="travel"
                  required
                  grid="base(1of1)"
                  label={intl.formatMessage(formMessages.travelGroupLabel)}
                  error={errors.travel}
                  touched={touched.travel}
                  value={values.travel}
                >
                  {Object.keys(travelMessages).map(
                    (key): React.ReactElement => {
                      return (
                        <Field
                          key={key}
                          name="travel"
                          component={RadioInput}
                          id={key}
                          label={intl.formatMessage(travelMessages[key])}
                        />
                      );
                    },
                  )}
                </RadioGroup>
                <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                  <FormattedMessage
                    id="jobDetails.overtimeGroupHeader"
                    defaultMessage="Is overtime required?"
                    description="Header message displayed on the overtime group input."
                  />
                </p>
                <RadioGroup
                  id="overtime"
                  required
                  grid="base(1of1)"
                  label={intl.formatMessage(formMessages.overtimeGroupLabel)}
                  error={errors.overtime}
                  touched={touched.overtime}
                  value={values.overtime}
                >
                  {Object.keys(overtimeMessages).map(
                    (key): React.ReactElement => {
                      return (
                        <Field
                          key={key}
                          name="overtime"
                          component={RadioInput}
                          id={key}
                          label={intl.formatMessage(overtimeMessages[key])}
                        />
                      );
                    },
                  )}
                </RadioGroup>
                <div data-c-grid="gutter" data-c-grid-item="base(1of1)">
                  <div data-c-grid-item="base(1of1)">
                    <hr data-c-margin="top(normal) bottom(normal)" />
                  </div>
                  <div
                    data-c-alignment="base(centre) tp(left)"
                    data-c-grid-item="tp(1of2)"
                  >
                    <button
                      data-c-button="outline(c2)"
                      data-c-radius="rounded"
                      type="button"
                      disabled={isSubmitting}
                      onClick={(): void => {
                        /** TODO:
                         * This is a race condition, since the setState hook call is asynchronous.
                         * I have to find a way to handle 2 submit buttons in formik without a race condition somewhere :(
                         * For now, the setState always happens faster than the validation check, so it works.
                         * See https://github.com/jaredpalmer/formik/issues/214
                         * -- Tristan
                         */
                        setReturnOnSubmit(true);
                        submitForm();
                      }}
                    >
                      <FormattedMessage
                        id="jobDetails.returnButtonLabel"
                        defaultMessage="Save & Return to Intro"
                        description="The text displayed on the Save & Return button of the Job Details form."
                      />
                    </button>
                  </div>
                  <div
                    data-c-alignment="base(centre) tp(right)"
                    data-c-grid-item="tp(1of2)"
                  >
                    <button
                      data-c-button="solid(c1)"
                      data-c-radius="rounded"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <FormattedMessage
                        id="jobDetails.submitButtonLabel"
                        defaultMessage="Save & Preview"
                        description="The text displayed on the submit button for the Job Details form."
                      />
                    </button>
                  </div>
                </div>
              </Form>
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
                onModalMiddle={(): void => {
                  handleSkipToReview().finally((): void => {
                    setIsModalVisible(false);
                  });
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
                    <JobPreview
                      title={values.title}
                      department="Department"
                      remoteWork={intl.formatMessage(
                        remoteWorkMessages[values.remoteWork],
                      )}
                      language={
                        typeof values.language === "string"
                          ? ""
                          : intl.formatMessage(
                              languageRequirement(Number(values.language)),
                            )
                      }
                      city={values.city}
                      province={
                        typeof values.province === "string"
                          ? ""
                          : intl.formatMessage(
                              provinceName(Number(values.province)),
                            )
                      }
                      education={
                        values.educationRequirements.length > 0
                          ? values.educationRequirements
                          : getEducationMsgForClassification(
                              values.classification,
                              intl,
                            )
                      }
                      termLength={
                        typeof values.termLength === "string"
                          ? null
                          : Number(values.termLength)
                      }
                      telework={intl.formatMessage(
                        teleworkMessages[values.telework],
                      )}
                      flexHours={intl.formatMessage(
                        flexHourMessages[values.flexHours],
                      )}
                      securityLevel={
                        typeof values.securityLevel === "string"
                          ? ""
                          : intl.formatMessage(
                              securityClearance(Number(values.securityLevel)),
                            )
                      }
                      classification={String(values.classification)}
                      level={String(values.level)}
                      travel={intl.formatMessage(travelMessages[values.travel])}
                      overtime={intl.formatMessage(
                        overtimeMessages[values.overtime],
                      )}
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
                  {jobIsComplete && (
                    <Modal.FooterMiddleBtn>
                      <FormattedMessage
                        id="jobDetails.modalMiddleLabel"
                        defaultMessage="Skip to Review"
                        description="The text displayed on the 'Skip to Review' button of the Job Details modal."
                      />
                    </Modal.FooterMiddleBtn>
                  )}
                  <Modal.FooterConfirmBtn>
                    <FormattedMessage
                      id="jobDetails.modalConfirmLabel"
                      defaultMessage="Next Step"
                      description="The text displayed on the confirm button of the Job Details modal."
                    />
                  </Modal.FooterConfirmBtn>
                </Modal.Footer>
              </Modal>
            </section>
          )}
        />
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </section>
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

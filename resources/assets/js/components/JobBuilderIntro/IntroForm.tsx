import React, { useState } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  FormattedHTMLMessage,
  defineMessages,
} from "react-intl";
import { Form, Field, Formik, FormikValues } from "formik";
import * as Yup from "yup";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import { validationMessages } from "../Form/Messages";
import { Job } from "../../models/types";
import { DepartmentId } from "../../models/lookupConstants";
import { departmentName } from "../../models/localizedConstants";
import { emptyJob } from "../../models/jobUtil";

const formMessages = defineMessages({
  jobTitleLabelEN: {
    id: "jobBuilder.intro.jobTitleLabelEN",
    defaultMessage: "My Job Title (English)",
    description: "The label displayed on the job title input.",
  },
  jobTitlePlaceholderEN: {
    id: "jobBuilder.intro.jobTitlePlaceholderEN",
    defaultMessage: "e.g. Design Manager",
    description: "The placeholder displayed on the job title input.",
  },
  jobTitleLabelFR: {
    id: "jobBuilder.intro.jobTitleLabelFR",
    defaultMessage: "My Job Title (Français)",
    description: "The label displayed on the job title input.",
  },
  jobTitlePlaceholderFR: {
    id: "jobBuilder.intro.jobTitlePlaceholderFR",
    defaultMessage: "e.g. Gestionnaire de la conception",
    description: "The placeholder displayed on the job title input.",
  },
  departmentLabel: {
    id: "jobBuilder.intro.departmentLabel",
    defaultMessage: "My Department",
    description: "The label displayed on the department select box.",
  },
  departmentNullSelection: {
    id: "jobBuilder.intro.departmentNullSelection",
    defaultMessage: "Select a department...",
    description:
      "The default selection option displayed on the department select box.",
  },
  divisionLabelEN: {
    id: "jobBuilder.intro.divisionLabelEN",
    defaultMessage: "My Division (English)",
    description: "The label displayed on the division input.",
  },
  divisionPlaceholderEN: {
    id: "jobBuilder.intro.divisionPlaceholderEN",
    defaultMessage: "e.g. Digital Change",
    description: "The placeholder displayed on the division input.",
  },
  divisionLabelFR: {
    id: "jobBuilder.intro.divisionLabelFR",
    defaultMessage: "My Division (Français)",
    description: "The label displayed on the division input.",
  },
  divisionPlaceholderFR: {
    id: "jobBuilder.intro.divisionPlaceholderFR",
    defaultMessage: "e.g. Changement numérique",
    description: "The placeholder displayed on the division input.",
  },
});

// shape of values used in Form
interface FormValues {
  jobTitleEN: string;
  jobTitleFR: string;
  department: number | "";
  divisionEN: string;
  divisionFR: string;
}

interface IntroFormProps {
  // If not null, used to prepopulate form values
  job: Job | null;
  // Runs after successful validation.
  // It must (asyncronously) return true if the submission was successful, false otherwise.
  handleSubmit: (job: Job) => Promise<boolean>;
  // Continues the JobBuilder in English.
  handleContinueEn: () => void;
  // Continues the JobBuilder in French.
  handleContinueFr: () => void;
}

const jobToValues = (job: Job | null): FormValues =>
  job
    ? {
        jobTitleEN: job.en.title || "",
        jobTitleFR: job.fr.title || "",
        department: job.department_id || "",
        divisionEN: job.en.division || "",
        divisionFR: job.fr.division || "",
      }
    : {
        jobTitleEN: "",
        jobTitleFR: "",
        department: "",
        divisionEN: "",
        divisionFR: "",
      };

const updateJobWithValues = (job: Job, values: FormValues): Job => ({
  ...job,
  // eslint-disable-next-line @typescript-eslint/camelcase
  department_id: values.department || null,
  en: {
    ...job.en,
    title: values.jobTitleEN || null,
    division: values.divisionEN || null,
  },
  fr: {
    ...job.fr,
    title: values.jobTitleFR || null,
    division: values.divisionFR || null,
  },
});

const IntroForm: React.FunctionComponent<
  IntroFormProps & InjectedIntlProps
> = ({
  job,
  handleSubmit,
  handleContinueEn,
  handleContinueFr,
  intl,
}: IntroFormProps & InjectedIntlProps): React.ReactElement => {
  const initialValues: FormValues = jobToValues(job);
  const [languageSelection, setLanguageSelection] = useState("en");

  const introSchema = Yup.object().shape({
    jobTitleEN: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    jobTitleFR: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    divisionEN: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    divisionFR: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    department: Yup.number()
      .oneOf(
        Object.values(DepartmentId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <>
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(normal)"
        >
          <FormattedMessage
            id="jobBuilder.intro.welcome"
            defaultMessage="EN Welcome to the Job Poster Builder"
            description="Header of Job Poster Builder Intro Step"
          />
        </h3>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.intro.subtitle01"
            defaultMessage="This tool will help you create a job poster that attracts the right talent."
            description="Subtitle 1 of Job Poster Builder Intro Step"
          />
        </p>
        <p data-c-margin="bottom(double)">
          <FormattedMessage
            id="jobBuilder.intro.subtitle02"
            defaultMessage="We’ve also provided instructions and examples to help guide you through the process but if you still have questions, contact "
            description="Subtitle 2 of Job Poster Builder Intro Step"
          />
          <a
            href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca"
            title="Email Talent Cloud."
          >
            Talent Cloud
          </a>
        </p>
        <h4
          data-c-colour="c3"
          data-c-font-size="h4"
          data-c-margin="bottom(double)"
        >
          <FormattedMessage
            id="jobBuilder.intro.beforeWeStart"
            defaultMessage="Before we get started please review your information."
            description="Before starting header of Job Poster Builder Intro Step"
          />
        </h4>
        <Formik
          initialValues={initialValues}
          validationSchema={introSchema}
          onSubmit={(values, { setSubmitting }): void => {
            handleSubmit(updateJobWithValues(job || emptyJob(), values))
              .then((isSuccessful: boolean): void => {
                if (isSuccessful) {
                  if (languageSelection === "fr") {
                    handleContinueFr();
                  } else {
                    handleContinueEn();
                  }
                }
              })
              .finally(
                (): void => setSubmitting(false), // Required by Formik to finish the submission cycle
              );
          }}
          render={({
            isSubmitting,
            values,
            submitForm,
          }): React.ReactElement => (
            <>
              <Form id="form" data-c-margin="bottom(normal)">
                <div data-c-grid="gutter">
                  <Field
                    type="text"
                    htmlId="builder01ManagerJobTitleEN"
                    name="jobTitleEN"
                    label={intl.formatMessage(formMessages.jobTitleLabelEN)}
                    placeholder={intl.formatMessage(
                      formMessages.jobTitlePlaceholderEN,
                    )}
                    required
                    grid="tl(1of2)"
                    component={Input}
                  />
                  <Field
                    type="text"
                    htmlId="builder01ManagerJobTitleFR"
                    name="jobTitleFR"
                    label={intl.formatMessage(formMessages.jobTitleLabelFR)}
                    placeholder={intl.formatMessage(
                      formMessages.jobTitlePlaceholderFR,
                    )}
                    required
                    grid="tl(1of2)"
                    component={Input}
                  />
                  <Field
                    name="department"
                    id="builder01ManagerDepartment"
                    label={intl.formatMessage(formMessages.departmentLabel)}
                    grid="base(1of1)"
                    component={Select}
                    required
                    selected={values.department}
                    nullSelection={intl.formatMessage(
                      formMessages.departmentNullSelection,
                    )}
                    options={Object.values(DepartmentId).map((id: number): {
                      value: number;
                      label: string;
                    } => ({
                      value: id,
                      label: intl.formatMessage(departmentName(id)),
                    }))}
                  />
                  <Field
                    type="text"
                    htmlId="builder01ManagerDivisionEN"
                    name="divisionEN"
                    label={intl.formatMessage(formMessages.divisionLabelEN)}
                    placeholder={intl.formatMessage(
                      formMessages.divisionPlaceholderEN,
                    )}
                    required
                    grid="tl(1of2)"
                    component={Input}
                  />
                  <Field
                    type="text"
                    htmlId="builder01ManagerDivisionFR"
                    name="divisionFR"
                    label={intl.formatMessage(formMessages.divisionLabelFR)}
                    placeholder={intl.formatMessage(
                      formMessages.divisionPlaceholderFR,
                    )}
                    required
                    grid="tl(1of2)"
                    component={Input}
                  />
                </div>
              </Form>
              <p data-c-margin="bottom(normal)">
                <FormattedHTMLMessage
                  id="jobBuilder.intro.note"
                  defaultMessage="<strong>Note:</strong> Changing your information on this form will also change these fields in your Profile."
                  description="Ending note for hiring managers."
                />
              </p>
              <p data-c-margin="bottom(double)">
                <FormattedMessage
                  id="jobBuilder.intro.completeInLanguage"
                  defaultMessage="Complete the job poster in the language of your choice. We will
                  handle translation."
                  description="Intstructions at bottom of form on language choice for job poster builder."
                />
              </p>
              {/* This button continues the user in English. */}
              <button
                form="form"
                data-c-button="solid(c1)"
                data-c-radius="rounded"
                type="button"
                disabled={isSubmitting}
                onClick={(): void => {
                  setLanguageSelection("en");
                  submitForm();
                }}
              >
                <FormattedMessage
                  id="jobBuilder.intro.continueButtonLabelEN"
                  defaultMessage="Continue in English"
                  description="Label displayed on submit button for continuation of job builder in english."
                />
              </button>
              {/* This button switches the user to French and continues the process in French.  */}
              <button
                form="form"
                data-c-button="solid(c1)"
                data-c-radius="rounded"
                type="button"
                disabled={isSubmitting}
                onClick={(): void => {
                  setLanguageSelection("fr");
                  submitForm();
                }}
              >
                <FormattedMessage
                  id="jobBuilder.intro.continueButtonLabelFR"
                  defaultMessage="Continuer en Français"
                  description="Label displayed on submit button for continuation of job builder in french."
                />
              </button>
            </>
          )}
        />
      </div>
    </>
  );
};

export default injectIntl(IntroForm);

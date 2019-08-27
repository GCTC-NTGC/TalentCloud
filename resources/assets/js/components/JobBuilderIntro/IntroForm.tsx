import React, { useState } from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  FormattedHTMLMessage,
  defineMessages,
} from "react-intl";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { validationMessages } from "../Form/Messages";
import { Job, Department, Manager } from "../../models/types";
import { emptyJob } from "../../models/jobUtil";
import SelectInput from "../Form/SelectInput";
import TextInput from "../Form/TextInput";
import { getId } from "../../helpers/queries";

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
interface IntroFormValues {
  managerPositionEn: string;
  managerPositionFr: string;
  department: number | "";
  divisionEN: string;
  divisionFR: string;
}

interface IntroFormProps {
  // If not null, used to prepopulate form values
  job: Job | null;
  // The manager of this job. Used to prepopulate values.
  manager: Manager;
  // List of known department options.
  departments: Department[];
  // Runs after successful validation.
  // It must (asyncronously) return the resulting job, if successful.
  handleSubmit: (job: Job, manager: Manager) => Promise<Job>;
  // Continues the JobBuilder in English.
  handleContinueEn: (job: Job) => void;
  // Continues the JobBuilder in French.
  handleContinueFr: (job: Job) => void;
}

const initializeValues = (
  job: Job | null,
  manager: Manager,
): IntroFormValues => {
  let department: number | "" = "";
  if (job !== null && job.department_id !== null) {
    department = job.department_id;
  } else if (manager.department_id !== null) {
    department = manager.department_id;
  }

  let divisionEN = "";
  if (job !== null && job.en.division) {
    divisionEN = job.en.division;
  } else if (manager.en.division) {
    divisionEN = manager.en.division;
  }

  let divisionFR = "";
  if (job !== null && job.fr.division) {
    divisionFR = job.fr.division;
  } else if (manager.fr.division) {
    divisionFR = manager.fr.division;
  }

  return {
    managerPositionEn: manager.en.position || "",
    managerPositionFr: manager.fr.position || "",
    department,
    divisionEN,
    divisionFR,
  };
};

const updateJobWithValues = (job: Job, values: IntroFormValues): Job => ({
  ...job,
  // eslint-disable-next-line @typescript-eslint/camelcase
  department_id: values.department || null,
  en: {
    ...job.en,
    division: values.divisionEN || null,
  },
  fr: {
    ...job.fr,
    division: values.divisionFR || null,
  },
});

const updateManagerWithValues = (
  manager: Manager,
  values: IntroFormValues,
): Manager => ({
  ...manager,
  // eslint-disable-next-line @typescript-eslint/camelcase
  department_id: values.department || null,
  en: {
    ...manager.en,
    position: values.managerPositionEn || null,
    division: values.divisionEN || null,
  },
  fr: {
    ...manager.fr,
    position: values.managerPositionFr || null,
    division: values.divisionFR || null,
  },
});

const IntroForm: React.FunctionComponent<
  IntroFormProps & InjectedIntlProps
> = ({
  job,
  manager,
  departments,
  handleSubmit,
  handleContinueEn,
  handleContinueFr,
  intl,
}: IntroFormProps & InjectedIntlProps): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const initialValues: IntroFormValues = initializeValues(job, manager);
  const [languageSelection, setLanguageSelection] = useState(locale);

  const introSchema = Yup.object().shape({
    managerPositionEn: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    managerPositionFr: Yup.string().required(
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
        departments.map(getId),
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
            defaultMessage="Welcome to the Job Poster Builder"
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
          enableReinitialize
          initialValues={initialValues}
          validationSchema={introSchema}
          onSubmit={(values, { setSubmitting }): void => {
            const updatedJob = updateJobWithValues(job || emptyJob(), values);
            const updatedManager = updateManagerWithValues(manager, values);
            handleSubmit(updatedJob, updatedManager)
              .then((newJob: Job): void => {
                if (languageSelection === "fr") {
                  handleContinueFr(newJob);
                } else {
                  handleContinueEn(newJob);
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
                    id="builder01ManagerManagerPositionEn"
                    name="managerPositionEn"
                    label={intl.formatMessage(formMessages.jobTitleLabelEN)}
                    placeholder={intl.formatMessage(
                      formMessages.jobTitlePlaceholderEN,
                    )}
                    required
                    grid="tl(1of2)"
                    component={TextInput}
                  />
                  <Field
                    type="text"
                    id="builder01ManagerPositionFr"
                    name="managerPositionFr"
                    label={intl.formatMessage(formMessages.jobTitleLabelFR)}
                    placeholder={intl.formatMessage(
                      formMessages.jobTitlePlaceholderFR,
                    )}
                    required
                    grid="tl(1of2)"
                    component={TextInput}
                  />
                  <Field
                    name="department"
                    id="builder01ManagerDepartment"
                    label={intl.formatMessage(formMessages.departmentLabel)}
                    grid="base(1of1)"
                    component={SelectInput}
                    required
                    selected={values.department}
                    nullSelection={intl.formatMessage(
                      formMessages.departmentNullSelection,
                    )}
                    options={departments.map((dept: Department): {
                      value: number;
                      label: string;
                    } => ({
                      value: dept.id,
                      label: dept[locale].name,
                    }))}
                  />
                  <Field
                    type="text"
                    id="builder01ManagerDivisionEN"
                    name="divisionEN"
                    label={intl.formatMessage(formMessages.divisionLabelEN)}
                    placeholder={intl.formatMessage(
                      formMessages.divisionPlaceholderEN,
                    )}
                    required
                    grid="tl(1of2)"
                    component={TextInput}
                  />
                  <Field
                    type="text"
                    id="builder01ManagerDivisionFR"
                    name="divisionFR"
                    label={intl.formatMessage(formMessages.divisionLabelFR)}
                    placeholder={intl.formatMessage(
                      formMessages.divisionPlaceholderFR,
                    )}
                    required
                    grid="tl(1of2)"
                    component={TextInput}
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
                  /** FIXME:
                   * This is a race condition, since setLanguageSelection is asynchronous.
                   * I have to find a way to handle 2 submit buttons in formik without a race condition somewhere :(
                   * For now, the setState always happens faster than the validation check, so it works.
                   * See https://github.com/jaredpalmer/formik/issues/214
                   * -- Tristan
                   */
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
                  /** FIXME:
                   * This is a race condition, since setLanguageSelection is asynchronous.
                   * I have to find a way to handle 2 submit buttons in formik without a race condition somewhere :(
                   * For now, the setState always happens faster than the validation check, so it works.
                   * See https://github.com/jaredpalmer/formik/issues/214
                   * -- Tristan
                   */
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

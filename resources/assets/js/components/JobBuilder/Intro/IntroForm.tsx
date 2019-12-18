import React, { useState } from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import nprogress from "nprogress";
import get from "lodash/get";
import { validationMessages } from "../../Form/Messages";
import { Job, Department, Manager } from "../../../models/types";
import { emptyJob } from "../../../models/jobUtil";
import SelectInput from "../../Form/SelectInput";
import TextInput from "../../Form/TextInput";
import { getId } from "../../../helpers/queries";

const pageMessages = defineMessages({
  explanationBoldText: {
    id: "jobBuilder.intro.explanation.boldText",
    defaultMessage: "confirm that your personal information below is correct.",
    description: "Bold text portion of the JPB Intro explanation.",
  },
  emailLinkTitle: {
    id: "jobBuilder.intro.emailLinkTitle",
    defaultMessage: "Email Talent Cloud",
    description: "Title of the Talent Cloud email link.",
  },
  emailLinkText: {
    id: "jobBuilder.intro.emailLinkText",
    defaultMessage: "Talent Cloud",
    description: "Visible text of the Talent Cloud email link.",
  },
});

const formMessages = defineMessages({
  jobTitleLabelEN: {
    id: "jobBuilder.intro.jobTitleLabelEN",
    defaultMessage: "{name}'s Position (English)",
    description: "The label displayed on the manager position input.",
  },
  jobTitlePlaceholderEN: {
    id: "jobBuilder.intro.jobTitlePlaceholderEN",
    defaultMessage: "e.g. Design Manager",
    description: "The placeholder displayed on the Manager Position input.",
  },
  jobTitleLabelFR: {
    id: "jobBuilder.intro.jobTitleLabelFR",
    defaultMessage: "{name}'s Position (Français)",
    description: "The label displayed on the Manager Position input.",
  },
  jobTitlePlaceholderFR: {
    id: "jobBuilder.intro.jobTitlePlaceholderFR",
    defaultMessage: "e.g. Gestionnaire de la conception",
    description: "The placeholder displayed on the Manager Position input.",
  },
  departmentLabel: {
    id: "jobBuilder.intro.departmentLabel",
    defaultMessage: "{name}'s Department",
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
    defaultMessage: "{name}'s Division (English)",
    description: "The label displayed on the division input.",
  },
  divisionPlaceholderEN: {
    id: "jobBuilder.intro.divisionPlaceholderEN",
    defaultMessage: "e.g. Digital Change",
    description: "The placeholder displayed on the division input.",
  },
  divisionLabelFR: {
    id: "jobBuilder.intro.divisionLabelFR",
    defaultMessage: "{name}'s Division (Français)",
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
  // It must (asynchronously) return the resulting job, if successful.
  handleSubmit: (job: Job, manager: Manager) => Promise<Job>;
  // Continues to next step in JobBuilder.
  handleContinue: (chosenLang: "en" | "fr", job: Job) => void;
  // // Continues the JobBuilder in French.
  // handleContinueFr: (job: Job) => void;
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

  const managerDivision = {
    en: get(manager, "division.en", ""),
    fr: get(manager, "division.fr", ""),
  };

  let divisionEN = "";
  if (job !== null && job.division.en) {
    divisionEN = job.division.en;
  } else if (managerDivision.en) {
    divisionEN = managerDivision.en;
  }

  let divisionFR = "";
  if (job !== null && job.division.fr) {
    divisionFR = job.division.fr;
  } else if (managerDivision.fr) {
    divisionFR = managerDivision.fr;
  }

  return {
    managerPositionEn: get(manager, "position.en", ""),
    managerPositionFr: get(manager, "position.fr", ""),
    department,
    divisionEN,
    divisionFR,
  };
};

const updateJobWithValues = (
  job: Job,
  values: IntroFormValues,
  locale: string,
): Job => ({
  ...job,
  // eslint-disable-next-line @typescript-eslint/camelcase
  chosen_lang: locale,
  // eslint-disable-next-line @typescript-eslint/camelcase
  department_id: values.department || null,
  division: {
    ...job.division,
    en: values.divisionEN || null,
    fr: values.divisionFR || null,
  },
});

const updateManagerWithValues = (
  manager: Manager,
  values: IntroFormValues,
): Manager => ({
  ...manager,
  // eslint-disable-next-line @typescript-eslint/camelcase
  department_id: values.department || null,
  division: {
    ...manager.division,
    en: values.divisionEN || null,
    fr: values.divisionFR || null,
  },
  position: {
    ...manager.position,
    en: values.managerPositionEn || null,
    fr: values.managerPositionFr || null,
  },
});

const IntroForm: React.FunctionComponent<IntroFormProps &
  WrappedComponentProps> = ({
  job,
  manager,
  departments,
  handleSubmit,
  handleContinue,
  intl,
}: IntroFormProps & WrappedComponentProps): React.ReactElement => {
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
        <p data-c-margin="bottom(double)">
          <FormattedMessage
            id="jobBuilder.intro.explanation"
            defaultMessage="This tool will help you create a job poster that attracts the right talent. Before we get started on your job poster, take some time to {boldText}"
            description="Explanation of Job Poster Builder Intro Step"
            values={{
              boldText: (
                <span data-c-font-weight="bold">
                  {intl.formatMessage(pageMessages.explanationBoldText)}
                </span>
              ),
            }}
          />
        </p>
        <h4 data-c-font-size="h4" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.intro.formTitle"
            defaultMessage="{name}'s Profile Information"
            description="The title of the profile information form."
            values={{
              name: manager.first_name,
            }}
          />
        </h4>
        <p data-c-margin="bottom(double)">
          <FormattedMessage
            id="jobBuilder.intro.formDescription"
            defaultMessage="This information is used on the Job Poster to help applicants learn more about who they'll be working with."
            description="Explanation of why the profile information is collected."
          />
        </p>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={introSchema}
          onSubmit={(values, { setSubmitting }): void => {
            const updatedJob = updateJobWithValues(
              job || emptyJob(),
              values,
              languageSelection,
            );
            const updatedManager = updateManagerWithValues(manager, values);
            nprogress.start();
            handleSubmit(updatedJob, updatedManager)
              .then((newJob: Job): void => {
                if (languageSelection === "fr") {
                  handleContinue("fr", newJob);
                } else {
                  handleContinue("en", newJob);
                }
              })
              .finally((): void => {
                nprogress.done();
                setSubmitting(false); // Required by Formik to finish the submission cycle
              });
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
                    id="builder01ManagerPositionEn"
                    name="managerPositionEn"
                    label={intl.formatMessage(formMessages.jobTitleLabelEN, {
                      name: manager.first_name,
                    })}
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
                    label={intl.formatMessage(formMessages.jobTitleLabelFR, {
                      name: manager.first_name,
                    })}
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
                    label={intl.formatMessage(formMessages.departmentLabel, {
                      name: manager.first_name,
                    })}
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
                      label: dept.name[locale],
                    }))}
                  />
                  <Field
                    type="text"
                    id="builder01ManagerDivisionEN"
                    name="divisionEN"
                    label={intl.formatMessage(formMessages.divisionLabelEN, {
                      name: manager.first_name,
                    })}
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
                    label={intl.formatMessage(formMessages.divisionLabelFR, {
                      name: manager.first_name,
                    })}
                    placeholder={intl.formatMessage(
                      formMessages.divisionPlaceholderFR,
                    )}
                    required
                    grid="tl(1of2)"
                    component={TextInput}
                  />
                </div>
              </Form>
              <p data-c-margin="bottom(double)">
                <FormattedMessage
                  id="jobBuilder.intro.completeInLanguage"
                  defaultMessage="Complete the job poster in the language of your choice. We will
                  handle translation."
                  description="Instructions at bottom of form on language choice for job poster builder."
                />{" "}
                <FormattedMessage
                  id="jobBuilder.intro.contactUs"
                  defaultMessage="We’ve also provided instructions and examples to help guide you through the process but if you still have questions, contact {link}."
                  description="Subtitle 2 of Job Poster Builder Intro Step"
                  values={{
                    link: (
                      <a
                        href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca"
                        title={intl.formatMessage(pageMessages.emailLinkTitle)}
                      >
                        {intl.formatMessage(pageMessages.emailLinkText)}
                      </a>
                    ),
                  }}
                />
              </p>
              {/* This button continues the user in English. */}
              <button
                form="form"
                data-c-button="solid(c1)"
                data-c-radius="rounded"
                data-c-margin="right(normal) bottom(normal)"
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

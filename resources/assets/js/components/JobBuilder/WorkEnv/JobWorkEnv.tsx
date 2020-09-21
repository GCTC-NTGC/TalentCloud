/* eslint-disable jsx-a11y/label-has-associated-control, camelcase, @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import { Form, Formik, FormikTouched, FormikErrors, FastField } from "formik";
import * as Yup from "yup";
import nprogress from "nprogress";
import {
  FormattedMessage,
  MessageDescriptor,
  IntlShape,
  useIntl,
} from "react-intl";
import RadioGroup from "../../Form/RadioGroup";
import ContextBlock from "../../ContextBlock/ContextBlock";
import ContextBlockItem from "../../ContextBlock/ContextBlockItem";
import CopyToClipboardButton from "../../CopyToClipboardButton";
import JobWorkEnvModal from "./JobWorkEnvModal";
import RadioInput from "../../Form/RadioInput";
import NumberInput from "../../Form/NumberInput";
import TextAreaInput from "../../Form/TextAreaInput";
import { validationMessages } from "../../Form/Messages";
import { Job } from "../../../models/types";
import { emptyJob } from "../../../models/jobUtil";
import {
  notEmpty,
  hasKey,
  mapToObjectTrans,
  identity,
} from "../../../helpers/queries";
import {
  physEnvOptions,
  techOptions,
  amenitiesOptions,
  phyEnvDescriptions,
  techDescriptions,
  amenitiesDescriptions,
} from "./WorkEnvFeatures";
import { localizeField, getLocale } from "../../../helpers/localize";
import {
  formMessages,
  culturePaceMessages,
  mgmtStyleMessages,
  experimentalMessages,
  facingMessages,
  collaborativenessMessages,
} from "./JobWorkEnvMessages";
import CheckboxGroupField from "../../Form/CheckboxGroupField";

type CulturePaceId =
  | "culturePace01"
  | "culturePace02"
  | "culturePace03"
  | "culturePace04";
const culturePaceList: {
  id: CulturePaceId;
  title: MessageDescriptor;
  subtext: MessageDescriptor;
}[] = [
  {
    id: "culturePace01",
    title: culturePaceMessages.pace01Title,
    subtext: culturePaceMessages.pace01Description,
  },
  {
    id: "culturePace02",
    title: culturePaceMessages.pace02Title,
    subtext: culturePaceMessages.pace02Description,
  },
  {
    id: "culturePace03",
    title: culturePaceMessages.pace03Title,
    subtext: culturePaceMessages.pace03Description,
  },
  {
    id: "culturePace04",
    title: culturePaceMessages.pace04Title,
    subtext: culturePaceMessages.pace04Description,
  },
];

type MgmtStyleId =
  | "mgmtStyle01"
  | "mgmtStyle02"
  | "mgmtStyle03"
  | "mgmtStyle04";
const managementList: {
  id: MgmtStyleId;
  title: MessageDescriptor;
  subtext: MessageDescriptor;
}[] = [
  {
    id: "mgmtStyle01",
    title: mgmtStyleMessages.style01Title,
    subtext: mgmtStyleMessages.style01Description,
  },
  {
    id: "mgmtStyle02",
    title: mgmtStyleMessages.style02Title,
    subtext: mgmtStyleMessages.style02Description,
  },
  {
    id: "mgmtStyle03",
    title: mgmtStyleMessages.style03Title,
    subtext: mgmtStyleMessages.style03Description,
  },
  {
    id: "mgmtStyle04",
    title: mgmtStyleMessages.style04Title,
    subtext: mgmtStyleMessages.style04Description,
  },
];

type ExperiementalId =
  | "experimental01"
  | "experimental02"
  | "experimental03"
  | "experimental04";
const experimentalList: {
  id: ExperiementalId;
  title: MessageDescriptor;
  subtext: MessageDescriptor;
}[] = [
  {
    id: "experimental01",
    title: experimentalMessages.experimental01Title,
    subtext: experimentalMessages.experimental01Description,
  },
  {
    id: "experimental02",
    title: experimentalMessages.experimental02Title,
    subtext: experimentalMessages.experimental02Description,
  },
  {
    id: "experimental03",
    title: experimentalMessages.experimental03Title,
    subtext: experimentalMessages.experimental03Description,
  },
  {
    id: "experimental04",
    title: experimentalMessages.experimental04Title,
    subtext: experimentalMessages.experimental04Description,
  },
];

type FacingId = "facing01" | "facing02" | "facing03" | "facing04";
const facingList: {
  id: FacingId;
  title: MessageDescriptor;
  subtext: MessageDescriptor;
}[] = [
  {
    id: "facing01",
    title: facingMessages.facing01Title,
    subtext: facingMessages.facing01Description,
  },
  {
    id: "facing02",
    title: facingMessages.facing02Title,
    subtext: facingMessages.facing02Description,
  },
  {
    id: "facing03",
    title: facingMessages.facing03Title,
    subtext: facingMessages.facing03Description,
  },
  {
    id: "facing04",
    title: facingMessages.facing04Title,
    subtext: facingMessages.facing04Description,
  },
];

type CollaborativenessId =
  | "collaborativeness01"
  | "collaborativeness02"
  | "collaborativeness03"
  | "collaborativeness04";
const collaborativenessList: {
  id: CollaborativenessId;
  title: MessageDescriptor;
  subtext: MessageDescriptor;
}[] = [
  {
    id: "collaborativeness01",
    title: collaborativenessMessages.collaborativeness01Title,
    subtext: collaborativenessMessages.collaborativeness01Description,
  },
  {
    id: "collaborativeness02",
    title: collaborativenessMessages.collaborativeness02Title,
    subtext: collaborativenessMessages.collaborativeness02Description,
  },
  {
    id: "collaborativeness03",
    title: collaborativenessMessages.collaborativeness03Title,
    subtext: collaborativenessMessages.collaborativeness03Description,
  },
  {
    id: "collaborativeness04",
    title: collaborativenessMessages.collaborativeness04Title,
    subtext: collaborativenessMessages.collaborativeness04Description,
  },
];

// shape of values used in Form
export interface JobWorkEnvValues {
  teamSize: number | "";
  physicalEnv: string[];
  technology: string[];
  amenities: string[];
  envDescription: string;
  culturePace?: CulturePaceId;
  management?: MgmtStyleId;
  experimental?: ExperiementalId;
  facing?: FacingId;
  collaborativeness?: CollaborativenessId;
  cultureSummary: string;
  moreCultureSummary: string;
}

function convertSliderIdFromJob<T>(
  key: string,
  formSliderArray: { id: T }[],
  jobSliderId: number | null,
): { [key: string]: T } | {} {
  return jobSliderId && jobSliderId > 0 && jobSliderId <= formSliderArray.length
    ? {
        [key]: formSliderArray[jobSliderId - 1].id,
      }
    : { [key]: undefined };
}

const jobToValues = (
  {
    team_size,
    fast_vs_steady,
    horizontal_vs_vertical,
    experimental_vs_ongoing,
    citizen_facing_vs_back_office,
    collaborative_vs_independent,
    work_env_features,
    ...job
  }: Job,
  locale: "en" | "fr",
): JobWorkEnvValues => {
  const isTrueInEnvFeatures = (option: string): boolean =>
    work_env_features !== null &&
    hasKey(work_env_features, option) &&
    work_env_features[option];

  return {
    teamSize: team_size || "",
    physicalEnv: physEnvOptions.filter(isTrueInEnvFeatures),
    technology: techOptions.filter(isTrueInEnvFeatures),
    amenities: amenitiesOptions.filter(isTrueInEnvFeatures),
    ...convertSliderIdFromJob("culturePace", culturePaceList, fast_vs_steady),
    ...convertSliderIdFromJob(
      "management",
      managementList,
      horizontal_vs_vertical,
    ),
    ...convertSliderIdFromJob(
      "experimental",
      experimentalList,
      experimental_vs_ongoing,
    ),
    ...convertSliderIdFromJob(
      "facing",
      facingList,
      citizen_facing_vs_back_office,
    ),
    ...convertSliderIdFromJob(
      "collaborativeness",
      collaborativenessList,
      collaborative_vs_independent,
    ),
    envDescription: localizeField(locale, job, "work_env_description") || "",
    cultureSummary: localizeField(locale, job, "culture_summary") || "",
    moreCultureSummary: localizeField(locale, job, "culture_special") || "",
  };
};

function convertSliderIdToJob(
  formSliderArray: { id: string }[],
  id: string | undefined,
): number | null {
  if (id === undefined) {
    return null;
  }
  return formSliderArray.map((item): string => item.id).indexOf(id) + 1;
}

const updateJobWithValues = (
  job: Job,
  locale: "en" | "fr",
  {
    teamSize,
    physicalEnv,
    technology,
    amenities,
    envDescription,
    culturePace,
    management,
    experimental,
    facing,
    collaborativeness,
    cultureSummary,
    moreCultureSummary,
  }: JobWorkEnvValues,
): Job => {
  const physFeatures = mapToObjectTrans(
    physEnvOptions,
    identity,
    (option): boolean => physicalEnv.includes(option),
  );
  const techFeatures = mapToObjectTrans(
    techOptions,
    identity,
    (option): boolean => technology.includes(option),
  );
  const amenityFeatures = mapToObjectTrans(
    amenitiesOptions,
    identity,
    (option): boolean => amenities.includes(option),
  );
  const workEnvFeatures = {
    ...physFeatures,
    ...techFeatures,
    ...amenityFeatures,
  };
  return {
    ...job,
    team_size: teamSize || null,
    fast_vs_steady: convertSliderIdToJob(culturePaceList, culturePace),
    horizontal_vs_vertical: convertSliderIdToJob(managementList, management),
    experimental_vs_ongoing: convertSliderIdToJob(
      experimentalList,
      experimental,
    ),
    citizen_facing_vs_back_office: convertSliderIdToJob(facingList, facing),
    collaborative_vs_independent: convertSliderIdToJob(
      collaborativenessList,
      collaborativeness,
    ),
    work_env_features: workEnvFeatures,
    work_env_description: {
      ...job.work_env_description,
      [locale]: envDescription || null,
    },
    culture_summary: {
      ...job.culture_summary,
      [locale]: cultureSummary || null,
    },
    culture_special: {
      ...job.culture_special,
      [locale]: moreCultureSummary || null,
    },
  };
};

const renderRadioWithContext = (
  intl: IntlShape,
  touched: FormikTouched<JobWorkEnvValues>,
  errors: FormikErrors<JobWorkEnvValues>,
  values: JobWorkEnvValues,
  fieldName: string,
  label: string,
  sliderList: {
    id: string;
    title: MessageDescriptor;
    subtext: MessageDescriptor;
  }[],
): React.ReactElement => {
  return (
    <div className="job-builder-culture-block" data-c-grid-item="base(1of1)">
      <div data-c-grid="gutter">
        <RadioGroup
          id={fieldName}
          label={label}
          required
          touched={touched[fieldName]}
          error={errors[fieldName]}
          value={values[fieldName]}
          grid="base(1of1) tl(1of3)"
        >
          {sliderList.map(
            ({ id, title }): React.ReactElement => {
              return (
                <FastField
                  key={id}
                  name={fieldName}
                  component={RadioInput}
                  id={id}
                  label={intl.formatMessage(title)}
                  value={id}
                  trigger
                  required
                />
              );
            },
          )}
        </RadioGroup>
        <ContextBlock
          className="job-builder-context-block"
          grid="base(1of1) tl(2of3)"
        >
          {sliderList.map(
            ({ id, title, subtext }): React.ReactElement => {
              return (
                <ContextBlockItem
                  key={id}
                  contextId={id}
                  title={intl.formatMessage(title)}
                  subtext={intl.formatMessage(subtext)}
                  className="job-builder-context-item"
                  active={values[fieldName] === id}
                />
              );
            },
          )}
        </ContextBlock>
      </div>
    </div>
  );
};

interface JobWorkEnvProps {
  // Optional Job to prepopulate form values from.
  job: Job | null;
  // A boolean that gives you the state of the request for the job data.
  jobIsComplete: boolean;
  // Submit function that runs after successful validation.
  // It must return the submitted job, if successful.
  handleSubmit: (values: Job) => Promise<Job>;
  // The function to run when user clicks Prev Page
  handleReturn: () => void;
  // Function to run when modal cancel is clicked.
  handleModalCancel: () => void;
  // Function to run when modal confirm is clicked.
  handleModalConfirm: () => void;
  handleSkipToReview: () => Promise<void>;
}

const JobWorkEnv = ({
  job,
  handleSubmit,
  handleReturn,
  handleModalCancel,
  handleModalConfirm,
  jobIsComplete,
  handleSkipToReview,
}: JobWorkEnvProps): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialValues: JobWorkEnvValues = job
    ? jobToValues(job, locale)
    : {
        teamSize: "",
        physicalEnv: [],
        technology: [],
        amenities: [],
        culturePace: undefined,
        management: undefined,
        experimental: undefined,
        facing: undefined,
        collaborativeness: undefined,
        envDescription: "",
        cultureSummary: "",
        moreCultureSummary: "",
      };

  const phyEnvData: { value: string; label: string }[] = phyEnvDescriptions(
    intl,
  );
  const techData: { value: string; label: string }[] = techDescriptions(intl);
  const amenitiesData: {
    value: string;
    label: string;
  }[] = amenitiesDescriptions(intl);

  const modalParentRef = useRef<HTMLDivElement>(null);
  const workEnvSchema = Yup.object().shape({
    teamSize: Yup.number()
      .min(1, intl.formatMessage(validationMessages.required))
      .required(intl.formatMessage(validationMessages.required)),
    physicalEnv: Yup.array().of(Yup.string()),
    technology: Yup.array().of(Yup.string()),
    amenities: Yup.array().of(Yup.string()),
    envDescription: Yup.string(),
    culturePace: Yup.string()
      .oneOf(culturePaceList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    management: Yup.string()
      .oneOf(managementList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    experimental: Yup.string()
      .oneOf(experimentalList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    facing: Yup.string()
      .oneOf(facingList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
    collaborativeness: Yup.string()
      .oneOf(collaborativenessList.map((item): string => item.id))
      .required(intl.formatMessage(validationMessages.checkboxRequired)),
  });

  /** Compiles and returns all the active radio buttons corresponding context box values within the culture section  */
  const buildCultureSummary = (values: JobWorkEnvValues): string => {
    const pace = culturePaceList.find(
      ({ id }): boolean => id === values.culturePace,
    );
    const management = managementList.find(
      ({ id }): boolean => id === values.management,
    );
    const experimental = experimentalList.find(
      ({ id }): boolean => id === values.experimental,
    );
    const facing = facingList.find(({ id }): boolean => id === values.facing);
    const collaborativeness = collaborativenessList.find(
      ({ id }): boolean => id === values.collaborativeness,
    );

    const cultureSummary: string = [
      pace,
      management,
      experimental,
      facing,
      collaborativeness,
    ]
      .filter(notEmpty)
      .map((item): string => intl.formatMessage(item.subtext))
      .join(" ");
    return cultureSummary;
  };

  const updateValuesAndReturn = (values: JobWorkEnvValues): void => {
    nprogress.start();
    // If custom summary textbox is length is zero, set cultureSummary to generated text
    const cultureSummary =
      values.cultureSummary.length === 0
        ? buildCultureSummary(values)
        : values.cultureSummary;
    const formValues: JobWorkEnvValues = { ...values, cultureSummary };
    const oldJob = job || emptyJob();
    const updatedJob = updateJobWithValues(oldJob, locale, formValues);
    handleSubmit(updatedJob).then((): void => {
      nprogress.done();
      handleReturn();
    });
  };

  return (
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
          id="jobBuilder.workEnv.title"
          defaultMessage="Work Environment"
          description="Header of job poster builder work environment step."
        />
      </h3>
      <p>
        <FormattedMessage
          id="jobBuilder.workEnv.stepDescription"
          defaultMessage={`Applicants care a lot about the team they'll be working with and the physical workspace as well. Sharing information about these things help applicants determine if they'll be a good fit, and can reduce the number of "wishful thinking" applications that slow down the screening process.`}
          description="Description of job poster builder work environment step."
        />
      </p>
      <div data-c-grid-item="base(1of1)">
        <h4 data-c-font-size="h4" data-c-margin="top(triple) bottom(normal)">
          <FormattedMessage
            id="jobBuilder.workEnv.ourWorkEnv"
            defaultMessage="Our Work Environment"
            description="Section 1 of Job Poster Builder Work Environment Step"
          />
        </h4>
        <p data-c-margin="bottom(normal)">
          {intl.formatMessage(formMessages.ourWorkEnvDesc)}
        </p>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={workEnvSchema}
        onSubmit={(values, { setSubmitting }): void => {
          // If custom summary textbox is length is zero, set cultureSummary to generated text
          const cultureSummary =
            values.cultureSummary.length === 0
              ? buildCultureSummary(values)
              : values.cultureSummary;
          const formValues: JobWorkEnvValues = { ...values, cultureSummary };
          const oldJob = job || emptyJob();
          const updatedJob = updateJobWithValues(oldJob, locale, formValues);

          nprogress.start();
          handleSubmit(updatedJob)
            .then((): void => {
              nprogress.done();
              setIsModalVisible(true);
            })
            .finally((): void => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, touched, isSubmitting, values }): React.ReactElement => (
          <>
            <Form id="form" data-c-margin="bottom(normal)">
              <FastField
                id="teamSize"
                type="number"
                name="teamSize"
                component={NumberInput}
                required
                min={1}
                grid="tl(1of2)"
                label={intl.formatMessage(formMessages.teamSizeLabel)}
                placeholder={intl.formatMessage(
                  formMessages.teamSizePlaceholder,
                )}
              />
              <div data-c-grid-item="base(1of1)">
                <CheckboxGroupField
                  groupLabel={intl.formatMessage(formMessages.physicalEnvLabel)}
                  name="physicalEnv"
                  allBoxes={phyEnvData}
                  grid="base(1of2)"
                />
              </div>
              <div data-c-grid-item="base(1of1)">
                <CheckboxGroupField
                  groupLabel={intl.formatMessage(formMessages.technologyLabel)}
                  name="technology"
                  allBoxes={techData}
                  grid="base(1of2)"
                />
              </div>
              <div data-c-grid-item="base(1of1)">
                <CheckboxGroupField
                  groupLabel={intl.formatMessage(formMessages.amenitiesLabel)}
                  name="amenities"
                  allBoxes={amenitiesData}
                  grid="base(1of2)"
                />
              </div>
              <p
                data-c-margin="bottom(normal) top(normal)"
                data-c-font-weight="bold"
              >
                {intl.formatMessage(formMessages.moreOnWorkEnv)}
              </p>
              <p data-c-margin="bottom(normal)">
                {intl.formatMessage(formMessages.thisIsOptional)}
              </p>
              <p data-c-margin="bottom(normal)">
                {intl.formatMessage(formMessages.moreOnWorkEnvSubtext)}
              </p>
              <FastField
                type="textarea"
                id="environment_description"
                name="envDescription"
                label={intl.formatMessage(formMessages.moreOnWorkEnvLabel)}
                placeholder={intl.formatMessage(
                  formMessages.moreOnWorkEnvPlaceholder,
                )}
                component={TextAreaInput}
                grid="base(1of2)"
              />
              <div data-c-grid-item="base(1of1)">
                <h4
                  data-c-font-size="h4"
                  data-c-margin="top(double) bottom(normal)"
                >
                  {intl.formatMessage(formMessages.culture)}
                </h4>
                <p data-c-margin="bottom(normal)">
                  <FormattedMessage
                    id="jobBuilder.workEnv.cultureSubtext1"
                    defaultMessage="Now let applicants know more about the personality of your team and the type of work that you usually do."
                    description="Subtext 1 displayed of the our culture section."
                  />
                </p>
                <p data-c-margin="bottom(normal)">
                  {intl.formatMessage(formMessages.cultureSubtext2)}
                </p>
              </div>
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "culturePace",
                intl.formatMessage(formMessages.fastPacedSteadyLabel),
                culturePaceList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "management",
                intl.formatMessage(formMessages.managementLabel),
                managementList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "experimental",
                intl.formatMessage(formMessages.experimentalLabel),
                experimentalList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "facing",
                intl.formatMessage(formMessages.facingLabel),
                facingList,
              )}
              {renderRadioWithContext(
                intl,
                touched,
                errors,
                values,
                "collaborativeness",
                intl.formatMessage(formMessages.collaborativeLabel),
                collaborativenessList,
              )}
              <div data-c-grid-item="base(1of1)">
                <p
                  data-c-margin="bottom(normal) top(normal)"
                  data-c-font-weight="bold"
                >
                  {intl.formatMessage(formMessages.cultureSummary)}
                </p>
                <p data-c-margin="bottom(normal)">
                  {intl.formatMessage(formMessages.cultureSummarySubtext)}
                </p>
                <ContextBlockItem subtext={buildCultureSummary(values)} />
                <div
                  data-c-alignment="base(centre) tl(right)"
                  data-c-margin="top(normal)"
                >
                  <CopyToClipboardButton
                    actionText={
                      <FormattedMessage
                        id="button.copyToClipboard"
                        defaultMessage="Copy to Clipboard"
                        description="Button to copy text to clipboard."
                      />
                    }
                    postActionText={
                      <FormattedMessage
                        id="button.copied"
                        defaultMessage="Copied!"
                        description="Confirmation for Button to copy text to clipboard."
                      />
                    }
                    textToCopy={buildCultureSummary(values)}
                  />
                </div>
              </div>
              <FastField
                type="textarea"
                id="custom_culture_summary"
                name="cultureSummary"
                label={intl.formatMessage(
                  formMessages.customCultureSummaryLabel,
                )}
                placeholder={intl.formatMessage(
                  formMessages.customCultureSummaryPlaceholder,
                )}
                component={TextAreaInput}
                grid="base(1of1)"
              />
              <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
                {intl.formatMessage(formMessages.specialWorkCulture)}
              </p>
              <p data-c-margin="bottom(normal)">
                {intl.formatMessage(formMessages.thisIsOptional)}
              </p>
              <p data-c-margin="bottom(normal)">
                {intl.formatMessage(formMessages.specialWorkCultureSubtext)}
              </p>
              <FastField
                type="textarea"
                id="more_culture_summary"
                name="moreCultureSummary"
                label={intl.formatMessage(formMessages.specialWorkCultureLabel)}
                placeholder={intl.formatMessage(
                  formMessages.textAreaPlaceholder1,
                )}
                component={TextAreaInput}
                grid="base(1of1)"
              />
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
                      updateValuesAndReturn(values);
                    }}
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.saveAndReturnButtonLabel"
                      defaultMessage="Save & Return to Job Details"
                      description="Label for Save & Return button on Work Environment form."
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
                      id="jobBuilder.workEnv.submitButtonLabel"
                      defaultMessage="Save & Preview"
                      description="Label for work environment submit button."
                    />
                  </button>
                </div>
              </div>
            </Form>
            <JobWorkEnvModal
              modalConfirm={(): void => {
                setIsModalVisible(false);
                handleModalConfirm();
              }}
              modalCancel={(): void => {
                setIsModalVisible(false);
                handleModalCancel();
              }}
              isVisible={isModalVisible}
              parentElement={modalParentRef.current}
              values={values}
              cultureSummary={
                values.cultureSummary || buildCultureSummary(values)
              }
              jobIsComplete={jobIsComplete}
              handleSkipToReview={(): void => {
                handleSkipToReview().finally((): void => {
                  setIsModalVisible(false);
                });
              }}
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default JobWorkEnv;

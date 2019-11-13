/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useRef } from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import nprogress from "nprogress";
import { Job, Department } from "../../../models/types";
import { emptyJob } from "../../../models/jobUtil";
import JobImpactPreview from "./JobImpactPreview";
import Modal from "../../Modal";
import { validationMessages } from "../../Form/Messages";
import TextAreaInput from "../../Form/TextAreaInput";
import { find } from "../../../helpers/queries";

interface JobBuilderImpactProps {
  /** Optional Job to prepopulate form values from. */
  job: Job | null;
  /** The list of known departments. Used to determine the Department statement. */
  departments: Department[];
  /** Function to run after successful form validation.
   *  It must return true if the submission was succesful, false otherwise.
   */
  handleSubmit: (values: Job) => Promise<boolean>;
  // The function to run when user clicks Prev Page
  handleReturn: () => void;
  /** Function to run when modal cancel is clicked. */
  handleModalCancel: () => void;
  /** Function to run when modal confirm is clicked. */
  handleModalConfirm: () => void;

  jobIsComplete: boolean;
  handleSkipToReview: () => Promise<void>;
}

interface ImpactFormValues {
  teamImpact: string;
  hireImpact: string;
}

const messages = defineMessages({
  hireLabel: {
    id: "jobBuilder.impact.hireLabel",
    defaultMessage: "Hire Impact Statement",
    description: "Label for hire impact statement text area",
  },
  teamLabel: {
    id: "jobBuilder.impact.teamLabel",
    defaultMessage: "Team Impact Statement",
    description: "Label for team impact statement text area",
  },
  hirePlaceholder: {
    id: "jobBuilder.impact.hirePlaceholder",
    defaultMessage: "Remember, don't use Government speak...",
    description: "",
  },
  teamPlaceholder: {
    id: "jobBuilder.impact.teamPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone...",
    description: "",
  },
});

const updateJobWithValues = (
  initialJob: Job,
  locale: "en" | "fr",
  { teamImpact, hireImpact }: ImpactFormValues,
  deptImpacts: { en: string; fr: string },
): Job => ({
  ...initialJob,
  en: {
    ...initialJob.en,
    dept_impact: deptImpacts.en,
  },
  fr: {
    ...initialJob.fr,
    dept_impact: deptImpacts.fr,
  },
  [locale]: {
    ...initialJob[locale],
    dept_impact: deptImpacts[locale],
    team_impact: teamImpact,
    hire_impact: hireImpact,
  },
});

const determineDeptImpact = (
  departments: Department[],
  job: Job | null,
): { en: string; fr: string } => {
  if (job === null || job.department_id === null) {
    return { en: "", fr: "" };
  }
  const dept = find(departments, job.department_id);
  if (dept === null) {
    return { en: "", fr: "" };
  }
  return {
    en: dept.en.impact,
    fr: dept.fr.impact,
  };
};

const deptImpactStatement = (
  departments: Department[],
  job: Job | null,
  deptImpacts: { en: string; fr: string },
  locale: "en" | "fr",
): React.ReactElement => {
  if (job === null || job.department_id === null) {
    return (
      <p data-c-margin="bottom(double)">
        <FormattedMessage
          id="jobBuilder.impact.selectDepartment"
          defaultMessage="You must select a Department for this Job."
          description="Message warning user that they must have a department selected to complete impact statements."
        />
      </p>
    );
  }
  if (departments.length === 0) {
    return (
      <p data-c-margin="bottom(double)">
        <i
          aria-hidden="true"
          className="fa fa-spinner fa-spin"
          data-c-margin="right"
        />
        <FormattedMessage
          id="jobBuilder.impact.departmentsLoading"
          defaultMessage="Loading department data..."
          description="Placeholder message while department data is being retrieved from the server."
        />
      </p>
    );
  }
  if (departments.length !== 0 && deptImpacts[locale] === "") {
    return (
      <p data-c-margin="bottom(double)">
        <FormattedMessage
          id="jobBuilder.impact.unknownDepartment"
          defaultMessage="Error: Unknown Department selected."
          description="Error message shown when the job has a department selected for which data has not been passed to this component."
        />
      </p>
    );
  }
  return <p data-c-margin="bottom(double)">{deptImpacts[locale]}</p>;
};

const JobBuilderImpact: React.FunctionComponent<
  JobBuilderImpactProps & WrappedComponentProps
> = ({
  intl,
  departments,
  job,
  handleSubmit,
  handleReturn,
  handleModalCancel,
  handleModalConfirm,
  jobIsComplete,
  handleSkipToReview,
}): React.ReactElement => {
  const modalId = "impact-dialog";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalParentRef = useRef<HTMLDivElement>(null);
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }
  const initialValues: ImpactFormValues = {
    teamImpact:
      job && job[intl.locale].team_impact ? job[intl.locale].team_impact : "",
    hireImpact:
      job && job[intl.locale].hire_impact ? job[intl.locale].hire_impact : "",
  };
  const validationSchema = Yup.object().shape({
    teamImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    hireImpact: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });
  const deptImpacts: { en: string; fr: string } = determineDeptImpact(
    departments,
    job,
  );

  const updateValuesAndReturn = (values: ImpactFormValues): void => {
    // The following only triggers after validations pass
    nprogress.start();
    handleSubmit(
      updateJobWithValues(job || emptyJob(), locale, values, deptImpacts),
    ).then((isSuccessful: boolean): void => {
      if (isSuccessful) {
        nprogress.done();
        handleReturn();
      }
    });
  };

  return (
    <section ref={modalParentRef}>
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          <FormattedMessage
            id="jobBuilder.impact.title"
            defaultMessage="Create an Impact Statement"
            description="Header of Job Poster Builder Impact Step"
          />
        </h3>
        <ul data-c-margin="bottom(double)">
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.opportunity"
              defaultMessage="Working in the federal government offers an important opportunity to have a broad impact for Canadians."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.highlight"
              defaultMessage="This is your chance to highlight what makes your work valuable and interesting."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.counts"
              defaultMessage="Your impact statement is the first thing that applicants will see when they click your job poster so make sure it counts!"
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
        </ul>
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.header.department"
            defaultMessage="How our department makes an impact:"
            description="Header of Department Impact Section on Job Poster Builder Impact Step"
          />
        </p>
        {deptImpactStatement(departments, job, deptImpacts, locale)}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions): void => {
            nprogress.start();
            // The following only triggers after validations pass
            handleSubmit(
              updateJobWithValues(
                job || emptyJob(),
                locale,
                values,
                deptImpacts,
              ),
            )
              .then((isSuccessful: boolean): void => {
                if (isSuccessful) {
                  nprogress.done();
                  setIsModalVisible(true);
                }
              })
              .finally((): void => {
                actions.setSubmitting(false); // Required by Formik to finish the submission cycle
              });
          }}
          render={({ values, isSubmitting }): React.ReactElement => (
            <>
              <Form id="form" data-c-grid="gutter">
                <div data-c-grid-item="base(1of1)" data-c-input="textarea">
                  <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                    <FormattedMessage
                      id="jobBuilder.impact.teamHeader"
                      defaultMessage="How our team makes an impact:"
                      description="Header of Job Poster Builder Team Impact Section"
                    />
                  </p>
                  <p data-c-margin="bottom(normal)">
                    <FormattedMessage
                      id="jobBuilder.impact.teamBody"
                      defaultMessage="Describe the value your team/service/initiative brings to Canadians.
              It doesn’t matter if your work is direct to citizens or back office,
              innovative or maintenance, top priority or ongoing. Describe how it
              contributes to making Canada better the way you would to someone who
              knows nothing about your work."
                      description="Body of Job Poster Builder Team Impact Section"
                    />
                  </p>
                  <div>
                    <Field
                      name="teamImpact"
                      id="TeamImpact"
                      placeholder={intl.formatMessage(messages.teamPlaceholder)}
                      label={intl.formatMessage(messages.teamLabel)}
                      required
                      component={TextAreaInput}
                    />
                  </div>
                </div>
                <div data-c-grid-item="base(1of1)" data-c-input="textarea">
                  <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                    <FormattedMessage
                      id="jobBuilder.impact.hireHeader"
                      defaultMessage="How the new hire makes an impact:"
                      description="Header of Job Poster Builder Hire Impact Section"
                    />
                  </p>
                  <p data-c-margin="bottom(normal)">
                    <FormattedMessage
                      id="jobBuilder.impact.hireBody"
                      defaultMessage="Describe how the new hire will contribute in this role. Focus on the
              value they’ll bring, not on specific tasks (you’ll provide these
              later on). For example “In this role, you’ll contribute to…” or, “As
              a member of this team, you’ll be responsible for helping us…”"
                      description="Body of Job Poster Builder Hire Impact Section"
                    />
                  </p>
                  <div>
                    <Field
                      id="HireImpact"
                      name="hireImpact"
                      label={intl.formatMessage(messages.hireLabel)}
                      placeholder={intl.formatMessage(messages.hirePlaceholder)}
                      required
                      component={TextAreaInput}
                    />
                  </div>
                </div>
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
                        id="jobBuilder.impact.button.return"
                        defaultMessage="Save & Return to Work Environment"
                        description="Label for Save & Return button on Impact form."
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
                        id="jobBuilder.impact.button.next"
                        defaultMessage="Save & Preview"
                        description="Label for Save & Preview button on Impact form."
                      />
                    </button>
                  </div>
                </div>
              </Form>
              <Modal
                id={modalId}
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
                  handleSkipToReview().finally((): void =>
                    setIsModalVisible(false),
                  );
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
                      id={`${modalId}-title`}
                    >
                      <FormattedMessage
                        id="jobBuilder.impact.modalTitle"
                        defaultMessage="Awesome work!"
                        description="Title of modal dialog for Impact review."
                      />
                    </h5>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                    id={`${modalId}-description`}
                  >
                    <p>
                      <FormattedMessage
                        id="jobBuilder.impact.modalDescription"
                        defaultMessage="Here's a preview of the Impact Statement you just
                        entered. Feel free to go back and edit things or move to
                        the next step if you're happy with it."
                        description="Description of modal dialog for Impact review."
                      />
                    </p>
                  </div>
                  <div
                    data-c-background="grey(20)"
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                  >
                    <JobImpactPreview
                      deptImpact={deptImpacts[locale]}
                      teamImpact={values.teamImpact}
                      hireImpact={values.hireImpact}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Modal.FooterCancelBtn>
                    <FormattedMessage
                      id="jobBuilder.impact.button.goBack"
                      defaultMessage="Go Back"
                      description="Label for Go Back button on Impact review modal."
                    />
                  </Modal.FooterCancelBtn>
                  {jobIsComplete && (
                    <Modal.FooterMiddleBtn>
                      <FormattedMessage
                        id="jobBuilder.impact.button.skipToReview"
                        defaultMessage="Skip to Review"
                        description="Label for Skip to Review button on Impact review modal."
                      />
                    </Modal.FooterMiddleBtn>
                  )}
                  <Modal.FooterConfirmBtn>
                    <FormattedMessage
                      id="jobBuilder.impact.button.nextStep"
                      defaultMessage="Next Step"
                      description="Label for Next Step button on Impact review modal."
                    />
                  </Modal.FooterConfirmBtn>
                </Modal.Footer>
              </Modal>
            </>
          )}
        />
      </div>
      <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
    </section>
  );
};

export default injectIntl(JobBuilderImpact);

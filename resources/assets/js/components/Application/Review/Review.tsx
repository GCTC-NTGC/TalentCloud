import React from "react";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form, FastField } from "formik";
import {
  User,
  Job,
  Criteria,
  Experience,
  Skill,
  ExperienceSkill,
  JobPosterQuestion,
  JobApplicationAnswer,
  ApplicationNormalized,
} from "../../../models/types";
import { navigationMessages } from "../applicationMessages";
import CheckboxInput from "../../Form/CheckboxInput";
import { getLocale } from "../../../helpers/localize";
import ApplicationPreview, { ExperienceView } from "./ApplicationPreview";

const messages = defineMessages({
  shareCheckboxLabel: {
    id: "application.review.shareCheckboxLabel",
    defaultMessage:
      "I would like Talent Cloud to share my application with other Government of Canada managers looking for similar sets of skills.",
  },
});

export interface ReviewFormValues {
  shareWithManagers: boolean;
}

interface ReviewFormProps {
  handleSave: (values: ReviewFormValues) => Promise<void>;
  handleContinue: () => void;
  handleReturn: () => void;
  handleQuit: () => void;
}

// TODO: Replace all of the Edit href's with proper step links.
const ReviewForm: React.FC<ReviewFormProps> = ({
  handleSave,
  handleContinue,
  handleReturn,
  handleQuit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  return (
    <>
      <hr data-c-hr="thin(c1)" data-c-margin="tb(2)" />
      <div>
        <Formik
          initialValues={{ shareWithManagers: false }}
          onSubmit={(values, { setSubmitting }): void => {
            // Save data to application object, then navigate to the next step.
            // TODO: This step needs to check overall Application validation status,
            // and only proceed if the entire Application is 'valid'.
            handleSave(values)
              .then(() => handleContinue())
              .catch(() => {
                // Do nothing if save fails
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ values, isSubmitting }): React.ReactElement => (
            <Form>
              <div data-c-grid-item="base(1of1)">
                <p>
                  <FormattedMessage
                    id="application.review.shareQuestion"
                    defaultMessage="Do you give Talent Cloud permission to share your application with other Government of Canada managers who may be looking for a similar set of skills?"
                  />
                </p>
              </div>
              <div data-c-grid-item="base(1of1)" data-c-margin="left(2)">
                <FastField
                  id="shareWithManagers"
                  name="shareWithManagers"
                  component={CheckboxInput}
                  label={intl.formatMessage(messages.shareCheckboxLabel)}
                />
              </div>
              <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
              <div data-c-grid="gutter">
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
                      handleSave(values)
                        .then(() => handleReturn())
                        .catch(() => {
                          // Do nothing if save fails
                        });
                    }}
                  >
                    {intl.formatMessage(navigationMessages.return)}
                  </button>
                </div>
                <div
                  data-c-alignment="base(centre) tp(right)"
                  data-c-grid-item="tp(1of2)"
                >
                  <button
                    data-c-button="outline(c2)"
                    data-c-radius="rounded"
                    type="button"
                    disabled={isSubmitting}
                    onClick={(): void => {
                      handleSave(values)
                        .then(() => handleQuit())
                        .catch(() => {
                          // Do nothing if save fails
                        });
                    }}
                  >
                    {intl.formatMessage(navigationMessages.quit)}
                  </button>
                  <button
                    data-c-button="solid(c1)"
                    data-c-radius="rounded"
                    data-c-margin="left(1)"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {intl.formatMessage(navigationMessages.continue)}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

interface ReviewProps {
  application: ApplicationNormalized;
  criteria: Criteria[];
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
  experienceViewState?: ExperienceView;
  experienceViewButtonOrder?: [ExperienceView, ExperienceView, ExperienceView];
  job: Job;
  jobQuestions: JobPosterQuestion[];
  jobApplicationAnswers: JobApplicationAnswer[];
  skills: Skill[];
  user: User;
  managerView?: boolean;
  handleSave: (values: ReviewFormValues) => Promise<void>;
  handleContinue: () => void;
  handleReturn: () => void;
  handleQuit: () => void;
}

const Review: React.FunctionComponent<ReviewProps> = ({
  application,
  criteria,
  experiences,
  experienceSkills,
  experienceViewState,
  experienceViewButtonOrder,
  job,
  jobQuestions,
  jobApplicationAnswers,
  managerView,
  skills,
  user,
  handleSave,
  handleContinue,
  handleReturn,
  handleQuit,
}) => {
  return (
    <>
      <ApplicationPreview
        application={application}
        criteria={criteria}
        experiences={experiences}
        experienceSkills={experienceSkills}
        experienceViewState={experienceViewState}
        experienceViewButtonOrder={experienceViewButtonOrder}
        job={job}
        jobApplicationAnswers={jobApplicationAnswers}
        jobQuestions={jobQuestions}
        skills={skills}
        user={user}
        managerView={managerView}
      >
        <ReviewForm
          handleSave={handleSave}
          handleContinue={handleContinue}
          handleQuit={handleQuit}
          handleReturn={handleReturn}
        />
      </ApplicationPreview>
    </>
  );
};

export default Review;

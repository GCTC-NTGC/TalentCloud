/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import Review, { ReviewFormValues } from "./Review";
import {
  applicationIndex,
  applicationFit,
  applicationSubmission,
} from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import { DispatchType } from "../../../configureStore";
import {
  useApplication,
  useApplicationUser,
  useCriteria,
  useExperiences,
  useExperienceSkills,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationAnswers,
  useJobPosterQuestions,
  useSkills,
} from "../../../hooks/applicationHooks";
import { loadingMessages } from "../applicationMessages";
import { updateApplication as updateApplicationAction } from "../../../store/Application/applicationActions";

interface ReviewPageProps {
  applicationId: number;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ applicationId }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  // Fetch all un-loaded data that may be required for the Application.
  const {
    experiencesLoaded,
    skillsLoaded,
    criteriaLoaded,
    experienceSkillsLoaded,
    jobQuestionsLoaded,
    applicationAnswersLoaded,
  } = useFetchAllApplicationData(applicationId, dispatch);

  const application = useApplication(applicationId);
  const user = useApplicationUser(applicationId);
  const jobId = application?.job_poster_id;
  const job = useJob(jobId);
  const criteria = useCriteria(jobId);
  const experiences = useExperiences(applicationId, application);
  const experienceSkills = useExperienceSkills(applicationId, application);
  const questions = useJobPosterQuestions(jobId);
  const answers = useJobApplicationAnswers(applicationId);
  const skills = useSkills();

  const handleSave = (values: ReviewFormValues): Promise<void> => {
    if (application === null) {
      // We shouldn't expect this to handler to trigger before application is loaded, but just to be sure.
      return Promise.reject();
    }
    return dispatch(
      updateApplicationAction({
        ...application,
        share_with_managers: values.shareWithManagers,
      }),
    )
      .then(() => {
        navigate(applicationSubmission(locale, applicationId));
      })
      .catch(() => {
        // Do nothing on an error.
      });
  };
  const handleReturn = (): void => {
    navigate(applicationFit(locale, applicationId));
  };
  const handleQuit = (): void => {
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };
  const handleContinue = (): void => {
    navigate(applicationSubmission(locale, applicationId));
  };

  const closeDate = job?.close_date_time ?? null;

  const allDataLoaded =
    application !== null &&
    job !== null &&
    user !== null &&
    criteriaLoaded &&
    experiencesLoaded &&
    experienceSkillsLoaded &&
    jobQuestionsLoaded &&
    applicationAnswersLoaded &&
    skillsLoaded;

  return (
    <>
      {application !== null && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step05)}
          steps={makeProgressBarSteps(
            applicationId,
            application,
            intl,
            "review",
          )}
        />
      )}
      {allDataLoaded &&
      application !== null &&
      job !== null &&
      user !== null ? (
        <Review
          application={application}
          criteria={criteria}
          experiences={experiences}
          experienceSkills={experienceSkills}
          job={job}
          jobQuestions={questions}
          jobApplicationAnswers={answers}
          skills={skills}
          user={user}
          handleSave={handleSave}
          handleContinue={handleContinue}
          handleQuit={handleQuit}
          handleReturn={handleReturn}
        />
      ) : (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(3)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
    </>
  );
};

export default ReviewPage;

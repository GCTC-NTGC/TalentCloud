/* eslint-disable camelcase */
import * as React from "react";
import ReactDOM from "react-dom";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../configureStore";
import {
  useApplicationUser,
  useCriteria,
  useExperiences,
  useExperienceSkills,
  useFetchReviewApplicationData,
  useJob,
  useJobApplicationAnswers,
  useJobPosterQuestions,
  useReviewedApplication,
  useSkills,
} from "../../hooks/applicationHooks";
import { Portal } from "../../models/app";
import { ApplicationReview } from "../../models/types";
import { loadingMessages } from "../Application/applicationMessages";
import ApplicationPreview from "../Application/Review/ApplicationPreview";
import RootContainer from "../RootContainer";
import ApplicationReviewWithNav from "./ApplicationReviewWithNav";
import { updateApplicationReview } from "../../store/Application/applicationActions";

interface ApplicationTimelineReviewRootProps {
  applicationId: number;
  applicantUserId: number;
  jobId: number;
  portal: Portal;
}

const ApplicationTimelineReviewRoot: React.FunctionComponent<ApplicationTimelineReviewRootProps> = ({
  applicationId,
  applicantUserId,
  jobId,
  portal,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch<DispatchType>();

  const {
    experiencesLoaded,
    experienceConstantsLoaded,
    skillsLoaded,
  } = useFetchReviewApplicationData(
    applicantUserId,
    applicationId,
    jobId,
    dispatch,
  );

  const application = useReviewedApplication(applicationId);
  const applicantUser = useApplicationUser(applicationId);
  const job = useJob(jobId);
  const criteria = useCriteria(jobId);
  const experiences = useExperiences(applicationId, application);
  const experienceSkills = useExperienceSkills(applicationId, application);
  const skills = useSkills();
  const jobQuestions = useJobPosterQuestions(jobId);
  const jobApplicationAnswers = useJobApplicationAnswers(applicationId);
  const handleUpdateApplicationReview = async (
    editedApplicationReview: ApplicationReview,
  ): Promise<void> => {
    await dispatch(updateApplicationReview(editedApplicationReview));
  };
  const showLoadingState =
    application === null ||
    job === null ||
    !experiencesLoaded ||
    !experienceConstantsLoaded ||
    !skillsLoaded;

  return (
    <div data-clone>
      {showLoadingState && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {!showLoadingState &&
        application !== null &&
        job !== null &&
        applicantUser !== null && (
          <div className="applicant-review container--layout-xl">
            <ApplicationReviewWithNav
              application={application}
              handleUpdateApplicationReview={handleUpdateApplicationReview}
              portal={portal}
            />
            <ApplicationPreview
              application={application}
              criteria={criteria}
              experiences={experiences}
              experienceSkills={experienceSkills}
              experienceViewState="education"
              experienceViewButtonOrder={["education", "skills", "experience"]}
              job={job}
              jobApplicationAnswers={jobApplicationAnswers}
              jobQuestions={jobQuestions}
              skills={skills}
              user={applicantUser}
              isSubmitted
            />
          </div>
        )}
    </div>
  );
};

export default ApplicationTimelineReviewRoot;

const container = document.getElementById(
  "application-timeline-review-container",
);
if (container !== null) {
  if (
    "applicationId" in container.dataset &&
    "applicantUserId" in container.dataset &&
    "portal" in container.dataset &&
    "jobId" in container.dataset
  ) {
    const applicationId = Number(container.dataset.applicationId as string);
    const applicantUserId = Number(container.dataset.applicantUserId as string);
    const jobId = Number(container.dataset.jobId as string);
    const portal = container.dataset.portal as Portal;

    ReactDOM.render(
      <RootContainer>
        <ApplicationTimelineReviewRoot
          applicationId={applicationId}
          applicantUserId={applicantUserId}
          jobId={jobId}
          portal={portal}
        />
      </RootContainer>,
      container,
    );
  }
}

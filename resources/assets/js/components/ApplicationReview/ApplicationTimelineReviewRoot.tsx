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
import { ReviewStatus } from "../../models/types";
import { loadingMessages } from "../Application/applicationMessages";
import ApplicationPreview from "../Application/Review/ApplicationPreview";
import RootContainer from "../RootContainer";
import ApplicationReviewNav from "./ApplicationReviewRoot";

interface ApplicationTimelineReviewRootProps {
  applicationId: number;
  applicantUserId: number;
  jobId: number;
  reviewStatuses: ReviewStatus[];
  portal: Portal;
}

const ApplicationTimelineReviewRoot: React.FunctionComponent<ApplicationTimelineReviewRootProps> = ({
  applicationId,
  applicantUserId,
  jobId,
  portal,
  reviewStatuses,
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
          <>
            <ApplicationReviewNav
              initApplication={application}
              portal={portal}
              reviewStatuses={reviewStatuses}
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
          </>
        )}
    </div>
  );
};

const renderApplicationReviewRoot = (
  container: HTMLElement,
  portal: Portal,
): void => {
  if (
    container.hasAttribute("data-applicant-user-id") &&
    container.hasAttribute("data-application-id") &&
    container.hasAttribute("data-job-id") &&
    container.hasAttribute("data-review-statuses")
  ) {
    const applicantUserId = JSON.parse(
      container.getAttribute("data-applicant-user-id") as string,
    );
    const applicationId = JSON.parse(
      container.getAttribute("data-application-id") as string,
    );
    const jobId = JSON.parse(container.getAttribute("data-job-id") as string);
    const reviewStatuses = JSON.parse(
      container.getAttribute("data-review-statuses") as string,
    );
    ReactDOM.render(
      <RootContainer>
        <ApplicationTimelineReviewRoot
          applicationId={applicationId}
          applicantUserId={applicantUserId}
          jobId={jobId}
          portal={portal}
          reviewStatuses={reviewStatuses}
        />
      </RootContainer>,
      container,
    );
  }
};

const managerContainer = document.getElementById(
  "application-timeline-review-container",
);
if (managerContainer !== null) {
  renderApplicationReviewRoot(managerContainer, "manager");
}

const hrContainer = document.getElementById(
  "application-timeline-review-container-hr",
);
if (hrContainer !== null) {
  renderApplicationReviewRoot(hrContainer, "hr");
}

export default ApplicationTimelineReviewRoot;

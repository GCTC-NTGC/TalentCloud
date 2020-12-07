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
import { loadingMessages } from "./applicationMessages";
import ApplicationPreview from "./Review/ApplicationPreview";
import RootContainer from "../RootContainer";

interface ApplicationPreviewRootProps {
  applicationId: number;
  applicantUserId: number;
  jobId: number;
}

const ApplicationPreviewRoot: React.FunctionComponent<ApplicationPreviewRootProps> = ({
  applicationId,
  applicantUserId,
  jobId,
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

if (document.getElementById("application-timeline-preview-container")) {
  const container = document.getElementById(
    "application-timeline-preview-container",
  );
  if (
    container != null &&
    container.hasAttribute("data-applicant-user-id") &&
    container.hasAttribute("data-application-id") &&
    container.hasAttribute("data-job-id")
  ) {
    const applicantUserId = JSON.parse(
      container.getAttribute("data-applicant-user-id") as string,
    );
    const applicationId = JSON.parse(
      container.getAttribute("data-application-id") as string,
    );
    const jobId = JSON.parse(container.getAttribute("data-job-id") as string);
    ReactDOM.render(
      <RootContainer>
        <ApplicationPreviewRoot
          applicationId={applicationId}
          applicantUserId={applicantUserId}
          jobId={jobId}
        />
      </RootContainer>,
      container,
    );
  }
}

export default ApplicationPreviewRoot;

/* eslint-disable camelcase */
import * as React from "react";
import ReactDOM from "react-dom";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../configureStore";
import { getLocale } from "../../helpers/localize";
import { useFetchSkills } from "../../hooks/applicationHooks";
import { Portal } from "../../models/app";
import {
  Application,
  Criteria,
  Experience,
  ExperienceSkill,
  Job,
  JobApplicationAnswer,
  JobPosterQuestion,
  ReviewStatus,
  User,
} from "../../models/types";
import Review from "../Application/Review/Review";
import RootContainer from "../RootContainer";
import ApplicationReviewNav from "./ApplicationReviewRoot";

interface ApplicationTimelineReviewRootProps {
  applicantUserData: User;
  application: Application;
  criteria: Criteria[];
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
  job: Job;
  jobApplicationAnswers: JobApplicationAnswer[];
  jobQuestions: JobPosterQuestion[];
  reviewStatuses: ReviewStatus[];
  portal: Portal;
}

const ApplicationTimelineRootReview: React.FunctionComponent<ApplicationTimelineReviewRootProps> = ({
  applicantUserData,
  application,
  criteria,
  experiences,
  experienceSkills,
  job,
  jobApplicationAnswers,
  jobQuestions,
  portal,
  reviewStatuses,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();
  const skills = useFetchSkills(dispatch);
  const managerView = portal === "manager" || portal === "hr";

  return (
    <div data-clone>
      {application !== null && job !== null && applicantUserData !== null && (
        <>
          <ApplicationReviewNav
            initApplication={application}
            portal={portal}
            reviewStatuses={reviewStatuses}
          />
          <Review
            application={application}
            criteria={criteria}
            experiences={experiences}
            experienceSkills={experienceSkills}
            experienceViewState="education"
            experienceViewButtonOrder={["education", "skills", "experience"]}
            handleContinue={() => {}}
            handleQuit={() => {}}
            handleReturn={() => {}}
            job={job}
            jobApplicationAnswers={jobApplicationAnswers}
            jobQuestions={jobQuestions}
            skills={skills}
            user={applicantUserData}
            managerView={managerView}
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
    container.hasAttribute("data-application") &&
    container.hasAttribute("data-job") &&
    container.hasAttribute("data-review-statuses")
  ) {
    const applicantUserData = JSON.parse(
      container.getAttribute("data-applicant-user") as string,
    );
    const application = JSON.parse(
      container.getAttribute("data-application") as string,
    );
    const criteria = JSON.parse(
      container.getAttribute("data-criteria") as string,
    );
    const experiences = JSON.parse(
      container.getAttribute("data-experiences") as string,
    );
    const experienceSkills = JSON.parse(
      container.getAttribute("data-experience-skills") as string,
    );
    const job = JSON.parse(container.getAttribute("data-job") as string);
    const jobApplicationAnswers = JSON.parse(
      container.getAttribute("data-job-application-answers") as string,
    );
    const jobQuestions = JSON.parse(
      container.getAttribute("data-job-questions") as string,
    );
    const reviewStatuses = JSON.parse(
      container.getAttribute("data-review-statuses") as string,
    );
    ReactDOM.render(
      <RootContainer>
        <ApplicationTimelineRootReview
          applicantUserData={applicantUserData}
          application={application}
          criteria={criteria}
          experiences={experiences}
          experienceSkills={experienceSkills}
          job={job}
          jobApplicationAnswers={jobApplicationAnswers}
          jobQuestions={jobQuestions}
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

export default ApplicationTimelineRootReview;

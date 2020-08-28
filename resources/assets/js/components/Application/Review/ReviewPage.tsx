import React from "react";
import { useIntl } from "react-intl";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import fakeJob, {
  fakeJobQuestions,
  fakeJobApplicationAnswers,
} from "../../../fakeData/fakeJob";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { fakeCriteria } from "../../../fakeData/fakeCriteria";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import fakeExperiences from "../../../fakeData/fakeExperience";
import Review from "./Review";
import { fakeUser } from "../../../fakeData/fakeUsers";
import { fakeSkills } from "../../../fakeData/fakeSkills";

interface ReviewPageProps {
  applicationId: number;
}

export const ReviewPage: React.FC<ReviewPageProps> = ({ applicationId }) => {
  const intl = useIntl();
  const application = fakeApplication(); // TODO: get real application.
  const user = fakeUser(); // TODO: Get user base on application.
  const job = fakeJob(); // TODO: Get real job associated with application.
  const criteria = fakeCriteria(); // TODO: Get criteria associated with job.
  const experiences = fakeExperiences(); // TODO: get experienciences associated with application.
  const experienceSkills = fakeExperienceSkills(); // TODO: Get experienceSkills associated with experiences.
  const questions = fakeJobQuestions(); // TODO: get questions from job.
  const answers = fakeJobApplicationAnswers(); // TODO: get answers currently saved to application.

  // TODO: load constants from backend.
  const skills = fakeSkills();

  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(application, intl, "review")}
      />
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
      />
    </>
  );
};

export default ReviewPage;

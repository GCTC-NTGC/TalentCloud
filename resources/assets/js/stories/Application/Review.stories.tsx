/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Review from "../../components/Application/Review/Review";
import { fakeApplication1 } from "../../fakeData/fakeApplications";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import {
  fakeJob,
  fakeJobApplicationAnswers,
  fakeJobQuestions,
} from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import { fakeUser, fakeUsers } from "../../fakeData/fakeUsers";
import ApplicationPreview from "../../components/Application/Review/ApplicationPreview";
import ApplicationReviewWithNav from "../../components/ApplicationReview/ApplicationReviewWithNav";

const stories = storiesOf("Application/Review", module).addDecorator(withIntl);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const promiseAction = (text: string) => async () => {
  sleep(1000);
  action(text)();
};

stories.add(
  "Review Page",
  (): React.ReactElement => (
    <Review
      application={fakeApplication1()}
      criteria={fakeCriteria()}
      experiences={fakeExperiences()}
      experienceSkills={fakeExperienceSkills()}
      job={fakeJob()}
      jobQuestions={fakeJobQuestions()}
      jobApplicationAnswers={[
        {
          id: 1,
          job_application_id: 1,
          job_poster_question_id: 1,
          answer: "This is an excellent answer to the first question.",
        },
        {
          id: 2,
          job_application_id: 2,
          job_poster_question_id: 2,
          answer: "This is an answer for the second question.",
        },
      ]}
      skills={fakeSkills()}
      user={fakeUsers()[1]}
      handleSave={promiseAction("Save")}
      handleContinue={action("Continue")}
      handleReturn={action("Return to Previous Step")}
      handleQuit={action("Quit")}
    />
  ),
);
stories.add(
  "Manager View",
  (): React.ReactElement => {
    const application = fakeApplication1();
    return (
      <>
        <ApplicationReviewWithNav
          application={application}
          portal="manager"
          handleUpdateApplicationReview={promiseAction(
            "Handle Update Application Review",
          )}
        />
        <ApplicationPreview
          application={application}
          criteria={fakeCriteria()}
          experiences={fakeExperiences()}
          experienceSkills={fakeExperienceSkills()}
          experienceViewState="education"
          experienceViewButtonOrder={["education", "skills", "experience"]}
          job={fakeJob()}
          jobApplicationAnswers={fakeJobApplicationAnswers()}
          jobQuestions={fakeJobQuestions()}
          skills={fakeSkills()}
          user={fakeUser()}
          isSubmitted
        />
      </>
    );
  },
);
stories.add(
  "HR View",
  (): React.ReactElement => {
    const application = fakeApplication1();
    return (
      <>
        <ApplicationReviewWithNav
          application={application}
          portal="hr"
          handleUpdateApplicationReview={promiseAction(
            "Handle Update Application Review",
          )}
        />
        <ApplicationPreview
          application={application}
          criteria={fakeCriteria()}
          experiences={fakeExperiences()}
          experienceSkills={fakeExperienceSkills()}
          experienceViewState="education"
          experienceViewButtonOrder={["education", "skills", "experience"]}
          job={fakeJob()}
          jobApplicationAnswers={fakeJobApplicationAnswers()}
          jobQuestions={fakeJobQuestions()}
          skills={fakeSkills()}
          user={fakeUser()}
          isSubmitted
        />
      </>
    );
  },
);

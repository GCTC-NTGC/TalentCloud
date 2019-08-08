import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import fakeJob, { fakeCriterion, fakeJobTasks } from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import JobReview from "../../components/JobReview/JobReview";
import fakeDepartments from "../../fakeData/fakeDepartments";

const stories = storiesOf("Job Poster Builder|Review", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<void> => {
  action("Submit")();
};

stories.add(
  "Complete Job",
  (): React.ReactElement => (
    <JobReview
      job={fakeJob()}
      tasks={fakeJobTasks()}
      criteria={[fakeCriterion()]}
      skills={fakeSkills()}
      departments={fakeDepartments()}
      handleSubmit={handleSubmit}
      handleContinue={action("Continue")}
      handleReturn={action("handleReturn")}
    />
  ),
);

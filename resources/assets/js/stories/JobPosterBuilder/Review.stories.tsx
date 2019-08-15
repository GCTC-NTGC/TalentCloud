import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import fakeJob, { fakeCriterion, fakeJobTasks } from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import JobReview from "../../components/JobReview/JobReview";
import fakeDepartments from "../../fakeData/fakeDepartments";
import { fakeManager } from "../../fakeData/fakeManager";

const stories = storiesOf("Job Poster Builder|Review", module).addDecorator(
  withIntl,
);

const handleSubmit = async (): Promise<void> => {
  action("Submit")();
};

const languageOptions = {
  English: 1,
  French: 2,
  "Bilingual Intermediate": 3,
  "Bilingual Advanced": 4,
  "English or French": 5,
};

stories.add(
  "Complete Job",
  (): React.ReactElement => (
    <JobReview
      job={{
        ...fakeJob(),
        language_requirement_id: select(
          "Language Requirement",
          languageOptions,
          1,
        ),
      }}
      manager={fakeManager()}
      tasks={fakeJobTasks()}
      criteria={[fakeCriterion()]}
      skills={fakeSkills()}
      departments={fakeDepartments()}
      validForSubmission
      handleSubmit={handleSubmit}
      handleContinue={action("Continue")}
      handleReturn={action("handleReturn")}
    />
  ),
);

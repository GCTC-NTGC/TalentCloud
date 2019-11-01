/* eslint-disable @typescript-eslint/camelcase, camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import fakeJob, { fakeCriterion, fakeJobTasks } from "../../fakeData/fakeJob";
import { RedirectToLastIncompleteStep } from "../../components/JobBuilder/RedirectToLastIncompleteStep";
import { VALID_COUNT } from "../../components/JobBuilder/jobBuilderHelpers";

const stories = storiesOf(
  "Job Poster Builder|Redirect To Last Incomplete Step",
  module,
).addDecorator(withIntl);

stories.add(
  "Loading",
  (): React.ReactElement => (
    <RedirectToLastIncompleteStep
      job={boolean("Job is complete", false) ? fakeJob() : null}
      jobIsLoading={boolean("Job is loading", true)}
      tasks={boolean("Tasks are complete", false) ? fakeJobTasks() : []}
      maxTasksCount={VALID_COUNT}
      tasksIsLoading={boolean("Tasks are loading", true)}
      criteria={
        boolean("Criteria are complete", false) ? [fakeCriterion()] : []
      }
      criteriaIsLoading={boolean("Criteria are loading", true)}
      redirect={action("Redirect")}
    />
  ),
);

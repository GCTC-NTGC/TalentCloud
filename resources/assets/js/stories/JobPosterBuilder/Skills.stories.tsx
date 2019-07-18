import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { number, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import JobBuilderSkills from "../../components/JobBuilderSkills/JobBuilderSkills";
import fakeJob, { fakeCriterion } from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import CriteriaForm from "../../components/JobBuilderSkills/CriteriaForm";
import { mapToObject } from "../../helpers/queries";

const stories = storiesOf("Job Poster Builder|Skills", module).addDecorator(
  withIntl,
);

const skillOptions = mapToObject(
  fakeSkills(),
  (skill): string => skill.en.name,
);

stories
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobBuilderSkills
        job={fakeJob()}
        skills={fakeSkills()}
        skillCount={number("Skill Count", 3)}
        essentialCount={number("Essential Skill Count", 5)}
      />
    ),
  )
  .add(
    "Criteria Form",
    (): React.ReactElement => (
      <CriteriaForm
        jobPosterId={1}
        skill={select("Skill", skillOptions, fakeSkills()[0])}
        handleSubmit={action("Submit Criteria")}
        handleCancel={action("Cancel")}
      />
    ),
  )
  .add(
    "Existing Criteria Form",
    (): React.ReactElement => (
      <CriteriaForm
        jobPosterId={1}
        criteria={fakeCriterion(1, 1)}
        skill={select("Skill", skillOptions, fakeSkills()[0])}
        handleSubmit={action("Submit Criteria")}
        handleCancel={action("Cancel")}
      />
    ),
  );

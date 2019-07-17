import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { number, select } from "@storybook/addon-knobs";
import { JobBuilderSkills } from "../../components/JobBuilderSkills/JobBuilderSkills";
import fakeJob from "../../fakeData/fakeJob";
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
      <CriteriaForm skill={select("Skill", skillOptions, fakeSkills()[0])} />
    ),
  );

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
import { SkillLevelId, CriteriaTypeId } from "../../models/lookupConstants";

const stories = storiesOf("Job Poster Builder|Skills", module).addDecorator(
  withIntl,
);

const skillOptions = mapToObject(
  fakeSkills(),
  (skill): string => skill.en.name,
);

const skillLevelOptions = {
  Basic: SkillLevelId.Basic,
  Intermediate: SkillLevelId.Intermediate,
  Advanced: SkillLevelId.Advanced,
  Expert: SkillLevelId.Expert,
};

const criteriaTypeOptions = {
  Essential: CriteriaTypeId.Essential,
  Asset: CriteriaTypeId.Asset,
};

const classificationOptions = {
  CS: "CS",
  EX: "EX",
  None: null,
};

stories
  .add(
    "Existing Job",
    (): React.ReactElement => (
      <JobBuilderSkills
        job={{
          ...fakeJob(),
          classification_code: select(
            "Classification",
            classificationOptions,
            "CS",
          ),
        }}
        skills={fakeSkills()}
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
        criteria={{
          ...fakeCriterion(1, 1),
          skill_level_id: select(
            "Skill Level",
            skillLevelOptions,
            SkillLevelId.Expert,
          ),
          criteria_type_id: select(
            "Criteria Type",
            criteriaTypeOptions,
            CriteriaTypeId.Essential,
          ),
        }}
        skill={select("Skill", skillOptions, fakeSkills()[0])}
        handleSubmit={action("Submit Criteria")}
        handleCancel={action("Cancel")}
      />
    ),
  );

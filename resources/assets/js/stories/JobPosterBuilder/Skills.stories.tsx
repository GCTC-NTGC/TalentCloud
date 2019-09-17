/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { SelectTypeOptionsProp } from "@storybook/addon-knobs/dist/components/types";
import JobBuilderSkills from "../../components/JobBuilderSkills/JobBuilderSkills";
import fakeJob, { fakeCriterion, fakeJobTasks } from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import CriteriaForm from "../../components/JobBuilderSkills/CriteriaForm";
import { mapToObject } from "../../helpers/queries";
import { SkillLevelId, CriteriaTypeId } from "../../models/lookupConstants";
import { Criteria } from "../../models/types";

const stories = storiesOf("Job Poster Builder|Skills", module).addDecorator(
  withIntl,
);

const skillOptions = mapToObject(
  fakeSkills(),
  (skill): string => skill.en.name,
) as SelectTypeOptionsProp;

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

function sleep(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handleSubmit = async (criteria: Criteria[]): Promise<Criteria[]> => {
  await sleep(1000);
  action("Criteria Submitted")(criteria);
  return criteria;
};
const handleSkipToReview = async (): Promise<void> => {
  action("Skip to Review")();
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
        keyTasks={fakeJobTasks()}
        initialCriteria={[]}
        skills={fakeSkills()}
        handleSubmit={handleSubmit}
        handleReturn={action("Handle Return")}
        handleContinue={action("Handle Continue")}
        jobIsComplete={boolean("Job is Complete", false)}
        handleSkipToReview={handleSkipToReview}
      />
    ),
  )
  .add(
    "Criteria Form",
    (): React.ReactElement => (
      <CriteriaForm
        jobPosterId={1}
        skill={select("Skill", skillOptions, fakeSkills()[0] as any)}
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
        skill={select("Skill", skillOptions, fakeSkills()[0] as any)}
        handleSubmit={action("Submit Criteria")}
        handleCancel={action("Cancel")}
      />
    ),
  );

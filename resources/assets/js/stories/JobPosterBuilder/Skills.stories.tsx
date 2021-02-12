import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { SelectTypeOptionsProp } from "@storybook/addon-knobs/dist/components/types";
import JobSkills from "../../components/JobBuilder/Skills/JobSkills";
import fakeJob, { fakeCriterion, fakeJobTasks } from "../../fakeData/fakeJob";
import { fakeSkills } from "../../fakeData/fakeSkills";
import CriteriaForm from "../../components/JobBuilder/Skills/CriteriaForm";
import { mapToObject } from "../../helpers/queries";
import { SkillLevelId, CriteriaTypeId } from "../../models/lookupConstants";
import { Criteria } from "../../models/types";
import { localizeFieldNonNull } from "../../helpers/localize";
import {
  fakeClassification1,
  fakeClassification2,
  fakeClassification3,
  fakeClassification4,
} from "../../fakeData/fakeClassifications";

const stories = storiesOf("Job Poster Builder/Skills", module).addDecorator(
  withIntl,
);

const skillOptions = mapToObject(fakeSkills(), (skill): string =>
  localizeFieldNonNull("en", skill, "name"),
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
  [fakeClassification1().key]: 1,
  [fakeClassification2().key]: 2,
  3: null,
};

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
      <JobSkills
        job={{
          ...fakeJob(),
          classification_id: select("Classification", classificationOptions, 1),
        }}
        classificationKey={fakeClassification1().key}
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

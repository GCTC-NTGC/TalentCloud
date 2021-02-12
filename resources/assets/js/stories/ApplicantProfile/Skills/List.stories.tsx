/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { random } from "lodash";
import List from "../../../components/ApplicantProfile/Skills/List";
import fakeExperiences from "../../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import { fakeSkillCategories } from "../../../fakeData/fakeSkillCategories";
import { fakeSkills } from "../../../fakeData/fakeSkills";
import { Skill } from "../../../models/types";
import { promiseAction } from "../../helpers";

const skillSkillCategories = fakeSkills().map((skill: Skill, index) => {
  return {
    id: index,
    skill_id: skill.id,
    skill_category_id: random(3, 10), // non-parent skill categories.
  };
});

const stories = storiesOf("Applicant Profile/Skills", module).addDecorator(
  withIntl,
);

stories.add(
  "List",
  (): React.ReactElement => (
    <section>
      <List
        experiences={fakeExperiences()}
        experienceSkills={fakeExperienceSkills()}
        skillCategories={fakeSkillCategories()}
        skillSkillCategories={skillSkillCategories}
        skills={fakeSkills()}
        applicantId={1}
        handleDeleteSkill={promiseAction("Delete skill")}
      />
    </section>
  ),
);

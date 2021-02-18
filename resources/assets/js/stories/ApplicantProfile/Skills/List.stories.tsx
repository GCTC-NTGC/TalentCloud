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
        skills={fakeSkills()}
        applicantId={1}
        handleDeleteSkill={promiseAction("Delete skill")}
      />
    </section>
  ),
);

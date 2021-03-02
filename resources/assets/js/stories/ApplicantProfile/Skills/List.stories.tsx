/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { useState } from "@storybook/addons";
import List from "../../../components/ApplicantProfile/Skills/List";
import fakeExperiences from "../../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import { fakeSkillCategories } from "../../../fakeData/fakeSkillCategories";
import { fakeSkills } from "../../../fakeData/fakeSkills";
import { promiseAction } from "../../helpers";

const stories = storiesOf("Applicant Profile/Skills", module).addDecorator(
  withIntl,
);

stories.add(
  "List",
  (): React.ReactElement => {
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const handleDeleteSkill = async (...args) => {
      setUpdateInProgress(true);
      await promiseAction("Delete skill")(...args);
      setUpdateInProgress(false);
    };
    return (
      <section>
        <List
          experiences={fakeExperiences()}
          experienceSkills={fakeExperienceSkills()}
          skillCategories={fakeSkillCategories()}
          skills={fakeSkills()}
          applicantId={1}
          handleDeleteSkill={handleDeleteSkill}
          updateInProgress={updateInProgress}
        />
      </section>
    );
  },
);

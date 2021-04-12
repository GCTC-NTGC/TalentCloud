import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState as useStorybookState } from "@storybook/addons";
import List from "../../../components/ApplicantProfile/Skills/List";
import fakeExperiences from "../../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import { fakeSkillCategories } from "../../../fakeData/fakeSkillCategories";
import { fakeSkills } from "../../../fakeData/fakeSkills";
import { sleep } from "../../helpers";
import { Skill } from "../../../models/types";

const stories = storiesOf("Applicant Profile/Skills", module).addDecorator(
  withIntl,
);

const handleDeleteSkill = (skills, setSkills, setUpdateInProgress) => async (
  id: number,
): Promise<void> => {
  setUpdateInProgress(true);
  await sleep(1000);
  setSkills(skills.filter((skill: Skill) => !(skill.id === id)));
  action("Skill Deleted")({ id });
  setUpdateInProgress(false);
};

stories.add(
  "List",
  (): React.ReactElement => {
    const [skills, setSkills] = useStorybookState(fakeSkills());
    const [updateInProgress, setUpdateInProgress] = useStorybookState(false);

    return (
      <section>
        <List
          experiences={fakeExperiences()}
          experienceSkills={fakeExperienceSkills()}
          skillCategories={fakeSkillCategories()}
          skills={skills}
          applicantId={1}
          handleDeleteSkill={handleDeleteSkill(
            skills,
            setSkills,
            setUpdateInProgress,
          )}
          updateInProgress={updateInProgress}
        />
      </section>
    );
  },
);

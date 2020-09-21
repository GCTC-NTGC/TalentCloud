import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Skills from "../../components/Application/Skills/Skills";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import { ExperienceSkill } from "../../models/types";

const stories = storiesOf("Application|Skills", module).addDecorator(withIntl);

const handleUpdateExperienceJustification = (
  experience: ExperienceSkill,
): Promise<ExperienceSkill> => {
  action("Submitted")();
  return Promise.resolve(experience);
};

const handleRemoveExperienceJustification = (
  experience: ExperienceSkill,
): Promise<void> => {
  action("Removed")();
  return Promise.resolve();
};

stories.add(
  "Skills Page",
  (): React.ReactElement => (
    <Skills
      criteria={fakeCriteria()}
      experiences={fakeExperiences()}
      experienceSkills={fakeExperienceSkills()}
      skills={fakeSkills()}
      handleUpdateExperienceJustification={handleUpdateExperienceJustification}
      handleRemoveExperienceJustification={handleRemoveExperienceJustification}
      handleContinue={action("Continue")}
      handleQuit={action("Quit")}
      handleReturn={action("Return")}
    />
  ),
);

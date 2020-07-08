import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Skills from "../../components/Application/Skills/Skills";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
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

stories.add(
  "Skills Page",
  (): React.ReactElement => (
    <Skills
      criteria={fakeCriteria()}
      experiences={fakeExperienceSkills()}
      skills={fakeSkills()}
      handleUpdateExperienceJustification={handleUpdateExperienceJustification}
    />
  ),
);

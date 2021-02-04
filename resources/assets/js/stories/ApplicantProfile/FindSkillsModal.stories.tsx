import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import FindSkillsModal from "../../components/FindSkillsModal";
import { fakeSkill2, fakeSkill4 } from "../../fakeData/fakeSkills";
import { fakeSkillCategories } from "../../fakeData/fakeSkillCategories";

const stories = storiesOf(
  "Applicant Profile/Find Skills Modal",
  module,
).addDecorator(withIntl);

stories.add(
  "Find Skills Modal",
  (): React.ReactElement => (
    <FindSkillsModal
      portal="applicant"
      oldSkills={[fakeSkill2(), fakeSkill4()]}
      skillCategories={fakeSkillCategories()}
      handleSubmit={async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Submit Skills")(x);
      }}
    />
  ),
);

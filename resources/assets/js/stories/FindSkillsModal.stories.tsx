import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import FindSkillsModal, {
  FindSkillsModalTrigger,
} from "../components/FindSkillsModal";
import { fakeSkill2, fakeSkill4, fakeSkills } from "../fakeData/fakeSkills";
import { fakeSkillCategories } from "../fakeData/fakeSkillCategories";

const stories = storiesOf("Components/Find Skills Modal", module).addDecorator(
  withIntl,
);

stories.add(
  "Find Skills Modal",
  (): React.ReactElement => (
    <div>
      <FindSkillsModalTrigger />
      <FindSkillsModal
        oldSkills={[fakeSkill2(), fakeSkill4()]}
        portal="applicant"
        skills={fakeSkills()}
        skillCategories={fakeSkillCategories()}
        handleSubmit={async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Submit Skills")(x);
        }}
      />
    </div>
  ),
);

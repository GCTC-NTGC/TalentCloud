import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import FindSkillsModal from "../components/FindSkillsModal";
import { fakeSkill2, fakeSkill4, fakeSkills } from "../fakeData/fakeSkills";
import { fakeSkillCategories } from "../fakeData/fakeSkillCategories";

const stories = storiesOf("Components/Find Skills Modal", module).addDecorator(
  withIntl,
);

stories.add(
  "Find Skills Modal",
  (): React.ReactElement => (
    <FindSkillsModal
      dialogTrigger={
        <div data-h2-grid="b(top, expanded, flush, 0)">
          <div data-h2-grid-item="b(1of1)">
            <img alt="" src="https://via.placeholder.com/75" />
          </div>
          <p data-h2-grid-item="b(1of1)">
            {text("Dialog Trigger", "Add Skills")}
          </p>
        </div>
      }
      oldSkills={[fakeSkill2(), fakeSkill4()]}
      portal="applicant"
      skills={fakeSkills()}
      skillCategories={fakeSkillCategories()}
      handleSubmit={async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Submit Skills")(x);
      }}
    />
  ),
);

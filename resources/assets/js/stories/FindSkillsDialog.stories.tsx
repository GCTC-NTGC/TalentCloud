import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState } from "@storybook/addons";
import { fakeSkill2, fakeSkill4, fakeSkills } from "../fakeData/fakeSkills";
import { fakeSkillCategories } from "../fakeData/fakeSkillCategories";
import FindSkillsDialog, {
  FindSkillsDialogTrigger,
} from "../components/FindSkillsDialog/FindSkillsDialog";

const stories = storiesOf("Components/Find Skills Dialog", module).addDecorator(
  withIntl,
);

stories.add(
  "Find Skills Modal",
  (): React.ReactElement => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    return (
      <div>
        <FindSkillsDialogTrigger
          openDialog={() => {
            setIsDialogVisible(true);
          }}
        />
        <FindSkillsDialog
          previousSkills={[fakeSkill2(), fakeSkill4()]}
          portal="applicant"
          skills={fakeSkills()}
          skillCategories={fakeSkillCategories()}
          handleSubmit={async (x) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            action("Submit Skills")(x);
          }}
          isDialogVisible={isDialogVisible}
          closeDialog={() => setIsDialogVisible(false)}
        />
      </div>
    );
  },
);

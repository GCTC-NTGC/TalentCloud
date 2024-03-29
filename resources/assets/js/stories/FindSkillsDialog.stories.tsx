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
import { promiseAction } from "./helpers";

const stories = storiesOf("Applicant Profile/Skills", module).addDecorator(
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
          handleSubmit={promiseAction("Submit Skills")}
          isDialogVisible={isDialogVisible}
          closeDialog={() => setIsDialogVisible(false)}
        />
      </div>
    );
  },
);

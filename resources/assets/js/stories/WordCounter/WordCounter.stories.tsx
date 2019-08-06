import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import WordCounterWrapper from "../../components/WordCounter/WordCounterWrapper";
import SkillsWordCounter from "../../components/ApplicantSkills/SkillsWordCounter";

const stories = storiesOf("Word Counter", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Word Counter",
  (): React.ReactElement => (
    <div>
      <textarea id="word-counter" cols={100} rows={10} />
      <SkillsWordCounter elementId="word-counter" />
    </div>
  ),
  { info: { inline: true } },
);

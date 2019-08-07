import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, number, text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import WordCounterWrapper from "../../components/WordCounter/WordCounterWrapper";
import SkillsWordCounter from "../../components/ApplicantSkills/SkillsWordCounter";

const stories = storiesOf("Components|Word Counter", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories.add(
  "Word Counter",
  (): React.ReactElement => (
    <div>
      <textarea id="word-counter" cols={100} rows={10} />
      <SkillsWordCounter elementId="word-counter" />
    </div>
  ),
);

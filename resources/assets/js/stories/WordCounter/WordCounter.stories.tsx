import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, number, text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import WordCounterWrapper from "../../components/WordCounter/WordCounterWrapper";
import { messages } from "../../components/ApplicantSkills/SkillsWordCounterMessages";

const stories = storiesOf("Components|Word Counter", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withIntl);

stories.add(
  "Word Counter",
  (): React.ReactElement => (
    <div>
      <textarea id="word-counter" cols={100} rows={10} />
      <WordCounterWrapper
        elementId="word-counter"
        wordLimit={number("Word Limit", 150)}
        minWords={number("Min Words", 20)}
        maxWords={number("Max Words", 80)}
        placeholder={text("Placeholder", "Start typing answer above.")}
        messages={messages}
      />
    </div>
  ),
);

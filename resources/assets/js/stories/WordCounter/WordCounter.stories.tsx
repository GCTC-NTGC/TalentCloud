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

const messages = [
  {
    count: number("Msg Threshold Min", 1),
    message: "This seems too short.",
  },
  {
    count: number("Msg Threshold Low", 10),
    message: "This seems a bit short.",
  },
  { count: number("Msg Threshold Mid", 20), message: "" },
  {
    count: number("Msg Threshold High", 80),
    message: "This is starting to get a bit long.",
  },
  {
    count: number("Msg Threshold Very High", 100),
    message: "This looks too long.",
  },
  {
    count: number("Msg Threshold Max", 130),
    message: "This is way too long.",
  },
];

stories
  .add(
    "Word Counter",
    (): React.ReactElement => (
      <div>
        <textarea id="word-counter" cols={100} rows={10} />
        <WordCounterWrapper
          elementId="word-counter"
          messages={messages}
          wordLimit={number("Word Limit", 150)}
          minWords={number("Min Words", 20)}
          maxWords={number("Max Words", 80)}
          placeholder={text("Placeholder", "Start typing your answer above.")}
        />
      </div>
    ),
  )
  .add(
    "Skills Word Counter",
    (): React.ReactElement => (
      <div>
        <textarea id="word-counter" cols={100} rows={10} />
        <SkillsWordCounter elementId="word-counter" />
      </div>
    ),
  );

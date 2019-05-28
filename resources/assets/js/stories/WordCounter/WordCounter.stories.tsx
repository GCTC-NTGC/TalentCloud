import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import WordCounter from "../../components/WordCounter/WordCounter";

const warnings = [
  {
    max: 0,
    message: "Start typing your answer above.",
  },
  {
    max: 1,
    message: "This is too short, try including examples or lessons learned.",
  },
  { max: 10, message: "Seems short, try adding an example or two." },
  { max: 20, message: "Looks good." },
  { max: 80, message: "This is starting to get too long." },
  { max: 100, message: "This looks really long, try summarizing some text." },
  {
    max: 130,
    message:
      "This is way too long, try deleting irrelevant content, or see an example.",
  },
];

const stories = storiesOf("Word Counter", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Word Counter",
  (): React.ReactElement => (
    <div>
      <textarea id="word-counter" cols={100} rows={10} />
      <WordCounter
        elementId="word-counter"
        maxWords={number("Max", 20)}
        minWords={number("Min", 80)}
        wordLimit={number("Hard Limit", 200)}
        numberOfWords={number("Total", 2)}
        warnings={warnings}
      />
    </div>
  ),
  { info: { inline: true } },
);

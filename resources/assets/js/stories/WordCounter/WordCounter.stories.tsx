import React from "react";
import { storiesOf } from "@storybook/react";
import { number, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { withIntl } from "storybook-addon-intl";
import TextArea from "../../components/TextArea";
import WordCounter from "../../components/WordCounter/WordCounter";

const stories = storiesOf("Components|Word Counter", module).addDecorator(
  withIntl,
);

stories.add(
  "Word Counter",
  (): React.ReactElement => (
    <div data-c-margin="all(2)">
      <TextArea
        id="word-counter"
        name="word-counter"
        label="This is a textarea with a word counter"
        required={boolean("Required", false)}
        wordLimit={number("Max words", 100)}
        onChange={action("Contents changed")}
        value={text(
          "Value",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        )}
      />
    </div>
  ),
);

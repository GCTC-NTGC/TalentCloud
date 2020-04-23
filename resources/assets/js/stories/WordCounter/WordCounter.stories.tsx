import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
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
        required
        rightMessage={
          <span data-c-color="black">
            ({" "}
            <WordCounter
              elementId="word-counter"
              maxWords={number("Max words", 100)}
              minWords={number("Min Words", 0)}
            />{" "}
            words left )
          </span>
        }
        onChange={action("Contents changed")}
      />
    </div>
  ),
);

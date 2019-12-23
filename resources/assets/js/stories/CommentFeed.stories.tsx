import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, array } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import CommentForm from "../components/CommentForm";
import { Comment } from "../models/types";

const stories = storiesOf("Components|Comment Form", module).addDecorator(
  withIntl,
);

const fakeComment = (): Comment => ({
  comment: "Why did you do this?",
  type: 1
});

const handleSubmit = async (): Promise<Comment> => {
  action("Submit")();
  return fakeComment();
};

stories
  .add(
    "Empty",
    (): React.ReactElement => (
      <CommentForm handleSubmit={handleSubmit} />
    ),
  )

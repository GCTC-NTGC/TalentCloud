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
  id: 1,
  job_poster_id: 2,
  user_id: 3,
  comment: "Why did you do this?",
  location: "jpb_3",
  type: 1,
});

const handleSubmit = async (): Promise<Comment> => {
  action("Submit")();
  return fakeComment();
};

stories
  .add(
    "Manager",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm handleSubmit={handleSubmit} isHrAdviser={false} />
      </section>
    ),
  )
  .add(
    "HrAdviser",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm handleSubmit={handleSubmit} isHrAdviser />
      </section>
    ),
  );

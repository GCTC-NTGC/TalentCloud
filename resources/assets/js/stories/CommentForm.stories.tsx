import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { CommentForm } from "../components/CommentForm";
import { Comment } from "../models/types";

const locationOptions = [
  {
    value: "job/generic",
    label: "General",
  },
  {
    value: "job/tasks",
    label: "Tasks",
  },
  {
    value: "job/skills",
    label: "Skills",
  },
];

const handleCreateComment = (
  jobId: number,
  newComment: Comment,
): Promise<Comment> => Promise.resolve(newComment);

const stories = storiesOf("Components|Comment Form", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Manager",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm
          jobId={1}
          location={text("Location", "job/generic")}
          isHrAdvisor={false}
          locationOptions={locationOptions}
          handleCreateComment={handleCreateComment}
        />
      </section>
    ),
  )
  .add(
    "HrAdvisor",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm
          jobId={1}
          location={text("Location", "job/generic")}
          isHrAdvisor
          locationOptions={locationOptions}
          handleCreateComment={handleCreateComment}
        />
      </section>
    ),
  );

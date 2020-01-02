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

stories
  .add(
    "Manager",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm jobId={1} userId={1} isHrAdviser={false} />
      </section>
    ),
  )
  .add(
    "HrAdviser",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm jobId={1} userId={1} isHrAdviser />
      </section>
    ),
  );

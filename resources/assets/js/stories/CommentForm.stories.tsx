import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import CommentForm from "../components/CommentForm";

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
          location={text("Location", "Job Poster Builder > Step 3: Tasks")}
          isHrAdviser={false}
        />
      </section>
    ),
  )
  .add(
    "HrAdviser",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <CommentForm
          jobId={1}
          location={text("Location", "Job Poster Builder > Step 2: Details")}
          isHrAdviser
        />
      </section>
    ),
  );

import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import ActivityFeed from "../components/ActivityFeed";
import Activity from "../components/Activity";

const activities = [
  {
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quia sequi dignissimos, fugit molestias, quibusdam hic maxime sunt libero, ea deserunt numquam consectetur doloribus tempora sapiente? Corporis perspiciatis dolores deserunt.",
    location: "Job Poster Builder Step 3: Work Env.",
    name: "Kelly Plummmer",
    time: "5:45PM",
    type: "Recommendation",
    userRole: "HR",
  },
  {
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita architecto quod distinctio optio aut voluptatum nobis sint dolor temporibus iure non animi, magni modi natus, nisi soluta odio at est.",
    location: "Job Poster Builder Step 4: Tasks",
    name: "Nelly Lumber",
    time: "2:45PM",
    type: "Question",
    userRole: "Manager",
  },
];

const stories = storiesOf("Components|Activity Feed", module).addDecorator(
  withIntl,
);

stories
  .add(
    "Activity",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <Activity
          comment="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem quia sequi dignissimos, fugit molestias, quibusdam hic maxime sunt libero, ea deserunt numquam consectetur doloribus tempora sapiente? Corporis perspiciatis dolores deserunt."
          location="Job Poster Builder Step 3: Work Env."
          name="Kelly Plummmer"
          time={new Date()}
          type="Recommendation"
          userRole="HR"
        />
      </section>
    ),
  )
  .add(
    "Feed",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <ActivityFeed jobId={1} />
      </section>
    ),
  );

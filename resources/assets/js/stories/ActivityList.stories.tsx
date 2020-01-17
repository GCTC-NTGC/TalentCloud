import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import ActivityList from "../components/ActivityList";
import Activity from "../components/Activity";

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
          link={{ url: "/", title: "", text: "" }}
        />
      </section>
    ),
  )
  .add(
    "HR Feed",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <ActivityList jobId={1} isHrAdvisor />
      </section>
    ),
  )
  .add(
    "Manager Feed",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <ActivityList jobId={1} isHrAdvisor={false} />
      </section>
    ),
  );

/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { ActivityList } from "../components/ActivityList";
import Activity from "../components/Activity";
import RootContainer from "../components/RootContainer";
import { Comment } from "../models/types";
import { fakeUsers } from "../fakeData/fakeUsers";

const withRootContainer = (story): React.ReactElement => (
  <RootContainer>{story()}</RootContainer>
);

const comments: Comment[] = [
  {
    id: 1,
    job_poster_id: 2,
    user_id: 3,
    comment: "Great Work",
    location: "job/heading",
    type_id: 1,
    created_at: new Date(),
  },
  {
    id: 2,
    job_poster_id: 2,
    user_id: 3,
    comment: "Please change this",
    location: "job/skills",
    type_id: 2,
    created_at: new Date(),
  },
  {
    id: 2,
    job_poster_id: 2,
    user_id: 3,
    comment: "Redo everything",
    location: "job/tasks",
    type_id: 3,
    created_at: new Date(),
  },
];

const users = [fakeUsers()[2]];

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const handleFetchComments = (jobId: number): Promise<void> => Promise.resolve();
const handleFetchUsers = (): Promise<void> => Promise.resolve();

const stories = storiesOf("Components|Activity Feed", module)
  .addDecorator(withIntl)
  .addDecorator(withRootContainer);

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
    "List",
    (): React.ReactElement => (
      <section data-c-padding="all(3)">
        <ActivityList
          jobId={1}
          isHrAdvisor
          comments={comments}
          users={users}
          handleFetchComments={handleFetchComments}
          handleFetchUsers={handleFetchUsers}
        />
      </section>
    ),
  );

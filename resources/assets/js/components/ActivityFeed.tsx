import * as React from "react";
import { FormattedMessage } from "react-intl";
import ActivityComponent, { Activity } from "./Activity";

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FunctionComponent<ActivityFeedProps> = ({
  activities,
}) => {
  return (
    <section data-c-padding="top(1)">
      <h3 data-c-font-size="h3" data-c-color="stop" data-c-margin="bottom(1)">
        <FormattedMessage
          id="activityfeed.title"
          defaultMessage="Previous Activity"
          description="Title of activity feed."
        />
      </h3>
      {activities.length !== 0 &&
        activities.map(
          (activity): React.ReactElement => <ActivityComponent {...activity} />,
        )}
    </section>
  );
};

export default ActivityFeed;

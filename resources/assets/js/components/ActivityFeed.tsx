import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import Activity from "./Activity";
import { RootState } from "../store/store";
import { Comment, Job } from "../models/types";
import { DispatchType } from "../configureStore";
import { fetchComments } from "../store/Job/jobActions";
import { getComments, sortComments } from "../store/Job/jobSelector";
import { commentTypeMessages } from "./CommentForm";

interface ActivityFeedProps {
  jobId: number;
  comments: Comment[];
  handleFetchComments: (jobId: number) => Promise<void>;
}

const ActivityFeed: React.FunctionComponent<ActivityFeedProps> = ({
  jobId,
  comments,
  handleFetchComments,
}) => {
  const intl = useIntl();
  const [activities, setActivities] = useState<Comment[] | null>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  useEffect((): void => {
    handleFetchComments(jobId).finally(() => {
      setActivitiesLoading(false);
    });
  }, [handleFetchComments, jobId]);

  useEffect((): void => {
    // build activities list (sorting, filtering)
    if (comments !== null) {
      setActivities([...sortComments(comments)]);
    } else {
      setActivities(null);
    }
  }, [comments]);

  const userName = (userId: number) => "getUserName()";
  const userRole = (userId: number) => "getUserRole()";
  const commentType = (type: number | null): string => {
    switch (type) {
      case 1:
        return intl.formatMessage(commentTypeMessages.question);
      case 2:
        return intl.formatMessage(commentTypeMessages.recommendation);
      case 3:
        return intl.formatMessage(commentTypeMessages.requiredAction);
      default:
        return intl.formatMessage(commentTypeMessages.comment);
    }
  };

  const activityFeed = (): React.ReactElement => {
    if (activitiesLoading) {
      return (
        <div
          data-c-container="form"
          data-c-padding="top(triple) bottom(triple)"
        >
          <div
            data-c-background="white(100)"
            data-c-card
            data-c-padding="all(double)"
            data-c-radius="rounded"
            data-c-align="base(centre)"
          >
            <p>
              <FormattedMessage
                id="activityfeed.loading"
                defaultMessage="Your activities are loading..."
                description="Message indicating that the activity feed is still being loaded."
              />
            </p>
          </div>
        </div>
      );
    }
    if (activities && activities.length !== 0) {
      return (
        <>
          {activities.map(
            (activity): React.ReactElement => (
              <Activity
                key={activity.id}
                name={userName(activity.user_id)}
                userRole={userRole(activity.user_id)}
                comment={activity.comment}
                location={activity.location}
                time={activity.created_at}
                type={commentType(activity.type_id)}
                link={{ url: "/", title: "", text: "" }}
              />
            ),
          )}
        </>
      );
    }
    return (
      <p>
        <FormattedMessage
          id="activityfeed.noActivities"
          defaultMessage="No activities."
          description="Message displayed when activities is empty."
        />
      </p>
    );
  };

  return (
    <section data-c-padding="top(1)">
      <h3 data-c-font-size="h3" data-c-color="stop" data-c-margin="bottom(1)">
        <FormattedMessage
          id="activityfeed.title"
          defaultMessage="Previous Activity"
          description="Title of activity feed."
        />
      </h3>
      {activityFeed()}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  comments: Comment[];
} => ({
  comments: getComments(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleFetchComments: (jobId: number) => Promise<void>;
} => ({
  handleFetchComments: async (jobId: number): Promise<void> => {
    await dispatch(fetchComments(jobId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFeed);

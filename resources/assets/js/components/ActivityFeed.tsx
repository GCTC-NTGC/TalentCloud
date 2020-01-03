import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import ActivityComponent, { Activity } from "./Activity";
import { RootState } from "../store/store";
import { Comment } from "../models/types";
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
  useEffect((): void => {
    handleFetchComments(jobId);
  }, [handleFetchComments, jobId]);
  const intl = useIntl();
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
  return (
    <section data-c-padding="top(1)">
      <h3 data-c-font-size="h3" data-c-color="stop" data-c-margin="bottom(1)">
        <FormattedMessage
          id="activityfeed.title"
          defaultMessage="Previous Activity"
          description="Title of activity feed."
        />
      </h3>
      {comments.length !== 0 &&
        comments.map(
          (comment): React.ReactElement => (
            <ActivityComponent
              name={userName(comment.user_id)}
              userRole={userRole(comment.user_id)}
              comment={comment.comment}
              location={comment.location}
              time={comment.created_at}
              type={commentType(comment.type_id)}
              link={{ url: "/", title: "", text: "" }}
            />
          ),
        )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  comments: Comment[];
} => ({
  comments: sortComments(getComments(state)),
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

/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import Activity from "./Activity";
import { RootState } from "../store/store";
import { Comment, User } from "../models/types";
import { DispatchType } from "../configureStore";
import { fetchComments } from "../store/Job/jobActions";
import { fetchAllUsers } from "../store/User/userActions";
import { getSortedFilteredComments } from "../store/Job/jobSelector";
import { getUsers } from "../store/User/userSelector";
import { commentTypeMessages } from "./CommentForm";
import {
  generalLocationOption,
  specificLocationOption,
} from "../models/localizedConstants";
import { activityLocationUrl } from "../models/jobUtil";
import { LocationId } from "../models/lookupConstants";
import { getLocale, localizeFieldNonNull } from "../helpers/localize";
import { find } from "../helpers/queries";

interface ActivityListProps {
  generalLocation: string;
  jobId: number;
  isHrAdvisor: boolean;
  comments: Comment[];
  users: User[];
  handleFetchComments: (jobId: number) => Promise<void>;
  handleFetchUsers: (ids?: string) => Promise<void>;
  filterComments?: (comment: Comment) => boolean;
}

export const ActivityList: React.FunctionComponent<ActivityListProps> = ({
  jobId,
  comments,
  users,
  handleFetchComments,
  handleFetchUsers,
  isHrAdvisor,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const activities: Comment[] = [...comments];
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    setLoadingActivities(true);
    handleFetchComments(jobId)
      .then(() => {
        setLoadingActivities(false);
      })
      .catch(() => {
        setLoadingActivities(false);
        setIsError(true);
      });
  }, [handleFetchComments, jobId]);

  useEffect((): void => {
    setLoadingActivities(true);
    if (comments.length > 0) {
      const userIds: number[] = [];

      // eslint-disable-next-line array-callback-return
      comments.map(comment => {
        if (userIds.indexOf(comment.user_id) === -1) {
          userIds.push(comment.user_id);
        }
      });
      handleFetchUsers(userIds.join(","))
        .then(() => {
          setLoadingActivities(false);
        })
        .catch(() => {
          setLoadingActivities(false);
          setIsError(true);
        });
    }
    setLoadingActivities(false);
  }, [comments, handleFetchUsers]);

  const activityType = (type: number | null): string => {
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

  const isValidLocation = (locationStr: string): boolean => {
    const validLocations = Object.values(LocationId) as ReadonlyArray<string>;
    return validLocations.includes(locationStr);
  };

  const getLocation = (locationStr: string): string =>
    isValidLocation(locationStr)
      ? `${intl.formatMessage(
          generalLocationOption(locationStr),
        )} > ${intl.formatMessage(specificLocationOption(locationStr))}`
      : "";

  return (
    <section data-c-padding="top(1)">
      <h3 data-c-font-size="h3" data-c-color="c2" data-c-margin="bottom(1)">
        <FormattedMessage
          id="activityfeed.title"
          defaultMessage="Activities"
          description="Title of activity feed."
        />
      </h3>
      {isError && (
        <p>
          <FormattedMessage
            id="activityfeed.error"
            defaultMessage="Something went wrong..."
            description="Error fetching activities."
          />
        </p>
      )}
      {loadingActivities ? (
        <div data-c-container="form" data-c-padding="top(1) bottom(1)">
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
      ) : (
        <>
          {activities && activities.length !== 0
            ? activities.map(
                ({
                  id,
                  comment,
                  location,
                  created_at,
                  type_id,
                  user_id,
                }: Comment): React.ReactElement => {
                  const user = find(users, user_id);
                  const fullName = user?.full_name ?? "";
                  const userRole = user?.user_role;
                  let displayRole = "";
                  if (userRole !== undefined) {
                    displayRole = localizeFieldNonNull(
                      locale,
                      userRole,
                      "name",
                    );
                  }

                  return (
                    <Activity
                      key={id}
                      name={fullName}
                      userRole={displayRole}
                      comment={comment}
                      location={getLocation(location)}
                      time={created_at}
                      type={activityType(type_id)}
                      link={{
                        url: activityLocationUrl(
                          isHrAdvisor,
                          location,
                          jobId,
                          locale,
                        ),
                        text: "",
                        title: "",
                      }}
                    />
                  );
                },
              )
            : !isError && (
                <p>
                  <FormattedMessage
                    id="activityfeed.noActivities"
                    defaultMessage="No activities."
                    description="Message displayed when activities is empty."
                  />
                </p>
              )}
        </>
      )}
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    filterComments?: (comment: Comment) => boolean;
    generalLocation: string;
  },
): {
  comments: Comment[];
  users: User[];
} => ({
  comments: getSortedFilteredComments(state, ownProps),
  users: getUsers(state),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleFetchComments: (jobId: number) => Promise<void>;
  handleFetchUsers: () => Promise<void>;
} => ({
  handleFetchComments: async (jobId: number): Promise<void> => {
    const result = await dispatch(fetchComments(jobId));
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
  handleFetchUsers: async (ids = ""): Promise<void> => {
    const result = await dispatch(fetchAllUsers(ids));
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);

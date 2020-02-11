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
import { getComments, sortComments } from "../store/Job/jobSelector";
import { commentTypeMessages } from "./CommentForm";
import { activityLocationOption } from "../models/localizedConstants";
import { activityLocationUrl } from "../models/jobUtil";
import { LocationId } from "../models/lookupConstants";
import { getLocale } from "../helpers/localize";
import { find } from "../helpers/queries";
import { getUsers } from "../store/User/userSelector";

interface ActivityFeedProps {
  jobId: number;
  isHrAdvisor: boolean;
  comments: Comment[];
  users: User[];
  handleFetchComments: (jobId: number) => Promise<void>;
  handleFetchUsers: () => Promise<void>;
  filterComments?: (comment: Comment) => boolean;
}

const ActivityFeed: React.FunctionComponent<ActivityFeedProps> = ({
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
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect((): void => {
    setIsActivitiesLoading(true);
    handleFetchComments(jobId)
      .then(() => {
        setIsActivitiesLoading(false);
      })
      .catch(() => {
        setIsActivitiesLoading(false);
        setIsError(true);
      });
  }, [handleFetchComments, jobId]);

  useEffect((): void => {
    setIsActivitiesLoading(true);
    handleFetchUsers()
      .then(() => {
        setIsActivitiesLoading(false);
      })
      .catch(() => {
        setIsActivitiesLoading(false);
        setIsError(true);
      });
  }, [handleFetchUsers]);

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
      {isActivitiesLoading ? (
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
                  const fullName = `${user?.first_name ??
                    ""} ${user?.last_name ?? ""}`.trim();

                  return (
                    <Activity
                      key={id}
                      name={fullName}
                      userRole="Replace with Manager Role!" // TODO: Replace with user.role after User api is setup.
                      comment={comment}
                      location={
                        isValidLocation(location)
                          ? intl.formatMessage(activityLocationOption(location))
                          : ""
                      }
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
  {
    filterComments = (): boolean => true,
  }: { filterComments?: (comment: Comment) => boolean },
): {
  comments: Comment[];
  users: User[];
} => ({
  comments: sortComments(getComments(state).filter(filterComments)),
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
  handleFetchUsers: async (): Promise<void> => {
    const result = await dispatch(fetchAllUsers());
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFeed);

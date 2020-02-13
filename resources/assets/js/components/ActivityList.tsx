/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import Activity from "./Activity";
import { RootState } from "../store/store";
import { Comment } from "../models/types";
import { DispatchType } from "../configureStore";
import { fetchComments } from "../store/Job/jobActions";
import { getComments, sortComments } from "../store/Job/jobSelector";
import { commentTypeMessages } from "./CommentForm";
import {
  generalLocationOption,
  specificLocationOption,
} from "../models/localizedConstants";
import { activityLocationUrl } from "../models/jobUtil";
import { LocationId } from "../models/lookupConstants";
import { getLocale } from "../helpers/localize";

interface ActivityListProps {
  jobId: number;
  isHrAdvisor: boolean;
  comments: Comment[];
  handleFetchComments: (jobId: number) => Promise<void>;
  filterComments?: (comment: Comment) => boolean;
}

export const ActivityList: React.FunctionComponent<ActivityListProps> = ({
  jobId,
  comments,
  handleFetchComments,
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
                }: Comment): React.ReactElement => (
                  <Activity
                    key={id}
                    name="Replace with Manager Name!" // TODO: Replace with user.name after User api is setup.
                    userRole="Replace with Manager Role!" // TODO: Replace with user.name after User api is setup.
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
                ),
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
} => ({
  comments: sortComments(getComments(state).filter(filterComments)),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleFetchComments: (jobId: number) => Promise<void>;
} => ({
  handleFetchComments: async (jobId: number): Promise<void> => {
    const result = await dispatch(fetchComments(jobId));
    if (!result.error) {
      return Promise.resolve();
    }
    return Promise.reject(result.error);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);

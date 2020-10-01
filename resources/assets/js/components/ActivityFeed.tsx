import * as React from "react";
import {
  useIntl,
  FormattedMessage,
  MessageDescriptor,
  defineMessages,
} from "react-intl";
import { connect } from "react-redux";
import { hasKey } from "../helpers/queries";
import { LocationId } from "../models/lookupConstants";
import CommentForm from "./CommentForm";
import ActivityList from "./ActivityList";
import Icon from "./Icon";
import { Comment } from "../models/types";
import { fetchingComments, getComments } from "../store/Job/jobSelector";
import { RootState } from "../store/store";

const messages = defineMessages({
  loadingIcon: {
    id: "activityfeed.loadingIconText",
    defaultMessage: "Number of activities is loading...",
    description: "Accessible text for the loading icon",
  },
});

interface ActivityFeedProps {
  commentsLoading: boolean;
  generalLocation: string;
  isHrAdvisor: boolean;
  jobId: number;
  locationMessages: { [LocationId: string]: MessageDescriptor };
  totalActivities: number;
  filterComments?: (comment: Comment) => boolean;
}

const ActivityFeed: React.FunctionComponent<ActivityFeedProps> = ({
  commentsLoading,
  generalLocation,
  isHrAdvisor,
  jobId,
  locationMessages,
  totalActivities,
  filterComments,
}) => {
  const intl = useIntl();
  const locationOptions = Object.values(LocationId)
    .filter(location => hasKey(locationMessages, location))
    .map(location => ({
      value: location,
      label: intl.formatMessage(locationMessages[location]),
    }));
  return (
    <section>
      <div data-c-accordion-group>
        <div data-c-accordion="" className="">
          <button
            aria-expanded="false"
            data-c-accordion-trigger
            tabIndex={0}
            type="button"
            data-c-background="c1(100)"
            data-c-padding="all(1)"
          >
            <div>
              <h3 data-c-font-size="h3" data-c-color="white">
                <FormattedMessage
                  id="activityfeed.header"
                  defaultMessage="Click to View Comments {totalActivities}"
                  description="The activity feed header."
                  values={{
                    totalActivities: commentsLoading ? (
                      <Icon
                        icon="fa fa-spinner fa-spin"
                        accessibleText={intl.formatMessage(
                          messages.loadingIcon,
                        )}
                        sematicIcon
                      />
                    ) : (
                      `(${totalActivities})`
                    ),
                  }}
                />
              </h3>
            </div>
            <span data-c-visibility="invisible">
              <FormattedMessage
                id="activityfeed.accordionAccessibleLabel"
                defaultMessage="Click to view..."
                description="The accessibility text displayed on the activity feed accordion button."
              />
            </span>
            <p
              data-c-accordion-add=""
              data-c-font-style="underline"
              data-c-color="white"
            >
              <i className="fas fa-caret-up" />
            </p>
            <p
              data-c-accordion-remove=""
              data-c-font-style="underline"
              data-c-color="white"
            >
              <i className="fas fa-caret-down" />
            </p>
          </button>
          <div
            aria-hidden="false"
            data-c-accordion-content
            data-c-background="grey(20)"
            data-c-padding="all(1)"
          >
            <CommentForm
              jobId={jobId}
              isHrAdvisor={isHrAdvisor}
              location={generalLocation}
              locationOptions={locationOptions}
            />
            <hr data-c-hr="thin(black)" data-c-margin="top(1)" />
            <ActivityList
              generalLocation={generalLocation}
              jobId={jobId}
              isHrAdvisor={isHrAdvisor}
              filterComments={filterComments}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
  {
    filterComments = (): boolean => true,
  }: { filterComments?: (comment: Comment) => boolean },
): {
  commentsLoading: boolean;
  totalActivities: number;
} => ({
  commentsLoading: fetchingComments(state),
  totalActivities: getComments(state).filter(filterComments).length,
});

export default connect(mapStateToProps, () => ({}))(ActivityFeed);

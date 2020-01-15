import * as React from "react";
import { connect } from "react-redux";
import { defineMessages, useIntl, FormattedMessage } from "react-intl";
import CommentForm from "../../CommentForm";
import ActivityFeed from "../../ActivityFeed";
import { LocationId } from "../../../models/lookupConstants";
import { RootState } from "../../../store/store";
import { getComments } from "../../../store/Job/jobSelector";
import Icon from "../../Icon";
import { hasKey } from "../../../helpers/queries";

export const reviewLocations = defineMessages({
  [LocationId.generic]: {
    id: "reviewLocations.jpb.generic",
    defaultMessage: "Generic",
    description: "Location where the activity is located.",
  },
  [LocationId.heading]: {
    id: "reviewLocations.jpb.heading",
    defaultMessage: "Job Page Heading",
    description: "Location where the activity is located.",
  },
  [LocationId.basicInfo]: {
    id: "reviewLocations.jpb.basicInfo",
    defaultMessage: "Basic Information",
    description: "Location where the activity is located.",
  },
  [LocationId.impact]: {
    id: "reviewLocations.jpb.impact",
    defaultMessage: "Impact",
    description: "Location where the activity is located.",
  },
  [LocationId.tasks]: {
    id: "reviewLocations.jpb.tasks",
    defaultMessage: "Tasks",
    description: "Location where the activity is located.",
  },
  [LocationId.skills]: {
    id: "reviewLocations.jpb.skills",
    defaultMessage: "Criteria",
    description: "Location where the activity is located.",
  },
  [LocationId.langRequirements]: {
    id: "reviewLocations.jpb.langRequirements",
    defaultMessage: "Language Requirements",
    description: "Location where the activity is located.",
  },
  [LocationId.environment]: {
    id: "reviewLocations.jpb.environment",
    defaultMessage: "Language Requirements",
    description: "Location where the activity is located.",
  },
});

interface JobReviewActivityFeedProps {
  jobId: number;
  isHrAdvisor: boolean;
  totalActivities: number;
}

const JobReviewActivityFeed: React.FunctionComponent<JobReviewActivityFeedProps> = ({
  jobId,
  isHrAdvisor,
  totalActivities,
}) => {
  const intl = useIntl();
  const locationOptions = Object.values(LocationId)
    .filter(location => hasKey(reviewLocations, location))
    .map(location => ({
      value: location,
      label: intl.formatMessage(reviewLocations[location]),
    }));

  return (
    <section data-c-padding="top(double)">
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
                  id="activityfeed.review.header"
                  defaultMessage="Review Your Job Poster {totalActivities}"
                  description="The activity feed header."
                  values={{
                    totalActivities:
                      totalActivities === 0 ? (
                        <Icon
                          icon="fa fa-spinner fa-spin"
                          accessibleText="Number of activities is loading..."
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
                id="activityfeed.review.accordionAccessibleLabel"
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
              isHrAdviser={isHrAdvisor}
              location="job/review"
              locationOptions={...locationOptions}
            />
            <hr
              data-c-hr="thin(black)"
              data-c-margin="top(1) left(2) right(2)"
            />
            <ActivityFeed jobId={jobId} isHrAdvisor={isHrAdvisor} />
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (
  state: RootState,
): {
  totalActivities: number;
} => ({
  totalActivities: getComments(state).length,
});

export default connect(mapStateToProps, () => ({}))(JobReviewActivityFeed);

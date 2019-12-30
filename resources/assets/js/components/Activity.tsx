import * as React from "react";
import { FormattedMessage } from "react-intl";

export interface Activity {
  name: string;
  userRole: string;
  time: string;
  type: string;
  comment: string;
  location: string;
}

type ActivityProps = Activity;

const Activity: React.FunctionComponent<ActivityProps> = ({
  name,
  userRole,
  time,
  type,
  comment,
  location,
}) => {
  return (
    <div>
      <a
        href="https:/google.ca"
        className="tc-job-activity-comment"
        data-c-card
        data-c-background="white(100)"
        data-c-radius="rounded"
        data-c-padding="all(1)"
        data-c-margin="bottom(.5)"
        style={{
          cursor: "pointer",
          display: "block",
          textDecoration: "none",
          transition: "all .2s ease",
        }}
      >
        <p
          data-c-margin="bottom(.5)"
          data-c-color="gray"
          data-c-font-size="small"
        >
          <FormattedMessage
            id="activity.commentMetadata"
            description="Text with additional information on comment."
            defaultMessage="{name} ({userRole}) commented at {time}."
            values={{
              name,
              userRole,
              time,
            }}
          />
        </p>
        <p data-c-margin="bottom(.5)" data-c-color="black">
          <span data-c-font-weight="bold">{type}:</span>
          {comment}
        </p>
        <div data-c-grid="gutter(all, 1)">
          <div data-c-grid-item="tp(1of2) ds(2of3)">
            <p data-c-font-size="small" data-c-color="black">
              <FormattedMessage
                id="activity.commentLocation.label"
                defaultMessage="Comment Located"
                description="The label used before the comment location."
              />
              : {location}
            </p>
          </div>
          <div
            data-c-grid-item="tp(1of2) ds(1of3)"
            data-c-align="base(center) tp(right)"
          >
            <p
              data-c-font-size="small"
              data-c-font-style="underline"
              data-c-color="c1"
            >
              <FormattedMessage
                id="activity.viewComment.label"
                defaultMessage="View Comment"
                description="The text displayed on the activity link to view comment."
              />
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Activity;

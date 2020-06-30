import * as React from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { Link } from "../../../models/app";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import { relativeTimeConfig } from "../../../helpers/dates";

const stepNames = defineMessages({
  welcome: {
    id: "applicationTimeline.progressBar.welcome",
    defaultMessage: "Welcome",
  },
  step01: {
    id: "applicationTimeline.progressBar.step01",
    defaultMessage: "Step 1/6",
  },
  step02: {
    id: "applicationTimeline.progressBar.step02",
    defaultMessage: "Step 2/6",
  },
  step03: {
    id: "applicationTimeline.progressBar.step03",
    defaultMessage: "Step 3/6",
  },
  step04: {
    id: "applicationTimeline.progressBar.step04",
    defaultMessage: "Step 4/6",
  },
  step05: {
    id: "applicationTimeline.progressBar.step05",
    defaultMessage: "Step 5/6",
  },
  step06: {
    id: "applicationTimeline.progressBar.step06",
    defaultMessage: "Step 6/6",
  },
});

export const ProgressBarStepId = {
  welcome: 1,
  basicInfo: 2,
  experienceTutorial: 3,
  experience: 4,
  skillsTutorial: 5,
  skills: 6,
  myFit: 7,
  review: 8,
  finalSubmission: 9,
};

// Returns the list item element that corresponds to the steps status.
const createStep = (
  link: Link,
  status: ProgressBarStepStatus,
  icons: {
    [key in ProgressBarStepStatus]: { className: string; color: string };
  },
): React.ReactElement => {
  const isComplete: boolean = status === "complete";
  const isCurrent: boolean = status === "current";
  const hasError: boolean = status === "error";

  if (isComplete) {
    return (
      <li key={link.title}>
        <span data-c-visibility="invisible">
          <FormattedMessage
            id="applicationTimeline.progressbar.completedStepLabel"
            defaultMessage="Completed: "
            description="Visually hidden text used to indicate the completed steps."
          />
        </span>
        <a
          href={link.url}
          title={link.title}
          onClick={(e) => {
            e.preventDefault();
            navigate(link.url);
          }}
        >
          <span data-c-visibility="invisible">{link.text}</span>
          <i
            className={icons[status].className}
            data-c-color={icons[status].color}
          />
        </a>
      </li>
    );
  }
  if (isCurrent) {
    return (
      <li key={link.title} title={link.title}>
        <span data-c-visibility="invisible">
          <FormattedMessage
            id="applicationTimeline.progressbar.currentStepLabel"
            defaultMessage="Current: "
            description="Visually hidden text used to indicate the current steps."
          />
        </span>
        <span data-c-visibility="invisible">{link.text}</span>
        <i
          className={icons[status].className}
          data-c-color={icons[status].color}
        />
      </li>
    );
  }
  if (hasError) {
    return (
      <li key={link.title}>
        <span data-c-visibility="invisible">
          <FormattedMessage
            id="applicationTimeline.progressbar.errorStepLabel"
            defaultMessage="Error: "
            description="Visually hidden text used to indicate the steps with errors."
          />
        </span>
        <a href={link.url} title={link.title}>
          <span data-c-visibility="invisible">{link.text}</span>
          <i
            className={icons[status].className}
            data-c-color={icons[status].color}
          />
        </a>
      </li>
    );
  }
  return (
    <li key={link.title} title={link.title}>
      <span data-c-visibility="invisible">{link.text}</span>
      <i
        className={icons[status].className}
        data-c-color={icons[status].color}
      />
    </li>
  );
};

export type ProgressBarStepStatus =
  | "default"
  | "complete"
  | "error"
  | "current";

interface ProgressBarProps {
  /** The closing date of the job poster. */
  closeDateTime: Date;
  /** The current step number. This is required for the informational steps, since they do not use a list item. */
  stepNumber: number;
  /** List of the steps. */
  steps: { link: Link; status: ProgressBarStepStatus }[];
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  steps,
  closeDateTime,
  stepNumber,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  dayjs.extend(relativeTime, relativeTimeConfig());
  dayjs.extend(utc);

  // There are nine steps throughout the timeline, some steps using the same title (informational steps). This maps the step number to its corresponding title.
  const getStepName = {
    [ProgressBarStepId.welcome]: intl.formatMessage(stepNames.welcome),
    [ProgressBarStepId.basicInfo]: intl.formatMessage(stepNames.step01),
    [ProgressBarStepId.experienceTutorial]: intl.formatMessage(
      stepNames.step02,
    ),
    [ProgressBarStepId.experience]: intl.formatMessage(stepNames.step02),
    [ProgressBarStepId.skillsTutorial]: intl.formatMessage(stepNames.step03),
    [ProgressBarStepId.skills]: intl.formatMessage(stepNames.step03),
    [ProgressBarStepId.myFit]: intl.formatMessage(stepNames.step04),
    [ProgressBarStepId.review]: intl.formatMessage(stepNames.step05),
    [ProgressBarStepId.finalSubmission]: intl.formatMessage(stepNames.step06),
  };

  const icons: {
    [key in ProgressBarStepStatus]: { className: string; color: string };
  } = {
    default: {
      className: "fas fa-circle",
      color: "grey",
    },
    complete: {
      className: "fas fa-check-circle",
      color: "go",
    },
    error: {
      className: "fas fa-exclamation-circle",
      color: "stop",
    },
    current: {
      className: "far fa-circle",
      color: "white",
    },
  };

  return (
    <div data-c-background="black(100)" data-c-padding="tb(1)">
      <div data-c-container="large">
        <div data-c-grid="gutter(all, 1)">
          <div data-c-grid-item="tl(1of2)" data-c-align="base(center) tl(left)">
            <span data-c-color="white">{getStepName[stepNumber]}</span>
            <ol className="applicant-application-progress-bar">
              {steps.map(
                ({ link, status }): React.ReactElement =>
                  createStep(link, status, icons),
              )}
            </ol>
          </div>
          <div
            data-c-grid-item="tl(1of2)"
            data-c-align="base(center) tl(right)"
          >
            <span data-c-color="white">
              <FormattedMessage
                id="applicationTimeline.progressbar.applicationDeadline"
                defaultMessage="Application Deadline: {timeLeft}"
                description="Label for the application deadline"
                values={{
                  timeLeft: dayjs(closeDateTime).utc().locale(locale).fromNow(),
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

import React from "react";
import { useIntl, defineMessages } from "react-intl";

interface ProgressTrackerItemProps {
  link: string;
  state: "active" | "complete" | "error" | "null";
  label: string;
  title: string;
  fontColor?: string;
  dataIsLoading?: boolean;
}

export const messages = defineMessages({
  unreachableStep: {
    id: "progressTracker.unreachableStep",
    defaultMessage: "Must complete previous steps.",
    description:
      "Tooltip informing user to complete previous steps, before step it can become clickable.",
  },
});

const ProgressTrackerItem: React.FunctionComponent<
  ProgressTrackerItemProps
> = ({
  link,
  label,
  title,
  state,
  fontColor,
  dataIsLoading,
}): React.ReactElement => {
  const intl = useIntl();
  return (
    <li
      className="tracker-item"
      data-tc-tracker-state={state}
      data-c-alignment="base(left)"
      data-c-color={fontColor}
      aria-hidden="true"
    >
      <span
        className="tracker-item-connect"
        style={{
          backgroundColor: `${!dataIsLoading &&
            (state === "null" ? "#969696" : "#008000")}`,
        }}
      />
      {!dataIsLoading ? (
        <div className="tracker-icon">
          {state === "active" && <i className="fas fa-arrow-down" />}
          {state === "complete" && <i className="fas fa-check" />}
          {state === "error" && <i className="fas fa-exclamation-triangle" />}
        </div>
      ) : (
        <div className="tracker-icon">
          {state !== "active" && <div className="spinner-loader" />}
          {state === "active" && <i className="fas fa-arrow-down" />}
        </div>
      )}
      {state !== "null" ? (
        <a href={link} title={title}>
          <div className="tracker-title">
            <span data-c-font-size="small">{label}</span>
            <span data-c-font-weight="bold">{title}</span>
          </div>
        </a>
      ) : (
        <div
          className="tracker-title"
          title={intl.formatMessage(messages.unreachableStep)}
        >
          <span data-c-font-size="small">{label}</span>
          <span data-c-font-weight="bold">{title}</span>
        </div>
      )}
    </li>
  );
};

export default ProgressTrackerItem;

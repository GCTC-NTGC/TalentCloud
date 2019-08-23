import React from "react";

interface ProgressTrackerItemProps {
  state: "active" | "complete" | "error" | "null";
  label: string;
  title: string;
  fontColor?: string;
  dataIsLoading?: boolean;
}
const ProgressTrackerItem: React.FunctionComponent<
  ProgressTrackerItemProps
> = ({ label, title, state, fontColor, dataIsLoading }): React.ReactElement => {
  return (
    <div
      className="tracker-item"
      data-tc-tracker-state={state}
      data-c-alignment="base(left)"
      data-c-margin="top(half) right(normal) bottom(half) left(normal)"
      data-c-color={fontColor}
    >
      {!dataIsLoading ? (
        <div className="tracker-icon">
          {state === "active" && <i className="fas fa-arrow-down" />}
          {state === "complete" && <i className="fas fa-check" />}
          {state === "error" && <i className="fas fa-exclamation-triangle" />}
        </div>
      ) : (
        <div className="tracker-icon">
          <div className="spinner-loader" />
        </div>
      )}
      <div>
        <span data-c-font-size="small">{label}</span>
        <br />
        <span data-c-font-weight="bold">{title}</span>
      </div>
    </div>
  );
};

export default ProgressTrackerItem;

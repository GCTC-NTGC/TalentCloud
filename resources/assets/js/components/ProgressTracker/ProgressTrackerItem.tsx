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
            (state === "null" ? "#969696" : "#0A6CBC")}`,
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
          <div className="spinner-loader" />
        </div>
      )}
      <div className="tracker-title">
        <span data-c-font-size="small">{label}</span>
        <span data-c-font-weight="bold">{title}</span>
      </div>
    </li>
  );
};

export default ProgressTrackerItem;

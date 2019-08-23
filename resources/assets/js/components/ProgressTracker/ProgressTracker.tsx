import React from "react";
import { ProgressTrackerItem } from "./types";
import ProgressTrackerItemComponent from "./ProgressTrackerItem";

export interface ProgressTrackerProps {
  items?: ProgressTrackerItem[];
  children?: React.ReactNode;
  backgroundColor?: string;
  backgroundOpacity?: string;
  fontColor?: string;
  classNames?: string;
  itemsWrapperClassNames?: string;
  dataIsLoading?: boolean;
}

const ProgressTracker: React.FunctionComponent<ProgressTrackerProps> = ({
  items,
  children,
  backgroundColor,
  backgroundOpacity,
  fontColor,
  classNames,
  itemsWrapperClassNames,
  dataIsLoading,
}): React.ReactElement => {
  return (
    <div
      data-c-alignment="base(centre)"
      data-c-background={`${backgroundColor}(${backgroundOpacity || 100})`}
      className={classNames}
    >
      <div
        data-c-container="layout"
        data-c-padding="top(quarter) bottom(quarter)"
      >
        <div className={itemsWrapperClassNames}>
          {/* If items list exists, then return list of progress tracker item components. Also, progress tracker items can be passed down to the children props, and will be printed out below. */}
          {items &&
            items.map(
              (item): React.ReactElement => {
                const { state, label, title } = item;
                return (
                  <ProgressTrackerItemComponent
                    key={title}
                    state={state}
                    label={label}
                    title={title}
                    fontColor={fontColor}
                    dataIsLoading={dataIsLoading}
                  />
                );
              },
            )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

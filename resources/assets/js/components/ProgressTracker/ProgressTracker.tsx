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

const isActiveItem = ({ state }) => {
  return state === "active";
};

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
  const active = items !== undefined ? items.find(isActiveItem) : undefined;
  const activeItemLabel = active !== undefined ? active.label : "";
  const activeItemTitle = active !== undefined ? active.title : "";
  const activeIndex = items ? items.findIndex(isActiveItem) : -1;

  return (
    <div
      data-c-alignment="base(centre)"
      data-c-background={`${backgroundColor}(${backgroundOpacity || 100})`}
      className={classNames}
      data-c-padding="top(quarter) bottom(quarter)"
    >
      <ol
        tabIndex={0}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={items && items.length}
        aria-valuenow={activeIndex}
        aria-valuetext={`${activeItemLabel} : ${activeItemTitle}`}
        className={itemsWrapperClassNames}
        data-c-container="layout"
      >
        {/* If items list exists, then return list of progress tracker item components. Also, progress tracker items can be passed down to the children props, and will be printed out below. */}
        {items &&
          items.map(
            (item): React.ReactElement => {
              const { link, state, label, title } = item;
              return (
                <ProgressTrackerItemComponent
                  link={link}
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
      </ol>
    </div>
  );
};

export default ProgressTracker;

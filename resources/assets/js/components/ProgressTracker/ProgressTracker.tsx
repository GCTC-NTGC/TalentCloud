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
  const activeIndex = (): number => {
    let index = -1;
    if (items) {
      items.map(({ state }, i) => {
        if (state === "active") {
          index = i;
        }
      });
    }

    return index;
  };

  const activeItem = (): ProgressTrackerItem => {
    let active;
    if (items) {
      active = items.find(({ state }) => {
        return state === "active";
      });
    }

    return active;
  };
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
        aria-valuemax={5}
        aria-valuenow={activeIndex()}
        aria-valuetext={`${activeItem().label} : ${activeItem().title}`}
        className={itemsWrapperClassNames}
        data-c-container="layout"
      >
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
      </ol>
    </div>
  );
};

export default ProgressTracker;

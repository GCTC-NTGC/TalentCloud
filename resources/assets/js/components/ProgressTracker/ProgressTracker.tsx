import * as React from 'react';
import { ProgressTrackerItem } from './types';
import ProgressTrackerItemComponent from './ProgressTrackerItem';

export interface ProgressTrackerProps {
  items?: ProgressTrackerItem[];
  children?: React.ReactNode;
  backgroundColor?: string;
  backgroundOpacity?: string;
}

const ProgressTracker: React.FunctionComponent<ProgressTrackerProps> = ({
  items,
  children,
  backgroundColor,
  backgroundOpacity,
}): React.ReactElement => {
  return (
    <div
      data-c-alignment="base(centre) tl(right)"
      data-c-background={`${backgroundColor}(${backgroundOpacity})`}
    >
      <div
        data-c-container="layout"
        data-c-padding="top(quarter) bottom(quarter)"
      >
        <div className="tracker">
          {/* If items list exists, then return list of progress tracker item components. Also, progress tracker items can be passed down to the children props, and will be printed out below.*/}
          {items &&
            items.map(
              (item, index): React.ReactElement => {
                const { state, label, title } = item;
                return (
                  <ProgressTrackerItemComponent
                    key={index}
                    state={state}
                    label={label}
                    title={title}
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

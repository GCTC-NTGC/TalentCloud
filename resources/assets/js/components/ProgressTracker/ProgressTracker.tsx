import * as React from 'react';
import { ProgressTrackerItem } from './types';
import ProgressTrackerItemComponent from './ProgressTrackerItem';

export interface ProgressTrackerProps {
  items?: ProgressTrackerItem[];
  children?: React.ReactElement;
  backgroundColor?: string;
  backgroundOpacity?: string;
}

export interface ProgressTrackerState {
  currentStep: number;
}

class ProgressTracker extends React.Component<
  ProgressTrackerProps,
  ProgressTrackerState
> {
  public constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  public render(): React.ReactElement {
    const {
      items,
      children,
      backgroundColor,
      backgroundOpacity = 100,
    } = this.props;
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
                (item): React.ReactElement => {
                  const { state, label, title } = item;
                  return (
                    <ProgressTrackerItemComponent
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
  }
}

export default ProgressTracker;

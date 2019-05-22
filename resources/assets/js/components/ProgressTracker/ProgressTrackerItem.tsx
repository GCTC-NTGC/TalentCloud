import * as React from 'react';

interface ProgressTrackerItemProps {
  state: 'active' | 'complete' | 'error' | 'null';
  label: string;
  title: string;
}
const ProgressTrackerItem: React.FunctionComponent<
  ProgressTrackerItemProps
> = ({ label, title, state }): React.ReactElement => {
  return (
    <div
      className="tracker-item"
      data-tc-tracker-state={state}
      data-c-alignment="base(left)"
      data-c-grid="middle"
      data-c-margin="top(half) right(normal) bottom(half) left(normal)"
    >
      <div className="tracker-icon" data-c-color="white">
        {state === 'active' && <i className="fas fa-arrow-down" />}
        {state === 'complete' && <i className="fas fa-check" />}
        {state === 'error' && <i className="fas fa-exclamation-triangle" />}
      </div>
      <div className="tracker-title" data-c-color="black">
        <span data-c-font-size="small">{label}</span>
        <span data-c-font-weight="bold">{title}</span>
      </div>
    </div>
  );
};

export default ProgressTrackerItem;

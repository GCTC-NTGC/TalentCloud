import React from "react";
import { shallow } from "enzyme";
import ProgressTracker from "./ProgressTracker";
import { ProgressTrackerItem } from "./types";
import ProgressTrackerItemComponent from './ProgressTrackerItem';

const items: ProgressTrackerItem[] = [
  { state: 'active', label: 'Step 01', title: 'Job Info' },
  { state: 'complete', label: 'Step 02', title: 'Work Env.' },
  { state: 'error', label: 'Step 03', title: 'Impact' },
];

describe("Progress Tracker", (): void => {
  it("should render ProgressTracker with items", (): void => {
    const wrapper = shallow(<ProgressTracker items={items}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render ProgressTracker with children", (): void => {
    const wrapper = shallow(
    <ProgressTracker>
      <ProgressTrackerItemComponent {...items[0]} />
      <ProgressTrackerItemComponent {...items[1]} />
      <ProgressTrackerItemComponent {...items[2]} />
    </ProgressTracker>);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render ProgressTracker with background color and opacity", (): void => {
    const wrapper = shallow(
    <ProgressTracker backgroundColor={'black'} backgroundOpacity={'100'}>
      <ProgressTrackerItemComponent {...items[0]} />
    </ProgressTracker>);
    expect(wrapper).toMatchSnapshot();
  });
});

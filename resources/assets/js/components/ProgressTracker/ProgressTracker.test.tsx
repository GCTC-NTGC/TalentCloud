import React from "react";
import { shallow } from "enzyme";
import ProgressTracker from "./ProgressTracker";
import ProgressTrackerItem from "./ProgressTrackerItem";
import { items } from "./fixtures/progressItems";

describe("Progress Tracker", (): void => {
  it("should render ProgressTracker with items", (): void => {
    const wrapper = shallow(<ProgressTracker items={items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render ProgressTracker with children", (): void => {
    const wrapper = shallow(
      <ProgressTracker>
        <ProgressTrackerItem {...items[0]} />
        <ProgressTrackerItem {...items[1]} />
        <ProgressTrackerItem {...items[2]} />
      </ProgressTracker>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render ProgressTracker with background color and opacity", (): void => {
    const wrapper = shallow(
      <ProgressTracker backgroundColor="black" backgroundOpacity="100">
        <ProgressTrackerItem {...items[0]} />
      </ProgressTracker>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

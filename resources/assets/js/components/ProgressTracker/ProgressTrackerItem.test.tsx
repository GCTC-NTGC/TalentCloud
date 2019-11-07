import React from "react";
import { shallow } from "enzyme";
import ProgressTrackerItem from "./ProgressTrackerItem";
import { items } from "./fixtures/progressItems";
import ProgressTracker from "./ProgressTracker";

describe("Progress Tracker", (): void => {
  it("should render ProgressTrackerItem correctly", (): void => {
    const wrapper = shallow(
      <ProgressTracker>
        <ProgressTrackerItem {...items[0]} />
      </ProgressTracker>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import ProgressTrackerItem from "./ProgressTrackerItem";
import { items } from "./fixtures/progressItems";

describe("Progress Tracker", (): void => {
  it("should render ProgressTrackerItem correctly", (): void => {
    const wrapper = shallow(<ProgressTrackerItem {...items[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
});

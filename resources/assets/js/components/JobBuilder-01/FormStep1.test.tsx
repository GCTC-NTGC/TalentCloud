import React from "react";
import { shallow } from "enzyme";
import Step0Form, { Step0InnerForm } from "./FormStep1";

describe("Step0Form", (): void => {
  test("should render Step0Form correctly", (): void => {
    const wrapper = shallow(<Step0Form />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should update an input when it is changed", (): void => {
    const wrapper = shallow(<Step0Form />);
    // console.log(wrapper.find());
    wrapper
      .find(Step0InnerForm)
      .dive()
      .find("Field")
      .simulate("change", {
        persist: () => {},

        target: {
          name: "jobTitleEN",
          value: "Web developer",
        },
      });

    const newValue = wrapper
      .find(Step0InnerForm)
      .dive()
      .find("Field")
      .props().value;

    expect(newValue).toEqual("Web developer");
  });
});

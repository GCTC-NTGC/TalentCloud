import React from "react";
import { shallow } from "enzyme";
import IntroForm, { InnerIntroForm } from "./IntroForm";

describe("Step0Form", (): void => {
  test("should render Step0Form correctly", (): void => {
    const wrapper = shallow(<IntroForm />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should update an input when it is changed", (): void => {
    const wrapper = shallow(<IntroForm />);
    // console.log(wrapper.find());
    wrapper
      .find(InnerIntroForm)
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
      .find(InnerIntroForm)
      .dive()
      .find("Field")
      .props().value;

    expect(newValue).toEqual("Web developer");
  });
});

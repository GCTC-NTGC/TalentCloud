import React from "react";
import { shallow } from "enzyme";
import { crumbs } from "./fixtures/crumbs";
import BreadcrumbsItem from "./BreadcrumbsItem";

describe("Breadcrumbs", (): void => {
  it("should render BreadcrumbsItem correctly passing crumbs prop", (): void => {
    const wrapper = shallow(<BreadcrumbsItem {...crumbs[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
});

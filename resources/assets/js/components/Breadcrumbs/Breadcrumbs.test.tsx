import React from "react";
import { shallow } from "enzyme";
import Breadcrumbs from "./Breadcrumbs";
import { crumbs } from "./fixtures/crumbs";
import BreadcrumbsItem from "./BreadcrumbsItem";

describe("Breadcrumbs", (): void => {
  it("should render Breadcrumbs correctly passing crumbs prop", (): void => {
    const wrapper = shallow(<Breadcrumbs crumbs={crumbs} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Breadcrumbs correctly passing children", (): void => {
    const wrapper = shallow(
      <Breadcrumbs>
        <BreadcrumbsItem {...crumbs[0]} />
        <BreadcrumbsItem {...crumbs[1]} />
        <BreadcrumbsItem {...crumbs[2]} />
      </Breadcrumbs>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

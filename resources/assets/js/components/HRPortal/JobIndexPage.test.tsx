import React from "react";
import { shallow } from "enzyme";
import JobIndexPage from "./JobIndexPage";
import { jobActions, unclaimedJobs } from "./fixtures";

describe("Job Index Page", (): void => {
  it("should render JobIndexPage correctly", (): void => {
    const wrapper = shallow(
      <JobIndexPage
        jobActions={jobActions}
        unclaimedJobs={unclaimedJobs}
        departmentName="Treasury Board of Canada Secretariat"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render JobIndexPage without any items", (): void => {
    const wrapper = shallow(
      <JobIndexPage
        jobActions={[]}
        unclaimedJobs={[]}
        departmentName="Treasury Board of Canada Secretariat"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

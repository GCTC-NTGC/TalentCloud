import React from "react";
import { shallow } from "enzyme";
import JobIndexHr from "./JobIndexHr";
import { jobActions, unclaimedJobs } from "./fixtures";

describe("Job Index Page", (): void => {
  it("should render JobIndexHr correctly", (): void => {
    const wrapper = shallow(
      <JobIndexHr
        jobActions={jobActions}
        unclaimedJobs={unclaimedJobs}
        departmentName="Treasury Board of Canada Secretariat"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render JobIndexHr without any items", (): void => {
    const wrapper = shallow(
      <JobIndexHr
        jobActions={[]}
        unclaimedJobs={[]}
        departmentName="Treasury Board of Canada Secretariat"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

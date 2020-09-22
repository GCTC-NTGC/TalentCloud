import React from "react";
import { shallow } from "enzyme";
import JobWorkEnv from "./JobWorkEnv";
import fakeJob from "../../../fakeData/fakeJob";
import RootContainer from "../../RootContainer";

const handleSubmit = async (values) => {
  console.log("Handle Submit");
  return values;
};

const action = (text: string) => (): void => {
  console.log(text);
};

const promiseAction = (text: string) => async (): Promise<void> => {
  console.log(text);
};

describe("Job Index Page", (): void => {
  it("should render JobWorkEnv correctly", (): void => {
    const wrapper = shallow(
      <RootContainer>
        <JobWorkEnv
          job={fakeJob()}
          handleSubmit={handleSubmit}
          handleReturn={action("Save & Return")}
          handleModalConfirm={action("Confirm")}
          handleModalCancel={action("Cancel")}
          jobIsComplete
          handleSkipToReview={promiseAction("Skip to Review")}
        />
      </RootContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render JobWorkEnv without any job correctly", (): void => {
    const wrapper = shallow(
      <RootContainer>
        <JobWorkEnv
          job={null}
          handleSubmit={handleSubmit}
          handleReturn={action("Save & Return")}
          handleModalConfirm={action("Confirm")}
          handleModalCancel={action("Cancel")}
          jobIsComplete={false}
          handleSkipToReview={promiseAction("Skip to Review")}
        />
      </RootContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

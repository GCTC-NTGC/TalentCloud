import * as React from "react";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import Step3Form from "./Step3Form";

interface JobBuilder03Props {}

const JobBuilder03: React.FunctionComponent<
  JobBuilder03Props
> = (): React.ReactElement => {
  return (
    <section data-c-background="white(100)">
      <ProgressTracker
        items={items}
        backgroundColor="black"
        fontColor="white"
        classNames="manager-jpb-tracker"
        itemsWrapperClassNames="tracker manager-jpb-tracker-wrapper"
      />
      <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          Work Environment
        </h3>
        <p>
          Applicants care a lot about the team they’ll be working with and the
          physical workspace as well. Sharing information about these things
          help applicants determine if they’ll be a good fit, and can reduce the
          number of “wishful thinking” applications that slow down the screening
          process.
        </p>
        <div data-c-grid-item="base(1of1)">
          <h4 data-c-font-size="h4" data-c-margin="top(triple) bottom(normal)">
            Our Work Environment
          </h4>
          <p data-c-margin="bottom(normal)">
            Share a little about your physical space, the technology used by
            your team, and the amenities close to your office. Check all that
            apply.
          </p>
        </div>
        <Step3Form />
      </div>
    </section>
  );
};

export default JobBuilder03;

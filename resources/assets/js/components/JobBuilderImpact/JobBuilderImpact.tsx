import * as React from "react";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
// import Step4Form from "./Step4Form";

interface JobBuilderImpactProps {}

const JobBuilderImpact: React.FunctionComponent<
  JobBuilderImpactProps
> = (): React.ReactElement => {
  return (
    <section>
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
          Create an Impact Statement
        </h3>
        <ul data-c-margin="bottom(double)">
          <li>
            Working in the federal government offers an important opportunity to
            have a broad impact for Canadians.
          </li>
          <li>
            This is your chance to highlight what makes your work valuable and
            interesting.
          </li>
          <li>
            Your impact statement is the first thing that applicants will see
            when they click your job poster so make sure it counts!
          </li>
        </ul>
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          How our department makes an impact:
        </p>
        {/* <!-- The p tag below is where the dynamic department text goes (I used text from an old job poster as placeholder, but the real list of data is in the issue. --> */}
        <p data-c-margin="bottom(double)">
          The Navigable Waters Act Renewal team is responsible for the
          implementation of the electronic system related to the Canadian
          Navigable Waters Act (CNWA). This work will help the Government of
          Canada to modernize environment and regulatory processes and introduce
          new processes that properly serve the public.
        </p>
        <form data-c-grid="gutter">
          <div data-c-grid-item="base(1of1)" data-c-input="textarea">
            <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
              How our team makes an impact:
            </p>
            <p data-c-margin="bottom(normal)">
              Describe the value your team/service/initiative brings to
              Canadians. It doesn’t matter if your work is direct to citizens or
              back office, innovative or maintenance, top priority or ongoing.
              Describe how it contributes to making Canada better the way you
              would to someone who knows nothing about your work.
            </p>
            <label htmlFor="builder04TeamImpact">Team Impact Statement</label>
            <span>Required</span>
            <div>
              <textarea
                id="builder04TeamImpact"
                placeholder="Try for a casual, frank, friendly tone..."
                required
              />
            </div>
            <span>This input has an error.</span>
          </div>
          <div data-c-grid-item="base(1of1)" data-c-input="textarea">
            <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
              How the new hire makes an impact:
            </p>
            <p data-c-margin="bottom(normal)">
              Describe how the new hire will contribute in this role. Focus on
              the value they’ll bring, not on specific tasks (you’ll provide
              these later on). For example “In this role, you’ll contribute to…”
              or, “As a member of this team, you’ll be responsible for helping
              us…”
            </p>
            <label htmlFor="builder04HireImpact">Team Impact Statement</label>
            <span>Required</span>
            <div>
              <textarea
                id="builder04HireImpact"
                placeholder="Remember, don't use Government speak..."
                required
              />
            </div>
            <span>This input has an error.</span>
          </div>
          <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
            {/* <!-- Modal trigger, same as last step. --> */}
            <button
              data-c-button="solid(c1)"
              data-c-dialog-action="open"
              data-c-dialog-id="example-dialog-01"
              data-c-radius="rounded"
              type="button"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobBuilderImpact;

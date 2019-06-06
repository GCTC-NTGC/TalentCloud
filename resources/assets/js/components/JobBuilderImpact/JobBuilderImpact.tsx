import * as React from "react";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import ImpactForm from "./ImpactForm";

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
        <ImpactForm />
      </div>
    </section>
  );
};

export default JobBuilderImpact;

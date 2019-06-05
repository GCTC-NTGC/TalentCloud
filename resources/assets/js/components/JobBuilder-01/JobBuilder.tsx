import * as React from "react";
import ReactDOM from "react-dom";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import Step0Form from "./Step0Form";

interface JobBuilderProps {}

const JobBuilder: React.FunctionComponent<
  JobBuilderProps
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
          data-c-margin="bottom(normal)"
        >
          Welcome to the Job Poster Builder
        </h3>
        <p data-c-margin="bottom(normal)">
          This tool will help you create a job poster that attracts the right
          talent.
        </p>
        <p data-c-margin="bottom(double)">
          We’ve also provided instructions and examples to help guide you
          through the process but if you still have questions, contact{" "}
          <a
            href="mailto:talent.cloud-nuage.de.talents@tbs-sct.gc.ca"
            title="Email Talent Cloud."
          >
            Talent Cloud
          </a>
        </p>
        <h4
          data-c-colour="c3"
          data-c-font-size="h4"
          data-c-margin="bottom(double)"
        >
          Before we get started please review your information.
        </h4>
        <Step0Form />
      </div>
    </section>
  );
};

if (document.getElementById("job-builder-form-0")) {
  const rootEl = document.getElementById("job-builder-form-0");
  ReactDOM.render(<Step0Form />, rootEl);
}

export default JobBuilder;

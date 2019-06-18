import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import WorkEnvForm from "./WorkEnvForm";

interface JobBuilderWorkEnvProps {}

const JobBuilderWorkEnv: React.FunctionComponent<
  JobBuilderWorkEnvProps & InjectedIntlProps
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
          <FormattedMessage
            id="jobBuilder.workEnv.title"
            defaultMessage="Work Environment"
            description="Header of job poster builder work environment step."
          />
        </h3>
        <p>
          <FormattedMessage
            id="jobBuilder.workEnv.stepDescription"
            defaultMessage="Applicants care a lot about the team they’ll be working with and the physical workspace as well. Sharing information about these things help applicants determine if they’ll be a good fit, and can reduce the number of “wishful thinking” applications that slow down the screening process."
            description="Description of job poster builder work environment step."
          />
        </p>
        <div data-c-grid-item="base(1of1)">
          <h4 data-c-font-size="h4" data-c-margin="top(triple) bottom(normal)">
            <FormattedMessage
              id="jobBuilder.workEnv.ourWorkEnv"
              defaultMessage="Our Work Environment"
              description="Section 1 of job poster builder work environment step."
            />
          </h4>
          <p data-c-margin="bottom(normal)">
            <FormattedMessage
              id="jobBuilder.workEnv.ourWorkEnvSubtext"
              defaultMessage="Share a little about your physical space, the technology used by your team, and the amenities close to your office. Check all that apply."
              description="Section 1 subtext of job poster builder work environment step."
            />
          </p>
        </div>
        <WorkEnvForm />
      </div>
    </section>
  );
};

export default injectIntl(JobBuilderWorkEnv);

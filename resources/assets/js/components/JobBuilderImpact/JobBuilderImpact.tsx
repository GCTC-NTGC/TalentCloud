import * as React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import ProgressTracker from "../ProgressTracker/ProgressTracker";
import { items } from "../ProgressTracker/fixtures/progressItems";
import ImpactForm from "./ImpactForm";

interface JobBuilderImpactProps {}

const JobBuilderImpact: React.FunctionComponent<
  JobBuilderImpactProps & InjectedIntlProps
> = ({ intl }): React.ReactElement => {
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
          <FormattedMessage
            id="jobBuilder.impact.title"
            defaultMessage="Create an Impact Statement"
            description="Header of Job Poster Builder Impact Step"
          />
        </h3>
        <ul data-c-margin="bottom(double)">
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.opportunity"
              defaultMessage="Working in the federal government offers an important opportunity to have a broad impact for Canadians."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.highlight"
              defaultMessage="This is your chance to highlight what makes your work valuable and interesting."
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
          <li>
            <FormattedMessage
              id="jobBuilder.impact.points.counts"
              defaultMessage="Your impact statement is the first thing that applicants will see when they click your job poster so make sure it counts!"
              description="Bullet Point on Job Poster Builder Impact Step"
            />
          </li>
        </ul>
        <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
          <FormattedMessage
            id="jobBuilder.impact.header.department"
            defaultMessage="How our department makes an impact:"
            description="Header of Department Impact Section on Job Poster Builder Impact Step"
          />
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

export default injectIntl(JobBuilderImpact);

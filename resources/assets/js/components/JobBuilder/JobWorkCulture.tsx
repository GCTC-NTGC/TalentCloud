import React from "react";
import {
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
  injectIntl,
} from "react-intl";
import { Job } from "../../models/types";
import {
  frequencyName,
  travelRequirementDescription,
  overtimeRequirementDescription,
} from "../../models/localizedConstants";

interface JobWorkCultureProps {
  job: Job;
}

const remoteWorkMessages = defineMessages({
  always: {
    id: "jobBuilder.workCulture.remoteWorkMsg.always",
    defaultMessage: "Always",
    description:
      "Shown on Work Culture card when remoteWork field is set to true.",
  },
  never: {
    id: "jobBuilder.workCulture.remoteWorkMsg.never",
    defaultMessage: "Never",
    description:
      "Shown on Work Culture card when remoteWork field is set to false.",
  },
});

export const JobWorkCulture: React.FunctionComponent<JobWorkCultureProps &
  WrappedComponentProps> = ({ job, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const remoteWork = intl.formatMessage(
    job.remote_work_allowed
      ? remoteWorkMessages.always
      : remoteWorkMessages.never,
  );
  const telework = job.telework_allowed_frequency_id
    ? intl.formatMessage(frequencyName(job.telework_allowed_frequency_id))
    : "";
  const flexHours = job.flexible_hours_frequency_id
    ? intl.formatMessage(frequencyName(job.flexible_hours_frequency_id))
    : "";
  const travel = job.travel_requirement_id
    ? intl.formatMessage(
        travelRequirementDescription(job.travel_requirement_id),
      )
    : "";
  const overtime = job.overtime_requirement_id
    ? intl.formatMessage(
        overtimeRequirementDescription(job.overtime_requirement_id),
      )
    : "";
  return (
    <div data-c-grid="gutter">
      <div data-c-grid-item="tp(1of2) ds(1of3)">
        <p data-c-colour="c2" data-c-margin="top(quarter)">
          <FormattedMessage
            id="jobBuilder.workCulture.remoteWork"
            defaultMessage="Remote Work"
            description="Label for the Remote Work field on the Work Culture card."
          />
        </p>
        <p
          data-c-font-size="small"
          data-c-colour="grey"
          data-c-margin="bottom(half)"
        >
          <FormattedMessage
            id="jobBuilder.workCulture.remoteWorkDescription"
            defaultMessage="Work from anywhere, all the time."
            description="Explanation of what Remote Work means."
          />
        </p>
        <p>{remoteWork}</p>
      </div>
      <div data-c-grid-item="tp(1of2) ds(1of3)">
        <p data-c-colour="c2" data-c-margin="top(quarter)">
          <FormattedMessage
            id="jobBuilder.workCulture.telework"
            defaultMessage="Telework"
            description="Label for the Telework field on the Work Culture card."
          />
        </p>
        <p
          data-c-font-size="small"
          data-c-colour="grey"
          data-c-margin="bottom(half)"
        >
          <FormattedMessage
            id="jobBuilder.workCulture.teleworkDescription"
            defaultMessage="Work from home somedays (within driving distance of the office)."
            description="Explanation of what Telework means."
          />
        </p>
        <p>{telework}</p>
      </div>
      <div data-c-grid-item="tp(1of2) ds(1of3)">
        <p data-c-colour="c2" data-c-margin="top(quarter)">
          <FormattedMessage
            id="jobBuilder.workCulture.flexibleHours"
            defaultMessage="Flexible Hours"
            description="Label for the Flexible Hours field on the Work Culture card."
          />
        </p>
        <p
          data-c-font-size="small"
          data-c-colour="grey"
          data-c-margin="bottom(half)"
        >
          <FormattedMessage
            id="jobBuilder.workCulture.flexibleHoursDescription"
            defaultMessage="Set your own start and end times."
            description="Explanation of what Flexible Hours means."
          />
        </p>
        <p>{flexHours}</p>
      </div>
      <div data-c-grid-item="tp(1of2) ds(1of3)">
        <p data-c-colour="c2" data-c-margin="top(quarter)">
          <FormattedMessage
            id="jobBuilder.workCulture.travel"
            defaultMessage="Travel"
            description="Label for the Travel field on the Work Culture card."
          />
        </p>
        <p
          data-c-font-size="small"
          data-c-colour="grey"
          data-c-margin="bottom(half)"
        >
          <FormattedMessage
            id="jobBuilder.workCulture.travelDescription"
            defaultMessage="See more of Canada or the world."
            description="Explanation of what Travel means."
          />
        </p>
        <p>{travel}</p>
      </div>
      <div data-c-grid-item="tp(1of2) ds(1of3)">
        <p data-c-colour="c2" data-c-margin="top(quarter)">
          <FormattedMessage
            id="jobBuilder.workCulture.overtime"
            defaultMessage="Overtime"
            description="Label for the Overtime field on the Work Culture card."
          />
        </p>
        <p
          data-c-font-size="small"
          data-c-colour="grey"
          data-c-margin="bottom(half)"
        >
          <FormattedMessage
            id="jobBuilder.workCulture.overtimeDescription"
            defaultMessage="Work extra hours in the evenings/on weekends."
            description="Explanation of what Overtime means."
          />
        </p>
        <p>{overtime}</p>
      </div>
    </div>
  );
};

export default injectIntl(JobWorkCulture);

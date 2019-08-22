import React from "react";
import {
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
  injectIntl,
} from "react-intl";
import { Job } from "../../models/types";
import {
  securityClearance,
  languageRequirement,
  provinceName,
} from "../../models/localizedConstants";

interface JobBasicInfoProps {
  job: Job;
}

const messages = defineMessages({
  termLength: {
    id: "jobPreview.termLength",
    defaultMessage:
      "{termMonths, plural, =0 {no months} one {# month} other {# months}}",
    description: "Calculated term length in months",
  },
});

export const JobBasicInfo: React.FunctionComponent<
  JobBasicInfoProps & InjectedIntlProps
> = ({ job, intl }): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const { title, city } = job[locale];
  const termLength = job.term_qty || 0;
  const securityLevel = job.security_clearance_id
    ? intl.formatMessage(securityClearance(job.security_clearance_id))
    : "";
  const language = job.language_requirement_id
    ? intl.formatMessage(languageRequirement(job.language_requirement_id))
    : "";
  const province = job.province_id
    ? intl.formatMessage(provinceName(job.province_id))
    : "";

  return (
    <div data-c-grid="gutter">
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.jobTitle"
            defaultMessage="Job Title"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>{title}</p>
      </div>
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.lengthOfTheTerm"
            defaultMessage="Length of the Term"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>
          {intl.formatMessage(messages.termLength, {
            termMonths: termLength,
          })}
        </p>
      </div>
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.securityClearance"
            defaultMessage="Security Clearance"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>{securityLevel}</p>
      </div>
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.languageProfile"
            defaultMessage="Language Profile"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>{language}</p>
      </div>
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.city"
            defaultMessage="City"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>{city}</p>
      </div>
      <div data-c-grid-item="tp(1of2)">
        <p data-c-colour="c3" data-c-margin="bottom(quarter)">
          <FormattedMessage
            id="jobPreview.province"
            defaultMessage="Province"
            description="Job Poster Card Information Label"
          />
        </p>
        <p>{province}</p>
      </div>
    </div>
  );
};

export default injectIntl(JobBasicInfo);

import React from "react";
import {
  injectIntl,
  InjectedIntlProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";

export interface JobPreviewProps {
  /** Title of the Job Poster */
  title: string;
  /** Department of the manager that created the poster */
  department: string;
  /** City for the Job Poster */
  city: string;
  /** Province for the Job Poster */
  province: string;
  /** If this Job Poster allows remote work */
  remoteWork?: boolean;
  /** Language requirement, i.e. English Essential */
  language: string;
  /** Length of the Job term in months */
  termLength: number;
  /** Security level required for the posting, i.e. reliability */
  securityLevel: string;
  /** Government classification code for the position, i.e. CS */
  classification: string;
  /** Level for the classification, i.e. 03 */
  level: string;
  /** How often are Flex Hours allowed */
  flexHours: string;
  // Description of Required Education
  education: string;
  // Telework is allowed
  telework: string;
  // Travel opportunities;
}

const messages = defineMessages({
  allowed: {
    id: "jobPreview.remoteWork.allowed",
    defaultMessage: "Allowed",
    description: "Remote Work Permission.",
  },
  notAllowed: {
    id: "jobPreview.remoteWork.notAllowed",
    defaultMessage: "Not Allowed",
    description: "Remote World Permission",
  },
  teleworkNever: {
    id: "jobPreview.telework.never",
    defaultMessage: "Never",
    description: "Telework Frequency",
  },
  teleworkOccasionally: {
    id: "jobPreview.telework.occasionally",
    defaultMessage: "Occasionally",
    description: "Telework Frequency",
  },
  teleworkSometimes: {
    id: "jobPreview.telework.sometimes",
    defaultMessage: "Sometimes",
    description: "Telework Frequency",
  },
  teleworkFrequently: {
    id: "jobPreview.telework.frequently",
    defaultMessage: "Frequently",
    description: "Telework Frequency",
  },
  teleworkAlways: {
    id: "jobPreview.telework.always",
    defaultMessage: "Always",
    description: "Telework Frequency",
  },
  flexHoursNever: {
    id: "jobPreview.flexHours.never",
    defaultMessage: "Never",
    description: "Flex Hours Frequency",
  },
  flexHoursOccasionally: {
    id: "jobPreview.flexHours.occasionally",
    defaultMessage: "Occasionally",
    description: "Flex Hours Frequency",
  },
  flexHoursSometimes: {
    id: "jobPreview.flexHours.sometimes",
    defaultMessage: "Sometimes",
    description: "Flex Hours Frequency",
  },
  flexHoursFrequently: {
    id: "jobPreview.flexHours.frequently",
    defaultMessage: "Frequently",
    description: "Flex Hours Frequency",
  },
  flexHoursAlways: {
    id: "jobPreview.flexHours.always",
    defaultMessage: "Always",
    description: "Flex Hours Frequency",
  },
  termLength: {
    id: "jobPreview.termLength",
    defaultMessage:
      "{termMonths, plural, =0 {no months} one {# month} other {# months}}",
    description: "Calculated term lenght in months",
  },
});

const JobPreview: React.FunctionComponent<
  JobPreviewProps & InjectedIntlProps
> = ({
  title,
  department,
  city,
  education,
  province,
  flexHours,
  remoteWork,
  language,
  termLength,
  securityLevel,
  classification,
  telework,
  level,
  intl,
}: JobPreviewProps & InjectedIntlProps): React.ReactElement => {
  return (
    <div
      className="manager-job-card"
      data-c-background="white(100)"
      data-c-padding="normal"
      data-c-radius="rounded"
    >
      <h4
        data-c-border="bottom(thin, solid, black)"
        data-c-font-size="h4"
        data-c-font-weight="600"
        data-c-margin="bottom(normal)"
        data-c-padding="bottom(normal)"
      >
        <FormattedMessage
          id="jobPreview.jobInformation"
          defaultMessage="Job Information"
          description="Section Header for basic information"
        />
      </h4>
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
      <h4
        data-c-border="bottom(thin, solid, black)"
        data-c-font-size="h4"
        data-c-font-weight="600"
        data-c-margin="top(double) bottom(normal)"
        data-c-padding="bottom(normal)"
      >
        <FormattedMessage
          id="jobPreview.classificationEducation"
          defaultMessage="Classification &amp; Education"
          description="Section Header"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.classification"
              defaultMessage="Classification"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{classification}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.level"
              defaultMessage="Level"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{level}</p>
        </div>
        <div data-c-grid-item="base(1of1)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.education"
              defaultMessage="Education"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{education}</p>
        </div>
      </div>
      <h4
        data-c-border="bottom(thin, solid, black)"
        data-c-font-size="h4"
        data-c-font-weight="600"
        data-c-margin="top(double) bottom(normal)"
        data-c-padding="bottom(normal)"
      >
        <FormattedMessage
          id="jobPreview.workStyles"
          defaultMessage="Work Styles"
          description="Section Header"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.remoteWork"
              defaultMessage="Remote Work"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>
            {remoteWork
              ? intl.formatMessage(messages.allowed)
              : intl.formatMessage(messages.notAllowed)}
            {/* TODO: Add long form text explanation of Remote Work Status */}
            {/* eg. Yes, I’m willing to supervise employees in any province or territory
            in Canada. */}
          </p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.telework"
              defaultMessage="Telework"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{intl.formatMessage(messages[telework])}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.flexibleHours"
              defaultMessage="Flexible Hours"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{intl.formatMessage(messages[flexHours])}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.travel"
              defaultMessage="Travel"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>Not yet implemented.</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.overtime"
              defaultMessage="Overtime"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>Not yet implemented.</p>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(JobPreview);

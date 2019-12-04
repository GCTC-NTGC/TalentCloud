import React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
} from "react-intl";
import textToParagraphs from "../helpers/textToParagraphs";

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
  remoteWork: string | null;
  /** Language requirement, i.e. English Essential */
  language: string;
  /** Length of the Job term in months */
  termLength: number | null;
  /** Security level required for the posting, i.e. reliability */
  securityLevel: string;
  /** Government classification code for the position, i.e. CS */
  classification: string;
  /** Level for the classification, i.e. 03 */
  level: string;
  /** How often Flex Hours are allowed */
  flexHours: string;
  /** Description of Required Education */
  education: string;
  /** How often Teleworking is allowed */
  telework: string;
  /** Travel opportunities */
  travel: string | null;
  /** Frequency of Overtime expected */
  overtime: string | null;
}

const messages = defineMessages({
  termLength: {
    id: "jobBuilder.preview.termLength",
    defaultMessage:
      "{termMonths, plural, =0 {no months} one {# month} other {# months}}",
    description: "Calculated term length in months",
  },
});

const JobPreview: React.FunctionComponent<JobPreviewProps &
  WrappedComponentProps> = ({
  title,
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
  travel,
  overtime,
  level,
  intl,
}: JobPreviewProps & WrappedComponentProps): React.ReactElement => {
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
          id="jobBuilder.preview.jobInformation"
          defaultMessage="Job Information"
          description="Section Header for basic information"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.jobTitle"
              defaultMessage="Job Title"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{title}</p>
        </div>
        {termLength && (
          <div data-c-grid-item="tp(1of2)">
            <p data-c-colour="c3" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.preview.lengthOfTheTerm"
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
        )}
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.securityClearance"
              defaultMessage="Security Clearance"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{securityLevel}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.languageProfile"
              defaultMessage="Language Profile"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{language}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.city"
              defaultMessage="City"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{city}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.province"
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
          id="jobBuilder.preview.classificationEducation"
          defaultMessage="Classification &amp; Education"
          description="Section Header"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.classification"
              defaultMessage="Classification"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{classification}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.level"
              defaultMessage="Level"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{level}</p>
        </div>
        <div data-c-grid-item="base(1of1)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.education"
              defaultMessage="Education"
              description="Job Poster Card Information Label"
            />
          </p>
          {textToParagraphs(education)}
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
          id="jobBuilder.preview.workStyles"
          defaultMessage="Work Styles"
          description="Section Header"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.remoteWork"
              defaultMessage="Remote Work"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{remoteWork}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.telework"
              defaultMessage="Telework"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{telework}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c3" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobBuilder.preview.flexibleHours"
              defaultMessage="Flexible Hours"
              description="Job Poster Card Information Label"
            />
          </p>
          <p>{flexHours}</p>
        </div>
        {travel && (
          <div data-c-grid-item="tp(1of2)">
            <p data-c-colour="c3" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.preview.travel"
                defaultMessage="Travel"
                description="Job Poster Card Information Label"
              />
            </p>
            <p>{travel}</p>
          </div>
        )}
        {overtime && (
          <div data-c-grid-item="tp(1of2)">
            <p data-c-colour="c3" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.preview.overtime"
                defaultMessage="Overtime"
                description="Job Poster Card Information Label"
              />
            </p>
            <p>{overtime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(JobPreview);

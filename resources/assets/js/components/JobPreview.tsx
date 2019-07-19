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
}

const JobPreview: React.FunctionComponent<
  JobPreviewProps & InjectedIntlProps
> = ({
  title,
  department,
  city,
  province,
  flexHours,
  remoteWork,
  language,
  termLength,
  securityLevel,
  classification,
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
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(half)"
      >
        {title}
      </h3>
      <p data-c-font-size="h4" data-c-margin="bottom(normal)">
        {department}
      </p>
      <p data-c-margin="bottom(half)">
        <i
          data-c-colour="c1"
          className="fas fa-map-marker-alt"
          title="Location Icon."
        >
          &nbsp;&nbsp;
        </i>
        {city}, {province}
      </p>
      {remoteWork && (
        <p>
          <i
            data-c-colour="c1"
            className="fas fa-home"
            title="Remote Work Icon."
          >
            &nbsp;&nbsp;
          </i>
          {remoteWork}
          {/* TODO: Should display allows or not allowed based on the Boolean */}
        </p>
      )}
      <h4
        data-c-font-size="h4"
        data-c-font-weight="600"
        data-c-margin="top(double) bottom(normal)"
        data-c-border="bottom(thin, solid, black)"
        data-c-padding="bottom(normal)"
      >
        <FormattedMessage
          id="jobPreview.basicInformation"
          defaultMessage="Basic Information"
          description="Section Header for basic information"
        />
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.lengthOfTheTerm"
              defaultMessage="Length of the Term"
              description="Datum Label"
            />
          </p>
          <p>{termLength} Months</p>
          {/* TODO: And proper language conversion */}
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.languageProfile"
              defaultMessage="Language Profile"
              description="Datum Label"
            />
          </p>
          <p>{language}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.securityClearance"
              defaultMessage="Security Clearance"
              description="Datum Label"
            />
          </p>
          <p>{securityLevel}</p>
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
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.classification"
              defaultMessage="Classification"
              description="Datum Label"
            />
          </p>
          <p>{classification}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.level"
              defaultMessage="Level"
              description="Datum Label"
            />
          </p>
          <p>{level}</p>
        </div>
        <div data-c-grid-item="base(1of1)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            <FormattedMessage
              id="jobPreview.education"
              defaultMessage="Education"
              description="Datum Label"
            />
          </p>
          <p>
            A secondary school diploma; or
            <br />
            <br />
            Equivalent Experience:
            <br />
            If you have on-the-job learning or other non-conventional training
            that you believe is equivalent to the secondary school diploma, put
            it forward for consideration. The manager may accept a combination
            of education, training and/or experience in a related field as an
            alternative to the minimum education requirement stated above.
          </p>
        </div>
      </div>
      <h4
        data-c-border="bottom(thin, solid, black)"
        data-c-font-size="h4"
        data-c-font-weight="600"
        data-c-margin="top(double) bottom(normal)"
        data-c-padding="bottom(normal)"
      >
        Work Styles
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Remote Work
          </p>
          <p>
            Yes, I’m willing to supervise employees in any province or territory
            in Canada.
          </p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Telework
          </p>
          <p>Almost Always</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Flexible Hours
          </p>
          <p>{flexHours}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Travel
          </p>
          <p>Travel Opportunities Available</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Overtime
          </p>
          <p>No Overtime Required</p>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(JobPreview);

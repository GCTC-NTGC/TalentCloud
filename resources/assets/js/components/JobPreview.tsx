import React from "react";

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
  /** Salary for the Job Poster */
  salary?: string;
  /** Language requirement, i.e. English Essential */
  language: string;
  /** Length of the Job term in months */
  termLength: number;
  /** Security level required for the posting, i.e. reliability */
  securityLevel: string;
  /** Date the position begins */
  startDate?: string;
  /** Government classification code for the position, i.e. CS */
  classification: string;
  /** Level for the classification, i.e. 03 */
  level: string;
}

const JobPreview: React.FunctionComponent<JobPreviewProps> = ({
  title,
  department,
  city,
  province,
  remoteWork,
  salary,
  language,
  termLength,
  securityLevel,
  startDate,
  classification,
  level,
}: JobPreviewProps): React.ReactElement => {
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
          Remote Work Allowed
        </p>
      )}
      <h4
        data-c-font-size="h4"
        data-c-font-weight="bold"
        data-c-margin="top(double) bottom(normal)"
      >
        Basic Information
      </h4>
      <div data-c-grid="gutter">
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Average Annual Salary
          </p>
          <p>{salary || "Talent Cloud will add this."}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Language Profile
          </p>
          <p>{language}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Duration
          </p>
          <p>{termLength} Months</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Security Clearance
          </p>
          <p>{securityLevel}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Target Start Date
          </p>
          <p>{startDate || "This comes later."}</p>
        </div>
        <div data-c-grid-item="tp(1of2)">
          <p data-c-colour="c1" data-c-margin="bottom(quarter)">
            Government Classification
          </p>
          <p>
            {classification}-{level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPreview;

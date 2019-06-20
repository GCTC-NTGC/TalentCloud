import React from "react";

interface JobPreviewProps {
  title: string;
  department: string;
  city: string;
  province: string;
  remoteWork?: boolean;
  salary?: string;
  language: string;
  termLength: number;
  securityLevel: string;
  startDate?: string;
  classification: string;
  level: string;
}

const JobPreview = ({
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

import React from "react";

interface JobImpactPreviewProps {
  deptImpact: string;
  teamImpact: string;
  hireImpact: string;
}

const JobImpactPreview = ({
  deptImpact,
  teamImpact,
  hireImpact,
}: JobImpactPreviewProps): React.ReactElement => {
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
        Impact
      </h4>
      <p data-c-margin="bottom(normal)">{deptImpact}</p>
      <p data-c-margin="bottom(normal)">{teamImpact}</p>
      <p>{hireImpact}</p>
    </div>
  );
};

export default JobImpactPreview;

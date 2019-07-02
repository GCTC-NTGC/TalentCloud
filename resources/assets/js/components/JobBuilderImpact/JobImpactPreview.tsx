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
      <p data-c-margin="bottom(normal)">
        The Navigable Waters Act Renewal team is responsible for the
        implementation of the electronic system related to the Canadian
        Navigable Waters Act (CNWA). This work will help the Government of
        Canada to modernize environment and regulatory processes and introduce
        new processes that properly serve the public.
      </p>
      <p data-c-margin="bottom(normal)">
        Canada’s large network of navigable waters must remain open for
        Canadians to use. Protecting the public right of navigation is an
        important element of the new environmental and regulatory system in
        which good projects go ahead sustainably, with certainty and timely
        decisions, creating shared value and benefit for Canadians. The
        Navigable Waters Act Renewal (NWAR) team will play a key part in helping
        achieve this goal.
      </p>
      <p>
        As a member of a dynamic SCRUM team you’ll be responsible for
        implementing a new online public registry so Canadians can access
        information on proposed projects in their communities. You’ll also
        participate in the implementation of an internal system to manage the
        proposed work and will collaborate with other agencies involved in the
        CNWA.
      </p>
    </div>
  );
};

export default JobImpactPreview;

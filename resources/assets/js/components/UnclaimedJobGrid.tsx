import * as React from "react";
import UnclaimedJobCard, { UnclaimedJob } from "./UnclaimedJobCard";

interface UnclaimedJobGridProps {
  unclaimedJobs: UnclaimedJob[];
  children?: React.ReactNode;
}

const UnclaimedJobGrid: React.FunctionComponent<UnclaimedJobGridProps> = ({
  unclaimedJobs,
  children,
}) => {
  return (
    <div data-c-grid="gutter">
      {unclaimedJobs &&
        unclaimedJobs.map(
          ({
            title,
            createdAt,
            status,
            hiringManagers,
            hrAdvisors,
          }): React.ReactElement => {
            return (
              <UnclaimedJobCard
                key={title}
                title={title}
                createdAt={createdAt}
                status={status}
                hiringManagers={hiringManagers}
                hrAdvisors={hrAdvisors}
              />
            );
          },
        )}
      {children}
    </div>
  );
};

export default UnclaimedJobGrid;

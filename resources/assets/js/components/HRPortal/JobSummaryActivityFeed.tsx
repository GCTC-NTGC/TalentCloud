import * as React from "react";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import CommentForm from "../CommentForm";
import ActivityList from "../ActivityList";
import { LocationId } from "../../models/lookupConstants";
import { Portal } from "../../models/app";

interface JobSummaryActivityFeedProps {
  jobId: number;
  portal: Portal;
}

const JobSummaryActivityFeed: React.FunctionComponent<JobSummaryActivityFeedProps> = ({
  jobId,
  portal,
}) => {
  return (
    <>
      <CommentForm
        jobId={jobId}
        isHrAdvisor={portal === "hr"}
        location={LocationId.summary}
      />
      <hr data-c-hr="thin(black)" data-c-margin="top(1)" />
      <ActivityList
        generalLocation={LocationId.summary}
        jobId={jobId}
        isHrAdvisor={portal === "hr"}
      />
    </>
  );
};

export default JobSummaryActivityFeed;

const container = document.getElementById("summary-hr-activity-feed");
if (container !== null) {
  if ("jobId" in container.dataset) {
    const jobId = Number(container.dataset.jobId as string);
    const portal = container.dataset.portal as Portal;
    ReactDOM.render(
      <RootContainer>
        <JobSummaryActivityFeed jobId={jobId} portal={portal} />
      </RootContainer>,
      container,
    );
  }
}

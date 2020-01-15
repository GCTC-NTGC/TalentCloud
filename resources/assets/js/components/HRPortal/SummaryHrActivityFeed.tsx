import * as React from "react";
import ReactDOM from "react-dom";
import RootContainer from "../RootContainer";
import CommentForm from "../CommentForm";
import ActivityFeed from "../ActivityFeed";
import { LocationId } from "../../models/lookupConstants";

interface SummaryHrActivityFeedProps {
  jobId: number;
}

const SummaryHrActivityFeed: React.FunctionComponent<SummaryHrActivityFeedProps> = ({
  jobId,
}) => {
  return (
    <>
      <CommentForm jobId={jobId} isHrAdviser location={LocationId.summary} />
      <hr data-c-hr="thin(black)" data-c-margin="top(1) left(2) right(2)" />
      <ActivityFeed jobId={jobId} isHrAdvisor />
    </>
  );
};

export default SummaryHrActivityFeed;

const container = document.getElementById("summary-hr-activity-feed");
if (container !== null) {
  if ("jobId" in container.dataset) {
    const jobId = Number(container.dataset.jobId as string);
    ReactDOM.render(
      <RootContainer>
        <SummaryHrActivityFeed jobId={jobId} />
      </RootContainer>,
      container,
    );
  }
}

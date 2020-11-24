import { ReviewStatusId } from "../models/lookupConstants";
import { ReviewStatus } from "../models/types";

export function fakeReviewStatuses(): ReviewStatus[] {
  return [
    { id: ReviewStatusId.ScreenedOut, name: "screened_out" },
    { id: ReviewStatusId.StillThinking, name: "still_thinking" },
    { id: ReviewStatusId.StillIn, name: "still_in" },
  ];
}

export default fakeReviewStatuses;

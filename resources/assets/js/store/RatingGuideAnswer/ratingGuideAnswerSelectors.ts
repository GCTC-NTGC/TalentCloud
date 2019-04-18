import { RootState } from "../store";
import { RatingGuideAnswerState } from "./ratingGuideAnswerReducer";
import { RatingsGuideAnswer } from "../../models/types";
import { getRatingsGuideQuestionsByJob } from "../RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getId } from "../../helpers/queries";

const stateSlice = (state: RootState): RatingGuideAnswerState =>
  state.ratingGuideAnswer;

export const getRatingsGuideAnswers = (
  state: RootState,
): RatingsGuideAnswer[] => Object.values(stateSlice(state).ratingsGuideAnswers);

export const getRatingsGuideAnswersByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideAnswer[] => {
  const questionIds = getRatingsGuideQuestionsByJob(state, jobId).map(getId);
  return getRatingsGuideAnswers(state).filter(
    (answer): boolean => questionIds.includes(answer.rating_guide_question_id),
  );
};

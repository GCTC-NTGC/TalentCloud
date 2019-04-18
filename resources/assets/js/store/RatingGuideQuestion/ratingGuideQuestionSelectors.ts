import { RootState } from "../store";
import { RatingGuideQuestionState } from "./ratingGuideQuestionReducer";
import { RatingsGuideQuestion } from "../../models/types";

const stateSlice = (state: RootState): RatingGuideQuestionState =>
  state.ratingGuideQuestion;

export const getRatingsGuideQuestions = (
  state: RootState,
): RatingsGuideQuestion[] =>
  Object.values(stateSlice(state).ratingsGuideQuestions);

export const getRatingsGuideQuestionsByJob = (
  state: RootState,
  jobId: number,
): RatingsGuideQuestion[] => {
  return getRatingsGuideQuestions(state).filter(
    (question): boolean => question.job_poster_id === jobId,
  );
};

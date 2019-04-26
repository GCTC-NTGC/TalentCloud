import { RootState } from "../store";
import { RatingGuideQuestionState } from "./ratingGuideQuestionReducer";
import { RatingGuideQuestion } from "../../models/types";

const stateSlice = (state: RootState): RatingGuideQuestionState =>
  state.ratingGuideQuestion;

export const getRatingGuideQuestions = (
  state: RootState,
): RatingGuideQuestion[] =>
  Object.values(stateSlice(state).ratingGuideQuestions);

export const getRatingGuideQuestionsByJob = (
  state: RootState,
  jobId: number,
): RatingGuideQuestion[] => {
  return getRatingGuideQuestions(state).filter(
    (question): boolean => question.job_poster_id === jobId,
  );
};

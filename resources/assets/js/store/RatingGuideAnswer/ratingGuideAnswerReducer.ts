import { RatingGuideAnswer } from "../../models/types";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface RatingGuideAnswerState {
  ratingGuideAnswers: {
    [id: number]: RatingGuideAnswer;
  };
}

export const initState = (): RatingGuideAnswerState => ({
  ratingGuideAnswers: {},
});

export const ratingGuideAnswerReducer = (
  state = initState(),
  action: AssessmentPlanAction,
): RatingGuideAnswerState => {
  switch (action.type) {
    case FETCH_ASSESSMENT_PLAN_STARTED:
      return state;
    case FETCH_ASSESSMENT_PLAN_SUCCEEEDED:
      return {
        ...state,
        ratingGuideAnswers: {
          ...state.ratingGuideAnswers,
          ...mapToObject(action.payload.ratingGuideAnswers, getId),
        },
      };
    case FETCH_ASSESSMENT_PLAN_FAILED:
      return state;
    default:
      return state;
  }
};

export default ratingGuideAnswerReducer;

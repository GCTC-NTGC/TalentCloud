import { RatingGuideQuestion } from "../../models/types";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface RatingGuideQuestionState {
  ratingGuideQuestions: {
    [id: number]: RatingGuideQuestion;
  };
}

export const initState = (): RatingGuideQuestionState => ({
  ratingGuideQuestions: {},
});

export const ratingGuideQuestionReducer = (
  state = initState(),
  action: AssessmentPlanAction,
): RatingGuideQuestionState => {
  switch (action.type) {
    case FETCH_ASSESSMENT_PLAN_STARTED:
      return state;
    case FETCH_ASSESSMENT_PLAN_SUCCEEEDED:
      return {
        ...state,
        ratingGuideQuestions: {
          ...state.ratingGuideQuestions,
          ...mapToObject(action.payload.ratingGuideQuestions, getId),
        },
      };
    case FETCH_ASSESSMENT_PLAN_FAILED:
      return state;
    default:
      return state;
  }
};

export default ratingGuideQuestionReducer;

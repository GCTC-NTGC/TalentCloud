import { RatingsGuideQuestion } from "../../models/types";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface RatingGuideQuestionState {
  ratingsGuideQuestions: {
    [id: number]: RatingsGuideQuestion;
  };
}

export const initState = (): RatingGuideQuestionState => ({
  ratingsGuideQuestions: {},
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
        ratingsGuideQuestions: {
          ...state.ratingsGuideQuestions,
          ...mapToObject(action.payload.ratingsGuideQuestions, getId),
        },
      };
    case FETCH_ASSESSMENT_PLAN_FAILED:
      return state;
    default:
      return state;
  }
};

export default ratingGuideQuestionReducer;

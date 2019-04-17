import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getId, mapToObject } from "../../helpers/queries";
import {
  AssessmentPlanAction,
  fetchAssessmentPlanStarted,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "./assessmentActions";

export interface AssessmentState {
  assessments: {
    [id: number]: Assessment;
  };
  ratingsGuideQuestions: {
    [id: number]: RatingsGuideQuestion;
  };
  ratingsGuideAnswers: {
    [id: number]: RatingsGuideAnswer;
  };
  updatingForJob: {
    [jobId: number]: boolean;
  };
}

export const initState = (): AssessmentState => ({
  assessments: {},
  ratingsGuideQuestions: {},
  ratingsGuideAnswers: {},
  updatingForJob: {},
});

export const assessmentReducer = (
  state = initState(),
  action: AssessmentPlanAction,
): AssessmentState => {
  switch (action.type) {
    case FETCH_ASSESSMENT_PLAN_STARTED:
      return {
        ...state,
        updatingForJob: {
          ...state.updatingForJob,
          [action.payload.jobId]: true,
        },
      };
    case FETCH_ASSESSMENT_PLAN_SUCCEEEDED:
      return {
        assessments: {
          ...state.assessments,
          ...mapToObject(action.payload.assessments, getId),
        },
        ratingsGuideQuestions: {
          ...state.ratingsGuideQuestions,
          ...mapToObject(action.payload.ratingsGuideQuestions, getId),
        },
        ratingsGuideAnswers: {
          ...state.ratingsGuideAnswers,
          ...mapToObject(action.payload.ratingsGuideAnswers, getId),
        },
        updatingForJob: {
          ...state.updatingForJob,
          [action.payload.jobId]: false,
        },
      };
    case FETCH_ASSESSMENT_PLAN_FAILED:
      return {
        ...state,
        updatingForJob: {
          ...state.updatingForJob,
          [action.payload.jobId]: false,
        },
      };
    default:
      return state;
  }
};

export default assessmentReducer;

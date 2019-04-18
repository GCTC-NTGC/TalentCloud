import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getId, mapToObject } from "../../helpers/queries";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
  UPDATE_ASSESSMENT_STARTED,
  UPDATE_ASSESSMENT_SUCCEEDED,
  UPDATE_ASSESSMENT_FAILED,
} from "./assessmentActions";

export interface AssessmentState {
  assessments: {
    [id: number]: Assessment;
  };
  assessmentUpdating: {
    [id: number]: boolean;
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
  assessmentUpdating: {},
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
        ...state,
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
    case UPDATE_ASSESSMENT_STARTED:
      return {
        ...state,
        assessmentUpdating: {
          ...state.assessmentUpdating,
          [action.payload.assessment.id]: true,
        },
      };
    case UPDATE_ASSESSMENT_SUCCEEDED:
      return {
        ...state,
        assessments: {
          ...state.assessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
        assessmentUpdating: {
          ...state.assessmentUpdating,
          [action.payload.assessment.id]: false,
        },
      };
    case UPDATE_ASSESSMENT_FAILED:
      // TODO: do something with error
      return {
        ...state,
        assessmentUpdating: {
          ...state.assessmentUpdating,
          [action.payload.assessmentId]: false,
        },
      };
    default:
      return state;
  }
};

export default assessmentReducer;

import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import {
  getId,
  mapToObject,
  deleteProperty,
  hasKey,
} from "../../helpers/queries";
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
  tempAssessments: {
    [id: number]: Assessment; // For storing edited assessments that haven't ben saved to server
  };
  assessmentUpdates: {
    [id: number]: number; // Tracks the number of pending updates
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
  tempAssessments: {},
  assessmentUpdates: {},
  ratingsGuideQuestions: {},
  ratingsGuideAnswers: {},
  updatingForJob: {},
});

/**
 * Return tempAssessments, with assessment removed if it is present and identical.
 * This is useful for not deleting a temp state when the first of several queued async updates completes.
 *
 */
const deleteAssessmentIfIdentical = (
  tempAssessments: { [id: number]: Assessment },
  assessment: Assessment,
): { [id: number]: Assessment } => {
  const { id } = assessment;
  if (hasKey(tempAssessments, id) && tempAssessments[id] === assessment) {
    return deleteProperty<Assessment>(tempAssessments, id);
  }
  return tempAssessments;
};

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
        tempAssessments: {
          ...state.tempAssessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
        assessmentUpdates: {
          ...state.assessmentUpdates,
          [action.payload.assessment.id]: 1,
        },
      };
    case UPDATE_ASSESSMENT_SUCCEEDED:
      return {
        ...state,
        assessments: {
          ...state.assessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
        tempAssessments: deleteAssessmentIfIdentical(
          state.tempAssessments,
          action.payload.assessment,
        ),
        assessmentUpdates: {
          ...state.assessmentUpdates,
          [action.payload.assessment.id]: 0,
        },
      };
    case UPDATE_ASSESSMENT_FAILED:
      // TODO: do something with error
      // TODO: should the temp state really be deleted?
      return {
        ...state,
        tempAssessments: deleteAssessmentIfIdentical(
          state.tempAssessments,
          action.payload.assessment,
        ),
        assessmentUpdates: {
          ...state.assessmentUpdates,
          [action.payload.assessment.id]: 0,
        },
      };
    default:
      return state;
  }
};

export default assessmentReducer;

import isEqual from "lodash/isEqual";
import {
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
  TempAssessment,
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
  EDIT_ASSESSMENT,
} from "./assessmentActions";

export interface AssessmentState {
  assessments: {
    // Stores assessments that are synced with the server
    [id: number]: Assessment;
  };
  editedAssessments: {
    // For storing assessments that have been edited locally
    [id: number]: Assessment;
  };
  tempAssessments: {
    // For storing local assessments that have never been saved to server
    [id: number]: TempAssessment;
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
  editedAssessments: {},
  tempAssessments: {},
  assessmentUpdates: {},
  ratingsGuideQuestions: {},
  ratingsGuideAnswers: {},
  updatingForJob: {},
});

/**
 * Return editedAssessments, with assessment removed if it is present and identical.
 * This is useful for not deleting a temp state when the first of several queued async updates completes.
 *
 */
const deleteEditedIfIdentical = (
  editedAssessments: { [id: number]: Assessment },
  assessment: Assessment,
): { [id: number]: Assessment } => {
  const { id } = assessment;
  if (
    hasKey(editedAssessments, id) &&
    isEqual(editedAssessments[id], assessment)
  ) {
    return deleteProperty<Assessment>(editedAssessments, id);
  }
  return editedAssessments;
};

const incrementUpdates = (
  updates: { [id: number]: number },
  id: number,
): { [id: number]: number } => {
  const oldVal = hasKey(updates, id) ? updates[id] : 0;
  return {
    ...updates,
    [id]: oldVal + 1,
  };
};

const decrementUpdates = (
  updates: { [id: number]: number },
  id: number,
): { [id: number]: number } => {
  const oldVal = hasKey(updates, id) ? updates[id] : 0;
  const newVal = Math.max(oldVal - 1, 0); // update count cannot be less than 0.
  return {
    ...updates,
    [id]: newVal,
  };
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
    case EDIT_ASSESSMENT:
      return {
        ...state,
        editedAssessments: {
          ...state.editedAssessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
      };
    case UPDATE_ASSESSMENT_STARTED:
      return {
        ...state,
        assessmentUpdates: incrementUpdates(
          state.assessmentUpdates,
          action.payload.assessment.id,
        ),
      };
    case UPDATE_ASSESSMENT_SUCCEEDED:
      return {
        ...state,
        assessments: {
          ...state.assessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
        editedAssessments: deleteEditedIfIdentical(
          state.editedAssessments,
          action.payload.assessment,
        ),
        assessmentUpdates: decrementUpdates(
          state.assessmentUpdates,
          action.payload.assessment.id,
        ),
      };
    case UPDATE_ASSESSMENT_FAILED:
      // TODO: do something with error
      // TODO: should the temp state really be deleted?
      return {
        ...state,
        editedAssessments: deleteEditedIfIdentical(
          state.editedAssessments,
          action.payload.assessment,
        ),
        assessmentUpdates: decrementUpdates(
          state.assessmentUpdates,
          action.payload.assessment.id,
        ),
      };
    default:
      return state;
  }
};

export default assessmentReducer;

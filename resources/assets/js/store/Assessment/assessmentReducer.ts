import isEqual from "lodash/isEqual";
import { statement } from "@babel/template";
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
  STORE_NEW_ASSESSMENT_FAILED,
  STORE_NEW_ASSESSMENT_STARTED,
  STORE_NEW_ASSESSMENT_SUCCEEDED,
  CREATE_TEMP_ASSESSMENT,
  EDIT_TEMP_ASSESSMENT,
  DELETE_TEMP_ASSESSMENT,
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
  tempAssessmentSaving: {
    // Tracks whether a tempAssessment is currently being saved to server
    [id: number]: boolean;
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
  tempAssessmentSaving: {},
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

function hasIdenticalItem<T extends { id: number }>(
  items: { [id: number]: T },
  item: T,
): boolean {
  return hasKey(items, item.id) && isEqual(items[item.id]);
}

const addTempAssessment = (
  state: AssessmentState,
  criterionId: number,
  assessmentTypeId: number | null,
): AssessmentState => {
  const currentIds = Object.values(state.tempAssessments).map(getId);
  const newId = Math.max(...currentIds, 0) + 1;
  return {
    ...state,
    tempAssessments: {
      ...state.tempAssessments,
      [newId]: {
        id: newId,
        criterion_id: criterionId,
        assessment_type_id: assessmentTypeId,
      },
    },
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
    case CREATE_TEMP_ASSESSMENT:
      return addTempAssessment(
        state,
        action.payload.criterionId,
        action.payload.assessmentTypeId,
      );
    case EDIT_TEMP_ASSESSMENT:
      return {
        ...state,
        tempAssessments: {
          ...state.tempAssessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
      };
    case DELETE_TEMP_ASSESSMENT:
      return {
        ...state,
        tempAssessments: deleteProperty<TempAssessment>(
          state.tempAssessments,
          action.payload.id,
        ),
      };
    case STORE_NEW_ASSESSMENT_STARTED:
      return {
        ...state,
        tempAssessmentSaving: {
          ...state.tempAssessmentSaving,
          [action.payload.assessment.id]: true,
        },
      };
    case STORE_NEW_ASSESSMENT_SUCCEEDED:
      return {
        ...state,
        assessments: {
          ...state.assessments,
          [action.payload.assessment.id]: action.payload.assessment,
        },
        tempAssessmentSaving: deleteProperty<boolean>(
          state.tempAssessmentSaving,
          action.payload.oldAssessment.id,
        ),
        // If temp assessment differs from saved, move it to edited (with updated id)
        // If temp assessment is equal to new saved, simply remove it from temp.
        editedAssessments: hasIdenticalItem(
          state.tempAssessments,
          action.payload.oldAssessment,
        )
          ? state.editedAssessments
          : {
              ...state.editedAssessments,
              [action.payload.assessment.id]: {
                ...action.payload.oldAssessment,
                id: action.payload.assessment.id,
              },
            },
        tempAssessments: deleteProperty<TempAssessment>(
          state.tempAssessments,
          action.payload.oldAssessment.id,
        ),
      };
    case STORE_NEW_ASSESSMENT_FAILED:
      return {
        ...state,
        tempAssessmentSaving: {
          ...state.tempAssessmentSaving,
          [action.payload.oldAssessment.id]: false,
        },
      };
    default:
      return state;
  }
};

export default assessmentReducer;

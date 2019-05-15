/* eslint-disable @typescript-eslint/camelcase */
import isEqual from "lodash/isEqual";
import { Assessment, TempAssessment } from "../../models/types";
import {
  getId,
  mapToObject,
  deleteProperty,
  hasKey,
} from "../../helpers/queries";
import {
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
  AssessmentAction,
  DELETE_ASSESSMENT_STARTED,
  DELETE_ASSESSMENT_SUCCEEDED,
  DELETE_ASSESSMENT_FAILED,
} from "./assessmentActions";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";

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
  assessmentDeletes: {
    [id: number]: number; // Tracks the number of pending delete requests
  };
}

export const initState = (): AssessmentState => ({
  assessments: {},
  editedAssessments: {},
  tempAssessments: {},
  tempAssessmentSaving: {},
  assessmentUpdates: {},
  assessmentDeletes: {},
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
  return hasKey(items, item.id) && isEqual(items[item.id], item);
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
  action: AssessmentAction | AssessmentPlanAction,
): AssessmentState => {
  switch (action.type) {
    case FETCH_ASSESSMENT_PLAN_STARTED:
      return state;
    case FETCH_ASSESSMENT_PLAN_SUCCEEEDED:
      return {
        ...state,
        assessments: {
          ...state.assessments,
          ...mapToObject(action.payload.assessments, getId),
        },
      };
    case FETCH_ASSESSMENT_PLAN_FAILED:
      return state;
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
          action.meta,
        ),
        assessmentUpdates: decrementUpdates(
          state.assessmentUpdates,
          action.meta.id,
        ),
      };
    case DELETE_ASSESSMENT_STARTED:
      return {
        ...state,
        assessmentDeletes: incrementUpdates(
          state.assessmentDeletes,
          action.payload.id,
        ),
      };
    case DELETE_ASSESSMENT_SUCCEEDED:
      // TODO: should this delete both canonical and edited assessments?
      // ...For now, I don't know of any situations where we wouldn't want both.
      return {
        ...state,
        assessments: deleteProperty<Assessment>(
          state.assessments,
          action.payload.id,
        ),
        editedAssessments: deleteProperty<Assessment>(
          state.editedAssessments,
          action.payload.id,
        ),
        assessmentDeletes: decrementUpdates(
          state.assessmentDeletes,
          action.payload.id,
        ),
      };
    case DELETE_ASSESSMENT_FAILED:
      return {
        ...state,
        assessmentDeletes: decrementUpdates(
          state.assessmentDeletes,
          action.meta.id,
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
                ...state.tempAssessments[action.payload.oldAssessment.id],
                id: action.payload.assessment.id,
                // When moving temp assessment to edited, ensure assessment_type_id is non-null
                assessment_type_id:
                  state.tempAssessments[action.payload.oldAssessment.id]
                    .assessment_type_id ||
                  action.payload.assessment.assessment_type_id,
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
          [action.meta.id]: false,
        },
      };
    default:
      return state;
  }
};

export default assessmentReducer;

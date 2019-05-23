/* eslint-disable @typescript-eslint/camelcase */
import isEqual from "lodash/isEqual";
import {
  RatingGuideQuestion,
} from "../../models/types";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";
import {
  RatingGuideQuestionAction,
  CREATE_TEMP_RATING_GUIDE_QUESTION,
  DELETE_RATING_GUIDE_QUESTION_FAILED,
  DELETE_RATING_GUIDE_QUESTION_STARTED,
  DELETE_RATING_GUIDE_QUESTION_SUCCEEDED,
  DELETE_TEMP_RATING_GUIDE_QUESTION,
  EDIT_RATING_GUIDE_QUESTION,
  EDIT_TEMP_RATING_GUIDE_QUESTION,
  STORE_NEW_RATING_GUIDE_QUESTION_FAILED,
  STORE_NEW_RATING_GUIDE_QUESTION_STARTED,
  STORE_NEW_RATING_GUIDE_QUESTION_SUCCEEDED,
  UPDATE_RATING_GUIDE_QUESTION_FAILED,
  UPDATE_RATING_GUIDE_QUESTION_STARTED,
  UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED,
} from "./ratingGuideQuestionActions";
import {
  getId,
  mapToObject,
  deleteProperty,
  hasKey,
} from "../../helpers/queries";

export interface RatingGuideQuestionState {
  ratingGuideQuestions: {
    // Stores rating guide answers that are synced with the server
    [id: number]: RatingGuideQuestion;
  };
  editedRatingGuideQuestions: {
    // For storing rating guide answers that have been edited locally
    [id: number]: RatingGuideQuestion;
  };
  tempRatingGuideQuestions: {
    // For storing local rating guide answers that have never been saved to server
    [id: number]: RatingGuideQuestion;
  };
  tempRatingGuideQuestionSaving: {
    // Tracks whether a RatingGuideQuestion is currently being saved to server
    [id: number]: boolean;
  };
  ratingGuideQuestionUpdates: {
    // Tracks the number of pending updates
    [id: number]: number;
  };
  ratingGuideQuestionDeletes: {
    // Tracks the number of pending delete requests
    [id: number]: number;
  };
}

export const initState = (): RatingGuideQuestionState => ({
  ratingGuideQuestions: {},
  editedRatingGuideQuestions: {},
  tempRatingGuideQuestions: {},
  tempRatingGuideQuestionSaving: {},
  ratingGuideQuestionUpdates: {},
  ratingGuideQuestionDeletes: {},
});

/**
 * Return editedAssessments, with assessment removed if it is present and identical.
 * This is useful for not deleting a temp state when the first of several queued async updates completes.
 *
 */
const deleteEditedIfIdentical = (
  editedRatingGuideQuestions: { [id: number]: RatingGuideQuestion },
  ratingGuideQuestion: RatingGuideQuestion,
): { [id: number]: RatingGuideQuestion } => {
  const { id } = ratingGuideQuestion;
  if (
    hasKey(editedRatingGuideQuestions, id) &&
    isEqual(editedRatingGuideQuestions[id], ratingGuideQuestion)
  ) {
    return deleteProperty<RatingGuideQuestion>(editedRatingGuideQuestions, id);
  }
  return editedRatingGuideQuestions;
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

const addTempRatingGuideQuestion = (
  state: RatingGuideQuestionState,
  jobPosterId: number,
  assessmentTypeId: number,
  newQuestion: string | null,
): RatingGuideQuestionState => {
  const currentIds = Object.values(state.tempRatingGuideQuestions).map(getId);
  const newId = Math.max(...currentIds, 0) + 1;
  return {
    ...state,
    tempRatingGuideQuestions: {
      ...state.tempRatingGuideQuestions,
      [newId]: {
        id: newId,
        job_poster_id: jobPosterId,
        assessment_type_id: assessmentTypeId,
        question: newQuestion,
      },
    },
  };
};

export const ratingGuideQuestionReducer = (
  state = initState(),
  action: AssessmentPlanAction | RatingGuideQuestionAction,
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
    case EDIT_RATING_GUIDE_QUESTION:
      return {
        ...state,
        editedRatingGuideQuestions: {
          ...state.editedRatingGuideQuestions,
          [action.payload.ratingGuideQuestion.id]:
            action.payload.ratingGuideQuestion,
        },
      };
    case UPDATE_RATING_GUIDE_QUESTION_STARTED:
      return {
        ...state,
        ratingGuideQuestionUpdates: incrementUpdates(
          state.ratingGuideQuestionUpdates,
          action.payload.ratingGuideQuestion.id,
        ),
      };
    case UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED:
      return {
        ...state,
        ratingGuideQuestions: {
          ...state.ratingGuideQuestions,
          [action.payload.ratingGuideQuestion.id]:
            action.payload.ratingGuideQuestion,
        },
        editedRatingGuideQuestions: deleteEditedIfIdentical(
          state.editedRatingGuideQuestions,
          action.payload.ratingGuideQuestion,
        ),
        ratingGuideQuestionUpdates: decrementUpdates(
          state.ratingGuideQuestionUpdates,
          action.payload.ratingGuideQuestion.id,
        ),
      };
    case UPDATE_RATING_GUIDE_QUESTION_FAILED:
      // TODO: do something with error
      // TODO: should the temp state really be deleted?
      return {
        ...state,
        editedRatingGuideQuestions: deleteEditedIfIdentical(
          state.editedRatingGuideQuestions,
          action.meta,
        ),
        ratingGuideQuestionUpdates: decrementUpdates(
          state.ratingGuideQuestionUpdates,
          action.meta.id,
        ),
      };
    case DELETE_RATING_GUIDE_QUESTION_STARTED:
      return {
        ...state,
        ratingGuideQuestionDeletes: incrementUpdates(
          state.ratingGuideQuestionDeletes,
          action.payload.id,
        ),
      };
    case DELETE_RATING_GUIDE_QUESTION_SUCCEEDED:
      // TODO: should this delete both canonical and edited ratingGuideQuestions?
      // ...For now, I don't know of any situations where we wouldn't want both.
      return {
        ...state,
        ratingGuideQuestions: deleteProperty<RatingGuideQuestion>(
          state.ratingGuideQuestions,
          action.payload.id,
        ),
        editedRatingGuideQuestions: deleteProperty<RatingGuideQuestion>(
          state.editedRatingGuideQuestions,
          action.payload.id,
        ),
        ratingGuideQuestionDeletes: decrementUpdates(
          state.ratingGuideQuestionDeletes,
          action.payload.id,
        ),
      };
    case DELETE_RATING_GUIDE_QUESTION_FAILED:
      return {
        ...state,
        ratingGuideQuestionDeletes: decrementUpdates(
          state.ratingGuideQuestionDeletes,
          action.meta.id,
        ),
      };
    case CREATE_TEMP_RATING_GUIDE_QUESTION:
      return addTempRatingGuideQuestion(
        state,
        action.payload.jobPosterId,
        action.payload.assessmentTypeId,
        action.payload.question,
      );
    case EDIT_TEMP_RATING_GUIDE_QUESTION:
      return {
        ...state,
        tempRatingGuideQuestions: {
          ...state.tempRatingGuideQuestions,
          [action.payload.ratingGuideQuestion.id]:
            action.payload.ratingGuideQuestion,
        },
      };
    case DELETE_TEMP_RATING_GUIDE_QUESTION:
      return {
        ...state,
        tempRatingGuideQuestions: deleteProperty<RatingGuideQuestion>(
          state.tempRatingGuideQuestions,
          action.payload.id,
        ),
      };
    case STORE_NEW_RATING_GUIDE_QUESTION_STARTED:
      return {
        ...state,
        tempRatingGuideQuestionSaving: {
          ...state.tempRatingGuideQuestionSaving,
          [action.payload.ratingGuideQuestion.id]: true,
        },
      };
    case STORE_NEW_RATING_GUIDE_QUESTION_SUCCEEDED:
      return {
        ...state,
        ratingGuideQuestions: {
          ...state.ratingGuideQuestions,
          [action.payload.ratingGuideQuestion.id]:
            action.payload.ratingGuideQuestion,
        },
        tempRatingGuideQuestionSaving: deleteProperty<boolean>(
          state.tempRatingGuideQuestionSaving,
          action.payload.oldRatingGuideQuestion.id,
        ),
        // If temp ratingGuideQuestion differs from saved, move it to edited (with updated id)
        // If temp ratingGuideQuestion is equal to new saved, simply remove it from temp.
        editedRatingGuideQuestions: hasIdenticalItem(
          state.tempRatingGuideQuestions,
          action.payload.oldRatingGuideQuestion,
        )
          ? state.editedRatingGuideQuestions
          : {
              ...state.editedRatingGuideQuestions,
              [action.payload.ratingGuideQuestion.id]: {
                ...state.tempRatingGuideQuestions[
                  action.payload.oldRatingGuideQuestion.id
                ],
                id: action.payload.ratingGuideQuestion.id,
                // When moving temp ratingGuideQuestion to edited, ensure ratingGuideQuestion_type_id is non-null
                job_poster_id: action.payload.ratingGuideQuestion.job_poster_id,
                assessment_type_id:
                  action.payload.ratingGuideQuestion.assessment_type_id,
                question: action.payload.ratingGuideQuestion.question,
              },
            },
        tempRatingGuideQuestions: deleteProperty<RatingGuideQuestion>(
          state.tempRatingGuideQuestions,
          action.payload.oldRatingGuideQuestion.id,
        ),
      };
    case STORE_NEW_RATING_GUIDE_QUESTION_FAILED:
      return {
        ...state,
        tempRatingGuideQuestionSaving: {
          ...state.tempRatingGuideQuestionSaving,
          [action.meta.id]: false,
        },
      };
    default:
      return state;
  }
};

export default ratingGuideQuestionReducer;

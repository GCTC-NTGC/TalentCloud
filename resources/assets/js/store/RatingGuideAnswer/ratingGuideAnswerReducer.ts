/* eslint-disable @typescript-eslint/camelcase */
import isEqual from "lodash/isEqual";
import { RatingGuideAnswer } from "../../models/types";
import {
  AssessmentPlanAction,
  FETCH_ASSESSMENT_PLAN_STARTED,
  FETCH_ASSESSMENT_PLAN_SUCCEEEDED,
  FETCH_ASSESSMENT_PLAN_FAILED,
} from "../AssessmentPlan/assessmentPlanActions";
import {
  RatingGuideAnswerAction,
  CREATE_TEMP_RATING_GUIDE_ANSWER,
  DELETE_RATING_GUIDE_ANSWER_FAILED,
  DELETE_RATING_GUIDE_ANSWER_STARTED,
  DELETE_RATING_GUIDE_ANSWER_SUCCEEDED,
  DELETE_TEMP_RATING_GUIDE_ANSWER,
  EDIT_RATING_GUIDE_ANSWER,
  EDIT_TEMP_RATING_GUIDE_ANSWER,
  STORE_NEW_RATING_GUIDE_ANSWER_FAILED,
  STORE_NEW_RATING_GUIDE_ANSWER_STARTED,
  STORE_NEW_RATING_GUIDE_ANSWER_SUCCEEDED,
  UPDATE_RATING_GUIDE_ANSWER_FAILED,
  UPDATE_RATING_GUIDE_ANSWER_STARTED,
  UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED,
} from "./ratingGuideAnswerActions";
import {
  getId,
  mapToObject,
  deleteProperty,
  hasKey,
} from "../../helpers/queries";

export interface RatingGuideAnswerState {
  ratingGuideAnswers: {
    // Stores rating guide answers that are synced with the server
    [id: number]: RatingGuideAnswer;
  };
  editedRatingGuideAnswers: {
    // For storing rating guide answers that have been edited locally
    [id: number]: RatingGuideAnswer;
  };
  tempRatingGuideAnswers: {
    // For storing local rating guide answers that have never been saved to server
    [id: number]: RatingGuideAnswer;
  };
  tempRatingGuideAnswerSaving: {
    // Tracks whether a RatingGuideAnswer is currently being saved to server
    [id: number]: boolean;
  };
  ratingGuideAnswerUpdates: {
    // Tracks the number of pending updates
    [id: number]: number;
  };
  ratingGuideAnswerDeletes: {
    // Tracks the number of pending delete requests
    [id: number]: number;
  };
}

export const initState = (): RatingGuideAnswerState => ({
  ratingGuideAnswers: {},
  editedRatingGuideAnswers: {},
  tempRatingGuideAnswers: {},
  tempRatingGuideAnswerSaving: {},
  ratingGuideAnswerUpdates: {},
  ratingGuideAnswerDeletes: {},
});

/**
 * Return editedAssessments, with assessment removed if it is present and identical.
 * This is useful for not deleting a temp state when the first of several queued async updates completes.
 *
 */
const deleteEditedIfIdentical = (
  editedRatingGuideAnswers: { [id: number]: RatingGuideAnswer },
  ratingGuideAnswer: RatingGuideAnswer,
): { [id: number]: RatingGuideAnswer } => {
  const { id } = ratingGuideAnswer;
  if (
    hasKey(editedRatingGuideAnswers, id) &&
    isEqual(editedRatingGuideAnswers[id], ratingGuideAnswer)
  ) {
    return deleteProperty<RatingGuideAnswer>(editedRatingGuideAnswers, id);
  }
  return editedRatingGuideAnswers;
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

const addTempRatingGuideAnswer = (
  state: RatingGuideAnswerState,
  ratingGuideQuestionId: number,
  criterionId: number | null,
  expectedAnswer: string | null,
): RatingGuideAnswerState => {
  const currentIds = Object.values(state.tempRatingGuideAnswers).map(getId);
  const newId = Math.max(...currentIds, 0) + 1;
  return {
    ...state,
    tempRatingGuideAnswers: {
      ...state.tempRatingGuideAnswers,
      [newId]: {
        id: newId,
        rating_guide_question_id: ratingGuideQuestionId,
        criterion_id: criterionId,
        expected_answer: expectedAnswer,
      },
    },
  };
};

export const ratingGuideAnswerReducer = (
  state = initState(),
  action: AssessmentPlanAction | RatingGuideAnswerAction,
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
    case EDIT_RATING_GUIDE_ANSWER:
      return {
        ...state,
        editedRatingGuideAnswers: {
          ...state.editedRatingGuideAnswers,
          [action.payload.ratingGuideAnswer.id]:
            action.payload.ratingGuideAnswer,
        },
      };
    case UPDATE_RATING_GUIDE_ANSWER_STARTED:
      return {
        ...state,
        ratingGuideAnswerUpdates: incrementUpdates(
          state.ratingGuideAnswerUpdates,
          action.payload.ratingGuideAnswer.id,
        ),
      };
    case UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED:
      return {
        ...state,
        ratingGuideAnswers: {
          ...state.ratingGuideAnswers,
          [action.payload.ratingGuideAnswer.id]:
            action.payload.ratingGuideAnswer,
        },
        editedRatingGuideAnswers: deleteEditedIfIdentical(
          state.editedRatingGuideAnswers,
          action.payload.ratingGuideAnswer,
        ),
        ratingGuideAnswerUpdates: decrementUpdates(
          state.ratingGuideAnswerUpdates,
          action.payload.ratingGuideAnswer.id,
        ),
      };
    case UPDATE_RATING_GUIDE_ANSWER_FAILED:
      // TODO: do something with error
      // TODO: should the temp state really be deleted?
      return {
        ...state,
        editedRatingGuideAnswers: deleteEditedIfIdentical(
          state.editedRatingGuideAnswers,
          action.meta,
        ),
        ratingGuideAnswerUpdates: decrementUpdates(
          state.ratingGuideAnswerUpdates,
          action.meta.id,
        ),
      };
    case DELETE_RATING_GUIDE_ANSWER_STARTED:
      return {
        ...state,
        ratingGuideAnswerDeletes: incrementUpdates(
          state.ratingGuideAnswerDeletes,
          action.payload.id,
        ),
      };
    case DELETE_RATING_GUIDE_ANSWER_SUCCEEDED:
      // TODO: should this delete both canonical and edited ratingGuideAnswers?
      // ...For now, I don't know of any situations where we wouldn't want both.
      return {
        ...state,
        ratingGuideAnswers: deleteProperty<RatingGuideAnswer>(
          state.ratingGuideAnswers,
          action.payload.id,
        ),
        editedRatingGuideAnswers: deleteProperty<RatingGuideAnswer>(
          state.editedRatingGuideAnswers,
          action.payload.id,
        ),
        ratingGuideAnswerDeletes: decrementUpdates(
          state.ratingGuideAnswerDeletes,
          action.payload.id,
        ),
      };
    case DELETE_RATING_GUIDE_ANSWER_FAILED:
      return {
        ...state,
        ratingGuideAnswerDeletes: decrementUpdates(
          state.ratingGuideAnswerDeletes,
          action.meta.id,
        ),
      };
    case CREATE_TEMP_RATING_GUIDE_ANSWER:
      return addTempRatingGuideAnswer(
        state,
        action.payload.ratingGuideQuestionId,
        action.payload.criterionId,
        action.payload.expectedAnswer,
      );
    case EDIT_TEMP_RATING_GUIDE_ANSWER:
      return {
        ...state,
        tempRatingGuideAnswers: {
          ...state.tempRatingGuideAnswers,
          [action.payload.ratingGuideAnswer.id]:
            action.payload.ratingGuideAnswer,
        },
      };
    case DELETE_TEMP_RATING_GUIDE_ANSWER:
      return {
        ...state,
        tempRatingGuideAnswers: deleteProperty<RatingGuideAnswer>(
          state.tempRatingGuideAnswers,
          action.payload.id,
        ),
      };
    case STORE_NEW_RATING_GUIDE_ANSWER_STARTED:
      return {
        ...state,
        tempRatingGuideAnswerSaving: {
          ...state.tempRatingGuideAnswerSaving,
          [action.payload.ratingGuideAnswer.id]: true,
        },
      };
    case STORE_NEW_RATING_GUIDE_ANSWER_SUCCEEDED:
      return {
        ...state,
        ratingGuideAnswers: {
          ...state.ratingGuideAnswers,
          [action.payload.ratingGuideAnswer.id]:
            action.payload.ratingGuideAnswer,
        },
        tempRatingGuideAnswerSaving: deleteProperty<boolean>(
          state.tempRatingGuideAnswerSaving,
          action.payload.oldRatingGuideAnswer.id,
        ),
        // If temp ratingGuideAnswer differs from saved, move it to edited (with updated id)
        // If temp ratingGuideAnswer is equal to new saved, simply remove it from temp.
        editedRatingGuideAnswers: hasIdenticalItem(
          state.tempRatingGuideAnswers,
          action.payload.oldRatingGuideAnswer,
        )
          ? state.editedRatingGuideAnswers
          : {
              ...state.editedRatingGuideAnswers,
              [action.payload.ratingGuideAnswer.id]: {
                ...state.tempRatingGuideAnswers[
                  action.payload.oldRatingGuideAnswer.id
                ],
                id: action.payload.ratingGuideAnswer.id,
                // When moving temp ratingGuideAnswer to edited, ensure ratingGuideAnswer_type_id is non-null
                rating_guide_question_id:
                  action.payload.ratingGuideAnswer.rating_guide_question_id,
                criterion_id: action.payload.ratingGuideAnswer.criterion_id,
                expected_answer:
                  action.payload.ratingGuideAnswer.expected_answer,
              },
            },
        tempRatingGuideAnswers: deleteProperty<RatingGuideAnswer>(
          state.tempRatingGuideAnswers,
          action.payload.oldRatingGuideAnswer.id,
        ),
      };
    case STORE_NEW_RATING_GUIDE_ANSWER_FAILED:
      return {
        ...state,
        tempRatingGuideAnswerSaving: {
          ...state.tempRatingGuideAnswerSaving,
          [action.meta.id]: false,
        },
      };
    default:
      return state;
  }
};

export default ratingGuideAnswerReducer;

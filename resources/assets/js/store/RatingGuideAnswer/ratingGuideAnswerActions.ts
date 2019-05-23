import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Action } from "../createAction";
import {
  updateRatingGuideAnswer as updateRatingGuideAnswerApi,
  createRatingGuideAnswer as createRatingGuideAnswerApi,
  deleteRatingGuideAnswer as deleteRatingGuideAnswerApi,
} from "../../api/ratingGuide";
import { RatingGuideAnswer } from "../../models/types";
import { FailedAction } from "../asyncAction";

/** Action for editing Rating Guide Q&A (without saving to server) */
export const EDIT_RATING_GUIDE_ANSWER = "EDIT_RATING_GUIDE_ANSWER";
export type EditRatingGuideAnswerAction = Action<
  typeof EDIT_RATING_GUIDE_ANSWER,
  { ratingGuideAnswer: RatingGuideAnswer }
>;
export const editRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): EditRatingGuideAnswerAction => ({
  type: EDIT_RATING_GUIDE_ANSWER,
  payload: { ratingGuideAnswer },
});

/** Actions for manipulating Temp Rating Guide Answers */
export const CREATE_TEMP_RATING_GUIDE_ANSWER =
  "CREATE_TEMP_RATING_GUIDE_ANSWER";
export const EDIT_TEMP_RATING_GUIDE_ANSWER = "EDIT_TEMP_RATING_GUIDE_ANSWER";
export const DELETE_TEMP_RATING_GUIDE_ANSWER =
  "DELETE_TEMP_RATING_GUIDE_ANSWER";

export type CreateTempRatingGuideAnswerAction = Action<
  typeof CREATE_TEMP_RATING_GUIDE_ANSWER,
  {
    ratingGuideQuestionId: number;
    criterionId: number | null;
    expectedAnswer: string | null;
  }
>;

export type EditTempRatingGuideAnswerAction = Action<
  typeof EDIT_TEMP_RATING_GUIDE_ANSWER,
  { ratingGuideAnswer: RatingGuideAnswer }
>;

export type DeleteTempRatingGuideAnswerAction = Action<
  typeof DELETE_TEMP_RATING_GUIDE_ANSWER,
  { id: number }
>;

export const createTempRatingGuideAnswer = (
  ratingGuideQuestionId: number,
  criterionId: number | null,
  expectedAnswer: string | null,
): CreateTempRatingGuideAnswerAction => ({
  type: CREATE_TEMP_RATING_GUIDE_ANSWER,
  payload: {
    ratingGuideQuestionId,
    criterionId,
    expectedAnswer,
  },
});

export const editTempRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): EditTempRatingGuideAnswerAction => ({
  type: EDIT_TEMP_RATING_GUIDE_ANSWER,
  payload: { ratingGuideAnswer },
});

export const deleteTempRatingGuideAnswer = (
  id: number,
): DeleteTempRatingGuideAnswerAction => ({
  type: DELETE_TEMP_RATING_GUIDE_ANSWER,
  payload: { id },
});

/** Updating Rating Guide Answers on Server */

export const UPDATE_RATING_GUIDE_ANSWER_STARTED =
  "UPDATE_RATING_GUIDE_ANSWER_STARTED";
export const UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED =
  "UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED";
export const UPDATE_RATING_GUIDE_ANSWER_FAILED =
  "UPDATE_RATING_GUIDE_ANSWER_FAILED";

export type UpdateRatingGuideAnswerStartedAction = Action<
  typeof UPDATE_RATING_GUIDE_ANSWER_STARTED,
  { ratingGuideAnswer: RatingGuideAnswer }
>;
export type UpdateRatingGuideAnswerSucceededAction = Action<
  typeof UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED,
  { ratingGuideAnswer: RatingGuideAnswer }
>;
export type UpdateRatingGuideAnswerFailedAction = FailedAction<
  typeof UPDATE_RATING_GUIDE_ANSWER_FAILED,
  RatingGuideAnswer
>;

export const updateRatingGuideAnswerStarted = (
  ratingGuideAnswer: RatingGuideAnswer,
): UpdateRatingGuideAnswerStartedAction => {
  return {
    type: UPDATE_RATING_GUIDE_ANSWER_STARTED,
    payload: {
      ratingGuideAnswer,
    },
  };
};
export const updateRatingGuideAnswerSucceeded = (
  ratingGuideAnswer: RatingGuideAnswer,
): UpdateRatingGuideAnswerSucceededAction => {
  return {
    type: UPDATE_RATING_GUIDE_ANSWER_SUCCEEDED,
    payload: {
      ratingGuideAnswer,
    },
  };
};
export const updateRatingGuideAnswerFailed = (
  ratingGuideAnswer: RatingGuideAnswer,
  error: Error,
): UpdateRatingGuideAnswerFailedAction => ({
  type: UPDATE_RATING_GUIDE_ANSWER_FAILED,
  payload: error,
  meta: ratingGuideAnswer,
  error: true,
});
export const updateRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): ThunkAction<void, any, any, RatingGuideAnswerAction> => {
  return (
    dispatch: ThunkDispatch<any, undefined, RatingGuideAnswerAction>,
  ): void => {
    dispatch(updateRatingGuideAnswerStarted(ratingGuideAnswer));
    updateRatingGuideAnswerApi(ratingGuideAnswer)
      .then(
        (updatedRatingGuideAnswer): void => {
          dispatch(updateRatingGuideAnswerSucceeded(updatedRatingGuideAnswer));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(updateRatingGuideAnswerFailed(ratingGuideAnswer, error));
        },
      );
  };
};

/** Deleting RatingGuideAnswers on server */

export const DELETE_RATING_GUIDE_ANSWER_STARTED =
  "DELETE_RATING_GUIDE_ANSWER_STARTED";
export const DELETE_RATING_GUIDE_ANSWER_SUCCEEDED =
  "DELETE_RATING_GUIDE_ANSWER_SUCCEEDED";
export const DELETE_RATING_GUIDE_ANSWER_FAILED =
  "DELETE_RATING_GUIDE_ANSWER_FAILED";

export type DeleteRatingGuideAnswerStartedAction = Action<
  typeof DELETE_RATING_GUIDE_ANSWER_STARTED,
  { id: number }
>;
export type DeleteRatingGuideAnswerSucceededAction = Action<
  typeof DELETE_RATING_GUIDE_ANSWER_SUCCEEDED,
  { id: number }
>;
export type DeleteRatingGuideAnswerFailedAction = FailedAction<
  typeof DELETE_RATING_GUIDE_ANSWER_FAILED,
  { id: number }
>;

export const deleteRatingGuideAnswerStarted = (
  id: number,
): DeleteRatingGuideAnswerStartedAction => {
  return {
    type: DELETE_RATING_GUIDE_ANSWER_STARTED,
    payload: {
      id,
    },
  };
};
export const deleteRatingGuideAnswerSucceeded = (
  id: number,
): DeleteRatingGuideAnswerSucceededAction => {
  return {
    type: DELETE_RATING_GUIDE_ANSWER_SUCCEEDED,
    payload: {
      id,
    },
  };
};
export const deleteRatingGuideAnswerFailed = (
  id: number,
  error: Error,
): DeleteRatingGuideAnswerFailedAction => ({
  type: DELETE_RATING_GUIDE_ANSWER_FAILED,
  payload: error,
  meta: { id },
  error: true,
});
export const deleteRatingGuideAnswer = (
  id: number,
): ThunkAction<void, any, any, RatingGuideAnswerAction> => {
  return (
    dispatch: ThunkDispatch<any, undefined, RatingGuideAnswerAction>,
  ): void => {
    dispatch(deleteRatingGuideAnswerStarted(id));
    deleteRatingGuideAnswerApi(id)
      .then(
        (): void => {
          dispatch(deleteRatingGuideAnswerSucceeded(id));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(deleteRatingGuideAnswerFailed(id, error));
        },
      );
  };
};

/** Actions for saving a NEW ratingGuideAnswer to server */
export const STORE_NEW_RATING_GUIDE_ANSWER_STARTED =
  "STORE_RATING_GUIDE_ANSWER_STARTED";
export const STORE_NEW_RATING_GUIDE_ANSWER_SUCCEEDED =
  "STORE_RATING_GUIDE_ANSWER_SUCCEEDED";
export const STORE_NEW_RATING_GUIDE_ANSWER_FAILED =
  "STORE_RATING_GUIDE_ANSWER_FAILED";

export type StoreNewRatingGuideAnswerStartedAction = Action<
  typeof STORE_NEW_RATING_GUIDE_ANSWER_STARTED,
  { ratingGuideAnswer: RatingGuideAnswer }
>;
export type StoreNewRatingGuideAnswerSucceededAction = Action<
  typeof STORE_NEW_RATING_GUIDE_ANSWER_SUCCEEDED,
  {
    ratingGuideAnswer: RatingGuideAnswer;
    oldRatingGuideAnswer: RatingGuideAnswer;
  }
>;
export type StoreNewRatingGuideAnswerFailedAction = FailedAction<
  typeof STORE_NEW_RATING_GUIDE_ANSWER_FAILED,
  RatingGuideAnswer
>;

export const storeNewRatingGuideAnswerStarted = (
  ratingGuideAnswer: RatingGuideAnswer,
): StoreNewRatingGuideAnswerStartedAction => {
  return {
    type: STORE_NEW_RATING_GUIDE_ANSWER_STARTED,
    payload: {
      ratingGuideAnswer,
    },
  };
};
export const storeNewRatingGuideAnswerSucceeded = (
  ratingGuideAnswer: RatingGuideAnswer,
  oldRatingGuideAnswer: RatingGuideAnswer,
): StoreNewRatingGuideAnswerSucceededAction => {
  return {
    type: STORE_NEW_RATING_GUIDE_ANSWER_SUCCEEDED,
    payload: {
      ratingGuideAnswer,
      oldRatingGuideAnswer,
    },
  };
};
export const storeNewRatingGuideAnswerFailed = (
  oldRatingGuideAnswer: RatingGuideAnswer,
  error: Error,
): StoreNewRatingGuideAnswerFailedAction => ({
  type: STORE_NEW_RATING_GUIDE_ANSWER_FAILED,
  payload: error,
  meta: oldRatingGuideAnswer,
  error: true,
});
export const storeNewRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(storeNewRatingGuideAnswerStarted(ratingGuideAnswer));
    createRatingGuideAnswerApi(ratingGuideAnswer)
      .then(
        (updatedRatingGuideAnswer): void => {
          dispatch(
            storeNewRatingGuideAnswerSucceeded(
              updatedRatingGuideAnswer,
              ratingGuideAnswer,
            ),
          );
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(storeNewRatingGuideAnswerFailed(ratingGuideAnswer, error));
        },
      );
  };
};

export type RatingGuideAnswerAction =
  | EditRatingGuideAnswerAction
  | UpdateRatingGuideAnswerStartedAction
  | UpdateRatingGuideAnswerSucceededAction
  | UpdateRatingGuideAnswerFailedAction
  | DeleteRatingGuideAnswerStartedAction
  | DeleteRatingGuideAnswerSucceededAction
  | DeleteRatingGuideAnswerFailedAction
  | CreateTempRatingGuideAnswerAction
  | EditTempRatingGuideAnswerAction
  | DeleteTempRatingGuideAnswerAction
  | StoreNewRatingGuideAnswerStartedAction
  | StoreNewRatingGuideAnswerSucceededAction
  | StoreNewRatingGuideAnswerFailedAction;

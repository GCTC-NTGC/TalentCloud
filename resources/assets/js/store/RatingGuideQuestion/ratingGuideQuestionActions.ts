import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Action } from "../createAction";
import {
  updateRatingGuideQuestion as updateRatingGuideQuestionApi,
  createRatingGuideQuestion as createRatingGuideQuestionApi,
  deleteRatingGuideQuestion as deleteRatingGuideQuestionApi,
} from "../../api/ratingGuide";
import {
  RatingGuideQuestion,
  TempRatingGuideQuestion,
} from "../../models/types";

/** Action for editing Rating Guide Q&A (without saving to server) */
export const EDIT_RATING_GUIDE_QUESTION = "EDIT_RATING_GUIDE_QUESTION";
export type EditRatingGuideQuestionAction = Action<
  typeof EDIT_RATING_GUIDE_QUESTION,
  { ratingGuideQuestion: RatingGuideQuestion }
>;
export const editRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): EditRatingGuideQuestionAction => ({
  type: EDIT_RATING_GUIDE_QUESTION,
  payload: { ratingGuideQuestion },
});

/** Actions for manipulating Temp Rating Guide Questions */
export const CREATE_TEMP_RATING_GUIDE_QUESTION =
  "CREATE_TEMP_RATING_GUIDE_QUESTION";
export const EDIT_TEMP_RATING_GUIDE_QUESTION =
  "EDIT_TEMP_RATING_GUIDE_QUESTION";
export const DELETE_TEMP_RATING_GUIDE_QUESTION =
  "DELETE_TEMP_RATING_GUIDE_QUESTION";

export type CreateTempRatingGuideQuestionAction = Action<
  typeof CREATE_TEMP_RATING_GUIDE_QUESTION,
  {
    id: number;
    jobPosterId: number;
    assessmentTypeId: number;
    question: string;
  }
>;

export type EditTempRatingGuideQuestionAction = Action<
  typeof EDIT_TEMP_RATING_GUIDE_QUESTION,
  { ratingGuideQuestion: TempRatingGuideQuestion }
>;

export type DeleteTempRatingGuideQuestionAction = Action<
  typeof DELETE_TEMP_RATING_GUIDE_QUESTION,
  { id: number }
>;

export const createTempRatingGuideQuestion = (
  id: number,
  jobPosterId: number,
  assessmentTypeId: number,
  question: string,
): CreateTempRatingGuideQuestionAction => ({
  type: CREATE_TEMP_RATING_GUIDE_QUESTION,
  payload: { id, jobPosterId, assessmentTypeId, question },
});

export const editTempRatingGuideQuestion = (
  ratingGuideQuestion: TempRatingGuideQuestion,
): EditTempRatingGuideQuestionAction => ({
  type: EDIT_TEMP_RATING_GUIDE_QUESTION,
  payload: { ratingGuideQuestion },
});

export const deleteTempRatingGuideQuestion = (
  id: number,
): DeleteTempRatingGuideQuestionAction => ({
  type: DELETE_TEMP_RATING_GUIDE_QUESTION,
  payload: { id },
});

/** Updating Rating Guide Questions on Server */

export const UPDATE_RATING_GUIDE_QUESTION_STARTED =
  "UPDATE_RATING_GUIDE_QUESTION_STARTED";
export const UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED =
  "UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED";
export const UPDATE_RATING_GUIDE_QUESTION_FAILED =
  "UPDATE_RATING_GUIDE_QUESTION_FAILED";

export type UpdateRatingGuideQuestionStartedAction = Action<
  typeof UPDATE_RATING_GUIDE_QUESTION_STARTED,
  { ratingGuideQuestion: RatingGuideQuestion }
>;
export type UpdateRatingGuideQuestionSucceededAction = Action<
  typeof UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED,
  { ratingGuideQuestion: RatingGuideQuestion }
>;
export type UpdateRatingGuideQuestionFailedAction = Action<
  typeof UPDATE_RATING_GUIDE_QUESTION_FAILED,
  { ratingGuideQuestion: RatingGuideQuestion; error: Error }
>;

export const updateRatingGuideQuestionStarted = (
  ratingGuideQuestion: RatingGuideQuestion,
): UpdateRatingGuideQuestionStartedAction => {
  return {
    type: UPDATE_RATING_GUIDE_QUESTION_STARTED,
    payload: {
      ratingGuideQuestion,
    },
  };
};
export const updateRatingGuideQuestionSucceeded = (
  ratingGuideQuestion: RatingGuideQuestion,
): UpdateRatingGuideQuestionSucceededAction => {
  return {
    type: UPDATE_RATING_GUIDE_QUESTION_SUCCEEDED,
    payload: {
      ratingGuideQuestion,
    },
  };
};
export const updateRatingGuideQuestionFailed = (
  ratingGuideQuestion: RatingGuideQuestion,
  error: Error,
): UpdateRatingGuideQuestionFailedAction => ({
  type: UPDATE_RATING_GUIDE_QUESTION_FAILED,
  payload: {
    ratingGuideQuestion,
    error,
  },
});
export const updateRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): ThunkAction<void, any, any, RatingGuideQuestionAction> => {
  return (
    dispatch: ThunkDispatch<any, undefined, RatingGuideQuestionAction>,
  ): void => {
    dispatch(updateRatingGuideQuestionStarted(ratingGuideQuestion));
    updateRatingGuideQuestionApi(ratingGuideQuestion)
      .then(
        (updatedRatingGuideQuestion): void => {
          dispatch(
            updateRatingGuideQuestionSucceeded(updatedRatingGuideQuestion),
          );
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(updateRatingGuideQuestionFailed(ratingGuideQuestion, error));
        },
      );
  };
};

/** Deleting RatingGuideQuestions on server */

export const DELETE_RATING_GUIDE_QUESTION_STARTED =
  "DELETE_RATING_GUIDE_QUESTION_STARTED";
export const DELETE_RATING_GUIDE_QUESTION_SUCCEEDED =
  "DELETE_RATING_GUIDE_QUESTION_SUCCEEDED";
export const DELETE_RATING_GUIDE_QUESTION_FAILED =
  "DELETE_RATING_GUIDE_QUESTION_FAILED";

export type DeleteRatingGuideQuestionStartedAction = Action<
  typeof DELETE_RATING_GUIDE_QUESTION_STARTED,
  { id: number }
>;
export type DeleteRatingGuideQuestionSucceededAction = Action<
  typeof DELETE_RATING_GUIDE_QUESTION_SUCCEEDED,
  { id: number }
>;
export type DeleteRatingGuideQuestionFailedAction = Action<
  typeof DELETE_RATING_GUIDE_QUESTION_FAILED,
  { id: number; error: Error }
>;

export const deleteRatingGuideQuestionStarted = (
  id: number,
): DeleteRatingGuideQuestionStartedAction => {
  return {
    type: DELETE_RATING_GUIDE_QUESTION_STARTED,
    payload: {
      id,
    },
  };
};
export const deleteRatingGuideQuestionSucceeded = (
  id: number,
): DeleteRatingGuideQuestionSucceededAction => {
  return {
    type: DELETE_RATING_GUIDE_QUESTION_SUCCEEDED,
    payload: {
      id,
    },
  };
};
export const deleteRatingGuideQuestionFailed = (
  id: number,
  error: Error,
): DeleteRatingGuideQuestionFailedAction => ({
  type: DELETE_RATING_GUIDE_QUESTION_FAILED,
  payload: {
    id,
    error,
  },
});
export const deleteRatingGuideQuestion = (
  id: number,
): ThunkAction<void, any, any, RatingGuideQuestionAction> => {
  return (
    dispatch: ThunkDispatch<any, undefined, RatingGuideQuestionAction>,
  ): void => {
    dispatch(deleteRatingGuideQuestionStarted(id));
    deleteRatingGuideQuestionApi(id)
      .then(
        (): void => {
          dispatch(deleteRatingGuideQuestionSucceeded(id));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(deleteRatingGuideQuestionFailed(id, error));
        },
      );
  };
};

/** Actions for saving a NEW ratingGuideQuestion to server */
export const STORE_NEW_RATING_GUIDE_QUESTION_STARTED =
  "STORE_RATING_GUIDE_QUESTION_STARTED";
export const STORE_NEW_RATING_GUIDE_QUESTION_SUCCEEDED =
  "STORE_RATING_GUIDE_QUESTION_SUCCEEDED";
export const STORE_NEW_RATING_GUIDE_QUESTION_FAILED =
  "STORE_RATING_GUIDE_QUESTION_FAILED";

export type StoreNewRatingGuideQuestionStartedAction = Action<
  typeof STORE_NEW_RATING_GUIDE_QUESTION_STARTED,
  { ratingGuideQuestion: RatingGuideQuestion }
>;
export type StoreNewRatingGuideQuestionSucceededAction = Action<
  typeof STORE_NEW_RATING_GUIDE_QUESTION_SUCCEEDED,
  {
    ratingGuideQuestion: RatingGuideQuestion;
    oldRatingGuideQuestion: RatingGuideQuestion;
  }
>;
export type StoreNewRatingGuideQuestionFailedAction = Action<
  typeof STORE_NEW_RATING_GUIDE_QUESTION_FAILED,
  { oldRatingGuideQuestion: RatingGuideQuestion; error: Error }
>;

export const storeNewRatingGuideQuestionStarted = (
  ratingGuideQuestion: RatingGuideQuestion,
): StoreNewRatingGuideQuestionStartedAction => {
  return {
    type: STORE_NEW_RATING_GUIDE_QUESTION_STARTED,
    payload: {
      ratingGuideQuestion,
    },
  };
};
export const storeNewRatingGuideQuestionSucceeded = (
  ratingGuideQuestion: RatingGuideQuestion,
  oldRatingGuideQuestion: RatingGuideQuestion,
): StoreNewRatingGuideQuestionSucceededAction => {
  return {
    type: STORE_NEW_RATING_GUIDE_QUESTION_SUCCEEDED,
    payload: {
      ratingGuideQuestion,
      oldRatingGuideQuestion,
    },
  };
};
export const storeNewRatingGuideQuestionFailed = (
  oldRatingGuideQuestion: RatingGuideQuestion,
  error: Error,
): StoreNewRatingGuideQuestionFailedAction => ({
  type: STORE_NEW_RATING_GUIDE_QUESTION_FAILED,
  payload: {
    oldRatingGuideQuestion,
    error,
  },
});
export const storeNewRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
    dispatch(storeNewRatingGuideQuestionStarted(ratingGuideQuestion));
    createRatingGuideQuestionApi(ratingGuideQuestion)
      .then(
        (updatedRatingGuideQuestion): void => {
          dispatch(
            storeNewRatingGuideQuestionSucceeded(
              updatedRatingGuideQuestion,
              ratingGuideQuestion,
            ),
          );
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(
            storeNewRatingGuideQuestionFailed(ratingGuideQuestion, error),
          );
        },
      );
  };
};

export type RatingGuideQuestionAction =
  | EditRatingGuideQuestionAction
  | UpdateRatingGuideQuestionStartedAction
  | UpdateRatingGuideQuestionSucceededAction
  | UpdateRatingGuideQuestionFailedAction
  | DeleteRatingGuideQuestionStartedAction
  | DeleteRatingGuideQuestionSucceededAction
  | DeleteRatingGuideQuestionFailedAction
  | CreateTempRatingGuideQuestionAction
  | EditTempRatingGuideQuestionAction
  | DeleteTempRatingGuideQuestionAction
  | StoreNewRatingGuideQuestionStartedAction
  | StoreNewRatingGuideQuestionSucceededAction
  | StoreNewRatingGuideQuestionFailedAction;

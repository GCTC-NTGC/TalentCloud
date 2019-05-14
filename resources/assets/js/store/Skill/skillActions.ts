import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "../createAction";
import { Skill } from "../../models/types";
import { getSkills } from "../../api/skill";
import { FailedAction } from "../asyncAction";

export const FETCH_SKILLS_STARTED = "FETCH_SKILLS_STARTED";
export const FETCH_SKILLS_SUCCEEDED = "FETCH_SKILLS_SUCCEEDED";
export const FETCH_SKILLS_FAILED = "FETCH_SKILLS_FAILED";

export type FetchSkillsStartedAction = Action<
  typeof FETCH_SKILLS_STARTED,
  void
>;

export type FetchSkillsSucceededAction = Action<
  typeof FETCH_SKILLS_SUCCEEDED,
  Skill[]
>;

export type FetchSkillsFailedAction = FailedAction<typeof FETCH_SKILLS_FAILED>;

export const fetchSkillsStarted = (): FetchSkillsStartedAction => {
  return { type: FETCH_SKILLS_STARTED, payload: undefined };
};

export const FetchSkillsSucceeded = (
  skills: Skill[],
): FetchSkillsSucceededAction => {
  return { type: FETCH_SKILLS_SUCCEEDED, payload: skills };
};

export const FetchSkillsFailed = (error: Error): FetchSkillsFailedAction => {
  return {
    type: FETCH_SKILLS_FAILED,
    payload: error,
    error: true,
    meta: {},
  };
};

export const fetchSkills = (): ThunkAction<void, any, {}, SkillAction> => {
  return (dispatch: ThunkDispatch<any, undefined, SkillAction>): void => {
    dispatch(fetchSkillsStarted());
    getSkills()
      .then(
        (skills): void => {
          dispatch(FetchSkillsSucceeded(skills));
        },
      )
      .catch(
        (error: Error): void => {
          dispatch(FetchSkillsFailed(error));
        },
      );
  };
};

export type SkillAction =
  | FetchSkillsStartedAction
  | FetchSkillsSucceededAction
  | FetchSkillsFailedAction;

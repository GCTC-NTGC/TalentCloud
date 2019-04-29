import { combineReducers, Reducer } from "redux";
import { Skill } from "../../models/types";
import {
  SkillAction,
  FETCH_SKILLS_STARTED,
  FETCH_SKILLS_SUCCEEDED,
  FETCH_SKILLS_FAILED,
} from "./skillActions";
import { mapToObject, getId } from "../../helpers/queries";

interface EntityState {
  skills: {
    byId: {
      [id: number]: Skill;
    };
  };
}

interface UiState {
  updating: boolean;
}

export interface SkillState {
  entities: EntityState;
  ui: UiState;
}

const initEntityState = (): EntityState => ({
  skills: {
    byId: {},
  },
});

const initUiState = (): UiState => ({ updating: false });

export const initState = (): SkillState => ({
  entities: initEntityState(),
  ui: initUiState(),
});

const entityReducer = (
  state = initEntityState(),
  action: SkillAction,
): EntityState => {
  switch (action.type) {
    case FETCH_SKILLS_SUCCEEDED:
      return {
        ...state,
        skills: {
          byId: mapToObject(action.payload, getId),
        },
      };
    default:
      return state;
  }
};

const uiReducer = (state = initUiState(), action: SkillAction): UiState => {
  switch (action.type) {
    case FETCH_SKILLS_STARTED:
      return {
        ...state,
        updating: true,
      };
    case FETCH_SKILLS_SUCCEEDED:
      return {
        ...state,
        updating: false,
      };
    case FETCH_SKILLS_FAILED:
      return {
        ...state,
        updating: false,
      };
    default:
      return state;
  }
};

export const skillReducer: Reducer<SkillState> = combineReducers({
  entities: entityReducer,
  ui: uiReducer,
});

export default skillReducer;

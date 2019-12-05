import { HrAdvisor } from "../../models/types";
import { HrAdvisorAction, GET_HR_ADVISOR_SUCCEEDED } from "./hrAdivsorActions";

export interface EntityState {
  hrAdvisors: {
    byId: {
      [id: number]: HrAdvisor;
    };
  };
}
export interface UiState {
  hrAdvisorUpdating: {
    [id: number]: boolean;
  };
}

export interface HrAdvisorState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  hrAdvisors: { byId: {} },
});

export const initUi = (): UiState => ({
  hrAdvisorUpdating: {},
});

export const initState = (): HrAdvisorState => ({
  entities: initEntities(),
  ui: initUi(),
});

export const entitiesReducer = (
  state = initEntities(),
  action: HrAdvisorAction,
) => {
  switch (action.type) {
    case GET_HR_ADVISOR_SUCCEEDED:
      return {
        ...state,
        hrAdvisors: {
          byId: {
            ...state.hrAdvisors.byId,
            [action.payload.id]: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

import { EducationStatus } from "../../models/types";
import {
  EducationStatusAction,
  GET_EDUCATION_STATUSES_STARTED,
  GET_EDUCATION_STATUSES_SUCCEEDED,
  GET_EDUCATION_STATUSES_FAILED,
} from "./educationStatusActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface EducationStatusState {
  byId: {
    [id: number]: EducationStatus;
  };
  loading: boolean;
}

export const initEducationStatusState = (): EducationStatusState => ({
  byId: [],
  loading: false,
});

const educationStatusReducer = (
  state = initEducationStatusState(),
  action: EducationStatusAction,
): EducationStatusState => {
  switch (action.type) {
    case GET_EDUCATION_STATUSES_STARTED:
      return { ...state, loading: true };
    case GET_EDUCATION_STATUSES_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case GET_EDUCATION_STATUSES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default educationStatusReducer;

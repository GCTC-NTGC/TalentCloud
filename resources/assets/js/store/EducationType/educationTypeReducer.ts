import { EducationType } from "../../models/types";
import {
  EducationTypeAction,
  GET_EDUCATION_TYPES_STARTED,
  GET_EDUCATION_TYPES_SUCCEEDED,
  GET_EDUCATION_TYPES_FAILED,
} from "./educationTypeActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface EducationTypeState {
  byId: {
    [id: number]: EducationType;
  };
  loading: boolean;
}

export const initEducationTypeState = (): EducationTypeState => ({
  byId: [],
  loading: false,
});

const educationTypeReducer = (
  state = initEducationTypeState(),
  action: EducationTypeAction,
): EducationTypeState => {
  switch (action.type) {
    case GET_EDUCATION_TYPES_STARTED:
      return { ...state, loading: true };
    case GET_EDUCATION_TYPES_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case GET_EDUCATION_TYPES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default educationTypeReducer;

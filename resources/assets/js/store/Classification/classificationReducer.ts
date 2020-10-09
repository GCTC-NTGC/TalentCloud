import { Classification } from "../../models/types";
import {
  ClassificationAction,
  GET_CLASSIFICATIONS_STARTED,
  GET_CLASSIFICATIONS_SUCCEEDED,
  GET_CLASSIFICATIONS_FAILED,
} from "./classificationActions";
//import { mapToObject, getId, hasKey } from "../../helpers/queries";

export interface ClassificationState {
  loading: boolean;
}

export const initClassificationState = (): ClassificationState => ({
  loading: false,
});

const classificationReducer = (
  state = initClassificationState(),
  action: ClassificationAction,
): ClassificationState => {
  switch (action.type) {
    case GET_CLASSIFICATIONS_STARTED:
      return { /*...state,*/ loading: true };
    case GET_CLASSIFICATIONS_SUCCEEDED:
      return { /*...state,*/ loading: false };
    case GET_CLASSIFICATIONS_FAILED:
      return { /*...state,*/ loading: false };
    default:
      return state;
  }
};

export default classificationReducer;

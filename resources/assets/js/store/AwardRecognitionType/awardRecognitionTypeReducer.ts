import { AwardRecognitionType } from "../../models/types";
import {
  AwardRecognitionTypeAction,
  GET_AWARD_RECOGNITION_TYPES_STARTED,
  GET_AWARD_RECOGNITION_TYPES_SUCCEEDED,
  GET_AWARD_RECOGNITION_TYPES_FAILED,
} from "./awardRecognitionTypeActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface AwardRecognitionTypeState {
  byId: {
    [id: number]: AwardRecognitionType;
  };
  loading: boolean;
}

export const initAwardRecognitionTypeState = (): AwardRecognitionTypeState => ({
  byId: [],
  loading: false,
});

const awardRecognitionTypeReducer = (
  state = initAwardRecognitionTypeState(),
  action: AwardRecognitionTypeAction,
): AwardRecognitionTypeState => {
  switch (action.type) {
    case GET_AWARD_RECOGNITION_TYPES_STARTED:
      return { ...state, loading: true };
    case GET_AWARD_RECOGNITION_TYPES_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case GET_AWARD_RECOGNITION_TYPES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default awardRecognitionTypeReducer;

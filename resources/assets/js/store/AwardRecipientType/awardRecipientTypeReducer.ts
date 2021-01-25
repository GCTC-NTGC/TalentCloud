import { AwardRecipientType } from "../../models/types";
import {
  AwardRecipientTypeAction,
  GET_AWARD_RECIPIENT_TYPES_STARTED,
  GET_AWARD_RECIPIENT_TYPES_SUCCEEDED,
  GET_AWARD_RECIPIENT_TYPES_FAILED,
} from "./awardRecipientTypeActions";
import { mapToObject, getId } from "../../helpers/queries";

export interface AwardRecipientTypeState {
  byId: {
    [id: number]: AwardRecipientType;
  };
  loading: boolean;
}

export const initAwardRecipientTypeState = (): AwardRecipientTypeState => ({
  byId: [],
  loading: false,
});

const awardRecipientTypeReducer = (
  state = initAwardRecipientTypeState(),
  action: AwardRecipientTypeAction,
): AwardRecipientTypeState => {
  switch (action.type) {
    case GET_AWARD_RECIPIENT_TYPES_STARTED:
      return { ...state, loading: true };
    case GET_AWARD_RECIPIENT_TYPES_SUCCEEDED:
      return { byId: mapToObject(action.payload, getId), loading: false };
    case GET_AWARD_RECIPIENT_TYPES_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default awardRecipientTypeReducer;

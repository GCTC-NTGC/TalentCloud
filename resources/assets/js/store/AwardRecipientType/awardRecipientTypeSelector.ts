import { createSelector } from "reselect";
import { RootState } from "../store";
import { AwardRecipientType } from "../../models/types";
import { hasKey } from "../../helpers/queries";

export const getAwardRecipientTypeState = (
  state: RootState,
): { [id: number]: AwardRecipientType } => state.awardRecipientType.byId;

export const getAwardRecipientTypes = createSelector(
  getAwardRecipientTypeState,
  (awardRecognitionTypeState): AwardRecipientType[] =>
    Object.values(awardRecognitionTypeState),
);

export const getAwardRecipientTypeById = (
  state: RootState,
  id: number,
): AwardRecipientType | null =>
  hasKey(getAwardRecipientTypeState(state), id)
    ? getAwardRecipientTypeState(state)[id]
    : null;

import { createSelector } from "reselect";
import { RootState } from "../store";
import { AwardRecognitionType } from "../../models/types";
import { hasKey } from "../../helpers/queries";

export const getAwardRecognitionTypeState = (
  state: RootState,
): { [id: number]: AwardRecognitionType } => state.awardRecognitionType.byId;

export const getAwardRecognitionTypes = createSelector(
  getAwardRecognitionTypeState,
  (awardRecognitionTypeState): AwardRecognitionType[] =>
    Object.values(awardRecognitionTypeState),
);

export const getAwardRecognitionTypeById = (
  state: RootState,
  id: number,
): AwardRecognitionType | null =>
  hasKey(getAwardRecognitionTypeState(state), id)
    ? getAwardRecognitionTypeState(state)[id]
    : null;

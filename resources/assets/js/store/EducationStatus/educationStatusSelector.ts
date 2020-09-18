import { createSelector } from "reselect";
import { RootState } from "../store";
import { EducationStatus } from "../../models/types";
import { hasKey } from "../../helpers/queries";

export const getEducationStatusState = (
  state: RootState,
): { [id: number]: EducationStatus } => state.educationStatus.byId;

export const getEducationStatuses = createSelector(
  getEducationStatusState,
  (awardRecognitionTypeState): EducationStatus[] =>
    Object.values(awardRecognitionTypeState),
);

export const getEducationStatusById = (
  state: RootState,
  id: number,
): EducationStatus | null =>
  hasKey(getEducationStatusState(state), id)
    ? getEducationStatusState(state)[id]
    : null;

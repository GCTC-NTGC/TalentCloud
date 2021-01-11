import { createSelector } from "reselect";
import { RootState } from "../store";
import { EducationType } from "../../models/types";
import { hasKey } from "../../helpers/queries";

export const getEducationTypeState = (
  state: RootState,
): { [id: number]: EducationType } => state.educationType.byId;

export const getEducationTypes = createSelector(
  getEducationTypeState,
  (awardRecognitionTypeState): EducationType[] =>
    Object.values(awardRecognitionTypeState),
);

export const getEducationTypeById = (
  state: RootState,
  id: number,
): EducationType | null =>
  hasKey(getEducationTypeState(state), id)
    ? getEducationTypeState(state)[id]
    : null;

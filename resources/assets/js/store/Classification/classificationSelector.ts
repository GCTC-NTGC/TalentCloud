import { createSelector } from "reselect";
import { RootState } from "../store";
import { Classification } from "../../models/types";
import { hasKey } from "../../helpers/queries";

const getClassificationState = (state: RootState): { [key: string]: Classification } =>
 state.classification.byId;

export const getClassifications = createSelector(
  getClassificationState,
  (ClassificationState): Classification[] => Object.values(ClassificationState),
);

export const getClassificationById = (
  state: RootState,
  id: number,
): Classification  =>
  getClassificationState(state)[id]





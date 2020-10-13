import { createSelector } from "reselect";
import { RootState } from "../store";
import { Classification } from "../../models/types";

export const getClassificationState = (state: RootState): { [key: string]: Classification } =>
 state.classification.byId;

export const getClassifications = createSelector(
  getClassificationState,
  (ClassificationState): Classification[] => Object.values(ClassificationState),
);

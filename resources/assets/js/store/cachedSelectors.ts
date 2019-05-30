import {
  createSelectorCreator,
  defaultMemoize,
  createSelector,
} from "reselect";
import { isEqual } from "lodash";

export const defaultSelectorOptions = { selectorCreator: createSelector };

// create a "selector creator" that uses lodash.isEqual instead of ===
export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

export const deepEqualSelectorOptions = {
  selectorCreator: createDeepEqualSelector,
};

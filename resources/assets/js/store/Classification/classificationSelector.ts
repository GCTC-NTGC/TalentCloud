import { createSelector } from "reselect";
import { RootState } from "../store";
import { Classification } from "../../models/types";

// I still have no idea
const getClassificationState = (state: RootState): { [key: string]: Classification } =>
 state.classification.byId;

 // Get the list of classifications already stored in the state (via the function in classificationactions)
export const getClassifications = createSelector(
  getClassificationState,
  (ClassificationState): Classification[] => Object.values(ClassificationState),
);

export const formatClassificationsForDropdown = function(classifications : Classification[]) : {value : number, label: string}[] {
    let classificationsArr : {value : number, label: string}[] = [];
    classifications.forEach(function(classification) {
      classificationsArr.push({value : classification.id, label : classification.key
      })
    })
    return classificationsArr
}

// Get a classification from the redux state by passing in an ID
export const getClassificationById = (
  state: RootState,
  id: number,
): Classification  =>
  getClassificationState(state)[id]





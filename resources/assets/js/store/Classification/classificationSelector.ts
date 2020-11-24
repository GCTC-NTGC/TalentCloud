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

export const classificationsExtractKeyValueJsonArray = function(classifications : Classification[]) : {value : number, label: string}[] {
    let classificationsArr : {value : number, label: string}[] = [];
    classifications.forEach(function(classification) {
      classificationsArr.push({value : classification.id, label : classification.key
      })
    })
    return classificationsArr
}

export const classificationsExtractKeyValueJson = function(classifications) : JSON {
  let classificationsJson : any = {}
  let output : JSON;

  classifications.forEach(function (classification) {
    classificationsJson[classification.key] = classification.id
  })

  output = <JSON>classificationsJson
  return output
}

export const getClassificationKey = function(classifications : Classification[], classification: number | string): string {
  let lClassification : Classification = classifications.filter(c => c.id == classification)[0]
  return lClassification ? lClassification.key : ""
}

// Get a classification from the redux state by passing in an ID
export const getClassificationById = (
  state: RootState,
  id: number,
): Classification  =>
  getClassificationState(state)[id]

export const classificationsIsLoading = (state: RootState): boolean =>
  state.classification.loading;

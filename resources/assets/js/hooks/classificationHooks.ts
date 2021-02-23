import { useEffect } from "react";
import { useSelector } from "react-redux";
import { DispatchType } from "../configureStore";
import { Classification } from "../models/types";
import {
  getClassifications,
  classificationsIsLoading,
} from "../store/Classification/classificationSelector";
import { loadClassificationsIntoState } from "../store/Classification/classificationActions";

// eslint-disable-next-line import/prefer-default-export
export function useLoadClassifications(
  dispatch: DispatchType,
): {
  classifications: Classification[];
  isLoadingClassifications: boolean;
} {
  const classifications = useSelector(getClassifications);
  const isLoading = useSelector(classificationsIsLoading);

  useEffect((): void => {
    if (classifications.length === 0 && !isLoading) {
      dispatch(loadClassificationsIntoState());
    }
  }, [classifications.length, isLoading, dispatch]);

  return { classifications, isLoadingClassifications: isLoading };
}

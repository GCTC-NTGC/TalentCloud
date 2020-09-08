import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { MutableRefObject } from "react";

/**
 * Focuses on a element with given id.
 * @param id
 */
export const focusOnElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.focus();
  }
};

/**
 * Runs validation on all forms, then returns true if they are all valid.
 * TODO: Figure out how to focus the first (or last) invalid input, if any.
 * @param refs
 */
export const validateAllForms = (
  refs: MutableRefObject<FormikProps<FormikValues>>[],
): Promise<boolean> => {
  return Promise.all(
    refs.map((ref: MutableRefObject<FormikProps<FormikValues>>) =>
      ref.current.validateForm(),
    ),
  ).then((errors) => errors.every(isEmpty));
};

/**
 * Submits all forms.
 * @param refs
 */
export const submitAllForms = (
  refs: React.MutableRefObject<FormikProps<FormikValues>>[],
): Promise<void[]> => {
  return Promise.all(
    refs.map((ref: MutableRefObject<FormikProps<FormikValues>>) =>
      // TODO: Might need to make one mass submission by combining all values into an array.
      ref.current.submitForm(),
    ),
  );
};

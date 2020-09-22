import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { RefObject } from "react";
import { notEmpty } from "./queries";

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
  refs: RefObject<FormikProps<FormikValues>>[],
): Promise<boolean> => {
  return Promise.all(
    refs
      .filter(notEmpty)
      .map(
        (ref: RefObject<FormikProps<FormikValues>>): Promise<any> =>
          ref.current !== null ? ref.current.validateForm() : Promise.resolve(),
      ),
  ).then((errors) => errors.every(isEmpty));
};

/**
 * Submits all forms.
 * @param refs
 */
export const submitAllForms = (
  refs: React.RefObject<FormikProps<FormikValues>>[],
): Promise<void[]> => {
  return Promise.all(
    refs.filter(notEmpty).map((ref: RefObject<FormikProps<FormikValues>>) => {
      // TODO: Might need to make one mass submission by combining all values into an array.
      return ref.current !== null
        ? ref.current.submitForm()
        : Promise.resolve();
    }),
  );
};

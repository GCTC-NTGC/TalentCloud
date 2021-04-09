import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { RefObject } from "react";
import { notEmpty } from "./queries";

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

/**
 * Takes a list of formik refs and returns a list of the refs that pass validation.
 * @param refs
 * @returns
 */
export const getValidForms = (
  refs: RefObject<FormikProps<FormikValues>>[],
): Promise<RefObject<FormikProps<FormikValues>>[]> => {
  const validFormRefs: React.RefObject<FormikProps<FormikValues>>[] = [];

  return Promise.all(
    refs.filter(notEmpty).map(
      (ref: RefObject<FormikProps<FormikValues>>): Promise<void> => {
        if (ref.current !== null) {
          return ref.current.validateForm().then((errors) => {
            if (errors && isEmpty(errors)) {
              validFormRefs.push(ref);
            }
          });
        }
        return Promise.resolve();
      },
    ),
  ).then(() => validFormRefs);
};

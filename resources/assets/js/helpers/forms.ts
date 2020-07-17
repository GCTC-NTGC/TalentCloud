import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { MutableRefObject } from "react";

export const focusOnElement = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.focus();
  }
};

export const validateAllForms = async (
  refs: MutableRefObject<MutableRefObject<FormikProps<FormikValues>>[]>,
  formBaseId: string,
): Promise<boolean> => {
  await Promise.all(
    refs.current.map((ref: MutableRefObject<FormikProps<FormikValues>>) =>
      ref.current.validateForm(),
    ),
  ).then((errors) => {
    for (let i = 0; i < errors.length; i += 1) {
      if (!isEmpty(errors[i])) {
        focusOnElement(`${formBaseId}${refs.current[i].current.values.id}`);
        break;
      }
    }
  });

  const invalidForm = refs.current.some(
    (ref: MutableRefObject<FormikProps<FormikValues>>) => !ref.current.isValid,
  );

  return invalidForm ? Promise.resolve(false) : Promise.resolve(true);
};

export const submitAllForms = async (
  refs: React.MutableRefObject<
    React.MutableRefObject<FormikProps<FormikValues>>[]
  >,
): Promise<void[]> => {
  return Promise.all(
    refs.current.map((ref: MutableRefObject<FormikProps<FormikValues>>) =>
      // TODO: Might need to make one mass submission by combining all values into an array.
      ref.current.submitForm(),
    ),
  );
};

import { FormikProps, FormikValues } from "formik";
import _ from "lodash";
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
  for (let i = 0; i < refs.current.length; i += 1) {
    let ref = refs.current[i].current;
    // eslint-disable-next-line no-await-in-loop
    const isFormValid = await refs.current[i].current
      .validateForm()
      .then(() => {
        ref = refs.current[i].current;
        if (!_.isEmpty(ref.errors) && !ref.isSubmitting && !ref.isValid) {
          return false;
        }
        return true;
      });
    if (!isFormValid) {
      focusOnElement(`${formBaseId}${ref.values.id}`);
      break;
    }
  }

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
      // TODO: Might need make one mass submission by combining all values into an array.
      ref.current.submitForm(),
    ),
  );
};

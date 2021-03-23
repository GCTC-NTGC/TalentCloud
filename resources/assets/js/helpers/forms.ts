import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { RefObject } from "react";
import { notEmpty } from "./queries";

/**
 * Takes a selector or an HTMLElement and focuses on the element.
 * @param x
 */
export const focusOnElement = (x: HTMLElement | string): void => {
  if (typeof x === "string") {
    const element = document.querySelector(x) as HTMLElement;
    if (element) {
      element.focus();
    }
  } else {
    x.focus();
  }
};

/**
 * Toggle accordion with given id.
 * @param id
 */
export const toggleAccordion = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle("active");
    const { firstElementChild } = element;
    if (firstElementChild) {
      firstElementChild.setAttribute("aria-expanded", "true");
    }
  }
};

/**
 * Focuses on the previous element in the list.
 * @param focusList List of focusable HTML elements.
 */
export const focusPreviousItem = (focusList: HTMLElement[]) => {
  const item = document.activeElement as HTMLElement;
  const activeElementIndex = focusList.findIndex(
    (focusItem) => item === focusItem,
  );
  // If, the active element is first in order then move focus to last element in the focus list.
  // Else, move to the previous element.
  if (activeElementIndex === 0) {
    focusList[focusList.length - 1].focus();
  } else {
    focusList[activeElementIndex - 1].focus();
  }
};

/**
 * Focuses on the next element in the list.
 * @param focusList List of focusable HTML elements.
 */
export const focusNextItem = (focusList: HTMLElement[]) => {
  const item = document.activeElement as HTMLElement;
  const activeElementIndex = focusList.findIndex(
    (focusItem) => item === focusItem,
  );
  // If, the active element is last in order then move focus to first element in the focus list.
  // Else, move to the previous element.
  if (activeElementIndex === focusList.length - 1) {
    focusList[0].focus();
  } else {
    focusList[activeElementIndex + 1].focus();
  }
};

/**
 * Returns a list of tabable elements within the parent element.
 * @param parentElement Parent element.
 * @returns
 */
export const getTabList = (parentElement: HTMLElement | null): HTMLElement[] =>
  parentElement
    ? (Array.from(
        parentElement.querySelectorAll(
          "button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      ) as HTMLElement[])
    : [];

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

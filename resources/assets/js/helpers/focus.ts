import { FormikProps, FormikValues } from "formik";
import isEmpty from "lodash/isEmpty";
import { RefObject } from "react";
import { notEmpty } from "./queries";

export const focusableElementSelector =
  "button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])";

/**
 * Get all focusable elements that are descendent of element,
 * or all focusable elements in the document body if element is null.
 */
export const getFocusableElements = (
  element: HTMLElement | null = null,
): NodeListOf<HTMLElement> =>
  element
    ? element.querySelectorAll<HTMLElement>(focusableElementSelector)
    : document.body.querySelectorAll<HTMLElement>(focusableElementSelector);

/**
 * Takes a selector or an HTMLElement and focuses on the element.
 * @param x
 */
export const focusOnElement = (x: HTMLElement | string): void => {
  if (typeof x === "string") {
    if (x === "") {
      return;
    }
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
export const focusPreviousItem = (focusList: NodeListOf<HTMLElement>): void => {
  const item = document.activeElement as HTMLElement;
  const activeElementIndex = Array.from(focusList).findIndex(
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
export const focusNextItem = (focusList: NodeListOf<HTMLElement>): void => {
  const item = document.activeElement as HTMLElement;
  const activeElementIndex = Array.from(focusList).findIndex(
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

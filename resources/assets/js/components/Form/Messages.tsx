import { defineMessages } from "react-intl";

export const validationMessages = defineMessages({
  required: {
    id: "formValidation.required",
    defaultMessage: "This field is required.",
    description: "Error message displayed when a required field is empty.",
  },
  tooShort: {
    id: "formValidation.tooShort",
    defaultMessage: "Too short!",
    description:
      "Error message displayed when a field value is below the minimum length.",
  },
  tooLong: {
    id: "formValidation.tooLong",
    defaultMessage: "Too long!",
    description:
      "Error message displayed when a field value is above the maximum length.",
  },
  invalidSelection: {
    id: "formValidation.invalidSelection",
    defaultMessage: "Please select from the available options.",
    description:
      "Error message displayed when a field value is outside of the available selection options.",
  },
  checkboxRequired: {
    id: "formValidation.checkboxRequired",
    defaultMessage: "At least one checkbox is required.",
    description:
      "Error message displayed when a required checkbox group or radio group is empty.",
  },
  endDateRequiredIfNotOngoing: {
    id: "formValidation.endDateRequiredIfNotOngoing",
    defaultMessage: "If activity is not ongoing, End Date is required.",
    description:
      "Error message displayed when a date is required due to activity no longer being ongoing.",
  },
  dateMustBePast: {
    id: "formValidation.dateMustBePast",
    defaultMessage: "Please select a date in the past.",
    description: "Error message displayed when selected date is in the future.",
  },
  endDateAfterStart: {
    id: "formValidation.endDateAfterStart",
    defaultMessage: "Please select an End Date that is after the Start Date",
    description:
      "Error message displayed when a selected End Date is earlier than the Start date.",
  },
  overMaxWords: {
    id: "formValidation.overMaxWords",
    defaultMessage: "Must be under {numberOfWords} words",
    description:
      "Error message displayed when surpassing the maximum words allowed.",
  },
});

export const inputMessages = defineMessages({
  error: {
    id: "formInput.error",
    defaultMessage: "Something went wrong.",
    description: "Generic error message for inputs.",
  },
  required: {
    id: "formInput.required",
    defaultMessage: "Required",
    description: "Displayed next to required form inputs.",
  },
});

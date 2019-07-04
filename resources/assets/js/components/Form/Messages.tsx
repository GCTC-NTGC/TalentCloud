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
});

export const inputMessages = defineMessages({
  required: {
    id: "formInput.required",
    defaultMessage: "Required",
    description: "Displayed next to required form inputs.",
  },
});

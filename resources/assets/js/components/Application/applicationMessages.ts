import { defineMessages } from "react-intl";

export const basicInfoMessages = defineMessages({
  header: {
    id: "application.basicInfo.header",
    defaultMessage: "My Basic Information",
    description: "Header for the Basic Info section of the Application.",
  },
  citizenshipLabel: {
    id: "application.basicInfo.citizenshipLabel",
    defaultMessage: "Which citizenship status applies to you?",
    description: "Label for the citizenship status select box.",
  },
  veteranStatusLabel: {
    id: "application.basicInfo.veteranStatusLabel",
    defaultMessage:
      "Are you a veteran or a member of the Canadian Armed Forces?",
    description: "Label for the veteran status select box.",
  },
  languageRequirementsHeader: {
    id: "application.basicInfo.languageRequirementsHeader",
    defaultMessage: "Language Requirements",
    description:
      "Header for language requirements section in Application form.",
  },
});

export const experienceMessages = defineMessages({
  header: {
    id: "application.experience.header",
    defaultMessage: "My Experience",
    description: "Header for the Experience section of the Application.",
  },
});

export const fitMessages = defineMessages({
  header: {
    id: "application.fit.heading",
    defaultMessage: "My Fit",
    description: "Heading for the Fit step in the Application form.",
  },
});

export const navigationMessages = defineMessages({
  continue: {
    id: "application.submitButtonLabel",
    defaultMessage: "Save & Continue",
    description:
      "The text displayed on the submit button for the Application form.",
  },
  quit: {
    id: "application.quitButtonLabel",
    defaultMessage: "Save & Quit",
    description:
      "The text displayed on the Save & Quit button of the Application form.",
  },
  return: {
    id: "application.returnButtonLabel",
    defaultMessage: "Save & Return to Previous Step",
    description:
      "The text displayed on the Save & Return button of the Application form.",
  },
});

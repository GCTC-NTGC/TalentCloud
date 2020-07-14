import { defineMessages } from "react-intl";

const displayMessages = defineMessages({
  sidebarLinkTitle: {
    id: "application.skills.sidebarLinkTitle",
    defaultMessage: "Go to this skill.",
    description: "Title attribute for sidebar links.",
  },
  accessibleAccordionButtonText: {
    id: "application.skills.accessibleAccordionButtonText",
    defaultMessage: "Click to view...",
    description: "Hidden accordion button text for accessibility.",
  },
  save: {
    id: "application.skills.saveButtonText",
    defaultMessage: "Save",
    description: "Button text for saving an experience skill justification.",
  },
  saved: {
    id: "application.skills.savedButtonText",
    defaultMessage: "Saved",
    description:
      "Button text for after an experience skill justification is saved.",
  },
  wordCountUnderMax: {
    id: "application.skills.wordCountUnderMax",
    defaultMessage: " words left.",
    description:
      "Message displayed next to word counter when user is under the maximum count.",
  },
  wordCountOverMax: {
    id: "application.skills.wordCountOverMax",
    defaultMessage: " words over the limit.",
    description:
      "Message displayed next to word counter when user is over the maximum count.",
  },
});

export default displayMessages;

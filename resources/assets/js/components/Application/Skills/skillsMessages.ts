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
  cancel: {
    id: "application.skills.cancelButtonText",
    defaultMessage: "Cancel",
    description: "Button text for cancelling the confirmation modal.",
  },
  modalConfirmHeading: {
    id: "application.skills.modalConfirmHeading",
    defaultMessage: "Are you sure?",
    description: "Heading text of the confirmation modal on the Skills page.",
  },
  modalConfirmBody: {
    id: "application.skills.modalConfirmBody",
    defaultMessage:
      "You're about to remove the link between this experience and the chosen skill. Any text you've provided for this skill will disappear from this experience everywhere on the site. Are you sure you want to remove this link?",
    description: "Body text of the confirmation modal on the Skills page.",
  },
  confirm: {
    id: "application.skills.confirmButtonText",
    defaultMessage: "Confirm Removal",
    description: "Button text for confirming the confirmation modal.",
  },
});

export default displayMessages;

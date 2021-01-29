import { defineMessages } from "react-intl";

export const formMessages = defineMessages({
  titleLabel: {
    id: "jobBuilder.details.titleLabel",
    defaultMessage: "What is the job title?",
    description: "The form label displayed on the title input.",
  },
  titlePlaceholder: {
    id: "jobBuilder.details.titlePlaceholder",
    defaultMessage: "e.g. Product Designer",
    description: "The form placeholder displayed on the title input.",
  },
  termLengthLabel: {
    id: "jobBuilder.details.termLengthLabel",
    defaultMessage: "How long is the term (in months)?",
    description: "The form label displayed on the term length input.",
  },
  termLengthPlaceholder: {
    id: "jobBuilder.details.termLengthPlaceholder",
    defaultMessage: "e.g. 3",
    description: "The form placeholder displayed on the term length input.",
  },
  classificationLabel: {
    id: "jobBuilder.details.classificationLabel",
    defaultMessage: "What is the classification?",
    description: "The form label displayed on the classification input.",
  },
  classificationNullSelection: {
    id: "jobBuilder.details.classificationNullSelection",
    defaultMessage: "Select a classification...",
    description:
      "The default selection option displayed on the classification input.",
  },
  levelLabel: {
    id: "jobBuilder.details.levelLabel",
    defaultMessage: "What is the level?",
    description: "The form label displayed on the level input.",
  },
  levelNullSelection: {
    id: "jobBuilder.details.levelNullSelection",
    defaultMessage: "Select a level...",
    description: "The default selection option displayed on the level input.",
  },
  securityLevelLabel: {
    id: "jobBuilder.details.securityLevelLabel",
    defaultMessage: "What is the security level?",
    description: "The form label displayed on the security level input.",
  },
  securityLevelNullSelection: {
    id: "jobBuilder.details.securityLevelNullSelection",
    defaultMessage: "Select a security level...",
    description:
      "The default selection option displayed on the security level input.",
  },
  languageLabel: {
    id: "jobBuilder.details.languageLabel",
    defaultMessage: "What is the language profile?",
    description: "The form label displayed on the language input.",
  },
  languageNullSelection: {
    id: "jobBuilder.details.languageNullSelection",
    defaultMessage: "Select a language profile...",
    description:
      "The default selection option displayed on the language input.",
  },
  cityLabel: {
    id: "jobBuilder.details.cityLabel",
    defaultMessage: "What city is the team located in?",
    description: "The form label displayed on the city input.",
  },
  cityPlaceholder: {
    id: "jobBuilder.details.cityPlaceholder",
    defaultMessage: "e.g. Ottawa",
    description: "The form placeholder displayed on the city input.",
  },
  provinceLabel: {
    id: "jobBuilder.details.provinceLabel",
    defaultMessage: "What province is the team located in?",
    description: "The form label displayed on the province input.",
  },
  provinceNullSelection: {
    id: "jobBuilder.details.provinceNullSelection",
    defaultMessage: "Select a province...",
    description:
      "The default selection option displayed on the province input.",
  },
  remoteWorkGroupLabel: {
    id: "jobBuilder.details.remoteWorkGroupLabel",
    defaultMessage: "Select a remote work option:",
    description: "The form label displayed on the remote work radio group.",
  },
  remoteWorkWorldLabel: {
    id: "jobBuilder.details.remoteWorkWorldLabel",
    defaultMessage:
      "Yes, I'm willing to supervise employees anywhere in the world.",
    description:
      "The form label displayed on the 'world' remote work radio option.",
  },
  remoteWorkCanadaLabel: {
    id: "jobBuilder.details.remoteWorkCanadaLabel",
    defaultMessage:
      "Yes, I'm willing to supervise employees in any province or territory in Canada.",
    description:
      "The form label displayed on the 'canada' remote work radio option.",
  },
  remoteWorkNoneLabel: {
    id: "jobBuilder.details.remoteWorkNoneLabel",
    defaultMessage:
      "No, I require the employee in this position to be in the same geographic location as the office.",
    description:
      "The form label displayed on the 'none' remote work radio option.",
  },
  teleworkGroupLabel: {
    id: "jobBuilder.details.teleworkGroupLabel",
    defaultMessage: "Select a telework option:",
    description: "The form label displayed on the telework radio group.",
  },
  flexHoursGroupLabel: {
    id: "jobBuilder.details.flexHoursGroupLabel",
    defaultMessage: "Select a flexible hours option:",
    description: "The form label displayed on the flex hours radio group.",
  },
  travelGroupLabel: {
    id: "jobBuilder.details.travelGroupLabel",
    defaultMessage: "Select a travel option:",
    description: "The form label displayed on the travel radio group.",
  },
  overtimeGroupLabel: {
    id: "jobBuilder.details.overtimeGroupLabel",
    defaultMessage: "Select a overtime option:",
    description: "The form label displayed on the overtime radio group.",
  },
  educationRequirementsLabel: {
    id: "jobBuilder.details.educationRequirementsLabel",
    defaultMessage: "Customize the Education Requirement:",
    description:
      "The form label displayed above 'customize education requirement' textbox",
  },
  educationRequirementPlaceholder: {
    id: "jobBuilder.details.educationRequirementPlaceholder",
    defaultMessage: "Paste the paragraph here to edit...",
    description:
      "The placeholder displayed in 'customize education requirement' textbox",
  },
});

export const educationMessages = defineMessages({
  classificationNotFound: {
    id: "jobBuilder.details.educationMessages.classificationNotFound",
    defaultMessage: "Classification not found.",
    description:
      "Job Classification message when the classification id is incorrect.",
  },
});

export const buttonMessages = defineMessages({
  buttonCopied: {
    id: "jobBuilder.details.button.copied",
    defaultMessage: "Copied!",
    description: "Confirmation for Button to copy text to clipboard.",
  },
  buttonCopyToClipboard: {
    id: "jobBuilder.details.button.copyToClipboard",
    defaultMessage: "Copy to Clipboard",
    description: "Button to copy text to clipboard.",
  },
});

import { defineMessages } from "react-intl";

export const accordionMessages = defineMessages({
  expand: {
    id: "application.accordion.expand",
    defaultMessage: "Click to view...",
    description: "Accessible text for expanding an accordion.",
  },
  dateRange: {
    id: "application.accordion.dateRange",
    defaultMessage: "{startDate} - {endDate}",
    description:
      "Shows the date range for the title bar (assuming activity has an end date).",
  },
  dateRangeCurrent: {
    id: "application.accordion.dateRangeCurrent",
    defaultMessage: "{startDate} - Current",
    description:
      "Shows the date range for the title bar (assuming activity is ongoing).",
  },
  detailsTitle: {
    id: "application.accordion.detailsTitle",
    defaultMessage: "Details of this Experience",
    description: "Subtitle of the details section.",
  },
  notApplicable: {
    id: "application.accordion.notApplicable",
    defaultMessage: "N/A",
    description: "Used for any un-set fields in experience accordions.",
  },
  experienceTypeLabel: {
    id: "application.accordion.experienceTypeLabel",
    defaultMessage: "Type of Experience:",
  },
  startDateLabel: {
    id: "application.accordion.startDateLabel",
    defaultMessage: "Start Date:",
  },
  endDateLabel: {
    id: "application.accordion.endDateLabel",
    defaultMessage: "End Date:",
  },
  ongoing: {
    id: "application.accordion.ongoing",
    defaultMessage: "Ongoing",
  },
  awardHeading: {
    id: "application.accordion.awardHeading",
    defaultMessage: "<b>{title}</b> - {institution}",
    description:
      "Heading of Award Experience accordion (this is the visible text when accordion is closed).",
  },
  awardSubheading: {
    id: "application.accordion.awardSubheading",
    defaultMessage: "Awarded on: {date}",
    description: "Shows the awarded date in the accordion title bar.",
  },
  awardType: {
    id: "application.accordion.awardType",
    defaultMessage: "Award Experience",
  },
  awardTitleLabel: {
    id: "application.accordion.awardTitleLabel",
    defaultMessage: "Award Title:",
  },
  awardRecipientLabel: {
    id: "application.accordion.awardRecipientLabel",
    defaultMessage: "Awarded to:",
  },
  awardIssuerLabel: {
    id: "application.accordion.awardIssuerLabel",
    defaultMessage: "Issuing Organization / Institution:",
  },
  awardScopeLabel: {
    id: "application.accordion.awardScopeLabel",
    defaultMessage: "Award Eligibility / Scope:",
  },
  awardDateLabel: {
    id: "application.accordion.awardDateLabel",
    defaultMessage: "Date Awarded:",
  },
  communityHeading: {
    id: "application.accordion.communityHeading",
    defaultMessage: "<b>{title}</b> - {group}",
    description:
      "Title of Community Experience accordion (this is the visible text when accordion is closed).",
  },
  communityType: {
    id: "application.accordion.communityType",
    defaultMessage: "Community Experience",
  },
  communityRoleLabel: {
    id: "application.accordion.communityRoleLabel",
    defaultMessage: "Role / Job Title:",
  },
  communityOrganizationLabel: {
    id: "application.accordion.communityOrganizationLabel",
    defaultMessage: "Group / Organization / Community:",
  },
  communityProjectLabel: {
    id: "application.accordion.communityProjectLabel",
    defaultMessage: "Project / Product:",
  },
  educationHeading: {
    id: "application.accordion.educationHeading",
    defaultMessage: "<b>{educationType} in {areaOfStudy}</b> - {institution}",
    description:
      "Title of education accordion (this is the visible text when accordion is closed).",
  },
  educationType: {
    id: "application.accordion.educationType",
    defaultMessage: "Education",
  },
  educationTypeLabel: {
    id: "application.accordion.educationTypeLabel",
    defaultMessage: "Type of Education:",
  },
  educationAreaOfStudyLabel: {
    id: "application.accordion.educationAreaOfStudyLabel",
    defaultMessage: "Area of Study:",
  },
  educationInstitutionLabel: {
    id: "application.accordion.educationInstitutionLabel",
    defaultMessage: "Institution:",
  },
  educationStatusLabel: {
    id: "application.accordion.educationStatusLabel",
    defaultMessage: "Status:",
  },
  educationThesisLabel: {
    id: "application.accordion.educationThesisLabel",
    defaultMessage: "Thesis Title:",
  },
  educationBlockcertLabel: {
    id: "application.accordion.educationBlockcertLabel",
    defaultMessage: "Blockcert Link:",
  },
  educationHasBlockcert: {
    id: "application.accordion.educationHasBlockcert",
    defaultMessage: "Yes, I have a Blockcert and can provide it on request.",
  },
  personalType: {
    id: "application.accordion.personalType",
    defaultMessage: "Personal Experience",
  },
  personalTitleLabel: {
    id: "application.accordion.personalTitleLabel",
    defaultMessage: "Title of Experience:",
  },
  personalDescriptionLabel: {
    id: "application.accordion.personalDescriptionLabel",
    defaultMessage: "Description:",
  },
  personalShareLabel: {
    id: "application.accordion.personalShareLabel",
    defaultMessage: "Consent to Share:",
  },
  personalShareAllowed: {
    id: "application.accordion.personalShareAllowed",
    defaultMessage: "Sharing Approved",
    description: "Text shown when user has consented to share this experience.",
  },
  personalShareDenied: {
    id: "application.accordion.personalShareDenied",
    defaultMessage: "Sharing Restricted",
    description:
      "Text shown when user has NOT consented to share this experience.",
  },
  workType: {
    id: "application.accordion.workType",
    defaultMessage: "Work Experience",
  },
  workRoleLabel: {
    id: "application.accordion.workRoleLabel",
    defaultMessage: "Role / Job Title:",
  },
  workOrganizationLabel: {
    id: "application.accordion.workOrganizationLabel",
    defaultMessage: "Organization / Company:",
  },
  workTeamLabel: {
    id: "application.accordion.workTeamLabel",
    defaultMessage: "Team / Group:",
  },
});

export const basicInfoMessages = defineMessages({
  heading: {
    id: "application.basicInfo.heading",
    defaultMessage: "My Basic Information",
    description: "Heading for the Basic Info section of the Application.",
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
  languageRequirementsHeading: {
    id: "application.basicInfo.languageRequirementsHeading",
    defaultMessage: "Language Requirements",
    description:
      "Heading for language requirements section in Application form.",
  },
  gcEmployeeStatus: {
    id: "application.basicInfo.gcEmployeeStatus",
    defaultMessage: "Are you a GC employee?",
    description: "Label for the gc employee status select box.",
  },
});

export const experienceMessages = defineMessages({
  heading: {
    id: "application.experience.heading",
    defaultMessage: "Your Experience",
    description: "Heading for the Experience section of the Application.",
  },
  educationTypeMissing: {
    id: "application.experience.educationTypeMissing",
    defaultMessage: "Education type not found",
    description: "Error message for when the education type cannot be found.",
  },
  educationStatusMissing: {
    id: "application.experience.educationStatusMissing",
    defaultMessage: "Education status not found",
    description: "Error message for when the education status cannot be found.",
  },
  awardRecipientMissing: {
    id: "application.experience.awardRecipientMissing",
    defaultMessage: "Award recipient not found",
    description: "Error message for when the award recipient cannot be found.",
  },
  awardRecognitionMissing: {
    id: "application.experience.awardRecognitionMissing",
    defaultMessage: "Award recognition not found",
    description:
      "Error message for when the award recognition cannot be found.",
  },
  errorRenderingExperience: {
    id: "application.experience.errorRenderingExperience",
    defaultMessage: "Experience failed to render (experience type missing).",
    description: "Error message displayed when experience fails to render.",
  },
});

export const educationRequirementMessages = defineMessages({
  missingClassification: {
    id: "application.education.missingClassification",
    defaultMessage: "UNKNOWN CLASSIFICATION",
    description:
      "This is shown in place of Education Requirements, if the job's classification has no matching justification. It's the result of an error and indicates a bug, and should never be see.",
  },
});

export const skillMessages = defineMessages({
  experienceSkillPlaceholder: {
    id: "application.skills.experienceSkillPlaceholder",
    defaultMessage: "Start writing here...",
    description:
      "Placeholder text for where the applicant describes how they used a Skill to achieve an Experience.",
  },
});

export const fitMessages = defineMessages({
  heading: {
    id: "application.fit.heading",
    defaultMessage: "My Fit",
    description: "Heading for the Fit step in the Application form.",
  },
  questionLabel: {
    id: "application.fit.questionLabel",
    defaultMessage: "Question {index}:",
    description: "Label for the question on the My Fit step.",
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

export const loadingMessages = defineMessages({
  loading: {
    id: "application.loading",
    defaultMessage: "Just a second...",
    description:
      "A message to inform the user that the page is incomplete because data is still being loaded.",
  },
});

export const myBasicInformationMessages = defineMessages({
  heading: {
    id: "application.experience.heading",
    defaultMessage: "My Basic Information",
    description: "Heading for the My Information section of the Application.",
  },
  govtJobInfo: {
    id: "application.experience.govtJobInfo",
    defaultMessage: "Government Job Information",
    description: "Heading for the Government Job Information section of the Application.",
  },
  isVerteran: {
    id: "application.experience.isVeteran",
    defaultMessage: "Are you a veteran or a member of the Canadian Armed forces?",
    description: "Label for the Government Job Information section of the Application to confirm if application is a veteran.",
  },
  inputError: {
    id: "application.experience.inputEreror",
    defaultMessage: "This input has an error.",
    description: "Label displayed when the user selects an option that results in an error",
  },
  citizenStatus: {
    id: "application.experience.citizenStatus",
    defaultMessage: "Citizenship Status:",
    description: "Label for the Government Job Information section of the Application to confirm if application citizenship status.",
  },
  addClassification: {
    id: "application.experience.addClassification",
    defaultMessage: "+ Add Another Classification",
    description: "Label for the Government Job Information section of the Application to add experience working as a given classification.",
  },
  isGCEmployee: {
    id: "application.experience.isGCEmployee",
    defaultMessage: "Currently an employee of the Government of Canada",
    description: "Label for the Government Job Information section of the Application to add confirm if application is a Government of Canada employee.",
  },
  completionLabel: {
    id: "application.experience.completionLabel",
    defaultMessage: "Completion Status",
  },
  completionDefault: {
    id: "application.experience.completionDefault",
    defaultMessage: "Select a completion status...",
  },
  addPreviousGcExperience: {
    id: "application.experience.addPreviousGcExperience",
    defaultMessage: "Add previous Government classifications",
  },
  currentClassificationAndLevel: {
    id: "application.experience.currentClassificationAndLevel",
    defaultMessage: "Current classification and level",
  },
  accountSettings: {
    id: "application.experience.accountSettings",
    defaultMessage: "Account Settings",
  },
  toChangeGoTo: {
    id: "application.experience.toChangeGoTo",
    defaultMessage: "To change these go to",
  },
  personalEmail: {
    id: "application.experience.personalEmail",
    defaultMessage: "Personal Email",
  },
  name: {
    id: "application.experience.name",
    defaultMessage: "Name",
  },
});








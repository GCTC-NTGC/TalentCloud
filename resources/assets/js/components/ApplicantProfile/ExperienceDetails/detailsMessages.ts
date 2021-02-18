import { defineMessages } from "react-intl";

export default defineMessages({
  dateRange: {
    id: "applicantProfile.experienceDetails.dateRange",
    defaultMessage: "{startDate} - {endDate}",
    description:
      "Shows the date range for the title bar (assuming activity has an end date).",
  },
  dateRangeCurrent: {
    id: "applicantProfile.experienceDetails.dateRangeCurrent",
    defaultMessage: "{startDate} - Current",
    description:
      "Shows the date range for the title bar (assuming activity is ongoing).",
  },
  detailsTitle: {
    id: "applicantProfile.experienceDetails.detailsTitle",
    defaultMessage: "Details of this Experience",
    description: "Subtitle of the details section.",
  },
  notApplicable: {
    id: "applicantProfile.experienceDetails.notApplicable",
    defaultMessage: "N/A",
    description: "Used for any un-set fields in experience dialogs.",
  },
  experienceTypeLabel: {
    id: "applicantProfile.experienceDetails.experienceTypeLabel",
    defaultMessage: "Type of Experience:",
  },
  startDateLabel: {
    id: "applicantProfile.experienceDetails.startDateLabel",
    defaultMessage: "Start Date:",
  },
  endDateLabel: {
    id: "applicantProfile.experienceDetails.endDateLabel",
    defaultMessage: "End Date:",
  },
  ongoing: {
    id: "applicantProfile.experienceDetails.ongoing",
    defaultMessage: "Ongoing",
  },
  awardHeading: {
    id: "applicantProfile.experienceDetails.awardHeading",
    defaultMessage: "<b>{title}</b> - {institution}",
    description:
      "Heading of Award Experience dialog (this is the visible text when dialog is closed).",
  },
  awardSubheading: {
    id: "applicantProfile.experienceDetails.awardSubheading",
    defaultMessage: "Awarded on: {date}",
    description: "Shows the awarded date in the dialog title bar.",
  },
  awardType: {
    id: "applicantProfile.experienceDetails.awardType",
    defaultMessage: "Award Experience",
  },
  awardTitleLabel: {
    id: "applicantProfile.experienceDetails.awardTitleLabel",
    defaultMessage: "Award Title:",
  },
  awardRecipientLabel: {
    id: "applicantProfile.experienceDetails.awardRecipientLabel",
    defaultMessage: "Awarded to:",
  },
  awardIssuerLabel: {
    id: "applicantProfile.experienceDetails.awardIssuerLabel",
    defaultMessage: "Issuing Organization / Institution:",
  },
  awardScopeLabel: {
    id: "applicantProfile.experienceDetails.awardScopeLabel",
    defaultMessage: "Award Eligibility / Scope:",
  },
  awardDateLabel: {
    id: "applicantProfile.experienceDetails.awardDateLabel",
    defaultMessage: "Date Awarded:",
  },
  communityHeading: {
    id: "applicantProfile.experienceDetails.communityHeading",
    defaultMessage: "<b>{title}</b> - {group}",
    description:
      "Title of Community Experience dialog (this is the visible text when dialog is closed).",
  },
  communityType: {
    id: "applicantProfile.experienceDetails.communityType",
    defaultMessage: "Community Experience",
  },
  communityRoleLabel: {
    id: "applicantProfile.experienceDetails.communityRoleLabel",
    defaultMessage: "Role / Job Title:",
  },
  communityOrganizationLabel: {
    id: "applicantProfile.experienceDetails.communityOrganizationLabel",
    defaultMessage: "Group / Organization / Community:",
  },
  communityProjectLabel: {
    id: "applicantProfile.experienceDetails.communityProjectLabel",
    defaultMessage: "Project / Product:",
  },
  educationHeading: {
    id: "applicantProfile.experienceDetails.educationHeading",
    defaultMessage: "<b>{educationType} in {areaOfStudy}</b> - {institution}",
    description:
      "Title of education dialog (this is the visible text when dialog is closed).",
  },
  educationType: {
    id: "applicantProfile.experienceDetails.educationType",
    defaultMessage: "Education",
  },
  educationTypeLabel: {
    id: "applicantProfile.experienceDetails.educationTypeLabel",
    defaultMessage: "Type of Education:",
  },
  educationAreaOfStudyLabel: {
    id: "applicantProfile.experienceDetails.educationAreaOfStudyLabel",
    defaultMessage: "Area of Study:",
  },
  educationInstitutionLabel: {
    id: "applicantProfile.experienceDetails.educationInstitutionLabel",
    defaultMessage: "Institution:",
  },
  educationStatusLabel: {
    id: "applicantProfile.experienceDetails.educationStatusLabel",
    defaultMessage: "Status:",
  },
  educationThesisLabel: {
    id: "applicantProfile.experienceDetails.educationThesisLabel",
    defaultMessage: "Thesis Title:",
  },
  educationBlockcertLabel: {
    id: "applicantProfile.experienceDetails.educationBlockcertLabel",
    defaultMessage: "Blockcert Link:",
  },
  educationHasBlockcert: {
    id: "applicantProfile.experienceDetails.educationHasBlockcert",
    defaultMessage: "Yes, I have a Blockcert and can provide it on request.",
  },
  personalType: {
    id: "applicantProfile.experienceDetails.personalType",
    defaultMessage: "Personal Experience",
  },
  personalTitleLabel: {
    id: "applicantProfile.experienceDetails.personalTitleLabel",
    defaultMessage: "Title of Experience:",
  },
  personalDescriptionLabel: {
    id: "applicantProfile.experienceDetails.personalDescriptionLabel",
    defaultMessage: "Description:",
  },
  personalShareLabel: {
    id: "applicantProfile.experienceDetails.personalShareLabel",
    defaultMessage: "Consent to Share:",
  },
  personalShareAllowed: {
    id: "applicantProfile.experienceDetails.personalShareAllowed",
    defaultMessage: "Sharing Approved",
    description: "Text shown when user has consented to share this experience.",
  },
  personalShareDenied: {
    id: "applicantProfile.experienceDetails.personalShareDenied",
    defaultMessage: "Sharing Restricted",
    description:
      "Text shown when user has NOT consented to share this experience.",
  },
  workType: {
    id: "applicantProfile.experienceDetails.workType",
    defaultMessage: "Work Experience",
  },
  workRoleLabel: {
    id: "applicantProfile.experienceDetails.workRoleLabel",
    defaultMessage: "Role / Job Title:",
  },
  workOrganizationLabel: {
    id: "applicantProfile.experienceDetails.workOrganizationLabel",
    defaultMessage: "Organization / Company:",
  },
  workTeamLabel: {
    id: "applicantProfile.experienceDetails.workTeamLabel",
    defaultMessage: "Team / Group:",
  },
});

import { defineMessages, MessageDescriptor } from "react-intl";
import {
  CitizenshipId,
  VeteranId,
  LanguageRequirementId,
} from "../../../models/lookupConstants";
import { getOrThrowError } from "../../../helpers/queries";

export default defineMessages({
  header: {
    id: "applicantTimeline.basicInfo.header",
    defaultMessage: "My Basic Information",
    description: "Header for the Applicant Timeline form.",
  },
  citizenshipLabel: {
    id: "applicantTimeline.basicInfo.citizenshipLabel",
    defaultMessage: "Which citizenship status applies to you?",
    description: "Label for the citizenship status select box.",
  },
  veteranStatusLabel: {
    id: "applicantTimeline.basicInfo.veteranStatusLabel",
    defaultMessage: "Are you a veteran or member of the Canadian Armed Forces?",
    description: "Label for the veteran status select box.",
  },
  languageRequirementsHeader: {
    id: "applicantTimeline.basicInfo.languageRequirementsHeader",
    defaultMessage: "Language Requirements",
    description:
      "Header for language requirements section in applicant timeline form.",
  },
  languageTestLabel: {
    id: "applicantTimeline.basicInfo.languageTestLabel",
    defaultMessage:
      "I understand that my second language proficiency will be tested as part of this process.",
    description: "Label for language test checkbox in applicant timeline form.",
  },
  educationRequirementHeader: {
    id: "applicantTimeline.basicInfo.educationRequirementHeader",
    defaultMessage: "Education Requirements",
    description:
      "Header for education requirement section in applicant timeline form.",
  },
  meetEducationRequirement: {
    id: "applicantTimeline.basicInfo.meetEducationRequirement",
    defaultMessage:
      "Based on the information outlined below, do you meet the minimum experience or education requirements for this position?",
    description:
      "Text for education requirement section in applicant timeline form.",
  },
  educationRequirementLabel: {
    id: "applicantTimeline.basicInfo.educationRequirementLabel",
    defaultMessage:
      "I meet this requirement and will provide details in the application.",
    description:
      "Label for education requirement section in applicant timeline form.",
  },
  nullSelectOption: {
    id: "applicantTimeline.basicInfo.nullSelectOption",
    defaultMessage: "Select an option...",
    description: "The default selection option displayed on select box.",
  },
});

export const citizenshipDeclarations = defineMessages({
  [CitizenshipId.citizen]: {
    id: "applicantTimeline.citizenshipDeclaration.citizen",
    defaultMessage: "Canadian Citizen",
    description: "Select option text for the 'Citizen' citizen declarations.",
  },
  [CitizenshipId.permanentResident]: {
    id: "applicantTimeline.citizenshipDeclaration.permanentResident",
    defaultMessage: "Permanent Resident of Canada",
    description:
      "Select option text for the 'Permanent Resident of Canada' citizen declarations.",
  },
  [CitizenshipId.workPermitOpen]: {
    id: "applicantTimeline.citizenshipDeclaration.workPermitOpen",
    defaultMessage: "I have a permit that allows me to work anywhere in Canada",
    description:
      "Select option text for the 'Work Permit Open' citizen declarations.",
  },
  [CitizenshipId.workPermitClosed]: {
    id: "applicantTimeline.citizenshipDeclaration.workPermitClosed",
    defaultMessage:
      "I have a permit that only allows me to work for a specific organization",
    description:
      "Select option text for the 'Work Permit Closed' citizen declarations.",
  },
  [CitizenshipId.notEntitled]: {
    id: "applicantTimeline.citizenshipDeclaration.notEntitled",
    defaultMessage: "I am currently not entitled to work in Canada",
    description:
      "Select option text for the 'Not Entitled' citizen declarations.",
  },
});

export const citizenshipDeclaration = (
  citizenshipDeclararionId: number,
): MessageDescriptor =>
  getOrThrowError(
    citizenshipDeclarations,
    citizenshipDeclararionId,
    "invalid Citizenship Declaration",
  );

export const veteranStatuses = defineMessages({
  [VeteranId.none]: {
    id: "applicantTimeline.veteranStatus.none",
    defaultMessage:
      "No - I am not a veteran or a member of the Canadian Armed Forces.",
    description: "Select option text for the 'None' veteran status.",
  },
  [VeteranId.current]: {
    id: "applicantTimeline.veteranStatus.current",
    defaultMessage:
      "Yes - I am currently a member of the Canadian Armed Forces.",
    description: "Select option text for the 'Current' veteran status.",
  },
  [VeteranId.past]: {
    id: "applicantTimeline.veteranStatus.past",
    defaultMessage: "Yes - I am a veteran.",
    description: "Select option text for the 'Past' veteran status.",
  },
});

export const veteranStatus = (veteranStatusId: number): MessageDescriptor =>
  getOrThrowError(veteranStatuses, veteranStatusId, "invalid Veteran Status");

const languageRequirementDescriptions = defineMessages({
  [LanguageRequirementId.english]: {
    id: "applicantTimeline.languageRequirement.english",
    defaultMessage: "This position requires advanced knowledge of English.",
    description:
      "Description for the 'English' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.french]: {
    id: "applicantTimeline.languageRequirement.french",
    defaultMessage: "This position requires advanced knowledge of French.",
    description:
      "Description for the 'French' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.bilingualIntermediate]: {
    id: "applicantTimeline.languageRequirement.bilingualIntermediate",
    defaultMessage:
      "This position requires advanced knowledge of either French or English.",
    description:
      "Description for the 'Bilingual Intermediate' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.bilingualAdvanced]: {
    id: "applicantTimeline.languageRequirement.bilingualAdvanced",
    defaultMessage:
      "This position requires working knowledge of both French and English. As part of this process, your language abilities will be tested by the Public Service Commission of Canada (the proficiency requirement for this position is BBB).",
    description:
      "Description for the 'Bilingual Advanced' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.englishOrFrench]: {
    id: "applicantTimeline.languageRequirement.englishOrFrench",
    defaultMessage:
      "This position requires advanced knowledge of both French and English. As part of this process, your language abilities will be tested by the Public Service Commission of Canada (the proficiency requirement for this position is CBC).",
    description:
      "Description for the 'English or French' language requirement on the applicant timeline form.",
  },
});

export const languageRequirementDescription = (
  languageRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    languageRequirementDescriptions,
    languageRequirementId,
    "invalid Language Requirement Description (Timeline)",
  );

const languageRequirementLabels = defineMessages({
  [LanguageRequirementId.english]: {
    id: "applicantTimeline.languageRequirement.label.english",
    defaultMessage:
      "I have strong reading, writing and verbal communication skills in English.",
    description:
      "Label for 'English' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.french]: {
    id: "applicantTimeline.languageRequirement.label.french",
    defaultMessage:
      "I have strong reading, writing and verbal communication skills in French.",
    description:
      "Text for 'French' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.bilingualIntermediate]: {
    id: "applicantTimeline.languageRequirement.label.bilingualIntermediate",
    defaultMessage:
      "I have strong reading, writing and verbal communication skills in English OR French.",
    description:
      "Text for 'Bilingual Intermediate' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.bilingualAdvanced]: {
    id: "applicantTimeline.languageRequirement.label.bilingualAdvanced",
    defaultMessage:
      "I have intermediate or better reading, writing and verbal communication skills in English and French.",
    description:
      "Text for 'Bilingual Advanced' language requirement on the applicant timeline form.",
  },
  [LanguageRequirementId.englishOrFrench]: {
    id: "applicantTimeline.languageRequirement.label.englishOrFrench",
    defaultMessage:
      "I have strong reading, writing and verbal communication skills in English and French.",
    description:
      "Text for 'English or French' language requirement on the applicant timeline form.",
  },
});

export const languageRequirementLabel = (
  languageRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    languageRequirementLabels,
    languageRequirementId,
    "invalid Language Requirement Label (Timeline)",
  );

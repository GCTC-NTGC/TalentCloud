/* eslint camelcase: "off" */
import { defineMessages, MessageDescriptor, IntlShape } from "react-intl";
import {
  AssessmentTypeId,
  AssessmentTypeIdValues,
  CriteriaTypeId,
  CriteriaTypeIdValues,
  SkillLevelId,
  SkillLevelIdValues,
  SkillTypeId,
  SkillTypeIdValues,
  ProvinceId,
  SecurityClearanceId,
  LanguageRequirementId,
  FrequencyId,
  OvertimeRequirementId,
  TravelRequirementId,
  LocationId,
  ResponseScreeningBuckets as ResponseBuckets,
  ReviewStatusId,
  ReviewStatusName,
  GCEmployeeStatus,
} from "./lookupConstants";
import { getOrThrowError } from "../helpers/queries";
import { Experience } from "./types";

const skillLevelDescriptions = defineMessages({
  hardBasic: {
    id: "skillLevel.hard.basic.description",
    defaultMessage:
      "You have the ability to accomplish basic tasks with steady supervision and clear direction. The tasks you’re assigned are clear and don’t involve significant complexity. Their impact is usually locally felt. As you advance in this category, you should be developing the ability to accomplish tasks of moderate complexity with steady supervision. You will also need to be able to accomplish basic tasks with little or no supervision. This level is usually associated with tasks that form the bulk of the work for lower level positions, such as junior analysts or entry level developers.",
    description: "Description of basic hard skill level.",
  },
  hardIntermediate: {
    id: "skillLevel.hard.intermediate.description",
    defaultMessage:
      "You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision. The approach to the tasks, and how they are delivered, is determined by the supervisor. You contribute input and advice. You are able to advance the task, even in the face of small to moderate hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision. This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers.",
    description: "Description of intermediate skill level.",
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact with supervision. You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor’s consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels. This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers.",
    description: "Description of advanced hard skill level.",
  },
  hardExpert: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level.",
  },
  softBasic: {
    id: "skillLevel.soft.basic.description",
    defaultMessage:
      "You’re working on acquiring this skill or attribute. You are able to demonstrate it under favourable conditions (low stress, minimal difficulty) and can apply it in a work context intermittently.",
    description: "Description of soft basic skill level.",
  },
  softIntermediate: {
    id: "skillLevel.soft.intermediate.description",
    defaultMessage:
      "You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of low-to-moderate stress or difficulty. Your peers and supervisors are able to attest to the fact that you have been able to demonstrate this skill or attribute on a regular basis.",
    description: "Description of soft intermediate skill level.",
  },
  softAdvanced: {
    id: "skillLevel.soft.advanced.description",
    defaultMessage:
      "You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of high stress or difficulty. Your peers and supervisors recognize this as a strength you demonstrate in the workplace.",
    description: "Description of soft advanced skill level.",
  },
  softExpert: {
    id: "skillLevel.soft.expert.description",
    defaultMessage:
      "This is a foundational part of who you are. You consistently demonstrate this skill or attribute, even under conditions of extreme stress or difficulty. Your peers and supervisors recognize this as a significant strength you demonstrate in the workplace, providing an example to others.",
    description: "Description of expert soft skill level.",
  },
  asset: {
    id: "skillLevel.asset.description",
    defaultMessage:
      "This skill isn't required for the employee to do the job, but it provides an added benefit to their skillset and will improve the speed or effectiveness of their work.",
    description: "Description of what it means to be an 'Asset' skill.",
  },
});

const skillLevelNames = defineMessages({
  hardBasic: {
    id: "skillLevel.hard.basic.name",
    defaultMessage: "Beginner",
    description: "Single-word descriptor of basic hard skill level.",
  },
  hardIntermediate: {
    id: "skillLevel.hard.intermediate.name",
    defaultMessage: "Intermediate",
    description: "Single-word descriptor of intermediate hard skill level.",
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.name",
    defaultMessage: "Advanced",
    description: "Single-word descriptor of advanced hard skill level.",
  },
  hardExpert: {
    id: "skillLevel.hard.expert.name",
    defaultMessage: "Expert",
    description: "Single-word descriptor of expert hard skill level.",
  },
  softBasic: {
    id: "skillLevel.soft.basic.name",
    defaultMessage: "In Early Development",
    description: "Single-word descriptor of soft basic skill level.",
  },
  softIntermediate: {
    id: "skillLevel.soft.intermediate.name",
    defaultMessage: "Moderately in Evidence",
    description: "Single-word descriptor of soft intermediate skill level.",
  },
  softAdvanced: {
    id: "skillLevel.soft.advanced.name",
    defaultMessage: "Strongly in Evidence",
    description: "Single-word descriptor of soft advanced skill level.",
  },
  softExpert: {
    id: "skillLevel.soft.expert.name",
    defaultMessage: "Deep Level Demonstration",
    description: "Single-word descriptor of soft expert skill level.",
  },
  asset: {
    id: "skillLevel.asset.name",
    defaultMessage: "Asset / No Level Required",
    description: "Name for 'Asset' skills.",
  },
});

const skillLevelL10n = (
  skillLevelId: number,
  skillTypeId: number,
  l10nObj: Record<
    string,
    {
      id: string;
      defaultMessage: string;
      description: string;
    }
  >,
): MessageDescriptor => {
  if (!SkillLevelIdValues.includes(skillLevelId)) {
    throw new Error("invalid SkillLevelIdValue");
  }
  if (!SkillTypeIdValues.includes(skillTypeId)) {
    throw new Error("invalid SkillTypeIdValue");
  }
  const basicKey = SkillLevelId.Basic.toString();
  const intermediateKey = SkillLevelId.Intermediate.toString();
  const advancedKey = SkillLevelId.Advanced.toString();
  const expertKey = SkillLevelId.Expert.toString();
  return {
    [SkillTypeId.Hard.toString()]: {
      [basicKey]: l10nObj.hardBasic,
      [intermediateKey]: l10nObj.hardIntermediate,
      [advancedKey]: l10nObj.hardAdvanced,
      [expertKey]: l10nObj.hardExpert,
    },
    [SkillTypeId.Soft.toString()]: {
      [basicKey]: l10nObj.softBasic,
      [intermediateKey]: l10nObj.softIntermediate,
      [advancedKey]: l10nObj.softAdvanced,
      [expertKey]: l10nObj.softExpert,
    },
  }[skillTypeId.toString()][skillLevelId.toString()];
};

export const skillLevelDescription = (
  skillLevelId: number,
  skillTypeId: number,
): MessageDescriptor =>
  skillLevelL10n(skillLevelId, skillTypeId, skillLevelDescriptions);

export const skillLevelName = (
  skillLevelId: number,
  skillTypeId: number,
): MessageDescriptor =>
  skillLevelL10n(skillLevelId, skillTypeId, skillLevelNames);

const assessmentTypes = defineMessages({
  [AssessmentTypeId.NarrativeAssessment]: {
    id: "assessmentType.narrativeAssessment",
    defaultMessage: "Narrative Review",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.ApplicationScreeningQuestion]: {
    id: "assessmentType.applicationScreeningQuestion",
    defaultMessage: "Application Screening Question",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.GroupTest]: {
    id: "assessmentType.groupTest",
    defaultMessage: "Group Test",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.InformalPhoneConversation]: {
    id: "assessmentType.informalPhoneConversation",
    defaultMessage: "Informal Phone Conversation",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.Interview]: {
    id: "assessmentType.interview",
    defaultMessage: "Interview",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.OnlineExam]: {
    id: "assessmentType.onlineExam",
    defaultMessage: "Online Exam",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.OnSiteExam]: {
    id: "assessmentType.onSiteExam",
    defaultMessage: "On-Site Exam",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.TakeHomeExam]: {
    id: "assessmentType.takeHomeExam",
    defaultMessage: "Take Home Exam",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.PortfolioReview]: {
    id: "assessmentType.portfolioReview",
    defaultMessage: "Portfolio Review",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.ReferenceCheck]: {
    id: "assessmentType.referenceCheck",
    defaultMessage: "Reference Check",
    description: "Title of an assessment type.",
  },
  [AssessmentTypeId.SeriousGames]: {
    id: "assessmentType.seriousGames",
    defaultMessage: "Serious Games",
    description: "Title of an assessment type.",
  },
});

export const assetSkillName = (): MessageDescriptor => skillLevelNames.asset;
export const assetSkillDescription = (): MessageDescriptor =>
  skillLevelDescriptions.asset;

export const assessmentType = (assessmentTypeId: number): MessageDescriptor =>
  getOrThrowError(
    assessmentTypes,
    assessmentTypeId,
    "invalid AssessmentTypeValue",
  );

const criteriaTypes = defineMessages({
  [CriteriaTypeId.Asset]: {
    id: "criteriaType.asset",
    defaultMessage: "Asset",
    description: "Title of an asset criteria type.",
  },
  [CriteriaTypeId.Essential]: {
    id: "criteriaType.essential",
    defaultMessage: "Essential",
    description: "Title of an essential criteria type.",
  },
});

export const criteriaType = (criteriaTypeId: number): MessageDescriptor =>
  getOrThrowError(criteriaTypes, criteriaTypeId, "invalid CriteriaTypeValue");

const assessmentTypeDescriptions = defineMessages({
  [AssessmentTypeId.NarrativeAssessment]: {
    id: "assessmentType.narrativeAssessment.description",
    defaultMessage:
      "This is a description requested during the application process, in which applicants to self-identify and describe their experience and level of expertise with a skill.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.ApplicationScreeningQuestion]: {
    id: "assessmentType.applicationScreeningQuestion.description",
    defaultMessage:
      "These questions appear in the application form, and are submitted through Talent Cloud, they allow a first glance at the applicant’s understanding, process, knowledge, or cultural fit for the position.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.GroupTest]: {
    id: "assessmentType.groupTest.description",
    defaultMessage:
      "Applicants perform this test in real-time in conjunction with other applicants, team members, or facilitators, to determine their skill prowess, team communication, and performance in a collaborative environment.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.InformalPhoneConversation]: {
    id: "assessmentType.informalPhoneConversation.description",
    defaultMessage:
      "A loose structure chat between a member of the hiring board and an applicant, aimed at discovering the applicant’s knowledge, aptitudes, or personality traits, conversations may vary between applicants.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.Interview]: {
    id: "assessmentType.interview.description",
    defaultMessage:
      "A formal question-and-answer examination performed in real-time between the hiring-board and an applicant. Questions are aimed at assessing skill expertise, level, and approach. Each question is crafted beforehand and follows the same structure between all interviewed applicants.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.OnlineExam]: {
    id: "assessmentType.onlineExam.description",
    defaultMessage:
      "Prepared examination that does not require supervision, and can be performed from any location through internet access, with a defined time-frame for completion.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.OnSiteExam]: {
    id: "assessmentType.onSiteExam.description",
    defaultMessage:
      "Prepared examination that requires the applicant to perform a test at a specific location under supervision, aimed at assessing skill expertise and technique.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.TakeHomeExam]: {
    id: "assessmentType.takeHomeExam.description",
    defaultMessage:
      "Applicants receive a physical package containing the assessment tools, they complete the assessment at their own leisure and at their preferred location without supervision, and must return the materials before a specific deadline.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.PortfolioReview]: {
    id: "assessmentType.portfolioReview.description",
    defaultMessage:
      "During the application process, applicants provide access to samples of their work to exhibit their skill level, and back-up their skill claims. ",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.ReferenceCheck]: {
    id: "assessmentType.referenceCheck.description",
    defaultMessage:
      "During the application process, applicants provide contact information to an acquaintance who can validate and confirm their skill expertise, knowledge or aptitude.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  [AssessmentTypeId.SeriousGames]: {
    id: "assessmentType.seriousGames.description",
    defaultMessage:
      "Test involving the use of games to explore a candidate’s communication skills, resilience, emotional intelligence, among many other soft skills.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
});

export const assessmentTypeDescription = (
  assessmentTypeId: number,
): MessageDescriptor =>
  getOrThrowError(
    assessmentTypeDescriptions,
    assessmentTypeId,
    "invalid AssessmentTypeValue",
  );

const standardAssessmentText = defineMessages({
  narrativeReviewQuestion: {
    id: "assessmentType.narrativeReview.standardQuestion",
    defaultMessage:
      "Narrative Review of skill includes all descriptions added by the applicant in their application.",
    description:
      "Description which replaces 'interview question' for the Narrative Review assessment type.",
  },
  narrativeReviewAnswer: {
    id: "assessmentType.narrativeReview.standardAnswer",
    defaultMessage:
      "The provided description contains sufficient evidence to advance this candidate to the next screening steps.",
    description:
      "Standard evaluation statement which replaces 'expected answer' for all skills under the Narrative Review assessment type.",
  },
});

const provinceNames = defineMessages({
  [ProvinceId.AB]: {
    id: "province.ab",
    defaultMessage: "Alberta",
  },
  [ProvinceId.BC]: {
    id: "province.bc",
    defaultMessage: "British Columbia",
  },
  [ProvinceId.MB]: {
    id: "province.mb",
    defaultMessage: "Manitoba",
  },
  [ProvinceId.NL]: {
    id: "province.nl",
    defaultMessage: "Newfoundland and Labrador",
  },
  [ProvinceId.NB]: {
    id: "province.nb",
    defaultMessage: "New Brunswick",
  },
  [ProvinceId.NS]: {
    id: "province.ns",
    defaultMessage: "Nova Scotia",
  },
  [ProvinceId.NU]: {
    id: "province.nu",
    defaultMessage: "Nunavut",
  },
  [ProvinceId.NT]: {
    id: "province.nt",
    defaultMessage: "Northwest Territories",
  },
  [ProvinceId.ON]: {
    id: "province.on",
    defaultMessage: "Ontario",
  },
  [ProvinceId.PE]: {
    id: "province.pe",
    defaultMessage: "Prince Edward Island",
  },
  [ProvinceId.QC]: {
    id: "province.qc",
    defaultMessage: "Quebec",
  },
  [ProvinceId.SK]: {
    id: "province.sk",
    defaultMessage: "Saskatchewan",
  },
  [ProvinceId.YT]: {
    id: "province.yk",
    defaultMessage: "Yukon",
  },
});

export const provinceName = (provinceId: number): MessageDescriptor =>
  getOrThrowError(provinceNames, provinceId, "invalid ProvinceId");

const provinceAbbreviations = defineMessages({
  [ProvinceId.AB]: {
    id: "province.ab.abbreviation",
    defaultMessage: "Alb.",
  },
  [ProvinceId.BC]: {
    id: "province.bc.abbreviation",
    defaultMessage: "B.C.",
  },
  [ProvinceId.MB]: {
    id: "province.mb.abbreviation",
    defaultMessage: "Man.",
  },
  [ProvinceId.NL]: {
    id: "province.nl.abbreviation",
    defaultMessage: "N.L.",
  },
  [ProvinceId.NB]: {
    id: "province.nb.abbreviation",
    defaultMessage: "N.B.",
  },
  [ProvinceId.NS]: {
    id: "province.ns.abbreviation",
    defaultMessage: "N.S.",
  },
  [ProvinceId.NU]: {
    id: "province.nu.abbreviation",
    defaultMessage: "Nvt.",
  },
  [ProvinceId.NT]: {
    id: "province.nt.abbreviation",
    defaultMessage: "N.W.T.",
  },
  [ProvinceId.ON]: {
    id: "province.on.abbreviation",
    defaultMessage: "Ont.",
  },
  [ProvinceId.PE]: {
    id: "province.pe.abbreviation",
    defaultMessage: "P.E.I.",
  },
  [ProvinceId.QC]: {
    id: "province.qc.abbreviation",
    defaultMessage: "Que.",
  },
  [ProvinceId.SK]: {
    id: "province.sk.abbreviation",
    defaultMessage: "Sask.",
  },
  [ProvinceId.YT]: {
    id: "province.yk.abbreviation",
    defaultMessage: "Y.T.",
  },
});

export const provinceAbbreviation = (provinceId: number): MessageDescriptor =>
  getOrThrowError(provinceAbbreviations, provinceId, "invalid ProvinceId");

const securityClearances = defineMessages({
  [SecurityClearanceId.reliability]: {
    id: "securityClearance.reliability",
    defaultMessage: "Reliability",
  },
  [SecurityClearanceId.secret]: {
    id: "securityClearance.secret",
    defaultMessage: "Secret",
  },
  [SecurityClearanceId.topSecret]: {
    id: "securityClearance.topSecret",
    defaultMessage: "Top Secret",
  },
});

export const securityClearance = (
  securityClearanceId: number,
): MessageDescriptor =>
  getOrThrowError(
    securityClearances,
    securityClearanceId,
    "invalid security clearance id",
  );

const languageRequirements = defineMessages({
  [LanguageRequirementId.english]: {
    id: "languageRequirement.english",
    defaultMessage: "English Essential",
  },
  [LanguageRequirementId.french]: {
    id: "languageRequirement.french",
    defaultMessage: "French Essential",
  },
  [LanguageRequirementId.bilingualIntermediate]: {
    id: "languageRequirement.bilingualIntermediate",
    defaultMessage: "Bilingual - Intermediate",
  },
  [LanguageRequirementId.bilingualAdvanced]: {
    id: "languageRequirement.bilingualAdvanced",
    defaultMessage: "Bilingual - Advanced",
  },
  [LanguageRequirementId.englishOrFrench]: {
    id: "languageRequirement.englishOrFrench",
    defaultMessage: "English or French",
  },
});

export const languageRequirement = (
  languageRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    languageRequirements,
    languageRequirementId,
    "invalid LanguageRequirementId",
  );

const languageRequirementDescriptions = defineMessages({
  [LanguageRequirementId.english]: {
    id: "languageRequirement.description.english",
    defaultMessage:
      "This position requires fluency in English in both written and verbal communication. As part of the assessment of your language abilities, the hiring manager may ask you to complete some assessment steps in English, such as interview questions or an exam.",
  },
  [LanguageRequirementId.french]: {
    id: "languageRequirement.description.french",
    defaultMessage:
      "This position requires fluency in French in both written and verbal communication. As part of the assessment of your language abilities, the hiring manager may ask you to complete some assessment steps in French, such as interview questions or an exam.",
  },
  [LanguageRequirementId.bilingualIntermediate]: {
    id: "languageRequirement.description.bilingualIntermediate",
    // TODO: turn "Public Service Commission of Canada" into a link to https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs/information-candidates/language-requirements-candidates.html
    defaultMessage:
      "This position requires working knowledge of both French and English. This means that you can take on job duties in either French or English, and you have intermediate reading, writing and verbal communication skills in both official languages. As part of this selection process, your language abilities will be tested by the Public Service Commission of Canada.",
  },
  [LanguageRequirementId.bilingualAdvanced]: {
    id: "languageRequirement.description.bilingualAdvanced",
    // TODO: turn "Public Service Commission of Canada" into a link to https://www.canada.ca/en/public-service-commission/jobs/services/gc-jobs/information-candidates/language-requirements-candidates.html
    defaultMessage:
      "This position requires advanced knowledge of both French and English. This means that you can take on job duties in either French or English, and you have strong reading, writing and verbal communication skills in both official languages. As part of this selection process, your language abilities will be tested by the Public Service Commission of Canada Public Service Commission of Canada.",
  },
  [LanguageRequirementId.englishOrFrench]: {
    id: "languageRequirement.description.englishOrFrench",
    defaultMessage:
      "For this position, you meet the language requirements if you have strong reading, writing and verbal communication skills in either English or French, or both (bilingual).",
  },
});

export const languageRequirementDescription = (
  languageRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    languageRequirementDescriptions,
    languageRequirementId,
    "invalid LanguageRequirementId",
  );

const languageRequirementContexts = defineMessages({
  basic: {
    id: "languageRequirement.context.basic",
    defaultMessage:
      "You can submit this initial application in either official language of your choice (English or French).",
  },
  expanded: {
    id: "languageRequirement.context.expanded",
    defaultMessage:
      "You can complete all other steps of this assessment process in the official language of your choice, including the initial application, interview, exam and any other evaluation components.",
  },
});

export const languageRequirementContext = (
  languageRequirementId: number,
): MessageDescriptor => {
  switch (languageRequirementId) {
    case LanguageRequirementId.bilingualIntermediate:
    case LanguageRequirementId.bilingualAdvanced:
      return languageRequirementContexts.expanded;

    case LanguageRequirementId.englishOrFrench:
    case LanguageRequirementId.english:
    case LanguageRequirementId.french:
    default:
      return languageRequirementContexts.basic;
  }
};

export const narrativeReviewStandardQuestion = (): MessageDescriptor =>
  standardAssessmentText.narrativeReviewQuestion;

export const narrativeReviewStandardAnswer = (): MessageDescriptor =>
  standardAssessmentText.narrativeReviewAnswer;

const frequencyMessages = defineMessages({
  [FrequencyId.never]: {
    id: "jobBuilder.details.frequencyNeverLabel",
    defaultMessage: "Never",
    description: "The form label displayed on 'never' frequency options.",
  },
  [FrequencyId.rarely]: {
    id: "jobBuilder.details.frequencyRarelyLabel",
    defaultMessage: "Rarely",
    description: "The form label displayed on 'rarely' frequency options.",
  },
  [FrequencyId.occasionally]: {
    id: "jobBuilder.details.frequencyOccasionallyLabel",
    defaultMessage: "Occasionally",
    description:
      "The form label displayed on 'occasionally' frequency options.",
  },
  [FrequencyId.frequently]: {
    id: "jobBuilder.details.frequencyFrequentlyLabel",
    defaultMessage: "Frequently",
    description: "The form label displayed on 'frequently' frequency options.",
  },
  [FrequencyId.always]: {
    id: "jobBuilder.details.frequencyAlwaysLabel",
    defaultMessage: "Almost Always",
    description: "The form label displayed on 'always' frequency options.",
  },
});

export const frequencyName = (frequencyId: number): MessageDescriptor =>
  getOrThrowError(frequencyMessages, frequencyId, "invalid FrequencyId");

const overtimeRequirementDescriptions = defineMessages({
  [OvertimeRequirementId.frequently]: {
    id: "jobBuilder.details.overtimeFrequentlyLabel",
    defaultMessage: "Yes, overtime is frequently required for the position.",
    description: "The form label displayed on 'frequently' overtime options",
  },
  [OvertimeRequirementId.available]: {
    id: "jobBuilder.details.overtimeOpportunitiesAvailableLabel",
    defaultMessage:
      "Yes, overtime opportunities are available for those that are interested.",
    description:
      "The form label displayed on 'overtime opportunities available' overtime options",
  },
  [OvertimeRequirementId.none]: {
    id: "jobBuilder.details.overtimeNoneRequiredLabel",
    defaultMessage: "No, overtime is not required for the position.",
    description:
      "The form label displayed on 'no overtime required' overtime options",
  },
});

export const overtimeRequirementDescription = (
  overtimeRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    overtimeRequirementDescriptions,
    overtimeRequirementId,
    "invalid OvertimeRequirementId",
  );

const travelRequirementDescriptions = defineMessages({
  [TravelRequirementId.frequently]: {
    id: "jobBuilder.details.travelFrequentlyLabel",
    defaultMessage: "Yes, travel is frequently required for the position.",
    description: "The form label displayed on 'frequently' travel options",
  },
  [TravelRequirementId.available]: {
    id: "jobBuilder.details.travelOpportunitiesAvailableLabel",
    defaultMessage:
      "Yes, travel opportunities are available for those that are interested.",
    description:
      "The form label displayed on 'travel opportunities available' travel options",
  },
  [TravelRequirementId.none]: {
    id: "jobBuilder.details.travelNoneRequiredLabel",
    defaultMessage: "No, travel is not required for the position.",
    description:
      "The form label displayed on 'no travel required' travel options",
  },
});

export const travelRequirementDescription = (
  travelRequirementId: number,
): MessageDescriptor =>
  getOrThrowError(
    travelRequirementDescriptions,
    travelRequirementId,
    "invalid TravelRequirementId",
  );

export const generalLocations = defineMessages({
  [LocationId.jobGeneric]: {
    id: "activityfeed.locations.review",
    defaultMessage: "Job Poster Builder",
    description: "Location where the activity is located.",
  },
  [LocationId.summary]: {
    id: "activityfeed.locations.hr.summary",
    defaultMessage: "HR Summary Page",
    description: "Location where the activity is located.",
  },
  [LocationId.preview]: {
    id: "activityfeed.locations.hr.preview",
    defaultMessage: "HR Preview Page",
    description: "Location where the activity is located.",
  },
  [LocationId.applicantsGeneric]: {
    id: "activityfeed.locations.applications",
    defaultMessage: "Applicant Review Page",
    description: "Location where the activity is located.",
  },
  [LocationId.screeningPlan]: {
    id: "activityfeed.locations.screeningPlan",
    defaultMessage: "Assessment Plan",
    description: "Location where the activity is located.",
  },
  notFound: {
    id: "activityfeed.locations.notFound",
    defaultMessage: "Location not found",
    description: "Error message if location id is not recognized",
  },
});

export const generalLocationOption = (
  locationId: string,
): MessageDescriptor => {
  switch (locationId) {
    /* Job Poster Review Page */
    case LocationId.jobGeneric:
    case LocationId.heading:
    case LocationId.basicInfo:
    case LocationId.impact:
    case LocationId.tasks:
    case LocationId.skills:
    case LocationId.langRequirements:
    case LocationId.environment:
      return generalLocations[LocationId.jobGeneric];
    /* Applicant Review Page */
    case LocationId.applicantsGeneric:
    case LocationId.underConsideration:
    case LocationId.optionalConsideration:
    case LocationId.notUnderConsideration:
      return generalLocations[LocationId.applicantsGeneric];
    /* Assessment Plan */
    case LocationId.screeningPlan:
    case LocationId.screeningPlanBuilder:
    case LocationId.screeningPlanSummary:
    case LocationId.screeningPlanRatings:
      return generalLocations[LocationId.screeningPlan];
    /* Hr Portal */
    case LocationId.summary:
      return generalLocations[LocationId.summary];
    case LocationId.preview:
      return generalLocations[LocationId.preview];

    default:
      return generalLocations.notFound;
  }
};

export const jobReviewLocations = defineMessages({
  [LocationId.jobGeneric]: {
    id: "activityfeed.locations.review.general",
    defaultMessage: "General",
    description: "Location of the activity.",
  },
  [LocationId.heading]: {
    id: "activityfeed.locations.review.heading",
    defaultMessage: "Job Page Heading",
    description: "Location of the activity.",
  },
  [LocationId.basicInfo]: {
    id: "activityfeed.locations.review.basicInfo",
    defaultMessage: "Basic Information",
    description: "Location of the activity.",
  },
  [LocationId.impact]: {
    id: "activityfeed.locations.review.impact",
    defaultMessage: "Impact",
    description: "Location of the activity.",
  },
  [LocationId.tasks]: {
    id: "activityfeed.locations.review.tasks",
    defaultMessage: "Tasks",
    description: "Location of the activity.",
  },
  [LocationId.skills]: {
    id: "activityfeed.locations.review.skills",
    defaultMessage: "Skills",
    description: "Location of the activity.",
  },
  [LocationId.langRequirements]: {
    id: "activityfeed.locations.review.langRequirements",
    defaultMessage: "Language Requirements",
    description: "Location of the activity.",
  },
  [LocationId.environment]: {
    id: "activityfeed.locations.review.environment",
    defaultMessage: "Environment",
    description: "Location of the activity.",
  },
});

export const applicantReviewLocations = defineMessages({
  [LocationId.applicantsGeneric]: {
    id: "activityfeed.locations.applicantReview.general",
    defaultMessage: "General",
    description: "Location of the activity.",
  },
  [LocationId.underConsideration]: {
    id: "activityfeed.locations.applicantReview.underConsideration",
    defaultMessage: "Under Consideration",
    description: "Location of the activity.",
  },
  [LocationId.optionalConsideration]: {
    id: "activityfeed.locations.applicantReview.optionalConsideration",
    defaultMessage: "Optional Consideration",
    description: "Location of the activity.",
  },
  [LocationId.notUnderConsideration]: {
    id: "activityfeed.locations.applicantReview.notUnderConsideration",
    defaultMessage: "No Longer Under Consideration",
    description: "Location of the activity.",
  },
});

export const screeningPlanLocations = defineMessages({
  [LocationId.screeningPlan]: {
    id: "activityfeed.locations.screeningPlan.general",
    defaultMessage: "General",
    description: "Location of the activity.",
  },
  [LocationId.screeningPlanBuilder]: {
    id: "activityfeed.locations.screeningPlan.builder",
    defaultMessage: "Assessment Plan Builder",
    description: "Location of the activity.",
  },
  [LocationId.screeningPlanSummary]: {
    id: "activityfeed.locations.screeningPlan.summary",
    defaultMessage: "Assessment Plan Summary",
    description: "Location of the activity.",
  },
  [LocationId.screeningPlanRatings]: {
    id: "activityfeed.locations.screeningPlan.ratings",
    defaultMessage: "Ratings Guide Builder",
    description: "Location of the activity.",
  },
});
export const hrPortalLocations = {
  [LocationId.summary]: jobReviewLocations[LocationId.jobGeneric],
  [LocationId.preview]: jobReviewLocations[LocationId.jobGeneric],
};

export const specificLocationOption = (locationId: string): MessageDescriptor =>
  getOrThrowError(
    {
      ...jobReviewLocations,
      ...applicantReviewLocations,
      ...hrPortalLocations,
      ...screeningPlanLocations,
    },
    locationId,
    "Invalid LocationId",
  );

export const ResponseScreeningBuckets = {
  [ResponseBuckets.Consideration]: defineMessages({
    title: {
      id: "responseScreening.buckets.consideration.title",
      defaultMessage: "Employees Under Consideration",
      description:
        "Label for the 'Under Consideration' response screening bucket.",
    },
    description: {
      id: "responseScreening.buckets.consideration.description",
      defaultMessage:
        "Employees in this category have volunteered to be placed in a team with a critical needs shortage. Employees in this category are: Pending initial application review ({iconReceived}), indicating that a submission has been received, but it has not yet been assessed by a member of the review team; Ready for reference checks and home-department approval ({iconReady}), indicating that the employee is heading to the Ready to Allocate category if references and approval are in order; and Further Assessment Required ({iconAssessment}), indicating that the review team is unsure of their qualifications for this role and is undertaking further assessment.",
      description:
        "Descriptive text for the 'Under Consideration' response screening bucket. Takes three icons (iconReceived, iconReady, and iconAssessment) as input.",
    },
  }),
  [ResponseBuckets.ReadyToAllocate]: defineMessages({
    title: {
      id: "responseScreening.buckets.readyToAllocate.title",
      defaultMessage: "Ready to Allocate",
      description:
        "Label for the 'Ready to Allocate' response screening bucket.",
    },
    description: {
      id: "responseScreening.buckets.readyToAllocate.description",
      defaultMessage:
        "Employees in this category have the necessary skills for this stream of work, have successfully completed reference checks and have been given preliminary authorization to participate by a member of their management team. They are currently working in their substantive position, awaiting a request from a department with a critical talent gap.",
      description:
        "Descriptive text for the 'Ready to Allocate' response screening bucket.",
    },
  }),
  [ResponseBuckets.Allocated]: defineMessages({
    title: {
      id: "responseScreening.buckets.allocated.title",
      defaultMessage: "Allocated",
      description: "Label for the 'Allocated' response screening bucket.",
    },
    description: {
      id: "responseScreening.buckets.allocated.description",
      defaultMessage:
        'Employees in this category have been allocated to a department. Their name has been removed from all other GC Reserve processes to which they have applied (and will appear in those processes under "Not Currently Available".) Following the completion of an allocation, employees may elect to be placed back in the Ready to Allocate category, should they be needed again.',
      description:
        "Descriptive text for the 'Allocated' response screening bucket.",
    },
  }),
  [ResponseBuckets.Unavailable]: defineMessages({
    title: {
      id: "responseScreening.buckets.unavailable.title",
      defaultMessage: "Currently Unavailable",
      description: "Label for the 'Unavailable' response screening bucket.",
    },
    description: {
      id: "responseScreening.buckets.unavailable.description",
      defaultMessage:
        "Employees in this stream have been allocated to a department in need or have temporarily removed their names from consideration for a specific period of time (e.g. illness, family care needs), and wish to be considered for allocation at a later date. Employees in this category have been qualified for this talent stream, and will be placed back into the Ready to Allocate when they become available again. (If an employee permanently withdraws their name, their submission will be removed from the GC Talent Reserve.)",
      description:
        "Descriptive text for the 'Currently Unavailable' response screening bucket.",
    },
  }),
  [ResponseBuckets.DoesNotQualify]: defineMessages({
    title: {
      id: "responseScreening.buckets.doesNotQualify.title",
      defaultMessage: "Does Not Qualify",
      description:
        "Label for the 'Does Not Qualify' response screening bucket.",
    },
    description: {
      id: "responseScreening.buckets.doesNotQualify.description",
      defaultMessage:
        "Employees in this category have volunteered their names, but a review of their application and/or reference checks has led the review team to conclude that the employee would not be an asset to a department needing to fill a critical talent gap in this field of work. This determination is, in no way, reflected in the employee's performance status with their home department, and does not affect their evaluation for other GC Reserve talent streams to which they may have applied.",
      description:
        "Descriptive text for the 'Does Not Qualify' response screening bucket.",
    },
  }),
};

export const ReviewStatusMessages = defineMessages({
  screened_out: {
    id: "reviewStatus.screenedOut",
    defaultMessage: "Screened Out",
    description: "Select option text for the 'Screened Out' review status.",
  },
  still_thinking: {
    id: "reviewStatus.stillThinking",
    defaultMessage: "Still Thinking",
    description: "Select option text for the 'Still Thinking' review status.",
  },
  still_in: {
    id: "reviewStatus.stillIn",
    defaultMessage: "Still In",
    description: "Select option text for the 'Still In' review status.",
  },
});

export const ReviewStatuses: {
  [key in ReviewStatusName]: { id: ReviewStatusId; name: MessageDescriptor };
} = {
  screened_out: {
    id: ReviewStatusId.ScreenedOut,
    name: ReviewStatusMessages.screened_out,
  },
  still_thinking: {
    id: ReviewStatusId.StillThinking,
    name: ReviewStatusMessages.still_thinking,
  },
  still_in: {
    id: ReviewStatusId.StillIn,
    name: ReviewStatusMessages.still_in,
  },
};

export const ResponseReviewStatusMessages = defineMessages({
  screened_out: {
    id: "responseReviewStatus.screenedOut",
    defaultMessage: "Does Not Qualify",
    description: "Select option text for the 'Does Not Qualify' review status.",
  },
  ready_for_reference: {
    id: "responseReviewStatus.readyForReference",
    defaultMessage: "Ready for Reference Check",
    description:
      "Select option text for the 'Ready for Reference Check' review status.",
  },
  ready_to_allocate: {
    id: "responseReviewStatus.readyToAllocate",
    defaultMessage: "Ready to Allocate",
    description:
      "Select option text for the 'Ready to Allocate' review status.",
  },
  assessment_required: {
    id: "responseReviewStatus.assessmentRequired",
    defaultMessage: "Further Assessment Required",
    description:
      "Select option text for the 'Further Assessment Required' review status.",
  },
  allocated: {
    id: "responseReviewStatus.allocated",
    defaultMessage: "Allocated",
    description: "Select option text for the 'Allocated' review status.",
  },
  not_available: {
    id: "responseReviewStatus.notAvailable",
    defaultMessage: "Not Available",
    description: "Select option text for the 'Not Available' review status.",
  },
});

export const ResponseReviewStatuses = {
  assessment_required: {
    id: 6,
    name: ResponseReviewStatusMessages.assessment_required,
  },
  ready_for_reference: {
    id: 4,
    name: ResponseReviewStatusMessages.ready_for_reference,
  },
  ready_to_allocate: {
    id: 5,
    name: ResponseReviewStatusMessages.ready_to_allocate,
  },
  allocated: {
    id: 7,
    name: ResponseReviewStatusMessages.allocated,
  },
  not_available: {
    id: 8,
    name: ResponseReviewStatusMessages.not_available,
  },
  screened_out: {
    id: 1,
    name: ResponseReviewStatusMessages.screened_out,
  },
};

const experienceHeadings = defineMessages({
  award: {
    id: "application.skills.awardHeading",
    defaultMessage: "{title} from {issuedBy}",
    description: "Accordion heading for experience on the Skills page.",
  },
  community: {
    id: "application.skills.communityHeading",
    defaultMessage: "{title} with {group}",
    description: "Accordion heading for experience on the Skills page.",
  },
  education: {
    id: "application.skills.educationHeading",
    defaultMessage: "{areaOfStudy} at {institution}",
    description: "Accordion heading for experience on the Skills page.",
  },
  personal: {
    id: "application.skills.personalHeading",
    defaultMessage: "{title}",
    description: "Accordion heading for experience on the Skills page.",
  },
  work: {
    id: "application.skills.workHeading",
    defaultMessage: "{title} at {organization}",
    description: "Accordion heading for experience on the Skills page.",
  },
  unknown: {
    id: "application.skills.unknownHeading",
    defaultMessage: "Error: Unknown experience type.",
    description:
      "Accordion heading error when an unknown experience type is used.",
  },
});

/**
 * Returns a formatted localized heading for the accordion on
 * the Skill UI page of the Job Application. Makes use of experienceHeadings
 * messages defined above.
 *
 * @param experience Given Experience of multiple types defined by the user to apply to a certain Criteria.
 * @param intl react-intl object used in formatting messages.
 *
 * @returns Formatted localized string.
 */
export const getExperienceHeading = (
  experience: Experience,
  intl: IntlShape,
): string => {
  let heading: string;

  switch (experience.type) {
    case "experience_award":
      heading = intl.formatMessage(experienceHeadings.award, {
        title: experience.title,
        issuedBy: experience.issued_by,
      });
      break;
    case "experience_community":
      heading = intl.formatMessage(experienceHeadings.community, {
        title: experience.title,
        group: experience.group,
      });
      break;
    case "experience_education":
      heading = intl.formatMessage(experienceHeadings.education, {
        areaOfStudy: experience.area_of_study,
        institution: experience.institution,
      });
      break;
    case "experience_personal":
      heading = intl.formatMessage(experienceHeadings.personal, {
        title: experience.title,
      });
      break;
    case "experience_work":
      heading = intl.formatMessage(experienceHeadings.work, {
        title: experience.title,
        organization: experience.organization,
      });
      break;
    default:
      heading = intl.formatMessage(experienceHeadings.unknown);
  }

  return heading;
};

/**
 * Returns a formatted localized subheading for the accordion on
 * the Skill UI page of the Job Application. Makes use of date formatting
 * to provide a range.
 *
 * @param experience Given Experience of multiple types defined by the user to apply to a certain Criteria.
 * @param intl react-intl object used in formatting messages.
 *
 * @returns Formatted localized string.
 */
export const getExperienceSubheading = (
  experience: Experience,
  intl: IntlShape,
): string => {
  let subHeading: string;
  let startDate: string;
  let endDate: string;

  switch (experience.type) {
    case "experience_award":
      subHeading = intl.formatDate(experience.awarded_date, {
        month: "short",
        year: "numeric",
      });
      break;
    case "experience_community":
    case "experience_education":
    case "experience_personal":
    case "experience_work":
      startDate = intl.formatDate(experience.start_date, {
        month: "short",
        year: "numeric",
      });

      if (experience.end_date !== null && !experience.is_active) {
        endDate = intl.formatDate(experience.end_date, {
          month: "short",
          year: "numeric",
        });
      } else {
        endDate = intl.formatMessage({
          id: "application.skills.currentSubheading",
          defaultMessage: "Current",
          description:
            "Text for the end date of a current experience on the Skills page.",
        });
      }

      subHeading = `${startDate} - ${endDate}`;
      break;
    default:
      subHeading = intl.formatMessage(experienceHeadings.unknown);
  }

  return subHeading;
};

const experienceJustificationLabels = defineMessages({
  award: {
    id: "application.skills.awardJustificationLabel",
    defaultMessage: "How I used {skillName} to achieve {title}",
    description: "Accordion heading for experience on the Skills page.",
  },
  community: {
    id: "application.skills.communityJustificationLabel",
    defaultMessage: "How I used {skillName} with {group}",
    description: "Accordion heading for experience on the Skills page.",
  },
  education: {
    id: "application.skills.educationJustificationLabel",
    defaultMessage: "How I used {skillName} at {institution}",
    description: "Accordion heading for experience on the Skills page.",
  },
  personal: {
    id: "application.skills.personalJustificationLabel",
    defaultMessage: "How I used {skillName} for {title}",
    description: "Accordion heading for experience on the Skills page.",
  },
  work: {
    id: "application.skills.workJustificationLabel",
    defaultMessage: "How I used {skillName} at {organization}",
    description: "Accordion heading for experience on the Skills page.",
  },
  unknown: {
    id: "application.skills.unknownJustificationLabel",
    defaultMessage: "Error: Unknown experience type.",
    description:
      "Accordion heading error when an unknown experience type is used.",
  },
});

/**
 * Returns a formatted localized input label for the text area
 * inside the experience accordion on the Skill UI page of the
 * Job Application. Makes use of experienceJustificationLabels
 * messages defined above.
 *
 * @param experience Given Experience of multiple types defined by the user to apply to a certain Criteria.
 * @param intl react-intl object used in formatting messages.
 *
 * @returns Formatted localized string.
 */
export const getExperienceJustificationLabel = (
  experience: Experience,
  intl: IntlShape,
  skillName: string,
): string => {
  let label: string;

  switch (experience.type) {
    case "experience_award":
      label = intl.formatMessage(experienceJustificationLabels.award, {
        skillName,
        title: experience.title,
      });
      break;
    case "experience_community":
      label = intl.formatMessage(experienceJustificationLabels.community, {
        skillName,
        group: experience.group,
      });
      break;
    case "experience_education":
      label = intl.formatMessage(experienceJustificationLabels.education, {
        skillName,
        institution: experience.institution,
      });
      break;
    case "experience_personal":
      label = intl.formatMessage(experienceJustificationLabels.personal, {
        skillName,
        title: experience.title,
      });
      break;
    case "experience_work":
      label = intl.formatMessage(experienceJustificationLabels.work, {
        skillName,
        organization: experience.organization,
      });
      break;
    default:
      label = intl.formatMessage(experienceHeadings.unknown);
  }

  return label;
};

export const gcEmployeeStatuses = defineMessages({
  [GCEmployeeStatus.current]: {
    id: "application.basicInfo.gcEmployeeStatus.current",
    defaultMessage:
      "Yes - I am currently an employee of the Government of Canada.",
    description: "Select option text for the 'Yes' GC employee status.",
  },
  [GCEmployeeStatus.no]: {
    id: "application.basicInfo.gcEmployeeStatus.no",
    defaultMessage:
      "No - I am not, and have never been, an employee of the Government of Canada.",
    description: "Select option text for the 'No' GC employee status.",
  },
  [GCEmployeeStatus.past]: {
    id: "application.basicInfo.gcEmployeeStatus.past",
    defaultMessage:
      "I was previously, but am no longer, an employee of the Government of Canada.",
    description: "Select option text for the 'Previous' GC employee status.",
  },
});

export const gcEmployeeStatus = (
  gcEmployeeStatusId: number,
): MessageDescriptor =>
  getOrThrowError(
    gcEmployeeStatuses,
    gcEmployeeStatusId,
    "invalid GC employee Status",
  );

import { defineMessages, MessageDescriptor } from "react-intl";
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
  DepartmentId,
  FrequencyId,
  OvertimeRequirementId,
  TravelRequirementId,
} from "./lookupConstants";
import { getOrThrowError } from "../helpers/queries";

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
  narrativeAssessment: {
    id: "assessmentType.narrativeAssessment",
    defaultMessage: "Narrative Review",
    description: "Title of an assessment type.",
  },
  applicationScreeningQuestion: {
    id: "assessmentType.applicationScreeningQuestion",
    defaultMessage: "Application Screening Question",
    description: "Title of an assessment type.",
  },
  groupTest: {
    id: "assessmentType.groupTest",
    defaultMessage: "Group Test",
    description: "Title of an assessment type.",
  },
  informalPhoneConversation: {
    id: "assessmentType.informalPhoneConversation",
    defaultMessage: "Informal Phone Conversation",
    description: "Title of an assessment type.",
  },
  interview: {
    id: "assessmentType.interview",
    defaultMessage: "Interview",
    description: "Title of an assessment type.",
  },
  onlineExam: {
    id: "assessmentType.onlineExam",
    defaultMessage: "Online Exam",
    description: "Title of an assessment type.",
  },
  onSiteExam: {
    id: "assessmentType.onSiteExam",
    defaultMessage: "On-Site Exam",
    description: "Title of an assessment type.",
  },
  takeHomeExam: {
    id: "assessmentType.takeHomeExam",
    defaultMessage: "Take Home Exam",
    description: "Title of an assessment type.",
  },
  portfolioReview: {
    id: "assessmentType.portfolioReview",
    defaultMessage: "Portfolio Review",
    description: "Title of an assessment type.",
  },
  referenceCheck: {
    id: "assessmentType.referenceCheck",
    defaultMessage: "Reference Check",
    description: "Title of an assessment type.",
  },
  seriousGames: {
    id: "assessmentType.seriousGames",
    defaultMessage: "Serious Games",
    description: "Title of an assessment type.",
  },
});

export const assetSkillName = (): MessageDescriptor => skillLevelNames.asset;
export const assetSkillDescription = (): MessageDescriptor =>
  skillLevelDescriptions.asset;

export const assessmentType = (assessmentTypeId: number): MessageDescriptor => {
  if (!AssessmentTypeIdValues.includes(assessmentTypeId)) {
    throw new Error("invalid AssessmentTypeValue");
  }
  return {
    [AssessmentTypeId.ApplicationScreeningQuestion]:
      assessmentTypes.applicationScreeningQuestion,
    [AssessmentTypeId.GroupTest]: assessmentTypes.groupTest,
    [AssessmentTypeId.InformalPhoneConversation]:
      assessmentTypes.informalPhoneConversation,
    [AssessmentTypeId.Interview]: assessmentTypes.interview,
    [AssessmentTypeId.NarrativeAssessment]: assessmentTypes.narrativeAssessment,
    [AssessmentTypeId.OnSiteExam]: assessmentTypes.onSiteExam,
    [AssessmentTypeId.OnlineExam]: assessmentTypes.onlineExam,
    [AssessmentTypeId.PortfolioReview]: assessmentTypes.portfolioReview,
    [AssessmentTypeId.ReferenceCheck]: assessmentTypes.referenceCheck,
    [AssessmentTypeId.SeriousGames]: assessmentTypes.seriousGames,
    [AssessmentTypeId.TakeHomeExam]: assessmentTypes.takeHomeExam,
  }[assessmentTypeId.toString()];
};

const criteriaTypes = defineMessages({
  asset: {
    id: "criteriaType.asset",
    defaultMessage: "Asset",
    description: "Title of an asset criteria type.",
  },
  essential: {
    id: "criteriaType.essential",
    defaultMessage: "Essential",
    description: "Title of an esential criteria type.",
  },
});

export const criteriaType = (criteriaTypeId: number): MessageDescriptor => {
  if (!CriteriaTypeIdValues.includes(criteriaTypeId)) {
    throw new Error("invalid CriteriaTypeValue");
  }
  return {
    [CriteriaTypeId.Asset]: criteriaTypes.asset,
    [CriteriaTypeId.Essential]: criteriaTypes.essential,
  }[criteriaTypeId.toString()];
};

const assessmentTypeDescriptions = defineMessages({
  narrativeAssessment: {
    id: "assessmentType.narrativeAssessment.description",
    defaultMessage:
      "This is a description requested during the application process, in which applicants to self-identify and describe their experience and level of expertise with a skill.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  applicationScreeningQuestion: {
    id: "assessmentType.applicationScreeningQuestion.description",
    defaultMessage:
      "These questions appear in the application form, and are submitted through Talent Cloud, they allow a first glance at the applicant’s understanding, process, knowledge, or cultural fit for the position.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  groupTest: {
    id: "assessmentType.groupTest.description",
    defaultMessage:
      "Applicants perform this test in real-time in conjunction with other applicants, team members, or facilitators, to determine their skill prowess, team communication, and performance in a collaborative environment.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  informalPhoneConversation: {
    id: "assessmentType.informalPhoneConversation.description",
    defaultMessage:
      "A loose structure chat between a member of the hiring board and an applicant, aimed at discovering the applicant’s knowledge, aptitudes, or personality traits, conversations may vary between applicants.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  interview: {
    id: "assessmentType.interview.description",
    defaultMessage:
      "A formal question-and-answer examination performed in real-time between the hiring-board and an applicant. Questions are aimed at assessing skill expertise, level, and approach. Each question is crafted beforehand and follows the same structure between all interviewed applicants.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  onlineExam: {
    id: "assessmentType.onlineExam.description",
    defaultMessage:
      "Prepared examination that does not require supervision, and can be performed from any location through internet access, with a defined time-frame for completion.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  onSiteExam: {
    id: "assessmentType.onSiteExam.description",
    defaultMessage:
      "Prepared examination that requires the applicant to perform a test at a specific location under supervision, aimed at assessing skill expertise and technique.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  takeHomeExam: {
    id: "assessmentType.takeHomeExam.description",
    defaultMessage:
      "Applicants receive a physical package containing the assessment tools, they complete the assessment at their own leisure and at their preferred location without supervision, and must return the materials before a specific deadline.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  portfolioReview: {
    id: "assessmentType.portfolioReview.description",
    defaultMessage:
      "During the application process, applicants provide access to samples of their work to exhibit their skill level, and back-up their skill claims. ",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  referenceCheck: {
    id: "assessmentType.referenceCheck.description",
    defaultMessage:
      "During the application process, applicants provide contact information to an acquaintance who can validate and confirm their skill expertise, knowledge or aptitude.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  seriousGames: {
    id: "assessmentType.seriousGames.description",
    defaultMessage:
      "Test involving the use of games to explore a candidate’s communication skills, resilience, emotional intelligence, among many other soft skills.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
});

export const assessmentTypeDescription = (
  assessmentTypeId: number,
): MessageDescriptor => {
  if (!AssessmentTypeIdValues.includes(assessmentTypeId)) {
    throw new Error("invalid AssessmentTypeValue");
  }
  return {
    [AssessmentTypeId.ApplicationScreeningQuestion]:
      assessmentTypeDescriptions.applicationScreeningQuestion,
    [AssessmentTypeId.GroupTest]: assessmentTypeDescriptions.groupTest,
    [AssessmentTypeId.InformalPhoneConversation]:
      assessmentTypeDescriptions.informalPhoneConversation,
    [AssessmentTypeId.Interview]: assessmentTypeDescriptions.interview,
    [AssessmentTypeId.NarrativeAssessment]:
      assessmentTypeDescriptions.narrativeAssessment,
    [AssessmentTypeId.OnSiteExam]: assessmentTypeDescriptions.onSiteExam,
    [AssessmentTypeId.OnlineExam]: assessmentTypeDescriptions.onlineExam,
    [AssessmentTypeId.PortfolioReview]:
      assessmentTypeDescriptions.portfolioReview,
    [AssessmentTypeId.ReferenceCheck]:
      assessmentTypeDescriptions.referenceCheck,
    [AssessmentTypeId.SeriousGames]: assessmentTypeDescriptions.seriousGames,
    [AssessmentTypeId.TakeHomeExam]: assessmentTypeDescriptions.takeHomeExam,
  }[assessmentTypeId];
};

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
      "Standard evalutation statement which replaces 'expected answer' for all skills under the Narrative Review assessment type.",
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

const provinceAbreviations = defineMessages({
  [ProvinceId.AB]: {
    id: "province.ab.abreviation",
    defaultMessage: "Alb.",
  },
  [ProvinceId.BC]: {
    id: "province.bc.abreviation",
    defaultMessage: "B.C.",
  },
  [ProvinceId.MB]: {
    id: "province.mb.abreviation",
    defaultMessage: "Man.",
  },
  [ProvinceId.NL]: {
    id: "province.nl.abreviation",
    defaultMessage: "N.L.",
  },
  [ProvinceId.NB]: {
    id: "province.nb.abreviation",
    defaultMessage: "N.B.",
  },
  [ProvinceId.NS]: {
    id: "province.ns.abreviation",
    defaultMessage: "N.S.",
  },
  [ProvinceId.NU]: {
    id: "province.nu.abreviation",
    defaultMessage: "Nvt.",
  },
  [ProvinceId.NT]: {
    id: "province.nt.abreviation",
    defaultMessage: "N.W.T.",
  },
  [ProvinceId.ON]: {
    id: "province.on.abreviation",
    defaultMessage: "Ont.",
  },
  [ProvinceId.PE]: {
    id: "province.pe.abreviation",
    defaultMessage: "P.E.I.",
  },
  [ProvinceId.QC]: {
    id: "province.qc.abreviation",
    defaultMessage: "Que.",
  },
  [ProvinceId.SK]: {
    id: "province.sk.abreviation",
    defaultMessage: "Sask.",
  },
  [ProvinceId.YT]: {
    id: "province.yk.abreviation",
    defaultMessage: "Y.T.",
  },
});

export const provinceAbreviation = (provinceId: number): MessageDescriptor =>
  getOrThrowError(provinceAbreviations, provinceId, "invalid ProvinceId");

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

const departments = defineMessages({
  [DepartmentId.treasuryBoard]: {
    id: "department.treasuryBoard",
    defaultMessage: "Treasury Board of Canada Secretariat",
  },
  [DepartmentId.naturalResources]: {
    id: "department.naturalResources",
    defaultMessage: "Natural Resources Canada",
  },
  [DepartmentId.transport]: {
    id: "department.transport",
    defaultMessage: "Transport Canada",
  },
  [DepartmentId.environmentAndClimateChange]: {
    id: "department.environmentAndClimateChange",
    defaultMessage: "Environment and Climate Change Canada",
  },
  [DepartmentId.employmentAndSocialDevelopment]: {
    id: "department.employmentAndSocialDevelopment",
    defaultMessage: "Employment and Social Development Canada",
  },
  [DepartmentId.globalAffairs]: {
    id: "department.globalAffairs",
    defaultMessage: "Global Affairs Canada",
  },
  [DepartmentId.borderServices]: {
    id: "department.borderServices",
    defaultMessage: "Canada Border Services Agency",
  },
  [DepartmentId.fisheriesAndOceans]: {
    id: "department.fisheriesAndOceans",
    defaultMessage: "Fisheries and Oceans Canada",
  },
  [DepartmentId.innovationScience]: {
    id: "department.innovationScience",
    defaultMessage: "Innovation, Science and Economic Development Canada",
  },
  [DepartmentId.publicServiceAndProcurement]: {
    id: "department.publicServiceAndProcurement",
    defaultMessage: "Public Services and Procurement Canada",
  },
  [DepartmentId.nationalDefence]: {
    id: "department.nationalDefence",
    defaultMessage: "Deparmtnet of National Defence",
  },
});

export const departmentName = (departmentId: number): MessageDescriptor =>
  getOrThrowError(departments, departmentId, "invalid DepartmentId");

export const narrativeReviewStandardQuestion = (): MessageDescriptor =>
  standardAssessmentText.narrativeReviewQuestion;

export const narrativeReviewStandardAnswer = (): MessageDescriptor =>
  standardAssessmentText.narrativeReviewAnswer;

const frequencyMessages = defineMessages({
  [FrequencyId.always]: {
    id: "jobBuilder.details.frequencyAlwaysLabel",
    defaultMessage: "Almost Always",
    description: "The form label displayed on 'always' frequency options.",
  },
  [FrequencyId.often]: {
    id: "jobBuilder.details.frequencyFrequentlyLabel",
    defaultMessage: "Frequently",
    description: "The form label displayed on 'frequently' frequency options.",
  },
  [FrequencyId.sometimes]: {
    id: "jobBuilder.details.frequencySometimesLabel",
    defaultMessage: "Sometimes",
    description: "The form label displayed on 'sometimes' frequency options.",
  },
  [FrequencyId.rarely]: {
    id: "jobBuilder.details.frequencyOccasionallyLabel",
    defaultMessage: "Occasionally",
    description:
      "The form label displayed on 'occasionally' frequency options.",
  },
  [FrequencyId.never]: {
    id: "jobBuilder.details.frequencyNeverLabel",
    defaultMessage: "Almost Never",
    description: "The form label displayed on 'never' frequency options.",
  },
});

export const frequencyName = (frequencyId: number): MessageDescriptor =>
  getOrThrowError(frequencyMessages, frequencyId, "invalid FrequencyId");

const overtimeRequirmentDescriptions = defineMessages({
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
    overtimeRequirmentDescriptions,
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

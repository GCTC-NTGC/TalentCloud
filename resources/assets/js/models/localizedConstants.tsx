import { defineMessages, FormattedMessage } from "react-intl";
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
} from "./lookupConstants";
import { hasKey } from "../helpers/queries";

interface SkillLevel {
  hardBasic: FormattedMessage.MessageDescriptor;
  hardIntermediate: FormattedMessage.MessageDescriptor;
  hardAdvanced: FormattedMessage.MessageDescriptor;
  hardExpert: FormattedMessage.MessageDescriptor;
  softBasic: FormattedMessage.MessageDescriptor;
  softIntermediate: FormattedMessage.MessageDescriptor;
  softAdvanced: FormattedMessage.MessageDescriptor;
  softExpert: FormattedMessage.MessageDescriptor;
}

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
      "You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision.The approach to the tasks, and how they are delivered, is determined by the supervisor.You contribute input and advice.You are able to advance the task, even in the face of small to moderate hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision. This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers.",
    description: "Description of intermediate skill level.",
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact with supervision.You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor’s consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels. This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers.",
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
});

const skillLevelL10n = (
  skillLevelId: number,
  skillTypeId: number,
  l10nObj: SkillLevel,
): FormattedMessage.MessageDescriptor => {
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
): FormattedMessage.MessageDescriptor =>
  skillLevelL10n(skillLevelId, skillTypeId, skillLevelDescriptions);

export const skillLevelName = (
  skillLevelId: number,
  skillTypeId: number,
): FormattedMessage.MessageDescriptor =>
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

export const assessmentType = (
  assessmentTypeId: number,
): FormattedMessage.MessageDescriptor => {
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

export const criteriaType = (
  criteriaTypeId: number,
): FormattedMessage.MessageDescriptor => {
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
      "A formal question-and-answer examination performed in real-time between the hiring-board and an applicant, questions are aimed at assessing skill expertise, level, and approach. Each question is crafted beforehand and follows the same structure between all interviewed applicants.",
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
): FormattedMessage.MessageDescriptor => {
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
    id: "province.on",
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
  }
});

export const provinceName = (provinceId: number): FormattedMessage.MessageDescriptor => {
  if (!hasKey(provinceNames, provinceId)) {
    throw new Error("invalid ProvinceId");
  }
  return provinceNames[provinceId];
}

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
    id: "province.on.abreviation",
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

export const provinceAbreviation = (
  provinceId: number,
): FormattedMessage.MessageDescriptor => {
  if (!hasKey(provinceAbreviations, provinceId)) {
    throw new Error("invalid ProvinceId");
  }
  return provinceAbreviations[provinceId];
};
export const narrativeReviewStandardQuestion = (): FormattedMessage.MessageDescriptor =>
  standardAssessmentText.narrativeReviewQuestion;

export const narrativeReviewStandardAnswer = (): FormattedMessage.MessageDescriptor =>
  standardAssessmentText.narrativeReviewAnswer;

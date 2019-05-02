import { defineMessages, FormattedMessage } from "react-intl";
import {
  SkillLevelId,
  SkillTypeId,
  AssessmentTypeId,
  SkillLevelIdValues,
  SkillTypeIdValues,
  AssessmentTypeIdValues,
} from "./lookupConstants";

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
    defaultMessage: "Intervew",
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

// TODO: add english text
const assessmentTypeDescriptions = defineMessages({
  narrativeAssessment: {
    id: "assessmentType.narrativeAssessment.description",
    defaultMessage:
      "The goal of a narrative review is to read the content the applicant has provided for each skill to get a better understanding of their level and competence.",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  applicationScreeningQuestion: {
    id: "assessmentType.applicationScreeningQuestion.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  groupTest: {
    id: "assessmentType.groupTest.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  informalPhoneConversation: {
    id: "assessmentType.informalPhoneConversation.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  interview: {
    id: "assessmentType.interview.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  onlineExam: {
    id: "assessmentType.onlineExam.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  onSiteExam: {
    id: "assessmentType.onSiteExam.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  takeHomeExam: {
    id: "assessmentType.takeHomeExam.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  portfolioReview: {
    id: "assessmentType.portfolioReview.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  referenceCheck: {
    id: "assessmentType.referenceCheck.description",
    defaultMessage: "",
    description:
      "Description of an assessment type, to help a manager understand when to use it.",
  },
  seriousGames: {
    id: "assessmentType.seriousGames.description",
    defaultMessage: "",
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

import { defineMessages, FormattedMessage } from "react-intl";
import { SkillLevelId, SkillTypeId, AssessmentTypeId } from "./lookupConstants";

const skillLevelDescriptions = defineMessages({
  hardBasic: {
    id: "skillLevel.hard.basic.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish basic tasks with steady supervision and clear direction. The tasks you’re assigned are clear and don’t involve significant complexity. Their impact is usually locally felt. As you advance in this category, you should be developing the ability to accomplish tasks of moderate complexity with steady supervision. You will also need to be able to accomplish basic tasks with little or no supervision. This level is usually associated with tasks that form the bulk of the work for lower level positions, such as junior analysts or entry level developers.",
    description: "Description of basic hard skill level."
  },
  hardIntermediate: {
    id: "skillLevel.hard.intermediate.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision.The approach to the tasks, and how they are delivered, is determined by the supervisor.You contribute input and advice.You are able to advance the task, even in the face of small to moderate hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision. This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers.",
    description: "Description of intermediate skill level."
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish tasks of significant complexity or impact with supervision.You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor’s consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels. This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers.",
    description: "Description of advanced hard skill level."
  },
  hardExpert: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level."
  },
  softBasic: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level."
  },
  softIntermediate: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level."
  },
  softAdvanced: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level."
  },
  softExpert: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level."
  }
});

export const skillLevelDescription = (
  skillLevelId: number,
  skillTypeId: number
): FormattedMessage.MessageDescriptor => {
  if (skillTypeId == SkillTypeId.Hard) {
    switch (skillLevelId) {
      case SkillLevelId.Basic:
        return skillLevelDescriptions.hardBasic;
      case SkillLevelId.Intermediate:
        return skillLevelDescriptions.hardIntermediate;
      case SkillLevelId.Advanced:
        return skillLevelDescriptions.hardAdvanced;
      default:
        return skillLevelDescriptions.hardExpert;
    }
  } else {
    switch (skillLevelId) {
      case SkillLevelId.Basic:
        return skillLevelDescriptions.softBasic;
      case SkillLevelId.Intermediate:
        return skillLevelDescriptions.softIntermediate;
      case SkillLevelId.Advanced:
        return skillLevelDescriptions.softAdvanced;
      default:
        return skillLevelDescriptions.softExpert;
    }
  }
};

const skillLevelNames = defineMessages({
  hardBasic: {
    id: "skillLevel.hard.basic",
    defaultMessage: "Beginner",
    description: "Single-word description of basic hard skill level."
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced",
    defaultMessage: "Advanced",
    description: "Single-word description of advanced hard skill level."
  },
  softAdvanced: {
    id: "skillLevel.soft.advanced",
    defaultMessage: "Strongly in evidence",
    description: "Single-word description of advanced soft skill level."
  }
});

export const skillLevelName = (
  skillLevelId: number,
  skillTypeId: number
): FormattedMessage.MessageDescriptor => {
  if (skillTypeId == SkillTypeId.Hard) {
    switch (skillLevelId) {
      case SkillLevelId.Advanced:
        return skillLevelNames.hardAdvanced;
      case SkillLevelId.Basic:
      default:
        return skillLevelNames.hardBasic;
    }
  } else {
    switch (skillLevelId) {
      case SkillLevelId.Advanced:
      default:
        return skillLevelNames.softAdvanced;
    }
  }
};

const assessmentTypes = defineMessages({
  narrativeAssessment: {
    id: "assessmentType.narrativeAssessment",
    defaultMessage: "Narrative Assessment",
    description: "Title of an assessment type."
  },
  applicationScreeningQuestion: {
    id: "assessmentType.applicationScreeningQuestion",
    defaultMessage: "Application Screening Question",
    description: "Title of an assessment type."
  }
});

export const assessmentType = (
  assessmentTypeId: number
): FormattedMessage.MessageDescriptor => {
  switch (assessmentTypeId) {
    case AssessmentTypeId.ApplicationScreeningQuestion:
      return assessmentTypes.applicationScreeningQuestion;
    case AssessmentTypeId.NarrativeAssessment:
    default:
      return assessmentTypes.narrativeAssessment;
  }
};

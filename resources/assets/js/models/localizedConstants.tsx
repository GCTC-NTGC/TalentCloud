import { defineMessages, FormattedMessage } from "react-intl";
import { SkillLevelId, SkillTypeId, AssessmentTypeId } from "./lookupConstants";

const skillLevelDescriptions = defineMessages({
  hardBasic: {
    id: "skillLevel.hard.basic.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish basic tasks with steady supervision and clear direction. The tasks you’re assigned are clear and don’t involve significant complexity. Their impact is usually locally felt. As you advance in this category, you should be developing the ability to accomplish tasks of moderate complexity with steady supervision. You will also need to be able to accomplish basic tasks with little or no supervision. This level is usually associated with tasks that form the bulk of the work for lower level positions, such as junior analysts or entry level developers.",
    description: "Description of basic hard skill level.",
  },
  hardIntermediate: {
    id: "skillLevel.hard.intermediate.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish tasks of moderate complexity or moderate impact with supervision.The approach to the tasks, and how they are delivered, is determined by the supervisor.You contribute input and advice.You are able to advance the task, even in the face of small to moderate hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with steady supervision. You will also need to be able to accomplish tasks of moderate complexity or impact with little or no supervision. This level is usually associated with tasks that form the bulk of the work for mid-level positions, such as analysts or developers.",
    description: "Description of intermediate skill level.",
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish tasks of significant complexity or impact with supervision.You provide advice and input on the approach to the tasks, and how they are delivered, for the supervisor’s consideration. You are able to advance the task, even in the face of moderate to large hurdles and complications. As you advance in this category, you should be developing the ability to accomplish tasks of significant complexity or larger impact with only light levels of supervision, where you are effectively the lead on the initiative. You may also take on a role of training others in this skills set or take on a light supervisory role for those at lower levels. This level is usually associated with tasks that form the bulk of the work for higher level positions, such as senior analysts or senior developers.",
    description: "Description of advanced hard skill level.",
  },
  hardExpert: {
    id: "skillLevel.hard.expert.description",
    defaultMessage:
      "l10n.missing You have the ability to accomplish tasks of significant complexity or impact, where you call the shots and answer to the organization’s senior management for your decisions. You bring forward the tasks, the approach and the delivery plan for senior management consideration. You often supervise others (individuals or teams) in delivering tasks of high complexity or system wide impact. You are able to advance these tasks, even in the face of significant unforeseen hurdles and complications. As you advance in this category, you should be developing the ability to assess others at more junior levels, becoming able to clearly identify the difference between beginner, intermediate and advanced tasks. You should be able to build teams, set direction and provide supervision. This level is usually associated with tasks that form the bulk of the work for management and executive level positions.",
    description: "Description of expert hard skill level.",
  },
  softBasic: {
    id: "skillLevel.soft.basic.description",
    defaultMessage:
      "l10n.missing You’re working on acquiring this skill or attribute. You are able to demonstrate it under favourable conditions (low stress, minimal difficulty) and can apply it in a work context intermittently.",
    description: "Description of soft basic skill level.",
  },
  softIntermediate: {
    id: "skillLevel.soft.intermediate.description",
    defaultMessage:
      "l10n.missing You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of low-to-moderate stress or difficulty. Your peers and supervisors are able to attest to the fact that you have been able to demonstrate this skill or attribute on a regular basis.",
    description: "Description of soft intermediate skill level.",
  },
  softAdvanced: {
    id: "skillLevel.soft.advanced.description",
    defaultMessage:
      "l10n.missing You’re able to consistently demonstrate this skill or attribute in the workplace, including under conditions of high stress or difficulty. Your peers and supervisors recognize this as a strength you demonstrate in the workplace.",
    description: "Description of soft advanced skill level.",
  },
  softExpert: {
    id: "skillLevel.soft.expert.description",
    defaultMessage:
      "l10n.missing This is a foundational part of who you are. You consistently demonstrate this skill or attribute, even under conditions of extreme stress or difficulty. Your peers and supervisors recognize this as a significant strength you demonstrate in the workplace, providing an example to others.",
    description: "Description of expert soft skill level.",
  },
});

export const skillLevelDescription = (
  skillLevelId: number,
  skillTypeId: number,
): FormattedMessage.MessageDescriptor => {
  if (skillTypeId === SkillTypeId.Hard) {
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
    id: "skillLevel.hard.basic.name",
    defaultMessage: "l10n.missing Beginner",
    description: "Single-word descriptor of basic hard skill level.",
  },
  hardIntermediate: {
    id: "skillLevel.hard.intermediate.name",
    defaultMessage: "l10n.missing Intermediate",
    description: "Single-word descriptor of intermediate hard skill level.",
  },
  hardAdvanced: {
    id: "skillLevel.hard.advanced.name",
    defaultMessage: "l10n.missing Advanced",
    description: "Single-word descriptor of advanced hard skill level.",
  },
  hardExpert: {
    id: "skillLevel.hard.expert.name",
    defaultMessage: "l10n.missing Expert",
    description: "Single-word descriptor of expert hard skill level.",
  },
  softBasic: {
    id: "skillLevel.soft.basic.name",
    defaultMessage: "l10n.missing In Early Development",
    description: "Single-word descriptor of soft basic skill level.",
  },
  softIntermediate: {
    id: "skillLevel.soft.intermediate.name",
    defaultMessage: "l10n.missing Moderately in Evidence",
    description: "Single-word descriptor of soft intermediate skill level.",
  },
  softAdvanced: {
    id: "skillLevel.soft.advanced.name",
    defaultMessage: "l10n.missing Strongly in Evidence",
    description: "Single-word descriptor of soft advanced skill level.",
  },
  softExpert: {
    id: "skillLevel.soft.expert.name",
    defaultMessage: "l10n.missing Deep Level Demonstration",
    description: "Single-word descriptor of soft expert skill level.",
  },
});

export const skillLevelName = (
  skillLevelId: number,
  skillTypeId: number,
): FormattedMessage.MessageDescriptor => {
  if (skillTypeId === SkillTypeId.Hard) {
    switch (skillLevelId) {
      case SkillLevelId.Basic:
        return skillLevelNames.hardBasic;
      case SkillLevelId.Intermediate:
        return skillLevelNames.hardIntermediate;
      case SkillLevelId.Advanced:
        return skillLevelNames.hardAdvanced;
      default:
        return skillLevelNames.hardExpert;
    }
  } else {
    switch (skillLevelId) {
      case SkillLevelId.Basic:
        return skillLevelNames.softBasic;
      case SkillLevelId.Intermediate:
        return skillLevelNames.softIntermediate;
      case SkillLevelId.Advanced:
        return skillLevelNames.softAdvanced;
      default:
        return skillLevelNames.softExpert;
    }
  }
};

const assessmentTypes = defineMessages({
  narrativeAssessment: {
    id: "assessmentType.narrativeAssessment",
    defaultMessage: "Narrative Assessment",
    description: "Title of an assessment type.",
  },
  applicationScreeningQuestion: {
    id: "assessmentType.applicationScreeningQuestion",
    defaultMessage: "Application Screening Question",
    description: "Title of an assessment type.",
  },
});

export const assessmentType = (
  assessmentTypeId: number,
): FormattedMessage.MessageDescriptor => {
  switch (assessmentTypeId) {
    case AssessmentTypeId.ApplicationScreeningQuestion:
      return assessmentTypes.applicationScreeningQuestion;
    case AssessmentTypeId.NarrativeAssessment:
    default:
      return assessmentTypes.narrativeAssessment;
  }
};

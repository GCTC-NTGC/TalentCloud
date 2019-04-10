import { defineMessages, FormattedMessage } from "react-intl";
import { SkillLevelId, SkillTypeId, AssessmentTypeId } from "./lookupConstants";

const skillLevelDescriptions = defineMessages({
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

export const skillLevelDescription = (
  skillLevelId: number,
  skillTypeId: number
): FormattedMessage.MessageDescriptor => {
  if (skillTypeId == SkillTypeId.Hard) {
    switch (skillLevelId) {
      case SkillLevelId.Advanced:
        return skillLevelDescriptions.hardAdvanced;
      case SkillLevelId.Basic:
      default:
        return skillLevelDescriptions.hardBasic;
    }
  } else {
    switch (skillLevelId) {
      case SkillLevelId.Advanced:
      default:
        return skillLevelDescriptions.softAdvanced;
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

import {
    Criteria,
    Assessment,
    RatingGuideQuestion,
    RatingGuideAnswer,
    ClipboardTableRowProps,
  } from "../../models/types";

export const ClipboardData = (criteria:Criteria[], ratingGuideQuestions:RatingGuideQuestion[], ratingGuideAnswers:RatingGuideAnswer[]) : ClipboardTableRowProps[] => {
    const data = criteria.map((criterion): ClipboardTableRowProps => ({
        title: "from Assessment",
        question: "from ratingGuideQuestion",
        skillLevel: criterion.skill_level_id.toString(),
        skillType: criterion.criteria_type_id.toString(),
        skillName: "from Skill",
        modelAnswer: "from Answer",
        id: "to be decided",
      }) );
    return data;
};

// assessments: data.assessments.map(
//     (assessmentData): Assessment => parseAssessment(assessmentData),
//   )

// {
//     id: 1,
//     criteria_type_id: CriteriaTypeId.Essential,
//     job_poster_id: 1,
//     skill_id: 1,
//     skill_level_id: SkillLevelId.Basic,
//     en: {
//       description: "English for my first critical criterion",
//     },
//     fr: {
//       description: "French for my first critical criterion",
//     },
//   },

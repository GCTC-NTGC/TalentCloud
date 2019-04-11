import { Assessment } from "../types";

const getUniqueAssessmentTypes = (assessments: Assessment[]): number[] => {
  const uniqueIds: number[] = [];
  assessments.forEach(assessment => {
    if (!uniqueIds.includes(assessment.assessment_type_id)) {
      uniqueIds.push(assessment.assessment_type_id);
    }
  });
  return uniqueIds;
};

export { getUniqueAssessmentTypes };

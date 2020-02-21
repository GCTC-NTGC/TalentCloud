import { Assessment } from "../../models/types";

const getUniqueAssessmentTypes = (assessments: Assessment[]): number[] => {
  const uniqueIds: number[] = [];
  assessments.forEach(assessment => {
    if (!uniqueIds.includes(assessment.assessment_type_id)) {
      uniqueIds.push(assessment.assessment_type_id);
    }
  });
  return uniqueIds;
};
// eslint-disable-next-line import/prefer-default-export
export { getUniqueAssessmentTypes };

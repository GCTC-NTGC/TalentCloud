import createCachedSelector from "re-reselect";
import { getCurrentAssessments } from "./assessmentSelector";
import { getCriteriaIdsByJob } from "../Job/jobSelector";
import { Assessment } from "../../models/types";

/**
 * Returns current verisons of all assessments.
 * ie edited version if possible,
 * and not including those undergoing delete requests
 */
export const getAssessmentsByJob = createCachedSelector(
  getCurrentAssessments,
  getCriteriaIdsByJob,
  (assessments, criteriaIds): Assessment[] =>
    assessments.filter(
      (assessment): boolean => criteriaIds.includes(assessment.criterion_id),
    ),
)((state, props: { jobId: number }): number => props.jobId);

export default { getAssessmentsByJob };

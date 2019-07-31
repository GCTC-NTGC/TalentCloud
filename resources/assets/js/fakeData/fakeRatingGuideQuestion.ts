/* eslint-disable @typescript-eslint/camelcase */
import { RatingGuideQuestion } from "../models/types";
import { AssessmentTypeId } from "../models/lookupConstants";

export const fakeQuestion = (id = 1, jobPosterId = 1): RatingGuideQuestion => ({
  id,
  job_poster_id: jobPosterId,
  assessment_type_id: AssessmentTypeId.NarrativeAssessment,
  question: "This is a test question.",
});

export const fakeQuestion2 = (
  id = 2,
  jobPosterId = 1,
): RatingGuideQuestion => ({
  id,
  job_poster_id: jobPosterId,
  assessment_type_id: AssessmentTypeId.ApplicationScreeningQuestion,
  question: "This is a second test question.",
});

export const fakeQuestion3 = (
  id = 3,
  jobPosterId = 1,
): RatingGuideQuestion => ({
  id,
  job_poster_id: jobPosterId,
  assessment_type_id: AssessmentTypeId.GroupTest,
  question: "This is a third test question.",
});

export const fakeQuestion4 = (
  id = 4,
  jobPosterId = 1,
): RatingGuideQuestion => ({
  id,
  job_poster_id: jobPosterId,
  assessment_type_id: AssessmentTypeId.GroupTest,
  question: "This is a fourth test question.",
});

export const fakeQuestions = (): RatingGuideQuestion[] => [
  fakeQuestion(),
  fakeQuestion2(),
  fakeQuestion3(),
  fakeQuestion4(),
];

export default { fakeQuestion };

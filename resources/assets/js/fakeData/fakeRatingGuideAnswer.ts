/* eslint-disable @typescript-eslint/camelcase */
import { RatingGuideAnswer } from "../models/types";

export const fakeAnswer = (
  id = 1,
  ratingGuideQuestionId = 1,
  criterionId = 1,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a test answer.",
});

export const fakeAnswer2 = (
  id = 2,
  ratingGuideQuestionId = 2,
  criterionId = 2,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a second test answer.",
});

export const fakeAnswer3 = (
  id = 3,
  ratingGuideQuestionId = 3,
  criterionId = 3,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a third test answer.",
});

export const fakeAnswer4 = (
  id = 4,
  ratingGuideQuestionId = 4,
  criterionId = 4,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a fourth test answer.",
});

export const fakeAnswers = (): RatingGuideAnswer[] => [
  fakeAnswer(),
  fakeAnswer2(),
  fakeAnswer3(),
  fakeAnswer4(),
];

export default { fakeAnswer };

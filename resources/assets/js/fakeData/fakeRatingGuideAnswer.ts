/* eslint-disable @typescript-eslint/camelcase */
import { RatingGuideAnswer } from "../models/types";

export const fakeAnswer = (
  id: number = 1,
  ratingGuideQuestionId: number = 1,
  criterionId: number = 1,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a test answer.",
});

export const fakeAnswer2 = (
  id: number = 2,
  ratingGuideQuestionId: number = 2,
  criterionId: number = 2,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a second test answer.",
});

export const fakeAnswer3 = (
  id: number = 3,
  ratingGuideQuestionId: number = 3,
  criterionId: number = 3,
): RatingGuideAnswer => ({
  id,
  rating_guide_question_id: ratingGuideQuestionId,
  criterion_id: criterionId,
  expected_answer: "This is a third test answer.",
});

export const fakeAnswer4 = (
  id: number = 4,
  ratingGuideQuestionId: number = 4,
  criterionId: number = 4,
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

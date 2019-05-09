/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse } from "./base";
import { RatingGuideAnswer, RatingGuideQuestion } from "../models/types";

export const parseRatingGuideAnswer = (
  data: ResponseData,
): RatingGuideAnswer => ({
  id: Number(data.id),
  rating_guide_question_id: Number(data.rating_guide_question_id),
  criterion_id: Number(data.criterion_id),
  expected_answer: String(data.expected_answer || ""),
});

export const parseRatingGuideQuestion = (
  data: ResponseData,
): RatingGuideQuestion => ({
  id: Number(data.id),
  job_poster_id: Number(data.job_poster_id),
  assessment_type_id: Number(data.assessment_type_id),
  question: String(data.question || ""),
});

export const updateRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): Promise<RatingGuideAnswer> => {
  return axios
    .put(
      `${baseUrl()}/rating-guide-answers/${ratingGuideAnswer.id}`,
      ratingGuideAnswer,
    )
    .then(
      (response: ApiResponse): RatingGuideAnswer =>
        parseRatingGuideAnswer(response.data.rating_guide_answer),
    );
};

export const updateRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): Promise<RatingGuideQuestion> => {
  return axios
    .put(
      `${baseUrl()}/rating-guide-questions/${ratingGuideQuestion.id}`,
      ratingGuideQuestion,
    )
    .then(
      (response: ApiResponse): RatingGuideQuestion =>
        parseRatingGuideQuestion(response.data.rating_guide_question),
    );
};

export const createRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): Promise<RatingGuideAnswer> => {
  return axios
    .post(`${baseUrl()}/rating-guide-answers`, ratingGuideAnswer)
    .then(
      (response: ApiResponse): RatingGuideAnswer =>
        parseRatingGuideAnswer(response.data.rating_guide_answer),
    );
};

export const createRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): Promise<RatingGuideQuestion> => {
  return axios
    .post(`${baseUrl()}/rating-guide-questions`, ratingGuideQuestion)
    .then(
      (response: ApiResponse): RatingGuideQuestion =>
        parseRatingGuideQuestion(response.data.rating_guide_question),
    );
};

export const deleteRatingGuideAnswer = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl()}/rating-guide-answers/${id}`);
};

export const deleteRatingGuideQuestion = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl()}/rating-guide-questions/${id}`);
};

/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse, axiosConfig } from "./base";
import { RatingGuideAnswer, RatingGuideQuestion } from "../models/types";

export const parseRatingGuideAnswer = (
  data: ResponseData,
): RatingGuideAnswer => ({
  id: Number(data.id),
  rating_guide_question_id: Number(data.rating_guide_question_id),
  criterion_id: data.criterion_id ? Number(data.criterion_id) : null,
  expected_answer: data.expected_answer ? String(data.expected_answer) : null,
});

export const parseRatingGuideQuestion = (
  data: ResponseData,
): RatingGuideQuestion => ({
  id: Number(data.id),
  job_poster_id: Number(data.job_poster_id),
  assessment_type_id: Number(data.assessment_type_id),
  question: data.question ? String(data.question) : null,
});

export const updateRatingGuideAnswer = (
  ratingGuideAnswer: RatingGuideAnswer,
): Promise<RatingGuideAnswer> => {
  return axios
    .put(
      `${baseUrl()}/rating-guide-answers/${ratingGuideAnswer.id}`,
      ratingGuideAnswer,
      axiosConfig,
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
      axiosConfig,
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
    .post(`${baseUrl()}/rating-guide-answers`, ratingGuideAnswer, axiosConfig)
    .then(
      (response: ApiResponse): RatingGuideAnswer =>
        parseRatingGuideAnswer(response.data.rating_guide_answer),
    );
};

export const createRatingGuideQuestion = (
  ratingGuideQuestion: RatingGuideQuestion,
): Promise<RatingGuideQuestion> => {
  return axios
    .post(
      `${baseUrl()}/rating-guide-questions`,
      ratingGuideQuestion,
      axiosConfig,
    )
    .then(
      (response: ApiResponse): RatingGuideQuestion =>
        parseRatingGuideQuestion(response.data.rating_guide_question),
    );
};

export const deleteRatingGuideAnswer = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl()}/rating-guide-answers/${id}`, axiosConfig);
};

export const deleteRatingGuideQuestion = async (id: number): Promise<void> => {
  await axios.delete(`${baseUrl()}/rating-guide-questions/${id}`, axiosConfig);
};

/* eslint-disable @typescript-eslint/camelcase */
import axios from "axios";
import { ResponseData, baseUrl, ApiResponse } from "./base";
import {
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
} from "../models/types";
import { parseAssessment } from "./assessment";

export interface AssessmentPlan {
  assessments: Assessment[];
  questions: RatingGuideQuestion[];
  answers: RatingGuideAnswer[];
}

const parseRatingGuideAnswer = (data: ResponseData): RatingGuideAnswer => ({
  id: Number(data.id),
  rating_guide_question_id: Number(data.rating_guide_question_id),
  criterion_id: Number(data.criterion_id),
  expected_answer: data.expected_answer,
});

const parseRatingGuideQuestion = (data: ResponseData): RatingGuideQuestion => ({
  id: Number(data.id),
  job_poster_id: Number(data.job_poster_id),
  assessment_type_id: Number(data.assessment_type_id),
  question: data.question,
});

const parseAssessmentPlan = (data: ResponseData): AssessmentPlan => ({
  assessments: data.assessments.map(
    (assessmentData): Assessment => parseAssessment(assessmentData),
  ),
  questions: data.rating_guide_questions.map(
    (questionData): RatingGuideQuestion =>
      parseRatingGuideQuestion(questionData),
  ),
  answers: data.rating_guide_answers.map(
    (answerData): RatingGuideAnswer => parseRatingGuideAnswer(answerData),
  ),
});

export const getAssessmentPlan = (jobId: number): Promise<AssessmentPlan> => {
  return axios
    .get(`${baseUrl()}/jobs/${jobId}/assessment-plan`)
    .then(
      (response: ApiResponse): AssessmentPlan =>
        parseAssessmentPlan(response.data),
    );
};

export default { getAssessmentPlan };

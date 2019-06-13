/* eslint-disable @typescript-eslint/camelcase */
import { RatingGuideQuestion } from "../models/types";

export const fakeQuestion = (id = 1, jobPosterId = 1): RatingGuideQuestion => ({
  id,
  job_poster_id: jobPosterId,
  assessment_type_id: 1,
  question: "This is a test string",
});

export default { fakeQuestion };

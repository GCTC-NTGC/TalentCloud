import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncPost,
  asyncPut,
} from "../asyncAction";
import { JobApplicationAnswer } from "../../models/types";
import {
  getJobApplicationAnswerEndpoint,
  parseJobApplicationAnswer,
} from "../../api/jobApplicationAnswer";

export const CREATE_JOB_APPLICATION_ANSWER_STARTED =
  "JOB APPLICATION ANSWER: CREATE STARTED";
export const CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED =
  "JOB APPLICATION ANSWER: CREATE SUCCEEDED";
export const CREATE_JOB_APPLICATION_ANSWER_FAILED =
  "JOB APPLICATION ANSWER: CREATE FAILED";

export type CreateJobApplicationAnswerAction = AsyncFsaActions<
  typeof CREATE_JOB_APPLICATION_ANSWER_STARTED,
  typeof CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
  typeof CREATE_JOB_APPLICATION_ANSWER_FAILED,
  JobApplicationAnswer,
  {}
>;

export const createJobApplicationAnswer = (
  jobApplicationAnswer: JobApplicationAnswer,
): RSAActionTemplate<
  typeof CREATE_JOB_APPLICATION_ANSWER_STARTED,
  typeof CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
  typeof CREATE_JOB_APPLICATION_ANSWER_FAILED,
  JobApplicationAnswer,
  {}
> =>
  asyncPost(
    getJobApplicationAnswerEndpoint(),
    jobApplicationAnswer,
    CREATE_JOB_APPLICATION_ANSWER_STARTED,
    CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
    CREATE_JOB_APPLICATION_ANSWER_FAILED,
    parseJobApplicationAnswer,
    {},
  );

export const UPDATE_JOB_APPLICATION_ANSWER_STARTED =
  "JOB APPLICATION ANSWER: UPDATE STARTED";
export const UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED =
  "JOB APPLICATION ANSWER: UPDATE SUCCEEDED";
export const UPDATE_JOB_APPLICATION_ANSWER_FAILED =
  "JOB APPLICATION ANSWER: UPDATE FAILED";

export type UpdateJobApplicationAnswerAction = AsyncFsaActions<
  typeof UPDATE_JOB_APPLICATION_ANSWER_STARTED,
  typeof UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
  typeof UPDATE_JOB_APPLICATION_ANSWER_FAILED,
  JobApplicationAnswer,
  {}
>;

export const updateJobApplicationAnswer = (
  jobApplicationAnswer: JobApplicationAnswer,
): RSAActionTemplate<
  typeof UPDATE_JOB_APPLICATION_ANSWER_STARTED,
  typeof UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
  typeof UPDATE_JOB_APPLICATION_ANSWER_FAILED,
  JobApplicationAnswer,
  { id: number }
> =>
  asyncPut(
    getJobApplicationAnswerEndpoint(jobApplicationAnswer.id),
    jobApplicationAnswer,
    UPDATE_JOB_APPLICATION_ANSWER_STARTED,
    UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
    UPDATE_JOB_APPLICATION_ANSWER_FAILED,
    parseJobApplicationAnswer,
    { id: jobApplicationAnswer.id },
  );

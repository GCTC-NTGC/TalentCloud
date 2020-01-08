import {
  getJobEndpoint,
  parseJobResponse,
  parseJob,
  parseTasksResponse,
  getTasksEndpoint,
  getCriteriaEndpoint,
  parseCriteriaResponse,
  getSubmitJobEndpoint,
  parseJobIndexResponse,
} from "../../api/job";
import { Job, Criteria, JobPosterKeyTask } from "../../models/types";
import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncGet,
  asyncPut,
  asyncPost,
} from "../asyncAction";
import { Action } from "../createAction";
import { addQueryParameters } from "../../api/base";

export const FETCH_JOB_STARTED = "JOB: GET STARTED";
export const FETCH_JOB_SUCCEEDED = "JOB: GET SUCCEEDED";
export const FETCH_JOB_FAILED = "JOB: GET FAILED";

export type FetchJobAction = AsyncFsaActions<
  typeof FETCH_JOB_STARTED,
  typeof FETCH_JOB_SUCCEEDED,
  typeof FETCH_JOB_FAILED,
  { job: Job; criteria: Criteria[] },
  { id: number }
>;

export const fetchJob = (
  id: number,
): RSAActionTemplate<
  typeof FETCH_JOB_STARTED,
  typeof FETCH_JOB_SUCCEEDED,
  typeof FETCH_JOB_FAILED,
  { job: Job; criteria: Criteria[] },
  { id: number }
> =>
  asyncGet(
    getJobEndpoint(id),
    FETCH_JOB_STARTED,
    FETCH_JOB_SUCCEEDED,
    FETCH_JOB_FAILED,
    parseJobResponse,
    { id },
  );

export const FETCH_JOB_INDEX_STARTED = "JOB: GET INDEX STARTED";
export const FETCH_JOB_INDEX_SUCCEEDED = "JOB: GET INDEX SUCCEEDED";
export const FETCH_JOB_INDEX_FAILED = "JOB: GET INDEX FAILED";

export type FetchJobIndexAction = AsyncFsaActions<
  typeof FETCH_JOB_INDEX_STARTED,
  typeof FETCH_JOB_INDEX_SUCCEEDED,
  typeof FETCH_JOB_INDEX_FAILED,
  { jobs: Job[] },
  { filters: Map<string, string> }
>;

export const fetchJobIndex = (
  filters: Map<string, string>,
): RSAActionTemplate<
  typeof FETCH_JOB_INDEX_STARTED,
  typeof FETCH_JOB_INDEX_SUCCEEDED,
  typeof FETCH_JOB_INDEX_FAILED,
  { jobs: Job[] },
  { filters: Map<string, string> }
> =>
  asyncGet(
    addQueryParameters(getJobEndpoint(null), filters),
    FETCH_JOB_INDEX_STARTED,
    FETCH_JOB_INDEX_SUCCEEDED,
    FETCH_JOB_INDEX_FAILED,
    parseJobIndexResponse,
    { filters },
  );

export const CREATE_JOB_STARTED = "JOB: CREATE STARTED";
export const CREATE_JOB_SUCCEEDED = "JOB: CREATE SUCCEEDED";
export const CREATE_JOB_FAILED = "JOB: CREATE FAILED";

export type CreateJobAction = AsyncFsaActions<
  typeof CREATE_JOB_STARTED,
  typeof CREATE_JOB_SUCCEEDED,
  typeof CREATE_JOB_FAILED,
  Job,
  {}
>;

export const createJob = (
  job: Job,
): RSAActionTemplate<
  typeof CREATE_JOB_STARTED,
  typeof CREATE_JOB_SUCCEEDED,
  typeof CREATE_JOB_FAILED,
  Job,
  {}
> =>
  asyncPost(
    getJobEndpoint(null),
    job,
    CREATE_JOB_STARTED,
    CREATE_JOB_SUCCEEDED,
    CREATE_JOB_FAILED,
    parseJob,
    {},
  );

export const UPDATE_JOB_STARTED = "JOB: UPDATE STARTED";
export const UPDATE_JOB_SUCCEEDED = "JOB: UPDATE SUCCEEDED";
export const UPDATE_JOB_FAILED = "JOB: UPDATE FAILED";

export type UpdateJobAction = AsyncFsaActions<
  typeof UPDATE_JOB_STARTED,
  typeof UPDATE_JOB_SUCCEEDED,
  typeof UPDATE_JOB_FAILED,
  Job,
  { id: number }
>;

export const updateJob = (
  job: Job,
): RSAActionTemplate<
  typeof UPDATE_JOB_STARTED,
  typeof UPDATE_JOB_SUCCEEDED,
  typeof UPDATE_JOB_FAILED,
  Job,
  { id: number }
> =>
  asyncPut(
    getJobEndpoint(job.id),
    job,
    UPDATE_JOB_STARTED,
    UPDATE_JOB_SUCCEEDED,
    UPDATE_JOB_FAILED,
    parseJob,
    { id: job.id },
  );

export const EDIT_JOB = "JOB: EDIT";
export type EditJobAction = Action<typeof EDIT_JOB, Job>;
export const editJob = (job: Job): EditJobAction => ({
  type: EDIT_JOB,
  payload: job,
});

export const CLEAR_JOB_EDIT = "JOB: CLEAR EDITS";
export type ClearEditJobAction = Action<typeof CLEAR_JOB_EDIT, number>;
export const clearJobEdit = (jobId: number): ClearEditJobAction => ({
  type: CLEAR_JOB_EDIT,
  payload: jobId,
});

export const SET_SELECTED_JOB = "JOB: SET SELECTED";
export type SetSelectedJobAction = Action<
  typeof SET_SELECTED_JOB,
  { jobId: number | null }
>;
export const setSelectedJob = (jobId: number | null): SetSelectedJobAction => ({
  type: SET_SELECTED_JOB,
  payload: { jobId },
});

export const FETCH_JOB_TASKS_STARTED = "JOB TASKS: GET STARTED";
export const FETCH_JOB_TASKS_SUCCEEDED = "JOB TASKS: GET SUCCEEDED";
export const FETCH_JOB_TASKS_FAILED = "JOB TASKS: GET FAILED";

export type FetchJobTasksAction = AsyncFsaActions<
  typeof FETCH_JOB_TASKS_STARTED,
  typeof FETCH_JOB_TASKS_SUCCEEDED,
  typeof FETCH_JOB_TASKS_FAILED,
  JobPosterKeyTask[],
  { jobId: number }
>;

export const fetchJobTasks = (
  jobId: number,
): RSAActionTemplate<
  typeof FETCH_JOB_TASKS_STARTED,
  typeof FETCH_JOB_TASKS_SUCCEEDED,
  typeof FETCH_JOB_TASKS_FAILED,
  JobPosterKeyTask[],
  { jobId: number }
> =>
  asyncGet(
    getTasksEndpoint(jobId),
    FETCH_JOB_TASKS_STARTED,
    FETCH_JOB_TASKS_SUCCEEDED,
    FETCH_JOB_TASKS_FAILED,
    parseTasksResponse,
    { jobId },
  );

export const BATCH_UPDATE_JOB_TASKS_STARTED = "JOB TASKS: BATCH UPDATE STARTED";
export const BATCH_UPDATE_JOB_TASKS_SUCCEEDED =
  "JOB TASKS: BATCH UPDATE SUCCEEDED";
export const BATCH_UPDATE_JOB_TASKS_FAILED = "JOB TASKS: BATCH UPDATE FAILED";

export type BatchUpdateJobTasksAction = AsyncFsaActions<
  typeof BATCH_UPDATE_JOB_TASKS_STARTED,
  typeof BATCH_UPDATE_JOB_TASKS_SUCCEEDED,
  typeof BATCH_UPDATE_JOB_TASKS_FAILED,
  JobPosterKeyTask[],
  { jobId: number }
>;

export const batchUpdateJobTasks = (
  jobId: number,
  tasks: JobPosterKeyTask[],
): RSAActionTemplate<
  typeof BATCH_UPDATE_JOB_TASKS_STARTED,
  typeof BATCH_UPDATE_JOB_TASKS_SUCCEEDED,
  typeof BATCH_UPDATE_JOB_TASKS_FAILED,
  JobPosterKeyTask[],
  { jobId: number }
> =>
  asyncPut(
    getTasksEndpoint(jobId),
    tasks,
    BATCH_UPDATE_JOB_TASKS_STARTED,
    BATCH_UPDATE_JOB_TASKS_SUCCEEDED,
    BATCH_UPDATE_JOB_TASKS_FAILED,
    parseTasksResponse,
    { jobId },
  );

export const FETCH_CRITERIA_STARTED = "CRITERIA: GET STARTED";
export const FETCH_CRITERIA_SUCCEEDED = "CRITERIA: GET SUCCEEDED";
export const FETCH_CRITERIA_FAILED = "CRITERIA: GET FAILED";

export type FetchCriteriaAction = AsyncFsaActions<
  typeof FETCH_CRITERIA_STARTED,
  typeof FETCH_CRITERIA_SUCCEEDED,
  typeof FETCH_CRITERIA_FAILED,
  Criteria[],
  { jobId: number }
>;

export const fetchCriteria = (
  jobId: number,
): RSAActionTemplate<
  typeof FETCH_CRITERIA_STARTED,
  typeof FETCH_CRITERIA_SUCCEEDED,
  typeof FETCH_CRITERIA_FAILED,
  Criteria[],
  { jobId: number }
> =>
  asyncGet(
    getCriteriaEndpoint(jobId),
    FETCH_CRITERIA_STARTED,
    FETCH_CRITERIA_SUCCEEDED,
    FETCH_CRITERIA_FAILED,
    parseCriteriaResponse,
    { jobId },
  );

export const BATCH_UPDATE_CRITERIA_STARTED = "CRITERIA: BATCH UPDATE STARTED";
export const BATCH_UPDATE_CRITERIA_SUCCEEDED =
  "CRITERIA: BATCH UPDATE SUCCEEDED";
export const BATCH_UPDATE_CRITERIA_FAILED = "CRITERIA: BATCH UPDATE FAILED";

export type BatchUpdateCriteriaAction = AsyncFsaActions<
  typeof BATCH_UPDATE_CRITERIA_STARTED,
  typeof BATCH_UPDATE_CRITERIA_SUCCEEDED,
  typeof BATCH_UPDATE_CRITERIA_FAILED,
  Criteria[],
  { jobId: number }
>;

export const batchUpdateCriteria = (
  jobId: number,
  criteria: Criteria[],
): RSAActionTemplate<
  typeof BATCH_UPDATE_CRITERIA_STARTED,
  typeof BATCH_UPDATE_CRITERIA_SUCCEEDED,
  typeof BATCH_UPDATE_CRITERIA_FAILED,
  Criteria[],
  { jobId: number }
> =>
  asyncPut(
    getCriteriaEndpoint(jobId),
    criteria,
    BATCH_UPDATE_CRITERIA_STARTED,
    BATCH_UPDATE_CRITERIA_SUCCEEDED,
    BATCH_UPDATE_CRITERIA_FAILED,
    parseCriteriaResponse,
    { jobId },
  );

export const SUBMIT_JOB_FOR_REVIEW_STARTED = "JOB: SUBMIT FOR REVIEW STARTED";
export const SUBMIT_JOB_FOR_REVIEW_SUCCEEDED =
  "JOB: SUBMIT FOR REVIEW SUCCEEDED";
export const SUBMIT_JOB_FOR_REVIEW_FAILED = "JOB: SUBMIT FOR REVIEW FAILED";
export type SubmitJobForReviewAction = AsyncFsaActions<
  typeof SUBMIT_JOB_FOR_REVIEW_STARTED,
  typeof SUBMIT_JOB_FOR_REVIEW_SUCCEEDED,
  typeof SUBMIT_JOB_FOR_REVIEW_FAILED,
  Job,
  { id: number }
>;
export const submitJobForReview = (
  jobId: number,
): RSAActionTemplate<
  typeof SUBMIT_JOB_FOR_REVIEW_STARTED,
  typeof SUBMIT_JOB_FOR_REVIEW_SUCCEEDED,
  typeof SUBMIT_JOB_FOR_REVIEW_FAILED,
  Job,
  { id: number }
> =>
  asyncPost(
    getSubmitJobEndpoint(jobId),
    "",
    SUBMIT_JOB_FOR_REVIEW_STARTED,
    SUBMIT_JOB_FOR_REVIEW_SUCCEEDED,
    SUBMIT_JOB_FOR_REVIEW_FAILED,
    parseJob,
    { id: jobId },
  );

export type JobAction =
  | FetchJobAction
  | FetchJobIndexAction
  | CreateJobAction
  | UpdateJobAction
  | EditJobAction
  | ClearEditJobAction
  | SetSelectedJobAction
  | FetchJobTasksAction
  | BatchUpdateJobTasksAction
  | FetchCriteriaAction
  | BatchUpdateCriteriaAction
  | SubmitJobForReviewAction;

export default { fetchJob };

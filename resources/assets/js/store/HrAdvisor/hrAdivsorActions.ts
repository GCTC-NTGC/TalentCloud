import {
  asyncGet,
  asyncPut,
  asyncDelete,
  AsyncFsaActions,
  RSAActionTemplate,
} from "../asyncAction";
import { HrAdvisor } from "../../models/types";
import { getHrAdvisorEndpoint, getClaimJobEndpoint } from "../../api/hrAdvisor";

export const GET_HR_ADVISOR_STARTED = "HR ADVISOR: GET STARTED";
export const GET_HR_ADVISOR_SUCCEEDED = "HR ADVISOR: GET SUCCEEDED";
export const GET_HR_ADVISOR_FAILED = "HR ADVISOR: GET FAILED";

export type GetHrAdvisorAction = AsyncFsaActions<
  typeof GET_HR_ADVISOR_STARTED,
  typeof GET_HR_ADVISOR_SUCCEEDED,
  typeof GET_HR_ADVISOR_FAILED,
  HrAdvisor,
  { id: number }
>;

export const getHrAdvisor = (
  id: number,
): RSAActionTemplate<
  typeof GET_HR_ADVISOR_STARTED,
  typeof GET_HR_ADVISOR_SUCCEEDED,
  typeof GET_HR_ADVISOR_FAILED,
  HrAdvisor,
  { id: number }
> =>
  asyncGet(
    getHrAdvisorEndpoint(id),
    GET_HR_ADVISOR_STARTED,
    GET_HR_ADVISOR_SUCCEEDED,
    GET_HR_ADVISOR_FAILED,
    response => response,
    { id },
  );

export const CLAIM_JOB_STARTED = "HR ADVISOR: CLAIM JOB STARTED";
export const CLAIM_JOB_SUCCEEDED = "HR ADVISOR: CLAIM JOB SUCCEEDED";
export const CLAIM_JOB_FAILED = "HR ADVISOR: CLAIM JOB FAILED";

export type ClaimJobAction = AsyncFsaActions<
  typeof CLAIM_JOB_STARTED,
  typeof CLAIM_JOB_SUCCEEDED,
  typeof CLAIM_JOB_FAILED,
  {},
  {
    jobId: number;
  }
>;

export const claimJob = (
  jobId: number,
): RSAActionTemplate<
  typeof CLAIM_JOB_STARTED,
  typeof CLAIM_JOB_SUCCEEDED,
  typeof CLAIM_JOB_FAILED,
  {},
  { jobId: number }
> =>
  asyncPut(
    getClaimJobEndpoint(jobId),
    {},
    CLAIM_JOB_STARTED,
    CLAIM_JOB_SUCCEEDED,
    CLAIM_JOB_FAILED,
    response => ({}),
    { jobId },
  );
export const UNCLAIM_JOB_STARTED = "HR ADVISOR: UNCLAIM JOB STARTED";
export const UNCLAIM_JOB_SUCCEEDED = "HR ADVISOR: UNCLAIM JOB SUCCEEDED";
export const UNCLAIM_JOB_FAILED = "HR ADVISOR: UNCLAIM JOB FAILED";

export type UnclaimJobAction = AsyncFsaActions<
  typeof UNCLAIM_JOB_STARTED,
  typeof UNCLAIM_JOB_SUCCEEDED,
  typeof UNCLAIM_JOB_FAILED,
  {},
  {
    jobId: number;
  }
>;

export const unclaimJob = (
  jobId: number,
): RSAActionTemplate<
  typeof UNCLAIM_JOB_STARTED,
  typeof UNCLAIM_JOB_SUCCEEDED,
  typeof UNCLAIM_JOB_FAILED,
  {},
  { jobId: number }
> =>
  asyncDelete(
    getClaimJobEndpoint(jobId),
    UNCLAIM_JOB_STARTED,
    UNCLAIM_JOB_SUCCEEDED,
    UNCLAIM_JOB_FAILED,
    response => ({}),
    { jobId },
  );

export type HrAdvisorAction =
  | GetHrAdvisorAction
  | ClaimJobAction
  | UnclaimJobAction;

import { RootState } from "../store";
import { JobPosterStatus } from "../../models/types";
import { JobStatusState } from "./jobStatusReducer";

export const getJobStatusState = (state: RootState): JobStatusState =>
  state.jobStatuses;

export const getJobStatuses = (state: RootState): JobPosterStatus[] =>
  Object.values(getJobStatusState(state).byId);

export const getJobStatusById = (
  state: RootState,
  { statusId }: { statusId: number },
): JobPosterStatus | null => getJobStatusState(state).byId[statusId] ?? null;

export const jobStatusesLoading = (state: RootState): boolean =>
  getJobStatusState(state).loading;

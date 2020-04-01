import { AsyncFsaActions } from "../asyncAction";
import { Application } from "../../models/types";

export const FETCH_APPLICATION_STARTED = "APPLICATION: GET STARTED";
export const FETCH_APPLICATION_SUCCEEDED = "APPLICATION: GET SUCCEEDED";
export const FETCH_APPLICATION_FAILED = "APPLICATION: GET FAILED";

export type FetchApplicationAction = AsyncFsaActions<
  typeof FETCH_APPLICATION_STARTED,
  typeof FETCH_APPLICATION_SUCCEEDED,
  typeof FETCH_APPLICATION_FAILED,
  Application,
  { id: number }
>;

export type ApplicationAction = FetchApplicationAction;

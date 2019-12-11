import { RootState } from "../store";
import { EntityState, UiState } from "./hrAdvisorReducer";
import { HrAdvisor } from "../../models/types";
import { hasKey, identity } from "../../helpers/queries";

const entities = (state: RootState): EntityState => state.hrAdvisor.entities;
const ui = (state: RootState): UiState => state.hrAdvisor.ui;

export const getHrAdvisor = (
  state: RootState,
  { hrAdvisorId }: { hrAdvisorId: number },
): HrAdvisor | null => {
  const advisors = entities(state).hrAdvisors.byId;
  return hasKey(advisors, hrAdvisorId) ? advisors[hrAdvisorId] : null;
};

const anyJobClaimIsUpdatingForUser = (
  state: RootState,
  { hrAdvisorId }: { hrAdvisorId: number },
): boolean =>
  hasKey(ui(state).jobClaimUpdating, hrAdvisorId) &&
  Object.values(ui(state).jobClaimUpdating[hrAdvisorId]).some(identity);

export const getHrAdvisorIsUpdating = (
  state: RootState,
  { hrAdvisorId }: { hrAdvisorId: number },
): boolean =>
  ui(state).hrAdvisorUpdating[hrAdvisorId] === true ||
  anyJobClaimIsUpdatingForUser(state, { hrAdvisorId });

export const getJobClaimIsUpdating = (
  state: RootState,
  { hrAdvisorId, jobId }: { hrAdvisorId: number; jobId: number },
): boolean =>
  hasKey(ui(state).jobClaimUpdating, hrAdvisorId) &&
  hasKey(ui(state).jobClaimUpdating[hrAdvisorId], jobId) &&
  ui(state).jobClaimUpdating[hrAdvisorId][jobId];

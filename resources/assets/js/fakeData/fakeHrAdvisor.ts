/* eslint-disable @typescript-eslint/camelcase */
import { HrAdvisor } from "../models/types";

export const fakeHrAdvisor = (
  overrides: Partial<HrAdvisor> = {},
): HrAdvisor => ({
  id: 1,
  user_id: 1,
  first_name: "Sam",
  last_name: "Smith",
  claimed_job_ids: [],
  ...overrides,
});

export default { fakeHrAdvisor };

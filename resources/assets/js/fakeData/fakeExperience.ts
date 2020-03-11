import { ExperienceWork } from "../models/types";
import dayjs from "dayjs";

export const fakeExperienceWork = (overrides: Partial<ExperienceWork> = {}): ExperienceWork => ({
  id: 1,
  title: "Applied Researched",
  organization: "ACME Labs.",
  group: "Research Division",
  is_active: false,
  start_date: dayjs("01/07/2015").toDate(),
  end_date: dayjs("12/13/2019").toDate(),
  ...overrides,
});

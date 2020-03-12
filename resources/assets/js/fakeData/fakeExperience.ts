import {
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
} from "../models/types";
import dayjs from "dayjs";

export const fakeExperienceWork = (
  overrides: Partial<ExperienceWork> = {},
): ExperienceWork => ({
  id: 1,
  title: "Applied Researched",
  organization: "ACME Labs.",
  group: "Research Division",
  is_active: false,
  start_date: dayjs("01/07/2015").toDate(),
  end_date: dayjs("12/13/2019").toDate(),
  ...overrides,
});

export const fakeExperienceEducation = (
  overrides: Partial<ExperienceEducation> = {},
): ExperienceEducation => ({
  id: 1,
  education_type_id: 1,
  area_of_study: "Engineering",
  institution: "University of Toronto",
  education_status_id: 1,
  is_active: false,
  start_date: dayjs("09/01/2010").toDate(),
  end_date: dayjs("04/30/2015").toDate(),
  thesis_title: "How do concrete structures withstand hurricane wind stress?",
  has_blockcert: true,
  ...overrides,
});

export const fakeExperienceCommunity = (
  overrides: Partial<ExperienceCommunity> = {},
): ExperienceCommunity => ({
  id: 1,
  title: "Volunteer",
  group: "SPCA Ottawa",
  project: "Adoption Weekend",
  is_active: true,
  start_date: dayjs("04/01/2018").toDate(),
  end_date: null,
  ...overrides,
});

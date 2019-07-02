/* eslint-disable @typescript-eslint/camelcase */
import { Job, Criteria } from "../models/types";

export const fakeJob = (id = 1): Job => ({
  id,
  manager_id: 1,
  term_qty: 12,
  open_date_time: new Date("2019-05-20T07:00:00"),
  close_date_time: new Date("2019-05-30T06:59:59"),
  start_date_time: new Date("2019-07-01T07:00:00"),
  department_id: 1,
  province_id: 1,
  salary_min: 85000,
  salary_max: 100000,
  noc: 1234,
  classification_code: "EX",
  classification_level: 4,
  security_clearance_id: 1,
  language_requirement_id: 1,
  remote_work_allowed: true,
  published_at: null,
  review_requested_at: null,
  team_size: 15,
  work_env_features: {
    env_open_concept: true,
    env_windows: true,
    amenities_near_transit: false,
  },
  fast_vs_steady: 1,
  horizontal_vs_vertical: 2,
  experimental_vs_ongoing: 3,
  citizen_facing_vs_back_office: 4,
  collaborative_vs_independent: 3,
  telework_allowed_frequency_id: 1,
  flexible_hours_frequency_id: 2,
  en: {
    city: "Rempelfort",
    title: "I wonder if I'm on the.",
    team_impact:
      "A in excepturi dolorem impedit. Expedita et nihil provident quo soluta neque. Odio et ut nostrum aut. Tenetur odit expedita molestias asperiores qui repudiandae eveniet.",
    hire_impact:
      "Aliquam aspernatur possimus est harum in explicabo et ut. Sint iure quaerat impedit et et. Ut dolorum assumenda repellat ducimus itaque.",
    branch: "dolor",
    division: "suscipit",
    education: "Dolorem laborum vel sequi quo autem.",
    work_env_description:
      "Our office also has a couch that is so comfortable it must be hidden from view.",
    culture_summary:
      " Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
    culture_special: "We're also a very informal, irreverant group.",
  },
  fr: {
    city: "Lake Robbburgh",
    title: "Queen! The Queen!' and.",
    team_impact:
      "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
    hire_impact:
      "Nulla enim dignissimos ea saepe totam. Deserunt quod deserunt et sed qui nesciunt illo eaque.\n\nVeniam laudantium ab illo. In in et et voluptatem excepturi. Nesciunt deleniti qui vero magni sunt earum rerum.",
    branch: "dolor",
    division: "minima",
    education: "Ut odit inventore incidunt.",
    work_env_description:
      "Our office also has a couch that is so comfortable it must be hidden from view.",
    culture_summary:
      " Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
    culture_special: "We're also a very informal, irreverant group.",
  },
});

export const fakeJob2 = (id = 1): Job => ({
  id,
  manager_id: 1,
  term_qty: 18,
  open_date_time: new Date("2019-05-01T07:00:00"),
  close_date_time: new Date("2019-05-15T06:59:59"),
  start_date_time: new Date("2019-08-01T07:00:00"),
  department_id: 1,
  province_id: 1,
  salary_min: 95000,
  salary_max: 110000,
  noc: 1234,
  classification_code: "CS",
  classification_level: 3,
  security_clearance_id: 1,
  language_requirement_id: 1,
  remote_work_allowed: true,
  published_at: null,
  review_requested_at: null,
  team_size: 40,
  work_env_features: {
    env_open_concept: false,
    env_windows: true,
    amenities_near_transit: false,
    amenities_cafeteria: true,
  },
  fast_vs_steady: 3,
  horizontal_vs_vertical: 4,
  experimental_vs_ongoing: 2,
  citizen_facing_vs_back_office: 1,
  collaborative_vs_independent: 2,
  telework_allowed_frequency_id: 3,
  flexible_hours_frequency_id: 1,
  en: {
    city: "Ottawa",
    title: "UX Designer",
    team_impact:
      "A in excepturi dolorem impedit. Expedita et nihil provident quo soluta neque. Odio et ut nostrum aut. Tenetur odit expedita molestias asperiores qui repudiandae eveniet.",
    hire_impact:
      "Aliquam aspernatur possimus est harum in explicabo et ut. Sint iure quaerat impedit et et. Ut dolorum assumenda repellat ducimus itaque.",
    branch: "CIOB",
    division: "",
    education: "Dolorem laborum vel sequi quo autem.",
    work_env_description:
      "You may be able to pick your own office, if you work remotely.",
    culture_summary:
      "Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine.",
    culture_special: null,
  },
  fr: {
    city: "Ottawa",
    title: "UX Designer",
    team_impact:
      "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
    hire_impact:
      "Nulla enim dignissimos ea saepe totam. Deserunt quod deserunt et sed qui nesciunt illo eaque.\n\nVeniam laudantium ab illo. In in et et voluptatem excepturi. Nesciunt deleniti qui vero magni sunt earum rerum.",
    branch: "CIOB",
    division: "",
    education: "Ut odit inventore incidunt.",
    work_env_description:
      "FR You may be able to pick your own office, if you work remotely.",
    culture_summary:
      "FR Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine.",
    culture_special: null,
  },
});

export const fakeCriterion = (id: number = 1, jobId: number = 1): Criteria => ({
  id,
  criteria_type_id: 1,
  job_poster_id: jobId,
  skill_id: 1,
  skill_level_id: 1,
  en: {
    description: `This is criteria number ${jobId}`,
  },
  fr: {
    description: `FR This is criteria number ${jobId}`,
  },
});

export default fakeJob;

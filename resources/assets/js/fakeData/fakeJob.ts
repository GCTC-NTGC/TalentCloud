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

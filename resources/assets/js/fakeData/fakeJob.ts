/* eslint-disable @typescript-eslint/camelcase */
import { Job, Criteria, JobPosterKeyTask } from "../models/types";

export const fakeJob = (id = 1): Job => ({
  id,
  manager_id: 1,
  term_qty: 12,
  open_date_time: new Date("2019-05-20T07:00:00"),
  close_date_time: new Date("2019-05-30T06:59:59"),
  start_date_time: new Date("2019-07-01T07:00:00"),
  department_id: 3,
  province_id: 4,
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
    dept_impact:
      "This is a statement about all the great things you will do in this department.",
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
    dept_impact:
      "FRENCH: This is a statement about all the great things you will do in this department.",
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
    dept_impact:
      "This is a statement about all the great things you will do in this department.",
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
    dept_impact:
      "FRENCH: This is a statement about all the great things you will do in this department.",
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
    description: `This is the description of skill 1.`,
    specificity: `This text is specific to criteria ${id}`,
  },
  fr: {
    description: `FR This is the description of skill 1.`,
    specificity: `FR This text is specific to criteria ${id}`,
  },
});

export const fakeJobTasks = (jobId: number = 1): JobPosterKeyTask[] => [
  {
    id: 1,
    job_poster_id: jobId,
    en: {
      description:
        "Consult broadly and recruit executive leadership in digital and technology for federal organizations (e.g., C-Suite level positions like Chief Information Officers, Chief Digital Officers, Chief Technology Officers, and their deputies).",
    },
    fr: {
      description:
        "Consult broadly and recruit executive leadership in digital and technology for federal organizations (e.g., C-Suite level positions like Chief Information Officers, Chief Digital Officers, Chief Technology Officers, and their deputies).",
    },
  },
  {
    id: 2,
    job_poster_id: jobId,
    en: {
      description:
        "Connect partner organizations (departments, agencies) with top talent (i.e., high-performing executives) with an interest and the potential to assume technology leadership roles.",
    },
    fr: {
      description:
        "Connect partner organizations (departments, agencies) with top talent (i.e., high-performing executives) with an interest and the potential to assume technology leadership roles.",
    },
  },
  {
    id: 3,
    job_poster_id: jobId,
    en: {
      description:
        "Identify and attract exceptional executive candidates, including those who haven’t considered government as an option before.",
    },
    fr: {
      description:
        "Identify and attract exceptional executive candidates, including those who haven’t considered government as an option before.",
    },
  },
  {
    id: 4,
    job_poster_id: jobId,
    en: {
      description:
        "Build a diverse pipeline of candidates and strong partnerships with government departments. This means proactively going out and building a network and strong relationships with senior level external talent (CIOs and similar senior-level positions) across Canada, as well as with senior leaders in departments and agencies who have vacant positions.",
    },
    fr: {
      description:
        "Build a diverse pipeline of candidates and strong partnerships with government departments. This means proactively going out and building a network and strong relationships with senior level external talent (CIOs and similar senior-level positions) across Canada, as well as with senior leaders in departments and agencies who have vacant positions.",
    },
  },
  {
    id: 5,
    job_poster_id: jobId,
    en: {
      description:
        "Take a human-centered approach to recruitment by understanding users’ needs (hiring executives and candidates) to deliver exceptional user experience.",
    },
    fr: {
      description:
        "Take a human-centered approach to recruitment by understanding users’ needs (hiring executives and candidates) to deliver exceptional user experience.",
    },
  },
  {
    id: 6,
    job_poster_id: jobId,
    en: {
      description:
        "Work creatively using a broad array of traditional and social media approaches.",
    },
    fr: {
      description:
        "Work creatively using a broad array of traditional and social media approaches.",
    },
  },
  {
    id: 7,
    job_poster_id: jobId,
    en: {
      description: "This is an example of a task that has exceeded the limit.",
    },
    fr: {
      description: "This is an example of a task that has exceeded the limit.",
    },
  },
  {
    id: 8,
    job_poster_id: jobId,
    en: {
      description: "This is an example of a task that has exceeded the limit.",
    },
    fr: {
      description: "This is an example of a task that has exceeded the limit.",
    },
  },
];

export default fakeJob;

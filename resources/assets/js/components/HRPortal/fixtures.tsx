import { JobStatus } from "../../models/lookupConstants";
import { JobCardProps } from "../JobCard";
import { UnclaimedJobCardProps } from "../UnclaimedJobCard";
import { JobPosterStatus } from "../../models/types";

export const jobPosterStatuses: { [key: string]: JobPosterStatus } = {
         Draft: {
           id: 1,
           key: JobStatus.Draft,
           name: { en: "Draft", fr: "Provisoire" },
           description: { en: "This is a draft.", fr: "This is a draft (FR)." },
         },
         ReviewManager: {
           id: 2,
           key: JobStatus.ReviewManager,
           name: {
             en: "In Review (Manager)",
             fr: "En revue (Gestionnaire)",
           },
           description: {
             en: "This is in review by managers.",
             fr: "This is in review by managers (FR).",
           },
         },
         ReviewHr: {
           id: 3,
           key: JobStatus.ReviewHr,
           name: {
             en: "In Review (HR)",
             fr: "En revue (HR)",
           },
           description: {
             en: "This is in review by managers.",
             fr: "This is in review by HR (FR).",
           },
         },
         Translation: {
           id: 4,
           key: JobStatus.Translation,
           name: {
             en: "In Translation",
             fr: "En traduction",
           },
           description: {
             en: "This is in translation.",
             fr: "This is in translation (FR).",
           },
         },
         FinalReviewManager: {
           id: 5,
           key: JobStatus.FinalReviewManager,
           name: {
             en: "Final Review (Manager)",
             fr: "Révision finale (Gestionnaire)",
           },
           description: {
             fr: "This is in final review by manager (FR).",
             en: "This is in final review by manager.",
           },
         },
         FinalReviewHr: {
           id: 6,
           key: JobStatus.FinalReviewHr,
           name: {
             en: "Final Review (HR)",
             fr: "Révision finale (RH)",
           },
           description: {
             fr: "This is in final review by HR (FR).",
             en: "This is in final review by HR.",
           },
         },
         PendingApproval: {
           id: 7,
           key: JobStatus.PendingApproval,
           name: {
             en: "Pending Approval",
             fr: "En attente d'approbation",
           },
           description: {
             fr: "This is in waiting for approval by HR (FR).",
             en: "This is in waiting for approval by HR.",
           },
         },
         Approved: {
           id: 8,
           key: JobStatus.Approved,
           name: {
             en: "Approved",
             fr: "Approuvé",
           },
           description: {
             fr:
               "This is has been approved by HR, awaiting final publishing by Talent Cloud (FR).",
             en:
               "This is has been approved by HR, awaiting final publishing by Talent Cloud.",
           },
         },
         Ready: {
           id: 9,
           key: JobStatus.Ready,
           name: {
             en: "Ready to Post",
             fr: "Prêt à poster",
           },
           description: {
             fr:
               "This job has is ready to go live as soon as the Open datetime arrives. (FR).",
             en:
               "This job has is ready to go live as soon as the Open datetime arrives.",
           },
         },
         Live: {
           id: 9,
           key: JobStatus.Live,
           name: {
             en: "Live",
             fr: "En ligne",
           },
           description: {
             fr:
               "This job has has gone live, and will accept applications between its open and closing dates. (FR).",
             en:
               "This job has has gone live, and will accept applications between its open and closing dates.",
           },
         },
         Assessment: {
           id: 9,
           key: JobStatus.Assessment,
           name: {
             en: "In Assessment",
             fr: "En cours d'évaluation",
           },
           description: {
             fr:
               "This job has been closed to more applications, and has begun the assessment process. (FR).",
             en:
               "This job has been closed to more applications, and has begun the assessment process.",
           },
         },
         Completed: {
           id: 10,
           key: JobStatus.Completed,
           name: {
             en: "Completed",
             fr: "Terminé",
           },
           description: {
             fr: "The process of this job poster has been completed (FR).",
             en: "The process of this job poster has been completed.",
           },
         },
       };

export const jobActions: JobCardProps[] = [
  {
    id: 1,
    activity: {
      count: 3,
      new: {
        url: "https://google.ca",
        text: "New Activity",
        title: "Click here to see new activity on this posting.",
      },
    },
    applicants: 5,
    classification: "CS01",
    draft: {
      url: "https://google.ca",
      text: "View Draft",
      title: "View this draft Job Poster.",
    },
    managerTime: 8,
    owned: true,
    preview: {
      url: "https://google.ca",
      text: "Preview Poster",
      title: "Preview what this Job Poster will look like.",
    },
    screeningPlan: {
      url: "https://google.ca",
      text: "View Screening Plan",
      title: "View the screening plan for this Job Poster.",
    },
    status: jobPosterStatuses.Draft,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Front-end Developer",
    userTime: 2,
  },
  {
    id: 2,
    activity: {
      count: 0,
      new: {
        url: "https://google.ca",
        text: "New Activity",
        title: "Click here to see new activity on this posting.",
      },
    },
    applicants: 12,
    classification: "BK01",
    draft: {
      url: "",
      text: "View Draft",
      title: "View this draft Job Poster.",
    },
    managerTime: 8,
    owned: false,
    preview: {
      url: "https://google.ca",
      text: "View Poster",
      title: "View the live Job Poster.",
    },
    screeningPlan: {
      url: "https://google.ca",
      text: "View Screening Plan",
      title: "View the screening plan for this Job Poster.",
    },
    status: jobPosterStatuses.Live,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Cupcake Baker",
    userTime: 2,
  },
  {
    id: 3,
    activity: {
      count: 0,
      new: {
        url: "https://google.ca",
        text: "New Activity",
        title: "Click here to see new activity on this posting.",
      },
    },
    applicants: 5,
    classification: "BS01",
    draft: {
      url: "",
      text: "View Draft",
      title: "View this draft Job Poster.",
    },
    managerTime: 8,
    owned: false,
    preview: {
      url: "https://google.ca",
      text: "View Poster",
      title: "View the published Job Poster.",
    },
    screeningPlan: {
      url: "https://google.ca",
      text: "View Screening Plan",
      title: "View the screening plan for this Job Poster.",
    },
    status: jobPosterStatuses.Completed,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Underwater Basket Weaver",
    userTime: 2,
  },
];

export const unclaimedJobs: UnclaimedJobCardProps[] = [
  {
    id: 4,
    jobLink: {
      text: "CS01 - Front-end Developer",
      url: "",
      title: "",
    },
    reviewRequested: new Date("1990-12-17T08:24:00Z"),
    status: jobPosterStatuses.Draft,
    hiringManager: "Rebecca Appleby",
    hrAdvisors: [],
    handleClaimJob: (): void => {},
  },
  {
    id: 5,
    jobLink: {
      text: "AS02 - Executive Assisstant",
      url: "",
      title: "",
    },
    reviewRequested: new Date("1995-01-17T10:54:00Z"),
    status: jobPosterStatuses.Draft,
    hiringManager: "Rebecca Appleby",
    hrAdvisors: ["Rebecca Appleby", "Jack Little"],
    handleClaimJob: (): void => {},
  },
  {
    id: 6,
    jobLink: {
      text: "ET03 - Business Analyst",
      url: "",
      title: "",
    },
    reviewRequested: new Date("2020-02-08T08:24:00Z"),
    status: jobPosterStatuses.ReviewHr,
    hiringManager: "Robin Browne",
    hrAdvisors: [],
    handleClaimJob: (): void => {},
  },
  {
    id: 7,
    jobLink: {
      text: "FG05 - Long-term Care Specialist",
      url: "",
      title: "",
    },
    reviewRequested: new Date("2020-02-10T09:24:00Z"),
    status: jobPosterStatuses.Draft,
    hiringManager: "Braeden McDoogal",
    hrAdvisors: ["Caitlyn Summers", "Jack Little"],
    handleClaimJob: (): void => {},
  },
  {
    id: 8,
    jobLink: {
      text: "CS03 - Digital Product Designer",
      url: "",
      title: "",
    },
    reviewRequested: new Date("2020-02-11T06:24:00Z"),
    status: jobPosterStatuses.ReviewHr,
    hiringManager: "Amelie Lachance",
    hrAdvisors: [],
    handleClaimJob: (): void => {},
  },
];

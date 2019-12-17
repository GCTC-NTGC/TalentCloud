import { JobStatus } from "../../models/lookupConstants";
import { JobCardProps } from "../JobCard";

export const jobActions: JobCardProps[] = [
  {
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
    status: JobStatus.Draft,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Front-end Developer",
    userTime: 2,
  },
  {
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
      url: null,
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
    status: JobStatus.Published,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Cupcake Baker",
    userTime: 2,
  },
  {
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
      url: null,
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
    status: JobStatus.Complete,
    summary: {
      url: "https://google.ca",
      text: "Visit Job Summary",
      title: "View the Job Summary for this Job Poster.",
    },
    title: "Underwater Basket Weaver",
    userTime: 2,
  },
];

export const unclaimedJobs = [
  {
    title: "CS01 - Front-end Developer",
    url: "",
    createdAt: "2019-MAY-02",
    status: JobStatus.Draft,
    hiringManagers: ["Rebecca Appleby"],
    hrAdvisors: [],
    claimJob: (): void => {},
  },
  {
    title: "AS02 - Executive Assisstant",
    url: "",
    createdAt: "2019-MAR-12",
    status: JobStatus.Draft,
    hiringManagers: ["Rebecca Appleby"],
    hrAdvisors: ["Rebecca Appleby", "Jack Little"],
    claimJob: (): void => {},
  },
  {
    title: "ET03 - Business Analyst",
    url: "",
    createdAt: "2019-DEC-02",
    status: JobStatus.Review,
    hiringManagers: ["Robin Browne"],
    hrAdvisors: [],
    claimJob: (): void => {},
  },
  {
    title: "FG05 - Long-term Care Specialist",
    url: "",
    createdAt: "2019-MAY-14",
    status: JobStatus.Draft,
    hiringManagers: ["Braeden McDoogal"],
    hrAdvisors: ["Caitlyn Summers", "Jack Little"],
    claimJob: (): void => {},
  },
  {
    title: "CS03 - Digital Product Designer",
    url: "",
    createdAt: "2019-JUL-24",
    status: JobStatus.Review,
    hiringManagers: ["Amelie Lachance"],
    hrAdvisors: [],
    claimJob: (): void => {},
  },
];

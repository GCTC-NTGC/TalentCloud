import { JobStatus } from "../../models/lookupConstants";
import { JobCardProps } from "../JobCard";
import { UnclaimedJobCardProps } from "../UnclaimedJobCard";

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
      title: "View the published Job Poster.",
    },
    screeningPlan: {
      url: "https://google.ca",
      text: "View Screening Plan",
      title: "View the screening plan for this Job Poster.",
    },
    status: JobStatus.Open,
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

export const unclaimedJobs: UnclaimedJobCardProps[] = [
  {
    id: 4,
    jobLink: {
      text: "CS01 - Front-end Developer",
      url: "",
      title: "",
    },
    reviewRequested: new Date("December 17, 1990 03:24:00"),
    status: JobStatus.Draft,
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
    reviewRequested: new Date("Jan 17, 1995 05:54:00"),
    status: JobStatus.Draft,
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
    reviewRequested: new Date("Feb 08, 2020 03:24:00"),
    status: JobStatus.Review,
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
    reviewRequested: new Date("Feb 10, 2020 04:24:00"),
    status: JobStatus.Draft,
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
    reviewRequested: new Date("Feb 11, 2020 01:24:00"),
    status: JobStatus.Review,
    hiringManager: "Amelie Lachance",
    hrAdvisors: [],
    handleClaimJob: (): void => {},
  },
];

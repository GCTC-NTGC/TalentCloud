/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import dayjs from "dayjs";
import {
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
  ExperienceAward,
  ExperiencePersonal,
  Experience,
} from "../models/types";

export const fakeExperienceWork = (): ExperienceWork => ({
  id: 1,
  title: "Applied Researched",
  organization: "ACME Labs.",
  group: "Research Division",
  is_active: false,
  start_date: dayjs("01/07/2015").toDate(),
  end_date: dayjs("12/13/2019").toDate(),
  experienceable_id: 1,
  experienceable_type: "applicant",
  is_education_requirement: false,
  type: "experience_work",
});

export const fakeExperienceEducation = (): ExperienceEducation => ({
  id: 1,
  education_type_id: 4,
  education_type: { en: "PhD", fr: "Doctorat" },
  area_of_study: "Engineering",
  institution: "University of Toronto",
  education_status_id: 1,
  education_status: {
    en: "Complete (credential awarded)",
    fr: "Terminé (titre de compétences décern)",
  },
  is_active: false,
  start_date: dayjs("09/01/2010").toDate(),
  end_date: dayjs("04/30/2015").toDate(),
  thesis_title: "How do concrete structures withstand hurricane wind stress?",
  has_blockcert: true,
  experienceable_id: 1,
  experienceable_type: "applicant",
  is_education_requirement: true,
  type: "experience_education",
});

export const fakeExperienceCommunity = (): ExperienceCommunity => ({
  id: 1,
  title: "Volunteer",
  group: "SPCA Ottawa",
  project: "Adoption Weekend",
  is_active: true,
  start_date: dayjs("04/01/2018").toDate(),
  end_date: null,
  experienceable_id: 1,
  experienceable_type: "applicant",
  is_education_requirement: false,
  type: "experience_community",
});

export const fakeExperienceAward = (): ExperienceAward => ({
  id: 1,
  title: "Governor General's Award (Gold)",
  award_recipient_type_id: 2,
  award_recipient_type: { en: "My Project", fr: "Mon projet" },
  issued_by: "McGill University",
  award_recognition_type_id: 1,
  award_recognition_type: { en: "International", fr: "Internationale" },
  awarded_date: dayjs("01/27/2016").toDate(),
  experienceable_id: 1,
  experienceable_type: "applicant",
  is_education_requirement: false,
  type: "experience_award",
});

export const fakeExperiencePersonal = (): ExperiencePersonal => ({
  id: 1,
  title: "Parenting",
  description:
    "Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate.",
  is_shareable: true,
  is_active: true,
  start_date: dayjs("04/01/2013").toDate(),
  end_date: null,
  experienceable_id: 1,
  experienceable_type: "applicant",
  is_education_requirement: false,
  type: "experience_personal",
});

const fakeExperiences = (): Experience[] => [
  fakeExperienceWork(),
  fakeExperienceEducation(),
  fakeExperienceCommunity(),
  fakeExperienceAward(),
  fakeExperiencePersonal(),
];

export default fakeExperiences;

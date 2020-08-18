/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import dayjs from "dayjs";
import { ExperienceSkill, Skill, Experience } from "../models/types";
import {
  fakeExperienceAward,
  fakeExperienceCommunity,
  fakeExperienceEducation,
  fakeExperiencePersonal,
  fakeExperienceWork,
} from "./fakeExperience";
import { fakeSkills } from "./fakeSkills";

export const fakeExperienceSkill1 = (): ExperienceSkill => ({
  skill_id: fakeSkills()[0].id,
  experience_id: fakeExperienceEducation().id,
  experience_type: "experience_education",
  justification: "This is a sample education justification.",
  created_at: dayjs("01/07/2015").toDate(),
  updated_at: dayjs("01/07/2016").toDate(),
});

export const fakeExperienceSkill2 = (): ExperienceSkill => ({
  skill_id: fakeSkills()[0].id,
  experience_id: fakeExperienceWork().id,
  experience_type: "experience_work",
  justification: "",
  created_at: dayjs("01/07/2015").toDate(),
  updated_at: dayjs("01/07/2016").toDate(),
});

export const fakeExperienceSkill3 = (): ExperienceSkill => ({
  skill_id: fakeSkills()[3].id,
  experience_id: fakeExperiencePersonal().id,
  experience_type: "experience_personal",
  justification: "",
  created_at: dayjs("01/07/2015").toDate(),
  updated_at: dayjs("01/07/2016").toDate(),
});

export const fakeExperienceSkill4 = (): ExperienceSkill => ({
  skill_id: fakeSkills()[3].id,
  experience_id: fakeExperienceCommunity().id,
  experience_type: "experience_community",
  justification: "",
  created_at: dayjs("01/07/2015").toDate(),
  updated_at: dayjs("01/07/2016").toDate(),
});

export const fakeExperienceSkill5 = (): ExperienceSkill => ({
  skill_id: fakeSkills()[2].id,
  experience_id: fakeExperienceAward().id,
  experience_type: "experience_award",
  justification: "",
  created_at: dayjs("01/07/2015").toDate(),
  updated_at: dayjs("01/07/2016").toDate(),
});

export const createFakeExperienceSkill = (
  experience: Experience,
  skill: Skill,
): ExperienceSkill => ({
  skill_id: skill.id,
  experience_id: experience.id,
  experience_type: experience.type,
  justification: "",
  created_at: dayjs().toDate(),
  updated_at: dayjs().toDate(),
});

export const fakeExperienceSkills = (): ExperienceSkill[] => [
  fakeExperienceSkill1(),
  fakeExperienceSkill2(),
  fakeExperienceSkill3(),
  fakeExperienceSkill4(),
  fakeExperienceSkill5(),
];

export default fakeExperienceSkills;

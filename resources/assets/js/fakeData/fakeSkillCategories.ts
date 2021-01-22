import { SkillCategory } from "../models/types";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
  fakeSkill5,
  fakeSkill6,
} from "./fakeSkills";

export const fakeSkillCategory = (
  overrides: Partial<SkillCategory> = {},
): SkillCategory => ({
  id: 1,
  key: "transferable",
  name: {
    en: "Transferable Skills",
    fr: "Compétences transférables",
  },
  description: {
    en: "Skills and aptitudes applicable to all type of occupations.",
    fr: "Compétences et aptitudes applicables à tout type de professions.",
  },
  parent_id: 0,
  lft: 0,
  rgt: 0,
  depth: 1,
  skills: [],
});

export const fakeSkillCategory2 = (
  overrides: Partial<SkillCategory> = {},
): SkillCategory => ({
  id: 2,
  key: "digitalTech",
  name: {
    en: "Digital and Technology Skills",
    fr: "Compétences numériques et technologiques",
  },
  description: {
    en: "On the job work skills and knowledge specific to the digital sector.",
    fr:
      "Sur le lieu de travail, les compétences et connaissances professionnelles spécifiques au secteur numérique.",
  },
  parent_id: 0,
  lft: 0,
  rgt: 0,
  depth: 1,
  skills: [],
});

export const fakeSkillCategory3 = (
  overrides: Partial<SkillCategory> = {},
): SkillCategory => ({
  id: 3,
  key: "workingInGov",
  name: {
    en: "Working in Government",
    fr: "Travailler au sein du gouvernement",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 1,
  lft: 0,
  rgt: 0,
  depth: 2,
  skills: [fakeSkill4()],
});

export const fakeSkillCategory4 = (
  overrides: Partial<SkillCategory> = {},
): SkillCategory => ({
  id: 5,
  key: "personal",
  name: {
    en: "Personal",
    fr: "Personnel",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 1,
  lft: 0,
  rgt: 0,
  depth: 2,
  skills: [fakeSkill4(), fakeSkill6()],
});

export const fakeSkillCategory5 = (
  overrides: Partial<SkillCategory> = {},
): SkillCategory => ({
  id: 6,
  key: "developer",
  name: {
    en: "Developer",
    fr: "Developer",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 2,
  lft: 0,
  rgt: 0,
  depth: 2,
  skills: [fakeSkill(), fakeSkill2(), fakeSkill3(), fakeSkill5()],
});

export const fakeSkillCategories = (): SkillCategory[] => [
  fakeSkillCategory(),
  fakeSkillCategory2(),
  fakeSkillCategory3(),
  fakeSkillCategory4(),
  fakeSkillCategory5(),
];

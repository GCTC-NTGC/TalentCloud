/* eslint-disable @typescript-eslint/camelcase */
import { Skill } from "../models/types";
import { SkillTypeId } from "../models/lookupConstants";

// Classifications used: CS, EX

export const fakeSkill = (): Skill => ({
  id: 1,
  skill_type_id: SkillTypeId.Hard,
  name: {
    en: "Front-end development",
    fr: "Développement frontal",
  },
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  is_future_skill: false,
  is_culture_skill: false,
  classifications: [{ key: "CS" }],
});

export const fakeSkill2 = (): Skill => ({
  id: 2,
  skill_type_id: SkillTypeId.Hard,
  name: {
    en: "Web Programming",
    fr: "Programmation Web",
  },
  description: {
    en:
      "Defined as: Developing web applications using Javascript and a server side language such as PHP, Python or other",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de JavaScript et un langage finaux comme PHP, Python ou autre",
  },
  is_future_skill: false,
  is_culture_skill: false,
  classifications: [{ key: "CS" }],
});

export const fakeSkill3 = (): Skill => ({
  id: 15,
  skill_type_id: SkillTypeId.Hard,
  name: {
    en: "Open Source Development",
    fr: "Développement de sources ouvertes",
  },
  description: {
    en:
      "Defined as: Developing applications using open source tools and languages.",
    fr:
      "Se définissant comme suit : Développement d'applications à l'aide d'outils et de langages à source ouverte.",
  },
  is_future_skill: true,
  is_culture_skill: false,
  classifications: [{ key: "CS" }, { key: "EX" }],
});

export const fakeSkill4 = (): Skill => ({
  id: 20,
  skill_type_id: SkillTypeId.Soft,
  name: {
    en: "Integrity",
    fr: "Intégrité",
  },
  description: {
    en:
      "Defined as: Treating all those in the work environment with fairness, courtesy and respect for differences; performing the job in a manner that upholds the public trust and values co-workers.",
    fr:
      "Se définissant comme suit : Capacité de traiter le personnel du milieu de travail avec équité, courtoisie et respect des différences et d'effectuer le travail de manière à maintenir la confiance du public et à respecter les valeurs de ses collègues.",
  },
  is_future_skill: false,
  is_culture_skill: true,
  classifications: [
    {
      key: "EX",
    },
  ],
});

export const fakeSkills = (): Skill[] => [
  fakeSkill(),
  fakeSkill2(),
  fakeSkill3(),
  fakeSkill4(),
];

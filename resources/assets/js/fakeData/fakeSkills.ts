/* eslint-disable @typescript-eslint/camelcase */
import { Skill } from "../models/types";
import { SkillTypeId } from "../models/lookupConstants";

// Classifications used: CS, EX

export const fakeSkill = (overrides: Partial<Skill> = {}): Skill => ({
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
  ...overrides,
});

export const fakeSkill2 = (overrides: Partial<Skill> = {}): Skill => ({
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
  ...overrides,
});

export const fakeSkill3 = (overrides: Partial<Skill> = {}): Skill => ({
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
  ...overrides,
});

export const fakeSkill4 = (overrides: Partial<Skill> = {}): Skill => ({
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
  ...overrides,
});

export const fakeSkill5 = (): Skill => ({
  id: 13,
  skill_type_id: SkillTypeId.Hard,
  name: { en: "HTML", fr: "HTML" },
  description: {
    en:
      "Defined as: A markup language to build the framework and essential blocks of a webpage.",
    fr:
      "Signifie Hyper-Text-Mark Up-Language, qui implique de travailler avec un langage de balisage pour construire le cadre et les blocs essentiels d'une page Web.",
  },
  is_future_skill: false,
  is_culture_skill: true,
  classifications: [
    {
      key: "CS",
    },
  ],
});

export const fakeSkill6 = (): Skill => ({
  id: 25,
  skill_type_id: SkillTypeId.Soft,
  name: { en: "Flexibility", fr: "Flexibilité" },
  description: {
    en:
      "Defined as: Being open to multiple perspectives when working interpersonally; demonstrating willingness to use a variety of approaches to advance initiatives and deliver work.",
    fr:
      "Se d'finit comme suit : tre ouvert de multiples points de vue lorsque vous travaillez de manire interpersonnelle; d'montrer une volont' d'avoir recours diverses approches pour faire avancer les initiatives et livrer son travail.",
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
  fakeSkill5(),
  fakeSkill6(),
];

export const fakeEssentialSkills = (): Skill[] => [fakeSkill(), fakeSkill2()];
export const fakeAssetSkills = (): Skill[] => [fakeSkill3(), fakeSkill4()];

export const fakeHardSkills = (): Skill[] =>
  fakeSkills().filter((skill) => skill.skill_type_id === SkillTypeId.Hard);
export const fakeSoftSkills = (): Skill[] =>
  fakeSkills().filter((skill) => skill.skill_type_id === SkillTypeId.Soft);

import { Skill } from "../models/types";
import { SkillTypeId } from "../models/lookupConstants";

export const fakeSkill = (): Skill => ({
  id: 1,
  skill_type_id: SkillTypeId.Hard,
  en: {
    name: "Front-end development",
    description:
      "Defined as: Developing web applications using HTML5, CSS3, Javascript",
  },
  fr: {
    name: "Dé9veloppement frontal",
    description:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
});

export const fakeSkill2 = (): Skill => ({
  id: 2,
  skill_type_id: SkillTypeId.Hard,
  en: {
    name: "Web Programming",
    description:
      "Defined as: Developing web applications using Javascript and a server side language such as PHP, Python or other",
  },
  fr: {
    name: "Programmation Web",
    description:
      "Se définissant comme suit : Développement d'applications Web à l'aide de JavaScript et un langage finaux comme PHP, Python ou autre",
  },
});

export const fakeSkill3 = (): Skill => ({
  id: 15,
  skill_type_id: SkillTypeId.Hard,
  en: {
    name: "Open Source Development",
    description:
      "Defined as: Developing applications using open source tools and languages.",
  },
  fr: {
    name: "Développement de sources ouvertes",
    description:
      "Se définissant comme suit : Développement d'applications à l'aide d'outils et de langages à source ouverte.",
  },
});

export const fakeSkill4 = (): Skill => ({
  id: 20,
  skill_type_id: SkillTypeId.Soft,
  en: {
    name: "Integrity",
    description:
      "Defined as: Treating all those in the work environment with fairness, courtesy and respect for differences; performing the job in a manner that upholds the public trust and values co-workers.",
  },
  fr: {
    name: "Intégrité",
    description:
      "Se définissant comme suit : Capacité de traiter le personnel du milieu de travail avec équité, courtoisie et respect des différences et d'effectuer le travail de manière à maintenir la confiance du public et à respecter les valeurs de ses collègues.",
  },
});

export const fakeSkills = (): Skill[] => [
  fakeSkill(),
  fakeSkill2(),
  fakeSkill3(),
  fakeSkill4(),
];

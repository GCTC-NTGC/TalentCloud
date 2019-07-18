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

export const fakeSkills = (): Skill[] => [fakeSkill(), fakeSkill2()];

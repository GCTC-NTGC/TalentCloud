/* eslint-disable @typescript-eslint/camelcase */
import { Criteria } from "../models/types";

export const fakeCriterion1 = (): Criteria => ({
  id: 1,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 1,
  skill_level_id: 3,
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriterion2 = (): Criteria => ({
  id: 2,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 2,
  skill_level_id: 3,
  description: {
    en:
      "Defined as: Developing web applications using Javascript and a server side language such as PHP, Python or other",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de JavaScript et un langage finaux comme PHP, Python ou autre.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriterion3 = (): Criteria => ({
  id: 3,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 15,
  skill_level_id: 3,
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriterion4 = (): Criteria => ({
  id: 4,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 13,
  skill_level_id: 3,
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriterion5 = (): Criteria => ({
  id: 5,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 20,
  skill_level_id: 3,
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriterion6 = (): Criteria => ({
  id: 6,
  criteria_type_id: 1,
  job_poster_id: 1,
  skill_id: 25,
  skill_level_id: 3,
  description: {
    en: "Defined as: Developing web applications using HTML5, CSS3, Javascript",
    fr:
      "Se définissant comme suit : Développement d'applications Web à l'aide de HTML5, CSS3 et JavaScript.",
  },
  specificity: {
    en: "",
    fr: "",
  },
});

export const fakeCriteria = (): Criteria[] => [
  fakeCriterion1(),
  fakeCriterion2(),
  fakeCriterion3(),
  fakeCriterion4(),
  fakeCriterion5(),
  fakeCriterion6(),
];

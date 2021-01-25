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
    en:
      "Defined as: Developing applications using open source tools and languages.",
    fr:
      "Se définissant comme suit : Développement d'applications à l'aide d'outils et de langages à source ouverte.",
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
    en:
      "Defined as: A markup language to build the framework and essential blocks of a webpage.",
    fr:
      "Signifie Hyper-Text-Mark Up-Language, qui implique de travailler avec un langage de balisage pour construire le cadre et les blocs essentiels d'une page Web.",
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
    en:
      "Defined as: Treating all those in the work environment with fairness, courtesy and respect for differences; performing the job in a manner that upholds the public trust and values co-workers.",
    fr:
      "Se définissant comme suit : Capacité de traiter le personnel du milieu de travail avec équité, courtoisie et respect des différences et d'effectuer le travail de manière à maintenir la confiance du public et à respecter les valeurs de ses collègues.",
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
    en:
      "Defined as: Being open to multiple perspectives when working interpersonally; demonstrating willingness to use a variety of approaches to advance initiatives and deliver work.",
    fr:
      "Se d'finit comme suit : tre ouvert de multiples points de vue lorsque vous travaillez de manire interpersonnelle; d'montrer une volont' d'avoir recours diverses approches pour faire avancer les initiatives et livrer son travail.",
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

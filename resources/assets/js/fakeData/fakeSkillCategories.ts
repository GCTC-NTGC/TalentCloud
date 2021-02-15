import { SkillCategory } from "../models/types";

export const fakeSkillCategoryParent1 = (): SkillCategory => ({
  id: 1,
  key: "transferable",
  name: {
    en: "Transferable",
    fr: "Transférable",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: null,
  lft: 2,
  rgt: 11,
  depth: 1,
});

export const fakeSkillCategoryParent2 = (): SkillCategory => ({
  id: 2,
  key: "digital",
  name: {
    en: "Digital and Technology",
    fr: "Numérique et technologie",
  },
  description: {
    en: "On the job work skills and knowledge specific to the digital sector.",
    fr:
      "Sur le lieu de travail, les compétences et connaissances professionnelles spécifiques au secteur numérique.",
  },
  parent_id: null,
  lft: 12,
  rgt: 21,
  depth: 1,
});

export const fakeSkillCategoryChild1 = (): SkillCategory => ({
  id: 3,
  key: "working-in-government",
  name: {
    en: "Working In Government",
    fr: "Travailler au gouvernement",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 1,
  lft: 3,
  rgt: 4,
  depth: 2,
});

export const fakeSkillCategoryChild2 = (): SkillCategory => ({
  id: 4,
  key: "cognitive",
  name: {
    en: "Cognitive",
    fr: "Cognitive",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 1,
  lft: 5,
  rgt: 6,
  depth: 2,
});

export const fakeSkillCategoryChild3 = (): SkillCategory => ({
  id: 5,
  key: "communication",
  name: {
    en: "Communication",
    fr: "Communication",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 1,
  lft: 7,
  rgt: 8,
  depth: 2,
});

export const fakeSkillCategoryChild4 = (): SkillCategory => ({
  id: 6,
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
  lft: 9,
  rgt: 10,
  depth: 2,
});

export const fakeSkillCategoryChild5 = (): SkillCategory => ({
  id: 7,
  key: "web",
  name: {
    en: "Web",
    fr: "Web",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 2,
  lft: 13,
  rgt: 14,
  depth: 2,
});

export const fakeSkillCategoryChild6 = (): SkillCategory => ({
  id: 8,
  key: "devops",
  name: {
    en: "DevOps",
    fr: "Devops",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 2,
  lft: 15,
  rgt: 16,
  depth: 2,
});

export const fakeSkillCategoryChild7 = (): SkillCategory => ({
  id: 9,
  key: "systems",
  name: {
    en: "Systems",
    fr: "Systèmes",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 2,
  lft: 17,
  rgt: 18,
  depth: 2,
});

export const fakeSkillCategoryChild8 = (): SkillCategory => ({
  id: 10,
  key: "analytics",
  name: {
    en: "Analytics",
    fr: "Analyse des données",
  },
  description: {
    en:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
    fr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eius! Laudantium maxime magnam temporibus perferendis.",
  },
  parent_id: 2,
  lft: 19,
  rgt: 20,
  depth: 2,
});

export const fakeSkillCategoriesParents = (): SkillCategory[] => [
  fakeSkillCategoryParent1(),
  fakeSkillCategoryParent2(),
];

export const fakeSkillCategories = (): SkillCategory[] => [
  fakeSkillCategoryParent1(),
  fakeSkillCategoryParent2(),
  fakeSkillCategoryChild1(),
  fakeSkillCategoryChild2(),
  fakeSkillCategoryChild3(),
  fakeSkillCategoryChild4(),
  fakeSkillCategoryChild5(),
  fakeSkillCategoryChild6(),
  fakeSkillCategoryChild7(),
  fakeSkillCategoryChild8(),
];

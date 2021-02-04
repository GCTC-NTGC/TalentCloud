import { SkillCategory } from "../models/types";

export const fakeSkillCategoryParent1 = (): SkillCategory => ({
  id: 1,
  key: "transferable",
  name: {
    en: "Transferable",
    fr: "Transférable",
  },
  parent_id: null,
  lft: 2,
  rgt: 11,
  depth: 1,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryParent2 = (): SkillCategory => ({
  id: 2,
  key: "digital",
  name: {
    en: "Digital and Technology",
    fr: "Numérique et technologie",
  },
  parent_id: null,
  lft: 12,
  rgt: 21,
  depth: 1,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild1 = (): SkillCategory => ({
  id: 3,
  key: "working-in-government",
  name: {
    en: "Working In Government",
    fr: "Travailler au gouvernement",
  },
  parent_id: 1,
  lft: 3,
  rgt: 4,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild2 = (): SkillCategory => ({
  id: 4,
  key: "cognitive",
  name: {
    en: "Cognitive",
    fr: "Cognitive",
  },
  parent_id: 1,
  lft: 5,
  rgt: 6,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild3 = (): SkillCategory => ({
  id: 5,
  key: "communication",
  name: {
    en: "Communication",
    fr: "Communication",
  },
  parent_id: 1,
  lft: 7,
  rgt: 8,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild4 = (): SkillCategory => ({
  id: 6,
  key: "personal",
  name: {
    en: "Personal",
    fr: "Personnel",
  },
  parent_id: 1,
  lft: 9,
  rgt: 10,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild5 = (): SkillCategory => ({
  id: 7,
  key: "web",
  name: {
    en: "Web",
    fr: "Web",
  },
  parent_id: 2,
  lft: 13,
  rgt: 14,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild6 = (): SkillCategory => ({
  id: 8,
  key: "devops",
  name: {
    en: "DevOps",
    fr: "Devops",
  },
  parent_id: 2,
  lft: 15,
  rgt: 16,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild7 = (): SkillCategory => ({
  id: 9,
  key: "systems",
  name: {
    en: "Systems",
    fr: "Systèmes",
  },
  parent_id: 2,
  lft: 17,
  rgt: 18,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
});

export const fakeSkillCategoryChild8 = (): SkillCategory => ({
  id: 10,
  key: "analytics",
  name: {
    en: "Analytics",
    fr: "Analyse des données",
  },
  parent_id: 2,
  lft: 19,
  rgt: 20,
  depth: 2,
  created_at: new Date(),
  updated_at: new Date(),
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

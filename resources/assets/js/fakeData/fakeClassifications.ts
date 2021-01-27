import { Classification } from "../models/types";

export const fakeClassification1 = (): Classification => ({
  id: 5,
  key: "CS",
  name: {
    en: "CS - Computer Services",
    fr: "",
  },
  education_requirements: {
    en: "",
    fr: "",
  },
});

export const fakeClassification2 = (): Classification => ({
  id: 7,
  key: "EX",
  name: {
    en: "Executive",
    fr: "",
  },
  education_requirements: {
    en: "",
    fr: "",
  },
});

export const fakeClassification3 = (): Classification => ({
  id: 9,
  key: "IS",
  name: {
    en: "IS - Information Services",
    fr: "",
  },
  education_requirements: {
    en: "",
    fr: "",
  },
});

export const fakeClassification4 = (): Classification => ({
  id: 10,
  key: "PC",
  name: {
    en: "PC - Physical Sciences",
    fr: "",
  },
  education_requirements: {
    en: "",
    fr: "",
  },
});

export const fakeClassifications = (): Classification[] => [
  fakeClassification1(),
  fakeClassification2(),
  fakeClassification3(),
  fakeClassification4(),
];

export default fakeClassifications;

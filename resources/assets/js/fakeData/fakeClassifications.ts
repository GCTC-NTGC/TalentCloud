import { Classification } from "../models/types";

export const fakeClassification1 = (): Classification => ({
  id: 5,
  key: "CS",
  name: {
    en: "CS - Computer Services",
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
  });

  export const fakeClassifications = (): Classification[] => [fakeClassification1(), fakeClassification2()];

  export default fakeClassifications;

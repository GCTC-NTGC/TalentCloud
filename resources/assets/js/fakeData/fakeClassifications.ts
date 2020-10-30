import { Classification } from "../models/types";

export const fakeClassification1 = (): Classification => ({
  id: 5,
  key: "CS",
  defaultMessage: "This is a fake default message",
  description: "This is a fake description",
});

export const fakeClassification2 = (): Classification => ({
    id: 7,
    key: "EX",
    defaultMessage: "This is a fake default message",
    description: "This is a fake description",
  });

  export const fakeClassifications = (): Classification[] => [fakeClassification1(), fakeClassification2()];

  export default fakeClassifications;

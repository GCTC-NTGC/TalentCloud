/* eslint-disable @typescript-eslint/camelcase */
import {
  ProfileBasicInformation,
  GocClassification,
  VeteranStatus,
  CitizenshipDeclaration,
} from "../models/types";

const fakePreviousGcClassifications = (): GocClassification[] => [
  {
    classification: {
      id: 5,
      key: "CS",
      name: {
        en: "",
        fr: "",
      },
    },
    level: 1,
    order: 0,
  },
  {
    classification: {
      id: 1,
      key: "AS",
      name: {
        en: "",
        fr: "",
      },
    },
    level: 1,
    order: 0,
  },
];

const fakeCurrentGcClassifications = (): GocClassification => ({
  classification: {
    id: 5,
    key: "CS",
    name: {
      en: "",
      fr: "",
    },
  },
  level: 2,
  order: 0,
});

const fakeVereranStatus = (): VeteranStatus => ({
  id: 1,
  name: "none",
});

const fakeCitizenshipDeclaration = (): CitizenshipDeclaration => ({
  id: 1,
  name: "citizen",
});

const profileBasicInformation: ProfileBasicInformation = <
  ProfileBasicInformation
>{};
profileBasicInformation.citizenship_status = fakeCitizenshipDeclaration();
profileBasicInformation.veteran_status = fakeVereranStatus();
profileBasicInformation.current_gc_employee = true;
profileBasicInformation.current_classification = fakeCurrentGcClassifications();
profileBasicInformation.previous_classifications = fakePreviousGcClassifications();

export const fakeBasicInformation = (): ProfileBasicInformation =>
  profileBasicInformation;

export default fakeBasicInformation;

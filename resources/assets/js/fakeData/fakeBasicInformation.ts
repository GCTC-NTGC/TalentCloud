/* eslint-disable @typescript-eslint/camelcase */
import {
  ProfileBasicInformation,
  GocClassification,
  VeteranStatus,
  CitizenshipDeclaration
} from "../models/types";

export const fakePreviousGcClassifications = (
): GocClassification[] => (
  [
    {
      classification : {"key": "CS"},
      level : 1,
      order : 0,
    },
    {
      classification : {"key": "AS"},
      level : 1,
      order : 0,
    }
  ]
);

export const fakeCurrentGcClassifications = (
  ): GocClassification => (
      {
        classification : {"key": "CS"},
        level : 2,
        order : 0,
      }
  );

export const fakeVereranStatus = (
  ): VeteranStatus => ({
    id: 1,
    name: "none",
  });

export const fakeCitizenshipDeclaration = (
  ): CitizenshipDeclaration => ({
    id: 1,
    name: "citizen",
  });

export const fakeBasicInformation = (): ProfileBasicInformation => {
  let profileBasicInformation : ProfileBasicInformation = <ProfileBasicInformation>{};

  profileBasicInformation.citizenship_status = fakeCitizenshipDeclaration()
  profileBasicInformation.veteran_status = fakeVereranStatus()
  profileBasicInformation.current_gc_employee = true
  profileBasicInformation.previous_classifications = fakePreviousGcClassifications()
  profileBasicInformation.current_classification = fakeCurrentGcClassifications()

  return profileBasicInformation
};

export default fakeBasicInformation;

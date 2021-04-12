import { ApplicantClassification } from "../models/types";
import fakeClassifications, {
  fakeClassification1,
  fakeClassification2,
  fakeClassification3,
  fakeClassification4,
} from "./fakeClassifications";

export const fakeApplicantClassification1 = (): ApplicantClassification => ({
  id: 1,
  applicant_id: 1,
  classification_id: fakeClassification1().id,
  level: 3,
  order: 0,
});
export const fakeApplicantClassification2 = (): ApplicantClassification => ({
  id: 1,
  applicant_id: 1,
  classification_id: fakeClassification2().id,
  level: 5,
  order: 1,
});
export const fakeApplicantClassification3 = (): ApplicantClassification => ({
  id: 1,
  applicant_id: 1,
  classification_id: fakeClassification3().id,
  level: 1,
  order: 2,
});
export const fakeApplicantClassification4 = (): ApplicantClassification => ({
  id: 1,
  applicant_id: 1,
  classification_id: fakeClassification4().id,
  level: 2,
  order: 3,
});

export const fakeApplicantClassifications = (): ApplicantClassification[] => [
  fakeApplicantClassification1(),
  fakeApplicantClassification2(),
  fakeApplicantClassification3(),
  fakeApplicantClassification4(),
];

export default fakeClassifications;

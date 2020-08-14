import {
  AsyncFsaActions,
  RSAActionTemplate,
  asyncGet,
  asyncPut,
  asyncPost,
  asyncDelete,
} from "../asyncAction";
import {
  Experience,
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
  ExperiencePersonal,
  ExperienceAward,
} from "../../models/types";
import {
  ExperienceResponse,
  parseExperience,
  getApplicantExperienceEndpoint,
  getApplicationExperienceEndpoint,
  parseSingleExperience,
  getExperienceEndpoint,
} from "../../api/experience";

export const FETCH_EXPERIENCE_BY_APPLICANT_STARTED =
  "EXPERIENCE: GET BY APPLICANT STARTED";
export const FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED =
  "EXPERIENCE: GET BY APPLICANT SUCCEEDED";
export const FETCH_EXPERIENCE_BY_APPLICANT_FAILED =
  "EXPERIENCE: GET BY APPLICANT FAILED";

export type FetchExperienceByApplicantAction = AsyncFsaActions<
  typeof FETCH_EXPERIENCE_BY_APPLICANT_STARTED,
  typeof FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
  typeof FETCH_EXPERIENCE_BY_APPLICANT_FAILED,
  ExperienceResponse[],
  { applicantId: number }
>;

export const fetchExperienceByApplicant = (
  applicantId: number,
): RSAActionTemplate<
  typeof FETCH_EXPERIENCE_BY_APPLICANT_STARTED,
  typeof FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
  typeof FETCH_EXPERIENCE_BY_APPLICANT_FAILED,
  ExperienceResponse[],
  { applicantId: number }
> =>
  asyncGet(
    getApplicantExperienceEndpoint(applicantId),
    FETCH_EXPERIENCE_BY_APPLICANT_STARTED,
    FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
    FETCH_EXPERIENCE_BY_APPLICANT_FAILED,
    parseExperience,
    { applicantId },
  );

export const FETCH_EXPERIENCE_BY_APPLICATION_STARTED =
  "EXPERIENCE: GET BY APPLICATION STARTED";
export const FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED =
  "EXPERIENCE: GET BY APPLICATION SUCCEEDED";
export const FETCH_EXPERIENCE_BY_APPLICATION_FAILED =
  "EXPERIENCE: GET BY APPLICATION FAILED";

export type FetchExperienceByApplicationAction = AsyncFsaActions<
  typeof FETCH_EXPERIENCE_BY_APPLICATION_STARTED,
  typeof FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
  typeof FETCH_EXPERIENCE_BY_APPLICATION_FAILED,
  ExperienceResponse[],
  { applicationId: number }
>;

export const fetchExperienceByApplication = (
  applicationId: number,
): RSAActionTemplate<
  typeof FETCH_EXPERIENCE_BY_APPLICATION_STARTED,
  typeof FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
  typeof FETCH_EXPERIENCE_BY_APPLICATION_FAILED,
  ExperienceResponse[],
  { applicationId: number }
> =>
  asyncGet(
    getApplicationExperienceEndpoint(applicationId),
    FETCH_EXPERIENCE_BY_APPLICATION_STARTED,
    FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
    FETCH_EXPERIENCE_BY_APPLICATION_FAILED,
    parseExperience,
    { applicationId },
  );

export const CREATE_EXPERIENCE_STARTED = "EXPERIENCE: CREATE STARTED";
export const CREATE_EXPERIENCE_SUCCEEDED = "EXPERIENCE: CREATE SUCCEEDED";
export const CREATE_EXPERIENCE_FAILED = "EXPERIENCE: CREATE FAILED";

export type CreateExperienceAction = AsyncFsaActions<
  typeof CREATE_EXPERIENCE_STARTED,
  typeof CREATE_EXPERIENCE_SUCCEEDED,
  typeof CREATE_EXPERIENCE_FAILED,
  ExperienceResponse,
  { type: Experience["type"] }
>;

export const createExperience = (
  experience: Experience,
): RSAActionTemplate<
  typeof CREATE_EXPERIENCE_STARTED,
  typeof CREATE_EXPERIENCE_SUCCEEDED,
  typeof CREATE_EXPERIENCE_FAILED,
  ExperienceResponse,
  { type: Experience["type"] }
> =>
  asyncPost(
    getExperienceEndpoint(null, experience.type),
    experience,
    CREATE_EXPERIENCE_STARTED,
    CREATE_EXPERIENCE_SUCCEEDED,
    CREATE_EXPERIENCE_FAILED,
    parseSingleExperience,
    { type: experience.type },
  );

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const createWorkExperience = (experience: ExperienceWork) =>
  createExperience(experience);
export const createEducationExperience = (experience: ExperienceEducation) =>
  createExperience(experience);
export const createCommunityExperience = (experience: ExperienceCommunity) =>
  createExperience(experience);
export const createAwardExperience = (experience: ExperienceAward) =>
  createExperience(experience);
export const createPersonalExperience = (experience: ExperiencePersonal) =>
  createExperience(experience);
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export const UPDATE_EXPERIENCE_STARTED = "EXPERIENCE: UPDATE STARTED";
export const UPDATE_EXPERIENCE_SUCCEEDED = "EXPERIENCE: UPDATE SUCCEEDED";
export const UPDATE_EXPERIENCE_FAILED = "EXPERIENCE: UPDATE FAILED";

export type UpdateExperienceAction = AsyncFsaActions<
  typeof UPDATE_EXPERIENCE_STARTED,
  typeof UPDATE_EXPERIENCE_SUCCEEDED,
  typeof UPDATE_EXPERIENCE_FAILED,
  ExperienceResponse,
  { id: number; type: Experience["type"] }
>;

export const updateExperience = (
  experience: Experience,
): RSAActionTemplate<
  typeof UPDATE_EXPERIENCE_STARTED,
  typeof UPDATE_EXPERIENCE_SUCCEEDED,
  typeof UPDATE_EXPERIENCE_FAILED,
  ExperienceResponse,
  { id: number; type: Experience["type"] }
> =>
  asyncPut(
    getExperienceEndpoint(experience.id, experience.type),
    experience,
    UPDATE_EXPERIENCE_STARTED,
    UPDATE_EXPERIENCE_SUCCEEDED,
    UPDATE_EXPERIENCE_FAILED,
    parseSingleExperience,
    { id: experience.id, type: experience.type },
  );

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const updateWorkExperience = (experience: ExperienceWork) =>
  updateExperience(experience);
export const updateEducationExperience = (experience: ExperienceEducation) =>
  updateExperience(experience);
export const updateCommunityExperience = (experience: ExperienceCommunity) =>
  updateExperience(experience);
export const updateAwardExperience = (experience: ExperienceAward) =>
  updateExperience(experience);
export const updatePersonalExperience = (experience: ExperiencePersonal) =>
  updateExperience(experience);
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export const DELETE_EXPERIENCE_STARTED = "EXPERIENCE: DELETE STARTED";
export const DELETE_EXPERIENCE_SUCCEEDED = "EXPERIENCE: DELETE SUCCEEDED";
export const DELETE_EXPERIENCE_FAILED = "EXPERIENCE: DELETE FAILED";

export type DeleteExperienceAction = AsyncFsaActions<
  typeof DELETE_EXPERIENCE_STARTED,
  typeof DELETE_EXPERIENCE_SUCCEEDED,
  typeof DELETE_EXPERIENCE_FAILED,
  {},
  { id: number; type: Experience["type"] }
>;

export const deleteExperience = (
  id: number,
  type: Experience["type"],
): RSAActionTemplate<
  typeof DELETE_EXPERIENCE_STARTED,
  typeof DELETE_EXPERIENCE_SUCCEEDED,
  typeof DELETE_EXPERIENCE_FAILED,
  {},
  { id: number; type: Experience["type"] }
> =>
  asyncDelete(
    getExperienceEndpoint(id, type),
    DELETE_EXPERIENCE_STARTED,
    DELETE_EXPERIENCE_SUCCEEDED,
    DELETE_EXPERIENCE_FAILED,
    () => ({}),
    { id, type },
  );

export type ExperienceAction =
  | FetchExperienceByApplicantAction
  | FetchExperienceByApplicationAction
  | CreateExperienceAction
  | UpdateExperienceAction
  | DeleteExperienceAction;

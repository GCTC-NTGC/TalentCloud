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
  ExperienceSkill,
} from "../../models/types";
import {
  ExperienceResponse,
  parseExperience,
  getApplicantExperienceEndpoint,
  getApplicationExperienceEndpoint,
  parseSingleExperience,
  getExperienceEndpoint,
  getExperienceSkillEndpoint,
  parseExperienceSkill,
  getCreateExperienceEndpoint,
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
  applicantId: number,
): RSAActionTemplate<
  typeof CREATE_EXPERIENCE_STARTED,
  typeof CREATE_EXPERIENCE_SUCCEEDED,
  typeof CREATE_EXPERIENCE_FAILED,
  ExperienceResponse,
  { type: Experience["type"] }
> =>
  asyncPost(
    getCreateExperienceEndpoint(applicantId, experience.type),
    experience,
    CREATE_EXPERIENCE_STARTED,
    CREATE_EXPERIENCE_SUCCEEDED,
    CREATE_EXPERIENCE_FAILED,
    parseSingleExperience,
    { type: experience.type },
  );

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

export const CREATE_EXPERIENCE_SKILL_STARTED =
  "EXPERIENCE SKILL: CREATE STARTED";
export const CREATE_EXPERIENCE_SKILL_SUCCEEDED =
  "EXPERIENCE SKILL: CREATE SUCCEEDED";
export const CREATE_EXPERIENCE_SKILL_FAILED = "EXPERIENCE SKILL: CREATE FAILED";

export type CreateExperienceSkillAction = AsyncFsaActions<
  typeof CREATE_EXPERIENCE_SKILL_STARTED,
  typeof CREATE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof CREATE_EXPERIENCE_SKILL_FAILED,
  ExperienceSkill,
  {}
>;

export const createExperienceSkill = (
  experienceSkill: ExperienceSkill,
): RSAActionTemplate<
  typeof CREATE_EXPERIENCE_SKILL_STARTED,
  typeof CREATE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof CREATE_EXPERIENCE_SKILL_FAILED,
  ExperienceSkill,
  {}
> =>
  asyncPost(
    getExperienceSkillEndpoint(),
    experienceSkill,
    CREATE_EXPERIENCE_SKILL_STARTED,
    CREATE_EXPERIENCE_SKILL_SUCCEEDED,
    CREATE_EXPERIENCE_SKILL_FAILED,
    parseExperienceSkill,
    {},
  );

export const UPDATE_EXPERIENCE_SKILL_STARTED =
  "EXPERIENCE SKILL: UPDATE STARTED";
export const UPDATE_EXPERIENCE_SKILL_SUCCEEDED =
  "EXPERIENCE SKILL: UPDATE SUCCEEDED";
export const UPDATE_EXPERIENCE_SKILL_FAILED = "EXPERIENCE SKILL: UPDATE FAILED";

export type UpdateExperienceSkillAction = AsyncFsaActions<
  typeof UPDATE_EXPERIENCE_SKILL_STARTED,
  typeof UPDATE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof UPDATE_EXPERIENCE_SKILL_FAILED,
  ExperienceSkill,
  { id: number }
>;

export const updateExperienceSkill = (
  experienceSkill: ExperienceSkill,
): RSAActionTemplate<
  typeof UPDATE_EXPERIENCE_SKILL_STARTED,
  typeof UPDATE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof UPDATE_EXPERIENCE_SKILL_FAILED,
  ExperienceSkill,
  { id: number }
> =>
  asyncPut(
    getExperienceSkillEndpoint(experienceSkill.id),
    experienceSkill,
    UPDATE_EXPERIENCE_SKILL_STARTED,
    UPDATE_EXPERIENCE_SKILL_SUCCEEDED,
    UPDATE_EXPERIENCE_SKILL_FAILED,
    parseExperienceSkill,
    { id: experienceSkill.id },
  );

export const DELETE_EXPERIENCE_SKILL_STARTED =
  "EXPERIENCE SKILL: DELETE STARTED";
export const DELETE_EXPERIENCE_SKILL_SUCCEEDED =
  "EXPERIENCE SKILL: DELETE SUCCEEDED";
export const DELETE_EXPERIENCE_SKILL_FAILED = "EXPERIENCE SKILL: DELETE FAILED";

export type DeleteExperienceSkillAction = AsyncFsaActions<
  typeof DELETE_EXPERIENCE_SKILL_STARTED,
  typeof DELETE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof DELETE_EXPERIENCE_SKILL_FAILED,
  {},
  {
    id: number;
    experienceId: number;
    experienceType: ExperienceSkill["experience_type"];
  }
>;

export const deleteExperienceSkill = (
  id: number,
  experienceId: number,
  experienceType: ExperienceSkill["experience_type"],
): RSAActionTemplate<
  typeof DELETE_EXPERIENCE_SKILL_STARTED,
  typeof DELETE_EXPERIENCE_SKILL_SUCCEEDED,
  typeof DELETE_EXPERIENCE_SKILL_FAILED,
  {},
  {
    id: number;
    experienceId: number;
    experienceType: ExperienceSkill["experience_type"];
  }
> =>
  asyncDelete(
    getExperienceSkillEndpoint(id),
    DELETE_EXPERIENCE_SKILL_STARTED,
    DELETE_EXPERIENCE_SKILL_SUCCEEDED,
    DELETE_EXPERIENCE_SKILL_FAILED,
    () => ({}),
    { id, experienceId, experienceType },
  );

export type ExperienceAction =
  | FetchExperienceByApplicantAction
  | FetchExperienceByApplicationAction
  | CreateExperienceAction
  | UpdateExperienceAction
  | DeleteExperienceAction
  | CreateExperienceSkillAction
  | UpdateExperienceSkillAction
  | DeleteExperienceSkillAction;

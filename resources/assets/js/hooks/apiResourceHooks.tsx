/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useContext } from "react";
import { getApplicantSkillsEndpoint } from "../api/applicantSkills";
import {
  getApplicantExperienceEndpoint,
  getApplicantExperienceSkillsEndpoint,
  getCreateExperienceEndpoint,
  getExperienceEndpoint,
  getExperienceSkillEndpoint,
  parseSingleExperience,
} from "../api/experience";
import { getSkillCategoriesEndpoint, getSkillsEndpoint } from "../api/skill";
import {
  Experience,
  ExperienceSkill,
  Skill,
  SkillCategory,
} from "../models/types";
import { useResource, useResourceIndex } from "./webResourceHooks";
import { ErrorContext } from "../components/ErrorContainer";
import { FetchError } from "../helpers/httpRequests";

export const useSkills = () => {
  // The skills endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<Skill[]>(getSkillsEndpoint(), []);
  return resource;
};

export const useSkillCategories = () => {
  // The SkillCategories endpoint doesn't allow updates, so don't return that function.
  const { update, ...resource } = useResource<SkillCategory[]>(
    getSkillCategoriesEndpoint(),
    [],
  );
  return resource;
};

/**
 * If the error is a FetchError and the response body contains a message field, use that to construct the message.
 * Otherwise, simply use the error object's message.
 * @param error
 */
const errorToMessage = async (error: Error | FetchError): Promise<string> => {
  if (error instanceof FetchError && error.response.status) {
    try {
      const responseBody = await error.response.json();
      if (responseBody.message) {
        return `${error.response.status} - ${responseBody.message}`;
      }
    } catch (e) {
      // Can't parse response json body; fall through and return normal error message.
    }
  }
  return error.message;
};

/**
 * This hook returns a handleError function which tries to push the error into the ErrorContext queue.
 * If no ErrorContext Provider exists in the component hierarchy, simply nothing will happen.
 */
const useErrorHandler = () => {
  const { dispatch } = useContext(ErrorContext);
  const handleError = (error: Error | FetchError): void => {
    errorToMessage(error).then((message) =>
      dispatch({
        type: "push",
        payload: message,
      }),
    );
  };
  return handleError;
};

export const useApplicantSkillIds = (applicantId: number) => {
  const handleError = useErrorHandler();
  return useResource<{ skill_ids: number[] }>(
    getApplicantSkillsEndpoint(applicantId),
    {
      skill_ids: [],
    },
    {
      handleError,
    },
  );
};

export const useApplicantExperience = (applicantId: number) => {
  const handleError = useErrorHandler();
  return useResourceIndex<Experience>(
    getApplicantExperienceEndpoint(applicantId),
    {
      parseEntityResponse: (response) =>
        parseSingleExperience(response).experience,
      resolveEntityEndpoint: (_, entity) =>
        getExperienceEndpoint(entity.id, entity.type),
      resolveCreateEndpoint: (_, entity) =>
        getCreateExperienceEndpoint(applicantId, entity.type),
      // Need a custom keyFn because different types of experience may have same id,
      // meaning default keyFn (getId) may cause collisions in the map of items and they may overwriting each other.
      keyFn: (experience) => `${experience.type}-${experience.id}`,
      handleError,
    },
  );
};

export const useApplicantExperienceSkills = (applicantId: number) => {
  const handleError = useErrorHandler();
  return useResourceIndex<ExperienceSkill>(
    getApplicantExperienceSkillsEndpoint(applicantId),
    {
      resolveEntityEndpoint: (_, entity) =>
        getExperienceSkillEndpoint(entity.id),
      resolveCreateEndpoint: (_, entity) => getExperienceSkillEndpoint(null),
      handleError,
    },
  );
};

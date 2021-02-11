/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { useContext } from "react";
import { getApplicantSkillsEndpoint } from "../api/applicantSkills";
import { ErrorContext } from "../components/ErrorContainer";
import { FetchError } from "../helpers/httpRequests";
import { useResource } from "./webResourceHooks";

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
  const handleError = (error: Error | FetchError) => {
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

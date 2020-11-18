import { useState } from "react";
import { deleteRequest, getRequest, putRequest } from "../helpers/httpRequests";

type Json = any;

interface RequestError {
  error: Error;
  type: "RequestError";
}

interface ApiError {
  error: Error;
  response: Response;
  type: "ApiError";
}

interface ParseError {
  error: Error;
  response: Response;
  type: "ParseError";
}

type HttpError = RequestError | ApiError | ParseError;

type ResourceStatus = "updating" | "success" | "error" | "deleted";

async function handleResponse<T>(
  responsePromise: Promise<Response>,
  parseResponse: (json: Json) => T,
  handleError: (e: HttpError) => void,
): Promise<T> {
  let response: Response;
  try {
    response = await responsePromise;
  } catch (error) {
    handleError({ error, type: "RequestError" });
    throw error;
  }

  if (!response.ok) {
    const error = new Error(response.statusText);
    handleError({
      error,
      response,
      type: "ApiError",
    });
    throw error;
  }

  let newValue: T;
  try {
    const json: Json = response.json();
    newValue = parseResponse(json);
  } catch (error) {
    handleError({
      error,
      response,
      type: "ParseError",
    });
    throw error;
  }
  return newValue;
}

async function handleResponseWithoutData(
  request: Promise<Response>,
  handleError: (e: HttpError) => void,
): Promise<void> {
  let response: Response;
  try {
    response = await request;
  } catch (error) {
    handleError({ error, type: "RequestError" });
    throw error;
  }

  if (!response.ok) {
    const error = new Error(response.statusText);
    handleError({
      error,
      response,
      type: "ApiError",
    });
    throw error;
  }
}

export function useResource<T>(
  endpoint: string,
  parseResponse: (response: Json) => T,
  initialValue: T,
  handleError: (e: HttpError) => void,
): {
  value: T;
  status: ResourceStatus;
  update: (newValue: T) => Promise<T>;
  deleteResource: () => Promise<void>;
  refresh: () => Promise<T>;
} {
  const [{ value, status }, setState] = useState<{
    value: T;
    status: ResourceStatus;
  }>({
    value: initialValue,
    status: "success",
  });
  function internalHandleError(e: HttpError): void {
    setState({ value, status: "error" });
    handleError(e);
  }

  async function refresh(): Promise<T> {
    setState({
      value,
      status: "updating",
    });
    const request = getRequest(endpoint);
    const responseValue = await handleResponse(
      request,
      parseResponse,
      internalHandleError,
    );
    setState({
      value: responseValue,
      status: "success",
    });
    return responseValue;
  }

  async function update(newValue: T): Promise<T> {
    setState({
      value,
      status: "updating",
    });
    const request = putRequest(endpoint, newValue);
    const responseValue = await handleResponse(
      request,
      parseResponse,
      internalHandleError,
    );
    setState({
      value: responseValue,
      status: "success",
    });
    return responseValue;
  }

  async function deleteResource(): Promise<void> {
    setState({
      value,
      status: "updating",
    });
    const request = deleteRequest(endpoint);
    await handleResponseWithoutData(request, internalHandleError);
    setState({
      value,
      status: "deleted",
    });
  }

  refresh();

  return { value, status, update, refresh, deleteResource };
}

export default {
  useResource,
};

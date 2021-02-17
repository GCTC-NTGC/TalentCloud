import dayjs from "dayjs";
import { Json } from "../hooks/webResourceHooks/types";

type HttpVerb = "GET" | "POST" | "PUT" | "DELETE";

const csrfElement = document.head.querySelector('meta[name="csrf-token"]');
const csrfToken: string =
  csrfElement && csrfElement.getAttribute("content")
    ? (csrfElement.getAttribute("content") as string)
    : "";

function jsonDateReplacer(key, value): string | any {
  if (this[key] instanceof Date) {
    return dayjs(value).format("YYYY-MM-DDTHH:mm:ssZ");
  }
  return value;
}

export function fetchParameters(method: HttpVerb, body?: any): RequestInit {
  const basicHeaders = {
    "X-CSRF-TOKEN": csrfToken,
    Accept: "application/json",
  };
  const jsonBodyHeader = { "Content-Type": "application/json" }; // informs server that the body is a json encoded string
  const headers =
    body === undefined ? basicHeaders : { ...basicHeaders, ...jsonBodyHeader };
  // We must stringify any object bodies, and ensure dates are formatted as server expects.
  const stringBody =
    body instanceof Object ? JSON.stringify(body, jsonDateReplacer) : body;
  return {
    method,
    headers,
    credentials: "same-origin", // NOTE: This may change if we move to token auth.
    ...(stringBody && { body: stringBody }),
  };
}

function defaultFetch(
  endpoint: string,
  method: HttpVerb,
  body?: object,
): Promise<Response> {
  return fetch(endpoint, fetchParameters(method, body));
}

export function getRequest(endpoint: string): Promise<Response> {
  return defaultFetch(endpoint, "GET");
}

export function postRequest(endpoint: string, body: object): Promise<Response> {
  return defaultFetch(endpoint, "POST", body);
}

export function putRequest(endpoint: string, body: object): Promise<Response> {
  return defaultFetch(endpoint, "PUT", body);
}

export function deleteRequest(endpoint: string): Promise<Response> {
  return defaultFetch(endpoint, "DELETE");
}

export class FetchError extends Error {
  constructor(public response: Response) {
    super(`${response.status} ${response.statusText}`);
    /* istanbul ignore next */
    if (Object.setPrototypeOf) {
      // Not available in IE 10, but can be polyfilled
      Object.setPrototypeOf(this, FetchError.prototype);
    }
  }
}
export async function processJsonResponse(response: Response): Promise<Json> {
  if (!response.ok) {
    throw new FetchError(response);
  }
  return response.json();
}

import dayjs from "dayjs";

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

function defaultFetch(
  endpoint: string,
  method: HttpVerb,
  body: any,
): Promise<Response> {
  const basicHeaders = {
    "X-CSRF-TOKEN": csrfToken,
    Accept: "application/json",
  };
  const jsonBodyHeader = { "Content-Type": "application/json" }; // informs server that the body is a json encoded string
  const headers =
    body === null ? basicHeaders : { ...basicHeaders, ...jsonBodyHeader };

  // We must stringify any object bodies, and ensure dates are formatted as server expects.
  const stringBody =
    body instanceof Object ? JSON.stringify(body, jsonDateReplacer) : body;

  return fetch(endpoint, {
    method,
    credentials: "same-origin", // NOTE: This may change if we move to token auth.
    headers,
    ...(stringBody && { body: stringBody }),
  });
}

export function getRequest(endpoint: string): Promise<Response> {
  return defaultFetch(endpoint, "GET", null);
}

export function postRequest(endpoint: string, body: any): Promise<Response> {
  return defaultFetch(endpoint, "POST", body);
}

export function putRequest(endpoint: string, body: any): Promise<Response> {
  return defaultFetch(endpoint, "PUT", body);
}

export function deleteRequest(endpoint: string): Promise<Response> {
  return defaultFetch(endpoint, "DELETE", null);
}

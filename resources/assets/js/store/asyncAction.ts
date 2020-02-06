import {
  RSAA,
  RSAAction,
  HTTPVerb,
  RequestError,
  ApiError,
  InternalError,
  getJSON,
} from "redux-api-middleware"; // RSAA = '@@redux-api-middleware/RSAA'
import dayjs from "dayjs";
import { ErrorAction } from "./createAction";

export const STARTED = "STARTED";
export const SUCCEEDED = "SUCCEEDED";
export const FAILED = "FAILED";

export interface StartedAction<T extends string, M> {
  type: T;
  meta: M;
  error?: boolean;
}

export interface SucceededAction<T extends string, P, M> {
  type: T;
  payload: P;
  meta: M;
  error?: boolean;
}

export interface FailedAction<T extends string, M = {}>
  extends ErrorAction<T, M> {
  type: T;
  payload: RequestError | ApiError | InternalError | Error; // TODO: remove normal error when all async actions using this
  meta: M;
  error: true;
}

/** The set of Flux Standard Actions which may result from an async request */
export type AsyncFsaActions<
  R extends string,
  S extends string,
  F extends string,
  P,
  M
> = StartedAction<R, M> | SucceededAction<S, P, M> | FailedAction<F, M>;

/** Internal definition, that doesn't quite represent final dispatched actions */
interface StartedActionCreator<T extends string, M> {
  type: T;
  meta: M;
}

/** Internal definition, that doesn't quite represent final dispatched actions */
interface SucceededActionCreator<T extends string, P, M> {
  type: T;
  payload: (action, state, res) => PromiseLike<P>;
  meta: M;
}

/** Internal definition, that doesn't quite represent final dispatched actions */
interface FailedActionCreator<T extends string, M> {
  type: T;
  meta: M;
}

/** A convenience type, for defining the return value of the rsa action generator. */
export type RSAActionTemplate<
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
> = RSAAction<
  TStarted,
  TSuccess,
  TFailed,
  PromiseLike<TPayload>,
  Error,
  {},
  TMeta,
  TMeta,
  TMeta,
  any
>;

// TODO: is this the best way to get this?
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

/**
 *
 * @param endpoint
 * @param method
 * @param body
 * @param startedType
 * @param succeededType
 * @param failedType
 * @param parseResponse This function must accept the response body and return a payload.
 * @param metaData
 */
export const asyncAction = <
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
>(
  endpoint: string,
  method: HTTPVerb,
  body: object | string | null,
  startedType: TStarted,
  succeededType: TSuccess,
  failedType: TFailed,
  parseResponse: (response: any) => TPayload,
  metaData: TMeta,
): RSAActionTemplate<TStarted, TSuccess, TFailed, TPayload, TMeta> => {
  const basicHeaders = {
    "X-CSRF-TOKEN": csrfToken,
    Accept: "application/json",
  };
  const jsonBodyHeader = { "Content-Type": "application/json" }; // informs server that the body is a json encoded string
  const headers =
    body === null ? basicHeaders : { ...basicHeaders, ...jsonBodyHeader };

  let stringBody: string | null = null;
  if (body instanceof Object) {
    // We must stringify any object bodies, and ensure dates are formatted as server expects.
    stringBody = JSON.stringify(body, jsonDateReplacer);
  } else {
    stringBody = body;
  }

  return {
    [RSAA]: {
      endpoint,
      method,
      headers,
      ...(stringBody && { body: stringBody }),
      fetch, // Ensure the global fetch function is being used
      credentials: "include", // TODO: this may be removed when we change to token auth
      types: [
        {
          type: startedType,
          meta: metaData,
        },
        {
          type: succeededType,
          payload: (action, state, res: Response): PromiseLike<TPayload> =>
            getJSON(res).then(parseResponse),
          meta: metaData,
        },
        {
          type: failedType,
          meta: metaData,
        },
      ],
    },
  };
};

export const asyncGet = <
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
>(
  endpoint: string,
  startedType: TStarted,
  succeededType: TSuccess,
  failedType: TFailed,
  parseResponse: (response: any) => TPayload,
  metaData: TMeta,
): RSAActionTemplate<TStarted, TSuccess, TFailed, TPayload, TMeta> =>
  asyncAction(
    endpoint,
    "GET",
    null,
    startedType,
    succeededType,
    failedType,
    parseResponse,
    metaData,
  );

export const asyncPut = <
  TBody extends object | string,
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
>(
  endpoint: string,
  body: TBody,
  startedType: TStarted,
  succeededType: TSuccess,
  failedType: TFailed,
  parseResponse: (response: any) => TPayload,
  metaData: TMeta,
): RSAActionTemplate<TStarted, TSuccess, TFailed, TPayload, TMeta> =>
  asyncAction(
    endpoint,
    "PUT",
    body,
    startedType,
    succeededType,
    failedType,
    parseResponse,
    metaData,
  );

export const asyncPost = <
  TBody extends object | string,
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
>(
  endpoint: string,
  body: TBody,
  startedType: TStarted,
  succeededType: TSuccess,
  failedType: TFailed,
  parseResponse: (response: any) => TPayload,
  metaData: TMeta,
): RSAActionTemplate<TStarted, TSuccess, TFailed, TPayload, TMeta> =>
  asyncAction(
    endpoint,
    "POST",
    body,
    startedType,
    succeededType,
    failedType,
    parseResponse,
    metaData,
  );

export const asyncDelete = <
  TStarted extends string,
  TSuccess extends string,
  TFailed extends string,
  TPayload,
  TMeta
>(
  endpoint: string,
  startedType: TStarted,
  succeededType: TSuccess,
  failedType: TFailed,
  parseResponse: (response: any) => TPayload,
  metaData: TMeta,
): RSAActionTemplate<TStarted, TSuccess, TFailed, TPayload, TMeta> =>
  asyncAction(
    endpoint,
    "DELETE",
    null,
    startedType,
    succeededType,
    failedType,
    parseResponse,
    metaData,
  );

export default asyncAction;

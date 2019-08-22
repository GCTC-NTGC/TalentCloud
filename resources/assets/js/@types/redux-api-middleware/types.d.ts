// Type definitions for redux-api-middleware 2.3
// Project: https://github.com/agraboso/redux-api-middleware
// Definitions by: Mosen <https://github.com/mosen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "redux-api-middleware" {
  import { Middleware } from "redux";

  export interface StandardAction<T extends string, P, M = {}> {
    type: T;
    payload: P;
    error?: boolean;
    meta?: M;
  }

  export interface ErrorAction<T extends string, P, M = {}>
    extends StandardAction<T, P, M> {
    error: true;
  }

  //declare module "redux-api-middleware";

  /**
   * Symbol key that carries API call info interpreted by this Redux middleware.
   *
   * @constant {string}
   * @access public
   * @default
   */
  export const RSAA: string;

  //// ERRORS

  /**
   * Error class for an RSAA that does not conform to the RSAA definition
   *
   * @class InvalidRSAA
   * @access public
   * @param {array} validationErrors - an array of validation errors
   */
  export class InvalidRSAA {
    constructor(validationErrors: Array<string>);

    name: string;
    message: string;
    validationErrors: Array<string>;
  }

  /**
   * Error class for a custom `payload` or `meta` function throwing
   *
   * @class InternalError
   * @access public
   * @param {string} message - the error message
   */
  export class InternalError {
    constructor(message: string);

    name: string;
    message: string;
  }

  /**
   * Error class for an error raised trying to make an API call
   *
   * @class RequestError
   * @access public
   * @param {string} message - the error message
   */
  export class RequestError {
    constructor(message: string);

    name: string;
    message: string;
  }

  /**
   * Error class for an API response outside the 200 range
   *
   * @class ApiError
   * @access public
   * @param {number} status - the status code of the API response
   * @param {string} statusText - the status text of the API response
   * @param {object} response - the parsed JSON response of the API server if the
   *  'Content-Type' header signals a JSON response
   */
  export class ApiError {
    constructor(status: number, statusText: string, response: any);

    name: string;
    message: string;
    status: number;
    statusText: string;
    response?: any;
  }

  //// VALIDATION

  /**
   * Is the given action a plain JavaScript object with a [RSAA] property?
   */
  export function isRSAA(
    action: object,
  ): action is RSAAction<any, any, any, any, any, any>;

  export interface TypeDescriptor<
    TType extends string,
    TPayload,
    TMeta,
    TState
  > {
    type: TType;
    payload?:
      | TPayload
      | ((
          action: StandardAction<any, any, any>,
          state: TState,
          response: Response,
        ) => TPayload);
    meta?:
      | TMeta
      | ((
          action: StandardAction<any, any, any>,
          state: TState,
          response: Response,
        ) => TMeta);
  }

  /**
   * Is the given object a valid type descriptor?
   */
  export function isValidTypeDescriptor(
    obj: object,
  ): obj is TypeDescriptor<any, any, any, any>;

  /**
   * Checks an action against the RSAA definition, returning a (possibly empty)
   * array of validation errors.
   */
  function validateRSAA(action: object): Array<string>;

  /**
   * Is the given action a valid RSAA?
   */
  function isValidRSAA(action: object): boolean;

  //// MIDDLEWARE

  /**
   * A Redux middleware that processes RSAA actions.
   */
  export const apiMiddleware: Middleware;

  //// UTIL

  /**
   * Extract JSON body from a server response
   */
  export function getJSON(res: Response): PromiseLike<any>;

  export type RSAActionTypeTuple = [
    string | symbol,
    string | symbol,
    string | symbol,
  ];

  /**
   * Blow up string or symbol types into full-fledged type descriptors,
   *   and add defaults
   */
  export function normalizeTypeDescriptors(
    types: RSAActionTypeTuple,
  ): RSAActionTypeTuple;

  export type HTTPVerb =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "OPTIONS";

  export interface RSAAction<
    TStartedType extends string,
    TSuccessType extends string,
    TFailedType extends string,
    TSuccessPayload = any,
    TFailPayload = Error,
    TStartedPayload = {},
    TSuccessMeta = {},
    TFailMeta = {},
    TStartedMeta = {},
    TState = any
  > {
    [propName: string]: {
      /**
       * Endpoint to hit, or a function to call that results in an endpoint to hit.
       */
      endpoint: string | ((state: TState) => string);
      method: "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS";
      headers?: object | ((state: TState) => object);
      body?: object | string | ((state: TState) => object | string);
      credentials?: "omit" | "same-origin" | "include";
      /**
       * object or function producing an object of options to pass to the Fetch API.
       * See: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
       * for the list of available options.
       */
      options?: object | ((state: TState) => object);
      /**
       * Function/bool for whether or not to bail on a REST request.
       * True = do not perform network request.
       */
      bailout?: boolean | ((state: TState) => boolean);
      /**
       * Length 3 array of types to assign to the API request's resulting Flux Standard Action's type property for various
       * circumstances:
       * index 0: REQUEST - Request has been made (yes, two FSAs result from your request action)
       * index 1: RECEIVE - Response has been received
       * index 2: FAILURE - Response was a failure
       * TypeDescriptor objects will have their meta/payload properties merged into the resulting Flux Standard Actions
       */
      types: [

          | TStartedType
          | TypeDescriptor<TStartedType, TStartedPayload, TStartedMeta, TState>,


          | TSuccessType
          | TypeDescriptor<TSuccessType, TSuccessPayload, TSuccessMeta, TState>,


          | TFailedType
          | TypeDescriptor<TFailedType, TFailPayload, TFailMeta, TState>,
      ];
      fetch?: typeof fetch;
    };
  }

  module "redux" {
    export interface Dispatch<S> {
      <
        TStartedType extends string,
        TSuccessType extends string,
        TFailedType extends string,
        TSuccessPayload,
        TFailPayload,
        TStartedPayload,
        TSuccessMeta,
        TFailMeta,
        TStartedMeta
      >(
        rsaa: RSAAction<
          TStartedType,
          TSuccessType,
          TFailedType,
          TSuccessPayload,
          TFailPayload,
          TStartedPayload,
          TSuccessMeta,
          TFailMeta,
          TStartedMeta,
          S
        >,
      ): Promise<
        | StandardAction<TSuccessType, TSuccessPayload, TSuccessMeta>
        | ErrorAction<TFailedType, TFailPayload, TFailMeta>
      >;
    }
  }
}

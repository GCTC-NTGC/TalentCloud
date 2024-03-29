import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  deleteRequest,
  FetchError,
  getRequest,
  postRequest,
  processJsonResponse,
  putRequest,
} from "../../helpers/httpRequests";
import { getId, hasKey, identity } from "../../helpers/queries";
import indexCrudReducer, {
  initializeState,
  ResourceState,
  ActionTypes,
  AsyncAction,
} from "./indexCrudReducer";
import { Json, ResourceStatus } from "./types";

type IndexedObject<T> =
  | {
      [key: string]: T;
    }
  | { [key: number]: T };

function valuesSelector<T>(state: ResourceState<T>): IndexedObject<T> {
  return Object.entries(state.values).reduce(
    (collection: IndexedObject<T>, [key, item]) => {
      collection[key] = item.value;
      return collection;
    },
    {},
  );
}
function statusSelector<T>(
  state: ResourceState<T>,
): IndexedObject<ResourceStatus> {
  // If the entire index is being refreshed, then each individual item should be considered "pending".
  const forcePending = state.indexMeta.status === "pending";
  return Object.entries(state.values).reduce(
    (collection: IndexedObject<ResourceStatus>, [key, item]) => {
      collection[key] = forcePending ? "pending" : item.status;
      return collection;
    },
    {},
  );
}

// Defining these functions outside of the hook, despite their simplicity,
// so they remain constant between re-renders.

function defaultEntityEndpoint(baseEndpoint: string, entity: any): string {
  if (!hasKey(entity, "id")) {
    throw new Error(
      'Cannot use default resolveEntityEndpoint on item without an "id" property',
    );
  }
  return `${baseEndpoint}/${entity.id}`;
}

function defaultCreateEndpoint(baseEndpoint: string): string {
  return baseEndpoint;
}

function defaultKeyFn(item: any): number {
  if (!hasKey(item, "id")) {
    throw new Error(
      'Cannot use default keyFn on item without an "id" property',
    );
  }
  return getId(item);
}

function doNothing(): void {
  /* do nothing */
}

// The value dispatched to the reducer must have an id, or the reducer cannot place it correctly.
function isValidEntity(value: any): boolean {
  return hasKey(value, "id");
}

function isValidEntityList(value: any): boolean {
  return Array.isArray(value) && value.every(isValidEntity);
}

export const UNEXPECTED_FORMAT_ERROR =
  "Response from server was not expected format";

/**
 * This hook keeps a local list of entities in sync with a REST api representing a single resource.
 *
 * *** Interaction with API ***
 * The API can be interacted with in 4 ways:
 *   - Refreshing, getting a complete list of entities
 *   - Creating a new entity that is added to the list
 *   - Updating a specific entity in the list
 *   - Deleting a specific entity in the list
 *
 * The only required argument is the API endpoint. By default, the CRUD operations (Create, Read, Update, Delete) follow normal REST conventions:
 *   - Create submits a POST request to endpoint
 *   - Refresh submits a GET request to endpoint
 *   - Update submits a PUT request to endpoint/id
 *   - Delete submits a DELETE request to endpoint/id
 * The urls used may be modified by overriding resolveEntityEndpoint (for update and delete requests) and resolveCreateEndpoint.
 * This may allow, for example, for using query parameters in some of these urls.
 * Note: The HTTP verbs used cannot be changed.
 *
 * The api requests MUST return valid JSON (except for delete requests), or the request will be considered to have failed.
 * The response to refresh requests must be a JSON List, and update and create requests must return the resulting entity as a json object.
 * However, the JSON objects may be preprocessed before being stored locally, by overriding parseEntityResponse and/or parseIndexResponse.
 *
 * *** Hook Values and Statuses *** *
 * values: This represents the list of entities compressing the resource.
 *   Note: values is not an array. It is an object with each entity indexed by id, so specific items may be retrieved more easily.
 *   Note: By default, values starts out empty and the hook immediately triggers a refresh callback.
 *   Note: An initialValue may be provided, which suppresses that initial refresh, unless forceInitialRefresh is ALSO overridden with true.
 *   Note: Setting forceInitialRefresh to false has no effect. Set initialValue to [] instead.
 *
 * indexStatus, createStatus, and entityStatus: These tell you whether any requests are currently in progress, and if not whether the last completed request was successful.
 *   Note: entityStatus covers both update and delete requests, and contains a status value for each entity, indexed by id.
 *
 * *** Callbacks *** *
 * create, refresh, update, deleteResource: These callbacks trigger requests to the api, updating values and the status properties accordingly.
 *   Note: while conventional "reactive" programming would control UI based only on the current values and status properties, these callbacks also return promises
 *         which allow code to respond to the success or failure of specific requests.
 *
 * *** Error Handling ***
 * You may watch for statuses of "rejected" to determining whether an error occurred during certain requests.
 * To respond to any details of potential errors, override handleError.
 * Note: If the error was caused by a non-200 response from the server, handleError will receive an instance of FetchError, which contains the entire response object.
 */
export function useResourceIndex<T>(
  endpoint: string, // API endpoint that returns a list of T.
  overrides?: {
    initialValue?: T[]; // Defaults to an empty list.
    skipInitialRefresh?: boolean; // Defaults to false. Override if you want to keep the initialValue until refresh is called manually.
    parseEntityResponse?: (response: Json) => T; // Defaults to the identity function.
    parseIndexResponse?: (response: Json) => T[]; // Defaults to (response) => response.map(parseEntityResponse)
    resolveEntityEndpoint?: (baseEndpoint: string, entity: T) => string; // Defaults to appending '/id' to baseEndpoint. Used for update (PUT) and delete (DELETE) requests.
    resolveCreateEndpoint?: (baseEndpoint: string, newEntity: T) => string; // Defaults to identical to endpoint. Used for create (POST) requests.
    handleError?: (error: Error | FetchError) => void;
    keyFn?: (item: T) => string | number; // Returns a unique key for each item. Defaults to using `item.id`.
  },
): {
  values: IndexedObject<T>;
  initialRefreshFinished: boolean; // If an initial refresh happens, this becomes true after is fulfilled or rejected. If initial fetch is skipped, this will be true immediately.
  indexStatus: ResourceStatus; // The state of any requests to reload the entire index.
  createStatus: ResourceStatus; // If ANY create requests are in progress, this is 'pending'. Otherwise, it is 'fulfilled' or 'rejected' depending on the last request to complete.
  entityStatus: IndexedObject<ResourceStatus>; // Note that if indexStatus is 'pending', every entity status will also be 'pending'.
  create: (newValue: T) => Promise<T>;
  refresh: () => Promise<T[]>; // Reloads the entire index.
  update: (newValue: T) => Promise<T>;
  deleteResource: (value: T) => Promise<void>;
} {
  const initialValue = overrides?.initialValue ?? [];
  const doInitialRefresh = overrides?.skipInitialRefresh !== true;
  const parseEntityResponse = overrides?.parseEntityResponse ?? identity;
  const parseIndexResponse = useMemo(
    () =>
      overrides?.parseIndexResponse ??
      ((response: Json): T[] => response.map(parseEntityResponse)),
    [overrides?.parseIndexResponse, parseEntityResponse],
  );
  const resolveEntityEndpoint =
    overrides?.resolveEntityEndpoint ?? defaultEntityEndpoint;
  const resolveCreateEndpoint =
    overrides?.resolveCreateEndpoint ?? defaultCreateEndpoint;
  const handleError = overrides?.handleError ?? doNothing;
  const keyFn = overrides?.keyFn ?? defaultKeyFn;

  const addKey = useCallback(
    (item: T): { item: T; key: string | number } => {
      return { item, key: keyFn(item) };
    },
    [keyFn],
  );

  const isSubscribed = useRef(true);

  const [state, dispatch] = useReducer<
    Reducer<ResourceState<T>, AsyncAction<T>>
  >(
    indexCrudReducer,
    initializeState(initialValue.map(addKey), doInitialRefresh),
  );

  const values = useMemo(() => valuesSelector(state), [state]);
  const { initialRefreshFinished } = state.indexMeta;
  const indexStatus = state.indexMeta.status;
  const createStatus = state.createMeta.status;
  const entityStatus = useMemo(() => statusSelector(state), [state]);

  const create = useCallback(
    async (newValue: T): Promise<T> => {
      dispatch({
        type: ActionTypes.CreateStart,
        meta: { item: newValue },
      });
      let entity: T;
      try {
        const json = await postRequest(
          resolveCreateEndpoint(endpoint, newValue),
          newValue,
        ).then(processJsonResponse);
        entity = parseEntityResponse(json);
        if (!isValidEntity(entity)) {
          throw new Error(UNEXPECTED_FORMAT_ERROR);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.CreateReject,
            payload: error,
            meta: { item: newValue },
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.CreateFulfill,
          payload: addKey(entity),
          meta: { item: newValue },
        });
      }
      return entity;
    },
    [endpoint, resolveCreateEndpoint, parseEntityResponse, handleError, addKey],
  );

  const refresh = useCallback(async (): Promise<T[]> => {
    dispatch({
      type: ActionTypes.IndexStart,
    });
    let index: T[];
    try {
      const json = await getRequest(endpoint).then(processJsonResponse);
      index = parseIndexResponse(json);
      if (!isValidEntityList(index)) {
        throw new Error(UNEXPECTED_FORMAT_ERROR);
      }
    } catch (error) {
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.IndexReject,
          payload: error,
        });
        handleError(error);
      }
      throw error;
    }
    if (isSubscribed.current) {
      dispatch({
        type: ActionTypes.IndexFulfill,
        payload: index.map(addKey),
      });
    }
    return index;
  }, [endpoint, parseIndexResponse, handleError, addKey]);

  const update = useCallback(
    async (newValue: T): Promise<T> => {
      const meta = addKey(newValue);
      dispatch({
        type: ActionTypes.UpdateStart,
        meta,
      });
      let value: T;
      try {
        const json = await putRequest(
          resolveEntityEndpoint(endpoint, newValue),
          newValue,
        ).then(processJsonResponse);
        value = parseEntityResponse(json);
        if (!isValidEntity(value)) {
          throw new Error(UNEXPECTED_FORMAT_ERROR);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.UpdateReject,
            payload: error,
            meta,
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.UpdateFulfill,
          payload: value,
          meta,
        });
      }
      return value;
    },
    [endpoint, resolveEntityEndpoint, parseEntityResponse, handleError, addKey],
  );

  const deleteResource = useCallback(
    async (entity: T): Promise<void> => {
      const meta = { key: keyFn(entity) };
      dispatch({
        type: ActionTypes.DeleteStart,
        meta,
      });
      try {
        const response = await deleteRequest(
          resolveEntityEndpoint(endpoint, entity),
        );
        if (!response.ok) {
          throw new FetchError(response);
        }
      } catch (error) {
        if (isSubscribed.current) {
          dispatch({
            type: ActionTypes.DeleteReject,
            payload: error,
            meta,
          });
          handleError(error);
        }
        throw error;
      }
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.DeleteFulfill,
          meta,
        });
      }
    },
    [endpoint, resolveEntityEndpoint, handleError, keyFn],
  );

  // Despite the usual guidelines, this should only be reconsidered if endpoint changes.
  // Changing doInitialRefresh after the first run (or refresh) should not cause this to rerun.
  useEffect(() => {
    if (doInitialRefresh) {
      refresh().catch(doNothing);
    }

    // Unsubscribe from promises when this hook is unmounted.
    return (): void => {
      isSubscribed.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return {
    values,
    initialRefreshFinished,
    indexStatus,
    createStatus,
    entityStatus,
    create,
    refresh,
    update,
    deleteResource,
  };
}

export default useResourceIndex;

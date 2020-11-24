import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  FetchError,
  postRequest,
  processJsonResponse,
} from "../../helpers/httpRequests";
import { identity } from "../../helpers/queries";
import indexCrudReducer, {
  initializeState,
  ResourceState,
  ActionTypes,
} from "./indexCrudReducer";
import { Json, ResourceStatus } from "./types";

type IndexedObject<T> = {
  [id: number]: T;
};

function valuesSelector<T extends { id: number }>(
  state: ResourceState<T>,
): IndexedObject<T> {
  return Object.values(state.values).reduce(
    (collection: IndexedObject<T>, item) => {
      collection[item.value.id] = item.value;
      return collection;
    },
    {},
  );
}
function statusSelector<T extends { id: number }>(
  state: ResourceState<T>,
): IndexedObject<ResourceStatus> {
  // If the entire index is being refreshed, then each individual item should be considered "pending".
  const forcePending = state.indexMeta.status === "pending";
  return Object.values(state.values).reduce(
    (collection: IndexedObject<ResourceStatus>, item) => {
      collection[item.value.id] = forcePending ? "pending" : item.status;
      return collection;
    },
    {},
  );
}

export function useResourceIndex<T extends { id: number }>(
  endpoint: string,
  overrides?: {
    initialValue?: T[]; // Defaults to an empty list.
    forceInitialRefresh: boolean; // If you set an initialValue but also want to refresh immediately, set this to true.
    parseIndexResponse?: (response: Json) => T[];
    parseEntityResponse?: (response: Json) => T;
    resolveEntityEndpoint?: (baseEndpoint: string, entity: T) => string;
    resolveCreateEndpoint?: (baseEndpoint: string, newEntity: T) => string;
    handleError?: (error: Error | FetchError) => void;
  },
): {
  values: IndexedObject<T>;
  indexStatus: ResourceStatus;
  entityStatus: IndexedObject<ResourceStatus>;
  create: (newValue: T) => Promise<T>;
  refresh: () => Promise<T[]>; // Reloads the entire index.
  update: (newValue: T) => Promise<T>;
  deleteResource: (id: number) => Promise<void>;
} {
  const initialValue = overrides?.initialValue ?? [];
  const forceInitialRefresh =
    overrides?.initialValue !== undefined && overrides?.forceInitialRefresh;
  const parseIndexResponse = overrides?.parseIndexResponse ?? identity;
  const parseEntityResponse = overrides?.parseEntityResponse ?? identity;
  const resolveEntityEndpoint =
    overrides?.resolveEntityEndpoint ??
    ((baseEndpoint, entity): string => `${baseEndpoint}/${entity.id}`);
  const resolveCreateEndpoint =
    overrides?.resolveCreateEndpoint ??
    ((baseEndpoint, _): string => baseEndpoint);
  const handleError =
    overrides?.handleError ??
    ((): void => {
      /* Do nothing. */
    });

  const isSubscribed = useRef(true);

  const [state, dispatch] = useReducer(
    indexCrudReducer,
    initialValue,
    initializeState,
  );

  const values = useMemo(() => valuesSelector(state), [state]);
  const indexStatus = state.indexMeta.status;
  const entityStatus = useMemo(() => statusSelector(state), [state]);

  const create = useCallback(
    async (newValue: T): Promise<T> => {
      dispatch({
        type: ActionTypes.createStart,
        meta: { item: newValue },
      });
      let json: Json;
      try {
        json = await postRequest(
          resolveCreateEndpoint(endpoint, newValue),
          newValue,
        ).then(processJsonResponse);
      } catch (error) {
        dispatch({
          type: ActionTypes.createReject,
          payload: error,
          meta: { item: newValue },
        });
      }
      const entity = parseEntityResponse(json) as T;
      if (isSubscribed.current) {
        dispatch({
          type: ActionTypes.createFulfill,
          payload: entity,
          meta: { item: newValue },
        });
      }
      return entity;
    },
    [endpoint, resolveCreateEndpoint, parseEntityResponse],
  );

  // Unsubscribe from promises when this hook is unmounted.
  useEffect(() => {
    return (): void => {
      isSubscribed.current = false;
    };
  }, []);

  return {
    values,
    indexStatus,
    entityStatus,
    create,
    update,
    refresh,
  };
}

export default useResourceIndex;

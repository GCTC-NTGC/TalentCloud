import { useEffect, useRef } from "react";
import { FetchError, useFetch } from "react-async";
import { fetchParameters } from "../../helpers/httpRequests";
import { identity } from "../../helpers/queries";
import { Json, ResourceStatus } from "./types";

export function useResource<T>(
  endpoint: string,
  initialValue: T,
  overrides?: {
    parseResponse?: (response: Json) => T;
  },
): {
  value: T;
  status: ResourceStatus;
  error: undefined | Error | FetchError;
  update: (newValue: T) => void;
  refresh: () => void;
} {
  const internalParseResponse = overrides?.parseResponse ?? identity;
  const valueRef = useRef(initialValue);
  const { error, status, reload, run } = useFetch(
    endpoint,
    fetchParameters("GET"),
    {
      onResolve: (data) => {
        valueRef.current = internalParseResponse(data);
      },
    },
  );
  const refresh = reload;
  const update = (newValue: T): void => run(fetchParameters("PUT", newValue));
  return { value: valueRef.current, status, error, update, refresh };
}

export function useDeleteableResource<T>(
  endpoint: string,
  initialValue: T,
  overrides?: {
    parseResponse?: (response: Json) => T;
  },
): (
  | {
      value: T;
      status: ResourceStatus;
    }
  | {
      value: undefined;
      status: "deleted";
    }
) & {
  error: undefined | Error | FetchError;
  update: (newValue: T) => void;
  deleteResource: () => void;
  refresh: () => void;
} {
  const internalParseResponse = overrides?.parseResponse ?? identity;
  const valueRef = useRef(initialValue);
  const isDeletedRef = useRef(false);
  const isSubscribed = useRef(true);
  const { error, status, reload, run, promise } = useFetch(
    endpoint,
    fetchParameters("GET"),
    {
      onResolve: (data) => {
        valueRef.current = internalParseResponse(data);
      },
    },
  );
  const refresh = reload;
  const update = (newValue: T): void => run(fetchParameters("PUT", newValue));
  const deleteResource = (): void => {
    run(fetchParameters("DELETE"));
    promise
      .then(() => {
        if (isSubscribed) {
          isDeletedRef.current = true;
        }
      })
      .catch(() => {});
  };
  const valueStatus:
    | {
        value: T;
        status: ResourceStatus;
      }
    | {
        value: undefined;
        status: "deleted";
      } = isDeletedRef.current
    ? {
        value: undefined,
        status: "deleted",
      }
    : {
        value: valueRef.current,
        status,
      };
  useEffect(() => {
    return () => {
      isSubscribed.current = false;
    };
  }, []);
  return { ...valueStatus, error, update, refresh, deleteResource };
}

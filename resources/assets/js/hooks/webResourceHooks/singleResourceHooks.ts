import { useEffect, useRef } from "react";
import { FetchError, useFetch } from "react-async";
import { fetchParameters } from "../../helpers/httpRequests";
import { identity } from "../../helpers/queries";
import { Json, ResourceStatus } from "./types";

export function useResource<T>(
  endpoint: string,
  initialValue: T,
  overrides?: {
    parseResponse?: (response: Json) => T; // Defaults to the identity function.
    skipInitialFetch?: boolean; // Defaults to false. Override if you want to keep the initialValue until refresh is called manually.
  },
): {
  value: T;
  status: ResourceStatus;
  error: undefined | Error | FetchError;
  update: (newValue: T) => void;
  refresh: () => void;
} {
  const internalParseResponse = overrides?.parseResponse ?? identity;
  const skipInitialFetch = overrides?.skipInitialFetch === true;
  const valueRef = useRef(initialValue);
  const { error, status, reload, run } = useFetch(
    endpoint,
    fetchParameters("GET"),
    {
      onResolve: (data) => {
        valueRef.current = internalParseResponse(data);
      },
      initialValue: null, // Setting this prevents fetch from happening on first render. (We call it later if necessary.)
    },
  );
  const refresh = reload;
  const update = (newValue: T): void => run(fetchParameters("PUT", newValue));

  // Despite the usual useEffect guidelines, this should only run on first render or when endpoint changes.
  // Changing skipInitialFetch after the first render should not cause a refresh.
  useEffect(() => {
    if (!skipInitialFetch) {
      refresh();
    }
  }, [endpoint]);

  return { value: valueRef.current, status, error, update, refresh };
}

export default useResource;

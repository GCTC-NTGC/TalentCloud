import fetchMock from "fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { FetchError } from "../../helpers/httpRequests";
import useResourceIndex from "./indexResourceHook";
import { getId, mapToObject } from "../../helpers/queries";

interface TestResource {
  id: number;
  name: string;
}

function arrayToIndexedObj(arr) {
  return mapToObject(arr, getId);
}

describe("indexResourceHook", () => {
  afterEach((): void => {
    fetchMock.reset();
    fetchMock.restore();
  });

  const endpoint = "https://talent.test/api/test";

  it("Initially returns no values and a status of 'pending'", () => {
    fetchMock.mock(
      "*",
      {},
      {
        delay: 10,
      },
    );
    const { result } = renderHook(() => useResourceIndex(endpoint));
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("pending");
  });
  it("If initial value is set, returns that value and does not automatically fetch.", () => {
    fetchMock.mock("*", {});
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    expect(result.current.values).toEqual({
      1: initialValue[0],
      2: initialValue[1],
    });
    expect(result.current.indexStatus).toEqual("initial");
    expect(fetchMock.called()).toBe(false);
  });
  it("If initial value is set, but forceInitialRefresh is true, returns the initial value but also fetches.", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updatedValue = [
      { id: 1, name: "one NEW" },
      { id: 2, name: "two NEW" },
      { id: 3, name: "three NEW" },
    ];
    fetchMock.mock("*", updatedValue, { delay: 10 });
    const { result, waitFor } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, forceInitialRefresh: true }),
    );
    expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
    expect(result.current.indexStatus).toEqual("pending");
    expect(fetchMock.called()).toBe(true);
    await waitFor(() => result.current.indexStatus === "fulfilled");
    expect(result.current.values).toEqual(arrayToIndexedObj(updatedValue));
    expect(result.current.indexStatus).toEqual("fulfilled");
  });
  it("Returns new values and status of 'fulfilled' after initial fetch succeeds", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    fetchMock.mock("*", initialValue, {
      delay: 10,
    });

    const { result, waitFor } = renderHook(() => useResourceIndex(endpoint));

    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("pending");
    await waitFor(
      () => {
        return result.current.indexStatus === "fulfilled";
      },
      { timeout: 100 },
    );
    expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
  });
  it("parseIndexResponse (if set) transforms values returns by index requests", async () => {
    const responseValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const parseIndexResponse = (arr) =>
      arr.map((x) => ({ ...x, name: `${x.name} PARSED` }));
    const expectValue = [
      { id: 1, name: "one PARSED" },
      { id: 2, name: "two PARSED" },
    ];
    fetchMock.mock("*", responseValue);
    const { result, waitFor } = renderHook(() =>
      useResourceIndex(endpoint, { parseIndexResponse }),
    );
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("pending");
    await waitFor(() => result.current.indexStatus === "fulfilled");
    expect(result.current.values).toEqual(arrayToIndexedObj(expectValue));
  });
  it("Initial fetch is a GET request to the provided endpoint", async () => {
    fetchMock.getOnce(endpoint, {});
    const { result, waitFor } = renderHook(() => useResourceIndex(endpoint));
    await waitFor(() => result.current.indexStatus === "fulfilled");
    expect(fetchMock.called()).toBe(true);
  });
  it("After initial fetch, all values have entityStatus of 'fulfilled'", async () => {
    const responseValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    fetchMock.getOnce(endpoint, responseValue);
    const { result, waitFor } = renderHook(() => useResourceIndex(endpoint));
    expect(result.current.entityStatus).toEqual({});
    await waitFor(() => result.current.indexStatus === "fulfilled");
    expect(result.current.entityStatus).toEqual({
      1: "fulfilled",
      2: "fulfilled",
    });
  });
  // it("Status changes to 'pending' when refresh() is called", async () => {
  //   fetchMock.mock("*", {});
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   const parseResponse = () => ({ name: "Talent Cloud 2", age: 100 });
  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useResource(endpoint, initialValue, {
  //       parseResponse,
  //       skipInitialFetch: true,
  //     }),
  //   );
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     result.current.refresh();
  //     await waitForNextUpdate();
  //     expect(result.current.status).toEqual("pending");
  //   });
  // });
  // it("refresh() triggers a GET request to endpoint", async () => {
  //   fetchMock.getOnce(endpoint, {});
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, null, { skipInitialFetch: true }),
  //   );
  //   await act(async () => {
  //     await result.current.refresh();
  //   });
  //   expect(fetchMock.called()).toBe(true);
  // });
  // it("refresh() returns fetch result and updates hook value", async () => {
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   const newValue = { name: "Talent Cloud 2", age: 100 };
  //   fetchMock.mock(endpoint, newValue);
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, initialValue, { skipInitialFetch: true }),
  //   );
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     const refreshValue = await result.current.refresh();
  //     expect(refreshValue).toEqual(newValue);
  //   });
  //   expect(result.current.status).toEqual("fulfilled");
  //   expect(result.current.value).toEqual(newValue);
  // });
  // it("Returns an error and 'rejected' status when fetch returns a server error", async () => {
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   fetchMock.once(endpoint, 404);
  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useResource(endpoint, initialValue),
  //   );
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("pending");
  //   await waitForNextUpdate();
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("rejected");
  //   expect(result.current.error instanceof FetchError).toBe(true);
  // });
  // it("refresh() rejects with an error when fetch returns a server error", async () => {
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   fetchMock.once(endpoint, 404);
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, initialValue, { skipInitialFetch: true }),
  //   );
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     await expect(result.current.refresh()).rejects.toBeInstanceOf(FetchError);
  //   });
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("rejected");
  //   expect(result.current.error instanceof FetchError).toBe(true);
  // });
  // it("If refresh() is called twice, and one request returns, status remains pending", async () => {
  //   fetchMock.once(
  //     endpoint,
  //     {},
  //     {
  //       delay: 10,
  //     },
  //   );
  //   // Second call will take longer.
  //   fetchMock.mock(
  //     "*",
  //     {},
  //     {
  //       delay: 20,
  //     },
  //   );
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, null, { skipInitialFetch: true }),
  //   );
  //   await act(async () => {
  //     const refreshPromise1 = result.current.refresh();
  //     const refreshPromise2 = result.current.refresh();
  //     await refreshPromise1;
  //     expect(result.current.status).toEqual("pending");
  //     await refreshPromise2;
  //     expect(result.current.status).toEqual("fulfilled");
  //   });
  // });
  // it("update() changes status to pending", async () => {
  //   fetchMock.mock("*", {});
  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useResource(endpoint, null, {
  //       skipInitialFetch: true,
  //     }),
  //   );
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     result.current.update(null);
  //     await waitForNextUpdate();
  //     expect(result.current.status).toEqual("pending");
  //   });
  // });
  // it("update() triggers a PUT request to endpoint", async () => {
  //   fetchMock.putOnce(endpoint, {});
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, null, { skipInitialFetch: true }),
  //   );
  //   await act(async () => {
  //     await result.current.update(null);
  //   });
  //   expect(fetchMock.called()).toBe(true);
  // });
  // it("update() returns fetch result and updates hook value with value from response when it completes", async () => {
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   const updateValue = { name: "Talent Cloud 2", age: 100 };
  //   // The value returned from server is slightly different from what we send it.
  //   const responseValue = { name: updateValue.name, age: updateValue.age + 1 };
  //   fetchMock.mock(endpoint, responseValue);
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, initialValue, { skipInitialFetch: true }),
  //   );
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     const updateResponseValue = await result.current.update(updateValue);
  //     expect(updateResponseValue).toEqual(responseValue);
  //   });
  //   // Ensure the new value is the one returned from request, not what we tried to send.
  //   expect(result.current.status).toEqual("fulfilled");
  //   expect(result.current.value).toEqual(responseValue);
  // });
  // it("update() rejects with an error when fetch returns a server error", async () => {
  //   const initialValue = { name: "Talent Cloud", age: 3 };
  //   const updateValue = { name: "Talent Cloud 2", age: 100 };
  //   fetchMock.once(endpoint, 404);
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, initialValue, { skipInitialFetch: true }),
  //   );
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("initial");
  //   await act(async () => {
  //     await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
  //       FetchError,
  //     );
  //   });
  //   expect(result.current.value).toEqual(initialValue);
  //   expect(result.current.status).toEqual("rejected");
  //   expect(result.current.error instanceof FetchError).toBe(true);
  // });
  // it("If multiple update requests are started, status remains pending until all are complete", async () => {
  //   fetchMock.once(
  //     endpoint,
  //     {},
  //     {
  //       delay: 10,
  //     },
  //   );
  //   // Second call will take longer.
  //   fetchMock.mock(
  //     "*",
  //     {},
  //     {
  //       delay: 20,
  //     },
  //   );
  //   const { result } = renderHook(() =>
  //     useResource(endpoint, null, { skipInitialFetch: true }),
  //   );
  //   await act(async () => {
  //     const updatePromise1 = result.current.update(null);
  //     const updatePromise2 = result.current.update(null);
  //     await updatePromise1;
  //     expect(result.current.status).toEqual("pending");
  //     await updatePromise2;
  //     expect(result.current.status).toEqual("fulfilled");
  //   });
  // });
  // it("handleError is called on any fetch errors, if its passed in", async () => {
  //   fetchMock.get(endpoint, 404);
  //   fetchMock.putOnce(endpoint, 500);
  //   const handleError = jest.fn();
  //   const { result, waitFor } = renderHook(() =>
  //     useResource(endpoint, null, { handleError }),
  //   );
  //   await waitFor(() => result.current.status === "rejected");
  //   // handleError was called once on initial fetch.
  //   expect(handleError.mock.calls.length).toBe(1);
  //   // Get error from argument to mocked function.
  //   const initialError = handleError.mock.calls[0][0];
  //   expect(initialError).toBeInstanceOf(FetchError);
  //   expect(initialError.response.status).toBe(404);

  //   await act(async () => {
  //     await result.current.refresh().catch(() => {
  //       /* Do nothing */
  //     });
  //   });
  //   // handleError was called again on refresh.
  //   expect(handleError.mock.calls.length).toBe(2);
  //   const refreshError = handleError.mock.calls[1][0];
  //   expect(refreshError).toBeInstanceOf(FetchError);
  //   expect(refreshError.response.status).toBe(404);

  //   await act(async () => {
  //     await result.current.update(null).catch(() => {
  //       /* Do nothing */
  //     });
  //   });
  //   // handleError was called again on update.
  //   expect(handleError.mock.calls.length).toBe(3);
  //   const updateError = handleError.mock.calls[2][0];
  //   expect(updateError).toBeInstanceOf(FetchError);
  //   expect(updateError.response.status).toBe(500);
  // });
  // it("A successful refresh will overwrite a previous error state", async () => {
  //   const responseValue = { name: "Talent Cloud", age: 3 };
  //   // First request fails, second succeeds
  //   fetchMock.once(endpoint, 404);
  //   fetchMock.mock("*", responseValue);
  //   const { result, waitFor } = renderHook(() => useResource(endpoint, null));
  //   await waitFor(() => result.current.status === "rejected");
  //   expect(result.current.value).toBe(null);
  //   expect(result.current.error).not.toBeUndefined();

  //   await act(async () => {
  //     await result.current.refresh();
  //   });
  //   expect(result.current.status).toBe("fulfilled");
  //   expect(result.current.value).toEqual(responseValue);
  //   expect(result.current.error).toBeUndefined();
  // });
  // it("A successful update will overwrite a previous error state", async () => {
  //   const responseValue = { name: "Talent Cloud", age: 3 };
  //   // First request fails, second succeeds
  //   fetchMock.once(endpoint, 404);
  //   fetchMock.mock("*", responseValue);
  //   const { result, waitFor } = renderHook(() => useResource(endpoint, null));
  //   await waitFor(() => result.current.status === "rejected");
  //   expect(result.current.value).toBe(null);
  //   expect(result.current.error).not.toBeUndefined();

  //   await act(async () => {
  //     await result.current.update(null);
  //   });
  //   expect(result.current.status).toBe("fulfilled");
  //   expect(result.current.value).toEqual(responseValue);
  //   expect(result.current.error).toBeUndefined();
  // });
});

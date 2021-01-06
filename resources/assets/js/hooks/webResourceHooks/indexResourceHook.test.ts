import fetchMock from "fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { FetchError } from "../../helpers/httpRequests";
import useResourceIndex, { UNEXPECTED_FORMAT_ERROR } from "./indexResourceHook";
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
    fetchMock.mock("*", [], {
      delay: 10,
    });
    const { result } = renderHook(() => useResourceIndex(endpoint));
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("pending");
  });
  it("If initial value is set, returns that value and does not automatically fetch.", () => {
    fetchMock.mock("*", []);
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
    fetchMock.mock("*", updatedValue, { delay: 5 });
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
  it("If initial value is set, all entities start with status of 'initial'", () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    expect(result.current.entityStatus).toEqual({
      1: "initial",
      2: "initial",
    });
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
    fetchMock.getOnce(endpoint, []);
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint),
    );
    await waitForNextUpdate();
    expect(result.current.indexStatus).toBe("fulfilled");
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
  it("Returns a 'rejected' status and calls handleError when initial fetch returns a server error", async () => {
    fetchMock.once(endpoint, 404);
    const handleError = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint, { handleError }),
    );
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("pending");
    await waitForNextUpdate();
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("rejected");
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError).toBeInstanceOf(FetchError);
    expect(initialError.response.status).toBe(404);
  });
  it("refresh() triggers a GET request to endpoint and sets status to 'pending'", async () => {
    fetchMock.getOnce(endpoint, []);
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue: [] }),
    );
    expect(result.current.indexStatus).toBe("initial");
    await act(async () => {
      result.current.refresh();
      await waitForNextUpdate();
      expect(result.current.indexStatus).toEqual("pending");
    });
    expect(fetchMock.called()).toBe(true);
  });
  it("refresh() returns fetch result and updates hook value", async () => {
    const responseValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    fetchMock.mock(endpoint, responseValue);
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue: [] }),
    );
    expect(result.current.values).toEqual({});
    expect(result.current.indexStatus).toEqual("initial");
    await act(async () => {
      const refreshValue = await result.current.refresh();
      expect(refreshValue).toEqual(responseValue);
    });
    expect(result.current.indexStatus).toEqual("fulfilled");
    expect(result.current.values).toEqual(arrayToIndexedObj(responseValue));
  });
  it("refresh() rejects with an error when fetch returns a server error", async () => {
    fetchMock.once(endpoint, 404);
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
    expect(result.current.indexStatus).toEqual("initial");
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(FetchError);
    });
    expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
    expect(result.current.indexStatus).toEqual("rejected");
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError).toBeInstanceOf(FetchError);
    expect(initialError.response.status).toBe(404);
  });
  it("when refresh() returns a server error, handleError is called", async () => {
    fetchMock.once("*", 404);
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(FetchError);
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError).toBeInstanceOf(FetchError);
    expect(initialError.response.status).toBe(404);
  });
  it("when refresh() triggers a Fetch error, handleError is called", async () => {
    fetchMock.once("*", { throws: new Error("Failed to fetch") });
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(Error);
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message).toBe("Failed to fetch");
  });
  it("when refresh() returns invalid JSON, handleError is called", async () => {
    fetchMock.once("*", "This is the response");
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(Error);
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message.startsWith("invalid json response body")).toBe(
      true,
    );
  });
  it("when refresh() returns an object with no id, handleError is called", async () => {
    fetchMock.once("*", [
      { id: 1, name: "one valid JSON" },
      { name: "two valid JSON but no id" },
    ]);
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(Error);
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message).toBe(UNEXPECTED_FORMAT_ERROR);
  });
  it("If refresh() is called twice, and one request returns, status remains pending", async () => {
    fetchMock.once(endpoint, [], {
      delay: 10,
    });
    // Second call will take longer.
    fetchMock.mock("*", [], {
      delay: 20,
    });
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue: [] }),
    );
    await act(async () => {
      const refreshPromise1 = result.current.refresh();
      const refreshPromise2 = result.current.refresh();
      await refreshPromise1;
      expect(result.current.indexStatus).toEqual("pending");
      await refreshPromise2;
      expect(result.current.indexStatus).toEqual("fulfilled");
    });
  });
  it("refresh() sets status on all entities to pending, and to fulfilled when it completes", async () => {
    fetchMock.mock("*", [
      { id: 1, name: "NEW one" },
      { id: 2, name: "NEW two" },
    ]);
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      result.current.refresh();
      await waitForNextUpdate();
      expect(result.current.entityStatus).toEqual({
        1: "pending",
        2: "pending",
      });
      await waitForNextUpdate();
    });
    expect(result.current.entityStatus).toEqual({
      1: "fulfilled",
      2: "fulfilled",
    });
  });
  it("A successful refresh will overwrite a previous error state", async () => {
    const responseValue = [
      { id: 1, name: "NEW one" },
      { id: 2, name: "NEW two" },
    ];
    // First request fails, second succeeds
    fetchMock.once(endpoint, 404);
    fetchMock.mock("*", responseValue);
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint),
    );
    await waitForNextUpdate();
    expect(result.current.indexStatus).toBe("rejected");
    await act(async () => {
      await result.current.refresh();
    });
    expect(result.current.indexStatus).toBe("fulfilled");
    expect(result.current.values).toEqual(arrayToIndexedObj(responseValue));
  });
  it("update() changes status of specific entity to pending, and then fulfilled, without affecting status of others", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    fetchMock.mock("*", updateValue);
    const { result, waitForNextUpdate } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    expect(result.current.entityStatus[2]).toEqual("initial");
    expect(result.current.entityStatus[1]).toEqual("initial");
    expect(result.current.indexStatus).toEqual("initial");
    await act(async () => {
      result.current.update(updateValue);
      await waitForNextUpdate();
      expect(result.current.entityStatus[2]).toEqual("pending");
      expect(result.current.entityStatus[1]).toEqual("initial");
      expect(result.current.indexStatus).toEqual("initial");
      await waitForNextUpdate();
      expect(result.current.entityStatus[2]).toEqual("fulfilled");
      expect(result.current.entityStatus[1]).toEqual("initial");
      expect(result.current.indexStatus).toEqual("initial");
    });
  });
  it("update() triggers a PUT request to endpoint (with id appended)", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    fetchMock.putOnce(`${endpoint}/${updateValue.id}`, updateValue);
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      await result.current.update(updateValue);
    });
    expect(fetchMock.called()).toBe(true);
  });
  it("If resolveEntityEndpoint is set, update() triggers a PUT request to resulting endpoint", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const resolveEntityEndpoint = (baseEndpoint, id) =>
      `${baseEndpoint}/resolveEntityTest/${id}`;
    fetchMock.putOnce(
      resolveEntityEndpoint(endpoint, updateValue.id),
      updateValue,
    );
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, resolveEntityEndpoint }),
    );
    await act(async () => {
      await result.current.update(updateValue);
    });
    expect(fetchMock.called()).toBe(true);
  });
  it("update() returns fetch result and updates values when it completes", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    // NOTE: The value returned from server may be slightly different from what we send it.
    const responseValue = { id: 2, name: "UPDATE two RETURNED" };
    fetchMock.putOnce("*", responseValue);
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      const updateResponseValue = await result.current.update(updateValue);
      expect(updateResponseValue).toEqual(responseValue);
    });
    // Ensure the new value is the one returned from request, not what we tried to send.
    expect(result.current.values[2]).toEqual(responseValue);
  });
  it("update() rejects with an error (leaving values unchanged) when fetch returns a server error", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    fetchMock.putOnce("*", 404);
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        FetchError,
      );
    });
    expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
    expect(result.current.entityStatus[2]).toEqual("rejected");
  });
  it("when update() returns a server error, handleError is called", async () => {
    fetchMock.putOnce("*", 404);
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        FetchError,
      );
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError).toBeInstanceOf(FetchError);
    expect(initialError.response.status).toBe(404);
  });
  it("when update() triggers a Fetch error, handleError is called", async () => {
    fetchMock.putOnce("*", { throws: new Error("Failed to fetch") });
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        Error,
      );
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message).toBe("Failed to fetch");
  });
  it("when update() returns invalid JSON, handleError is called", async () => {
    fetchMock.putOnce("*", "This is the response");
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        Error,
      );
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message.startsWith("invalid json response body")).toBe(
      true,
    );
  });
  it("when update() returns an object with no id, handleError is called", async () => {
    fetchMock.putOnce("*", { name: "This is valid JSON now" });
    const handleError = jest.fn();
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue, handleError }),
    );
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        Error,
      );
    });
    // handleError was called once on initial fetch.
    expect(handleError.mock.calls.length).toBe(1);
    // Get error from argument to mocked function.
    const initialError = handleError.mock.calls[0][0];
    expect(initialError.message).toBe(UNEXPECTED_FORMAT_ERROR);
  });
  it("If multiple update requests are started, status remains pending until all are complete", async () => {
    const response1 = { id: 2, name: "UPDATE two v1" };
    const response2 = { id: 2, name: "UPDATE two v2" };
    fetchMock.once(`${endpoint}/2`, response1);
    // Second call will take longer.
    fetchMock.mock("*", response2, {
      delay: 5,
    });
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      const updatePromise1 = result.current.update(updateValue);
      const updatePromise2 = result.current.update(updateValue);
      await updatePromise1;
      expect(result.current.values[2]).toEqual(response1);
      expect(result.current.entityStatus[2]).toEqual("pending");
      await updatePromise2;
      expect(result.current.values[2]).toEqual(response2);
      expect(result.current.entityStatus[2]).toEqual("fulfilled");
    });
  });
  it("A successful update() will overwrite a previous error state", async () => {
    const initialValue = [
      { id: 1, name: "one" },
      { id: 2, name: "two" },
    ];
    const updateValue = { id: 2, name: "UPDATE two" };
    // First request fails, second succeeds
    fetchMock.putOnce(`${endpoint}/${updateValue.id}`, 404);
    fetchMock.mock("*", updateValue);
    const { result } = renderHook(() =>
      useResourceIndex(endpoint, { initialValue }),
    );
    await act(async () => {
      expect(result.current.update(updateValue)).rejects.toBeInstanceOf(
        FetchError,
      );
    });
    expect(result.current.entityStatus[2]).toBe("rejected");
    await act(async () => {
      await result.current.update(updateValue);
    });
    expect(result.current.entityStatus[2]).toBe("fulfilled");
    expect(result.current.values[2]).toEqual(updateValue);
  });
});

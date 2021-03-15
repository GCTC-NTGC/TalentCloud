import fetchMock from "fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { FetchError } from "../../helpers/httpRequests";
import useResourceIndex, { UNEXPECTED_FORMAT_ERROR } from "./indexResourceHook";
import { getId, hasKey, mapToObject } from "../../helpers/queries";

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

  describe("test initial state and initial fetch", () => {
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
    it("Can store multiple items with same id if keyFn is overridden", async () => {
      const initialValue = [
        { id: 1, type: "red", name: "one" },
        { id: 1, type: "blue", name: "two" },
      ];
      const responseValue = [
        { id: 1, type: "red", name: "one" },
        { id: 1, type: "blue", name: "two NEW" },
      ];
      const keyFn = (item: any) => `${item.type}-${item.id}`;
      fetchMock.once("*", responseValue);
      const { result, waitForNextUpdate } = renderHook(() =>
        useResourceIndex(endpoint, {
          initialValue,
          keyFn,
          forceInitialRefresh: true,
        }),
      );
      expect(result.current.values).toEqual({
        "red-1": initialValue[0],
        "blue-1": initialValue[1],
      });
      await waitForNextUpdate({ timeout: false });
      expect(result.current.values).toEqual({
        "red-1": responseValue[0],
        "blue-1": responseValue[1],
      });
    });
  });
  describe("test refresh callback", () => {
    it("refresh() triggers a GET request to endpoint and sets status to 'pending'", async () => {
      fetchMock.getOnce(endpoint, []);
      const { result, waitForNextUpdate } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue: [] }),
      );
      expect(result.current.indexStatus).toBe("initial");
      await act(async () => {
        result.current.refresh();
        await waitForNextUpdate({ timeout: false });
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
        await expect(result.current.refresh()).rejects.toBeInstanceOf(
          FetchError,
        );
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
        await expect(result.current.refresh()).rejects.toBeInstanceOf(
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
      expect(
        initialError.message.startsWith("invalid json response body"),
      ).toBe(true);
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
        await waitForNextUpdate({ timeout: false });
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
  });
  describe("test create callback", () => {
    it("create() changes createStatus from initial to pending, and to fulfilled when it completes", async () => {
      fetchMock.mock("*", { id: 1, name: "one" });
      const { result, waitForNextUpdate } = renderHook(() =>
        useResourceIndex<TestResource>(endpoint, { initialValue: [] }),
      );
      expect(result.current.createStatus).toBe("initial");
      await act(async () => {
        result.current.create({ id: 0, name: "one" });
        await waitForNextUpdate({ timeout: false });
        expect(result.current.createStatus).toBe("pending");
        await waitForNextUpdate();
        expect(result.current.createStatus).toBe("fulfilled");
      });
    });
    it("create() triggers a POST request to endpoint", async () => {
      fetchMock.postOnce(endpoint, { id: 1, name: "one" });
      const { result } = renderHook(() =>
        useResourceIndex<TestResource>(endpoint, { initialValue: [] }),
      );
      await act(async () => {
        await result.current.create({ id: 0, name: "one" });
      });
      expect(fetchMock.called()).toBe(true);
    });
    it("If resolveCreateEndpoint is set, create() triggers a POST request to the resulting endpoint", async () => {
      const resolveCreateEndpoint = (baseEndpoint, newEntity) =>
        `${baseEndpoint}/createTest/${newEntity.name}`;
      const newEntity = { id: 0, name: "one" };
      fetchMock.postOnce(resolveCreateEndpoint(endpoint, newEntity), {
        id: 1,
        name: "one",
      });
      const { result } = renderHook(() =>
        useResourceIndex<TestResource>(endpoint, {
          initialValue: [],
          resolveCreateEndpoint,
        }),
      );
      await act(async () => {
        await result.current.create(newEntity);
      });
      expect(fetchMock.called()).toBe(true);
    });
    it("create() returns fetch result and adds to values when it completes", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const createValue = { id: 0, name: "three" };
      // NOTE: The value returned from server may be slightly different from what we send it - likely a different id.
      const responseValue = { id: 3, name: "three" };
      fetchMock.postOnce(endpoint, responseValue);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        const createResponseValue = await result.current.create(createValue);
        expect(createResponseValue).toEqual(responseValue);
      });
      // Ensure the new value is the one returned from request, not what we tried to send.
      expect(result.current.values[3]).toEqual(responseValue);
    });
    it("create() rejects with an error (leaving values unchanged) when fetch returns a server error", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const createValue = { id: 3, name: "three" };
      fetchMock.postOnce("*", 404);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        await expect(result.current.create(createValue)).rejects.toBeInstanceOf(
          FetchError,
        );
      });
      // Values should be unchanged from initial values because create request failed, though createStatus should be different.
      expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
      expect(result.current.createStatus).toEqual("rejected");
    });
    it("when create() returns a server error, handleError is called", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const createValue = { id: 3, name: "three" };
      fetchMock.postOnce("*", 404);
      const handleError = jest.fn();
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, handleError }),
      );
      await act(async () => {
        await expect(result.current.create(createValue)).rejects.toBeInstanceOf(
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
    it("when create() triggers a Fetch error, it is handled correctly", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const createValue = { id: 3, name: "three" };
      fetchMock.postOnce("*", { throws: new Error("Failed to fetch") });
      const handleError = jest.fn();
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, handleError }),
      );
      await act(async () => {
        await expect(result.current.create(createValue)).rejects.toBeInstanceOf(
          Error,
        );
      });

      // Values should be unchanged from initial values because create request failed, though createStatus should be different.
      expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
      expect(result.current.createStatus).toEqual("rejected");

      // handleError was called once on initial fetch.
      expect(handleError.mock.calls.length).toBe(1);
      // Get error from argument to mocked function.
      const initialError = handleError.mock.calls[0][0];
      expect(initialError).toBeInstanceOf(Error);
      expect(initialError.message).toBe("Failed to fetch");
    });
    it("when create() returns invalid JSON, error is handled correctly", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const createValue = { id: 3, name: "three" };
      fetchMock.postOnce("*", "This response is not JSON");
      const handleError = jest.fn();
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, handleError }),
      );
      await act(async () => {
        await expect(result.current.create(createValue)).rejects.toBeInstanceOf(
          Error,
        );
      });

      // Values should be unchanged from initial values because create request failed, though createStatus should be different.
      expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
      expect(result.current.createStatus).toEqual("rejected");

      // handleError was called once on initial fetch.
      expect(handleError.mock.calls.length).toBe(1);
      // Get error from argument to mocked function.
      const initialError = handleError.mock.calls[0][0];
      expect(initialError).toBeInstanceOf(Error);
      expect(
        initialError.message.startsWith("invalid json response body"),
      ).toBe(true);
    });
    it("when create() returns an object with an id which already exists in values, that object is updated", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const duplicateValue = { id: 2, name: "UPDATED two" };
      fetchMock.postOnce("*", duplicateValue);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        await result.current.create(duplicateValue);
      });
      expect(result.current.values[2]).toEqual(duplicateValue);
      expect(result.current.createStatus).toEqual("fulfilled");
    });
    it("If multiple create requests are started, createStatus remains pending until all are complete", async () => {
      const createOne = { id: 0, name: "one" };
      const createTwo = { id: 0, name: "two" };
      // NOTE: The value returned from server may be slightly different from what we send it - likely a different id.
      fetchMock.postOnce(endpoint, createOne);
      fetchMock.post("*", createTwo, { delay: 5 });
      const { result } = renderHook(() =>
        useResourceIndex<TestResource>(endpoint, { initialValue: [] }),
      );
      await act(async () => {
        const createPromise1 = result.current.create(createOne);
        const createPromise2 = result.current.create(createTwo);
        await createPromise1;
        expect(result.current.values).toEqual(arrayToIndexedObj([createOne]));
        expect(result.current.createStatus).toEqual("pending");
        await createPromise2;
        expect(result.current.values).toEqual(
          arrayToIndexedObj([createOne, createTwo]),
        );
        expect(result.current.createStatus).toEqual("fulfilled");
      });
    });
    it("A successful create() will overwrite a previous error state", async () => {
      const createOne = { id: 0, name: "one" };
      const createTwo = { id: 0, name: "two" };
      // NOTE: The value returned from server may be slightly different from what we send it - likely a different id.
      fetchMock.postOnce(endpoint, 404);
      fetchMock.post("*", createTwo, { delay: 5 });
      const { result } = renderHook(() =>
        useResourceIndex<TestResource>(endpoint, { initialValue: [] }),
      );
      await act(async () => {
        await expect(result.current.create(createOne)).rejects.toThrow();
        expect(result.current.values).toEqual({});
        expect(result.current.createStatus).toEqual("rejected");
        await result.current.create(createTwo);
        expect(result.current.values).toEqual(arrayToIndexedObj([createTwo]));
        expect(result.current.createStatus).toEqual("fulfilled");
      });
    });
    it("Can store new item at correct key if keyFn is overridden", async () => {
      const createValue = { id: 1, type: "red", name: "one" };
      const keyFn = (item: any) => `${item.type}-${item.id}`;
      fetchMock.once("*", createValue);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue: [], keyFn }),
      );
      expect(result.current.values).toEqual({});
      await act(async () => {
        await result.current.create(createValue);
      });
      expect(result.current.values).toEqual({
        "red-1": createValue,
      });
    });
  });
  describe("test update callback", () => {
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
        await waitForNextUpdate({ timeout: false });
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
      const resolveEntityEndpoint = (baseEndpoint, entity) =>
        `${baseEndpoint}/resolveEntityTest/${entity.id}`;
      fetchMock.putOnce(
        resolveEntityEndpoint(endpoint, updateValue),
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
    it("when update() triggers a Fetch error, error is handled correctly", async () => {
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
    it("when update() is called with an object whose id doesn't exist yet, state is unchanged until update request is fulfilled", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const newValue = { id: 3, name: "three" };
      fetchMock.putOnce("*", newValue);
      const { result, waitForNextUpdate } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        result.current.update(newValue);
        await waitForNextUpdate({ timeout: false });
        expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
        await waitForNextUpdate();
        expect(result.current.values[3]).toEqual(newValue);
        expect(result.current.entityStatus[3]).toEqual("fulfilled");
      });
    });
    it("when update() returns invalid JSON, error is handled correctly", async () => {
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
      expect(
        initialError.message.startsWith("invalid json response body"),
      ).toBe(true);
    });
    it("when update() returns an object with no id, error is handled correctly", async () => {
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
    it("Will update the correct value if keyFn is overridden", async () => {
      const initialValue = [
        { id: 1, type: "red", name: "one" },
        { id: 1, type: "blue", name: "two" },
      ];
      const responseValue = { id: 1, type: "blue", name: "NEW one" };
      const keyFn = (item: any) => `${item.type}-${item.id}`;
      fetchMock.once("*", responseValue);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, keyFn }),
      );
      expect(result.current.values).toEqual({
        "red-1": initialValue[0],
        "blue-1": initialValue[1],
      });
      await act(async () => {
        await result.current.update(responseValue);
      });
      expect(result.current.values).toEqual({
        "red-1": initialValue[0],
        "blue-1": responseValue,
      });
    });
  });
  describe("test deleteResource callback", () => {
    it("deleteResource() changes status of specific entity from initial to pending. Status and value are removed when it completes.", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      fetchMock.mock("*", 200, { delay: 5 });
      const { result, waitForNextUpdate } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      expect(result.current.entityStatus[2]).toEqual("initial");
      expect(result.current.entityStatus[1]).toEqual("initial");
      expect(result.current.indexStatus).toEqual("initial");
      await act(async () => {
        result.current.deleteResource({ id: 2, name: "two" });
        await waitForNextUpdate();
        expect(result.current.entityStatus[2]).toEqual("pending");
        expect(result.current.entityStatus[1]).toEqual("initial");
        expect(result.current.indexStatus).toEqual("initial");
        await waitForNextUpdate();
        expect(hasKey(result.current.entityStatus, 2)).toBe(false);
        expect(hasKey(result.current.values, 2)).toBe(false);
        expect(result.current.entityStatus[1]).toEqual("initial");
        expect(result.current.indexStatus).toEqual("initial");
      });
    });
    it("deleteResource() triggers a DELETE request to endpoint with id appended", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      fetchMock.deleteOnce(`${endpoint}/2`, 200);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        await result.current.deleteResource({ id: 2, name: "two" });
      });
      expect(fetchMock.called()).toBe(true);
    });
    it("If resolveEntityEndpoint is set, deleteResource() triggers a DELETE request to resulting endpoint", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const resolveEntityEndpoint = (baseEndpoint, entity) =>
        `${baseEndpoint}/resolveEntityTest/${entity.id}`;
      fetchMock.deleteOnce(
        resolveEntityEndpoint(endpoint, { id: 2, name: "two" }),
        200,
      );
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, resolveEntityEndpoint }),
      );
      await act(async () => {
        await result.current.deleteResource({ id: 2, name: "two" });
      });
      expect(fetchMock.called()).toBe(true);
    });
    it("deleteResource() resolves when entity is removed from values", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      fetchMock.mock("*", 200, { delay: 5 });
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        await result.current.deleteResource({ id: 2, name: "two" });
        expect(hasKey(result.current.entityStatus, 2)).toBe(false);
        expect(hasKey(result.current.values, 2)).toBe(false);
      });
    });
    it("deleteResource() rejects with an error (leaving values unchanged) when fetch returns a server error", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      fetchMock.deleteOnce("*", 404);
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        await expect(
          result.current.deleteResource({ id: 2, name: "two" }),
        ).rejects.toBeInstanceOf(FetchError);
      });
      expect(result.current.values).toEqual(arrayToIndexedObj(initialValue));
      expect(result.current.entityStatus[2]).toEqual("rejected");
    });
    it("when deleteResource() returns a server error, handleError is called", async () => {
      fetchMock.deleteOnce("*", 500);
      const handleError = jest.fn();
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, handleError }),
      );
      await act(async () => {
        await expect(
          result.current.deleteResource({ id: 2, name: "two" }),
        ).rejects.toBeInstanceOf(FetchError);
      });
      // handleError was called once on initial fetch.
      expect(handleError.mock.calls.length).toBe(1);
      // Get error from argument to mocked function.
      const initialError = handleError.mock.calls[0][0];
      expect(initialError).toBeInstanceOf(FetchError);
      expect(initialError.response.status).toBe(500);
    });
    it("when deleteResource() triggers a Fetch error, handleError is called", async () => {
      fetchMock.deleteOnce("*", { throws: new Error("Failed to fetch") });
      const handleError = jest.fn();
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue, handleError }),
      );
      await act(async () => {
        await expect(
          result.current.deleteResource({ id: 2, name: "two" }),
        ).rejects.toBeInstanceOf(Error);
      });
      // handleError was called once on initial fetch.
      expect(handleError.mock.calls.length).toBe(1);
      // Get error from argument to mocked function.
      const initialError = handleError.mock.calls[0][0];
      expect(initialError).toBeInstanceOf(Error);
      expect(initialError).toEqual(new Error("Failed to fetch"));
    });
    it("if deleteResource() is called multiple times on the same id, status should remain pending until one succeeds. Later callbacks should not change values.", async () => {
      const initialValue = [
        { id: 1, name: "one" },
        { id: 2, name: "two" },
      ];
      // First call will fail, subsequent calls will succeed.
      fetchMock.deleteOnce(`${endpoint}/2`, 500);
      fetchMock.delete("*", 200, { delay: 5 });
      const { result } = renderHook(() =>
        useResourceIndex(endpoint, { initialValue }),
      );
      await act(async () => {
        const deletePromise1 = result.current.deleteResource({
          id: 2,
          name: "two",
        });
        const deletePromise2 = result.current.deleteResource({
          id: 2,
          name: "two",
        });
        const deletePromise3 = result.current.deleteResource({
          id: 2,
          name: "two",
        });
        await expect(deletePromise1).rejects.toThrow();
        expect(result.current.entityStatus[2]).toBe("pending");
        await deletePromise2;
        const expectValue = { 1: { id: 1, name: "one" } };
        expect(result.current.values).toEqual(expectValue);
        await deletePromise3;
        expect(result.current.values).toEqual(expectValue);
      });
    });
  });
});

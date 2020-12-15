import fetchMock from "fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import useResource from "./singleResourceHook";
import { FetchError } from "../../helpers/httpRequests";

describe("singleResourceHook", () => {
  afterEach((): void => {
    fetchMock.reset();
    fetchMock.restore();
  });

  const endpoint = "https://talent.test/api/test";

  it("Initially returns initialValue and a status of 'pending'", () => {
    fetchMock.mock(
      "*",
      {},
      {
        delay: 10,
      },
    );
    const initialValue = { name: "Talent Cloud", age: 3 };
    const parseResponse = () => ({ name: "Talent Cloud 2", age: 100 }); // Note this is different from initialValue

    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, { parseResponse }),
    );

    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("pending");
  });
  it("Returns new value and status of 'fulfilled' after initial fetch succeeds", async () => {
    fetchMock.mock(
      "*",
      {},
      {
        delay: 10,
      },
    );
    const initialValue = { name: "Talent Cloud", age: 3 };
    const newValue = { name: "Talent Cloud 2", age: 100 };
    const parseResponse = () => newValue;

    const { result, waitFor } = renderHook(() =>
      useResource(endpoint, initialValue, { parseResponse }),
    );
    expect(result.current.status).toEqual("pending");
    await waitFor(
      () => {
        return result.current.status === "fulfilled";
      },
      { timeout: 1000 },
    );
    expect(result.current.status).toEqual("fulfilled");
    expect(result.current.value).toEqual(newValue);
  });
  it("Setting skipInitialFetch option stops initial fetch from happening", () => {
    fetchMock.mock("*", {});
    const initialValue = { name: "Talent Cloud", age: 3 };
    const parseResponse = () => ({ name: "Talent Cloud 2", age: 100 });
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, {
        parseResponse,
        skipInitialFetch: true,
      }),
    );
    expect(fetchMock.called()).toBe(false);
    expect(result.current.status).toEqual("initial");
  });
  it("parseResponse transforms values returns by requests, if set",async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    const updateValue = { name: "Talent Cloud 2", age: 100 };
    const parseResponse = (x) => ({
      ...x,
      age: x.age + 1,
    });
    fetchMock.getOnce(endpoint, initialValue);
    fetchMock.putOnce(endpoint, updateValue);
    const { result, waitFor } = renderHook(() =>
      useResource(endpoint, null, {
        parseResponse,
      }),
    );
    await waitFor(() => result.current.status === "fulfilled");
    expect(result.current.value).toEqual(parseResponse(initialValue));
    await act(async () => {
      result.current.update(updateValue);
      await waitFor(() => result.current.status === "fulfilled");
    })
    expect(result.current.value).toEqual(parseResponse(updateValue));

  });
  it("Status changes to 'pending' when refresh() is called", async () => {
    fetchMock.mock("*", {});
    const initialValue = { name: "Talent Cloud", age: 3 };
    const parseResponse = () => ({ name: "Talent Cloud 2", age: 100 });
    const { result, waitForNextUpdate } = renderHook(() =>
      useResource(endpoint, initialValue, {
        parseResponse,
        skipInitialFetch: true,
      }),
    );
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      result.current.refresh();
      await waitForNextUpdate();
      expect(result.current.status).toEqual("pending");
    });
  });
  it("refresh() triggers a GET request to endpoint", async () => {
    fetchMock.getOnce(endpoint, {});
    const { result } = renderHook(() =>
      useResource(endpoint, null, { skipInitialFetch: true }),
    );
    await act(async () => {
      await result.current.refresh();
    });
    expect(fetchMock.called()).toBe(true);
  })
  it("refresh() returns fetch result and updates hook value", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    const newValue = { name: "Talent Cloud 2", age: 100 };
    fetchMock.mock(endpoint, newValue);
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, { skipInitialFetch: true }),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      const refreshValue = await result.current.refresh();
      expect(refreshValue).toEqual(newValue);
    });
    expect(result.current.status).toEqual("fulfilled");
    expect(result.current.value).toEqual(newValue);
  });
  it("Returns an error and 'rejected' status when fetch returns a server error", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    fetchMock.once(endpoint, 404);
    const { result, waitForNextUpdate } = renderHook(() =>
      useResource(endpoint, initialValue),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("pending");
    await waitForNextUpdate();
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("rejected");
    expect(result.current.error instanceof FetchError).toBe(true);
  });
  it("refresh() rejects with an error when fetch returns a server error", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    fetchMock.once(endpoint, 404);
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, { skipInitialFetch: true }),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      await expect(result.current.refresh()).rejects.toBeInstanceOf(FetchError);
    });
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("rejected");
    expect(result.current.error instanceof FetchError).toBe(true);
  });
  it("If refresh() is called twice, and one request returns, status remains pending", async () => {
    fetchMock.once(endpoint, {},{
      delay: 10,
    });
    // Second call will take longer.
    fetchMock.mock("*", {},{
      delay: 20,
    });
    const { result } = renderHook(() =>
      useResource(endpoint, null, { skipInitialFetch: true }),
    );
    await act(async () => {
      const refreshPromise1 = result.current.refresh();
      const refreshPromise2 = result.current.refresh();
      await refreshPromise1;
      expect(result.current.status).toEqual("pending");
      await refreshPromise2;
      expect(result.current.status).toEqual("fulfilled");
    });
  });
  it("update() changes status to pending", async () => {
    fetchMock.mock("*", {});
    const { result, waitForNextUpdate } = renderHook(() =>
      useResource(endpoint, null, {
        skipInitialFetch: true,
      }),
    );
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      result.current.update(null);
      await waitForNextUpdate();
      expect(result.current.status).toEqual("pending");
    });
  });
  it("update() triggers a PUT request to endpoint", async () => {
    fetchMock.putOnce(endpoint, {});
    const { result } = renderHook(() =>
      useResource(endpoint, null, { skipInitialFetch: true }),
    );
    await act(async () => {
      await result.current.update(null);
    });
    expect(fetchMock.called()).toBe(true);
  })
  it("update() returns fetch result and updates hook value with value from response when it completes", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    const updateValue = { name: "Talent Cloud 2", age: 100 };
    // The value returned from server is slightly different from what we send it.
    const responseValue = {name: updateValue.name, age: updateValue.age + 1};
    fetchMock.mock(endpoint, responseValue);
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, { skipInitialFetch: true }),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      const updateResponseValue = await result.current.update(updateValue);
      expect(updateResponseValue).toEqual(responseValue);
    });
    // Ensure the new value is the one returned from request, not what we tried to send.
    expect(result.current.status).toEqual("fulfilled");
    expect(result.current.value).toEqual(responseValue);
  });
  it("update() rejects with an error when fetch returns a server error", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    const updateValue = { name: "Talent Cloud 2", age: 100 };
    fetchMock.once(endpoint, 404);
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, { skipInitialFetch: true }),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("initial");
    await act(async () => {
      await expect(result.current.update(updateValue)).rejects.toBeInstanceOf(FetchError);
    });
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("rejected");
    expect(result.current.error instanceof FetchError).toBe(true);
  });
  it("If multiple update requests are started, status remains pending until all are complete", async () => {
    fetchMock.once(endpoint, {},{
      delay: 10,
    });
    // Second call will take longer.
    fetchMock.mock("*", {},{
      delay: 20,
    });
    const { result } = renderHook(() =>
      useResource(endpoint, null, { skipInitialFetch: true }),
    );
    await act(async () => {
      const updatePromise1 = result.current.update(null);
      const updatePromise2 = result.current.update(null);
      await updatePromise1;
      expect(result.current.status).toEqual("pending");
      await updatePromise2;
      expect(result.current.status).toEqual("fulfilled");
    });
  });
  // it("handleError is called on any fetch errors, if its passed in", async () => {

  // });
});

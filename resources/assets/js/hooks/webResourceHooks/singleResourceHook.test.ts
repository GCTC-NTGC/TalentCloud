import fetchMock from "fetch-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import useResource from "./singleResourceHook";

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
        delay: 500,
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
        delay: 500,
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
  it("Status changes to 'updating' when refresh() is called", async () => {
    fetchMock.mock("*", {});
    const initialValue = { name: "Talent Cloud", age: 3 };
    const parseResponse = () => ({ name: "Talent Cloud 2", age: 100 });
    const { result } = renderHook(() =>
      useResource(endpoint, initialValue, {
        parseResponse,
        skipInitialFetch: true,
      }),
    );
    expect(result.current.status).toEqual("initial");
    act(() => {
      result.current.refresh();
    });
    expect(result.current.status).toEqual("pending");
  });
  it("refresh() returns fetch result and updates hook value", async () => {
    const initialValue = { name: "Talent Cloud", age: 3 };
    const newValue = { name: "Talent Cloud 2", age: 100 };
    fetchMock.mock(endpoint, newValue);
    const { result, waitForNextUpdate, waitFor } = renderHook(() =>
      useResource(endpoint, initialValue, { skipInitialFetch: true }),
    );
    expect(result.current.value).toEqual(initialValue);
    expect(result.current.status).toEqual("initial");
    // await act(async () => {
    //   result.current.refresh();
    //   await waitFor(() => result.current.status === "fulfilled");
    // });
    await act(async () => {
      const refreshValue = await result.current.refresh();
      expect(refreshValue).toEqual(newValue);
    });
    expect(result.current.status).toEqual("fulfilled");
    expect(result.current.value).toEqual(newValue);
  });
});

import fetchMock from "fetch-mock";
import { handleResponseWithoutData } from "./webResourceHooks";
import {
  handleResponse,
  handleResponseWithoutData,
} from "./webResourceHooks";

describe("webResourceHooks", (): void => {
  describe("handleResponseWithoutData", (): void => {
    it("should call handleError with a RequestError and then reject when a network error happens", async () => {
      expect.assertions(3);

      const error = new Error("Network request failed");
      const failedRequest: Promise<Response> = Promise.reject(error);

      const handleError = jest.fn();
      try {
        await handleResponseWithoutData(failedRequest, handleError);
      } catch (e) {
        // Test that handleResponseWithoutData rejects.
        expect(e).toBe(error);
      }
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(1);
      // Test that handleError was called with a RequestError.
      expect(handleError.mock.calls[0][0]).toEqual({
        error,
        type: "RequestError",
      });
    });
    it("should call handleError with an ApiError including the response, and then reject, when given a non-ok response", async () => {
      expect.assertions(3);

      const expectedError = new Error("Not found");
      const badResponse = new Response(null, {
        status: 404,
        statusText: "Not found",
      });
      const badRequest: Promise<Response> = Promise.resolve(badResponse);

      const handleError = jest.fn();
      try {
        await handleResponseWithoutData(badRequest, handleError);
      } catch (e) {
        // Test that handleResponseWithoutData rejects.
        expect(e).toEqual(expectedError);
      }
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(1);
      // Test that handleError was called with a RequestError.
      expect(handleError.mock.calls[0][0]).toEqual({
        error: expectedError,
        response: badResponse,
        type: "ApiError",
      });
    });
    it("should resolve, and not call handleError, when given a 200 response with no body.", async () => {
      const response = new Response(null, { status: 200 });
      const request: Promise<Response> = Promise.resolve(response);
      const handleError = jest.fn();
      await handleResponseWithoutData(request, handleError);
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(0);
    });
  });

  describe("handleResponse", (): void => {
    it("should call handleError with a RequestError and then reject when a network error happens", async () => {
      expect.assertions(3);

      const error = new Error("Network request failed");
      const failedRequest: Promise<Response> = Promise.reject(error);

      const handleError = jest.fn();
      try {
        await handleResponse(failedRequest, () => {}, handleError);
      } catch (e) {
        // Test that handleResponseWithoutData rejects.
        expect(e).toBe(error);
      }
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(1);
      // Test that handleError was called with a RequestError.
      expect(handleError.mock.calls[0][0]).toEqual({
        error,
        type: "RequestError",
      });
    });
    it("should call handleError with an ApiError including the response, and then reject, when given a non-ok response", async () => {
      expect.assertions(3);

      const expectedError = new Error("Not found");
      const badResponse = new Response(null, {
        status: 404,
        statusText: "Not found",
      });
      const badRequest: Promise<Response> = Promise.resolve(badResponse);

      const handleError = jest.fn();
      try {
        await handleResponse(badRequest, () => {}, handleError);
      } catch (e) {
        // Test that handleResponseWithoutData rejects.
        expect(e).toEqual(expectedError);
      }
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(1);
      // Test that handleError was called with a RequestError.
      expect(handleError.mock.calls[0][0]).toEqual({
        error: expectedError,
        response: badResponse,
        type: "ApiError",
      });
    });
    it("should call handleError with a ParseError, and then reject, when given a 200 response but no body.", async () => {
      expect.assertions(3);
      const expectedError = new Error(
        "invalid json response body at  reason: Unexpected end of JSON input",
      );
      expectedError.name = "FetchError";
      const emptyResponse = new Response(null, { status: 200 });
      const emptyRequest: Promise<Response> = Promise.resolve(emptyResponse);
      const handleError = jest.fn();
      try {
        await handleResponse(emptyRequest, () => {}, handleError);
      } catch (e) {
        // Test that handleResponseWithoutData rejects.
        expect(e).toEqual(expectedError);
      }
      // Test that handleError was called once.
      expect(handleError.mock.calls.length).toBe(1);
      // Test that handleError was called with a RequestError.
      expect(handleError.mock.calls[0][0]).toEqual({
        error: expectedError,
        response: emptyResponse,
        type: "ParseError",
      });
    });
    it("should resolve with result of parseResponse, and not call handleError, when given a 200 response with a body.", async () => {
      const response = new Response(JSON.stringify({ result: 2 }));
      const parseResponse = (r) => ({ newResult: r.result * 2 });
      const expectedResult = { newResult: 4 };
      const request: Promise<Response> = Promise.resolve(response);
      const handleError = jest.fn();
      const result = await handleResponse(request, parseResponse, handleError);
      expect(handleError.mock.calls.length).toBe(0);
      expect(result).toEqual(expectedResult);
    });
  });

});

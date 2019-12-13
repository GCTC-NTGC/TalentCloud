import configureMockStore from "redux-mock-store";
import { apiMiddleware, ApiError } from "redux-api-middleware";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import {
  fetchJob,
  FETCH_JOB_STARTED,
  FETCH_JOB_SUCCEEDED,
  FETCH_JOB_FAILED,
  UPDATE_JOB_STARTED,
  UPDATE_JOB_SUCCEEDED,
  UPDATE_JOB_FAILED,
  updateJob,
} from "./jobActions";
import { getJobEndpoint } from "../../api/job";
import { initState } from "../store";
import { fakeJob, fakeCriterion } from "../../fakeData/fakeJob";

describe("async job actions", (): void => {
  const middlewares = [thunk, apiMiddleware];
  const mockStore = configureMockStore(middlewares);

  // If we have several tests in our test suit, we might want to
  // reset and restore the mocks after each test to avoid unexpected behaviors
  afterEach((): void => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it("sanity test: fetch should be successfully mocked", (): Promise<void> => {
    fetchMock.getOnce(getJobEndpoint(1), {
      body: {},
      headers: { "content-type": "application/json" },
    });
    expect.assertions(2);
    return fetch(getJobEndpoint(1)).then((res): void => {
      expect(fetchMock.calls().length).toEqual(1);
      expect(res.status).toEqual(200);
    });
  });

  describe("FETCH_JOB actions", (): void => {
    it("should dispatch FETCH_JOB_STARTED when fetchJob is called and FETCH_JOB_SUCCEEDED when request succeeds", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      // The mocked response
      const jobId = 1;
      const job = fakeJob(jobId);
      const criterion = fakeCriterion(jobId);
      const body = {
        ...job,
        criteria: [criterion],
      };

      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.getOnce(getJobEndpoint(jobId), {
        body,
        headers: { "content-type": "application/json" },
      });
      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: FETCH_JOB_STARTED, meta: { id: jobId } },
        {
          type: FETCH_JOB_SUCCEEDED,
          payload: { job, criteria: [criterion] },
          meta: { id: jobId },
        },
      ];
      const fetchJobAction = fetchJob(jobId);

      expect.assertions(1);
      return store.dispatch(fetchJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it("should dispatch FETCH_JOB_FAILED when request returns non-200 status.", (): Promise<
      void
    > => {
      const store = mockStore(initState());

      const jobId = 1;

      const response = {
        status: 404,
      };
      fetchMock.getOnce(getJobEndpoint(jobId), response);
      const expectedActions = [
        { type: FETCH_JOB_STARTED, meta: { id: jobId } },
        {
          type: FETCH_JOB_FAILED,
          meta: { id: jobId },
          error: true,
          payload: new ApiError(404, "Not Found", response),
        },
      ];
      const fetchJobAction = fetchJob(jobId);

      expect.assertions(1);
      return store.dispatch(fetchJobAction).then((): void => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("UPDATE_JOB actions", (): void => {
    it("should dispatch UPDATE_JOB_SUCCEEDED when request succeeds", (): Promise<
      void
    > => {
      const store = mockStore(initState());

      const jobId = 1;
      const job = fakeJob(jobId);

      fetchMock.put(getJobEndpoint(jobId), {
        body: job,
        headers: { "content-type": "application/json" },
      });
      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: UPDATE_JOB_STARTED, meta: { id: jobId } },
        {
          type: UPDATE_JOB_SUCCEEDED,
          payload: job,
          meta: { id: jobId },
        },
      ];
      const updateJobAction = updateJob(job);

      expect.assertions(1);
      return store.dispatch(updateJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("should dispatch UPDATE_JOB_FAILED when request returns non-200 status.", (): Promise<
      void
    > => {
      const store = mockStore(initState());

      const jobId = 1;
      const response = {
        status: 404,
      };
      fetchMock.put(getJobEndpoint(jobId), response);
      const expectedActions = [
        { type: UPDATE_JOB_STARTED, meta: { id: jobId } },
        {
          type: UPDATE_JOB_FAILED,
          meta: { id: jobId },
          error: true,
          payload: new ApiError(404, "Not Found", response),
        },
      ];
      const updateJobAction = updateJob(fakeJob(jobId));

      expect.assertions(1);
      return store.dispatch(updateJobAction).then((): void => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

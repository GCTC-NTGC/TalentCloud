import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import fetchMock = require("fetch-mock");
import { initState } from "../store";
import { getHrAdvisorEndpoint, getClaimJobEndpoint } from "../../api/hrAdvisor";
import {
  getHrAdvisor,
  GET_HR_ADVISOR_STARTED,
  GET_HR_ADVISOR_SUCCEEDED,
  GET_HR_ADVISOR_FAILED,
  claimJob,
  CLAIM_JOB_STARTED,
  CLAIM_JOB_FAILED,
  CLAIM_JOB_SUCCEEDED,
  UNCLAIM_JOB_STARTED,
  UNCLAIM_JOB_SUCCEEDED,
  unclaimJob,
  UNCLAIM_JOB_FAILED,
} from "./hrAdivsorActions";

describe("async hrAdvisor actions", (): void => {
  const middlewares = [thunk, apiMiddleware];
  const mockStore = configureMockStore(middlewares);

  // If we have several tests in our test suit, we might want to
  // reset and restore the mocks after each test to avoid unexpected behaviors
  afterEach((): void => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe("GET_HR_ADVISOR actions", (): void => {
    it("Should dispatch GET_HR_ADVISOR_STARTED when first called, and GET_HR_ADVISOR_SUCCEEDED when request succeeds", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;

      // The mocked response
      const body = {
        status: "ok",
      };
      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.getOnce(getHrAdvisorEndpoint(hrAdvisorId), {
        body,
        headers: { "content-type": "application/json" },
      });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: GET_HR_ADVISOR_STARTED, meta: { id: hrAdvisorId } },
        {
          type: GET_HR_ADVISOR_SUCCEEDED,
          meta: { id: hrAdvisorId },
        },
      ];

      const getAdvisorAction = getHrAdvisor(hrAdvisorId);

      expect.assertions(1);
      return store.dispatch(getAdvisorAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
    it("Should dispatch GET_HR_ADVISOR_FAILED when request returns non-200 status", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;

      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.getOnce(getHrAdvisorEndpoint(hrAdvisorId), { status: 403 });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: GET_HR_ADVISOR_STARTED, meta: { id: hrAdvisorId } },
        {
          type: GET_HR_ADVISOR_FAILED,
          meta: { id: hrAdvisorId },
        },
      ];

      const getAdvisorAction = getHrAdvisor(hrAdvisorId);

      expect.assertions(1);
      return store.dispatch(getAdvisorAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
  describe("CLAIM_JOB actions", (): void => {
    it("Should dispatch CLAIM_JOB_STARTED when first called, and CLAIM_JOB_SUCCEEDED when request succeeds", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;
      const jobId = 1;

      // The mocked response
      const body = {
        status: "ok",
      };
      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.putOnce(getClaimJobEndpoint(hrAdvisorId, jobId), {
        body,
        headers: { "content-type": "application/json" },
      });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: CLAIM_JOB_STARTED, meta: { hrAdvisorId, jobId } },
        {
          type: CLAIM_JOB_SUCCEEDED,
          meta: { hrAdvisorId, jobId },
        },
      ];

      const claimJobAction = claimJob(hrAdvisorId, jobId);

      expect.assertions(1);
      return store.dispatch(claimJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
    it("Should dispatch CLAIM_JOB_FAILED when request returns non-200 status", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;
      const jobId = 1;

      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.putOnce(getClaimJobEndpoint(hrAdvisorId, jobId), {
        status: 403,
      });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: CLAIM_JOB_STARTED, meta: { hrAdvisorId, jobId } },
        {
          type: CLAIM_JOB_FAILED,
          meta: { hrAdvisorId, jobId },
        },
      ];

      const claimJobAction = claimJob(hrAdvisorId, jobId);

      expect.assertions(1);
      return store.dispatch(claimJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
  describe("UNCLAIM_JOB actions", (): void => {
    it("Should dispatch UNCLAIM_JOB_STARTED when first called, and UNCLAIM_JOB_SUCCEEDED when request succeeds", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;
      const jobId = 1;

      // The mocked response
      const body = {
        status: "ok",
      };
      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.deleteOnce(getClaimJobEndpoint(hrAdvisorId, jobId), {
        body,
        headers: { "content-type": "application/json" },
      });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: UNCLAIM_JOB_STARTED, meta: { hrAdvisorId, jobId } },
        {
          type: UNCLAIM_JOB_SUCCEEDED,
          meta: { hrAdvisorId, jobId },
        },
      ];

      const unclaimJobAction = unclaimJob(hrAdvisorId, jobId);

      expect.assertions(1);
      return store.dispatch(unclaimJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
    it("Should dispatch UNCLAIM_JOB_FAILED when request returns non-200 status", (): Promise<
      void
    > => {
      // We create a mock store for our test data.
      const store = mockStore(initState());

      const hrAdvisorId = 1;
      const jobId = 1;

      // We build the mock for the fetch request.
      // beware that the url must match the action endpoint.
      fetchMock.deleteOnce(getClaimJobEndpoint(hrAdvisorId, jobId), {
        status: 403,
      });

      // We are going to verify the response with the following actions
      const expectedActions = [
        { type: UNCLAIM_JOB_STARTED, meta: { hrAdvisorId, jobId } },
        {
          type: UNCLAIM_JOB_FAILED,
          meta: { hrAdvisorId, jobId },
        },
      ];

      const unclaimJobAction = unclaimJob(hrAdvisorId, jobId);

      expect.assertions(1);
      return store.dispatch(unclaimJobAction).then((): void => {
        // Verify that all the actions in the store are the expected ones
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });
});

import {
  initEntities,
  entitiesReducer,
  initUi,
  uiReducer,
} from "./hrAdvisorReducer";
import { fakeHrAdvisor } from "../../fakeData/fakeHrAdvisor";
import {
  GET_HR_ADVISOR_SUCCEEDED,
  GetHrAdvisorAction,
  ClaimJobAction,
  CLAIM_JOB_SUCCEEDED,
  UNCLAIM_JOB_SUCCEEDED,
  UnclaimJobAction,
  GET_HR_ADVISOR_STARTED,
  GET_HR_ADVISOR_FAILED,
  CLAIM_JOB_STARTED,
  UNCLAIM_JOB_STARTED,
  CLAIM_JOB_FAILED,
  UNCLAIM_JOB_FAILED,
} from "./hrAdivsorActions";

describe("HrAdvisor Reducer tests", (): void => {
  describe("EntitiesReducer", (): void => {
    it("Adds new job when GET_HR_ADVISOR_SUCCEEDED", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const newAdvisor = fakeHrAdvisor({ id: 2, claimed_job_ids: [2, 3, 4] });
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisors: {
          byId: {
            ...initialState.hrAdvisors.byId,
            [newAdvisor.id]: newAdvisor,
          },
        },
      };
      const action: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_SUCCEEDED,
        payload: newAdvisor,
        meta: { id: newAdvisor.id },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    it("Modifies existing hrAdvisor with same id when GET_HR_ADVISOR_SUCCEEDED", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const newAdvisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [2, 3, 4] });
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisors: {
          byId: { [newAdvisor.id]: newAdvisor },
        },
      };
      const action: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_SUCCEEDED,
        payload: newAdvisor,
        meta: { id: newAdvisor.id },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    it("Adds new jobId to claimed list for existing advisor when CLAIM_JOB_SUCCEEDED", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const jobId = 5;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisors: {
          byId: {
            [advisor.id]: {
              ...advisor,
              claimed_job_ids: [1,2,5],
            },
          },
        },
      };
      const action: ClaimJobAction = {
        type: CLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    it("Does not change state when CLAIM_JOB_SUCCEEDED but advisor had already claimed that job.", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const jobId = 2;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = initialState;
      const action: ClaimJobAction = {
        type: CLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    // TODO: This doesn't seem ideal, but its impossible to add a claim without the rest of the advisor data (at least with current implementation)
    it("Does not change state when CLAIM_JOB_SUCCEEDED but the advisor isn't yet stored in the state.", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const jobId = 10;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = initialState;
      const action: ClaimJobAction = {
        type: CLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id + 1, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });

    it("Removes jobId from claimed list for existing advisor when UNCLAIM_JOB_SUCCEEDED", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2, 3] });
      const jobId = 2;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisors: {
          byId: {
            [advisor.id]: {
              ...advisor,
              claimed_job_ids: [1, 3],
            },
          },
        },
      };
      const action: UnclaimJobAction = {
        type: UNCLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    it("Does not change state when UNCLAIM_JOB_SUCCEEDED but advisor had not already claimed that job.", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const jobId = 10;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = initialState;
      const action: UnclaimJobAction = {
        type: UNCLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
    it("Does not change state when UNCLAIM_JOB_SUCCEEDED but the advisor isn't yet stored in the state.", (): void => {
      const advisor = fakeHrAdvisor({ id: 1, claimed_job_ids: [1, 2] });
      const jobId = 10;
      const initialState = {
        ...initEntities(),
        hrAdvisors: {
          byId: { [advisor.id]: advisor },
        },
      };
      const expectState = initialState;
      const action: UnclaimJobAction = {
        type: UNCLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId: advisor.id + 1, jobId },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
  });
  describe("UiReducers", (): void => {
    it("Sets updating to true for new advisor when GET_HR_ADVISOR_STARTED", (): void => {
      const hrAdvisorId = 1;
      const initialState = initUi();
      const expectState = {
        ...initialState,
        hrAdvisorUpdating: {
          [hrAdvisorId]: true,
        },
      };
      const action: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_STARTED,
        meta: { id: hrAdvisorId },
      };
      expect(uiReducer(initialState, action)).toEqual(expectState);
    });
    it("Sets updating to true for existing advisor when GET_HR_ADVISOR_STARTED", (): void => {
      const hrAdvisorId = 1;
      const initialState = {
        ...initUi(),
        hrAdvisorUpdating: {
          [hrAdvisorId]: false,
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisorUpdating: {
          [hrAdvisorId]: true,
        },
      };
      const action: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_STARTED,
        meta: { id: hrAdvisorId },
      };
      expect(uiReducer(initialState, action)).toEqual(expectState);
    });
    it("Sets updating to false for new advisor when GET_HR_ADVISOR_SUCCEEDED or GET_HR_ADVISOR_FAILED", (): void => {
      const advisor = fakeHrAdvisor();
      const initialState = initUi();
      const expectState = {
        ...initialState,
        hrAdvisorUpdating: {
          [advisor.id]: false,
        },
      };
      const actionSucceed: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_SUCCEEDED,
        payload: advisor,
        meta: { id: advisor.id },
      };
      expect(uiReducer(initialState, actionSucceed)).toEqual(expectState);
      const actionFail: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_FAILED,
        payload: new Error(),
        error: true,
        meta: { id: advisor.id },
      };
      expect(uiReducer(initialState, actionFail)).toEqual(expectState);
    });
    it("Sets updating to false for an existing advisor when GET_HR_ADVISOR_SUCCEEDED or GET_HR_ADVISOR_FAILED", (): void => {
      const advisor = fakeHrAdvisor();
      const initialState = {
        ...initUi(),
        hrAdvisorUpdating: {
          [advisor.id]: true,
        },
      };
      const expectState = {
        ...initialState,
        hrAdvisorUpdating: {
          [advisor.id]: false,
        },
      };
      const actionSucceed: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_SUCCEEDED,
        payload: advisor,
        meta: { id: advisor.id },
      };
      const actionFail: GetHrAdvisorAction = {
        type: GET_HR_ADVISOR_FAILED,
        payload: new Error(),
        error: true,
        meta: { id: advisor.id },
      };
      expect(uiReducer(initialState, actionSucceed)).toEqual(expectState);
      expect(uiReducer(initialState, actionFail)).toEqual(expectState);
    });

    it("Sets updating to true for new job claim when CLAIM_JOB_STARTED or UNCLAIM_JOB_STARTED", (): void => {
      const hrAdvisorId = 1;
      const jobId = 99;
      const initialState = initUi();
      const expectState = {
        ...initialState,
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: true,
          },
        },
      };
      const actionClaim: ClaimJobAction = {
        type: CLAIM_JOB_STARTED,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionClaim)).toEqual(expectState);
      const actionUnclaim: UnclaimJobAction = {
        type: UNCLAIM_JOB_STARTED,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionUnclaim)).toEqual(expectState);
    });
    it("Sets updating to true for existing job claim when CLAIM_JOB_STARTED or UNCLAIM_JOB_STARTED", (): void => {
      const hrAdvisorId = 1;
      const jobId = 99;
      const initialState = {
        ...initUi(),
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: false,
          },
        },
      };
      const expectState = {
        ...initialState,
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: true,
          },
        },
      };
      const actionClaim: ClaimJobAction = {
        type: CLAIM_JOB_STARTED,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionClaim)).toEqual(expectState);
      const actionUnclaim: UnclaimJobAction = {
        type: UNCLAIM_JOB_STARTED,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionUnclaim)).toEqual(expectState);
    });
    it("Sets updating to false for new job claim when CLAIM_JOB_SUCCEEDED or UNCLAIM_JOB_SUCCEEDED or CLAIM_JOB_FAILED or UNCLAIM_JOB_FAILED", (): void => {
      const hrAdvisorId = 1;
      const jobId = 99;
      const initialState = initUi();
      const expectState = {
        ...initialState,
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: false,
          },
        },
      };
      const actionClaimSucceed: ClaimJobAction = {
        type: CLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId, jobId },
      };
      const actionClaimFail: ClaimJobAction = {
        type: CLAIM_JOB_FAILED,
        payload: new Error(),
        error: true,
        meta: { hrAdvisorId, jobId },
      };
      const actionUnclaimSucceed: UnclaimJobAction = {
        type: UNCLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId, jobId },
      };
      const actionUnclaimFail: UnclaimJobAction = {
        type: UNCLAIM_JOB_FAILED,
        payload: new Error(),
        error: true,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionClaimSucceed)).toEqual(expectState);
      expect(uiReducer(initialState, actionClaimFail)).toEqual(expectState);
      expect(uiReducer(initialState, actionUnclaimSucceed)).toEqual(expectState);
      expect(uiReducer(initialState, actionUnclaimFail)).toEqual(expectState);
    });
    it("Sets updating to false for new job claim when CLAIM_JOB_SUCCEEDED or UNCLAIM_JOB_SUCCEEDED or CLAIM_JOB_FAILED or UNCLAIM_JOB_FAILED", (): void => {
      const hrAdvisorId = 1;
      const jobId = 99;
      const initialState = {
        ...initUi(),
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: true,
          },
        },
      };
      const expectState = {
        ...initialState,
        jobClaimUpdating: {
          [hrAdvisorId]: {
            [jobId]: false,
          },
        },
      };
      const actionClaimSucceed: ClaimJobAction = {
        type: CLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId, jobId },
      };
      const actionClaimFail: ClaimJobAction = {
        type: CLAIM_JOB_FAILED,
        payload: new Error(),
        error: true,
        meta: { hrAdvisorId, jobId },
      };
      const actionUnclaimSucceed: UnclaimJobAction = {
        type: UNCLAIM_JOB_SUCCEEDED,
        payload: {},
        meta: { hrAdvisorId, jobId },
      };
      const actionUnclaimFail: UnclaimJobAction = {
        type: UNCLAIM_JOB_FAILED,
        payload: new Error(),
        error: true,
        meta: { hrAdvisorId, jobId },
      };
      expect(uiReducer(initialState, actionClaimSucceed)).toEqual(expectState);
      expect(uiReducer(initialState, actionClaimFail)).toEqual(expectState);
      expect(uiReducer(initialState, actionUnclaimSucceed)).toEqual(
        expectState,
      );
      expect(uiReducer(initialState, actionUnclaimFail)).toEqual(expectState);
    });
  });
});

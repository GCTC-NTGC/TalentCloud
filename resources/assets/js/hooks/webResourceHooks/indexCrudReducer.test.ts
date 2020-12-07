import indexCrudReducer, {
  ActionTypes,
  CreateFulfillAction,
  CreateRejectAction,
  CreateStartAction,
  IndexFulfillAction,
  IndexRejectAction,
  IndexStartAction,
  initializeState,
  ResourceState,
} from "./indexCrudReducer";

interface TestResource {
  id: number;
  name: string;
}

describe("indexCrudReducer tests", (): void => {
  describe("Test INDEX actions", () => {
    it("updates indexMeta in response to INDEX START", () => {
      const initialState = initializeState([]);
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: IndexStartAction = { type: ActionTypes.IndexStart };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("increments index pendingCount twice for two INDEX START actions", () => {
      const initialState = initializeState([]);
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "pending",
          pendingCount: 2,
          error: undefined,
        },
      };
      const action: IndexStartAction = { type: ActionTypes.IndexStart };
      const state1 = indexCrudReducer(initialState, action);
      const state2 = indexCrudReducer(state1, action);
      expect(state2).toEqual(expectState);
    });
    it("decrements pending count, updates status, and saves values when INDEX FULFILLED", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: IndexFulfillAction<TestResource> = {
        type: ActionTypes.IndexFulfill,
        payload: [
          { id: 1, name: "one" },
          { id: 2, name: "two" },
        ],
      };
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "fulfilled",
          pendingCount: 0,
          error: undefined,
        },
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "fulfilled",
            pendingCount: 0,
            error: undefined,
          },
          2: {
            value: { id: 2, name: "two" },
            status: "fulfilled",
            pendingCount: 0,
            error: undefined,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("INDEX FULFILLED overwrites item values and errors, but not pendingCount (and status if pending), if they already exist", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 2,
            error: undefined,
          },
          2: {
            value: { id: 2, name: "two" },
            status: "pending",
            pendingCount: 1,
            error: new Error("Something went wrong with a pretend request."),
          },
          3: {
            value: { id: 3, name: "three" },
            status: "rejected",
            pendingCount: 0,
            error: new Error("Something went wrong with a pretend request."),
          },
          4: {
            value: { id: 4, name: "four" },
            status: "initial",
            pendingCount: 0,
            error: undefined,
          },
        },
      };
      const action: IndexFulfillAction<TestResource> = {
        type: ActionTypes.IndexFulfill,
        payload: [
          { id: 1, name: "new one" },
          { id: 2, name: "new two" },
          { id: 3, name: "new three" },
          { id: 4, name: "new four" },
        ],
      };
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "fulfilled",
          pendingCount: 0,
          error: undefined,
        },
        values: {
          1: {
            ...initialState.values[1],
            value: { id: 1, name: "new one" },
          },
          2: {
            ...initialState.values[2],
            value: { id: 2, name: "new two" },
            error: undefined, // Overwrites error, but not pendingCount and pending status
          },
          3: {
            value: { id: 3, name: "new three" },
            status: "fulfilled", // Rejected status replaced with fulfilled
            pendingCount: 0,
            error: undefined,
          },
          4: {
            value: { id: 4, name: "new four" },
            status: "fulfilled", // Initial status replaced with fulfilled
            pendingCount: 0,
            error: undefined,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("INDEX FULFILLED deletes values not included in payload", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([
          { id: 1, name: "one" },
          { id: 2, name: "two" },
        ]),
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: IndexFulfillAction<TestResource> = {
        type: ActionTypes.IndexFulfill,
        payload: [{ id: 2, name: "new two" }],
      };
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "fulfilled",
          pendingCount: 0,
          error: undefined,
        },
        values: {
          2: {
            ...initialState.values[2],
            value: { id: 2, name: "new two" },
            status: "fulfilled",
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("INDEX REJECTED decrements pendingCount, sets status to rejected, and doesn't modify values", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([{ id: 1, name: "one" }]),
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: IndexRejectAction = {
        type: ActionTypes.IndexReject,
        payload: new Error("Something went wrong with a fake request"),
      };
      const expectState = {
        ...initialState,
        indexMeta: {
          status: "rejected",
          pendingCount: 0,
          error: action.payload,
        },
        // Values are unchanged
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("status remains 'pending' after INDEX FULFILLED and INDEX REJECTED if pendingCount was higher than 1", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        indexMeta: {
          status: "pending",
          pendingCount: 2,
          error: undefined,
        },
      };
      const fulfilledAction: IndexFulfillAction<TestResource> = {
        type: ActionTypes.IndexFulfill,
        payload: [],
      };
      const fulfilledState = {
        ...initialState,
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      expect(indexCrudReducer(initialState, fulfilledAction)).toEqual(
        fulfilledState,
      );
      const rejectedAction: IndexRejectAction = {
        type: ActionTypes.IndexReject,
        payload: new Error(),
      };
      const rejectedState = {
        ...initialState,
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: rejectedAction.payload,
        },
      };
      expect(indexCrudReducer(initialState, rejectedAction)).toEqual(
        rejectedState,
      );
    });
  });
  describe("Test CREATE actions", (): void => {
    it("CREATE START updates createMeta", () => {
      const initialState: ResourceState<TestResource> = initializeState([]);
      const expectState = {
        ...initialState,
        createMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: CreateStartAction<TestResource> = {
        type: ActionTypes.CreateStart,
        meta: { item: { id: 1, name: "one" } },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("two CREATE START actions increments pendingCount twice", () => {
      const initialState: ResourceState<TestResource> = initializeState([]);
      const expectState = {
        ...initialState,
        createMeta: {
          status: "pending",
          pendingCount: 2,
          error: undefined,
        },
      };
      const action: CreateStartAction<TestResource> = {
        type: ActionTypes.CreateStart,
        meta: { item: { id: 1, name: "one" } },
      };
      const state1 = indexCrudReducer(initialState, action);
      const state2 = indexCrudReducer(state1, action);
      expect(state2).toEqual(expectState);
    });
    it("CREATE FULFILLED decrements pending count, updates status, and saves new value", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        createMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: CreateFulfillAction<TestResource> = {
        type: ActionTypes.CreateFulfill,
        payload: { id: 1, name: "one" },
        meta: { item: { id: 0, name: "one" } },
      };
      const expectState = {
        ...initialState,
        createMeta: {
          status: "fulfilled",
          pendingCount: 0,
          error: undefined,
        },
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "fulfilled",
            pendingCount: 0,
            error: undefined,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("CREATE REJECTED decrements pendingCount, sets status to rejected, and doesn't modify values", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([{ id: 1, name: "one" }]),
        createMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: CreateRejectAction<TestResource> = {
        type: ActionTypes.CreateReject,
        payload: new Error("Something went wrong with a fake request"),
        meta: { item: { id: 0, name: "two" } },
      };
      const expectState = {
        ...initialState,
        createMeta: {
          status: "rejected",
          pendingCount: 0,
          error: action.payload,
        },
        // Values are unchanged
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("status remains 'pending' after CREATE FULFILLED and CREATE REJECTED if pendingCount was higher than 1", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        createMeta: {
          status: "pending",
          pendingCount: 2,
          error: undefined,
        },
      };
      const fulfilledAction: CreateFulfillAction<TestResource> = {
        type: ActionTypes.CreateFulfill,
        payload: { id: 1, name: "one" },
        meta: { item: { id: 0, name: "one" } },
      };
      const fulfilledState = indexCrudReducer(initialState, fulfilledAction);
      expect(fulfilledState.createMeta).toEqual({
        status: "pending",
        pendingCount: 1,
        error: undefined,
      });
      const rejectedAction: CreateRejectAction<TestResource> = {
        type: ActionTypes.CreateReject,
        payload: new Error(),
        meta: { item: { id: 0, name: "one" } },
      };
      const rejectedState = indexCrudReducer(initialState, rejectedAction);
      expect(rejectedState.createMeta).toEqual({
        status: "pending",
        pendingCount: 1,
        error: rejectedAction.payload,
      });
    });
  });
});

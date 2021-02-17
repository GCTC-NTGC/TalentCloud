import indexCrudReducer, {
  ActionTypes,
  CreateFulfillAction,
  CreateRejectAction,
  CreateStartAction,
  DeleteFulfillAction,
  DeleteRejectAction,
  DeleteStartAction,
  IndexFulfillAction,
  IndexRejectAction,
  IndexStartAction,
  initializeState,
  ResourceState,
  UpdateFulfillAction,
  UpdateRejectAction,
  UpdateStartAction,
} from "./indexCrudReducer";

interface TestResource {
  id: number;
  name: string;
}
function addKey<T extends { id: number }>(item: T): { item: T; key: string } {
  return {
    item,
    key: String(item.id),
  };
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
        ].map(addKey),
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
          error: new Error(),
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
        ].map(addKey),
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
        ...initializeState(
          [
            { id: 1, name: "one" },
            { id: 2, name: "two" },
          ].map(addKey),
        ),
        indexMeta: {
          status: "pending",
          pendingCount: 1,
          error: undefined,
        },
      };
      const action: IndexFulfillAction<TestResource> = {
        type: ActionTypes.IndexFulfill,
        payload: [{ id: 2, name: "new two" }].map(addKey),
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
        ...initializeState([{ id: 1, name: "one" }].map(addKey)),
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
    it("two CREATE START actions increment pendingCount twice", () => {
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
        payload: addKey({ id: 1, name: "one" }),
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
    it("CREATE FULFILLED overwrites an error", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        createMeta: {
          status: "pending",
          pendingCount: 1,
          error: new Error(),
        },
      };
      const action: CreateFulfillAction<TestResource> = {
        type: ActionTypes.CreateFulfill,
        payload: addKey({ id: 1, name: "one" }),
        meta: { item: { id: 0, name: "one" } },
      };
      expect(
        indexCrudReducer(initialState, action).createMeta.error,
      ).toBeUndefined();
    });
    it("CREATE REJECTED decrements pendingCount, sets status to rejected, and doesn't modify values", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([{ id: 1, name: "one" }].map(addKey)),
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
        payload: addKey({ id: 1, name: "one" }),
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
  describe("Test UPDATE actions", (): void => {
    it("UPDATE START updates item-specific metadata", () => {
      const initialState: ResourceState<TestResource> = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: UpdateStartAction<TestResource> = {
        type: ActionTypes.UpdateStart,
        meta: addKey({ id: 1, name: "one" }),
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("two UPDATE START actions increment pendingCount twice", () => {
      const initialState: ResourceState<TestResource> = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 2, // pendingCount is 2 this time
            error: undefined,
          },
        },
      };
      const action: UpdateStartAction<TestResource> = {
        type: ActionTypes.UpdateStart,
        meta: addKey({ id: 1, name: "one" }),
      };
      const state1 = indexCrudReducer(initialState, action);
      const state2 = indexCrudReducer(state1, action);
      expect(state2).toEqual(expectState);
    });
    it("UPDATE START overwrites an error status", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "rejected",
            pendingCount: 0,
            error: new Error(),
          },
        },
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 1,
            error: undefined, // Note the error has been erased after new request starts.
          },
        },
      };
      const action: UpdateStartAction<TestResource> = {
        type: ActionTypes.UpdateStart,
        meta: addKey({ id: 1, name: "one" }),
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("UPDATE FULFILLED decrements pending count, updates status, and updates value", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: UpdateFulfillAction<TestResource> = {
        type: ActionTypes.UpdateFulfill,
        payload: { id: 1, name: "NEW one" },
        meta: addKey({ id: 1, name: "NEW one" }),
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: action.payload,
            status: "fulfilled",
            pendingCount: 0,
            error: undefined,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("UPDATE FULFILLED does not change data for other values", () => {
      const initialState = initializeState(
        [
          { id: 1, name: "one" },
          { id: 2, name: "two" },
        ].map(addKey),
      );
      const action: UpdateFulfillAction<TestResource> = {
        type: ActionTypes.UpdateFulfill,
        payload: { id: 1, name: "NEW one" },
        meta: addKey({ id: 1, name: "NEW one" }),
      };
      const fulfilledState = indexCrudReducer(initialState, action);
      expect(fulfilledState.values[2]).toEqual(initialState.values[2]);
      expect(fulfilledState.values[1]).not.toEqual(initialState.values[1]);
    });
    it("UPDATE FULFILLED saves payload, not metadata, as new value in store", () => {
      const initialState = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const action: UpdateFulfillAction<TestResource> = {
        type: ActionTypes.UpdateFulfill,
        payload: { id: 1, name: "NEW one" },
        meta: addKey({ id: 1, name: "Doesn't matter what metadata value is" }),
      };
      const fulfilledState = indexCrudReducer(initialState, action);
      expect(fulfilledState.values[1].value).toEqual(action.payload);
      expect(fulfilledState.values[1].value).not.toEqual(action.meta.item);
    });
    it("UPDATE FULFILLED overwrites an error", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 1,
            error: new Error(),
          },
        },
      };
      const action: UpdateFulfillAction<TestResource> = {
        type: ActionTypes.UpdateFulfill,
        payload: { id: 1, name: "NEW one" },
        meta: addKey({ id: 1, name: "NEW one" }),
      };
      const fulfilledState = indexCrudReducer(initialState, action);
      expect(fulfilledState.values[1].error).toBeUndefined();
    });
    it("UPDATE REJECTED decrements pendingCount, sets status to rejected, and doesn't modify last value", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: UpdateRejectAction<TestResource> = {
        type: ActionTypes.UpdateReject,
        payload: new Error("Something went wrong with a fake request"),
        meta: addKey({ id: 1, name: "NEW one" }),
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "rejected",
            pendingCount: 0,
            error: action.payload,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("status remains 'pending' after UPDATE FULFILLED and UPDATE REJECTED if pendingCount was higher than 1", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 2,
            error: undefined,
          },
        },
      };
      const fulfilledAction: UpdateFulfillAction<TestResource> = {
        type: ActionTypes.UpdateFulfill,
        payload: { id: 1, name: "NEW one" },
        meta: addKey({ id: 1, name: "NEW one" }),
      };
      const fulfilledState = indexCrudReducer(initialState, fulfilledAction);
      expect(fulfilledState.values[1]).toEqual({
        value: fulfilledAction.payload,
        status: "pending",
        pendingCount: 1,
        error: undefined,
      });
      const rejectedAction: UpdateRejectAction<TestResource> = {
        type: ActionTypes.UpdateReject,
        payload: new Error(),
        meta: addKey({ id: 1, name: "one" }),
      };
      const rejectedState = indexCrudReducer(initialState, rejectedAction);
      expect(rejectedState.values[1]).toEqual({
        value: initialState.values[1].value,
        status: "pending",
        pendingCount: 1,
        error: rejectedAction.payload,
      });
    });
  });
  describe("Test DELETE actions", () => {
    it("DELETE START updates item-specific metadata", () => {
      const initialState: ResourceState<TestResource> = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: DeleteStartAction = {
        type: ActionTypes.DeleteStart,
        meta: { key: "1" },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("two DELETE START actions increment pendingCount twice", () => {
      const initialState: ResourceState<TestResource> = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 2, // pendingCount is 2 this time
            error: undefined,
          },
        },
      };
      const action: DeleteStartAction = {
        type: ActionTypes.DeleteStart,
        meta: { key: "1" },
      };
      const state1 = indexCrudReducer(initialState, action);
      const state2 = indexCrudReducer(state1, action);
      expect(state2).toEqual(expectState);
    });
    it("DELETE START overwrites an error status", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "rejected",
            pendingCount: 0,
            error: new Error(),
          },
        },
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: initialState.values[1].value,
            status: "pending",
            pendingCount: 1,
            error: undefined, // Note the error has been erased after new request starts.
          },
        },
      };
      const action: DeleteStartAction = {
        type: ActionTypes.DeleteStart,
        meta: { key: "1" },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("DELETE FULFILLED removes value entry entirely", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: DeleteFulfillAction = {
        type: ActionTypes.DeleteFulfill,
        meta: { key: "1" },
      };
      const expectState = {
        ...initialState,
        values: {},
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("DELETE FULFILLED doesn't affect other values", () => {
      const initialState = initializeState(
        [
          { id: 1, name: "one" },
          { id: 2, name: "two" },
        ].map(addKey),
      );
      const action: DeleteFulfillAction = {
        type: ActionTypes.DeleteFulfill,
        meta: { key: "1" },
      };
      const fulfilledState = indexCrudReducer(initialState, action);
      expect(fulfilledState.values[2]).toEqual(initialState.values[2]);
      expect(fulfilledState.values[1]).toBeUndefined();
    });
    it("DELETE FULFILLED doesn't change state (or throw error) if value doesn't exist", () => {
      const initialState = initializeState(
        [{ id: 1, name: "one" }].map(addKey),
      );
      const action: DeleteFulfillAction = {
        type: ActionTypes.DeleteFulfill,
        meta: { key: "5" },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(initialState);
    });
    it("DELETE REJECTED decrements pendingCount, sets status to rejected, and doesn't modify item value", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 1,
            error: undefined,
          },
        },
      };
      const action: DeleteRejectAction = {
        type: ActionTypes.DeleteReject,
        payload: new Error("Something went wrong"),
        meta: { key: "1" },
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "rejected",
            pendingCount: 0,
            error: action.payload,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
    it("status remains 'pending' after DELETE REJECTED if if pendingCount was higher than 1", () => {
      const initialState: ResourceState<TestResource> = {
        ...initializeState([]),
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 3,
            error: undefined,
          },
        },
      };
      const action: DeleteRejectAction = {
        type: ActionTypes.DeleteReject,
        payload: new Error("Something went wrong"),
        meta: { key: "1" },
      };
      const expectState = {
        ...initialState,
        values: {
          1: {
            value: { id: 1, name: "one" },
            status: "pending",
            pendingCount: 2,
            error: action.payload,
          },
        },
      };
      expect(indexCrudReducer(initialState, action)).toEqual(expectState);
    });
  });
});

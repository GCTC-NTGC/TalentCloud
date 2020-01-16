import { RootState, initState } from "../store";
import {
  initState as initHrAdvisor,
  initEntities,
  initUi,
} from "./hrAdvisorReducer";
import { fakeHrAdvisor } from "../../fakeData/fakeHrAdvisor";
import {
  getHrAdvisor,
  getHrAdvisorIsUpdating,
  getJobClaimIsUpdating,
} from "./hrAdvisorSelector";

describe("HrAdvisor Selectors", (): void => {
  describe("getHrAdvisor", (): void => {
    it("Returns the correct advisor, when it is present.", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          entities: {
            ...initEntities(),
            hrAdvisors: {
              byId: { [advisor.id]: advisor },
            },
          },
        },
      };
      expect(getHrAdvisor(state, { hrAdvisorId: advisor.id })).toEqual(advisor);
    });
    it("Returns the null when advisor is not present.", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          entities: {
            ...initEntities(),
            hrAdvisors: {
              byId: { [advisor.id]: advisor },
            },
          },
        },
      };
      // Search for a different advisor id
      expect(getHrAdvisor(state, { hrAdvisorId: advisor.id + 1 })).toEqual(
        null,
      );
    });
  });
  describe("getHrAdvisorIsUpdating", (): void => {
    it("should return true when advisor obj itself is updating.", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          ui: {
            ...initUi(),
            hrAdvisorUpdating: {
              [advisor.id]: true,
            },
          },
        },
      };
      expect(
        getHrAdvisorIsUpdating(state, { hrAdvisorId: advisor.id }),
      ).toEqual(true);
    });
    it("should return false when only a different advisor obj is updating.", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          ui: {
            ...initUi(),
            hrAdvisorUpdating: {
              [advisor.id]: true,
            },
          },
        },
      };
      expect(
        getHrAdvisorIsUpdating(state, { hrAdvisorId: advisor.id + 1 }),
      ).toEqual(false);
    });
    it("should return false when state is empty", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
      };
      expect(
        getHrAdvisorIsUpdating(state, { hrAdvisorId: advisor.id }),
      ).toEqual(false);
    });
    it("should return true when only a one of the advisor's job claims is updating", (): void => {
      const advisor = fakeHrAdvisor();
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          ui: {
            ...initUi(),
            jobClaimUpdating: {
              [advisor.id]: {
                1: false,
                2: false,
                3: true,
              },
            },
          },
        },
      };
      expect(
        getHrAdvisorIsUpdating(state, { hrAdvisorId: advisor.id }),
      ).toEqual(true);
    });
  });
  describe("getJobClaimIsUpdating", (): void => {
    it("should return true when claim is updating.", (): void => {
      const advisor = {
        id: 100,
      };
      const job = {
        id: 999,
      };
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          ui: {
            ...initUi(),
            jobClaimUpdating: {
              [advisor.id]: {
                [job.id]: true,
              },
            },
          },
        },
      };
      expect(
        getJobClaimIsUpdating(state, {
          hrAdvisorId: advisor.id,
          jobId: job.id,
        }),
      ).toEqual(true);
    });
    it("should return false when claim is not updating.", (): void => {
      const advisor = {
        id: 100,
      };
      const job = {
        id: 999,
      };
      const state: RootState = {
        ...initState(),
        hrAdvisor: {
          ...initHrAdvisor(),
          ui: {
            ...initUi(),
            jobClaimUpdating: {
              [advisor.id]: {
                [job.id]: false,
              },
            },
          },
        },
      };
      expect(
        getJobClaimIsUpdating(state, {
          hrAdvisorId: advisor.id,
          jobId: job.id,
        }),
      ).toEqual(false);
    });
    it("should return false when state is empty.", (): void => {
      const advisor = {
        id: 100,
      };
      const job = {
        id: 999,
      };
      const state: RootState = {
        ...initState(),
      };
      expect(
        getJobClaimIsUpdating(state, {
          hrAdvisorId: advisor.id,
          jobId: job.id,
        }),
      ).toEqual(false);
    });
  });
});

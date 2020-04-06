import { RootState, initState } from "../store";
import {
  initApplicationState,
  initEntities,
  initUi,
  EntityState,
} from "./applicationReducer";
import { getApplicationsByJob } from "./applicationSelector";
import {
  fakeApplication1,
  fakeApplication2,
} from "../../fakeData/fakeApplications";

describe("Application Selectors", (): void => {
  describe("getApplicationsByJob", (): void => {
    it("Returns empty list when no applications are present", (): void => {
      const state: RootState = initState();
      expect(getApplicationsByJob(state, { jobId: 1 })).toEqual([]);
    });
    it("Returns correct applications when they're only ones present", (): void => {
      const jobId = 7;
      const application1 = fakeApplication1({
        id: 1,
        job_poster_id: jobId,
      });
      const application2 = fakeApplication2({
        id: 5,
        job_poster_id: jobId,
      });
      const entityState: EntityState = {
        ...initEntities(),
        applications: {
          [application1.id]: application1,
          [application2.id]: application2,
        },
        applicationReviews: {
          byId: {
            ...(application1.application_review
              ? {
                  [application1.application_review.id]:
                    application1.application_review,
                }
              : {}),
            ...(application2.application_review
              ? {
                  [application2.application_review.id]:
                    application2.application_review,
                }
              : {}),
          },
          idByApplicationId: {
            ...(application1.application_review
              ? {
                  [application1.id]:
                    application1.application_review.id,
                }
              : {}),
            ...(application2.application_review
              ? {
                  [application2.id]:
                    application2.application_review.id,
                }
              : {}),
          },
        },
      };
      const state: RootState = {
        ...initState(),
        applications: {
          ...initApplicationState(),
          entities: entityState,
        },
      };
      expect(getApplicationsByJob(state, { jobId })).toEqual([
        application1,
        application2,
      ]);
    });
  });
});

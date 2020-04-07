import {
  initEntities,
  entitiesReducer,
  EntityState,
} from "./applicationReducer";
import {
  fakeApplication,
  fakeApplicationReview,
} from "../../fakeData/fakeApplications";
import { initStateWithApplications } from "./applicationSelector.test";
import {
  FetchApplicationAction,
  FETCH_APPLICATION_SUCCEEDED,
} from "./applicationActions";

describe("applicationReducer tests", (): void => {
  describe("EntitiesReducer", (): void => {
    it("Splits fetched application into ApplicationNormalized and ApplicationReview correctly", (): void => {
      const application = fakeApplication({
        id: 100,
        application_review: undefined,
      });
      const review = fakeApplicationReview({
        id: 999,
        job_application_id: application.id,
      });
      const initialState = initEntities();
      const expectState: EntityState = {
        ...initEntities(),
        applications: {
          [application.id]: application,
        },
        applicationReviews: {
          byId: {
            [review.id]: review,
          },
          idByApplicationId: {
            [application.id]: review.id,
          },
        },
      };
      const action: FetchApplicationAction = {
        type: FETCH_APPLICATION_SUCCEEDED,
        payload: { ...application, application_review: review },
        meta: { id: application.id },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
  });
});

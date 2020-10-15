import {
  initEntities,
  entitiesReducer,
  EntityState,
} from "./applicationReducer";
import { fakeApplication } from "../../fakeData/fakeApplications";
import {
  FetchApplicationAction,
  FETCH_APPLICATION_SUCCEEDED,
} from "./applicationActions";
import { fakeJobApplicationAnswers } from "../../fakeData/fakeJob";
import { deleteProperty, getId, mapToObject } from "../../helpers/queries";

describe("applicationReducer tests", (): void => {
  describe("EntitiesReducer", (): void => {
    it("Splits fetched application into Application and ApplicationReview correctly", (): void => {
      const application = fakeApplication({
        id: 100,
      });
      const jobApplicationAnswers = fakeJobApplicationAnswers();
      const initialState = initEntities();
      const expectState: EntityState = {
        ...initEntities(),
        applications: {
          [application.id]: deleteProperty(application, "application_review"),
        },
        applicationReviews: application.application_review
          ? {
              byId: {
                [application.application_review.id]:
                  application.application_review,
              },
              idByApplicationId: {
                [application.id]: application.application_review.id,
              },
            }
          : {
              byId: {},
              idByApplicationId: {},
            },
        jobApplicationAnswers: {
          ...mapToObject(jobApplicationAnswers, getId),
        },
        // TODO: Add fake data
        steps: {},
      };
      const action: FetchApplicationAction = {
        type: FETCH_APPLICATION_SUCCEEDED,
        payload: { application, jobApplicationAnswers, steps: {} },
        meta: { id: application.id },
      };
      expect(entitiesReducer(initialState, action)).toEqual(expectState);
    });
  });
});

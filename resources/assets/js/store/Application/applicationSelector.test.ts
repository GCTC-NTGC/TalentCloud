import { RootState, initState } from "../store";
import applicationReducer, {
  initApplicationState,
  initEntities,
  initUi,
  EntityState,
} from "./applicationReducer";
import { getApplicationsByJob } from "./applicationSelector";
import {
  fakeApplication1,
  fakeApplication2,
  fakeApplication3,
} from "../../fakeData/fakeApplications";
import {
  mapToObject,
  getId,
  notEmpty,
  mapToObjectTrans,
} from "../../helpers/queries";
import { Application } from "../../models/types";

const initStateWithApplications = (applications: Application[]): RootState => {
  const applicationReviews = applications
    .map((application) => application.application_review)
    .filter(notEmpty);
  const normalizedApplications = applications.map((application) => ({
    ...application,
    application_review: undefined,
  }));
  const entityState: EntityState = {
    ...initEntities(),
    applications: mapToObject(normalizedApplications, getId),
    applicationReviews: {
      byId: mapToObject(applicationReviews, getId),
      idByApplicationId: mapToObjectTrans(
        applicationReviews,
        (review) => review.job_application_id,
        getId,
      ),
    },
  };
  const state: RootState = {
    ...initState(),
    applications: {
      ...initApplicationState(),
      entities: entityState,
    },
  };
  return state;
};

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
      const state = initStateWithApplications([application1, application2]);
      expect(getApplicationsByJob(state, { jobId })).toEqual([
        application1,
        application2,
      ]);
    });
    it("Returns correct applications when from a larger set", (): void => {
      const jobId = 7;
      const application1 = fakeApplication1({
        id: 1,
        job_poster_id: jobId,
      });
      const application2 = fakeApplication2({
        id: 5,
        job_poster_id: jobId,
      });
      const applicationOtherJob = fakeApplication3({
        id: 10,
        job_poster_id: jobId + 1,
      });
      const state = initStateWithApplications([
        application1,
        application2,
        applicationOtherJob,
      ]);
      expect(getApplicationsByJob(state, { jobId })).toEqual([
        application1,
        application2,
      ]);
    });
    it("Returns empty list when no applications have the right job", (): void => {
      const jobId = 7;
      const application1 = fakeApplication1({
        id: 1,
        job_poster_id: jobId,
      });
      const applicationOtherJob = fakeApplication3({
        id: 10,
        job_poster_id: jobId + 1,
      });
      const state = initStateWithApplications([
        application1,
        applicationOtherJob,
      ]);
      expect(getApplicationsByJob(state, { jobId: jobId - 1 })).toEqual([]);
    });
  });
});

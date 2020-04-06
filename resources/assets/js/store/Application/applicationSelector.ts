/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { EntityState, UiState } from "./applicationReducer";
import { Application } from "../../models/types";
import { PropType } from "../../models/app";
import { hasKey, getId, notEmpty } from "../../helpers/queries";

const entities = (state: RootState): EntityState => state.applications.entities;
// eslint-disable-next-line
const ui = (state: RootState): UiState => state.applications.ui;

const getApplicationState = (state: RootState) => entities(state).applications;

const getApplicationReviewState = (state: RootState) =>
  entities(state).applicationReviews;

const constructNonNormalizedApplication = (
  applications: ReturnType<typeof getApplicationState>,
  applicationReviews: PropType<EntityState, "applicationReviews">,
  id: number,
): Application | null => {
  const applicationNormalized = hasKey(applications, id)
    ? applications[id]
    : null;
  if (applicationNormalized === null) {
    return null;
  }
  if (hasKey(applicationReviews.idByApplicationId, id)) {
    const reviewId = applicationReviews.idByApplicationId[id];
    return {
      ...applicationNormalized,
      application_review: applicationReviews.byId[reviewId],
    };
  }
  return {
    ...applicationNormalized,
    application_review: undefined,
  };
};

export const getApplicationById = createCachedSelector(
  getApplicationState,
  getApplicationReviewState,
  (state: RootState, ownProps: { id: number }): number => ownProps.id,
  constructNonNormalizedApplication,
)((state, ownProps): number => ownProps.id);

export const getApplicationsByJob = createCachedSelector(
  getApplicationState,
  getApplicationReviewState,
  (state: RootState, ownProps: { jobId: number }): number => ownProps.jobId,
  (applications, applicationReviews, jobId): Application[] => {
    const applicationIds = Object.values(applications)
      .filter(application => application.job_poster_id === jobId)
      .map(getId);
    return applicationIds
      .map(id =>
        constructNonNormalizedApplication(applications, applicationReviews, id),
      )
      .filter(notEmpty);
  },
)((state, ownProps): number => ownProps.jobId);

/* eslint camelcase: "off", @typescript-eslint/camelcase: "off" */
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";
import { RootState } from "../store";
import { EntityState, UiState } from "./applicationReducer";
import {
  Application,
  Email,
  ApplicationNormalized,
  JobApplicationAnswer,
} from "../../models/types";
import { PropType } from "../../models/app";
import { hasKey, getId, notEmpty } from "../../helpers/queries";
import {
  ApplicationStep,
  ProgressBarStatus,
} from "../../models/lookupConstants";

const entities = (state: RootState): EntityState => state.applications.entities;
// eslint-disable-next-line
const ui = (state: RootState): UiState => state.applications.ui;

const getApplicationState = (state: RootState) => entities(state).applications;

const getApplicationReviewState = (state: RootState) =>
  entities(state).applicationReviews;

const getJobApplicationAnswersState = (
  state: RootState,
): { [id: number]: JobApplicationAnswer } =>
  entities(state).jobApplicationAnswers;

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

export const getApplicationIsUpdating = (
  state: RootState,
  props: { applicationId: number },
): boolean =>
  hasKey(ui(state).applicationIsUpdating, props.applicationId) &&
  ui(state).applicationIsUpdating[props.applicationId];

export const getApplicationNormalized = (
  state: RootState,
  ownProps: { applicationId: number },
): ApplicationNormalized | null => {
  const applicationState = getApplicationState(state);
  const { applicationId } = ownProps;
  return hasKey(applicationState, applicationId)
    ? applicationState[applicationId]
    : null;
};

export const getJobApplicationAnswers = createCachedSelector(
  getJobApplicationAnswersState,
  (state, ownProps: { applicationId: number }): number =>
    ownProps.applicationId,
  (jobApplicationAnswersState, applicationId): JobApplicationAnswer[] =>
    Object.values(jobApplicationAnswersState).filter(
      (answer) => answer.job_application_id === applicationId,
    ),
)((state, ownProps): number => ownProps.applicationId);

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
      .filter((application) => application.job_poster_id === jobId)
      .map(getId);
    return applicationIds
      .map((id) =>
        constructNonNormalizedApplication(applications, applicationReviews, id),
      )
      .filter(notEmpty);
  },
)((state, ownProps): number => ownProps.jobId);

export const getAllReferenceEmails = (
  state: RootState,
): {
  director: {
    byApplicationId: { [applicationId: number]: Email };
  };
  secondary: {
    byApplicationId: { [applicationId: number]: Email };
  };
} => entities(state).microReferenceEmails;

export const isFetchingReferenceEmailsForApplication = (
  state: RootState,
  props: { applicationId: number },
): boolean => {
  const uiState = ui(state);
  return (
    hasKey(
      uiState.fetchingReferenceEmailsForApplication,
      props.applicationId,
    ) && uiState.fetchingReferenceEmailsForApplication[props.applicationId]
  );
};

export const allIsFetchingReferenceEmailsByApplication = (
  state: RootState,
): { [applicationId: number]: boolean } => {
  return ui(state).fetchingReferenceEmailsForApplication;
};

export const allIsSendingReferenceEmailByApplication = (
  state: RootState,
): { [applicationId: number]: boolean } => {
  return ui(state).sendingReferenceEmailForApplication;
};

export const getJobApplicationSteps = (
  state: RootState,
): { [step in ApplicationStep]: ProgressBarStatus } =>
  entities(state).jobApplicationSteps;

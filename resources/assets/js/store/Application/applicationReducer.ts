import { combineReducers } from "redux";
import {
  ApplicationNormalized,
  ApplicationReview,
  Email,
  JobApplicationAnswer,
} from "../../models/types";
import {
  ApplicationAction,
  FETCH_APPLICATION_SUCCEEDED,
  FETCH_APPLICATION_FAILED,
  FETCH_APPLICATION_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED,
  FETCH_APPLICATIONS_FOR_JOB_STARTED,
  FETCH_APPLICATIONS_FOR_JOB_FAILED,
  UPDATE_APPLICATION_SUCCEEDED,
  UPDATE_APPLICATION_STARTED,
  UPDATE_APPLICATION_FAILED,
  UPDATE_APPLICATION_REVIEW_SUCCEEDED,
  UPDATE_APPLICATION_REVIEW_STARTED,
  UPDATE_APPLICATION_REVIEW_FAILED,
  BATCH_UPDATE_APPLICATION_REVIEWS_SUCCEEDED,
  FETCH_REFERENCE_EMAILS_SUCCEEDED,
  FETCH_REFERENCE_EMAILS_STARTED,
  FETCH_REFERENCE_EMAILS_FAILED,
  SEND_REFERENCE_EMAIL_STARTED,
  SEND_REFERENCE_EMAIL_SUCCEEDED,
  SEND_REFERENCE_EMAIL_FAILED,
  TOUCH_JOB_APPLICATION_STEP_SUCCEEDED,
  TOUCH_JOB_APPLICATION_STEP_STARTED,
  TOUCH_JOB_APPLICATION_STEP_FAILED,
  SUBMIT_APPLICATION_SUCCEEDED,
} from "./applicationActions";
import {
  mapToObject,
  getId,
  notEmpty,
  mapToObjectTrans,
  deleteProperty,
} from "../../helpers/queries";
import {
  CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
  UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED,
} from "../JobApplicationAnswer/jobApplicationAnswerActions";
import {
  ApplicationStep,
  ProgressBarStatus,
} from "../../models/lookupConstants";

export interface EntityState {
  applications: {
    [id: number]: ApplicationNormalized;
  };
  jobApplicationAnswers: {
    [id: number]: JobApplicationAnswer;
  };
  jobApplicationSteps: { [step in ApplicationStep]: ProgressBarStatus };
  applicationReviews: {
    byId: {
      [id: number]: ApplicationReview;
    };
    idByApplicationId: {
      [applicationId: number]: number;
    };
  };
  microReferenceEmails: {
    director: {
      byApplicationId: {
        [applicationId: number]: Email;
      };
    };
    secondary: {
      byApplicationId: {
        [applicationId: number]: Email;
      };
    };
  };
}

export interface UiState {
  applicationIsUpdating: {
    [id: number]: boolean;
  };
  fetchingApplications: boolean;
  fetchingReferenceEmailsForApplication: {
    [applicationId: number]: boolean;
  };
  sendingReferenceEmailForApplication: {
    [applicationId: number]: boolean;
  };
  updatingSteps: boolean;
}

export interface ApplicationState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  applications: {},
  jobApplicationAnswers: {},
  jobApplicationSteps: {
    basic: "default",
    experience: "default",
    skills: "default",
    fit: "default",
    review: "default",
    submission: "default",
  },
  applicationReviews: {
    byId: {},
    idByApplicationId: {},
  },
  microReferenceEmails: {
    director: {
      byApplicationId: {},
    },
    secondary: {
      byApplicationId: {},
    },
  },
});

export const initUi = (): UiState => ({
  applicationIsUpdating: {},
  fetchingApplications: false,
  fetchingReferenceEmailsForApplication: {},
  sendingReferenceEmailForApplication: {},
  updatingSteps: false,
});

export const initApplicationState = (): ApplicationState => ({
  entities: initEntities(),
  ui: initUi(),
});

export const entitiesReducer = (
  state = initEntities(),
  action: ApplicationAction,
): EntityState => {
  switch (action.type) {
    case FETCH_APPLICATION_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.application.id]: deleteProperty(
            action.payload.application,
            "application_review",
          ),
        },
        applicationReviews: action.payload.application.application_review
          ? {
              byId: {
                ...state.applicationReviews.byId,
                [action.payload.application.application_review.id]:
                  action.payload.application.application_review,
              },
              idByApplicationId: {
                ...state.applicationReviews.idByApplicationId,
                [action.payload.application.id]:
                  action.payload.application.application_review.id,
              },
            }
          : state.applicationReviews,
        jobApplicationAnswers: {
          ...mapToObject(action.payload.jobApplicationAnswers, getId),
        },
        jobApplicationSteps: action.payload.jobApplicationSteps,
      };
    case FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          ...mapToObjectTrans(
            action.payload,
            getId,
            (application): ApplicationNormalized =>
              deleteProperty(application, "application_review"),
          ),
        },
        applicationReviews: {
          byId: {
            ...state.applicationReviews.byId,
            ...mapToObject(
              action.payload
                .map((application) => application.application_review)
                .filter(notEmpty),
              getId,
            ),
          },
          idByApplicationId: {
            ...state.applicationReviews.idByApplicationId,
            ...mapToObjectTrans(
              action.payload
                .map((application) => application.application_review)
                .filter(notEmpty),
              (review) => review.job_application_id,
              (review) => review.id,
            ),
          },
        },
      };
    case UPDATE_APPLICATION_SUCCEEDED:
    case SUBMIT_APPLICATION_SUCCEEDED:
      return {
        ...state,
        applications: {
          ...state.applications,
          [action.payload.id]: {
            ...state.applications[action.payload.id],
            ...action.payload,
          },
        },
      };
    case UPDATE_APPLICATION_REVIEW_SUCCEEDED:
      return {
        ...state,
        applicationReviews: {
          byId: {
            ...state.applicationReviews.byId,
            [action.payload.id]: action.payload,
          },
          idByApplicationId: {
            ...state.applicationReviews.idByApplicationId,
            [action.payload.job_application_id]: action.payload.id,
          },
        },
      };
    case BATCH_UPDATE_APPLICATION_REVIEWS_SUCCEEDED:
      return {
        ...state,
        applicationReviews: {
          byId: {
            ...state.applicationReviews.byId,
            ...mapToObjectTrans(
              action.payload,
              getId,
              (applicationReview => applicationReview),
            ),
          },
          idByApplicationId: {
            ...state.applicationReviews.idByApplicationId,
            ...mapToObjectTrans(
              action.payload,
              (applicationReview => applicationReview.job_application_id),
              getId,
            ),
          }
        },
      };
    case FETCH_REFERENCE_EMAILS_SUCCEEDED:
      return {
        ...state,
        microReferenceEmails: {
          director: {
            byApplicationId: {
              ...state.microReferenceEmails.director.byApplicationId,
              [action.meta.applicationId]: action.payload.director,
            },
          },
          secondary: {
            byApplicationId: {
              ...state.microReferenceEmails.secondary.byApplicationId,
              [action.meta.applicationId]: action.payload.secondary,
            },
          },
        },
      };
    case CREATE_JOB_APPLICATION_ANSWER_SUCCEEDED:
    case UPDATE_JOB_APPLICATION_ANSWER_SUCCEEDED:
      return {
        ...state,
        jobApplicationAnswers: {
          ...state.jobApplicationAnswers,
          [action.payload.id]: action.payload,
        },
      };
    case TOUCH_JOB_APPLICATION_STEP_SUCCEEDED:
      return {
        ...state,
        jobApplicationSteps: {
          ...state.jobApplicationSteps,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const uiReducer = (
  state = initUi(),
  action: ApplicationAction,
): UiState => {
  switch (action.type) {
    case FETCH_APPLICATION_STARTED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: true,
        },
        updatingSteps: true,
      };
    case FETCH_APPLICATION_SUCCEEDED:
    case FETCH_APPLICATION_FAILED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: false,
        },
        updatingSteps: false,
      };
    case FETCH_APPLICATIONS_FOR_JOB_STARTED:
      return {
        ...state,
        fetchingApplications: true,
      };
    case FETCH_APPLICATIONS_FOR_JOB_SUCCEEDED:
    case FETCH_APPLICATIONS_FOR_JOB_FAILED:
      return {
        ...state,
        fetchingApplications: false,
      };
    case UPDATE_APPLICATION_STARTED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: true,
        },
      };
    case UPDATE_APPLICATION_SUCCEEDED:
    case UPDATE_APPLICATION_FAILED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.id]: false,
        },
      };
    case UPDATE_APPLICATION_REVIEW_STARTED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.applicationId]: true,
        },
      };
    case UPDATE_APPLICATION_REVIEW_SUCCEEDED:
    case UPDATE_APPLICATION_REVIEW_FAILED:
      return {
        ...state,
        applicationIsUpdating: {
          ...state.applicationIsUpdating,
          [action.meta.applicationId]: false,
        },
      };
    case FETCH_REFERENCE_EMAILS_STARTED:
      return {
        ...state,
        fetchingReferenceEmailsForApplication: {
          ...state.fetchingReferenceEmailsForApplication,
          [action.meta.applicationId]: true,
        },
      };
    case FETCH_REFERENCE_EMAILS_SUCCEEDED:
    case FETCH_REFERENCE_EMAILS_FAILED:
      return {
        ...state,
        fetchingReferenceEmailsForApplication: {
          ...state.fetchingReferenceEmailsForApplication,
          [action.meta.applicationId]: false,
        },
      };
    case SEND_REFERENCE_EMAIL_STARTED:
      return {
        ...state,
        sendingReferenceEmailForApplication: {
          ...state.sendingReferenceEmailForApplication,
          [action.meta.applicationId]: true,
        },
      };
    case SEND_REFERENCE_EMAIL_SUCCEEDED:
    case SEND_REFERENCE_EMAIL_FAILED:
      return {
        ...state,
        sendingReferenceEmailForApplication: {
          ...state.sendingReferenceEmailForApplication,
          [action.meta.applicationId]: false,
        },
      };
    case TOUCH_JOB_APPLICATION_STEP_STARTED:
      return {
        ...state,
        updatingSteps: true,
      };
    case TOUCH_JOB_APPLICATION_STEP_SUCCEEDED:
    case TOUCH_JOB_APPLICATION_STEP_FAILED:
      return {
        ...state,
        updatingSteps: false,
      };
    default:
      return state;
  }
};

export const applicationReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default applicationReducer;

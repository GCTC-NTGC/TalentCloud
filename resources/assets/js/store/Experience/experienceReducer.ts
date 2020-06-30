import { combineReducers } from "redux";
import {
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
  ExperienceAward,
  ExperiencePersonal,
  Experience,
} from "../../models/types";
import {
  ExperienceAction,
  FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
  FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
  CREATE_EXPERIENCE_SUCCEEDED,
  FETCH_EXPERIENCE_BY_APPLICANT_STARTED,
  FETCH_EXPERIENCE_BY_APPLICANT_FAILED,
  FETCH_EXPERIENCE_BY_APPLICATION_STARTED,
  FETCH_EXPERIENCE_BY_APPLICATION_FAILED,
  UPDATE_EXPERIENCE_STARTED,
  UPDATE_EXPERIENCE_SUCCEEDED,
  UPDATE_EXPERIENCE_FAILED,
  DELETE_EXPERIENCE_STARTED,
  DELETE_EXPERIENCE_SUCCEEDED,
  DELETE_EXPERIENCE_FAILED,
} from "./experienceActions";
import {
  mapToObject,
  getId,
  uniq,
  deleteProperty,
  mapObjectValues,
} from "../../helpers/queries";

export interface EntityState {
  work: {
    byId: {
      [id: number]: ExperienceWork;
    };
    idsByApplicant: {
      [applicantId: number]: number[];
    };
    idsByApplication: {
      [applicationId: number]: number[];
    };
  };
  education: {
    byId: {
      [id: number]: ExperienceEducation;
    };
    idsByApplicant: {
      [applicantId: number]: number[];
    };
    idsByApplication: {
      [applicationId: number]: number[];
    };
  };
  community: {
    byId: {
      [id: number]: ExperienceCommunity;
    };
    idsByApplicant: {
      [applicantId: number]: number[];
    };
    idsByApplication: {
      [applicationId: number]: number[];
    };
  };
  award: {
    byId: {
      [id: number]: ExperienceAward;
    };
    idsByApplicant: {
      [applicantId: number]: number[];
    };
    idsByApplication: {
      [applicationId: number]: number[];
    };
  };
  personal: {
    byId: {
      [id: number]: ExperiencePersonal;
    };
    idsByApplicant: {
      [applicantId: number]: number[];
    };
    idsByApplication: {
      [applicationId: number]: number[];
    };
  };
}

export interface UiState {
  updatingByApplicant: {
    [id: number]: boolean;
  };
  updatingByApplication: {
    [id: number]: boolean;
  };
  updatingByTypeAndId: {
    work: {
      [id: number]: boolean;
    };
    education: {
      [id: number]: boolean;
    };
    community: {
      [id: number]: boolean;
    };
    award: {
      [id: number]: boolean;
    };
    personal: {
      [id: number]: boolean;
    };
  };
}

export interface ExperienceState {
  entities: EntityState;
  ui: UiState;
}

export const initEntities = (): EntityState => ({
  work: {
    byId: {},
    idsByApplicant: {},
    idsByApplication: {},
  },
  education: {
    byId: {},
    idsByApplicant: {},
    idsByApplication: {},
  },
  community: {
    byId: {},
    idsByApplicant: {},
    idsByApplication: {},
  },
  award: {
    byId: {},
    idsByApplicant: {},
    idsByApplication: {},
  },
  personal: {
    byId: {},
    idsByApplicant: {},
    idsByApplication: {},
  },
});

export const initUi = (): UiState => ({
  updatingByApplicant: {},
  updatingByApplication: {},
  updatingByTypeAndId: {
    work: {},
    education: {},
    community: {},
    award: {},
    personal: {},
  },
});

export const initExperienceState = (): ExperienceState => ({
  entities: initEntities(),
  ui: initUi(),
});

function isWork(
  experience: Experience,
): experience is ExperienceWork & { type: "work" } {
  return experience.type === "work";
}
function isEducation(
  experience: Experience,
): experience is ExperienceEducation & { type: "education" } {
  return experience.type === "education";
}
function isCommunity(
  experience: Experience,
): experience is ExperienceCommunity & { type: "community" } {
  return experience.type === "community";
}
function isAward(
  experience: Experience,
): experience is ExperienceAward & { type: "award" } {
  return experience.type === "award";
}
function isPersonal(
  experience: Experience,
): experience is ExperiencePersonal & { type: "personal" } {
  return experience.type === "personal";
}

const experienceTypeGuards = {
  work: isWork,
  education: isEducation,
  community: isCommunity,
  award: isAward,
  personal: isPersonal,
};

function fetchExperienceByApplication<T extends keyof EntityState>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (action.type !== FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED) {
    return subState;
  }
  const typeFilter = experienceTypeGuards[type];
  const experiences = action.payload.filter(typeFilter);
  return {
    ...subState,
    byId: {
      ...subState.byId,
      ...mapToObject(experiences, getId),
    },
    idsByApplication: {
      ...subState.idsByApplicant,
      [action.meta.applicationId]: experiences.map(getId),
    },
  };
}
function fetchExperienceByApplicant<T extends keyof EntityState>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (action.type !== FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED) {
    return subState;
  }
  const typeFilter = experienceTypeGuards[type];
  const experiences = action.payload.filter(typeFilter);
  return {
    ...subState,
    byId: {
      ...subState.byId,
      ...mapToObject(experiences, getId),
    },
    idsByApplicant: {
      ...subState.idsByApplicant,
      [action.meta.applicantId]: experiences.map(getId),
    },
  };
}

function setExperience<T extends keyof EntityState>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (
    (action.type !== CREATE_EXPERIENCE_SUCCEEDED &&
      action.type !== UPDATE_EXPERIENCE_SUCCEEDED) ||
    action.meta.type !== type
  ) {
    return subState;
  }
  const experience = action.payload;
  const ownerId = experience.experienceable_id;
  const idsByApplicant =
    experience.experienceable_type === "applicant"
      ? {
          ...subState.idsByApplicant,
          [ownerId]: uniq([
            ...(subState.idsByApplicant[ownerId] ?? []),
            experience.id,
          ]),
        }
      : subState.idsByApplicant;
  const idsByApplication =
    experience.experienceable_type === "application"
      ? {
          ...subState.idsByApplication,
          [ownerId]: uniq([
            ...(subState.idsByApplication[ownerId] ?? []),
            experience.id,
          ]),
        }
      : subState.idsByApplication;

  return {
    ...subState,
    byId: {
      ...subState.byId,
      [action.payload.id]: action.payload,
    },
    idsByApplicant,
    idsByApplication,
  };
}

function deleteExperience<T extends keyof EntityState>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (
    action.type !== DELETE_EXPERIENCE_SUCCEEDED ||
    action.meta.type !== type
  ) {
    return subState;
  }
  const dropId = (ids: number[]): number[] =>
    ids.filter((id) => id !== action.meta.id);
  return {
    ...subState,
    byId: deleteProperty(subState.byId, action.meta.id),
    idsByApplicant: mapObjectValues(subState.idsByApplicant, dropId),
    idsByApplication: mapObjectValues(subState.idsByApplication, dropId),
  };
}

export const entitiesReducer = (
  state = initEntities(),
  action: ExperienceAction,
): EntityState => {
  switch (action.type) {
    case FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED:
      return {
        ...state,
        work: fetchExperienceByApplicant(state, action, "work"),
        education: fetchExperienceByApplicant(state, action, "education"),
        community: fetchExperienceByApplicant(state, action, "community"),
        award: fetchExperienceByApplicant(state, action, "award"),
        personal: fetchExperienceByApplicant(state, action, "personal"),
      };
    case FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED:
      return {
        ...state,
        work: fetchExperienceByApplication(state, action, "work"),
        education: fetchExperienceByApplication(state, action, "education"),
        community: fetchExperienceByApplication(state, action, "community"),
        award: fetchExperienceByApplication(state, action, "award"),
        personal: fetchExperienceByApplication(state, action, "personal"),
      };
    case CREATE_EXPERIENCE_SUCCEEDED:
    case UPDATE_EXPERIENCE_SUCCEEDED:
      return {
        ...state,
        [action.meta.type]: setExperience(state, action, action.meta.type),
      };
    case DELETE_EXPERIENCE_SUCCEEDED:
      return {
        ...state,
        [action.meta.type]: deleteExperience(state, action, action.meta.type),
      };
    default:
      return state;
  }
};

export const uiReducer = (
  state = initUi(),
  action: ExperienceAction,
): UiState => {
  switch (action.type) {
    case FETCH_EXPERIENCE_BY_APPLICANT_STARTED:
      return {
        ...state,
        updatingByApplicant: {
          ...state.updatingByApplicant,
          [action.meta.applicantId]: true,
        },
      };
    case FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED:
    case FETCH_EXPERIENCE_BY_APPLICANT_FAILED:
      return {
        ...state,
        updatingByApplicant: {
          ...state.updatingByApplicant,
          [action.meta.applicantId]: false,
        },
      };
    case FETCH_EXPERIENCE_BY_APPLICATION_STARTED:
      return {
        ...state,
        updatingByApplication: {
          ...state.updatingByApplication,
          [action.meta.applicationId]: true,
        },
      };
    case FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED:
    case FETCH_EXPERIENCE_BY_APPLICATION_FAILED:
      return {
        ...state,
        updatingByApplication: {
          ...state.updatingByApplication,
          [action.meta.applicationId]: false,
        },
      };
    case UPDATE_EXPERIENCE_STARTED:
    case DELETE_EXPERIENCE_STARTED:
      return {
        ...state,
        updatingByTypeAndId: {
          ...state.updatingByTypeAndId,
          [action.meta.type]: {
            ...state.updatingByTypeAndId[action.meta.type],
            [action.meta.id]: true,
          },
        },
      };
    case UPDATE_EXPERIENCE_SUCCEEDED:
    case DELETE_EXPERIENCE_SUCCEEDED:
    case UPDATE_EXPERIENCE_FAILED:
    case DELETE_EXPERIENCE_FAILED:
      return {
        ...state,
        updatingByTypeAndId: {
          ...state.updatingByTypeAndId,
          [action.meta.type]: {
            ...state.updatingByTypeAndId[action.meta.type],
            [action.meta.id]: false,
          },
        },
      };
    default:
      return state;
  }
};

export const experienceReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default experienceReducer;

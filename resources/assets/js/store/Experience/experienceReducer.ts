import { combineReducers } from "redux";
import {
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
  ExperienceAward,
  ExperiencePersonal,
  Experience,
  ExperienceSkill,
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
  CREATE_EXPERIENCE_SKILL_SUCCEEDED,
  UPDATE_EXPERIENCE_SKILL_SUCCEEDED,
  DELETE_EXPERIENCE_SKILL_SUCCEEDED,
  UPDATE_EXPERIENCE_SKILL_STARTED,
  DELETE_EXPERIENCE_SKILL_STARTED,
  UPDATE_EXPERIENCE_SKILL_FAILED,
  DELETE_EXPERIENCE_SKILL_FAILED,
} from "./experienceActions";
import {
  mapToObject,
  getId,
  uniq,
  deleteProperty,
  mapObjectValues,
  mapToObjectTrans,
  hasKey,
} from "../../helpers/queries";

export interface ExperienceSection<T> {
  byId: {
    [id: number]: T;
  };
  idsByApplicant: {
    [applicantId: number]: number[];
  };
  idsByApplication: {
    [applicationId: number]: number[];
  };
}

export interface EntityState {
  work: ExperienceSection<ExperienceWork>;
  education: ExperienceSection<ExperienceEducation>;
  community: ExperienceSection<ExperienceCommunity>;
  award: ExperienceSection<ExperienceAward>;
  personal: ExperienceSection<ExperiencePersonal>;
  experienceSkills: {
    byId: { [id: number]: ExperienceSkill };
    idsByWork: { [workId: number]: number[] };
    idsByEducation: { [educationId: number]: number[] };
    idsByCommunity: { [communityId: number]: number[] };
    idsByAward: { [awardId: number]: number[] };
    idsByPersonal: { [personalId: number]: number[] };
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
  updatingExperienceSkill: {
    [id: number]: boolean;
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
  experienceSkills: {
    byId: {},
    idsByWork: {},
    idsByEducation: {},
    idsByCommunity: {},
    idsByAward: {},
    idsByPersonal: {},
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
  updatingExperienceSkill: {},
});

export const initExperienceState = (): ExperienceState => ({
  entities: initEntities(),
  ui: initUi(),
});

function isWork(experience: Experience): experience is ExperienceWork {
  return experience.type === "experience_work";
}
function isEducation(
  experience: Experience,
): experience is ExperienceEducation {
  return experience.type === "experience_education";
}
function isCommunity(
  experience: Experience,
): experience is ExperienceCommunity {
  return experience.type === "experience_community";
}
function isAward(experience: Experience): experience is ExperienceAward {
  return experience.type === "experience_award";
}
function isPersonal(experience: Experience): experience is ExperiencePersonal {
  return experience.type === "experience_personal";
}

type EntityType = "work" | "education" | "community" | "award" | "personal";

const experienceTypeGuards = {
  work: isWork,
  education: isEducation,
  community: isCommunity,
  award: isAward,
  personal: isPersonal,
};

function massageType(experienceType: Experience["type"]): EntityType {
  /* eslint-disable @typescript-eslint/camelcase */
  const mapping: { [key in Experience["type"]]: EntityType } = {
    experience_work: "work",
    experience_education: "education",
    experience_community: "community",
    experience_award: "award",
    experience_personal: "personal",
  };
  /* eslint-enable @typescript-eslint/camelcase */
  return mapping[experienceType];
}

function fetchExperienceByApplication<T extends EntityType>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (action.type !== FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED) {
    return subState;
  }
  const typeFilter = experienceTypeGuards[type];
  const experiences = action.payload
    .map((response) => response.experience)
    .filter(typeFilter);
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
function fetchExperienceByApplicant<T extends EntityType>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (action.type !== FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED) {
    return subState;
  }
  const typeFilter = experienceTypeGuards[type];
  const experiences = action.payload
    .map((response) => response.experience)
    .filter(typeFilter);
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

function setExperience<T extends EntityType>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (
    (action.type !== CREATE_EXPERIENCE_SUCCEEDED &&
      action.type !== UPDATE_EXPERIENCE_SUCCEEDED) ||
    massageType(action.meta.type) !== type
  ) {
    return subState;
  }
  const { experience } = action.payload;
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
      [action.payload.experience.id]: action.payload,
    },
    idsByApplicant,
    idsByApplication,
  };
}

function deleteExperience<T extends EntityType>(
  state: EntityState,
  action: ExperienceAction,
  type: T,
): EntityState[T] {
  const subState = state[type];
  if (
    action.type !== DELETE_EXPERIENCE_SUCCEEDED ||
    massageType(action.meta.type) !== type
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

function setExperienceSkills(
  state: EntityState,
  experienceSkills: ExperienceSkill[],
): EntityState["experienceSkills"] {
  const newExpSkills = mapToObject(experienceSkills, getId);
  const workSkills = experienceSkills.filter(
    (expSkill) => expSkill.experience_type === "experience_work",
  );
  const educationSkills = experienceSkills.filter(
    (expSkill) => expSkill.experience_type === "experience_education",
  );
  const communitySkills = experienceSkills.filter(
    (expSkill) => expSkill.experience_type === "experience_community",
  );
  const awardSkills = experienceSkills.filter(
    (expSkill) => expSkill.experience_type === "experience_award",
  );
  const personalSkills = experienceSkills.filter(
    (expSkill) => expSkill.experience_type === "experience_personal",
  );

  interface ExpToSkillIds {
    [expId: number]: number[];
  }
  const reducer = (
    acc: ExpToSkillIds,
    expSkill: ExperienceSkill,
  ): ExpToSkillIds => {
    const prevIds = acc[expSkill.experience_id] ?? [];
    return {
      ...acc,
      [expSkill.experience_id]: [expSkill.id, ...prevIds],
    };
  };
  return {
    byId: { ...state.experienceSkills, ...newExpSkills },
    idsByWork: workSkills.reduce(reducer, state.experienceSkills.idsByWork),
    idsByEducation: educationSkills.reduce(
      reducer,
      state.experienceSkills.idsByEducation,
    ),
    idsByCommunity: communitySkills.reduce(
      reducer,
      state.experienceSkills.idsByCommunity,
    ),
    idsByAward: awardSkills.reduce(reducer, state.experienceSkills.idsByAward),
    idsByPersonal: personalSkills.reduce(
      reducer,
      state.experienceSkills.idsByPersonal,
    ),
  };
}

/* eslint-disable @typescript-eslint/camelcase */
const experienceSkillKeys = {
  experience_work: "idsByWork",
  experience_education: "idsByEducation",
  experience_community: "idsByCommunity",
  experience_award: "idsByAward",
  experience_personal: "idsByPersonal",
};
/* eslint-enable @typescript-eslint/camelcase */

function deleteExpSkillsForExperience(
  state: EntityState,
  experienceId: number,
  experienceType: Experience["type"],
): EntityState["experienceSkills"] {
  const experienceKey = experienceSkillKeys[experienceType];
  const expSkillIds: number[] =
    state.experienceSkills[experienceKey][experienceId] ?? [];
  return {
    ...state.experienceSkills,
    [experienceKey]: deleteProperty(
      state.experienceSkills[experienceKey],
      experienceId,
    ),
    byId: expSkillIds.reduce(
      (byId, deleteId) => deleteProperty(byId, deleteId),
      state.experienceSkills.byId,
    ),
  };
}

function deleteExperienceSkill(
  state: EntityState,
  experienceSkillId: number,
  experienceId: number,
  experienceType: ExperienceSkill["experience_type"],
) {
  const experienceKey = experienceSkillKeys[experienceType];
  return {
    ...state.experienceSkills,
    [experienceKey]: {
      ...state.experienceSkills[experienceKey],
      [experienceId]: state.experienceSkills[experienceKey][
        experienceId
      ].filter((id) => id !== experienceSkillId),
    },
    byId: deleteProperty(state.experienceSkills.byId, experienceSkillId),
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
        experienceSkills: setExperienceSkills(
          state,
          action.payload.map((response) => response.experienceSkills).flat(),
        ),
      };
    case FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED:
      return {
        ...state,
        work: fetchExperienceByApplication(state, action, "work"),
        education: fetchExperienceByApplication(state, action, "education"),
        community: fetchExperienceByApplication(state, action, "community"),
        award: fetchExperienceByApplication(state, action, "award"),
        personal: fetchExperienceByApplication(state, action, "personal"),
        experienceSkills: setExperienceSkills(
          state,
          action.payload.map((response) => response.experienceSkills).flat(),
        ),
      };
    case CREATE_EXPERIENCE_SUCCEEDED:
    case UPDATE_EXPERIENCE_SUCCEEDED:
      return {
        ...state,
        [massageType(action.meta.type)]: setExperience(
          state,
          action,
          massageType(action.meta.type),
        ),
      };
    case DELETE_EXPERIENCE_SUCCEEDED:
      return {
        ...state,
        [massageType(action.meta.type)]: deleteExperience(
          state,
          action,
          massageType(action.meta.type),
        ),
        experienceSkills: deleteExpSkillsForExperience(
          state,
          action.meta.id,
          action.meta.type,
        ),
      };
    case CREATE_EXPERIENCE_SKILL_SUCCEEDED:
    case UPDATE_EXPERIENCE_SKILL_SUCCEEDED:
      return {
        ...state,
        experienceSkills: setExperienceSkills(state, [action.payload]),
      };
    case DELETE_EXPERIENCE_SKILL_SUCCEEDED:
      return {
        ...state,
        experienceSkills: deleteExperienceSkill(
          state,
          action.meta.id,
          action.meta.experienceId,
          action.meta.experienceType,
        ),
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
          [massageType(action.meta.type)]: {
            ...state.updatingByTypeAndId[massageType(action.meta.type)],
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
          [massageType(action.meta.type)]: {
            ...state.updatingByTypeAndId[massageType(action.meta.type)],
            [action.meta.id]: false,
          },
        },
      };
    case UPDATE_EXPERIENCE_SKILL_STARTED:
    case DELETE_EXPERIENCE_SKILL_STARTED:
      return {
        ...state,
        updatingExperienceSkill: {
          ...state.updatingExperienceSkill,
          [action.meta.id]: true,
        },
      };
    case UPDATE_EXPERIENCE_SKILL_SUCCEEDED:
    case UPDATE_EXPERIENCE_SKILL_FAILED:
    case DELETE_EXPERIENCE_SKILL_SUCCEEDED:
    case DELETE_EXPERIENCE_SKILL_FAILED:
      return {
        ...state,
        updatingExperienceSkill: {
          ...state.updatingExperienceSkill,
          [action.meta.id]: false,
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

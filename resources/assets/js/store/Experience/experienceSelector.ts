import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import { RootState } from "../store";
import { EntityState, UiState, ExperienceSection } from "./experienceReducer";
import {
  ExperienceWork,
  ExperienceEducation,
  ExperienceCommunity,
  ExperienceAward,
  ExperiencePersonal,
  Experience,
} from "../../models/types";
import { notEmpty, hasKey } from "../../helpers/queries";

const entities = (state: RootState): EntityState => state.experience.entities;
const ui = (state: RootState): UiState => state.experience.ui;

interface ExperienceSet {
  work: ExperienceWork[];
  education: ExperienceEducation[];
  community: ExperienceCommunity[];
  award: ExperienceAward[];
  personal: ExperiencePersonal[];
}

const getWorkState = (state: RootState): ExperienceSection<ExperienceWork> =>
  entities(state).work;
const getEducationState = (
  state: RootState,
): ExperienceSection<ExperienceEducation> => entities(state).education;
const getCommunityState = (
  state: RootState,
): ExperienceSection<ExperienceCommunity> => entities(state).community;
const getAwardState = (state: RootState): ExperienceSection<ExperienceAward> =>
  entities(state).award;
const getPersonalState = (
  state: RootState,
): ExperienceSection<ExperiencePersonal> => entities(state).personal;

const stateByType = {
  work: getWorkState,
  education: getEducationState,
  community: getCommunityState,
  award: getAwardState,
  personal: getPersonalState,
};

function getStateOfType<T extends keyof typeof stateByType>(
  type: T,
): typeof stateByType[T] {
  return stateByType[type];
}

const extractId = (state: RootState, ownProps: { id: number }): number =>
  ownProps.id;
const extractApplicantId = (
  state: RootState,
  ownProps: { applicantId: number },
): number => ownProps.applicantId;
const extractApplicationId = (
  state: RootState,
  ownProps: { applicationId: number },
): number => ownProps.applicationId;

function experienceByApplicant<T>(
  experienceState: ExperienceSection<T>,
  applicantId: number,
): T[] {
  const idsForApplicant = experienceState.idsByApplicant[applicantId];
  return idsForApplicant
    ? idsForApplicant.map((id) => experienceState.byId[id]).filter(notEmpty)
    : [];
}

function experienceByApplication<T>(
  experienceState: ExperienceSection<T>,
  applicationId: number,
): T[] {
  const idsForApplication = experienceState.idsByApplication[applicationId];
  return idsForApplication
    ? idsForApplication.map((id) => experienceState.byId[id]).filter(notEmpty)
    : [];
}

function experienceById<T>(
  experienceState: ExperienceSection<T>,
  id: number,
): T | null {
  return hasKey(experienceState.byId, id) ? experienceState.byId[id] : null;
}

function getExperienceTypeByApplicant<T>(
  getState: (state: RootState) => ExperienceSection<T>,
) {
  return createCachedSelector(
    getState,
    extractApplicantId,
    experienceByApplicant,
  )(extractApplicantId);
}
function getExperienceTypeByApplication<T>(
  getState: (state: RootState) => ExperienceSection<T>,
) {
  return createCachedSelector(
    getState,
    extractApplicationId,
    experienceByApplication,
  )(extractApplicationId);
}

export const getWorkByApplicant = getExperienceTypeByApplicant(getWorkState);
export const getEducationByApplicant = getExperienceTypeByApplicant(
  getEducationState,
);
export const getCommunityByApplicant = getExperienceTypeByApplicant(
  getCommunityState,
);
export const getAwardByApplicant = getExperienceTypeByApplicant(getAwardState);
export const getPersonalByApplicant = getExperienceTypeByApplicant(
  getPersonalState,
);

export const getExperienceByApplicant = createSelector(
  getWorkByApplicant,
  getEducationByApplicant,
  getCommunityByApplicant,
  getAwardByApplicant,
  getPersonalByApplicant,
  (work, education, community, award, personal) => ({
    work,
    education,
    community,
    award,
    personal,
  }),
);

export const getWorkByApplication = getExperienceTypeByApplication(
  getWorkState,
);
export const getEducationByApplication = getExperienceTypeByApplication(
  getEducationState,
);
export const getCommunityByApplication = getExperienceTypeByApplication(
  getCommunityState,
);
export const getAwardByApplication = getExperienceTypeByApplication(
  getAwardState,
);
export const getPersonalByApplication = getExperienceTypeByApplication(
  getPersonalState,
);

export const getExperienceByApplication = createSelector(
  getWorkByApplication,
  getEducationByApplication,
  getCommunityByApplication,
  getAwardByApplication,
  getPersonalByApplication,
  (work, education, community, award, personal) => ({
    work,
    education,
    community,
    award,
    personal,
  }),
);

function getExperienceTypeById<T>(
  getState: (state: RootState) => ExperienceSection<T>,
) {
  return createCachedSelector(getState, extractId, experienceById)(extractId);
}

export const getWorkById = getExperienceTypeById(getWorkState);
export const getEducationById = getExperienceTypeById(getEducationState);
export const getCommunityById = getExperienceTypeById(getCommunityState);
export const getAwardById = getExperienceTypeById(getAwardState);
export const getPersonalById = getExperienceTypeById(getPersonalState);

export const getUpdatingByApplicant = (
  state: RootState,
  { applicantId }: { applicantId: number },
): boolean => {
  return ui(state).updatingByApplicant[applicantId] ?? false;
};

export const getUpdatingByApplication = (
  state: RootState,
  { applicationId }: { applicationId: number },
): boolean => {
  return ui(state).updatingByApplication[applicationId] ?? false;
};

export const getUpdatingByTypeAndId = (
  state: RootState,
  { id, type }: { id: number; type: keyof UiState["updatingByTypeAndId"] },
): boolean => {
  return ui(state).updatingByTypeAndId[type][id] ?? false;
};

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
  ExperienceSkill,
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

export const getExperienceSkillById = (
  state: RootState,
  id: number,
): ExperienceSkill | null => {
  const expSkills = entities(state).experienceSkills.byId;
  return hasKey(expSkills, id) ? expSkills[id] : null;
};

const getExperienceSkillByIdState = (state: RootState) =>
  entities(state).experienceSkills.byId;

const getExperienceSkillByWorkState = (state: RootState) =>
  entities(state).experienceSkills.idsByWork;
const getExperienceSkillByEducationState = (state: RootState) =>
  entities(state).experienceSkills.idsByEducation;
const getExperienceSkillByCommunityState = (state: RootState) =>
  entities(state).experienceSkills.idsByCommunity;
const getExperienceSkillByAwardState = (state: RootState) =>
  entities(state).experienceSkills.idsByAward;
const getExperienceSkillByPersonalState = (state: RootState) =>
  entities(state).experienceSkills.idsByPersonal;

export const getExperienceSkillsByWork = createCachedSelector(
  getExperienceSkillByIdState,
  getExperienceSkillByWorkState,
  (state: RootState, { workId }: { workId: number }) => workId,
  (expSkillById, idsByWork, workId): ExperienceSkill[] => {
    const expSkillIds = idsByWork[workId] ?? [];
    return expSkillIds.map((id) => expSkillById[id]).filter(notEmpty);
  },
)((state, { workId }) => workId);

export const getExperienceSkillsByEducation = createCachedSelector(
  getExperienceSkillByIdState,
  getExperienceSkillByEducationState,
  (state: RootState, { educationId }: { educationId: number }) => educationId,
  (expSkillById, idsByWork, educationId): ExperienceSkill[] => {
    const expSkillIds = idsByWork[educationId] ?? [];
    return expSkillIds.map((id) => expSkillById[id]).filter(notEmpty);
  },
)((state, { educationId }) => educationId);

export const getExperienceSkillsByCommunity = createCachedSelector(
  getExperienceSkillByIdState,
  getExperienceSkillByCommunityState,
  (state: RootState, { communityId }: { communityId: number }) => communityId,
  (expSkillById, idsByWork, communityId): ExperienceSkill[] => {
    const expSkillIds = idsByWork[communityId] ?? [];
    return expSkillIds.map((id) => expSkillById[id]).filter(notEmpty);
  },
)((state, { communityId }) => communityId);

export const getExperienceSkillsByAward = createCachedSelector(
  getExperienceSkillByIdState,
  getExperienceSkillByAwardState,
  (state: RootState, { awardId }: { awardId: number }) => awardId,
  (expSkillById, idsByWork, awardId): ExperienceSkill[] => {
    const expSkillIds = idsByWork[awardId] ?? [];
    return expSkillIds.map((id) => expSkillById[id]).filter(notEmpty);
  },
)((state, { awardId }) => awardId);

export const getExperienceSkillsByPersonal = createCachedSelector(
  getExperienceSkillByIdState,
  getExperienceSkillByPersonalState,
  (state: RootState, { personalId }: { personalId: number }) => personalId,
  (expSkillById, idsByWork, personalId): ExperienceSkill[] => {
    const expSkillIds = idsByWork[personalId] ?? [];
    return expSkillIds.map((id) => expSkillById[id]).filter(notEmpty);
  },
)((state, { personalId }) => personalId);

export const getExperienceSkillIdsByWork = (
  state: RootState,
  id: number,
): number[] => entities(state).experienceSkills.idsByWork[id] ?? [];
export const getExperienceSkillIdsByEducation = (
  state: RootState,
  id: number,
): number[] => entities(state).experienceSkills.idsByEducation[id] ?? [];
export const getExperienceSkillIdsByCommunity = (
  state: RootState,
  id: number,
): number[] => entities(state).experienceSkills.idsByCommunity[id] ?? [];
export const getExperienceSkillIdsByAward = (
  state: RootState,
  id: number,
): number[] => entities(state).experienceSkills.idsByAward[id] ?? [];
export const getExperienceSkillIdsByPersonal = (
  state: RootState,
  id: number,
): number[] => entities(state).experienceSkills.idsByPersonal[id] ?? [];

export const getExperienceSkillUpdating = (
  state: RootState,
  id: number,
): boolean => {
  return ui(state).updatingExperienceSkill[id] ?? false;
};

function getExperienceSkillsByGroup<T>(
  getExperience: (
    state: RootState,
    props: T,
  ) => {
    award: ExperienceAward[];
    community: ExperienceCommunity[];
    education: ExperienceEducation[];
    personal: ExperiencePersonal[];
    work: ExperienceWork[];
  },
) {
  return createCachedSelector(
    getExperience,
    getExperienceSkillByIdState,
    getExperienceSkillByAwardState,
    getExperienceSkillByCommunityState,
    getExperienceSkillByEducationState,
    getExperienceSkillByPersonalState,
    getExperienceSkillByWorkState,
    (
      experiences,
      expSkills,
      idsByAward,
      idsByCommunity,
      idsByEducation,
      idsByPersonal,
      idsByWork,
    ): ExperienceSkill[] => {
      const experienceToSkillsFactory = (expIdToSkillId: {
        [expId: number]: number[];
      }) => (
        experienceSkills: ExperienceSkill[],
        experience: Experience,
      ): ExperienceSkill[] => {
        const expSkillIds = hasKey(expIdToSkillId, experience.id)
          ? expIdToSkillId[experience.id]
          : [];
        const newExpSkills = expSkillIds
          .map((id) => expSkills[id])
          .filter(notEmpty);
        return [...newExpSkills, ...experienceSkills];
      };

      const awardSkills = experiences.award.reduce(
        experienceToSkillsFactory(idsByAward),
        [],
      );
      const communitySkills = experiences.community.reduce(
        experienceToSkillsFactory(idsByCommunity),
        [],
      );
      const educationSkills = experiences.education.reduce(
        experienceToSkillsFactory(idsByEducation),
        [],
      );
      const personalSkills = experiences.personal.reduce(
        experienceToSkillsFactory(idsByPersonal),
        [],
      );
      const workSkills = experiences.work.reduce(
        experienceToSkillsFactory(idsByWork),
        [],
      );
      return [
        ...awardSkills,
        ...communitySkills,
        ...educationSkills,
        ...personalSkills,
        ...workSkills,
      ];
    },
  );
}

export const getExperienceSkillsByApplication = getExperienceSkillsByGroup(
  getExperienceByApplication,
)((state, { applicationId }) => applicationId);

export const getExperienceSkillsByApplicant = getExperienceSkillsByGroup(
  getExperienceByApplicant,
)((state, { applicantId }) => applicantId);

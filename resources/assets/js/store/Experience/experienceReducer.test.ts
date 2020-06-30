import {
  initEntities,
  EntityState,
  entitiesReducer,
} from "./experienceReducer";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperienceAward,
  fakeExperiencePersonal,
} from "../../fakeData/fakeExperience";
import {
  ExperienceAction,
  FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
  FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
  CREATE_EXPERIENCE_SUCCEEDED,
} from "./experienceActions";

describe("Experience Reducer tests", (): void => {
  describe("EntityReducer", (): void => {
    it("adds each experience to correct section when fetching by Applicant", (): void => {
      const initialState = initEntities();

      const work = fakeExperienceWork();
      const education = fakeExperienceEducation();
      const community = fakeExperienceCommunity();
      const award = fakeExperienceAward();
      const personal = fakeExperiencePersonal();
      const applicantId = 12;

      const expectState: EntityState = {
        ...initialState,
        work: {
          byId: { [work.id]: work },
          idsByApplicant: { [applicantId]: [work.id] },
          idsByApplication: {},
        },
        education: {
          byId: { [education.id]: education },
          idsByApplicant: { [applicantId]: [education.id] },
          idsByApplication: {},
        },
        community: {
          byId: { [community.id]: community },
          idsByApplicant: { [applicantId]: [community.id] },
          idsByApplication: {},
        },
        award: {
          byId: { [award.id]: award },
          idsByApplicant: { [applicantId]: [award.id] },
          idsByApplication: {},
        },
        personal: {
          byId: { [personal.id]: personal },
          idsByApplicant: { [applicantId]: [personal.id] },
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: FETCH_EXPERIENCE_BY_APPLICANT_SUCCEEDED,
        payload: [work, education, community, award, personal],
        meta: { applicantId },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("adds each experience to correct section when fetching by Application", (): void => {
      const initialState = initEntities();

      const work = fakeExperienceWork();
      const education = fakeExperienceEducation();
      const community = fakeExperienceCommunity();
      const award = fakeExperienceAward();
      const personal = fakeExperiencePersonal();
      const applicationId = 12;

      const expectState: EntityState = {
        ...initialState,
        work: {
          byId: { [work.id]: work },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [work.id] },
        },
        education: {
          byId: { [education.id]: education },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [education.id] },
        },
        community: {
          byId: { [community.id]: community },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [community.id] },
        },
        award: {
          byId: { [award.id]: award },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [award.id] },
        },
        personal: {
          byId: { [personal.id]: personal },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [personal.id] },
        },
      };
      const action: ExperienceAction = {
        type: FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
        payload: [work, education, community, award, personal],
        meta: { applicationId },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("adds multiple experience of the same type correctly", (): void => {
      const initialState = initEntities();

      const education1 = fakeExperienceEducation({ id: 11 });
      const education2 = fakeExperienceEducation({ id: 22 });
      const applicationId = 12;

      const expectState: EntityState = {
        ...initialState,
        education: {
          byId: { [education1.id]: education1, [education2.id]: education2 },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [education1.id, education2.id] },
        },
        work: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
        community: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
        award: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
        personal: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
      };
      const action: ExperienceAction = {
        type: FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
        payload: [education1, education2],
        meta: { applicationId },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("adds multiple experience of with same id (and different types) correctly", (): void => {
      const initialState = initEntities();

      const id = 11;
      const education1 = fakeExperienceEducation({ id });
      const education2 = fakeExperienceEducation({ id: 22 });
      const community = fakeExperienceCommunity({ id });
      const applicationId = 12;

      const expectState: EntityState = {
        ...initialState,
        education: {
          byId: { [education1.id]: education1, [education2.id]: education2 },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [education1.id, education2.id] },
        },
        community: {
          byId: { [community.id]: community },
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [community.id] },
        },
        work: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
        award: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
        personal: {
          byId: {},
          idsByApplicant: {},
          idsByApplication: { [applicationId]: [] },
        },
      };
      const action: ExperienceAction = {
        type: FETCH_EXPERIENCE_BY_APPLICATION_SUCCEEDED,
        payload: [education1, education2, community],
        meta: { applicationId },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("creates a single experience correctly", (): void => {
      const initialState = initEntities();
      const applicantId = 42;
      const award = fakeExperienceAward({
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const expectState = {
        ...initialState,
        award: {
          byId: {
            [award.id]: award,
          },
          idsByApplicant: {
            [applicantId]: [award.id],
          },
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: CREATE_EXPERIENCE_SUCCEEDED,
        payload: award,
        meta: { type: award.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
  });
});

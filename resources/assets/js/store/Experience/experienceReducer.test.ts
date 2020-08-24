/* eslint-disable @typescript-eslint/camelcase */
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
  UPDATE_EXPERIENCE_SUCCEEDED,
  DELETE_EXPERIENCE_SUCCEEDED,
} from "./experienceActions";
import { Experience } from "../../models/types";

const wrapExp = (experience: Experience) => ({
  experience,
  experienceSkills: [],
});

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
        payload: [work, education, community, award, personal].map(wrapExp),
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
        payload: [work, education, community, award, personal].map(wrapExp),
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
        payload: [education1, education2].map(wrapExp),
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
        payload: [education1, education2, community].map(wrapExp),
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
        payload: wrapExp(award),
        meta: { type: award.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("UPDATE rewrites an existing experience", (): void => {
      const applicantId = 42;
      const id = 111;
      const originalWork = fakeExperienceWork({
        id,
        title: "Original Work",
        organization: "Previous Organisiation",
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const work = fakeExperienceWork({
        id,
        title: "Updated Work",
        organization: "Updated Organization",
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const initialState = {
        ...initEntities(),
        work: {
          byId: { [id]: originalWork },
          idsByApplicant: { [applicantId]: [id] },
          idsByApplication: {},
        },
      };
      const expectState = {
        ...initialState,
        work: {
          byId: { [work.id]: work },
          idsByApplicant: initialState.work.idsByApplicant,
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: UPDATE_EXPERIENCE_SUCCEEDED,
        payload: wrapExp(work),
        meta: { id, type: work.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("UPDATE creates a new experience if it doesn't exist yet.", (): void => {
      const applicantId = 42;
      const id = 111;
      const work = fakeExperienceWork({
        id,
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const initialState = initEntities();
      const expectState = {
        ...initialState,
        work: {
          byId: { [work.id]: work },
          idsByApplicant: { [applicantId]: [id] },
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: UPDATE_EXPERIENCE_SUCCEEDED,
        payload: wrapExp(work),
        meta: { id, type: work.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("DELETE removes an experience.", (): void => {
      const applicantId = 42;
      const id = 111;
      const personal = fakeExperiencePersonal({
        id,
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const initialState = {
        ...initEntities(),
        personal: {
          byId: { [personal.id]: personal },
          idsByApplicant: { [applicantId]: [id] },
          idsByApplication: {},
        },
      };
      const expectState = {
        ...initialState,
        personal: {
          byId: {},
          idsByApplicant: { [applicantId]: [] },
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: DELETE_EXPERIENCE_SUCCEEDED,
        payload: {},
        meta: { id, type: personal.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
    it("DELETE does not affect non-targeted experiences", (): void => {
      const applicantId = 42;
      const id = 111;
      const community = fakeExperienceCommunity({
        id,
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const personal1 = fakeExperiencePersonal({
        id,
        title: "Volunteering Somewhere",
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const personal2 = fakeExperiencePersonal({
        id: 200,
        title: "Personal Project",
        experienceable_id: applicantId,
        experienceable_type: "applicant",
      });
      const initialState = {
        ...initEntities(),
        personal: {
          byId: { [personal1.id]: personal1, [personal2.id]: personal2 },
          idsByApplicant: { [applicantId]: [personal1.id, personal2.id] },
          idsByApplication: {},
        },
        community: {
          byId: { [community.id]: community },
          idsByApplicant: { [applicantId]: [community.id] },
          idsByApplication: {},
        },
      };
      // Personal1 has been removed, personal2 and community are untouched.
      const expectState = {
        ...initialState,
        personal: {
          byId: { [personal2.id]: personal2 },
          idsByApplicant: { [applicantId]: [personal2.id] },
          idsByApplication: {},
        },
      };
      const action: ExperienceAction = {
        type: DELETE_EXPERIENCE_SUCCEEDED,
        payload: {},
        meta: { id: personal1.id, type: personal1.type },
      };
      const newState = entitiesReducer(initialState, action);
      expect(newState).toEqual(expectState);
    });
  });
  it("DELETE does nothing if the target experience is not present.", (): void => {
    const initialState = initEntities();
    const action: ExperienceAction = {
      type: DELETE_EXPERIENCE_SUCCEEDED,
      payload: {},
      meta: { id: 10, type: "experience_work" },
    };
    const expectState = initialState;
    const newState = entitiesReducer(initialState, action);
    expect(newState).toEqual(expectState);
  });
});

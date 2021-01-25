import { initState, RootState } from "../store";
import {
  getWorkByApplicant,
  getExperienceByApplication,
  getExperienceByApplicant,
} from "./experienceSelector";
import { ExperienceWork } from "../../models/types";
import {
  initEntities,
  EntityState,
  initExperienceState,
} from "./experienceReducer";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperienceAward,
  fakeExperiencePersonal,
} from "../../fakeData/fakeExperience";

describe("Experience Selectors", (): void => {
  describe("getWorkByApplicant", (): void => {
    it("returns empty array when store is empty.", () => {
      const state: RootState = initState();
      const experiences: ExperienceWork[] = getWorkByApplicant(state, {
        applicantId: 1,
      });
      expect(experiences).toEqual([]);
    });
    it("returns the correct experiences when extra are present.", () => {
      const applicantId = 100;
      const work1 = fakeExperienceWork({ id: 11 });
      const work2 = fakeExperienceWork({ id: 22 });
      const work3 = fakeExperienceWork({ id: 33 });
      const education1 = fakeExperienceEducation({ id: 11 });
      const education2 = fakeExperienceEducation({ id: 22 });
      const entityState: EntityState = {
        ...initEntities(),
        work: {
          byId: {
            [work1.id]: work1,
            [work2.id]: work2,
            [work3.id]: work3,
          },
          idsByApplicant: {
            [applicantId]: [work1.id, work2.id],
            200: [work3.id],
            300: [],
          },
          idsByApplication: {},
        },
        education: {
          byId: {
            [education1.id]: education1,
            [education2.id]: education2,
          },
          idsByApplicant: {
            [applicantId]: [education1.id],
            200: [education2.id],
          },
          idsByApplication: {},
        },
      };
      const state: RootState = {
        ...initState(),
        experience: {
          ...initExperienceState(),
          entities: entityState,
        },
      };
      expect(getWorkByApplicant(state, { applicantId })).toEqual([
        work1,
        work2,
      ]);
    });
  });
  describe("getExperienceByApplication", (): void => {
    it("returns the correct experiences of all types", (): void => {
      const applicantId = 100;
      const applicationId = 100;
      const work1 = fakeExperienceWork({ id: 11 });
      const work2 = fakeExperienceWork({ id: 22 });
      const work3 = fakeExperienceWork({ id: 33 });
      const education1 = fakeExperienceEducation({ id: 11 });
      const education2 = fakeExperienceEducation({ id: 22 });
      const community1 = fakeExperienceCommunity({ id: 100 });
      const community2 = fakeExperienceCommunity({ id: 200 });
      const award1 = fakeExperienceAward({ id: 1 });
      const award2 = fakeExperienceAward({ id: 2 });
      const personal1 = fakeExperiencePersonal({ id: 15 });
      const personal2 = fakeExperiencePersonal({ id: 25 });
      const personal3 = fakeExperiencePersonal({ id: 35 });
      const entityState: EntityState = {
        ...initEntities(),
        work: {
          byId: {
            [work1.id]: work1,
            [work2.id]: work2,
            [work3.id]: work3,
          },
          idsByApplicant: {
            [applicantId]: [work3.id],
          },
          idsByApplication: {
            [applicationId]: [work1.id],
            [applicationId + 1]: [work2.id],
          },
        },
        education: {
          byId: {
            [education1.id]: education1,
            [education2.id]: education2,
          },
          idsByApplicant: {
            [applicantId]: [education2.id],
          },
          idsByApplication: {
            [applicationId]: [education1.id],
          },
        },
        community: {
          byId: {
            [community1.id]: community1,
            [community2.id]: community2,
          },
          idsByApplicant: {
            [applicantId]: [],
          },
          idsByApplication: {
            [applicationId]: [community1.id, community2.id],
          },
        },
        award: {
          byId: {
            [award1.id]: award1,
            [award2.id]: award2,
          },
          idsByApplicant: {
            [applicantId]: [award1.id, award2.id],
          },
          idsByApplication: {},
        },
        personal: {
          byId: {
            [personal1.id]: personal1,
            [personal2.id]: personal2,
            [personal3.id]: personal3,
          },
          idsByApplicant: {
            [applicantId]: [personal3.id],
          },
          idsByApplication: {
            [applicationId]: [personal1.id, personal2.id],
          },
        },
      };
      const expected = {
        work: [work1],
        education: [education1],
        community: [community1, community2],
        award: [],
        personal: [personal1, personal2],
      };
      const state: RootState = {
        ...initState(),
        experience: {
          ...initExperienceState(),
          entities: entityState,
        },
      };
      expect(getExperienceByApplication(state, { applicationId })).toEqual(
        expected,
      );
    });
  });
  describe("getExperienceByApplicant", (): void => {
    it("returns the correct experiences of all types", (): void => {
      const applicantId = 100;
      const applicationId = 100;
      const work1 = fakeExperienceWork({ id: 11 });
      const work2 = fakeExperienceWork({ id: 22 });
      const work3 = fakeExperienceWork({ id: 33 });
      const education1 = fakeExperienceEducation({ id: 11 });
      const education2 = fakeExperienceEducation({ id: 22 });
      const community1 = fakeExperienceCommunity({ id: 100 });
      const community2 = fakeExperienceCommunity({ id: 200 });
      const award1 = fakeExperienceAward({ id: 1 });
      const award2 = fakeExperienceAward({ id: 2 });
      const personal1 = fakeExperiencePersonal({ id: 15 });
      const personal2 = fakeExperiencePersonal({ id: 25 });
      const personal3 = fakeExperiencePersonal({ id: 35 });
      const entityState: EntityState = {
        ...initEntities(),
        work: {
          byId: {
            [work1.id]: work1,
            [work2.id]: work2,
            [work3.id]: work3,
          },
          idsByApplicant: {
            [applicantId]: [work3.id],
          },
          idsByApplication: {
            [applicationId]: [work1.id],
            [applicationId + 1]: [work2.id],
          },
        },
        education: {
          byId: {
            [education1.id]: education1,
            [education2.id]: education2,
          },
          idsByApplicant: {
            [applicantId]: [education2.id],
          },
          idsByApplication: {
            [applicationId]: [education1.id],
          },
        },
        community: {
          byId: {
            [community1.id]: community1,
            [community2.id]: community2,
          },
          idsByApplicant: {
            [applicantId]: [],
          },
          idsByApplication: {
            [applicationId]: [community1.id, community2.id],
          },
        },
        award: {
          byId: {
            [award1.id]: award1,
            [award2.id]: award2,
          },
          idsByApplicant: {
            [applicantId]: [award1.id, award2.id],
          },
          idsByApplication: {},
        },
        personal: {
          byId: {
            [personal1.id]: personal1,
            [personal2.id]: personal2,
            [personal3.id]: personal3,
          },
          idsByApplicant: {
            [applicantId]: [personal3.id],
          },
          idsByApplication: {
            [applicationId]: [personal1.id, personal2.id],
          },
        },
      };
      const expected = {
        work: [work3],
        education: [education2],
        community: [],
        award: [award1, award2],
        personal: [personal3],
      };
      const state: RootState = {
        ...initState(),
        experience: {
          ...initExperienceState(),
          entities: entityState,
        },
      };
      expect(getExperienceByApplicant(state, { applicantId })).toEqual(
        expected,
      );
    });
  });
});

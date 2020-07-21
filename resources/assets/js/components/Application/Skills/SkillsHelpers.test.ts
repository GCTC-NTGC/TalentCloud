/* eslint-disable @typescript-eslint/camelcase */
import {
  SkillStatus,
  initialStatus,
  computeParentStatus,
  statusReducer,
} from "./SkillsHelpers";
import fakeExperiences from "../../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../../fakeData/fakeSkills";
import { IconStatus } from "../../StatusIcon";
import {
  fakeExperienceEducation,
  fakeExperienceWork,
  fakeExperiencePersonal,
  fakeExperienceCommunity,
  fakeExperienceAward,
} from "../../../fakeData/fakeExperience";

describe("Skills Helpers tests", (): void => {
  const sampleState: SkillStatus = {
    1: {
      experiences: {
        experience_work_1: IconStatus.ERROR,
        experience_award_2: IconStatus.COMPLETE,
        experience_community_3: IconStatus.DEFAULT,
      },
    },
    2: {
      experiences: {
        experience_personal_1: IconStatus.ERROR,
        experience_community_3: IconStatus.DEFAULT,
        experience_award_6: IconStatus.COMPLETE,
      },
    },
    3: {
      experiences: {
        experience_award_1: IconStatus.COMPLETE,
        experience_work_1: IconStatus.COMPLETE,
        experience_work_3: IconStatus.COMPLETE,
      },
    },
    4: {
      experiences: {
        experience_personal_1: IconStatus.DEFAULT,
        experience_community_1: IconStatus.COMPLETE,
        experience_award_2: IconStatus.COMPLETE,
      },
    },
    5: {
      experiences: {
        experience_work_1: IconStatus.DEFAULT,
        experience_work_2: IconStatus.DEFAULT,
        experience_education_3: IconStatus.DEFAULT,
      },
    },
  };
  describe("Initial Icon Status", (): void => {
    it("Constructs an experience list into an initial status object", (): void => {
      const expectState: SkillStatus = {
        [fakeSkills()[0].id]: {
          experiences: {
            [`experience_${fakeExperienceEducation().type}_${
              fakeExperienceEducation().id
            }`]: IconStatus.DEFAULT,
            [`experience_${fakeExperienceWork().type}_${
              fakeExperienceWork().id
            }`]: IconStatus.DEFAULT,
          },
        },
        [fakeSkills()[3].id]: {
          experiences: {
            [`experience_${fakeExperiencePersonal().type}_${
              fakeExperiencePersonal().id
            }`]: IconStatus.DEFAULT,
            [`experience_${fakeExperienceCommunity().type}_${
              fakeExperienceCommunity().id
            }`]: IconStatus.DEFAULT,
          },
        },
        [fakeSkills()[2].id]: {
          experiences: {
            [`experience_${fakeExperienceAward().type}_${
              fakeExperienceAward().id
            }`]: IconStatus.DEFAULT,
          },
        },
      };
      expect(initialStatus(fakeExperiences())).toEqual(expectState);
    });
  });
  describe("Sidebar Icon Status", (): void => {
    it("Displays error if one or more experiences contain error.", (): void => {
      expect(computeParentStatus(sampleState, 1)).toEqual(IconStatus.ERROR);
      expect(computeParentStatus(sampleState, 2)).toEqual(IconStatus.ERROR);
    });
    it("Displays complete if all experiences are complete.", (): void => {
      expect(computeParentStatus(sampleState, 3)).toEqual(IconStatus.COMPLETE);
    });
    it("Displays default if experiences contain no error and less than all experiences are complete.", (): void => {
      expect(computeParentStatus(sampleState, 4)).toEqual(IconStatus.DEFAULT);
      expect(computeParentStatus(sampleState, 5)).toEqual(IconStatus.DEFAULT);
    });
  });
  describe("Status Reducer", (): void => {
    it("Updates the expected experience status with the provided status.", (): void => {
      const addError = {
        payload: {
          skillId: 3,
          experienceId: 1,
          experienceType: "experience_award",
          status: IconStatus.ERROR,
        },
      };

      const addComplete = {
        payload: {
          skillId: 4,
          experienceId: 1,
          experienceType: "experience_personal",
          status: IconStatus.COMPLETE,
        },
      };

      const expectedStateError: SkillStatus = {
        1: {
          experiences: {
            experience_work_1: IconStatus.ERROR,
            experience_award_2: IconStatus.COMPLETE,
            experience_community_3: IconStatus.DEFAULT,
          },
        },
        2: {
          experiences: {
            experience_personal_1: IconStatus.ERROR,
            experience_community_3: IconStatus.DEFAULT,
            experience_award_6: IconStatus.COMPLETE,
          },
        },
        3: {
          experiences: {
            experience_award_1: IconStatus.ERROR,
            experience_work_1: IconStatus.COMPLETE,
            experience_work_3: IconStatus.COMPLETE,
          },
        },
        4: {
          experiences: {
            experience_personal_1: IconStatus.DEFAULT,
            experience_community_1: IconStatus.COMPLETE,
            experience_award_2: IconStatus.COMPLETE,
          },
        },
        5: {
          experiences: {
            experience_work_1: IconStatus.DEFAULT,
            experience_work_2: IconStatus.DEFAULT,
            experience_education_3: IconStatus.DEFAULT,
          },
        },
      };

      const expectedStateComplete: SkillStatus = {
        1: {
          experiences: {
            experience_work_1: IconStatus.ERROR,
            experience_award_2: IconStatus.COMPLETE,
            experience_community_3: IconStatus.DEFAULT,
          },
        },
        2: {
          experiences: {
            experience_personal_1: IconStatus.ERROR,
            experience_community_3: IconStatus.DEFAULT,
            experience_award_6: IconStatus.COMPLETE,
          },
        },
        3: {
          experiences: {
            experience_award_1: IconStatus.COMPLETE,
            experience_work_1: IconStatus.COMPLETE,
            experience_work_3: IconStatus.COMPLETE,
          },
        },
        4: {
          experiences: {
            experience_personal_1: IconStatus.COMPLETE,
            experience_community_1: IconStatus.COMPLETE,
            experience_award_2: IconStatus.COMPLETE,
          },
        },
        5: {
          experiences: {
            experience_work_1: IconStatus.DEFAULT,
            experience_work_2: IconStatus.DEFAULT,
            experience_education_3: IconStatus.DEFAULT,
          },
        },
      };
      expect(statusReducer(sampleState, addError)).toEqual(expectedStateError);
      expect(statusReducer(sampleState, addComplete)).toEqual(
        expectedStateComplete,
      );
    });
  });
});

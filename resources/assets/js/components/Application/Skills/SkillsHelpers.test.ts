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
        1: IconStatus.ERROR,
        2: IconStatus.COMPLETE,
        3: IconStatus.DEFAULT,
      },
    },
    2: {
      experiences: {
        1: IconStatus.ERROR,
        3: IconStatus.DEFAULT,
        6: IconStatus.COMPLETE,
      },
    },
    3: {
      experiences: {
        1: IconStatus.COMPLETE,
        2: IconStatus.COMPLETE,
        3: IconStatus.COMPLETE,
      },
    },
    4: {
      experiences: {
        1: IconStatus.DEFAULT,
        2: IconStatus.COMPLETE,
        3: IconStatus.COMPLETE,
      },
    },
    5: {
      experiences: {
        1: IconStatus.DEFAULT,
        2: IconStatus.DEFAULT,
        3: IconStatus.DEFAULT,
      },
    },
  };
  describe("Initial Icon Status", (): void => {
    it("Constructs an experience list into an initial status object", (): void => {
      const expectState: SkillStatus = {
        [fakeSkills()[0].id]: {
          experiences: {
            [fakeExperienceEducation().id]: IconStatus.DEFAULT,
            [fakeExperienceWork().id]: IconStatus.DEFAULT,
          },
        },
        [fakeSkills()[3].id]: {
          experiences: {
            [fakeExperiencePersonal().id]: IconStatus.DEFAULT,
            [fakeExperienceCommunity().id]: IconStatus.DEFAULT,
          },
        },
        [fakeSkills()[2].id]: {
          experiences: {
            [fakeExperienceAward().id]: IconStatus.DEFAULT,
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
        payload: { skillId: 3, experienceId: 1, status: IconStatus.ERROR },
      };

      const addComplete = {
        payload: { skillId: 4, experienceId: 1, status: IconStatus.COMPLETE },
      };

      const expectedStateError: SkillStatus = {
        1: {
          experiences: {
            1: IconStatus.ERROR,
            2: IconStatus.COMPLETE,
            3: IconStatus.DEFAULT,
          },
        },
        2: {
          experiences: {
            1: IconStatus.ERROR,
            3: IconStatus.DEFAULT,
            6: IconStatus.COMPLETE,
          },
        },
        3: {
          experiences: {
            1: IconStatus.ERROR,
            2: IconStatus.COMPLETE,
            3: IconStatus.COMPLETE,
          },
        },
        4: {
          experiences: {
            1: IconStatus.DEFAULT,
            2: IconStatus.COMPLETE,
            3: IconStatus.COMPLETE,
          },
        },
        5: {
          experiences: {
            1: IconStatus.DEFAULT,
            2: IconStatus.DEFAULT,
            3: IconStatus.DEFAULT,
          },
        },
      };

      const expectedStateComplete: SkillStatus = {
        1: {
          experiences: {
            1: IconStatus.ERROR,
            2: IconStatus.COMPLETE,
            3: IconStatus.DEFAULT,
          },
        },
        2: {
          experiences: {
            1: IconStatus.ERROR,
            3: IconStatus.DEFAULT,
            6: IconStatus.COMPLETE,
          },
        },
        3: {
          experiences: {
            1: IconStatus.COMPLETE,
            2: IconStatus.COMPLETE,
            3: IconStatus.COMPLETE,
          },
        },
        4: {
          experiences: {
            1: IconStatus.COMPLETE,
            2: IconStatus.COMPLETE,
            3: IconStatus.COMPLETE,
          },
        },
        5: {
          experiences: {
            1: IconStatus.DEFAULT,
            2: IconStatus.DEFAULT,
            3: IconStatus.DEFAULT,
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

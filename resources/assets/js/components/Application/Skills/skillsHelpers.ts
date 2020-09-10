import { ExperienceSkill } from "../../../models/types";
import { IconStatus } from "../../StatusIcon";
import { hasKey } from "../../../helpers/queries";

export interface SkillStatus {
  [skillId: string]: {
    experiences: {
      [experienceTypeAndId: string]: IconStatus;
    };
  };
}

/**
 * Constructs an initial state object to pass to the statusReducer function.
 * Accepts an array of experiences and creates an object of shape SkillStatus.
 *
 * @param experiences Array of ExperienceSkill.
 * @returns SkillStatus.
 */
export const initialStatus = (experiences: ExperienceSkill[]): SkillStatus =>
  experiences.reduce((status, experience: ExperienceSkill) => {
    if (!status[experience.skill_id]) {
      status[experience.skill_id] = {
        experiences: {
          [`${experience.experience_type}_${experience.experience_id}`]: IconStatus.DEFAULT,
        },
      };
    }

    status[experience.skill_id].experiences[
      `${experience.experience_type}_${experience.experience_id}`
    ] = IconStatus.DEFAULT;
    return status;
  }, {});

/**
 * Return the IconStatus for the Skill based on the defined statuses of all
 * the nested experiences. The possibilities are COMPLETE, ERROR and DEFAULT.
 * If one experience has an ERROR, that will be returned. If all experiences are
 * COMPLETE, that will be returned. Otherwise, DEFAULT will be returned.
 *
 * @param statusShape Provided state object containing all statuses for all skills.
 * @param skillId Skill ID for the particular skill to check.
 *
 * @returns IconStatus
 */
export const computeParentStatus = (
  statusShape: SkillStatus,
  skillId: number,
): IconStatus => {
  if (statusShape[skillId]) {
    const skillStatus = statusShape[skillId];
    let errorCount = 0;
    let completeCount = 0;
    Object.values(skillStatus.experiences).forEach((experience) => {
      if (experience === IconStatus.ERROR) {
        errorCount += 1;
      }
      if (experience === IconStatus.COMPLETE) {
        completeCount += 1;
      }
    });

    if (errorCount > 0) {
      return IconStatus.ERROR;
    }
    if (completeCount === Object.values(skillStatus.experiences).length) {
      return IconStatus.COMPLETE;
    }
  }

  return IconStatus.DEFAULT;
};

/** Get current experienceSkill status if it's stored in status store, or return DEFAULT. */
export const computeEperienceStatus = (
  statusShape: SkillStatus,
  experienceSkill: ExperienceSkill,
): IconStatus => {
  const skillId = experienceSkill.skill_id;
  const experienceKey = `${experienceSkill.experience_type}_${experienceSkill.experience_id}`;
  return hasKey(statusShape, skillId) &&
    hasKey(statusShape[skillId].experiences, experienceKey)
    ? statusShape[skillId].experiences[experienceKey]
    : IconStatus.DEFAULT;
};

/**
 * Updates a slice of the status state based on provided payload.
 * Requires the Skill ID, Experience ID, and new status.
 *
 * @param state SkillStatus state object.
 * @param action Object with a payload of skillId, experienceId, and status.
 * @returns SkillStatus.
 */
export const statusReducer = (
  state: SkillStatus,
  action: {
    payload: {
      skillId: number;
      experienceId: number;
      experienceType: string;
      status: IconStatus;
    };
  },
): SkillStatus => {
  return {
    ...state,
    [action.payload.skillId]: {
      experiences: {
        ...state[action.payload.skillId].experiences,
        [`${action.payload.experienceType}_${action.payload.experienceId}`]: action
          .payload.status,
      },
    },
  };
};

import { Criteria, ExperienceSkill, Skill } from "../../../models/types";
import { mapToObject, getId, hasKey } from "../../../helpers/queries";
import { IconStatus } from "../../StatusIcon";

export const getSkillOfCriteria = (
  criterion: Criteria,
  skills: Skill[],
): Skill | null => {
  const skillsById = mapToObject(skills, getId);
  return hasKey(skillsById, criterion.skill_id)
    ? skillsById[criterion.skill_id]
    : null;
};

export const getExperiencesOfSkill = (
  skill: Skill,
  experiences: ExperienceSkill[],
): ExperienceSkill[] =>
  experiences.filter((experience) => experience.skill_id === skill.id);

export interface SkillStatus {
  [x: string]: {
    experiences: {
      [k: string]: IconStatus;
    };
  };
}

export const initialStatus = (experiences: ExperienceSkill[]): SkillStatus =>
  experiences.reduce((status, experience: ExperienceSkill) => {
    if (!status[experience.skill_id]) {
      status[experience.skill_id] = {
        experiences: {
          [experience.experience_id]: IconStatus.DEFAULT,
        },
      };
    }

    status[experience.skill_id].experiences[experience.experience_id] =
      IconStatus.DEFAULT;
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

export const statusReducer = (
  state: SkillStatus,
  action: {
    payload: { skillId: number; experienceId: number; status: IconStatus };
  },
): SkillStatus => {
  return {
    ...state,
    [action.payload.skillId]: {
      experiences: {
        ...state[action.payload.skillId].experiences,
        [action.payload.experienceId]: action.payload.status,
      },
    },
  };
};

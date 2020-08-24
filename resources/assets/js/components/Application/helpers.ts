import {
  Criteria,
  Experience,
  ExperienceSkill,
  Skill,
} from "../../models/types";
import { mapToObject, getId, hasKey } from "../../helpers/queries";

/**
 * Retrieves Skill associated to Criterion by ID.
 *
 * @param criterion Criteria object.
 * @param skills Array of Skill objects.
 * @returns null if not found or Skill object.
 */
export const getSkillOfCriteria = (
  criterion: Criteria,
  skills: Skill[],
): Skill | null => {
  const skillsById = mapToObject(skills, getId);
  return hasKey(skillsById, criterion.skill_id)
    ? skillsById[criterion.skill_id]
    : null;
};

/**
 * Retrieves array of ExperienceSkill objects associated to
 * Skill by ID.
 * @param skill Skill object.
 * @param experiences Array of ExperienceSkill objects.
 * @returns Array of ExperienceSkill objects.
 */
export const getExperiencesOfSkill = (
  skill: Skill,
  experiences: ExperienceSkill[],
): ExperienceSkill[] =>
  experiences.filter((experience) => experience.skill_id === skill.id);

/**
 * Retrieves Experience associated to ExperienceSkill by Type and ID.
 *
 * @param experienceSkill ExperienceSkill object.
 * @param experiences Array of ExperienceSkill objects.
 * @returns null if not found or Experience object.
 */
export const getExperienceOfExperienceSkills = (
  experienceSkill: ExperienceSkill,
  experiences: Experience[],
): Experience | null => {
  const experiencesByType = experiences.filter(
    (experience) => experience.type === experienceSkill.experience_type,
  );
  const experiencesById = mapToObject(experiencesByType, getId);
  return hasKey(experiencesById, experienceSkill.experience_id)
    ? experiencesById[experienceSkill.experience_id]
    : null;
};

/**
 * Returns a justification for a combination Skill and Experience record.
 *
 * @param skill Skill object.
 * @param experience Experience object.
 * @param experienceSkills Array of ExperienceSkill objects.
 * @returns null if not found or Experience object.
 */
export const getJustificationOfExperience = (
  skill: Skill,
  experience: Experience,
  experienceSkills: ExperienceSkill[],
): string => {
  const filteredExperienceSkills = experienceSkills.filter(
    (experienceSkill) =>
      experienceSkill.skill_id === skill.id &&
      experienceSkill.experience_id === experience.id,
  );
  if (
    filteredExperienceSkills.length === 1 &&
    filteredExperienceSkills[0].justification
  ) {
    return filteredExperienceSkills[0].justification;
  }
  return "";
};

export const getIrrelevantSkillCount = (
  criteria: Criteria[],
  experience: Experience,
  experienceSkills: ExperienceSkill[],
): number => {
  const relatedSkills = experienceSkills.filter(
    (experienceSkill) =>
      experienceSkill.experience_type === experience.type &&
      experienceSkill.experience_id === experience.id,
  );
  const irrelevantSkills = relatedSkills.filter(
    (experienceSkill) =>
      !criteria.some(
        (criterion) => criterion.skill_id === experienceSkill.skill_id,
      ),
  );
  return irrelevantSkills.length;
};

import { Experience } from "../../../models/types";

export type ExperienceSubmitData<T extends Experience> = {
  experience: T;
  savedSkills: { skillId: number; justification: string }[];
};

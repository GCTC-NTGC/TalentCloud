import React from "react";
import {
  Criteria,
  Experience,
  Skill,
  ExperienceSkill,
} from "../../models/types";
import {
  ExperienceSubmitData,
  MyExperience,
} from "../Application/Experience/Experience";
import {
  AwardRecipientType,
  AwardRecognitionType,
} from "../Application/ExperienceModals/AwardExperienceModal";
import {
  EducationStatus,
  EducationType,
} from "../Application/ExperienceModals/EducationExperienceModal";

export interface ProfileExperienceProps {
  experiences: Experience[];
  educationStatuses: EducationStatus[];
  educationTypes: EducationType[];
  experienceSkills: ExperienceSkill[];
  criteria: Criteria[];
  skills: Skill[];
  jobId: number;
  jobClassificationId: number | null;
  jobEducationRequirements: string | null;
  recipientTypes: AwardRecipientType[];
  recognitionTypes: AwardRecognitionType[];
  handleSubmitExperience: (data: ExperienceSubmitData) => Promise<void>;
  handleDeleteExperience: (
    id: number,
    type: Experience["type"],
  ) => Promise<void>;
}

export const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experiences,
  educationStatuses,
  educationTypes,
  experienceSkills,
  criteria,
  skills,
  handleSubmitExperience,
  handleDeleteExperience,
  jobId,
  jobClassificationId,
  jobEducationRequirements,
  recipientTypes,
  recognitionTypes,
}) => {
  return (
    <MyExperience
      experiences={experiences}
      educationStatuses={educationStatuses}
      educationTypes={educationTypes}
      experienceSkills={experienceSkills}
      criteria={criteria}
      skills={skills}
      jobId={jobId}
      jobClassificationId={jobClassificationId}
      jobEducationRequirements={jobEducationRequirements}
      recipientTypes={recipientTypes}
      recognitionTypes={recognitionTypes}
      handleSubmitExperience={handleSubmitExperience}
      handleDeleteExperience={handleDeleteExperience}
      context="profile"
    />
  );
};

export default ProfileExperience;

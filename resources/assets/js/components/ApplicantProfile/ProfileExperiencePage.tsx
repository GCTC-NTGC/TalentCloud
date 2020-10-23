import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { fetchSkills } from "../../store/Skill/skillActions";
import { getSkills, getSkillsUpdating } from "../../store/Skill/skillSelector";
import RootContainer from "../RootContainer";
import ProfileExperience from "./ProfileExperience";
import {
  educationStatuses as fakeEducationStatuses,
  educationTypes as fakeEducationTypes,
  recipientTypes as fakeRecipientTypes,
  recogntitionTypes as fakeRecognitionTypes,
} from "../../stories/Application/ExperienceModals.stories";
import fakeExperiences from "../../fakeData/fakeExperience";

const ProfileExperiencePage: FunctionComponent = () => {
  const dispatch = useDispatch();

  const skills = useSelector(getSkills);
  const skillsUpdating = useSelector(getSkillsUpdating);
  useEffect(() => {
    if (skills.length === 0 && !skillsUpdating) {
      dispatch(fetchSkills());
    }
  }, [skills.length, skillsUpdating, dispatch]);

  // TODO: fix.
  const experiences = fakeExperiences();
  const experienceSkills = fakeExperienceSkills();
  const educationStatuses = fakeEducationStatuses;
  const educationTypes = fakeEducationTypes;
  const recipientTypes = fakeRecipientTypes;
  const recognitionTypes = fakeRecognitionTypes;

  const handleSubmitExperience = async () => {};
  const handleDeleteExperience = async () => {};
  const handleUpdateExperienceSkill = async () => {};
  const handleDeleteExperienceSkill = async () => {};

  return (
    <ProfileExperience
      experiences={experiences}
      experienceSkills={experienceSkills}
      skills={skills}
      educationStatuses={educationStatuses}
      educationTypes={educationTypes}
      handleSubmitExperience={handleSubmitExperience}
      handleDeleteExperience={handleDeleteExperience}
      handleUpdateExperienceSkill={handleUpdateExperienceSkill}
      handleDeleteExperienceSkill={handleDeleteExperienceSkill}
      recipientTypes={recipientTypes}
      recognitionTypes={recognitionTypes}
    />
  );
};

if (document.getElementById("application-root")) {
  const root = document.getElementById("application-root");
  ReactDOM.render(
    <RootContainer>
      <ProfileExperiencePage />
    </RootContainer>,
    root,
  );
}

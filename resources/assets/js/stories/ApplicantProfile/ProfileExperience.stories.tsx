import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState as useStorybookState } from "@storybook/addons";
import { Formik } from "formik";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import {
  fakeAssetSkills,
  fakeEssentialSkills,
  fakeSkills,
} from "../../fakeData/fakeSkills";
import ProfileExperience from "../../components/ApplicantProfile/Experience/ProfileExperience";
import { Experience, ExperienceSkill } from "../../models/types";
import {
  educationStatuses,
  educationTypes,
  recipientTypes,
  recogntitionTypes,
} from "../Application/ExperienceModals.stories";
import { sleep } from "../helpers";
import { ProfileSkillSubform } from "../../components/ApplicantProfile/Experience/ProfileSkillSubform";
import ApplicationSkillSubform from "../../components/Application/ExperienceModals/SkillSubform";
import { ExperienceSubmitData } from "../../components/ApplicantProfile/Experience/ProfileExperienceCommon";

const stories = storiesOf("Applicant Profile/Experience", module).addDecorator(
  withIntl,
);

const isSameExperience = (original: Experience) => (
  match: Experience,
): boolean => {
  return original.id === match.id && original.type === match.type;
};

const makeExpSkill = (
  experience: Experience,
  skillId: number,
  justification: string,
): ExperienceSkill => ({
  id: 1,
  skill_id: skillId,
  experience_id: experience.id,
  experience_type: experience.type,
  justification,
  created_at: new Date(),
  updated_at: new Date(),
});

const submitExperience = (experiences, setExperiences, setExperienceSkills) => (
  experienceSubmitData: ExperienceSubmitData<Experience>,
): void => {
  const matchesSubmitted = isSameExperience(experienceSubmitData.experience);
  const index = experiences.findIndex(matchesSubmitted);
  if (index === -1) {
    setExperiences([experienceSubmitData.experience, ...experiences]);
  } else {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceSubmitData.experience;
    setExperiences(newExperiences);
  }
  setExperienceSkills(
    experienceSubmitData.savedSkills.map((x) =>
      makeExpSkill(experienceSubmitData.experience, x.skillId, x.justification),
    ),
  );
};

const handleCreateExperience = (
  experiences,
  setExperiences,
  setExperienceSkills,
) => async (data: ExperienceSubmitData<Experience>): Promise<void> => {
  await sleep(1000);
  submitExperience(experiences, setExperiences, setExperienceSkills)(data);
  action("Experience Created")(data);
};
const handleUpdateExperience = (
  experiences,
  setExperiences,
  setExperienceSkills,
) => async (data: ExperienceSubmitData<Experience>): Promise<void> => {
  await sleep(1000);
  submitExperience(experiences, setExperiences, setExperienceSkills)(data);
  action("Experience Updated")(data);
};

const handleDeleteExperience = (experiences, setExperiences) => async (
  id: number,
  type: string,
): Promise<void> => {
  await sleep(1000);
  setExperiences(
    experiences.filter(
      (experience) => !(experience.id === id && experience.type === type),
    ),
  );
  action("Experience Deleted")({ id, type });
};

stories.add(
  "Basic",
  (): React.ReactElement => {
    const [experiences, setExperiences] = useStorybookState(fakeExperiences());
    const [experienceSkills, setExperienceSkills] = useStorybookState(
      fakeExperienceSkills(),
    );

    return (
      <ProfileExperience
        experiences={experiences}
        experienceSkills={experienceSkills}
        skills={fakeSkills()}
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        handleCreateExperience={handleCreateExperience(
          experiences,
          setExperiences,
          setExperienceSkills,
        )}
        handleUpdateExperience={handleUpdateExperience(
          experiences,
          setExperiences,
          setExperienceSkills,
        )}
        handleDeleteExperience={handleDeleteExperience(
          experiences,
          setExperiences,
        )}
        recipientTypes={recipientTypes}
        recognitionTypes={recogntitionTypes}
      />
    );
  },
);
stories.add("Application SkillSubform (for comparison)", () => {
  return (
    <Formik initialValues={{ work: [] }} onSubmit={() => {}}>
      {() => (
        <ApplicationSkillSubform
          keyPrefix="work"
          jobId={1}
          jobRequiredSkills={fakeEssentialSkills().map((s) => s.name.en)}
          jobOptionalSkills={fakeAssetSkills().map((s) => s.name.en)}
        />
      )}
    </Formik>
  );
});
stories.add("Profile SkillSubform", () => {
  return (
    <Formik initialValues={{ skills: {} }} onSubmit={() => {}}>
      {() => <ProfileSkillSubform keyPrefix="work" skills={fakeSkills()} />}
    </Formik>
  );
});

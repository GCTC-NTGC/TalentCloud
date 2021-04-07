import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState as useStorybookState } from "@storybook/addons";
import random from "lodash/random";
import ExperienceStep from "../../components/Application/Experience/Experience";
import { fakeSkills } from "../../fakeData/fakeSkills";
import {
  educationStatuses,
  educationTypes,
  recipientTypes,
  recognitionTypes,
} from "./ExperienceModals.stories";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { Experience, ExperienceSkill } from "../../models/types";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
import { ExperienceSubmitData } from "../../components/Application/ExperienceModals/ExperienceModalCommon";
import { fakeClassification1 } from "../../fakeData/fakeClassifications";
import fakeJob from "../../fakeData/fakeJob";
import { sleep } from "../helpers";

const stories = storiesOf("Application/My Experience", module).addDecorator(
  withIntl,
);

const isSameExperience = (original: Experience) => (
  match: Experience,
): boolean => {
  return original.id === match.id && original.type === match.type;
};

const makeExpSkill = (
  experienceSkillCount: number,
  experience: Experience,
  skillId: number,
): ExperienceSkill => ({
  id: experienceSkillCount + 1,
  skill_id: skillId,
  experience_id: experience.id,
  experience_type: experience.type,
  justification: "",
  created_at: new Date(),
  updated_at: new Date(),
});

const submitExperience = (
  experiences: Experience[],
  setExperiences,
  experienceSkills: ExperienceSkill[],
  setExperienceSkills,
) => (experienceSubmitData: ExperienceSubmitData<Experience>): void => {
  const matchesSubmitted = isSameExperience(experienceSubmitData.experience);
  const index = experiences.findIndex(matchesSubmitted);
  // eslint-disable-next-line no-param-reassign
  experienceSubmitData.experience.id = random(5, 1000); // set id to random value to avoid every value being the same (0)
  if (index === -1) {
    setExperiences([experienceSubmitData.experience, ...experiences]);
  } else {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceSubmitData.experience;
    setExperiences(newExperiences);
  }
  setExperienceSkills(
    experienceSubmitData.savedRequiredSkills.map((x) =>
      makeExpSkill(
        experienceSkills.length,
        experienceSubmitData.experience,
        x.id,
      ),
    ),
  );
};

const handleCreateExperience = (
  experiences,
  setExperiences,
  experienceSkills,
  setExperienceSkills,
) => async (data: ExperienceSubmitData<Experience>): Promise<void> => {
  await sleep(1000);
  submitExperience(
    experiences,
    setExperiences,
    experienceSkills,
    setExperienceSkills,
  )(data);
  action("Experience Created")(data);
};

const handleDeleteExperience = (experiences, setExperiences) => async (
  id: number,
  type: string,
): Promise<void> => {
  await sleep(1000);
  setExperiences(
    experiences.filter(
      (experience: Experience) =>
        !(experience.id === id && experience.type === type),
    ),
  );
  action("Experience Deleted")({ id, type });
};

stories.add(
  "Experience Step",
  (): React.ReactElement => {
    const [experiences, setExperiences] = useStorybookState(fakeExperiences());
    const [experienceSkills, setExperienceSkills] = useStorybookState(
      fakeExperienceSkills(),
    );

    return (
      <ExperienceStep
        experiences={experiences}
        experienceSkills={experienceSkills}
        criteria={fakeCriteria()}
        skills={fakeSkills()}
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        handleSubmitExperience={handleCreateExperience(
          experiences,
          setExperiences,
          experienceSkills,
          setExperienceSkills,
        )}
        handleDeleteExperience={handleDeleteExperience(
          experiences,
          setExperiences,
        )}
        jobId={1}
        jobEducationRequirements={fakeJob().education.en}
        classificationEducationRequirements={
          fakeClassification1().education_requirements.en
        }
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        handleContinue={action("Save and Continue")}
        handleQuit={action("Save and Quit")}
        handleReturn={action("Save and Return")}
      />
    );
  },
);

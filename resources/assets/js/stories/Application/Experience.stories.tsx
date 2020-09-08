/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import MyExperience, {
  ExperienceSubmitData,
} from "../../components/Application/Experience/Experience";
import { fakeSkills } from "../../fakeData/fakeSkills";
import {
  educationStatuses,
  educationTypes,
  recipientTypes,
  recogntitionTypes,
} from "./ExperienceModals.stories";
import { EducationExperienceSubmitData } from "../../components/Application/ExperienceModals/EducationExperienceModal";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills, {
  createFakeExperienceSkill,
} from "../../fakeData/fakeExperienceSkills";
import { Experience, Skill } from "../../models/types";
import { fakeCriteria } from "../../fakeData/fakeCriteria";

const stories = storiesOf("Application|My Experience", module).addDecorator(
  withIntl,
);

const experiences = fakeExperiences();
const experienceSkills = fakeExperienceSkills();

const submitExperience = (
  experienceSubmitData: Experience,
  skills: Skill[],
) => {
  const index = experiences.findIndex(
    (experience) =>
      experience.id === experienceSubmitData.id &&
      experience.type === experienceSubmitData.type,
  );
  if (
    experiences.some(
      (experience) =>
        experience.id === experienceSubmitData.id &&
        experience.type === experienceSubmitData.type,
    )
  ) {
    experiences[index] = experienceSubmitData;
  } else {
    experiences.push(experienceSubmitData);
    skills.forEach((skill) => {
      experienceSkills.push(
        createFakeExperienceSkill(experienceSubmitData, skill),
      );
    });
  }
};

const handleSubmitExperience = async (
  data: ExperienceSubmitData,
): Promise<void> => {
  const {
    experienceEducation,
    savedRequiredSkills,
    savedOptionalSkills,
  } = data as EducationExperienceSubmitData;
  submitExperience(experienceEducation, [
    ...savedRequiredSkills,
    ...savedOptionalSkills,
  ]);
};

const handleDeleteExperience = async (
  id: number,
  type: string,
): Promise<void> => {
  const index = experiences.findIndex(
    (experience) => experience.id === id && experience.type === type,
  );

  if (index > -1) {
    experiences.splice(index, 1);
  }
};

stories.add(
  "Experience Step",
  (): React.ReactElement => (
    <MyExperience
      experiences={experiences}
      experienceSkills={experienceSkills}
      criteria={fakeCriteria()}
      skills={fakeSkills()}
      educationStatuses={educationStatuses}
      educationTypes={educationTypes}
      handleSubmitExperience={async (data) => {
        handleSubmitExperience(data);
        action("Confirmed")(data);
      }}
      handleDeleteExperience={async (id, type) => {
        handleDeleteExperience(id, type);
        action("Experience Deleted")(id);
      }}
      jobId={1}
      jobClassificationId={1}
      recipientTypes={recipientTypes}
      recognitionTypes={recogntitionTypes}
      handleContinue={action("Save and Continue")}
      handleQuit={action("Save and Quit")}
      handleReturn={action("Save and Return")}
    />
  ),
);

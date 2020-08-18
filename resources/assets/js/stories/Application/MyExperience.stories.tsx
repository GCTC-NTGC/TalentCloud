/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import MyExperience, {
  ExperienceSubmitData,
} from "../../components/Application/Experience/MyExperience";
import {
  fakeAssetSkills,
  fakeEssentialSkills,
} from "../../fakeData/fakeSkills";
import {
  educationStatuses,
  educationTypes,
  experienceRequirements,
  recipientTypes,
  recogntitionTypes,
} from "./ExperienceModals.stories";
import { EducationExperienceSubmitData } from "../../components/Application/ExperienceModals/EducationExperienceModal";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills, {
  createFakeExperienceSkill,
} from "../../fakeData/fakeExperienceSkills";

const stories = storiesOf("Application|My Experience", module).addDecorator(
  withIntl,
);

const experiences = [...fakeExperiences()];
const experienceSkills = [...fakeExperienceSkills()];

const handleSubmitExperience = async (
  data: ExperienceSubmitData,
): Promise<void> => {
  const {
    experienceEducation,
    savedRequiredSkills,
  } = data as EducationExperienceSubmitData;
  const index = experiences.findIndex(
    (experience) =>
      experience.id === experienceEducation.id &&
      experience.type === experienceEducation.type,
  );
  if (
    experiences.some(
      (experience) =>
        experience.id === experienceEducation.id &&
        experience.type === experienceEducation.type,
    )
  ) {
    experiences[index] = experienceEducation;
  } else {
    experiences.push(experienceEducation);
    savedRequiredSkills.map((skill) => {
      experienceSkills.push(
        createFakeExperienceSkill(experienceEducation, skill),
      );
    });
  }
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
      assetSkills={fakeAssetSkills()}
      educationStatuses={educationStatuses}
      educationTypes={educationTypes}
      essentialSkills={fakeEssentialSkills()}
      experienceRequirements={experienceRequirements}
      handleSubmitExperience={async (data) => {
        handleSubmitExperience(data);
        action("Confirmed")(data);
      }}
      handleDeleteExperience={async (id, type) => {
        handleDeleteExperience(id, type);
        action("Experience Deleted")(id);
      }}
      jobId={1}
      recipientTypes={recipientTypes}
      recognitionTypes={recogntitionTypes}
      handleContinue={action("Save and Continue")}
      handleQuit={action("Save and Quit")}
      handleReturn={action("Save and Return")}
    />
  ),
);

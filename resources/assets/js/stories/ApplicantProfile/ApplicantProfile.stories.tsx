/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills, {
  createFakeExperienceSkill,
} from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import ApplicantProfile from "../../components/ApplicantProfile/ApplicantProfile";
import { Experience, Skill } from "../../models/types";
import { ExperienceSubmitData } from "../../components/Application/Experience/Experience";
import { EducationExperienceSubmitData } from "../../components/Application/ExperienceModals/EducationExperienceModal";
import {
  educationStatuses,
  educationTypes,
  recipientTypes,
  recogntitionTypes,
} from "../Application/ExperienceModals.stories";
import { ClassificationId } from "../../models/lookupConstants";
import { educationMessages } from "../../components/JobBuilder/Details/JobDetailsMessages";

const stories = storiesOf("Applicant|Profile", module).addDecorator(withIntl);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const promiseAction = (text: string) => async () => {
  sleep(1000);
  action(text)();
};

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
  "Profile",
  (): React.ReactElement => (
    <ApplicantProfile
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
      jobClassificationId={ClassificationId.CS}
      jobEducationRequirements={educationMessages.CS.defaultMessage}
      recipientTypes={recipientTypes}
      recognitionTypes={recogntitionTypes}
    />
  ),
);

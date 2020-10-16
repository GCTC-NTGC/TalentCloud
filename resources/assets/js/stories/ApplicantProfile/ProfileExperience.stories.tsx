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
import ProfileExperience from "../../components/ApplicantProfile/ProfileExperience";
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
import { sleep } from "../helpers";

const stories = storiesOf("Applicant Profile|Experience", module).addDecorator(
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

  await sleep(1000);

  submitExperience(experienceEducation, [
    ...savedRequiredSkills,
    ...savedOptionalSkills,
  ]);
};

const handleDeleteExperience = async (
  id: number,
  type: string,
): Promise<void> => {
  await sleep(1000);

  const index = experiences.findIndex(
    (experience) => experience.id === id && experience.type === type,
  );

  if (index > -1) {
    experiences.splice(index, 1);
  }
};

stories.add(
  "Basic",
  (): React.ReactElement => (
    <ProfileExperience
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

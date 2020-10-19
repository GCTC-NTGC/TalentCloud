/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { fakeCriteria } from "../../fakeData/fakeCriteria";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import ProfileExperience from "../../components/ApplicantProfile/ProfileExperience";
import { Experience } from "../../models/types";
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

const submitExperience = (experienceSubmitData: Experience): void => {
  const isSameExperience = (original: Experience) => (
    match: Experience,
  ): boolean => {
    return original.id === match.id && original.type === match.type;
  };
  const matchesSubmitted = isSameExperience(experienceSubmitData);
  const index = experiences.findIndex(matchesSubmitted);
  if (index === -1) {
    experiences.push(experienceSubmitData);
  } else {
    experiences[index] = experienceSubmitData;
  }
};

const handleSubmitExperience = async (data: Experience): Promise<void> => {
  await sleep(1000);
  submitExperience(data);
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

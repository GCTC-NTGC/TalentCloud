/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState as useStorybookState } from "@storybook/addons";
import { Formik } from "formik";
import { boolean } from "@storybook/addon-knobs";
import fakeExperiences from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import {
  fakeAssetSkills,
  fakeEssentialSkills,
  fakeSkills,
} from "../../fakeData/fakeSkills";
import ProfileExperience from "../../components/ApplicantProfile/ProfileExperience";
import { Experience, ExperienceSkill } from "../../models/types";
import {
  educationStatuses,
  educationTypes,
  recipientTypes,
  recogntitionTypes,
} from "../Application/ExperienceModals.stories";
import { sleep } from "../helpers";
import SkillSubform, {
  ProfileSkillSubform,
} from "../../components/Application/ExperienceModals/SkillSubform";

const stories = storiesOf("Applicant Profile/Experience", module).addDecorator(
  withIntl,
);

const isSameExperience = (original: Experience) => (
  match: Experience,
): boolean => {
  return original.id === match.id && original.type === match.type;
};

const submitExperience = (experiences, setExperiences) => (
  experienceSubmitData: Experience,
): void => {
  const matchesSubmitted = isSameExperience(experienceSubmitData);
  const index = experiences.findIndex(matchesSubmitted);
  if (index === -1) {
    setExperiences([experienceSubmitData, ...experiences]);
  } else {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceSubmitData;
    setExperiences(newExperiences);
  }
};

const handleCreateExperience = (experiences, setExperiences) => async (
  data: Experience,
): Promise<void> => {
  await sleep(1000);
  submitExperience(experiences, setExperiences)(data);
  action("Experience Created")(data);
};
const handleUpdateExperience = (experiences, setExperiences) => async (
  data: Experience,
): Promise<void> => {
  await sleep(1000);
  submitExperience(experiences, setExperiences)(data);
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

const handleUpdateExpSkill = (experienceSkills, setExperienceSkills) => async (
  expSkill: ExperienceSkill,
): Promise<void> => {
  await sleep(1000);
  const index = experienceSkills.findIndex(
    (experienceSkill) => experienceSkill.id === expSkill.id,
  );
  if (index === -1) {
    setExperienceSkills([expSkill, ...experienceSkills]);
  } else {
    const newExpSkills = [...experienceSkills];
    newExpSkills[index] = expSkill;
    setExperienceSkills(newExpSkills);
  }
  action("Experience Skill updated")(expSkill);
};

const handleDeleteExpSkill = (experienceSkills, setExperienceSkills) => async ({
  id,
}: ExperienceSkill): Promise<void> => {
  await sleep(1000);
  setExperienceSkills(
    experienceSkills.filter((expSkill) => expSkill.id !== id),
  );
  action("Experience Skill deleted")(id);
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
        )}
        handleUpdateExperience={handleUpdateExperience(
          experiences,
          setExperiences,
        )}
        handleDeleteExperience={handleDeleteExperience(
          experiences,
          setExperiences,
        )}
        handleUpdateExperienceSkill={handleUpdateExpSkill(
          experienceSkills,
          setExperienceSkills,
        )}
        handleDeleteExperienceSkill={handleDeleteExpSkill(
          experienceSkills,
          setExperienceSkills,
        )}
        recipientTypes={recipientTypes}
        recognitionTypes={recogntitionTypes}
      />
    );
  },
);
stories.add(
  "Updating Skills fails",
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
        )}
        handleUpdateExperience={handleUpdateExperience(
          experiences,
          setExperiences,
        )}
        handleDeleteExperience={handleDeleteExperience(
          experiences,
          setExperiences,
        )}
        handleUpdateExperienceSkill={async (data) => {
          await sleep(1000);
          action("Update ExperienceSkill Failed")(data);
          throw new Error("Update ExperienceSkill Failed");
        }}
        handleDeleteExperienceSkill={async (data) => {
          await sleep(1000);
          action("Delete ExperienceSkill Failed")(data);
          throw new Error("Delete ExperienceSkill Failed");
        }}
        recipientTypes={recipientTypes}
        recognitionTypes={recogntitionTypes}
      />
    );
  },
);
stories.add("Application SkillSubform", () => {
  return (
    <Formik initialValues={{ work: [] }} onSubmit={() => {}}>
      {() => (
        <SkillSubform
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
    <Formik initialValues={{ work: [] }} onSubmit={() => {}}>
      {() => <ProfileSkillSubform keyPrefix="work" skills={fakeSkills()} />}
    </Formik>
  );
});

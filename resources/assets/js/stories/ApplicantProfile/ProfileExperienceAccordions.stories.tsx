/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import {
  fakeExperienceAward,
  fakeExperienceCommunity,
} from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import { ProfileAwardAccordion } from "../../components/Application/ExperienceAccordions/ExperienceAwardAccordion";
import { ProfileCommunityAccordion } from "../../components/Application/ExperienceAccordions/ExperienceCommunityAccordion";
import { getId, mapToObject } from "../../helpers/queries";

const stories = storiesOf("Applicant Profile|Experience Accordions", module)
  .addDecorator(withIntl)
  .addDecorator((storyFn) => (
    <div data-c-container="medium">
      <div className="experience-list">
        <div data-c-accordion-group="">{storyFn()}</div>
      </div>
    </div>
  ));

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const promiseAction = (text: string) => async () => {
  sleep(1000);
  action(text)();
};

const skillsById = mapToObject(fakeSkills(), getId);

stories
  .add(
    "Award Accordion",
    (): React.ReactElement => (
      <ProfileAwardAccordion
        experience={fakeExperienceAward()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skills={fakeSkills()}
        handleDelete={promiseAction("Delete")}
        handleEdit={action("Edit")}
        handleEditSkill={action("Edit ExperienceSkill")}
      />
    ),
  )
  .add(
    "Community Accordion",
    (): React.ReactElement => (
      <ProfileCommunityAccordion
        experience={fakeExperienceCommunity()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skillsById={skillsById}
        handleDelete={promiseAction("Delete")}
        handleEdit={action("Edit")}
        handleEditSkill={action("Edit ExperienceSkill")}
      />
    ),
  );

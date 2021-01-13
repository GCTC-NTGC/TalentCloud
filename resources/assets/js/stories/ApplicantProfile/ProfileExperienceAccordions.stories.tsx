import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import {
  fakeExperienceAward,
  fakeExperienceCommunity,
  fakeExperienceEducation,
  fakeExperiencePersonal,
  fakeExperienceWork,
} from "../../fakeData/fakeExperience";
import fakeExperienceSkills from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import { ProfileAwardAccordion } from "../../components/Application/ExperienceAccordions/ExperienceAwardAccordion";
import { ProfileCommunityAccordion } from "../../components/Application/ExperienceAccordions/ExperienceCommunityAccordion";
import { getId, mapToObject } from "../../helpers/queries";
import { ProfileEducationAccordion } from "../../components/Application/ExperienceAccordions/ExperienceEducationAccordion";
import { ProfilePersonalAccordion } from "../../components/Application/ExperienceAccordions/ExperiencePersonalAccordion";
import { ProfileWorkAccordion } from "../../components/Application/ExperienceAccordions/ExperienceWorkAccordion";
import { promiseAction } from "../helpers";

const stories = storiesOf("Applicant Profile/Experience Accordions", module)
  .addDecorator(withIntl)
  .addDecorator((storyFn) => (
    <div data-c-container="medium">
      <div className="experience-list">
        <div data-c-accordion-group="">{storyFn()}</div>
      </div>
    </div>
  ));

const skillsById = mapToObject(fakeSkills(), getId);

stories
  .add(
    "Award Accordion",
    (): React.ReactElement => (
      <ProfileAwardAccordion
        experience={fakeExperienceAward()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skillsById={mapToObject(fakeSkills(), getId)}
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
  )
  .add(
    "Education Accordion",
    (): React.ReactElement => (
      <ProfileEducationAccordion
        experience={fakeExperienceEducation()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skillsById={skillsById}
        handleDelete={promiseAction("Delete")}
        handleEdit={action("Edit")}
        handleEditSkill={action("Edit ExperienceSkill")}
      />
    ),
  )
  .add(
    "Personal Accordion",
    (): React.ReactElement => (
      <ProfilePersonalAccordion
        experience={fakeExperiencePersonal()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skillsById={skillsById}
        handleDelete={promiseAction("Delete")}
        handleEdit={action("Edit")}
        handleEditSkill={action("Edit ExperienceSkill")}
      />
    ),
  )
  .add(
    "Work Accordion",
    (): React.ReactElement => (
      <ProfileWorkAccordion
        experience={fakeExperienceWork()}
        relevantSkills={fakeExperienceSkills().slice(0, 2)}
        skillsById={skillsById}
        handleDelete={promiseAction("Delete")}
        handleEdit={action("Edit")}
        handleEditSkill={action("Edit ExperienceSkill")}
      />
    ),
  );

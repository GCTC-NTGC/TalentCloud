/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState } from "@storybook/addons";
import { SkillAccordion } from "../../../components/ApplicantProfile/Skills/Accordion";
import { fakeSkill } from "../../../fakeData/fakeSkills";
import { fakeExperienceSkills } from "../../../fakeData/fakeExperienceSkills";
import { getExperiencesOfSkill } from "../../../components/Application/helpers";
import fakeExperiences from "../../../fakeData/fakeExperience";
import { promiseAction } from "../../helpers";

const stories = storiesOf(
  "Applicant Profile/Skills/Accordion",
  module,
).addDecorator(withIntl);

const experiencesOfSkill = getExperiencesOfSkill(
  fakeSkill(),
  fakeExperienceSkills(),
);

stories.add(
  "Accordion",
  (): React.ReactElement => {
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const handleDeleteSkill = async (...args) => {
      setUpdateInProgress(true);
      await promiseAction("Delete skill")(...args);
      setUpdateInProgress(false);
    };
    return (
      <section>
        <SkillAccordion
          skill={fakeSkill()}
          experiences={fakeExperiences()}
          experiencesOfSkill={experiencesOfSkill}
          applicantId={1}
          handleDeleteSkill={handleDeleteSkill}
          disableDelete={updateInProgress}
        />
      </section>
    );
  },
);

stories.add(
  "Accordion (No Experiences)",
  (): React.ReactElement => (
    <section>
      <SkillAccordion
        skill={fakeSkill()}
        experiences={[]}
        experiencesOfSkill={[]}
        applicantId={1}
        handleDeleteSkill={promiseAction("Delete Skill")}
      />
    </section>
  ),
);

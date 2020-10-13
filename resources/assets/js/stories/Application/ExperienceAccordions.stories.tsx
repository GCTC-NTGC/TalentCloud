import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text, number, boolean, date } from "@storybook/addon-knobs";
import { ExperienceWorkAccordion } from "../../components/Application/ExperienceAccordions/ExperienceWorkAccordion";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperienceAward,
  fakeExperiencePersonal,
} from "../../fakeData/fakeExperience";
import {
  fakeExperienceSkill1,
  fakeExperienceSkill3,
  fakeExperienceSkill5,
} from "../../fakeData/fakeExperienceSkills";
import { fakeSkills } from "../../fakeData/fakeSkills";
import ExperienceEducationAccordion from "../../components/Application/ExperienceAccordions/ExperienceEducationAccordion";
import ExperienceCommunityAccordion from "../../components/Application/ExperienceAccordions/ExperienceCommunityAccordion";
import ExperienceAwardAccordion from "../../components/Application/ExperienceAccordions/ExperienceAwardAccordion";
import ExperiencePersonalAccordion from "../../components/Application/ExperienceAccordions/ExperiencePersonalAccordion";

const stories = storiesOf("Application|Experience Accordions", module)
  .addDecorator(withIntl)
  .addDecorator((storyFn) => <div data-c-container="medium">{storyFn()}</div>);

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function handleDelete() {
  await sleep(1000);
  return action("Delete Experience")();
}

const groupIds = {
  type: "Experience Type",
  details: "Details",
  switches: "Switches",
};

stories.add(
  "Education Experience",
  (): React.ReactElement => {
    const education = fakeExperienceEducation();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceEducationAccordion
            experience={education}
            relevantSkills={[fakeExperienceSkill1()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            showSkillDetails={boolean(
              "Show skill details?",
              false,
              groupIds.switches,
            )}
            showButtons={boolean("Show buttons?", false, groupIds.switches)}
            handleDelete={handleDelete}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

stories.add(
  "Work Experience",
  (): React.ReactElement => {
    const work = fakeExperienceWork();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceWorkAccordion
            experience={work}
            relevantSkills={[fakeExperienceSkill3(), fakeExperienceSkill5()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            showSkillDetails={boolean(
              "Show skill details?",
              false,
              groupIds.switches,
            )}
            showButtons={boolean("Show buttons?", false, groupIds.switches)}
            handleDelete={handleDelete}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

stories.add(
  "Community Experience",
  (): React.ReactElement => {
    const community = fakeExperienceCommunity();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceCommunityAccordion
            experience={community}
            relevantSkills={[fakeExperienceSkill5()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            showSkillDetails={boolean(
              "Show skill details?",
              false,
              groupIds.switches,
            )}
            showButtons={boolean("Show buttons?", false, groupIds.switches)}
            handleDelete={handleDelete}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

stories.add(
  "Award Experience",
  (): React.ReactElement => {
    const experience = fakeExperienceAward();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceAwardAccordion
            experience={experience}
            relevantSkills={[fakeExperienceSkill1(), fakeExperienceSkill5()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            showSkillDetails={boolean(
              "Show skill details?",
              false,
              groupIds.switches,
            )}
            showButtons={boolean("Show buttons?", false, groupIds.switches)}
            handleDelete={handleDelete}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

stories.add(
  "Personal Experience",
  (): React.ReactElement => {
    const experience = fakeExperiencePersonal();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperiencePersonalAccordion
            experience={experience}
            relevantSkills={[
              fakeExperienceSkill1(),
              fakeExperienceSkill3(),
              fakeExperienceSkill5(),
            ]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            showSkillDetails={boolean(
              "Show skill details?",
              false,
              groupIds.switches,
            )}
            showButtons={boolean("Show buttons?", false, groupIds.switches)}
            handleDelete={handleDelete}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

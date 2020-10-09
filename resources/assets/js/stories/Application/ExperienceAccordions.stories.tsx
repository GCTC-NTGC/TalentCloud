import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text, number, boolean, date } from "@storybook/addon-knobs";
import { BaseExperienceAccordion } from "../../components/Application/ExperienceAccordions/BaseExperienceAccordion";
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

const iconClassOptions = {
  education: "fa-book",
  work: "fa-briefcase",
  community: "fa-people-carry",
  personal: "fa-mountain",
  award: "fa-trophy",
};

function myDateKnob(
  name: string,
  defaultValue: Date | null,
  groupId: string,
): Date {
  const stringTimestamp = date(name, defaultValue || undefined, groupId);
  return new Date(stringTimestamp);
}

function sleep(ms): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function handleDelete() {
  await sleep(1000);
  return action("Delete Experience")();
}

const educationDetails = (
  <>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Type of Experience:</p>
      <p>
        <i
          className="fas fa-book"
          data-c-color="c1"
          data-c-margin="right(.25)"
        />
        Education Experience
      </p>
    </div>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Type of Education:</p>
      <p>University</p>
    </div>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Area of Study:</p>
      <p>Engineering</p>
    </div>
  </>
);
const workDetails = (
  <>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Type of Experience:</p>
      <p>
        <i
          className="fas fa-briefcase"
          data-c-color="c1"
          data-c-margin="right(.25)"
        />
        Work Experience
      </p>
    </div>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Role / Job Title:</p>
      <p>Manager</p>
    </div>
    <div data-c-grid-item="base(1of2) tl(1of3)">
      <p data-c-font-weight="bold">Organization / Company:</p>
      <p>Talent Cloud</p>
    </div>
  </>
);

const detailsSections = {
  education: "EDUCATION",
  work: "WORK",
};

const groupIds = {
  type: "Experience Type",
  details: "Details",
  switches: "Switches",
};

stories.add(
  "Base Experience Accordion",
  (): React.ReactElement => {
    const detailsMap = {
      EDUCATION: educationDetails,
      WORK: workDetails,
    };
    const detailsChoice = select(
      "Details",
      detailsSections,
      "education",
      groupIds.type,
    );
    const details = detailsMap[detailsChoice];
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <BaseExperienceAccordion
            title={text("Title", "My First Experience", groupIds.details)}
            iconClass={select(
              "Icon",
              iconClassOptions,
              "education",
              groupIds.type,
            )}
            relevantSkills={[fakeExperienceSkill1(), fakeExperienceSkill3()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            isEducationJustification={boolean(
              "Is Education Justification?",
              false,
              groupIds.switches,
            )}
            details={details}
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
            title={text("Job Title", work.title, groupIds.details)}
            organization={text(
              "Organization",
              work.organization,
              groupIds.details,
            )}
            group={text("Group", work.group, groupIds.details)}
            startDate={myDateKnob(
              "Start Date",
              work.start_date,
              groupIds.details,
            )}
            endDate={myDateKnob("End Date", work.end_date, groupIds.details)}
            isActive={boolean("Is Active", work.is_active, groupIds.details)}
            relevantSkills={[fakeExperienceSkill3(), fakeExperienceSkill5()]}
            skills={fakeSkills()}
            irrelevantSkillCount={number(
              "Irrelevant Skill count",
              0,
              {},
              groupIds.details,
            )}
            isEducationJustification={boolean(
              "Is Education Justification?",
              false,
              groupIds.switches,
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

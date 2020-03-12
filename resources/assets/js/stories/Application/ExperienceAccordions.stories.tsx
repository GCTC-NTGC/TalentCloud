import React, { ReactElement, createElement } from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { select, text, number, boolean, date } from "@storybook/addon-knobs";
import { BaseExperienceAccordion } from "../../components/Application/Experience/BaseExperienceAccordion";
import { action } from "@storybook/addon-actions";
import { ExperienceWorkAccordion } from "../../components/Application/Experience/ExperienceWorkAccordion";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
} from "../../fakeData/fakeExperience";
import ExperienceEducationAccordion from "../../components/Application/Experience/ExperienceEducationAccordion";

const stories = storiesOf(
  "Application|Experience Accordions",
  module,
).addDecorator(withIntl);

const iconClassOptions = {
  education: "fa-book",
  work: "fa-briefcase",
  community: "fa-people-carry",
  personal: "fa-mountain",
  award: "fa-trophy",
};

function myDateKnob(name, defaultValue, groupId) {
  const stringTimestamp = date(name, defaultValue, groupId);
  return new Date(stringTimestamp);
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
        ></i>
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
        ></i>
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

const skillClaims = [
  {
    id: 2,
    name: "Web Programming",
    claim:
      "I did lots of web programming as part of this experience. I built my own website and maintained it for a long time.",
  },
  {
    id: 15,
    name: "Open Source Development",
    claim:
      "Most of my work is available on github. The work I did as part of this experience has been used by several organisations now.",
  },
  {
    id: 20,
    name: "Integrity",
    claim:
      "I had many opportunities to sabotage my teams work at that experience, and I chose not to.",
  },
];

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
            relevantSkills={skillClaims}
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
            handleDelete={action("Delete Experience")}
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
            educationType={text(
              "Education Type",
              "Bachelors Degree",
              "details",
            )}
            areaOfStudy={text(
              "Area of Study",
              education.area_of_study,
              "details",
            )}
            institution={text("Institution", education.institution, "details")}
            status={text("Education Status", "Complete", "details")}
            startDate={myDateKnob(
              "Start date",
              education.start_date,
              "details",
            )}
            endDate={myDateKnob("End date", education.end_date, "details")}
            isActive={boolean("Is Active", education.is_active, "details")}
            relevantSkills={skillClaims}
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
            handleDelete={action("Delete Experience")}
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
            title={work.title}
            organization={work.organization}
            group={work.group}
            startDate={work.start_date}
            endDate={work.end_date}
            isActive={work.is_active}
            relevantSkills={skillClaims}
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
            handleDelete={action("Delete Experience")}
            handleEdit={action("Edit Experience")}
          />
        </div>
      </div>
    );
  },
);

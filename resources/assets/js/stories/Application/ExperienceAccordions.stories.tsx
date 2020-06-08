import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { select, text, number, boolean, date } from "@storybook/addon-knobs";
import { BaseExperienceAccordion } from "../../components/Application/Experience/BaseExperienceAccordion";
import { ExperienceWorkAccordion } from "../../components/Application/Experience/ExperienceWorkAccordion";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperienceAward,
  fakeExperiencePersonal,
} from "../../fakeData/fakeExperience";
import ExperienceEducationAccordion from "../../components/Application/Experience/ExperienceEducationAccordion";
import ExperienceCommunityAccordion from "../../components/Application/Experience/ExperienceCommunityAccordion";
import ExperienceAwardAccordion from "../../components/Application/Experience/ExperienceAwardAccordion";
import ExperiencePersonalAccordion from "../../components/Application/Experience/ExperiencePersonalAccordion";

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
              groupIds.details,
            )}
            areaOfStudy={text(
              "Area of Study",
              education.area_of_study,
              groupIds.details,
            )}
            institution={text("Institution", education.institution, "details")}
            status={text("Education Status", "Complete", "details")}
            startDate={myDateKnob(
              "Start date",
              education.start_date,
              groupIds.details,
            )}
            endDate={myDateKnob("End date", education.end_date, "details")}
            isActive={boolean("Is Active", education.is_active, "details")}
            thesisTitle={text(
              "Thesis Title",
              education.thesis_title || "",
              groupIds.details,
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
  "Community Experience",
  (): React.ReactElement => {
    const community = fakeExperienceCommunity();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceCommunityAccordion
            title={text("Job Title / Role", community.title, groupIds.details)}
            group={text("Group", community.group, groupIds.details)}
            project={text("Project", community.project, groupIds.details)}
            startDate={myDateKnob(
              "Start Date",
              community.start_date,
              groupIds.details,
            )}
            endDate={myDateKnob(
              "End Date",
              community.end_date,
              groupIds.details,
            )}
            isActive={boolean(
              "Is Active",
              community.is_active,
              groupIds.details,
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
  "Award Experience",
  (): React.ReactElement => {
    const experience = fakeExperienceAward();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperienceAwardAccordion
            title={text("Award Title", experience.title, groupIds.details)}
            recipient={text("Recipient", "Individual", groupIds.details)}
            issuer={text("Issuer", experience.issued_by, groupIds.details)}
            scope={text("Scope", "International", groupIds.details)}
            awardedDate={myDateKnob(
              "Awarded Date",
              experience.awarded_date,
              groupIds.details,
            )}
            awardLink={{
              text: "My Award",
              title: "View this award.",
              url: text("Award Url", "", groupIds.details),
            }}
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
  "Personal Experience",
  (): React.ReactElement => {
    const experience = fakeExperiencePersonal();
    return (
      <div className="experience-list">
        <div data-c-accordion-group="">
          <ExperiencePersonalAccordion
            title={text("Experience Title", experience.title, groupIds.details)}
            description={text(
              "Description",
              experience.description,
              groupIds.details,
            )}
            isShareable={boolean(
              "Consent to Share",
              experience.is_shareable,
              groupIds.details,
            )}
            startDate={myDateKnob(
              "Start Date",
              experience.start_date,
              groupIds.details,
            )}
            endDate={myDateKnob(
              "End Date",
              experience.end_date,
              groupIds.details,
            )}
            isActive={boolean(
              "Is Active",
              experience.is_active,
              groupIds.details,
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import {
  fakeExperienceWork,
  fakeExperienceEducation,
  fakeExperienceCommunity,
  fakeExperienceAward,
  fakeExperiencePersonal,
} from "../../fakeData/fakeExperience";
import ExperienceWorkDetails from "../../components/ApplicantProfile/ExperienceDetails/ExperienceWorkDetails";
import ExperienceEducationDetails from "../../components/ApplicantProfile/ExperienceDetails/ExperienceEducationDetails";
import ExperienceAwardDetails from "../../components/ApplicantProfile/ExperienceDetails/ExperienceAwardDetails";
import ExperienceCommunityDetails from "../../components/ApplicantProfile/ExperienceDetails/ExperienceCommunityDetails";
import ExperiencePersonalDetails from "../../components/ApplicantProfile/ExperienceDetails/ExperiencePersonalDetails";

const stories = storiesOf(
  "Applicant Profile/Experience Details",
  module,
).addDecorator(withIntl);

stories.add(
  "Work",
  (): React.ReactElement => (
    <section>
      <ExperienceWorkDetails experience={fakeExperienceWork()} />
    </section>
  ),
);
stories.add(
  "Education",
  (): React.ReactElement => (
    <section>
      <ExperienceEducationDetails experience={fakeExperienceEducation()} />
    </section>
  ),
);
stories.add(
  "Community",
  (): React.ReactElement => (
    <section>
      <ExperienceCommunityDetails experience={fakeExperienceCommunity()} />
    </section>
  ),
);
stories.add(
  "Award",
  (): React.ReactElement => (
    <section>
      <ExperienceAwardDetails experience={fakeExperienceAward()} />
    </section>
  ),
);
stories.add(
  "Personal",
  (): React.ReactElement => (
    <section>
      <ExperiencePersonalDetails experience={fakeExperiencePersonal()} />
    </section>
  ),
);

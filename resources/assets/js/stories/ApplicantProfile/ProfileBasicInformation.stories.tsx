/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { useState as useStorybookState } from "@storybook/addons";
import fakeBasicInformation from "../../fakeData/fakeBasicInformation";
import ProfileBasicInformation from "../../components/ApplicantProfile/ProfileBasicInformation";

const stories = storiesOf("Applicant Profile/Basic Information", module).addDecorator(
  withIntl,
);

stories.add(
  "Basic",
  (): React.ReactElement => {
    const [experiences, setExperiences] = useStorybookState(fakeBasicInformation());
    const [experienceSkills, setExperienceSkills] = useStorybookState(
      fakeBasicInformation(),
    );

    return (
      <ProfileBasicInformation
      />
    );
  },
);

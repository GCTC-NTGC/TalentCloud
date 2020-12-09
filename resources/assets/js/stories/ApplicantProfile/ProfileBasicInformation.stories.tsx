/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { useState as useStorybookState } from "@storybook/addons";
import { fakeBasicInformation } from "../../fakeData/fakeBasicInformation";
import ProfileBasicInformation from "../../components/ApplicantProfile/ProfileBasicInformation";
import fakeGocClassifications from "../../fakeData/fakeBasicInformation";

const stories = storiesOf("Applicant Profile/Basic Information", module).addDecorator(
  withIntl,
);

stories.add(
  "Basic",
  (): React.ReactElement => {
    const [basicInformations, setBasicInformations] = useStorybookState(fakeBasicInformation());
    const [classifications, setClassifications] = useStorybookState(fakeGocClassifications());

    const gocClassifications = [];

    return (
      <ProfileBasicInformation gocClassifications={gocClassifications}
      />
    );
  },
);

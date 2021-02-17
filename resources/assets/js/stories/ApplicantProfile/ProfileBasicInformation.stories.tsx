import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { useState as useStorybookState } from "@storybook/addons";
import { fakeBasicInformation } from "../../fakeData/fakeBasicInformation";
import ProfileBasicInfo from "../../components/ApplicantProfile/BasicInfo/ProfileBasicInfo";
import { fakeGocClassifications } from "../../fakeData/fakeGocClassification";

const stories = storiesOf(
  "Applicant Profile/Basic Information",
  module,
).addDecorator(withIntl);

stories.add(
  "Current GC Employee",
  (): React.ReactElement => {
    const [basicInformation, setBasicInformations] = useStorybookState(
      fakeBasicInformation(),
    );
    const [gocClassifications] = useStorybookState(fakeGocClassifications());

    return (
      <ProfileBasicInfo
        name="Gerardi Escandon"
        email="jerbo@personal.com"
        gocClassifications={gocClassifications}
        basicInformation={basicInformation}
      />
    );
  },
);

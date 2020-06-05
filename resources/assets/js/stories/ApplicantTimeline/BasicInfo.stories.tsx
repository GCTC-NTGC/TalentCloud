import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { BasicInfo } from "../../components/ApplicantTimeline/BasicInfo/BasicInfo";
import fakeJob from "../../fakeData/fakeJob";

const stories = storiesOf("Applicant Timeline|Basic Info", module).addDecorator(
  withIntl,
);

stories.add(
  "New Application",
  (): React.ReactElement => <BasicInfo job={fakeJob()} />,
);

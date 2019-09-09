import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import GovDeptAndEmailInputs from "../../components/Registration/GovDeptAndEmailInputs";
import fakeDepartments from "../../fakeData/fakeDepartments";

const stories = storiesOf(
  "Registration | Government Department & Email inputs",
  module,
).addDecorator(withIntl);

stories.add(
  "Fresh form",
  (): React.ReactElement => (
    <GovDeptAndEmailInputs departments={fakeDepartments()} />
  ),
);

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withIntl } from "storybook-addon-intl";
import FinalSubmit from "../../components/Application/FinalSubmit/FinalSubmit";
import { fakeApplication } from "../../fakeData/fakeApplications";

const stories = storiesOf("Application|Final Submit", module).addDecorator(
  withIntl,
);

stories.add(
  "Final Submit",
  (): React.ReactElement => (
    <FinalSubmit
      application={fakeApplication()}
      handleQuit={action("Save and Quit")}
      handleReturn={action("Save and Return")}
      submitApplication={async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action("Confirmed")(x);
      }}
    />
  ),
);

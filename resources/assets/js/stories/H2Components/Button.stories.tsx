import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import Button from "../../components/H2Components/Button";

const stories = storiesOf("H2 Components/Button", module).addDecorator(
  withIntl,
);

stories.add(
  "Button",
  (): React.ReactElement => (
    <section>
      <Button
        styling="theme-1, round, medium, solid"
        data-h2-margin="b(right, 1)"
      >
        Button
      </Button>
      <Button styling="stop, round, medium, solid" data-h2-margin="b(right, 1)">
        Stop
      </Button>
      <Button styling="slow, round, medium, solid" data-h2-margin="b(right, 1)">
        Slow
      </Button>
      <Button styling="go, round, medium, solid">Go!</Button>
    </section>
  ),
);

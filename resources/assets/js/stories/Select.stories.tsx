import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import Select from "../components/Select";

const stories = storiesOf("Components|Select", module).addDecorator(withIntl);

stories.add(
  "Plain",
  (): React.ReactElement => (
    <div data-c-grid="gutter" data-c-padding="left(double)">
      <Select
        id={text("ID", "sample-select")}
        name={text("Name", "What a name")}
        label={text("Label", "Plain Select")}
        required={boolean("Required", false)}
        invalid={boolean("Invalid", false)}
        grid="base(1of1) tl(1of3)"
        errorText={text("Error Text", "")}
        selected={null}
        nullSelection="Select a language requirement..."
        options={[
          { label: "English Essential", value: "english" },
          { label: "French Essential", value: "french" },
          { label: "Bilingual", value: "bilingual" },
        ]}
        onChange={action("Contents changed")}
        onBlur={action("Lost focus")}
      />
    </div>
  ),
);

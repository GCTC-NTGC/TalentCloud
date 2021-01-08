import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { SearchBar } from "../components/SearchBar";

const stories = storiesOf("Components/Search Bar", module).addDecorator(
  withIntl,
);

const handleSubmit = (search: string): Promise<void> => {
  action("Submit Search")(search);
  return Promise.resolve();
};

stories.add(
  "Skills",
  (): React.ReactElement => (
    <SearchBar inputTitle="Search Skills" handleSubmit={handleSubmit} />
  ),
);

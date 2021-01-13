import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { SearchResults } from "../components/SearchResults";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
  fakeSkill5,
  fakeSkill6,
} from "../fakeData/fakeSkills";

const stories = storiesOf("Components/Search Results", module).addDecorator(
  withIntl,
);

const skills = [
  { ...fakeSkill(), isChecked: true },
  { ...fakeSkill2(), isChecked: false },
  { ...fakeSkill3(), isChecked: false },
  { ...fakeSkill4(), isChecked: true },
  { ...fakeSkill5(), isChecked: true },
  { ...fakeSkill6(), isChecked: false },
];

stories.add(
  "Skills",
  (): React.ReactElement => (
    <SearchResults status="notSubmitted" results={skills} />
  ),
);

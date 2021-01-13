import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { SearchBar } from "../components/SearchBar";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
  fakeSkill5,
  fakeSkill6,
} from "../fakeData/fakeSkills";
import { Skill } from "../models/types";

const stories = storiesOf("Components/Search Bar", module).addDecorator(
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

const handleSubmit = (locale: string, search: string): Promise<Skill[]> => {
  const skillMatches = skills.filter((skill) => {
    return (
      skill.name[locale]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .search(new RegExp(search, "i")) !== -1 ||
      skill.name[locale].search(new RegExp(search, "i")) !== -1
    );
  });
  action("Submit Search")(search);
  return Promise.resolve(skillMatches);
};

stories.add(
  "Skills",
  (): React.ReactElement => (
    <SearchBar inputTitle="Search Skills" handleSubmit={handleSubmit} />
  ),
);

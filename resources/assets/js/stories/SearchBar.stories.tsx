import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import { useState } from "@storybook/addons";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
  fakeSkill5,
  fakeSkill6,
} from "../fakeData/fakeSkills";
import { Skill } from "../models/types";
import SearchBar from "../components/SearchBar";
import { matchStringsCaseDiacriticInsensitive } from "../helpers/localize";
import SkillSearchResults, {
  SkillSearchResult,
} from "../components/ApplicantProfile/Skills/SkillSearchResults";

const stories = storiesOf("Components/Search Bar", module).addDecorator(
  withIntl,
);

let skills = [
  { ...fakeSkill(), isChecked: true },
  { ...fakeSkill2(), isChecked: false },
  { ...fakeSkill3(), isChecked: false },
  { ...fakeSkill4(), isChecked: true },
  { ...fakeSkill5(), isChecked: true },
  { ...fakeSkill6(), isChecked: false },
];

stories.add(
  "Skills Search Bar",
  (): React.ReactElement => {
    const [skillResults, setSkillsResults] = useState<SkillSearchResult[]>([]);

    const handleSubmit = (locale: string, search: string): Promise<void> => {
      const skillNamesLocale = skills.map((skill) => skill.name[locale]);
      const skillStrings = matchStringsCaseDiacriticInsensitive(
        search,
        skillNamesLocale,
      );
      const skillMatches = skills.filter((skill) =>
        skillStrings.includes(skill.name[locale]),
      );
      action("Submit Search")(search);
      setSkillsResults(skillMatches);
      return Promise.resolve();
    };

    const handleAddSkill = (skillId: number): Promise<Skill> => {
      const skillToAdd = skills.find((skillEntry) => skillEntry.id === skillId);
      action("Add Skill")(skillToAdd);
      if (skillToAdd !== undefined) {
        skills = skills.map((skill) =>
          skill.id === skillId ? { ...skill, isChecked: true } : skill,
        );
        return Promise.resolve(skillToAdd);
      }
      return Promise.reject(new Error("Could not find skill"));
    };
    return (
      <section>
        <SearchBar inputTitle="Search Skills" handleSubmit={handleSubmit} />
        <SkillSearchResults
          handleAddSkill={handleAddSkill}
          results={skillResults}
        />
      </section>
    );
  },
);

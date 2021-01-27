import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { action } from "@storybook/addon-actions";
import {
  fakeSkill,
  fakeSkill2,
  fakeSkill3,
  fakeSkill4,
  fakeSkill5,
  fakeSkill6,
} from "../../../fakeData/fakeSkills";
import SkillSearchResults from "../../../components/ApplicantProfile/Skills/SkillSearchResults";
import { Skill } from "../../../models/types";

const stories = storiesOf("Applicant Profile/Skills", module).addDecorator(
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

const handleAddSkill = (skillId: number): Promise<Skill> => {
  const skillToAdd = skills.find((skillEntry) => skillEntry.id === skillId);
  action("Add Skill")(skillToAdd);
  if (skillToAdd !== undefined) {
    return Promise.resolve(skillToAdd);
  }
  return Promise.reject(new Error("Could not find skill"));
};

stories.add(
  "Search Results",
  (): React.ReactElement => (
    <SkillSearchResults results={skills} handleAddSkill={handleAddSkill} />
  ),
);

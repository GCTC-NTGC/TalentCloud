import { defineMessages } from "react-intl";

export const dialogMessages = defineMessages({
  triggerLabel: {
    id: "findSkillsModal.triggerLabel",
    defaultMessage: "Add Skills",
  },
  modalHeading: {
    id: "findSkillsModal.modalHeading",
    defaultMessage: "Find and add skills",
  },
  cancelButton: {
    id: "findSkillsModal.cancel",
    defaultMessage: "Cancel",
  },
  saveButton: {
    id: "findSkillsModal.save",
    defaultMessage: "Save Skills",
  },
  searchBarInputLabel: {
    id: "findSkillsModal.seachBarInputLabel",
    defaultMessage: "Search for skills by name:",
  },
  searchBarInputPlaceholder: {
    id: "findSkillsModal.searchBarInputPlaceholder",
    defaultMessage: "eg. User interface design.",
  },
  searchBarButtonLabel: {
    id: "findSkillsModal.searchBarButtonLabel",
    defaultMessage: "Search Skills",
  },
  searchResultsTitle: {
    id: "findSkillsModal.searchResultsTitle",
    defaultMessage: `There are {numOfSkills} results for skills related to "{searchQuery}".`,
  },
  skills: {
    id: "findSkillsModal.skills",
    defaultMessage: "{category} Skills",
  },
});

export const skillCategoryMessages = defineMessages({
  numOfCategorySkills: {
    id: "findSkillsModal.numOfCategorySkills",
    defaultMessage:
      "There's {numOfSkills, plural, =0 {no skills} one {1 skill} other {{numOfSkills} skills}} in {category} category.",
  },
  childCategoryButtonAriaLabel: {
    id: "findSkillsModal.childCategoryButtonAriaLabel",
    defaultMessage:
      "Click to view {category} skills category. There's {numOfSkills, plural, =0 {no skills} one {1 skill} other {{numOfSkills} skills}} in this category.",
  },
});

export const searchResultsMessages = defineMessages({
  skillsResultsHeading: {
    id: "findSkillsModal.skillsResultsHeading",
    defaultMessage: "Explore Categories",
  },
  skillResultsSubHeading: {
    id: "findSkillsModal.skillResultsSubHeading",
    defaultMessage:
      "Click on the categories on the left to explore skills. Only select the skills that you have experience with.",
  },
  noSkills: {
    id: "findSkillsModal.noSkills",
    defaultMessage: "No skills available.",
  },
  backButton: {
    id: "findSkillsModal.backButton",
    defaultMessage: "Back",
  },
  disabledSkillButton: {
    id: "findSkillsModal.disabledSkillButton",
    defaultMessage: "Already Added",
  },
  selectSkillButton: {
    id: "findSkillsModal.selectSkillButton",
    defaultMessage: "Select {skill}",
  },
  removeSkillButton: {
    id: "findSkillsModal.removeSkillButton",
    defaultMessage: "Remove {skill}",
  },
  numOfSkillsAdded: {
    id: "findSkillsModal.numOfSkillsAdded",
    defaultMessage:
      "{numOfSkills} skill has been added. Select the save skills button, to save them to your profile.",
  },
});

import React, { useMemo, useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import {
  getLocale,
  localizeFieldNonNull,
  matchStringsCaseDiacriticInsensitive,
} from "../helpers/localize";
import { addOrRemove } from "../helpers/queries";
import { Skill, SkillCategory } from "../models/types";
import SearchBar from "./SearchBar";
import Accordion from "./H2Components/Accordion";
import Dialog from "./H2Components/Dialog";

const messages = defineMessages({
  modalHeading: {
    id: "findSkillsModal.modalHeading",
    defaultMessage: "Find and add skills",
  },
  accordianButtonLabel: {
    id: "findSkillsModal.accordianButtonLabel",
    defaultMessage: "Click to view...",
  },
  skillsResultsHeading: {
    id: "findSkillsModal.skillsResultsHeading",
    defaultMessage: "Explore Categories",
  },
  skillResultsSubHeading: {
    id: "findSkillsModal.skillResultsSubHeading",
    defaultMessage:
      "Click on the categories on the left to explore skills. Only select the skills that you have experience with.",
  },
  skills: {
    id: "findSkillsModal.skills",
    defaultMessage: "Skills",
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
    defaultMessage: "Select",
  },
  removeSkillButton: {
    id: "findSkillsModal.removeSkillButton",
    defaultMessage: "Remove",
  },
  cancelButton: {
    id: "findSkillsModal.noSkills",
    defaultMessage: "Cancel",
  },
  saveButton: {
    id: "findSkillsModal.noSkills",
    defaultMessage: "Save Skills",
  },
  searchResultsTitle: {
    id: "findSkillsModal.searchResultsTitle",
    defaultMessage: `There are {numOfSkills} results for skills related to "{searchQuery}".`,
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
});

interface FindSkillsModalProps {
  dialogTrigger: React.ReactElement;
  oldSkills: Skill[];
  portal: "applicant" | "manager";
  skills: Skill[];
  skillCategories: SkillCategory[];
  handleSubmit: (values: Skill[]) => Promise<void>;
}

const FindSkillsModal: React.FunctionComponent<FindSkillsModalProps> = ({
  dialogTrigger,
  oldSkills,
  portal,
  skills,
  skillCategories,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) => !skillCategory.parent_id,
  );

  const categoryIdToSkillsMap: Map<number, Skill[]> = useMemo(
    () =>
      skills.reduce((map: Map<number, Skill[]>, skill): Map<
        number,
        Skill[]
      > => {
        skill.skill_category_ids.forEach((categoryId) => {
          if (!map.has(categoryId)) {
            map.set(categoryId, []);
          }
          map.get(categoryId)?.push(skill);
        });
        return map;
      }, new Map()),
    [skills],
  );

  // List of new Skills that will be saved to the user on submit.
  const [newSkills, setNewSkills] = useState<Skill[]>([]);
  // List of skills that displayed in the results section of the modal.
  const [skillsResults, setSkillsResults] = useState<Skill[]>([]);
  // Stores the skill category's name and description for the results section.
  const [resultsSectionText, setResultsSectionText] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [firstVisit, setFirstVisit] = useState(true);
  // Stores a list of skills category keys of which accordions are expanded, for styling purposes.
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  // Used to set the button color of an active skill category.
  const [buttonClicked, setButtonClicked] = useState("");

  /**
   * Filters through the skills list for the any skills that match the search query.
   * @param searchQuery The search query entered by the user.
   */
  const handleSkillSearch = (searchQuery: string): Promise<void> => {
    if (searchQuery.length === 0) {
      setSkillsResults([]);
      setFirstVisit(true);
      return Promise.resolve();
    }

    const skillNames: string[] = skills.map((skill) =>
      localizeFieldNonNull(locale, skill, "name"),
    );
    const skillStrings: string[] = matchStringsCaseDiacriticInsensitive(
      searchQuery,
      skillNames,
    );
    const skillMatches = skills.filter((skill) =>
      skillStrings.includes(localizeFieldNonNull(locale, skill, "name")),
    );

    // Set the skillResults state with the matches from the query.
    setFirstVisit(false);
    setResultsSectionText({
      title: intl.formatMessage(messages.searchResultsTitle, {
        numOfSkills: skillMatches.length,
        searchQuery,
      }),
      description: "",
    });
    setSkillsResults(skillMatches);
    return Promise.resolve();
  };
  return (
    <div>
      <Dialog.Trigger
        id="findSkills"
        data-h2-button="white, round, solid"
        data-h2-card="white, round"
        data-h2-padding="b(tb, .5)"
      >
        {dialogTrigger}
      </Dialog.Trigger>
      <Dialog id="findSkills" data-h2-radius="b(round)">
        <Dialog.Header className="gradient-left-right">
          <Dialog.Title
            data-h2-padding="b(all, 1)"
            data-h2-font-color="b(white)"
            data-h2-font-size="b(h4)"
          >
            {intl.formatMessage(messages.modalHeading)}
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Content
          data-h2-grid="b(top, expanded, flush, 0)"
          style={{ height: "35rem", overflow: "auto", alignItems: "stretch" }}
        >
          {/* Parent Skill Category Accordions Section */}
          <div data-h2-grid-item="s(2of5) b(1of1)">
            <SearchBar
              buttonLabel={intl.formatMessage(messages.searchBarButtonLabel)}
              searchLabel={intl.formatMessage(messages.searchBarInputLabel)}
              searchPlaceholder={intl.formatMessage(
                messages.searchBarInputPlaceholder,
              )}
              handleSubmit={handleSkillSearch}
            />
            <ul data-h2-padding="b(left, 0)" className="no-list-style-type">
              {parentSkillCategories.map((parentSkillCategory) => {
                const { id, key } = parentSkillCategory;
                // Get children skill categories of parent skill category.
                const childrenSkillCategories = skillCategories.filter(
                  (childSkillCategory) =>
                    childSkillCategory.depth === 2 &&
                    childSkillCategory.parent_id === id,
                );
                return (
                  <li
                    key={id}
                    data-h2-bg-color={`b(gray-1, ${
                      expandedAccordions.includes(key) ? ".5" : "0"
                    })`}
                    data-h2-padding="b(tb, 1)"
                    data-h2-border="b(gray-2, top, solid, thin)"
                    data-h2-margin="b(tb, 0)"
                  >
                    <Accordion triggerPos="left">
                      <Accordion.Btn
                        type="button"
                        addIcon={
                          <i
                            data-h2-font-weight="b(700)"
                            className="fas fa-plus"
                          />
                        }
                        removeIcon={
                          <i
                            data-h2-font-weight="b(700)"
                            className="fas fa-minus"
                          />
                        }
                        onClick={() =>
                          setExpandedAccordions(
                            addOrRemove(key, expandedAccordions),
                          )
                        }
                      >
                        <p data-h2-font-weight="b(700)">
                          {localizeFieldNonNull(
                            locale,
                            parentSkillCategory,
                            "name",
                          )}
                        </p>
                      </Accordion.Btn>
                      <p
                        data-h2-padding="b(top, .25) b(bottom, 1) b(right, .5)"
                        data-h2-font-color="b(black)"
                        data-h2-font-size="b(small)"
                        style={{ paddingLeft: "5rem" }}
                      >
                        {localizeFieldNonNull(
                          locale,
                          parentSkillCategory,
                          "description",
                        )}
                      </p>
                      <Accordion.Content>
                        <ul
                          data-h2-padding="b(all, 0)"
                          className="no-list-style-type"
                        >
                          {childrenSkillCategories.map(
                            (childSkillCatergory) => {
                              return (
                                <li key={childSkillCatergory.key}>
                                  <div
                                    data-h2-grid="b(middle, expanded, flush, 0)"
                                    data-h2-margin="b(right, .5)"
                                  >
                                    <div
                                      data-h2-align="b(left)"
                                      data-h2-grid-item="b(5of6)"
                                    >
                                      <button
                                        data-h2-button=""
                                        type="button"
                                        onClick={() => {
                                          setFirstVisit(false);
                                          setButtonClicked(
                                            childSkillCatergory.key,
                                          );
                                          setResultsSectionText({
                                            title: `${localizeFieldNonNull(
                                              locale,
                                              childSkillCatergory,
                                              "name",
                                            )} ${intl.formatMessage(
                                              messages.skills,
                                            )}`,
                                            description: localizeFieldNonNull(
                                              locale,
                                              childSkillCatergory,
                                              "description",
                                            ),
                                          });
                                          setSkillsResults(
                                            categoryIdToSkillsMap.get(
                                              childSkillCatergory.id,
                                            ) ?? [],
                                          );
                                        }}
                                      >
                                        <p
                                          data-h2-button-label
                                          data-h2-font-weight="b(700)"
                                          data-h2-display="b(block)"
                                          data-h2-font-style={`${
                                            buttonClicked ===
                                            childSkillCatergory.key
                                              ? "b(none)"
                                              : "b(underline)"
                                          }`}
                                          data-h2-font-color={`${
                                            buttonClicked ===
                                            childSkillCatergory.key
                                              ? "b(theme-1)"
                                              : "b(black)"
                                          }`}
                                          data-h2-align="b(left)"
                                        >
                                          {localizeFieldNonNull(
                                            locale,
                                            childSkillCatergory,
                                            "name",
                                          )}
                                        </p>
                                      </button>
                                    </div>
                                    <div
                                      data-h2-grid-item="b(1of6)"
                                      data-h2-align="b(center)"
                                      data-h2-radius="b(round)"
                                      data-h2-bg-color={`${
                                        buttonClicked ===
                                        childSkillCatergory.key
                                          ? "b(theme-1, 1)"
                                          : "b(white, 1)"
                                      }`}
                                      data-h2-font-color={`${
                                        buttonClicked ===
                                        childSkillCatergory.key
                                          ? "b(white)"
                                          : "b(black)"
                                      }`}
                                    >
                                      <p>
                                        {categoryIdToSkillsMap.get(
                                          childSkillCatergory.id,
                                        )?.length ?? 0}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </Accordion.Content>
                    </Accordion>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Skill Results Section */}
          <div
            data-h2-grid-item="s(3of5) b(1of1)"
            data-h2-border="s(gray-2, left, solid, thin) b(gray-2, top, solid, thin)"
          >
            {firstVisit ? (
              <div
                data-h2-padding="s(tb, 5) s(right, 3) s(left, 4) b(bottom, 3) b(rl, 2)"
                data-h2-container="b(center, large)"
              >
                <p
                  data-h2-font-size="b(h4)"
                  data-h2-font-weight="b(700)"
                  data-h2-padding="b(top, 3) b(bottom, 1)"
                >
                  <i
                    data-h2-padding="b(right, .5)"
                    className="fas fa-arrow-left"
                  />
                  {intl.formatMessage(messages.skillsResultsHeading)}
                </p>
                <p>{intl.formatMessage(messages.skillResultsSubHeading)}</p>
              </div>
            ) : (
              <div data-h2-padding="s(rl, 0) b(bottom, 3) b(rl, 1)">
                {/* Back Button */}
                <button
                  data-h2-button
                  type="button"
                  data-h2-padding="b(all, 1)"
                  onClick={() => {
                    setFirstVisit(true);
                    setButtonClicked("");
                    setSkillsResults([]);
                  }}
                >
                  <p
                    data-h2-button-label
                    data-h2-font-weight="b(700)"
                    data-h2-font-style="b(underline)"
                  >
                    <i
                      data-h2-padding="b(right, .25)"
                      className="fas fa-caret-left"
                    />
                    {intl.formatMessage(messages.backButton)}
                  </p>
                </button>

                <p
                  data-h2-font-size="b(h4)"
                  data-h2-font-weight="b(700)"
                  data-h2-padding="b(rl, 1) b(bottom, .5)"
                >
                  {resultsSectionText.title}
                </p>
                <p
                  data-h2-font-size="b(small)"
                  data-h2-padding="b(rl, 1) b(bottom, 2)"
                >
                  {resultsSectionText.description}
                </p>
                {!firstVisit && skillsResults.length > 0 ? (
                  <ul
                    data-h2-padding="b(left, 0)"
                    className="no-list-style-type"
                  >
                    {skillsResults.map((skill) => {
                      const { id } = skill;
                      const isAdded = newSkills.find(
                        (newSkill) => newSkill.id === skill.id,
                      );
                      const isOldSkill =
                        portal === "applicant" &&
                        oldSkills.find(
                          (oldSkill) => oldSkill.id === skill.id,
                        ) !== undefined;
                      return (
                        <li
                          key={id}
                          data-h2-grid="b(middle, contained, padded, 0)"
                        >
                          <Accordion data-h2-grid-item="b(3of4)">
                            <Accordion.Btn>
                              <p
                                data-h2-font-weight="b(700)"
                                data-h2-font-style="b(underline)"
                              >
                                {localizeFieldNonNull(locale, skill, "name")}
                                {isAdded && (
                                  <i
                                    data-h2-padding="b(left, .5)"
                                    data-h2-font-color="b(theme-1)"
                                    aria-hidden="true"
                                    className="fas fa-check"
                                  />
                                )}
                              </p>
                            </Accordion.Btn>
                            <Accordion.Content>
                              <p data-h2-focus>
                                {localizeFieldNonNull(
                                  locale,
                                  skill,
                                  "description",
                                )}
                              </p>
                            </Accordion.Content>
                          </Accordion>
                          {isOldSkill ? (
                            <button
                              data-h2-button=""
                              data-h2-grid-item="b(1of4)"
                              disabled
                              type="button"
                            >
                              <span data-h2-button-label>
                                {intl.formatMessage(
                                  messages.disabledSkillButton,
                                )}
                              </span>
                            </button>
                          ) : (
                            <button
                              data-h2-button=""
                              data-h2-grid-item="b(1of4)"
                              type="button"
                              onClick={() => {
                                // If the skill has been selected then remove it.
                                // Else, if the has not been selected then add it to newSkills list.
                                setNewSkills(addOrRemove(skill, newSkills));
                              }}
                            >
                              <p
                                data-h2-button-label
                                data-h2-font-weight="b(700)"
                                data-h2-font-style="b(underline)"
                                data-h2-font-color={`${
                                  isAdded ? "b(theme-1)" : "b(black)"
                                }`}
                              >
                                {isAdded
                                  ? intl.formatMessage(
                                      messages.removeSkillButton,
                                    )
                                  : intl.formatMessage(
                                      messages.selectSkillButton,
                                    )}
                              </p>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p data-h2-padding="b(rl, 1) b(bottom, .5)">
                    {intl.formatMessage(messages.noSkills)}
                  </p>
                )}
              </div>
            )}
          </div>
        </Dialog.Content>
        <Dialog.Actions
          data-h2-grid="b(middle, expanded, padded, .5)"
          data-h2-margin="b(all, 0)"
          data-h2-bg-color="b(gray-1, 1)"
        >
          <div data-h2-align="b(left)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              buttonStyling="stop, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              data-h2-bg-color="b(white, 1)"
            >
              <p>{intl.formatMessage(messages.cancelButton)}</p>
            </Dialog.ActionBtn>
          </div>
          <div data-h2-align="b(right)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              buttonStyling="theme-1, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              onClick={() =>
                handleSubmit(newSkills).then(() => {
                  setNewSkills([]);
                  setFirstVisit(true);
                  setSkillsResults([]);
                })
              }
              disabled={newSkills.length === 0}
            >
              <p>{intl.formatMessage(messages.saveButton)}</p>
            </Dialog.ActionBtn>
          </div>
        </Dialog.Actions>
      </Dialog>
    </div>
  );
};

export default FindSkillsModal;

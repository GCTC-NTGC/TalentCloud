import * as React from "react";
import { useIntl } from "react-intl";
import {
  focusNextItem,
  focusPreviousItem,
  getTabList,
} from "../../helpers/forms";
import { getLocale, localizeFieldNonNull } from "../../helpers/localize";
import { addOrRemove } from "../../helpers/queries";
import { Skill } from "../../models/types";
import Accordion from "../H2Components/Accordion";
import { searchResultsMessages as messages } from "./messages";

interface SearchResultsProps {
  /** Object holding the state (expanded or collapsed) of all dialog accordions. */
  accordionData: { [key: string]: boolean };
  /** The description displayed after user chooses a skill category or searches for a skill. */
  description: string;
  /** Boolean that is set to true if it's the user's first visit on the dialog. */
  firstVisit: boolean;
  /** List of newly added skills. */
  newSkills: Skill[];
  /** List of previously added skills. */
  previousSkills: Skill[];
  /** The skills displayed after user chooses a skill category or searches for a skill. */
  results: Skill[];
  /** The title displayed after user chooses a skill category or searches for a skill. */
  title: string;
  /** Resets the search results pane to its default state. */
  resetResults: () => void;
  /** Callback function to set the new skills list state. */
  setNewSkills: (value: React.SetStateAction<Skill[]>) => void;
  /** Callback function that toggles the accordion's state. */
  toggleAccordion: (key: string, value?: boolean | null) => void;
}

const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  accordionData,
  description,
  firstVisit,
  newSkills,
  previousSkills,
  title,
  results,
  resetResults,
  setNewSkills,
  toggleAccordion,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  /**
   * We need to focus on the first element in the skill results section whenever the user picks a category or uses the search bar. The useEffect hook will trigger a focus any time the skillResults state changes.
   */
  const firstSkillResultRef = React.useRef<HTMLButtonElement | null>(null); // first element in skills results list.
  React.useEffect(() => {
    if (results.length !== 0 && firstSkillResultRef.current) {
      firstSkillResultRef.current.focus();
    }
  }, [results]);

  const resultsRef = React.useRef<HTMLDivElement | null>(null);
  const skillAccordionKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
  ) => {
    if (resultsRef.current) {
      const skillResultsTabList = getTabList(resultsRef.current);

      switch (e.key) {
        case "ArrowLeft":
          resetResults();
          break;
        case "ArrowRight":
          toggleAccordion(id);
          break;
        case "ArrowUp":
          focusPreviousItem(skillResultsTabList);
          break;
        case "ArrowDown":
          focusNextItem(skillResultsTabList);
          break;
        default:
        // do nothing;
      }
    }
  };

  const addSkillKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    newSkill: Skill,
    newSkillsState: Skill[],
  ) => {
    if (resultsRef.current) {
      const skillResultsTabList = getTabList(resultsRef.current);
      const checkbox = document.getElementById(id) as HTMLInputElement;
      switch (e.key) {
        case "ArrowLeft":
          resetResults();
          break;
        case "ArrowRight":
          setNewSkills(addOrRemove(newSkill, newSkillsState));
          checkbox.checked = !checkbox.checked;
          break;
        case "ArrowUp":
          focusPreviousItem(skillResultsTabList);
          break;
        case "ArrowDown":
          focusNextItem(skillResultsTabList);
          break;
        default:
        // do nothing;
      }
    }
  };

  const backBtnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (resultsRef.current) {
      const skillResultsTabList = getTabList(resultsRef.current);
      switch (e.key) {
        case "ArrowUp":
          focusPreviousItem(skillResultsTabList);
          break;
        case "ArrowDown":
          focusNextItem(skillResultsTabList);
          break;
        default:
        // do nothing;
      }
    }
  };

  return (
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
            <i data-h2-padding="b(right, .5)" className="fas fa-arrow-left" />
            {intl.formatMessage(messages.skillsResultsHeading)}
          </p>
          <p>{intl.formatMessage(messages.skillResultsSubHeading)}</p>
        </div>
      ) : (
        <div ref={resultsRef} data-h2-padding="s(rl, 0) b(bottom, 3) b(rl, 1)">
          {/* Back Button */}
          <button
            data-h2-button
            type="button"
            data-h2-padding="b(all, 1)"
            onClick={() => resetResults()}
            onKeyDown={backBtnKeyDown}
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
            {title}
          </p>
          <p
            data-h2-font-size="b(small)"
            data-h2-padding="b(rl, 1) b(bottom, 2)"
          >
            {description}
          </p>
          {!firstVisit && results.length > 0 ? (
            <>
              {/* This message is for screen readers. It provides a status message to the user on how many skills they have added. */}
              <p role="status" data-h2-visibility="b(invisible)">
                {intl.formatMessage(messages.numOfSkillsAdded, {
                  numOfSkills: newSkills.length,
                })}
              </p>
              <ul
                role="menu"
                data-h2-padding="b(left, 0)"
                className="no-list-style-type"
              >
                {results.map((skill, index) => {
                  const { id } = skill;
                  const isAdded = newSkills.find(
                    (newSkill) => newSkill.id === skill.id,
                  );
                  const isPreviousSkill =
                    previousSkills.find(
                      (previousSkill) => previousSkill.id === skill.id,
                    ) !== undefined;
                  const resultId = `skill-${id}`;
                  const checkboxId = `${id}-skill-checkbox`;
                  return (
                    <li key={id} data-h2-grid="b(middle, contained, padded, 0)">
                      <Accordion
                        isExpanded={accordionData[resultId]}
                        toggleAccordion={() => toggleAccordion(resultId)}
                        data-h2-grid-item="b(3of4)"
                      >
                        <Accordion.Btn
                          role="menuitem"
                          id={resultId}
                          innerRef={index === 0 ? firstSkillResultRef : null}
                          onKeyDown={(e) => skillAccordionKeyDown(e, resultId)}
                        >
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
                            {localizeFieldNonNull(locale, skill, "description")}
                          </p>
                        </Accordion.Content>
                      </Accordion>

                      <label
                        data-h2-grid-item="b(1of4)"
                        className="search-result-checkbox"
                        htmlFor={checkboxId}
                      >
                        <input
                          aria-label={
                            isAdded
                              ? intl.formatMessage(messages.removeSkillButton, {
                                  skill: localizeFieldNonNull(
                                    locale,
                                    skill,
                                    "name",
                                  ),
                                })
                              : intl.formatMessage(messages.selectSkillButton, {
                                  skill: localizeFieldNonNull(
                                    locale,
                                    skill,
                                    "name",
                                  ),
                                })
                          }
                          role="menuitem"
                          id={checkboxId}
                          data-h2-visibility="b(invisible)"
                          data-h2-grid-item="b(1of4)"
                          type="checkbox"
                          name={checkboxId}
                          onClick={() => {
                            // If the skill has been selected then remove it.
                            // Else, if the has not been selected then add it to newSkills list.
                            setNewSkills(addOrRemove(skill, newSkills));
                          }}
                          onKeyDown={(e) =>
                            addSkillKeyDown(e, resultId, skill, newSkills)
                          }
                          defaultChecked={isPreviousSkill}
                          disabled={isPreviousSkill}
                        />
                        {isPreviousSkill ? (
                          <span
                            data-h2-font-size="b(small)"
                            data-h2-font-color="b(gray-4)"
                          >
                            {intl.formatMessage(messages.disabledSkillButton)}
                          </span>
                        ) : (
                          <span
                            data-h2-font-weight="b(700)"
                            data-h2-font-style="b(underline)"
                            data-h2-font-color={`${
                              isAdded ? "b(theme-1)" : "b(black)"
                            }`}
                          >
                            {isAdded
                              ? intl.formatMessage(messages.removeSkillButton, {
                                  skill: "",
                                })
                              : intl.formatMessage(messages.selectSkillButton, {
                                  skill: "",
                                })}
                          </span>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p role="status" data-h2-padding="b(rl, 1) b(bottom, .5)">
              {intl.formatMessage(messages.noSkills)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

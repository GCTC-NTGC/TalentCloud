import * as React from "react";
import { useIntl } from "react-intl";
import {
  focusNextItem,
  focusOnElement,
  focusPreviousItem,
  getTabList,
} from "../../helpers/forms";
import { getLocale, localizeFieldNonNull } from "../../helpers/localize";
import { Skill, SkillCategory } from "../../models/types";
import Accordion from "../H2Components/Accordion";
import { skillCategoryMessages as messages } from "./messages";

interface SkillCategoriesProps {
  /** Key of the currently selected skill category. */
  activeCategory: SkillCategory["key"];
  /** Object holding the state (expanded or collapsed) of all dialog accordions. */
  accordionData: { [key: string]: boolean };
  /** List of skills */
  skills: Skill[];
  /** List of skill categories. */
  skillCategories: SkillCategory[];
  /** Sets the state of the skill results section when a skill category is clicked. */
  onSkillCategoryClick: (skillCategory: SkillCategory) => void;
  /** Callback function that toggles the accordion's state. */
  toggleAccordion: (key: string, value?: boolean | null) => void;
}

const SkillCategories: React.FunctionComponent<SkillCategoriesProps> = ({
  activeCategory,
  accordionData,
  skills,
  skillCategories,
  onSkillCategoryClick,
  toggleAccordion,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) => !skillCategory.parent_id,
  );

  /**
   * Returns a map of skills where the key represents the category id, and the value is an array of skills in that category.
   */
  const categoryIdToSkillsMap: Map<number, Skill[]> = React.useMemo(
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

  /**
   * This function handles all keyboard events for the child skill category buttons.
   * @param event Event handler.
   * @param id Accordion id.
   * @param childSkillCategory Child skill category.
   * @param parentSkillCategoryKey Parent skill category key.
   */
  const onSkillCategoryKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
    childSkillCategory: SkillCategory,
    parentSkillCategoryKey: string,
  ): void => {
    const accordion = document.getElementById(id);
    if (accordion) {
      const content = accordion.querySelector(
        "[data-h2-accordion-content]",
      ) as HTMLElement;
      const trigger = accordion.querySelector<HTMLElement>(
        "[data-h2-accordion-trigger]",
      );

      const childSkillCategoriesFocusList = getTabList(content);
      // ArrowLeft: close the accordion and move focus back on the trigger.
      // ArrowRight: Select the child skill category and move focus on the skill results.
      // ArrowUp & ArrowDown: Allow user to navigate through child skill categories only using the up and down arrows.
      switch (event.key) {
        case "ArrowLeft":
          toggleAccordion(parentSkillCategoryKey);
          if (trigger) {
            focusOnElement(trigger);
          }
          break;
        case "ArrowRight":
          onSkillCategoryClick(childSkillCategory);
          break;
        case "ArrowUp":
          focusPreviousItem(childSkillCategoriesFocusList);
          break;
        case "ArrowDown":
          focusNextItem(childSkillCategoriesFocusList);
          break;
        default:
        // do nothing;
      }
    }
  };

  return (
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
            data-h2-bg-color={`b(gray-1, ${accordionData[key] ? ".5" : "0"})`}
            data-h2-padding="b(tb, 1)"
            data-h2-border="b(gray-2, top, solid, thin)"
            data-h2-margin="b(tb, 0)"
          >
            <Accordion
              isExpanded={accordionData[key]}
              id={`${id}-${key}`}
              triggerPos="left"
              toggleAccordion={() => toggleAccordion(key)}
              overrideFocusRules
            >
              <Accordion.Btn
                id={`skill-category-trigger-${id}-${key}`}
                data-tabable
                type="button"
                addIcon={
                  <i data-h2-font-weight="b(700)" className="fas fa-plus" />
                }
                removeIcon={
                  <i data-h2-font-weight="b(700)" className="fas fa-minus" />
                }
              >
                <p data-h2-font-weight="b(700)">
                  {localizeFieldNonNull(locale, parentSkillCategory, "name")}
                </p>
              </Accordion.Btn>
              {/*
                TODO: Restore this when discriptions are added to Skill Categories on backend.
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
              </p> */}
              <Accordion.Content data-h2-margin="b(top, 1)">
                <ul
                  role="menu"
                  data-h2-padding="b(all, 0)"
                  className="no-list-style-type"
                >
                  {childrenSkillCategories.map((childSkillCategory) => {
                    return (
                      <li key={childSkillCategory.key}>
                        <div
                          data-h2-grid="b(middle, expanded, flush, 0)"
                          data-h2-margin="b(right, .5)"
                        >
                          <div
                            data-h2-align="b(left)"
                            data-h2-grid-item="b(5of6)"
                          >
                            <button
                              role="menuitem"
                              id={`${childSkillCategory.key}-skill-category`}
                              aria-label={intl.formatMessage(
                                messages.childCategoryButtonAriaLabel,
                                {
                                  numOfSkills:
                                    categoryIdToSkillsMap.get(
                                      childSkillCategory.id,
                                    )?.length ?? 0,
                                  category: localizeFieldNonNull(
                                    locale,
                                    childSkillCategory,
                                    "name",
                                  ),
                                },
                              )}
                              data-h2-button="hello"
                              type="button"
                              tabIndex={-1}
                              onClick={(): void =>
                                onSkillCategoryClick(childSkillCategory)
                              }
                              onKeyDown={(e): void =>
                                onSkillCategoryKeyDown(
                                  e,
                                  `${id}-${key}`,
                                  childSkillCategory,
                                  parentSkillCategory.key,
                                )
                              }
                            >
                              <p
                                data-h2-button-label
                                data-h2-font-weight="b(700)"
                                data-h2-display="b(block)"
                                data-h2-font-style={`${
                                  activeCategory === childSkillCategory.key
                                    ? "b(none)"
                                    : "b(underline)"
                                }`}
                                data-h2-font-color={`${
                                  activeCategory === childSkillCategory.key
                                    ? "b(theme-1)"
                                    : "b(black)"
                                }`}
                                data-h2-align="b(left)"
                              >
                                {localizeFieldNonNull(
                                  locale,
                                  childSkillCategory,
                                  "name",
                                )}
                              </p>
                            </button>
                          </div>
                          <p
                            aria-hidden="true"
                            data-h2-grid-item="b(1of6)"
                            data-h2-align="b(center)"
                            data-h2-radius="b(round)"
                            data-h2-bg-color={`${
                              activeCategory === childSkillCategory.key
                                ? "b(theme-1, 1)"
                                : "b(white, 1)"
                            }`}
                            data-h2-font-color={`${
                              activeCategory === childSkillCategory.key
                                ? "b(white)"
                                : "b(black)"
                            }`}
                          >
                            {categoryIdToSkillsMap.get(childSkillCategory.id)
                              ?.length ?? 0}
                          </p>
                          {/* Number of skills message for screen readers */}
                          <span data-h2-visibility="b(invisible)">
                            {intl.formatMessage(messages.numOfCategorySkills, {
                              numOfSkills:
                                categoryIdToSkillsMap.get(childSkillCategory.id)
                                  ?.length ?? 0,
                              category: localizeFieldNonNull(
                                locale,
                                childSkillCategory,
                                "name",
                              ),
                            })}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Accordion.Content>
            </Accordion>
          </li>
        );
      })}
    </ul>
  );
};

export default SkillCategories;

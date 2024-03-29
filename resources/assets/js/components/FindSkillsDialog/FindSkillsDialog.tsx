import React, { useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";
import {
  getLocale,
  localizeFieldNonNull,
  matchStringsCaseDiacriticInsensitive,
} from "../../helpers/localize";
import { Skill, SkillCategory } from "../../models/types";
import SearchBar from "../SearchBar";
import Dialog from "../H2Components/Dialog";
import { focusOnElement } from "../../helpers/focus";
import { dialogMessages as messages } from "./messages";
import SkillCategories from "./SkillCategories";
import SearchResults from "./SearchResults";
import { mapToObjectTrans } from "../../helpers/queries";

const FIND_SKILLS_DIALOG_ID = "dialog-id-find-skills";
interface FindSkillsDialogTriggerProps {
  openDialog: () => void;
}
export const FindSkillsDialogTrigger: React.FC<FindSkillsDialogTriggerProps> = ({
  openDialog,
}) => {
  const intl = useIntl();
  return (
    <Dialog.Trigger
      id={FIND_SKILLS_DIALOG_ID}
      data-h2-shadow="b(medium)"
      buttonStyling="theme-2, round, medium, outline"
      data-h2-grid="b(top, expanded, flush, 0)"
      onClick={openDialog}
    >
      <div data-h2-grid-item="b(1of1)">
        <div data-h2-grid-content>
          <span data-h2-font-color="b(theme-2)" data-h2-font-size="b(h2)">
            <i className="fa fa-binoculars" />
          </span>
        </div>
      </div>
      <div data-h2-grid-item="b(1of1)">
        <div data-h2-grid-content>
          <p data-h2-button-label>
            {intl.formatMessage(messages.triggerLabel)}
          </p>
        </div>
      </div>
    </Dialog.Trigger>
  );
};
interface FindSkillsDialogProps {
  previousSkills: Skill[];
  portal: "applicant" | "manager";
  skills: Skill[];
  skillCategories: SkillCategory[];
  isDialogVisible: boolean;
  closeDialog: () => void;
  handleSubmit: (values: Skill[]) => Promise<void>;
}

const FindSkillsDialog: React.FunctionComponent<FindSkillsDialogProps> = ({
  previousSkills,
  portal,
  skills,
  skillCategories,
  isDialogVisible,
  closeDialog,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  // List of new Skills that will be saved to the user on submit.
  const [newSkills, setNewSkills] = useState<Skill[]>([]);
  // List of skills that displayed in the results section of the modal.
  const [results, setResults] = useState<Skill[] | null>(null);
  // Stores the skill category's name and description for the results section.
  const [resultsSectionText, setResultsSectionText] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  // This holds the active skill category's key, which is used for styling purposes.
  const [activeCategory, setActiveCategory] = useState<SkillCategory["key"]>(
    "",
  );

  // NOTE: The following two hooks are useRef instead of useState because they are only used by callback functions;
  //   We don't want the component to re-render in response to their value changing.
  // This holds the html selector of the element that triggered the search.
  const searchResultsSource = useRef<{
    elementSelector: string;
  }>({ elementSelector: "" });
  // This is used when manually adjusting tab focus to only focus on top level "menu" items.
  const prevTabbedElement = React.useRef<HTMLElement | null>(null);

  /**
   * This state is an object which holds a list of all the accordions.
   * The value represents if the accordion is expanded or not.
   */
  const [accordionData, setAccordionData] = React.useState<{
    skills: { [id: string]: boolean };
    parentSkillCategories: { [key: string]: boolean };
  }>({
    skills: {
      ...mapToObjectTrans(
        skills,
        (skill) => skill.id,
        () => false,
      ),
    },
    parentSkillCategories: {
      ...mapToObjectTrans(
        skillCategories.filter((skillCategory) => !skillCategory.parent_id), // Only want parent categories.
        (parentSkillCategory) => parentSkillCategory.id,
        () => false,
      ),
    },
  });

  /**
   * By default, this method will toggle the accordion from expanded to collapsed (or vice versa) with the given key.
   * There is also a second parameter to set the state.
   * @param key Accordion key.
   * @param value Optional value to set the accordions state (expanded or collapsed).
   */
  const toggleAccordion = (
    id: number,
    key: "skills" | "parentSkillCategories",
    isExpanded: boolean | null = null,
  ): void => {
    setAccordionData({
      ...accordionData,
      [key]: {
        ...accordionData[key],
        [id]: isExpanded !== null ? isExpanded : !accordionData[key][id],
      },
    });
  };

  /**
   * Closes all skill category and skill accordions in the dialog.
   */
  const closeAllAccordions = React.useCallback(() => {
    setAccordionData({
      skills: {
        ...mapToObjectTrans(
          skills,
          (skill) => skill.id,
          () => false,
        ),
      },
      parentSkillCategories: {
        ...mapToObjectTrans(
          skillCategories.filter((skillCategory) => !skillCategory.parent_id), // Only want parent categories.
          (parentSkillCategory) => parentSkillCategory.id,
          () => false,
        ),
      },
    });
  }, [skillCategories, skills]);

  /**
   * Returns a map of skills where the key represents the category id, and the value is an array of skills in that category.
   */
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

  /**
   * Filters through the skills list for the any skills that match the search query.
   * @param searchQuery The search query entered by the user.
   */
  const handleSkillSearch = (searchQuery: string): Promise<void> => {
    if (searchQuery.length === 0) {
      setResults(null);
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
    setResultsSectionText({
      title: intl.formatMessage(messages.searchResultsTitle, {
        numOfSkills: skillMatches.length,
        searchQuery,
      }),
      description: "",
    });
    setResults(skillMatches);
    searchResultsSource.current = {
      elementSelector: "#skill-search-button",
    };
    // After doing a search, focus moves to the results pane, but for tabbing purposes we want to pretend these results
    // are between the search bar and the first Skill Category: tabbing backward should return to the search bar, tabbing
    // forward should move to the first Skill Category. Accordionly, we can pretend the previous tabbed element was the
    // search button, which is right between those two elements.
    prevTabbedElement.current = document.getElementById("skill-search-button");
    return Promise.resolve();
  };

  /**
   * Sets up the state of the skill results pane when a skill category is clicked.
   * @param childSkillCategory Skill Category object.
   */
  const onSkillCategoryClick = (childSkillCategory: SkillCategory): void => {
    setResults(categoryIdToSkillsMap.get(childSkillCategory.id) ?? []);
    setActiveCategory(childSkillCategory.key);
    setResultsSectionText({
      title: intl.formatMessage(messages.skills, {
        category: localizeFieldNonNull(locale, childSkillCategory, "name"),
      }),
      description: "",
      // TODO: Restore this when descriptions are added to Skill Categories on backend.
      // localizeFieldNonNull(
      //   locale,
      //   childSkillCategory,
      //   "description",
      // ),
    });
    searchResultsSource.current = {
      elementSelector: `#${childSkillCategory.key}-skill-category`,
    };
  };

  /**
   * Resets the search results pane to its default state, and puts focus back on the search results source.
   */
  const resetResults = (): void => {
    setResults(null);
    setActiveCategory("");
    focusOnElement(searchResultsSource.current.elementSelector);
    searchResultsSource.current = { elementSelector: "" };
  };

  const dialogRef = React.useRef<HTMLElement | null>(null);
  const handleTabableElements: (
    event: KeyboardEvent,
  ) => void = React.useCallback(
    (event) => {
      if (event.key === "Tab" && dialogRef.current) {
        // In this dialog, not all focusable elements are meant to be reached via the tab key.
        // We manually keep track of tabable elements with a `data-tabable` data attribute.
        const tabableElements = Array.from(
          dialogRef.current.querySelectorAll(
            "[data-tabable='true']:not([disabled])",
          ),
        ) as HTMLElement[];

        if (tabableElements.length === 0) {
          return;
        }

        const firstElement = tabableElements[0] as HTMLElement;

        if (tabableElements.length === 1) {
          // This check is to avoid strange behavior if firstElement == lastElement.
          firstElement.focus();
          event.preventDefault();
          return;
        }

        // Because "non-tabable" may recieve focus, we track the last "tabable" element we were at
        // with prevTabbedElement, and calculate the next and prev tabable elements in reference to that.

        // If prevTabbedElement is null, treat the current index as zero
        const currentTabIndex =
          prevTabbedElement.current !== null
            ? tabableElements.findIndex(
                (element) => element === prevTabbedElement.current,
              )
            : 0;

        const forwardIndex = (currentTabIndex + 1) % tabableElements.length;
        // backwardIndex loops around to the last tabable element if currently focused on the first.
        const backwardIndex =
          currentTabIndex <= 0
            ? tabableElements.length - 1
            : currentTabIndex - 1;

        const targetElement = event.shiftKey
          ? tabableElements[backwardIndex]
          : tabableElements[forwardIndex];

        targetElement.focus();
        prevTabbedElement.current = targetElement;
        closeAllAccordions();
        event.preventDefault();
      }
    },
    [closeAllAccordions],
  );

  React.useEffect(() => {
    if (isDialogVisible) {
      document.addEventListener("keydown", handleTabableElements);
    }

    return () => document.removeEventListener("keydown", handleTabableElements);
  }, [isDialogVisible, handleTabableElements]);

  React.useEffect(() => {
    // If user manually focuses on a "legally tabable" element (eg by clicking or other keyboard hotkeys)
    // update prevTabbedElement.
    const handleFocus = (e: FocusEvent) => {
      if (dialogRef.current) {
        const tabableElements = Array.from(
          dialogRef.current.querySelectorAll("[data-tabable='true']"),
        ) as HTMLElement[];
        const { activeElement } = document;
        if (
          activeElement &&
          tabableElements.includes(activeElement as HTMLElement)
        ) {
          prevTabbedElement.current = activeElement as HTMLElement;
        }
      }
    };
    if (isDialogVisible) {
      document.addEventListener("focus", handleFocus, true);
    }
    return () => document.removeEventListener("focus", handleFocus, true);
  });

  /**
   * Closes the dialog and puts the focus back onto the dialog trigger.
   */
  const handleCloseDialog = (): void => {
    focusOnElement(`[data-h2-dialog-trigger=${FIND_SKILLS_DIALOG_ID}]`);
    resetResults();
    closeAllAccordions();
    closeDialog();
  };

  return (
    <section ref={dialogRef}>
      <Dialog
        id={FIND_SKILLS_DIALOG_ID}
        isVisible={isDialogVisible}
        closeDialog={handleCloseDialog}
        data-h2-radius="b(round)"
        overrideFocusRules
      >
        <Dialog.Header
          buttonAttributes={{ "data-tabable": true }}
          className="gradient-left-right"
        >
          <Dialog.Title
            data-h2-padding="b(all, 1)"
            data-h2-font-color="b(white)"
            data-h2-font-size="b(h4)"
            data-tabable
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
              buttonId="skill-search-button"
              buttonAttributes={{ "data-tabable": true }}
              inputAttributes={{ "data-tabable": true }}
            />
            <SkillCategories
              activeCategory={activeCategory}
              accordionData={accordionData}
              onSkillCategoryClick={onSkillCategoryClick}
              skillCategories={skillCategories}
              skills={skills}
              toggleAccordion={toggleAccordion}
            />
          </div>
          <SearchResults
            accordionData={accordionData}
            description={resultsSectionText.description}
            newSkills={newSkills}
            previousSkills={previousSkills}
            results={results}
            resetResults={resetResults}
            setNewSkills={setNewSkills}
            title={resultsSectionText.title}
            toggleAccordion={toggleAccordion}
          />
        </Dialog.Content>
        <Dialog.Actions
          data-h2-grid="b(middle, expanded, padded, .5)"
          data-h2-margin="b(all, 0)"
          data-h2-bg-color="b(gray-1, 1)"
        >
          <div data-h2-align="b(left)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              data-tabable
              buttonStyling="stop, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              data-h2-bg-color="b(white, 1)"
              onClick={handleCloseDialog}
            >
              <p>{intl.formatMessage(messages.cancelButton)}</p>
            </Dialog.ActionBtn>
          </div>
          <div data-h2-align="b(right)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              data-tabable
              buttonStyling="theme-1, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              onClick={() =>
                handleSubmit(newSkills).then(() => {
                  setNewSkills([]);
                  setResults(null);
                  handleCloseDialog();
                })
              }
              disabled={newSkills.length === 0}
            >
              <p>{intl.formatMessage(messages.saveButton)}</p>
            </Dialog.ActionBtn>
          </div>
        </Dialog.Actions>
      </Dialog>
    </section>
  );
};

export default FindSkillsDialog;

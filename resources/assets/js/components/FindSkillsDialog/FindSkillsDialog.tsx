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
import { focusOnElement } from "../../helpers/forms";
import { dialogMessages as messages } from "./messages";
import SkillCategories from "./SkillCategories";
import SearchResults from "./SearchResults";

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
  const [results, setResults] = useState<Skill[]>([]);
  // Stores the skill category's name and description for the results section.
  const [resultsSectionText, setResultsSectionText] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [firstVisit, setFirstVisit] = useState(true);
  // Stores a list of skills category keys of which accordions are expanded, for styling purposes.
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  // Used to set the button color of an active skill category.
  const searchResultsSource = useRef<{
    elementSelector: string;
  }>({ elementSelector: "" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory["key"]>(
    "",
  );
  const prevTabbedElement = React.useRef<HTMLElement | null>(null);

  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) => !skillCategory.parent_id,
  );

  const skillsAccordionData = skills.reduce(
    (collection: { [key: string]: boolean }, skill: Skill) => {
      collection[`skill-${skill.id}`] = false;
      return collection;
    },
    {},
  );
  const categoriesAccordionData = parentSkillCategories.reduce(
    (
      collection: { [key: string]: boolean },
      parentSkillCategory: SkillCategory,
    ) => {
      collection[parentSkillCategory.key] = false;
      return collection;
    },
    {},
  );

  const [accordionData, setAccordionData] = React.useState<{
    [key: string]: boolean;
  }>({ ...skillsAccordionData, ...categoriesAccordionData });

  /**
   * By default, this method will toggle the accordion from expanded to collapsed (or vice versa) with the given key.
   * There is also a second parameter to set the state.
   * @param key Accordion key.
   * @param value Optional value to set the accordions state (expanded or collapsed).
   */
  const toggleAccordion = (key: string, isExpanded: boolean | null = null) => {
    setAccordionData({
      ...accordionData,
      [key]: isExpanded !== null ? isExpanded : !accordionData[key],
    });
  };

  const closeAllAccordions = () => {
    setAccordionData(
      Object.keys(accordionData).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
    );
  };

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
      setResults([]);
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
    setResults(skillMatches);
    searchResultsSource.current = {
      elementSelector: "#skill-search-button",
    };
    prevTabbedElement.current = document.getElementById("skill-search-button");
    return Promise.resolve();
  };

  /**
   * Sets up the state of the skill results pane when a skill category is clicked.
   * @param childSkillCategory Skill Category object.
   */
  const onSkillCategoryClick = (childSkillCategory: SkillCategory) => {
    setFirstVisit(false);
    searchResultsSource.current = {
      elementSelector: `#${childSkillCategory.key}-skill-category`,
    };
    setActiveCategory(childSkillCategory.key);
    setResultsSectionText({
      title: intl.formatMessage(messages.skills, {
        category: localizeFieldNonNull(locale, childSkillCategory, "name"),
      }),
      description: "",
      // TODO: Restore this when discriptions are added to Skill Categories on backend.
      // localizeFieldNonNull(
      //   locale,
      //   childSkillCategory,
      //   "description",
      // ),
    });
    setResults(categoryIdToSkillsMap.get(childSkillCategory.id) ?? []);
  };

  /**
   * Resets the search results pane to its default state, and puts focus back on subcategory.
   */
  const resetResults = () => {
    setFirstVisit(true);
    focusOnElement(searchResultsSource.current.elementSelector);
    console.log(searchResultsSource.current.elementSelector);
    searchResultsSource.current = { elementSelector: "" };
    setActiveCategory("");
    setResults([]);
  };

  /**
   * We need to create a ref of all the tabable elements in the dialog.
   * Then we need a useEffect hook to store the last element in the list that had focus.
   * Using this we can determine where the next and previous tab will be.
   */
  const dialogRef = React.useRef<HTMLElement | null>(null);

  const handleTabableElements = React.useCallback(
    (event) => {
      if (event.key === "Tab" && dialogRef.current) {
        const { activeElement } = document;
        const tabableElements = Array.from(
          dialogRef.current.querySelectorAll(
            "[data-tabable='true']:not([disabled])",
          ),
        ) as HTMLElement[];

        console.log(tabableElements);

        if (tabableElements.length === 0) {
          event.preventDefault(); // TODO: should this throw an error?
          return;
        }

        const firstElement = tabableElements[0] as HTMLElement;
        const lastElement = tabableElements[
          tabableElements.length - 1
        ] as HTMLElement;

        if (tabableElements.length === 1) {
          // This check to avoid strange behavior if firstElement == lastElement.
          firstElement.focus();
          event.preventDefault();
          return;
        }

        // If prevTabbedElement is null, treat the current index as zero
        const currentTabIndex =
          prevTabbedElement.current !== null
            ? tabableElements.findIndex(
                (element) => element === prevTabbedElement.current,
              )
            : 0;
        console.log("Current index", currentTabIndex);
        const forwardIndex = (currentTabIndex + 1) % tabableElements.length;
        // backwardIndex loops around to the last tabable element if currently focused on the first.
        const backwardIndex =
          currentTabIndex <= 0
            ? tabableElements.length - 1
            : currentTabIndex - 1;

        const targetElement = event.shiftKey
          ? tabableElements[backwardIndex]
          : tabableElements[forwardIndex];

        console.log(
          "Target index",
          event.shiftKey ? backwardIndex : forwardIndex,
        );
        console.log("Target element", targetElement);

        targetElement.focus();
        prevTabbedElement.current = targetElement;
        closeAllAccordions();
        event.preventDefault();
      }
    },
    [prevTabbedElement],
  );
  React.useEffect(() => {
    if (isDialogVisible) {
      document.addEventListener("keydown", handleTabableElements);
    }

    return () => document.removeEventListener("keydown", handleTabableElements);
  }, [isDialogVisible, handleTabableElements]);

  React.useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      console.log("handle focus", e);
      if (dialogRef.current) {
        const tabableElements = Array.from(
          dialogRef.current.querySelectorAll("[data-tabable='true']"),
        ) as HTMLElement[];
        const { activeElement } = document;
        if (
          activeElement &&
          tabableElements.includes(activeElement as HTMLElement)
        ) {
          console.log("focus set prev tabbed", activeElement);
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
  const handleCloseDialog = () => {
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
        closeDialog={closeDialog}
        data-h2-radius="b(round)"
      >
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
            firstVisit={firstVisit}
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
                  setFirstVisit(true);
                  setResults([]);
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

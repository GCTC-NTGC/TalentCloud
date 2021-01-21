import React, { useState } from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../helpers/localize";
import { Skill, SkillCategory } from "../../models/types";

interface FindSkillsModalProps {
  skills: Skill[];
  skillCategories: SkillCategory[];
  handleSubmit: (values: Skill[]) => Promise<void>;
}

const FindSkillsModal: React.FunctionComponent<FindSkillsModalProps> = ({
  skills,
  skillCategories,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) =>
      skillCategory.depth === 1 && skillCategory.parent_id === 0,
  );

  const [addedSkills, setAddedSkills] = useState<Skill[]>(skills);
  const [skillsResults, setSkillsResults] = useState<Skill[]>([]);
  const [skillResultsTitle, setSkillResultsTitle] = useState("");
  const [firstVisit, setFirstVisit] = useState(true);
  const [accordionExpanded, setAccordionExpanded] = useState<string[]>([]);
  const [buttonClicked, setButtonClicked] = useState("");

  // TODO: Remove inline style and replace with class.
  // TODO: Break component down into smaller components.
  // TODO: Make smaller components more modular so they can be reused on manager side.
  // TODO: Add in translations.
  // TODO: Does the Find Skills modal open up with skills button set to "Remove" if they have already added it? If so, will clicking the "Remove" button on a skill and hitting save skills remove it from there profile? OR Does the list only show skills that they haven't added yet?
  return (
    <section>
      <button
        data-h2-dialog-trigger="findSkills"
        data-h2-button="white, round, solid"
        data-h2-card="white, round"
        data-h2-padding="mqb(tb, .5)"
        type="button"
      >
        <div data-h2-grid="mqb(top, expanded, flush, 0)">
          <div data-h2-grid-item="mqb(1of1)">
            <img src="https://via.placeholder.com/75" />
          </div>
          <p data-h2-grid-item="mqb(1of1)">Add Skills</p>
        </div>
      </button>
      <div
        aria-hidden="true"
        aria-describedby="dialog01Content"
        aria-labelledby="dialog01Title"
        data-h2-dialog="findSkills"
        tabIndex={-1}
        role="dialog"
      >
        <div
          data-h2-dialog-wrapper
          data-h2-radius="mqb(round)"
          style={{ backgroundColor: "unset" }}
        >
          <div data-h2-dialog-title>
            <h2
              data-h2-focus
              id="dialog01Title"
              data-h2-bg-color="mqb(theme-1, 1)"
              data-h2-padding="mqb(all, 1)"
              data-h2-font-color="mqb(white)"
              data-h2-font-size="mqb(h4)"
              className="gradient-left-right"
            >
              Find and add skills
            </h2>
          </div>
          <div data-h2-dialog-content data-h2-bg-color="mqb(white, 1)">
            <div
              id="dialog01Content"
              data-h2-grid="mqb(top, expanded, flush, 0) mqm(top, expanded, flush, 0)"
              style={{ alignItems: "stretch" }}
            >
              {/* Parent Skill Category Accordions Section */}
              <div data-h2-grid-item="mqs(2of5) mqb(1of1)">
                <ul
                  data-h2-padding="mqb(left, 0)"
                  style={{ listStyleType: "none" }}
                >
                  {parentSkillCategories.map(
                    ({ id, name, key, description }, index) => {
                      // Get children skill categories of parent skill category.
                      const childrenSkillCategories = skillCategories.filter(
                        (skillCategory) =>
                          skillCategory.depth === 2 &&
                          skillCategory.parent_id === id,
                      );
                      return (
                        <li
                          key={key}
                          data-h2-bg-color={`mqb(gray-1, ${
                            accordionExpanded.includes(key) ? ".5" : "0"
                          })`}
                          data-h2-padding="mqb(tb, 1)"
                          data-h2-border={`${
                            index + 1 !== parentSkillCategories.length
                              ? "mqb(gray-2, bottom, solid, thin)"
                              : ""
                          }`}
                          data-h2-margin="mqb(tb, 0)"
                        >
                          <div data-h2-accordion="left">
                            <button
                              aria-expanded="false"
                              data-h2-accordion-trigger
                              tabIndex={0}
                              type="button"
                              data-h2-font-color="mqb(theme-1)"
                              onClick={() =>
                                setAccordionExpanded(
                                  accordionExpanded.includes(key)
                                    ? accordionExpanded.filter(
                                        (accordionKey) => accordionKey !== key,
                                      )
                                    : [...accordionExpanded, key],
                                )
                              }
                            >
                              <span data-h2-accordion-trigger-label>
                                Click to view...
                              </span>
                              <span
                                aria-hidden="true"
                                data-h2-accordion-add-icon
                                data-h2-font-weight="mqb(700)"
                              >
                                <i className="fas fa-plus" />
                              </span>
                              <span
                                aria-hidden="true"
                                data-h2-accordion-remove-icon
                                data-h2-font-weight="mqb(700)"
                              >
                                <i className="fas fa-minus" />
                              </span>
                              <div data-h2-accordion-trigger-content>
                                <p data-h2-font-weight="mqb(700)">
                                  {name[locale]}
                                </p>
                              </div>
                            </button>
                            <p
                              data-h2-padding="mqb(tb, 1) mqb(right, .5)"
                              data-h2-font-color="mqb(black)"
                              data-h2-font-size="mqb(small)"
                              style={{ paddingLeft: "5rem" }}
                            >
                              {description[locale]}
                            </p>
                            {/* Children Skill Buttons Section */}
                            <div aria-hidden="true" data-h2-accordion-content>
                              <section>
                                <ul
                                  data-h2-padding="mqb(all, 0)"
                                  style={{ listStyleType: "none" }}
                                >
                                  {childrenSkillCategories.map(
                                    ({ key, name, skills }) => {
                                      return (
                                        <li key={key}>
                                          <div
                                            data-h2-dialog-actions
                                            data-h2-grid="mqb(middle, expanded, flush, 0)"
                                            data-h2-margin="mqb(right, .5)"
                                          >
                                            <div
                                              data-h2-align="mqb(left)"
                                              data-h2-grid-item="mqb(5of6)"
                                            >
                                              <button
                                                data-h2-button=""
                                                type="button"
                                                onClick={() => {
                                                  setFirstVisit(false);
                                                  setSkillResultsTitle(
                                                    name[locale],
                                                  );
                                                  setButtonClicked(key);
                                                  setSkillsResults(skills);
                                                }}
                                              >
                                                <p
                                                  data-h2-button-label
                                                  data-h2-font-weight="mqb(700)"
                                                  data-h2-display="mqb(block)"
                                                  data-h2-font-style={`${
                                                    buttonClicked === key
                                                      ? "mqb(none)"
                                                      : "mqb(underline)"
                                                  }`}
                                                  data-h2-font-color={`${
                                                    buttonClicked === key
                                                      ? "mqb(theme-1)"
                                                      : "mqb(black)"
                                                  }`}
                                                  data-h2-align="mqb(left)"
                                                >
                                                  {name[locale]}
                                                </p>
                                              </button>
                                            </div>
                                            <div
                                              data-h2-grid-item="mqb(1of6)"
                                              data-h2-align="mqb(center)"
                                              data-h2-radius="mqb(round)"
                                              data-h2-bg-color={`${
                                                buttonClicked === key
                                                  ? "mqb(theme-1, 1)"
                                                  : "mqb(white)"
                                              }`}
                                              data-h2-font-color={`${
                                                buttonClicked === key
                                                  ? "mqb(white)"
                                                  : "mqb(black)"
                                              }`}
                                            >
                                              <p>{skills.length}</p>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    },
                                  )}
                                </ul>
                              </section>
                            </div>
                          </div>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
              {/* Skill Results Section */}
              <div
                data-h2-grid-item="mqs(3of5) mqb(1of1)"
                data-h2-border="mqs(gray-2, left, solid, thin) mqb(gray-2, top, solid, thin)"
                style={{ height: "35rem" }}
              >
                {firstVisit ? (
                  <div
                    data-h2-padding="mqb(tb, 5) mqb(rl, 3)"
                    data-h2-container="mqb(center, large)"
                  >
                    <p
                      data-h2-font-size="mqb(h4)"
                      data-h2-font-weight="mqb(700)"
                      data-h2-padding="mqb(top, 3) mqb(bottom, 1)"
                    >
                      <i
                        data-h2-padding="mqb(right, .5)"
                        className="fas fa-arrow-left"
                      />
                      Explore Categories
                    </p>
                    <p>
                      Click on the categories on the left to explore skills.
                      Only select the skills that you have experience with.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p
                      data-h2-font-size="mqb(h4)"
                      data-h2-font-weight="mqb(700)"
                      data-h2-padding="mqb(all, 1)"
                    >
                      {skillResultsTitle} Skills
                    </p>
                    {!firstVisit && skillsResults.length > 0 ? (
                      <ul
                        data-h2-padding="mqb(left, 0)"
                        style={{ listStyleType: "none" }}
                      >
                        {skillsResults.map((skill) => {
                          const { id, name, description } = skill;
                          const isAdded = addedSkills.find(
                            (addedSkill) => addedSkill.id === skill.id,
                          );
                          return (
                            <li
                              key={id}
                              data-h2-grid="mqb(middle, contained, padded, 0)"
                            >
                              <div
                                data-h2-accordion="left"
                                data-h2-grid-item="mqb(2of3)"
                              >
                                <button
                                  aria-expanded="false"
                                  data-h2-accordion-trigger
                                  tabIndex={0}
                                  type="button"
                                >
                                  <span data-h2-accordion-trigger-label>
                                    Click to view...
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    data-h2-accordion-add-icon
                                  >
                                    <i className="fas fa-plus" />
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    data-h2-accordion-remove-icon
                                  >
                                    <i className="fas fa-minus" />
                                  </span>
                                  <div data-h2-accordion-trigger-content>
                                    <p
                                      data-h2-font-weight="mqb(700)"
                                      data-h2-font-style="mqb(underline)"
                                    >
                                      {name[locale]}
                                      {isAdded && (
                                        <i
                                          data-h2-padding="mqb(left, .5)"
                                          data-h2-font-color="mqb(theme-1)"
                                          aria-hidden="true"
                                          className="fas fa-check"
                                        />
                                      )}
                                    </p>
                                  </div>
                                </button>
                                <div
                                  aria-hidden="true"
                                  data-h2-accordion-content
                                >
                                  <p data-h2-focus>{description[locale]}</p>
                                </div>
                              </div>
                              <button
                                data-h2-button=""
                                data-h2-grid-item="mqb(1of4)"
                                type="button"
                                onClick={() => {
                                  // If the skill has been selected then remove it.
                                  // Else, if the has not been selected then add it to addedSkills list.
                                  if (isAdded) {
                                    setAddedSkills(
                                      addedSkills.filter(
                                        (applicantSkill) =>
                                          applicantSkill.id !== skill.id,
                                      ),
                                    );
                                  } else {
                                    setAddedSkills([...addedSkills, skill]);
                                  }
                                }}
                              >
                                <p
                                  data-h2-button-label
                                  data-h2-font-weight="mqb(700)"
                                  data-h2-font-style="mqb(underline)"
                                  data-h2-font-color={`${
                                    isAdded ? "mqb(theme-1)" : "mqb(black)"
                                  }`}
                                >
                                  {isAdded ? "Remove" : "Select"}
                                </p>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>No skills have been added yet :(</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            data-h2-dialog-actions
            data-h2-grid="mqb(middle, expanded, padded, .5)"
            data-h2-margin="mqb(all, 0)"
            data-h2-bg-color="mqb(gray-1, 1)"
          >
            <div data-h2-align="mqb(left)" data-h2-grid-item="mqb(1of2)">
              <button
                data-h2-dialog-trigger="findSkills"
                type="button"
                data-h2-button="stop, round, solid"
                data-h2-padding="mqb(rl, 2) mqb(tb, .5)"
                data-h2-bg-color="mqb(white, 1)"
                onClick={() => {
                  setSkillsResults([]);
                }}
              >
                Cancel
              </button>
            </div>
            <div data-h2-align="mqb(right)" data-h2-grid-item="mqb(1of2)">
              <button
                data-h2-dialog-trigger="findSkills"
                type="button"
                data-h2-button="theme-1, round, solid"
                data-h2-padding="mqb(rl, 2) mqb(tb, .5)"
                onClick={() => handleSubmit(addedSkills)}
              >
                Save Skills
              </button>
            </div>
          </div>
        </div>
      </div>
      <div data-h2-dialog-overlay="black, .9" />
    </section>
  );
};

export default FindSkillsModal;

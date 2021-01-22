import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import { getLocale } from "../helpers/localize";
import { Portal } from "../models/app";
import { Skill, SkillCategory } from "../models/types";

const messages = defineMessages({
  modalButtonLabel: {
    id: "findSkillsModal.modalButtonLabel",
    defaultMessage: "Add Skills",
  },
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
});
interface FindSkillsModalProps {
  portal: "applicant" | "manager";
  oldSkills: Skill[];
  skillCategories: SkillCategory[];
  handleSubmit: (values: Skill[]) => Promise<void>;
}

const FindSkillsModal: React.FunctionComponent<FindSkillsModalProps> = ({
  portal,
  oldSkills,
  skillCategories,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) =>
      skillCategory.depth === 1 && skillCategory.parent_id === 0,
  );

  const [newSkills, setNewSkills] = useState<Skill[]>([]);
  const [skillsResults, setSkillsResults] = useState<Skill[]>([]);
  const [resultsSectionText, setResultsSectionText] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const [firstVisit, setFirstVisit] = useState(true);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  const [buttonClicked, setButtonClicked] = useState("");

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
          <p data-h2-grid-item="mqb(1of1)">
            {intl.formatMessage(messages.modalButtonLabel)}
          </p>
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
        <div data-h2-dialog-wrapper data-h2-radius="mqb(round)">
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
              {intl.formatMessage(messages.modalHeading)}
            </h2>
          </div>
          <div data-h2-dialog-content data-h2-bg-color="mqb(white, 1)">
            <div
              id="dialog01Content"
              data-h2-grid="mqb(top, expanded, flush, 0)"
            >
              {/* Parent Skill Category Accordions Section */}
              <div data-h2-grid-item="mqs(2of5) mqb(1of1)">
                <ul
                  data-h2-padding="mqb(left, 0)"
                  className="no-list-style-type"
                >
                  {parentSkillCategories.map(
                    ({ id, name, key, description }, index) => {
                      // Get children skill categories of parent skill category.
                      const childrenSkillCategories = skillCategories.filter(
                        (childSkillCategory) =>
                          childSkillCategory.depth === 2 &&
                          childSkillCategory.parent_id === id,
                      );
                      return (
                        <li
                          key={key}
                          data-h2-bg-color={`mqb(gray-1, ${
                            expandedAccordions.includes(key) ? ".5" : "0"
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
                                setExpandedAccordions(
                                  expandedAccordions.includes(key)
                                    ? expandedAccordions.filter(
                                        (accordionKey) => accordionKey !== key,
                                      )
                                    : [...expandedAccordions, key],
                                )
                              }
                            >
                              <span data-h2-accordion-trigger-label>
                                {intl.formatMessage(
                                  messages.accordianButtonLabel,
                                )}
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
                              data-h2-padding="mqb(top, .25) mqb(bottom, 1) mqb(right, .5)"
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
                                  className="no-list-style-type"
                                >
                                  {childrenSkillCategories.map(
                                    (childSkillCatergory) => {
                                      const {
                                        key,
                                        name,
                                        description,
                                        skills,
                                      } = childSkillCatergory;
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
                                                  setButtonClicked(key);
                                                  setResultsSectionText({
                                                    name: name[locale],
                                                    description:
                                                      description[locale],
                                                  });
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
                                                  : "mqb(white, 1)"
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
                    data-h2-padding="mqb(tb, 5) mqb(right, 3) mqb(left, 4)"
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
                      {intl.formatMessage(messages.skillsResultsHeading)}
                    </p>
                    <p>{intl.formatMessage(messages.skillResultsSubHeading)}</p>
                  </div>
                ) : (
                  <div>
                    <button
                      data-h2-button
                      type="button"
                      data-h2-padding="mqb(all, 1)"
                      onClick={() => {
                        setFirstVisit(true);
                        setButtonClicked("");
                        setSkillsResults([]);
                      }}
                    >
                      <p
                        data-h2-button-label
                        data-h2-font-weight="mqb(700)"
                        data-h2-font-style="mqb(underline)"
                      >
                        <i
                          data-h2-padding="mqb(right, 1)"
                          className="fas fa-caret-left"
                        />
                        {intl.formatMessage(messages.backButton)}
                      </p>
                    </button>

                    <p
                      data-h2-font-size="mqb(h4)"
                      data-h2-font-weight="mqb(700)"
                      data-h2-padding="mqb(rl, 1) mqb(bottom, .5)"
                    >
                      {resultsSectionText.name}{" "}
                      {intl.formatMessage(messages.skills)}
                    </p>
                    <p
                      data-h2-font-size="mqb(small)"
                      data-h2-padding="mqb(rl, 1) mqb(bottom, 2)"
                    >
                      {resultsSectionText.description}
                    </p>
                    {!firstVisit && skillsResults.length > 0 ? (
                      <ul
                        data-h2-padding="mqb(left, 0)"
                        className="no-list-style-type"
                      >
                        {skillsResults.map((skill) => {
                          const { id, name, description } = skill;
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
                              data-h2-grid="mqb(middle, contained, padded, 0)"
                            >
                              <div
                                data-h2-accordion="left"
                                data-h2-grid-item="mqb(3of4)"
                              >
                                <button
                                  aria-expanded="false"
                                  data-h2-accordion-trigger
                                  tabIndex={0}
                                  type="button"
                                >
                                  <span data-h2-accordion-trigger-label>
                                    {intl.formatMessage(
                                      messages.accordianButtonLabel,
                                    )}
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
                              {isOldSkill ? (
                                <button
                                  data-h2-button
                                  data-h2-grid-item="mqb(1of4)"
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
                                  data-h2-button
                                  data-h2-grid-item="mqb(1of4)"
                                  type="button"
                                  disabled={isOldSkill}
                                  onClick={() => {
                                    // If the skill has been selected then remove it.
                                    // Else, if the has not been selected then add it to addedSkills list.
                                    if (isAdded) {
                                      setNewSkills(
                                        newSkills.filter(
                                          (applicantSkill) =>
                                            applicantSkill.id !== skill.id,
                                        ),
                                      );
                                    } else {
                                      setNewSkills([...newSkills, skill]);
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
                      <p>{intl.formatMessage(messages.noSkills)}</p>
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
                <p>{intl.formatMessage(messages.cancelButton)}</p>
              </button>
            </div>
            <div data-h2-align="mqb(right)" data-h2-grid-item="mqb(1of2)">
              <button
                data-h2-dialog-trigger="findSkills"
                type="button"
                data-h2-button="theme-1, round, solid"
                data-h2-padding="mqb(rl, 2) mqb(tb, .5)"
                onClick={() => handleSubmit(newSkills)}
                disabled={newSkills.length === 0}
              >
                <p>{intl.formatMessage(messages.saveButton)}</p>
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

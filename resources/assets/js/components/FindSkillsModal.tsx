import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import { getLocale } from "../helpers/localize";
import { Skill, SkillCategory } from "../models/types";
import Accordion from "./H2Components/Accordion";
import Dialog from "./H2Components/Dialog";

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
  searchResultsTitle: {
    id: "findSkillsModal.searchResultsTitle",
    defaultMessage: `There are {numOfSkills} results for skills related to "{searchQuery}".`,
  },
});

interface FindSkillsModalProps {
  oldSkills: Skill[];
  portal: "applicant" | "manager";
  skillCategories: SkillCategory[];
  handleSubmit: (values: Skill[]) => Promise<void>;
}

const FindSkillsModal: React.FunctionComponent<FindSkillsModalProps> = ({
  oldSkills,
  portal,
  skillCategories,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const parentSkillCategories: SkillCategory[] = skillCategories.filter(
    (skillCategory) =>
      skillCategory.depth === 1 && skillCategory.parent_id === 0,
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

  return (
    <section>
      <Dialog.Trigger
        id="findSkills"
        data-h2-button="white, round, solid"
        data-h2-card="white, round"
        data-h2-padding="b(tb, .5)"
      >
        <div data-h2-grid="b(top, expanded, flush, 0)">
          <div data-h2-grid-item="b(1of1)">
            <img alt="" src="https://via.placeholder.com/75" />
          </div>
          <p data-h2-grid-item="b(1of1)">
            {intl.formatMessage(messages.modalButtonLabel)}
          </p>
        </div>
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
            <ul data-h2-padding="b(left, 0)" className="no-list-style-type">
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
                      key={id}
                      data-h2-bg-color={`b(gray-1, ${
                        expandedAccordions.includes(key) ? ".5" : "0"
                      })`}
                      data-h2-padding="b(tb, 1)"
                      data-h2-border={`${
                        index + 1 !== parentSkillCategories.length
                          ? "b(gray-2, bottom, solid, thin)"
                          : ""
                      }`}
                      data-h2-margin="b(tb, 0)"
                    >
                      <Accordion triggerPos="left">
                        <Accordion.Btn
                          buttonStyling=""
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
                              expandedAccordions.includes(key)
                                ? expandedAccordions.filter(
                                    (accordionKey) => accordionKey !== key,
                                  )
                                : [...expandedAccordions, key],
                            )
                          }
                        >
                          <p data-h2-font-weight="b(700)">{name[locale]}</p>
                        </Accordion.Btn>
                        <p
                          data-h2-padding="b(top, .25) b(bottom, 1) b(right, .5)"
                          data-h2-font-color="b(black)"
                          data-h2-font-size="b(small)"
                          style={{ paddingLeft: "5rem" }}
                        >
                          {description[locale]}
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
                                      data-h2-dialog-actions
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
                                              title: `${
                                                childSkillCatergory.name[locale]
                                              } ${intl.formatMessage(
                                                messages.skills,
                                              )}`,
                                              description:
                                                childSkillCatergory.description[
                                                  locale
                                                ],
                                            });
                                            setSkillsResults(
                                              childSkillCatergory.skills,
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
                                            {childSkillCatergory.name[locale]}
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
                                          {childSkillCatergory.skills.length}
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
                },
              )}
            </ul>
          </div>
          {/* Skill Results Section */}
          <div
            data-h2-grid-item="s(3of5) b(1of1)"
            data-h2-border="s(gray-2, left, solid, thin) b(gray-2, top, solid, thin)"
          >
            {firstVisit ? (
              <div
                data-h2-padding="b(tb, 5) b(right, 3) b(left, 4)"
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
              <div>
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
                          data-h2-grid="b(middle, contained, padded, 0)"
                        >
                          <Accordion data-h2-grid-item="b(3of4)">
                            <Accordion.Btn>
                              <p
                                data-h2-font-weight="b(700)"
                                data-h2-font-style="b(underline)"
                              >
                                {name[locale]}
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
                              <p data-h2-focus>{description[locale]}</p>
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
              onClick={() => {
                setSkillsResults([]);
              }}
            >
              <p>{intl.formatMessage(messages.cancelButton)}</p>
            </Dialog.ActionBtn>
          </div>
          <div data-h2-align="b(right)" data-h2-grid-item="b(1of2)">
            <Dialog.ActionBtn
              buttonStyling="theme-1, round, solid"
              data-h2-padding="b(rl, 2) b(tb, .5)"
              onClick={() => handleSubmit(newSkills)}
              disabled={newSkills.length === 0}
            >
              <p>{intl.formatMessage(messages.saveButton)}</p>
            </Dialog.ActionBtn>
          </div>
        </Dialog.Actions>
      </Dialog>
      <Dialog.Overlay />
    </section>
  );
};

export default FindSkillsModal;

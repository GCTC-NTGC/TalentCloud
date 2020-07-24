import React, { ReactElement, useState } from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { Locales } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";

export interface ExperienceSkill {
  id: number;
  name: string;
  claim: string;
}

export const titleBarDateRange = (
  startDate: Date,
  endDate: Date | null,
  isActive: boolean,
  locale: Locales,
): React.ReactElement => (
  <p data-c-margin="top(quarter)" data-c-colour="c1" data-c-font-size="small">
    {isActive || endDate === null ? (
      <FormattedMessage
        id="experiencePersonalAccordion.startDateToCurrent"
        defaultMessage="{startDate} - Current"
        description="Shows the date range for the title bar (assuming activity is ongoing)."
        values={{
          startDate: readableDate(locale, startDate),
        }}
      />
    ) : (
      <FormattedMessage
        id="experiencePersonalAccordion.startDateToEndDate"
        defaultMessage="{startDate} - {endDate}"
        description="Shows the date range for the title bar (assuming activity has an end date)."
        values={{
          startDate: readableDate(locale, startDate),
          endDate: readableDate(locale, endDate),
        }}
      />
    )}
  </p>
);

export const baseExperienceMessages = defineMessages({
  notApplicable: {
    id: "baseExperienceAccordion.notApplicable",
    defaultMessage: "N/A",
    description: "Used for any un-set fields in experience accordions.",
  },
  experienceTypeLabel: {
    id: "baseExperienceAccordion.experienceTypeLabel",
    defaultMessage: "Type of Experience:",
  },
  startDateLabel: {
    id: "baseExperienceAccordion.startDateLabel",
    defaultMessage: "Start Date:",
  },
  endDateLabel: {
    id: "baseExperienceAccordion.endDateLabel",
    defaultMessage: "End Date:",
  },
  ongoing: {
    id: "baseExperienceAccordion.ongoing",
    defaultMessage: "Ongoing",
  },
});

interface BaseExperienceAccordionProps {
  iconClass: string;
  title: ReactElement | string;
  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  details: ReactElement;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const BaseExperienceAccordion: React.FC<BaseExperienceAccordionProps> = ({
  iconClass,
  title,
  relevantSkills,
  irrelevantSkillCount,
  isEducationJustification,
  details,
  showSkillDetails,
  showButtons,
  handleDelete,
  handleEdit,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const relevantSkillCount = relevantSkills.length;
  return (
    <div
      data-c-accordion=""
      data-c-background="white(100)"
      data-c-card=""
      data-c-margin="bottom(.5)"
      className={`${isExpanded && "active"}`}
    >
      <button
        tabIndex={0}
        aria-expanded={isExpanded}
        data-c-accordion-trigger=""
        type="button"
        onClick={(): void => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div data-c-grid="">
          <div data-c-grid-item="base(1of4) tl(1of6) equal-col">
            <div className="experience-type-indicator">
              <i
                className={`fas ${iconClass}`}
                data-c-color="c1"
                data-c-font-size="h4"
              />
            </div>
          </div>
          <div data-c-grid-item="base(3of4) tl(5of6)">
            <div data-c-padding="all(1)">
              <div data-c-grid="middle">
                <div data-c-grid-item="tl(3of4)">{title}</div>
                <div data-c-grid-item="tl(1of4)" data-c-align="base(left)">
                  <FormattedMessage
                    id="baseExperienceAccordion.skillCount"
                    defaultMessage="{skillCount, plural, =0 {No related skills} one {# related skill} other {# related skills}} {isEducationJustification, select, true {/ Education Requirement} false {}}"
                    description="Displays the number of required skills this relates to, and whether it's used to meed education requirements."
                    values={{
                      skillCount: relevantSkillCount,
                      isEducationJustification,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span data-c-visibility="invisible">
          <FormattedMessage
            id="baseExperienceAccordion.clickToView"
            defaultMessage="Click to view."
            description="Instructions for interacting with accordion, for accessibility devices."
          />
        </span>
        <i
          aria-hidden="true"
          className="fas fa-angle-down"
          data-c-accordion-add=""
          data-c-colour="black"
        />
        <i
          aria-hidden="true"
          className="fas fa-angle-up"
          data-c-accordion-remove=""
          data-c-colour="black"
        />
      </button>
      <div
        aria-hidden="true"
        data-c-accordion-content=""
        data-c-background="gray(10)"
        data-c-padding="bottom(2)"
      >
        <hr data-c-hr="thin(gray)" data-c-margin="bottom(2)" />
        <div data-c-padding="lr(2)">
          <div data-c-grid="gutter(all, 1)">
            <div data-c-grid-item="base(1of1)">
              <div data-c-grid="gutter(all, 1)">
                <div data-c-grid-item="base(1of1)">
                  <h4 data-c-color="c2" data-c-font-weight="bold">
                    <FormattedMessage
                      id="baseExperienceAccordion.detailsTitle"
                      defaultMessage="Details of this Experience"
                      description="Subtitle of the details section."
                    />
                  </h4>
                </div>
                {details}
              </div>
            </div>
            <div data-c-grid-item="base(1of1)">
              <h4
                data-c-color="c2"
                data-c-font-weight="bold"
                data-c-margin="top(1) bottom(.5)"
              >
                <FormattedMessage
                  id="baseExperienceAccordion.skillsTitle"
                  defaultMessage="Skills for this Job"
                  description="Subtitle of the skills section."
                />
              </h4>
              <div data-c-grid="gutter(all, 1)">
                {showSkillDetails ? (
                  relevantSkills.map((skill) => (
                    <div key={skill.id} data-c-grid-item="base(1of1)">
                      <p>
                        <span
                          data-c-tag="c1"
                          data-c-radius="pill"
                          data-c-font-size="small"
                        >
                          {skill.name}
                        </span>
                      </p>
                      <p data-c-font-style="italic" data-c-margin="top(.5)">
                        {skill.claim}
                      </p>
                    </div>
                  ))
                ) : (
                  <div data-c-grid-item="base(1of1)">
                    {relevantSkills.map((skill) => (
                      <span
                        key={skill.id}
                        data-c-tag="c1"
                        data-c-radius="pill"
                        data-c-font-size="small"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
                {irrelevantSkillCount > 0 && (
                  <div data-c-grid-item="base(1of1)">
                    <p
                      data-c-font-size="small"
                      data-c-color="gray"
                      data-c-margin="bottom(1)"
                    >
                      <FormattedMessage
                        id="baseExperienceAccordion.irrelevantSkillCount"
                        defaultMessage="There {skillCount, plural, one {is <b>#</b> other unrelated skill} other {are <b>#</b> other unrelated skills}} attached to this experience. You can see {skillCount, plural, one {it} other {them}} on your profile."
                        description="Say how many skills unrelated to this job are associated with this experience."
                        values={{
                          skillCount: irrelevantSkillCount,
                          b: (...chunks) => (
                            <span data-c-font-weight="bold">{chunks}</span>
                          ),
                        }}
                      />
                    </p>
                  </div>
                )}
                {irrelevantSkillCount === 0 && relevantSkillCount === 0 && (
                  <div data-c-grid-item="base(1of1)">
                    <p data-c-color="gray" data-c-margin="bottom(1)">
                      <FormattedMessage
                        id="baseExperienceAccordion.noSkills"
                        defaultMessage="You don't have any skills attached to this experience."
                        description="Message to show if experience has no associated skills at all."
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
            {isEducationJustification && (
              <div data-c-grid-item="base(1of1)">
                <h4
                  data-c-color="c2"
                  data-c-font-weight="bold"
                  data-c-margin="bottom(.5)"
                >
                  <i
                    className="fas fa-check-circle"
                    data-c-margin="right(.25)"
                    data-c-color="go"
                  />
                  <FormattedMessage
                    id="baseExperienceAccordion.educationRequirement"
                    defaultMessage="Education Requirement"
                  />
                </h4>
                <p data-c-margin="bottom(1)">
                  <FormattedMessage
                    id="baseExperienceAccordion.educationRequirmentDescription"
                    defaultMessage="You've selected this experience as an indicator of how you meet the education requirements for this job."
                    description="Explanation of what it means that this experience meets an education requirement."
                  />
                </p>
              </div>
            )}
          </div>
        </div>
        {showButtons && (
          <div data-c-padding="top(1) lr(2)">
            <div data-c-grid="gutter(all, 1) middle">
              <div
                data-c-grid-item="tp(1of2)"
                data-c-align="base(center) tp(left)"
              >
                <button
                  data-c-button="outline(c1)"
                  data-c-radius="rounded"
                  type="button"
                  onClick={handleDelete}
                >
                  <FormattedMessage
                    id="baseExperienceAccordion.deleteButton"
                    defaultMessage="Delete Experience"
                  />
                </button>
              </div>
              <div
                data-c-grid-item="tp(1of2)"
                data-c-align="base(center) tp(right)"
              >
                <button
                  data-c-button="solid(c1)"
                  data-c-radius="rounded"
                  type="button"
                  onClick={handleEdit}
                >
                  <FormattedMessage
                    id="baseExperienceAccordion.editButton"
                    defaultMessage="Edit Experience"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

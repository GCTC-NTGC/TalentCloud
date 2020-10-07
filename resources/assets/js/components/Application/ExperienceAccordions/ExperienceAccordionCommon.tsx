import React, { ReactElement, ReactNode, useState } from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import {
  Locales,
  getLocale,
  localizeFieldNonNull,
} from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceSkill, Skill } from "../../../models/types";
import { hasKey } from "../../../helpers/queries";

export const titleBarDateRange = (
  startDate: Date,
  endDate: Date | null,
  isActive: boolean,
  intl: IntlShape,
  locale: Locales,
): React.ReactElement => {
  let dateRange;

  if (isActive || endDate === null) {
    dateRange = intl.formatMessage(accordionMessages.dateRangeCurrent, {
      startDate: readableDate(locale, startDate),
    });
  } else {
    dateRange = intl.formatMessage(accordionMessages.dateRange, {
      startDate: readableDate(locale, startDate),
      endDate: readableDate(locale, endDate),
    });
  }

  return (
    <p data-c-margin="top(quarter)" data-c-colour="c1" data-c-font-size="small">
      {dateRange}
    </p>
  );
};

interface ExperienceAccordionSkillsProps {
  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  skillsById: { [id: number]: Skill };
  showSkillDetails: boolean;
  handleEditSkill?: (experienceSkillId: number) => void;
}

export const ExperienceAccordionSkills: React.FC<ExperienceAccordionSkillsProps> = ({
  relevantSkills,
  irrelevantSkillCount,
  skillsById,
  showSkillDetails,
  handleEditSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const relevantSkillCount = relevantSkills.length;

  const renderDetailedSkill = (
    experienceSkill: ExperienceSkill,
  ): React.ReactElement | null => {
    const skill = hasKey(skillsById, experienceSkill.skill_id)
      ? skillsById[experienceSkill.skill_id]
      : null;
    if (skill === null) {
      return null;
    }
    return (
      <div key={skill.id} data-c-grid-item="base(1of1)">
        <p>
          <span data-c-tag="c1" data-c-radius="pill" data-c-font-size="small">
            {localizeFieldNonNull(locale, skill, "name")}
          </span>
        </p>
        <p data-c-font-style="italic" data-c-margin="top(.5)">
          {experienceSkill.justification}
        </p>
        {handleEditSkill && (
          <div data-c-margin="top(1)" data-c-alignment="base(centre) pl(right)">
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              type="button"
              onClick={(): void => handleEditSkill(experienceSkill.id)}
            >
              <FormattedMessage
                id="application.experienceAccordion.editExperienceSkill"
                defaultMessage="Edit Skill"
              />
            </button>
          </div>
        )}
      </div>
    );
  };
  const renderSimpleSkill = (
    experienceSkill: ExperienceSkill,
  ): React.ReactElement | null => {
    const skill = hasKey(skillsById, experienceSkill.skill_id)
      ? skillsById[experienceSkill.skill_id]
      : null;
    if (skill === null) {
      return null;
    }
    return (
      <span
        key={skill.id}
        data-c-tag="c1"
        data-c-radius="pill"
        data-c-font-size="small"
        data-c-margin="lr(.5)"
      >
        {localizeFieldNonNull(locale, skill, "name")}
      </span>
    );
  };

  return (
    <div data-c-grid-item="base(1of1)" data-c-margin="top(1)">
      <h4
        data-c-color="c2"
        data-c-font-weight="bold"
        data-c-margin="bottom(.5)"
      >
        <FormattedMessage
          id="application.experienceAccordion.skillsTitle"
          defaultMessage="Skills for this Job"
          description="Subtitle of the skills section."
        />
      </h4>
      <div data-c-grid="gutter(all, 1)">
        {showSkillDetails && relevantSkills.map(renderDetailedSkill)}
        {!showSkillDetails && (
          <div data-c-grid-item="base(1of1)">
            {relevantSkills.map(renderSimpleSkill)}
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
                id="application.experienceAccordion.irrelevantSkillCount"
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
                id="application.experienceAccordion.noSkills"
                defaultMessage="You don't have any skills attached to this experience."
                description="Message to show if experience has no associated skills at all."
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ExperienceAccordionEducation: React.FC = () => {
  return (
    <div data-c-grid-item="base(1of1)" data-c-margin="top(1)">
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
          id="application.experienceAccordion.educationRequirement"
          defaultMessage="Education Requirement"
        />
      </h4>
      <p data-c-margin="bottom(1)">
        <FormattedMessage
          id="application.experienceAccordion.educationRequirmentDescription"
          defaultMessage="You've selected this experience as an indicator of how you meet the education requirements for this job."
          description="Explanation of what it means that this experience meets an education requirement."
        />
      </p>
    </div>
  );
};

interface ExperienceAccordionButtonsProps {
  handleEdit: () => void;
  handleDelete: () => Promise<void>;
}

export const ExperienceAccordionButtons: React.FC<ExperienceAccordionButtonsProps> = ({
  handleEdit,
  handleDelete,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);
  return (
    <div data-c-padding="top(1) lr(2)">
      <div data-c-grid="gutter(all, 1) middle">
        <div data-c-grid-item="tp(1of2)" data-c-align="base(center) tp(left)">
          <button
            data-c-button="outline(c1)"
            data-c-radius="rounded"
            type="button"
            disabled={disableButtons}
            onClick={(): void => {
              setDisableButtons(true);
              handleDelete().finally(() => {
                setDisableButtons(false);
              });
            }}
          >
            <FormattedMessage
              id="application.experienceAccordion.deleteButton"
              defaultMessage="Delete Experience"
            />
          </button>
        </div>
        <div data-c-grid-item="tp(1of2)" data-c-align="base(center) tp(right)">
          <button
            data-c-button="solid(c1)"
            data-c-radius="rounded"
            type="button"
            disabled={disableButtons}
            onClick={handleEdit}
          >
            <FormattedMessage
              id="application.experienceAccordion.editButton"
              defaultMessage="Edit Experience"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

interface AccordionWrapperProps {
  title: ReactNode | string;
  subtitle: string;
  relatedSkillCount: number;
  isEducationJustification: boolean;
  iconClass: string;
}

export const ExperienceAccordionWrapper: React.FC<AccordionWrapperProps> = ({
  title,
  subtitle,
  relatedSkillCount,
  isEducationJustification,
  iconClass,
  children,
}) => {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      data-c-accordion
      data-c-background="white(100)"
      data-c-card=""
      data-c-margin="bottom(.5)"
      className={`${isExpanded && "active"}`}
    >
      <button
        tabIndex={0}
        aria-expanded={isExpanded}
        data-c-accordion-trigger
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
                <div data-c-grid-item="tl(3of4)">
                  <p>{title}</p>
                  <p
                    data-c-margin="top(quarter)"
                    data-c-colour="c1"
                    data-c-font-size="small"
                  >
                    {subtitle}
                  </p>
                </div>
                <div data-c-grid-item="tl(1of4)" data-c-align="base(left)">
                  <FormattedMessage
                    id="application.experienceAccordion.skillCount"
                    defaultMessage="{skillCount, plural, =0 {No related skills} one {# related skill} other {# related skills}} {isEducationJustification, select, true {/ Education Requirement} false {}}"
                    description="Displays the number of required skills this relates to, and whether it's used to meed education requirements."
                    values={{
                      skillCount: relatedSkillCount,
                      isEducationJustification,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <span data-c-visibility="invisible">
          {intl.formatMessage(accordionMessages.expand)}
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
        <div data-c-padding="lr(2)">{children}</div>
      </div>
    </div>
  );
};

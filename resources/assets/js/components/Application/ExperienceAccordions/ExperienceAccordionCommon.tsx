import React, { ReactNode, useRef, useState } from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import {
  Locales,
  getLocale,
  localizeFieldNonNull,
} from "../../../helpers/localize";
import { readableDateFromString } from "../../../helpers/dates";
import { DateString, ExperienceSkill, Skill } from "../../../models/types";
import { getId, hasKey, mapToObject } from "../../../helpers/queries";
import displayMessages from "../Skills/skillsMessages";

export const titleBarDateRange = (
  startDate: DateString,
  endDate: DateString | null,
  isActive: boolean,
  intl: IntlShape,
  locale: Locales,
): string => {
  if (isActive || endDate === null) {
    return intl.formatMessage(accordionMessages.dateRangeCurrent, {
      startDate: readableDateFromString(locale, startDate),
    });
  }
  return intl.formatMessage(accordionMessages.dateRange, {
    startDate: readableDateFromString(locale, startDate),
    endDate: readableDateFromString(locale, endDate),
  });
};

interface ExperienceAccordionSkillsProps {
  sectionTitle: string;
  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  skillsById: { [id: number]: Skill };
  showSkillDetails: boolean;
}

export const ExperienceAccordionSkills: React.FC<ExperienceAccordionSkillsProps> = ({
  sectionTitle,
  relevantSkills,
  irrelevantSkillCount,
  skillsById,
  showSkillDetails,
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
        {sectionTitle}
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
  handleEdit: (triggerRef: React.RefObject<HTMLButtonElement>) => void;
  handleDelete: () => Promise<void>;
}

export const ExperienceAccordionButtons: React.FC<ExperienceAccordionButtonsProps> = ({
  handleEdit,
  handleDelete,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
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
            ref={ref}
            data-c-button="solid(c1)"
            data-c-radius="rounded"
            type="button"
            disabled={disableButtons}
            onClick={() => handleEdit(ref)}
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
  id?: string;
  title: ReactNode | string;
  subtitle: string;
  relatedSkillCount: number;
  isEducationJustification: boolean;
  iconClass: string;
}

export const ExperienceAccordionWrapper: React.FC<AccordionWrapperProps> = ({
  id,
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
      className={isExpanded ? "active" : ""}
      id={id}
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

interface ApplicationExperienceAccordionProps {
  id?: string;
  title: ReactNode | string;
  subtitle: string;
  iconClass: string;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: (triggerRef: React.RefObject<HTMLButtonElement> | null) => void;
}

export const ApplicationExperienceAccordion: React.FC<ApplicationExperienceAccordionProps> = ({
  id,
  title,
  subtitle,
  iconClass,
  relevantSkills,
  skills,
  irrelevantSkillCount,
  isEducationJustification,
  showSkillDetails,
  showButtons,
  handleDelete,
  handleEdit,
  children,
}) => {
  const intl = useIntl();
  return (
    <ExperienceAccordionWrapper
      id={id}
      title={title}
      subtitle={subtitle}
      relatedSkillCount={relevantSkills.length}
      isEducationJustification={isEducationJustification}
      iconClass={iconClass}
    >
      {children}
      <ExperienceAccordionSkills
        sectionTitle={intl.formatMessage(
          displayMessages.applicationSectionTitle,
        )}
        relevantSkills={relevantSkills}
        irrelevantSkillCount={irrelevantSkillCount}
        skillsById={mapToObject(skills, getId)}
        showSkillDetails={showSkillDetails}
      />
      {isEducationJustification && <ExperienceAccordionEducation />}
      {showButtons && (
        <ExperienceAccordionButtons
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </ExperienceAccordionWrapper>
  );
};

interface ProfileExperienceAccordionProps {
  id: string;
  title: ReactNode | string;
  subtitle: string;
  iconClass: string;
  relevantSkills: ExperienceSkill[];
  skillsById: { [id: number]: Skill };
  handleDelete: () => Promise<void>;
  handleEdit: (triggerRef: React.RefObject<HTMLButtonElement>) => void;
}

export const ProfileExperienceAccordion: React.FunctionComponent<ProfileExperienceAccordionProps> = ({
  id,
  title,
  subtitle,
  iconClass,
  relevantSkills,
  skillsById,
  handleDelete,
  handleEdit,
  children,
}) => {
  const intl = useIntl();

  // We cannot display ExperienceSkills without a matching skill, so filter them out early.
  const validExperienceSkills = relevantSkills.filter((expSkill) =>
    hasKey(skillsById, expSkill.skill_id),
  );
  const relevantSkillCount = validExperienceSkills.length;

  return (
    <ExperienceAccordionWrapper
      id={id}
      title={title}
      subtitle={subtitle}
      relatedSkillCount={relevantSkillCount}
      isEducationJustification={false}
      iconClass={iconClass}
    >
      {children}
      <ExperienceAccordionButtons
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <hr data-c-hr="thin(gray)" data-c-margin="bottom(1) top(1)" />
      <ExperienceAccordionSkills
        sectionTitle={intl.formatMessage(displayMessages.profileSectionTitle)}
        relevantSkills={validExperienceSkills}
        irrelevantSkillCount={0}
        skillsById={skillsById}
        showSkillDetails
      />
    </ExperienceAccordionWrapper>
  );
};

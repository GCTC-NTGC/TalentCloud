import React from "react";
import { useIntl, IntlShape } from "react-intl";
import {
  BaseExperienceAccordion,
  titleBarDateRange,
} from "./BaseExperienceAccordion";
import { accordionMessages } from "../applicationMessages";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceSkill, Skill } from "../../../models/types";

interface ExperienceWorkAccordionProps {
  title: string;
  organization: string;
  group: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}

const experienceWorkDetails = ({
  locale,
  intl,
  title,
  organization,
  group,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  intl: IntlShape;
  title: string;
  organization: string;
  group: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      {intl.formatMessage(accordionMessages.notApplicable)}
    </p>
  );
  return (
    <>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.experienceTypeLabel)}
        </p>
        <p>
          <i
            className="fas fa-briefcase"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(accordionMessages.workType)}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.workRoleLabel)}
        </p>
        {title ? <p>{title}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.workOrganizationLabel)}
        </p>
        {organization ? <p>{organization}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.workTeamLabel)}
        </p>
        {group ? <p>{group}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.startDateLabel)}
        </p>
        {startDate ? <p>{readableDate(locale, startDate)}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.endDateLabel)}
        </p>
        {isActive && <p>{intl.formatMessage(accordionMessages.ongoing)}</p>}
        {!isActive && endDate ? (
          <p>{readableDate(locale, endDate)}</p>
        ) : (
          notApplicable
        )}
      </div>
    </>
  );
};

export const ExperienceWorkAccordion: React.FC<ExperienceWorkAccordionProps> = ({
  title,
  organization,
  group,
  startDate,
  endDate,
  isActive,
  relevantSkills,
  skills,
  irrelevantSkillCount,
  isEducationJustification,
  showSkillDetails,
  showButtons,
  handleDelete,
  handleEdit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const accordionTitle = (
    <>
      <p>
        <span data-c-font-weight="bold">{title}</span> - {organization}
      </p>
      {titleBarDateRange(startDate, endDate, isActive, intl, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-briefcase"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceWorkDetails({
        locale,
        intl,
        title,
        organization,
        group,
        startDate,
        endDate,
        isActive,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ExperienceWorkAccordion;

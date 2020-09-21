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

interface ExperienceCommunityAccordionProps {
  title: string;
  group: string;
  project: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

const experienceCommunityDetails = ({
  locale,
  intl,
  title,
  group,
  project,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  intl: IntlShape;
  title: string;
  group: string;
  project: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      {intl.formatMessage(accordionMessages.notApplicable)}
    </p>
  );
  const endDateOrNa = endDate ? (
    <p>{readableDate(locale, endDate)}</p>
  ) : (
    notApplicable
  );
  return (
    <>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.experienceTypeLabel)}
        </p>
        <p>
          <i
            className="fas fa-people-carry"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(accordionMessages.communityType)}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.communityRoleLabel)}
        </p>
        {title ? <p>{title}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.communityOrganizationLabel)}
        </p>
        {group ? <p>{group}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.communityProjectLabel)}
        </p>
        {project ? <p>{project}</p> : notApplicable}
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
        {isActive ? (
          <p>{intl.formatMessage(accordionMessages.ongoing)}</p>
        ) : (
          endDateOrNa
        )}
      </div>
    </>
  );
};

export const ExperienceCommunityAccordion: React.FC<ExperienceCommunityAccordionProps> = ({
  title,
  group,
  project,
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
        {intl.formatMessage(accordionMessages.communityHeading, {
          title,
          group,
          b: (value) => <span data-c-font-weight="bold">{value}</span>,
        })}
      </p>
      {titleBarDateRange(startDate, endDate, isActive, intl, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-people-carry"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceCommunityDetails({
        locale,
        intl,
        title,
        group,
        project,
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

export default ExperienceCommunityAccordion;

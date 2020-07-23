import React from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
  titleBarDateRange,
  baseExperienceMessages,
} from "./BaseExperienceAccordion";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";

interface ExperienceWorkAccordionProps {
  title: string;
  organization: string;
  group: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  relevantSkills: ExperienceSkill[];
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
      {intl.formatMessage(baseExperienceMessages.notApplicable)}
    </p>
  );
  return (
    <>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(baseExperienceMessages.experienceTypeLabel)}
        </p>
        <p>
          <i
            className="fas fa-briefcase"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experienceWorkAccordion.experienceTypeTitle"
            defaultMessage="Work Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.roleLabel"
            defaultMessage="Role / Job Title:"
          />
        </p>
        {title ? <p>{title}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.organizationLabel"
            defaultMessage="Organization / Company:"
          />
        </p>
        {organization ? <p>{organization}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.teamLabel"
            defaultMessage="Team / Group:"
          />
        </p>
        {group ? <p>{group}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(baseExperienceMessages.startDateLabel)}
        </p>
        {startDate ? <p>{readableDate(locale, startDate)}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(baseExperienceMessages.endDateLabel)}
        </p>
        {isActive && (
          <p>{intl.formatMessage(baseExperienceMessages.ongoing)}</p>
        )}
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
      {titleBarDateRange(startDate, endDate, isActive, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-briefcase"
      relevantSkills={relevantSkills}
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

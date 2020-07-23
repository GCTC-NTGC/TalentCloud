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

interface ExperienceCommunityAccordionProps {
  title: string;
  group: string;
  project: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
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
  endDate: Date;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      {intl.formatMessage(baseExperienceMessages.notApplicable)}
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
          {intl.formatMessage(baseExperienceMessages.experienceTypeLabel)}
        </p>
        <p>
          <i
            className="fas fa-people-carry"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experienceCommunityAccordion.experienceTypeTitle"
            defaultMessage="Community Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.roleLabel"
            defaultMessage="Role / Job Title:"
          />
          {title ? <p>{title}</p> : notApplicable}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.organizationLabel"
            defaultMessage="Group / Organization / Community:"
          />
        </p>
        {group ? <p>{group}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.projectLabel"
            defaultMessage="Project / Product:"
          />
        </p>
        {project ? <p>{project}</p> : notApplicable}
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
        {isActive ? (
          <p>{intl.formatMessage(baseExperienceMessages.ongoing)}</p>
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
        <FormattedMessage
          id="experienceCommunityAccordion.title"
          defaultMessage="<b>{title}</b> - {group}"
          description="Title of Community Experience accordion (this is the visible text when accordion is closed)."
          values={{
            title,
            group,
            b: (value) => <span data-c-font-weight="bold">{value}</span>,
          }}
        />
      </p>
      {titleBarDateRange(startDate, endDate, isActive, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-people-carry"
      relevantSkills={relevantSkills}
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

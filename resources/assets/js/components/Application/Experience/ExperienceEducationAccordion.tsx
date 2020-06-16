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

interface ExperienceEducationAccordionProps {
  educationType: string;
  areaOfStudy: string;
  institution: string;
  status: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  thesisTitle: string | null;
  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}

const experienceEducationDetails = ({
  locale,
  intl,
  educationType,
  areaOfStudy,
  institution,
  status,
  startDate,
  endDate,
  isActive,
  thesisTitle,
}: {
  locale: Locales;
  intl: IntlShape;
  educationType: string;
  areaOfStudy: string;
  institution: string;
  status: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  thesisTitle: string | null;
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
            className="fas fa-book"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experienceEducationAccordion.experienceTypeTitle"
            defaultMessage="Education Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.educationTypeLabel"
            defaultMessage="Type of Education:"
          />
        </p>
        {educationType ? <p>{educationType}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.areaOfStudyLabel"
            defaultMessage="Area of Study:"
          />
        </p>
        {areaOfStudy ? <p>{areaOfStudy}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.institutionLabel"
            defaultMessage="Institution:"
          />
        </p>
        {institution ? <p>{institution}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.statusLabel"
            defaultMessage="Status:"
          />
        </p>
        {status ? <p>{status}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.startDate"
            defaultMessage="Start Date:"
          />
        </p>
        {startDate ? (
          <p>{readableDate(locale, startDate)}</p>
        ) : (
          { notApplicable }
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.endDate"
            defaultMessage="End Date:"
          />
        </p>
        {isActive ? (
          <p>{intl.formatMessage(baseExperienceMessages.ongoing)}</p>
        ) : (
          endDateOrNa
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceEducationAccordion.thesisLabel"
            defaultMessage="Thesis Title:"
          />
        </p>
        {thesisTitle ? <p>{thesisTitle}</p> : notApplicable}
      </div>
    </>
  );
};

export const ExperienceEducationAccordion: React.FC<ExperienceEducationAccordionProps> = ({
  educationType,
  areaOfStudy,
  institution,
  status,
  startDate,
  endDate,
  isActive,
  thesisTitle,
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
          id="experienceEducationAccordion.title"
          defaultMessage="<b>{educationType} in {areaOfStudy}</b> - {institution}"
          description="Title of education accordion (this is the visible text when accordion is closed)."
          values={{
            educationType,
            areaOfStudy,
            institution,
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
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceEducationDetails({
        locale,
        intl,
        educationType,
        areaOfStudy,
        institution,
        status,
        startDate,
        endDate,
        isActive,
        thesisTitle,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ExperienceEducationAccordion;

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
  skills: Skill[];
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
            className="fas fa-book"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(accordionMessages.educationType)}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.educationTypeLabel)}
        </p>
        {educationType ? <p>{educationType}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.educationAreaOfStudyLabel)}
        </p>
        {areaOfStudy ? <p>{areaOfStudy}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.educationInstitutionLabel)}
        </p>
        {institution ? <p>{institution}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.educationStatusLabel)}
        </p>
        {status ? <p>{status}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.startDateLabel)}
        </p>
        {startDate ? (
          <p>{readableDate(locale, startDate)}</p>
        ) : (
          { notApplicable }
        )}
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
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.educationThesisLabel)}
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
        {intl.formatMessage(accordionMessages.educationHeading, {
          educationType,
          areaOfStudy,
          institution,
          b: (value) => <span data-c-font-weight="bold">{value}</span>,
        })}
      </p>
      {titleBarDateRange(startDate, endDate, isActive, intl, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      skills={skills}
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

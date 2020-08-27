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

interface ExperiencePersonalAccordionProps {
  title: string;
  description: string;
  isShareable: boolean;
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

const experiencePersonalDetails = ({
  locale,
  intl,
  title,
  description,
  isShareable,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  intl: IntlShape;
  title: string;
  description: string;
  isShareable: boolean;
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
            className="fas fa-trophy"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(accordionMessages.personalType)}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.personalTitleLabel)}
        </p>
        {title ? <p>{title}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of1)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.personalDescriptionLabel)}
        </p>
        {description ? <p>{description}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.personalShareLabel)}
        </p>
        {isShareable ? (
          <p>
            <i
              className="fas fa-check-circle"
              data-c-color="go"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(accordionMessages.personalShareAllowed)}
          </p>
        ) : (
          <p>
            <i
              className="fas fa-check-circle"
              data-c-color="stop"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(accordionMessages.personalShareDenied)}
          </p>
        )}
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

export const ExperiencePersonalAccordion: React.FC<ExperiencePersonalAccordionProps> = ({
  title,
  description,
  isShareable,
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
        <span data-c-font-weight="bold">{title}</span>
      </p>
      {titleBarDateRange(startDate, endDate, isActive, intl, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-mountain"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experiencePersonalDetails({
        locale,
        intl,
        title,
        description,
        isShareable,
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

export default ExperiencePersonalAccordion;

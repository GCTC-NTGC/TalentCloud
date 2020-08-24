import React from "react";
import { useIntl, IntlShape } from "react-intl";
import { BaseExperienceAccordion } from "./BaseExperienceAccordion";
import { accordionMessages } from "../applicationMessages";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceSkill, Skill } from "../../../models/types";

interface ExperienceAwardAccordionProps {
  title: string;
  recipient: string;
  issuer: string;
  scope: string;
  awardedDate: Date;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}

const experienceAwardDetails = ({
  locale,
  intl,
  title,
  recipient,
  issuer,
  scope,
  awardedDate,
}: {
  locale: Locales;
  intl: IntlShape;
  title: string;
  recipient: string;
  issuer: string;
  scope: string;
  awardedDate: Date;
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
            className="fas fa-trophy"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(accordionMessages.awardType)}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.awardTitleLabel)}
        </p>
        {title ? <p>{title}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.awardRecipientLabel)}
        </p>
        {recipient ? <p>{recipient}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.awardIssuerLabel)}
        </p>
        {issuer ? <p>{issuer}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.awardScopeLabel)}
        </p>
        {scope ? <p>{scope}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          {intl.formatMessage(accordionMessages.awardDateLabel)}
        </p>
        {awardedDate ? (
          <p>{readableDate(locale, awardedDate)}</p>
        ) : (
          notApplicable
        )}
      </div>
    </>
  );
};

export const ExperienceAwardAccordion: React.FC<ExperienceAwardAccordionProps> = ({
  title,
  recipient,
  issuer,
  scope,
  awardedDate,
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
        {intl.formatMessage(accordionMessages.awardHeading, {
          title,
          institution: issuer,
          b: (value) => <span data-c-font-weight="bold">{value}</span>,
        })}
      </p>
      <p
        data-c-margin="top(quarter)"
        data-c-colour="c1"
        data-c-font-size="small"
      >
        {intl.formatMessage(accordionMessages.awardSubheading, {
          date: readableDate(locale, awardedDate),
        })}
      </p>
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-trophy"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceAwardDetails({
        locale,
        intl,
        title,
        recipient,
        issuer,
        scope,
        awardedDate,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ExperienceAwardAccordion;

import React from "react";
import { FormattedMessage, useIntl, IntlShape } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
  baseExperienceMessages,
} from "./BaseExperienceAccordion";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { Link } from "../../../models/app";

interface ExperienceAwardAccordionProps {
  title: string;
  recipient: string;
  issuer: string;
  scope: string;
  awardedDate: Date;
  awardLink: Link;
  relevantSkills: ExperienceSkill[];
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
  awardLink,
}: {
  locale: Locales;
  intl: IntlShape;
  title: string;
  recipient: string;
  issuer: string;
  scope: string;
  awardedDate: Date;
  awardLink: Link;
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
            className="fas fa-trophy"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experienceAwardAccordion.experienceTypeTitle"
            defaultMessage="Award Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.awardTitleLabel"
            defaultMessage="Award Title:"
          />
          {title ? <p>{title}</p> : notApplicable}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.recipientLabel"
            defaultMessage="Awarded to:"
          />
        </p>
        {recipient ? <p>{recipient}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.issuerLabel"
            defaultMessage="Issuing Organization / Institution:"
          />
        </p>
        {issuer ? <p>{issuer}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.scopeLabel"
            defaultMessage="Award Eligibility / Scope:"
          />
        </p>
        {scope ? <p>{scope}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.awardedDateLabel"
            defaultMessage="Date Awarded:"
          />
        </p>
        {awardedDate ? (
          <p>{readableDate(locale, awardedDate)}</p>
        ) : (
          notApplicable
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceAwardAccordion.linkLabel"
            defaultMessage="Link to award Date:"
          />
        </p>
        {awardLink && awardLink.url ? (
          <p>
            <a
              href={awardLink.url}
              title={awardLink.title}
              target="_blank"
              rel="noreferrer"
            >
              {awardLink.text}
            </a>
          </p>
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
  awardLink,
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
          id="experienceAwardAccordion.title"
          defaultMessage="<b>{title}</b> - {institution}"
          description="Title of Award Experience accordion (this is the visible text when accordion is closed)."
          values={{
            title,
            institution: issuer,
            b: (value) => <span data-c-font-weight="bold">{value}</span>,
          }}
        />
      </p>
      <p
        data-c-margin="top(quarter)"
        data-c-colour="c1"
        data-c-font-size="small"
      >
        <FormattedMessage
          id="experienceAwardAccordion.titleDate"
          defaultMessage="Awarded on: {date}"
          description="Shows the awarded date in the accordion title bar."
          values={{
            date: readableDate(locale, awardedDate),
          }}
        />
      </p>
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-trophy"
      relevantSkills={relevantSkills}
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
        awardLink,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ExperienceAwardAccordion;

import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
  titleBarDateRange,
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
  title,
  organization,
  group,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  title: string;
  organization: string;
  group: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <FormattedMessage
      id="experienceWorkAccordion.notApplicable"
      defaultMessage="N/A"
    />
  );
  return (
    <>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.experienceTypeLabel"
            defaultMessage="Type of Experience:"
          />
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
        {title ? <p>{title}</p> : <p data-c-color="gray">{notApplicable}</p>}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.organizationLabel"
            defaultMessage="Organization / Company:"
          />
        </p>
        {organization ? (
          <p>{organization}</p>
        ) : (
          <p data-c-color="gray">{notApplicable}</p>
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.teamLabel"
            defaultMessage="Team / Group:"
          />
        </p>
        {group ? <p>{group}</p> : <p data-c-color="gray">{notApplicable}</p>}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.startDateLabel"
            defaultMessage="Start Date:"
          />
        </p>
        {startDate ? (
          <p>{readableDate(locale, startDate)}</p>
        ) : (
          <p data-c-color="gray">{notApplicable}</p>
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.endDateLabel"
            defaultMessage="End Date:"
          />
        </p>
        {isActive && (
          <p>
            <FormattedMessage
              id="experienceWorkAccodrion.ongoing"
              defaultMessage="Ongoing"
            />
          </p>
        )}
        {!isActive && endDate ? (
          <p>{readableDate(locale, endDate)}</p>
        ) : (
          <p data-c-color="gray">{notApplicable}</p>
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

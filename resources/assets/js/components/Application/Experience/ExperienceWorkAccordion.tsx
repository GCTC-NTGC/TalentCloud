import React from "react";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
} from "./BaseExperienceAccordion";
import { FormattedMessage, useIntl } from "react-intl";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";

interface ExperienceWorkAccordionProps {
  role: string;
  company: string;
  team: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;

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
  role,
  company,
  team,
  startDate,
  endDate,
  isCurrent,
}: {
  locale: Locales;
  role: string;
  company: string;
  team: string;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
}) => {
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
          ></i>
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
        {role ? <p>{role}</p> : <p data-c-color="gray">{notApplicable}</p>}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceWorkAccordion.organizationLabel"
            defaultMessage="Organization / Company:"
          />
        </p>
        {company ? (
          <p>{company}</p>
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
        {team ? <p>{team}</p> : <p data-c-color="gray">{notApplicable}</p>}
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
        {isCurrent ? (
          <p>
            <FormattedMessage
              id="experienceWorkAccodrion.ongoing"
              defaultMessage="Ongoing"
            />
          </p>
        ) : endDate ? (
          <p>{readableDate(locale, endDate)}</p>
        ) : (
          <p data-c-color="gray">{notApplicable}</p>
        )}
      </div>
    </>
  );
};

export const ExperienceWorkAccordion: React.FC<ExperienceWorkAccordionProps> = ({
  role,
  company,
  team,
  startDate,
  endDate,
  isCurrent,
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
  const title = (
    <p>
      <span data-c-font-weight="bold">{{ role }}</span> - {{ company }}
    </p>
  );
  return (
    <BaseExperienceAccordion
      title={title}
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceWorkDetails({
        locale,
        role,
        company,
        team,
        startDate,
        endDate,
        isCurrent,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

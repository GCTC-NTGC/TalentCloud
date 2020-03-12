import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
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
  title,
  group,
  project,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  title: string;
  group: string;
  project: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      <FormattedMessage
        id="experienceCommunityAccordion.notApplicable"
        defaultMessage="N/A"
      />
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
          <FormattedMessage
            id="experienceCommunityAccordion.experienceTypeLabel"
            defaultMessage="Type of Experience:"
          />
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
          <FormattedMessage
            id="experienceCommunityAccordion.statusLabel"
            defaultMessage="Status:"
          />
        </p>
        {status ? <p>{status}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.startDate"
            defaultMessage="Start Date:"
          />
        </p>
        {startDate ? <p>{readableDate(locale, startDate)}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.endDate"
            defaultMessage="End Date:"
          />
        </p>
        {isActive ? (
          <p>
            <FormattedMessage
              id="experienceCommunityAccordion.ongoing"
              defaultMessage="Ongoing"
            />
          </p>
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
    <p>
      <FormattedMessage
        id="experienceCommunityAccordion.title"
        defaultMessage="<b>{title}</b> - {group}"
        description="Title of Community Experience accordion (this is the visible text when accordion is closed)."
        values={{
          title,
          group,
          b: value => <span data-c-font-weight="bold">{value}</span>,
        }}
      />
    </p>
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

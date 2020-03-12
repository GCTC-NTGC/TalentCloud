import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
} from "./BaseExperienceAccordion";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";

interface ExperienceCommunityAccordionProps {
  role: string;
  group: string;
  institution: string;
  status: string;
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
  educationType,
  areaOfStudy,
  institution,
  status,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  educationType: string;
  areaOfStudy: string;
  institution: string;
  status: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      <FormattedMessage
        id="experienceWorkAccordion.notApplicable"
        defaultMessage="N/A"
      />
    </p>
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
            className="fas fa-briefcase"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experienceCommunityAccordion.experienceTypeTitle"
            defaultMessage="Education Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.educationTypeLabel"
            defaultMessage="Type of Education:"
          />
          {educationType ? <p>{educationType}</p> : { notApplicable }}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.areaOfStudyLabel"
            defaultMessage="Area of Study:"
          />
        </p>
        {areaOfStudy ? <p>{areaOfStudy}</p> : { notApplicable }}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.institutionLabel"
            defaultMessage="Institution:"
          />
        </p>
        {institution ? <p>{institution}</p> : { notApplicable }}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.statusLabel"
            defaultMessage="Status:"
          />
        </p>
        {status ? <p>{status}</p> : { notApplicable }}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.startDate"
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
            id="experienceCommunityAccordion.endDate"
            defaultMessage="End Date:"
          />
        </p>
        {isActive && (
          <p>
            <FormattedMessage
              id="experienceCommunityAccordion.ongoing"
              defaultMessage="Ongoing"
            />
          </p>
        )}
        {!isActive && endDate ? (
          <p>{readableDate(locale, endDate)}</p>
        ) : (
          { notApplicable }
        )}
      </div>
    </>
  );
};

export const ExperienceCommunityAccordion: React.FC<ExperienceCommunityAccordionProps> = ({
  role,
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
    <p>
      <FormattedMessage
        id="experienceCommunityAccordion.title"
        defaultMessage="<b>{role}</b> - {group}"
        description="Title of Community Experience accordion (this is the visible text when accordion is closed)."
        values={{
          role,
          group,
          b: value => <span data-c-font-weight="bold">{value}</span>,
        }}
      />
    </p>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experienceCommunityDetails({
        locale,
        educationType,
        areaOfStudy,
        institution,
        status,
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

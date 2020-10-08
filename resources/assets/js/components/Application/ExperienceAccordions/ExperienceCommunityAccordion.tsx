import React from "react";
import { useIntl } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import {
  ExperienceCommunity,
  ExperienceSkill,
  Skill,
} from "../../../models/types";
import { mapToObject, getId } from "../../../helpers/queries";
import {
  ExperienceAccordionWrapper,
  ExperienceAccordionSkills,
  ExperienceAccordionEducation,
  ExperienceAccordionButtons,
  titleBarDateRange,
} from "./ExperienceAccordionCommon";

const ExperienceCommunityDetails: React.FC<{
  experience: ExperienceCommunity;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const { title, group, project } = experience;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;

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
    <div data-c-grid-item="base(1of1)">
      <div data-c-grid="gutter(all, 1)">
        <div data-c-grid-item="base(1of1)">
          <h4 data-c-color="c2" data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.detailsTitle)}
          </h4>
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.experienceTypeLabel)}
          </p>
          <p>
            <i
              className="fas fa-people-carry"
              data-c-color="c1"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(accordionMessages.communityType)}
          </p>
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.communityRoleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.communityOrganizationLabel)}
          </p>
          {group ? <p>{group}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.communityProjectLabel)}
          </p>
          {project ? <p>{project}</p> : notApplicable}
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
      </div>
    </div>
  );
};

interface ExperienceCommunityAccordionProps {
  experience: ExperienceCommunity;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ExperienceCommunityAccordion: React.FC<ExperienceCommunityAccordionProps> = ({
  experience,
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
  const accordionTitle = intl.formatMessage(
    accordionMessages.communityHeading,
    {
      title: experience.title,
      group: experience.group,
      b: (value) => <span data-c-font-weight="bold">{value}</span>,
    },
  );
  const subtitle = titleBarDateRange(
    experience.start_date,
    experience.end_date,
    experience.is_active,
    intl,
    locale,
  );
  return (
    <ExperienceAccordionWrapper
      title={accordionTitle}
      subtitle={subtitle}
      relatedSkillCount={relevantSkills.length}
      isEducationJustification={isEducationJustification}
      iconClass="fa-people-carry"
    >
      <ExperienceCommunityDetails experience={experience} />
      <ExperienceAccordionSkills
        relevantSkills={relevantSkills}
        irrelevantSkillCount={irrelevantSkillCount}
        skillsById={mapToObject(skills, getId)}
        showSkillDetails={showSkillDetails}
      />
      {isEducationJustification && <ExperienceAccordionEducation />}
      {showButtons && (
        <ExperienceAccordionButtons
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </ExperienceAccordionWrapper>
  );
};

export default ExperienceCommunityAccordion;

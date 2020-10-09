import React, { FunctionComponent } from "react";
import { useIntl } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceSkill, ExperienceWork, Skill } from "../../../models/types";
import {
  ApplicationExperienceAccordion,
  titleBarDateRange,
} from "./ExperienceAccordionCommon";

const ExperienceWorkDetails: FunctionComponent<{
  experience: ExperienceWork;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const { title, organization, group } = experience;
  const startDate = experience.start_date;
  const endDate = experience.start_date;
  const isActive = experience.is_active;
  const notApplicable = (
    <p data-c-color="gray">
      {intl.formatMessage(accordionMessages.notApplicable)}
    </p>
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
              className="fas fa-briefcase"
              data-c-color="c1"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(accordionMessages.workType)}
          </p>
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.workRoleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.workOrganizationLabel)}
          </p>
          {organization ? <p>{organization}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.workTeamLabel)}
          </p>
          {group ? <p>{group}</p> : notApplicable}
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
          {isActive && <p>{intl.formatMessage(accordionMessages.ongoing)}</p>}
          {!isActive && endDate ? (
            <p>{readableDate(locale, endDate)}</p>
          ) : (
            notApplicable
          )}
        </div>
      </div>
    </div>
  );
};

interface ExperienceWorkAccordionProps {
  experience: ExperienceWork;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ExperienceWorkAccordion: React.FC<ExperienceWorkAccordionProps> = ({
  experience,
  relevantSkills,
  skills,
  irrelevantSkillCount,
  showSkillDetails,
  showButtons,
  handleDelete,
  handleEdit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const accordionTitle = (
    <span>
      <span data-c-font-weight="bold">{experience.title}</span> -{" "}
      {experience.organization}
    </span>
  );
  const subtitle = titleBarDateRange(
    experience.start_date,
    experience.end_date,
    experience.is_active,
    intl,
    locale,
  );
  return (
    <ApplicationExperienceAccordion
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-briefcase"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={experience.is_education_requirement}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <ExperienceWorkDetails experience={experience} />
    </ApplicationExperienceAccordion>
  );
};

export default ExperienceWorkAccordion;

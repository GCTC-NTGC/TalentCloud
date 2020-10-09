import React, { FunctionComponent } from "react";
import { useIntl } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import {
  ExperiencePersonal,
  ExperienceSkill,
  Skill,
} from "../../../models/types";
import {
  ApplicationExperienceAccordion,
  ProfileExperienceAccordion,
  titleBarDateRange,
} from "./ExperienceAccordionCommon";

const ExperiencePersonalDetails: FunctionComponent<{
  experience: ExperiencePersonal;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const { title, description } = experience;
  const isShareable = experience.is_shareable;
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
      </div>
    </div>
  );
};

interface ProfilePersonalAccordionProps {
  experience: ExperiencePersonal;
  relevantSkills: ExperienceSkill[];
  skillsById: { [id: number]: Skill };
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
  handleEditSkill: (experieSkillId: number) => void;
}

export const ProfilePersonalAccordion: React.FC<ProfilePersonalAccordionProps> = ({
  experience,
  relevantSkills,
  skillsById,
  handleDelete,
  handleEdit,
  handleEditSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const accordionTitle = (
    <span data-c-font-weight="bold">{experience.title}</span>
  );
  const subtitle = titleBarDateRange(
    experience.start_date,
    experience.end_date,
    experience.is_active,
    intl,
    locale,
  );
  return (
    <ProfileExperienceAccordion
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-mountain"
      relevantSkills={relevantSkills}
      skillsById={skillsById}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleEditSkill={handleEditSkill}
    >
      <ExperiencePersonalDetails experience={experience} />
    </ProfileExperienceAccordion>
  );
};
interface ExperiencePersonalAccordionProps {
  experience: ExperiencePersonal;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ExperiencePersonalAccordion: React.FC<ExperiencePersonalAccordionProps> = ({
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
    <span data-c-font-weight="bold">{experience.title}</span>
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
      iconClass="fa-mountain"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={experience.is_education_requirement}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <ExperiencePersonalDetails experience={experience} />
    </ApplicationExperienceAccordion>
  );
};

export default ExperiencePersonalAccordion;

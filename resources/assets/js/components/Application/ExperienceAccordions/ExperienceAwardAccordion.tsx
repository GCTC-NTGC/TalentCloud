import React from "react";
import { useIntl } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { readableDateFromString } from "../../../helpers/dates";
import { ExperienceAward, ExperienceSkill, Skill } from "../../../models/types";
import {
  ApplicationExperienceAccordion,
  ProfileExperienceAccordion,
} from "./ExperienceAccordionCommon";

const ExperienceAwardDetails: React.FC<{
  experience: ExperienceAward;
}> = ({ experience }): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const { title } = experience;
  const recipient = localizeFieldNonNull(
    locale,
    experience,
    "award_recipient_type",
  );
  const issuer = experience.issued_by;
  const scope = localizeFieldNonNull(
    locale,
    experience,
    "award_recognition_type",
  );
  const awardedDate = experience.awarded_date;

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
            <p>{readableDateFromString(locale, awardedDate)}</p>
          ) : (
            notApplicable
          )}
        </div>
      </div>
    </div>
  );
};

interface ProfileAwardAccordionProps {
  experience: ExperienceAward;
  relevantSkills: ExperienceSkill[];
  skillsById: { [id: number]: Skill };
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ProfileAwardAccordion: React.FC<ProfileAwardAccordionProps> = ({
  experience,
  relevantSkills,
  skillsById,
  handleDelete,
  handleEdit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const accordionTitle = intl.formatMessage(accordionMessages.awardHeading, {
    title: experience.title,
    institution: experience.issued_by,
    b: (value) => <span data-c-font-weight="bold">{value}</span>,
  });
  const subtitle = intl.formatMessage(accordionMessages.awardSubheading, {
    date: readableDateFromString(locale, experience.awarded_date),
  });
  return (
    <ProfileExperienceAccordion
      id={`${experience.type}_${experience.id}`}
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-trophy"
      relevantSkills={relevantSkills}
      skillsById={skillsById}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <ExperienceAwardDetails experience={experience} />
    </ProfileExperienceAccordion>
  );
};

interface ExperienceAwardAccordionProps {
  experience: ExperienceAward;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ExperienceAwardAccordion: React.FC<ExperienceAwardAccordionProps> = ({
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

  const accordionTitle = intl.formatMessage(accordionMessages.awardHeading, {
    title: experience.title,
    institution: experience.issued_by,
    b: (value) => <span data-c-font-weight="bold">{value}</span>,
  });
  const subtitle = intl.formatMessage(accordionMessages.awardSubheading, {
    date: readableDateFromString(locale, experience.awarded_date),
  });
  return (
    <ApplicationExperienceAccordion
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-trophy"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={experience.is_education_requirement}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <ExperienceAwardDetails experience={experience} />
    </ApplicationExperienceAccordion>
  );
};

export default ExperienceAwardAccordion;

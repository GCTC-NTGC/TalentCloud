import React from "react";
import { useIntl } from "react-intl";
import { accordionMessages } from "../applicationMessages";
import {
  Locales,
  getLocale,
  localizeFieldNonNull,
} from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import {
  ExperienceEducation,
  ExperienceSkill,
  Skill,
} from "../../../models/types";
import {
  ApplicationExperienceAccordion,
  ProfileExperienceAccordion,
  titleBarDateRange,
} from "./ExperienceAccordionCommon";

const ExperienceEducationDetails: React.FC<{
  experience: ExperienceEducation;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const educationType = localizeFieldNonNull(
    locale,
    experience,
    "education_type",
  );
  const { institution } = experience;
  const status = localizeFieldNonNull(locale, experience, "education_status");
  const areaOfStudy = experience.area_of_study;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;
  const thesisTitle = experience.thesis_title;

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
              className="fas fa-book"
              data-c-color="c1"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(accordionMessages.educationType)}
          </p>
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.educationTypeLabel)}
          </p>
          {educationType ? <p>{educationType}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.educationAreaOfStudyLabel)}
          </p>
          {areaOfStudy ? <p>{areaOfStudy}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.educationInstitutionLabel)}
          </p>
          {institution ? <p>{institution}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.educationStatusLabel)}
          </p>
          {status ? <p>{status}</p> : notApplicable}
        </div>
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.startDateLabel)}
          </p>
          {startDate ? (
            <p>{readableDate(locale, startDate)}</p>
          ) : (
            { notApplicable }
          )}
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
        <div data-c-grid-item="base(1of2) tl(1of3)">
          <p data-c-font-weight="bold">
            {intl.formatMessage(accordionMessages.educationThesisLabel)}
          </p>
          {thesisTitle ? <p>{thesisTitle}</p> : notApplicable}
        </div>
      </div>
    </div>
  );
};

interface ProfileEducationAccordionProps {
  experience: ExperienceEducation;
  relevantSkills: ExperienceSkill[];
  skillsById: { [id: number]: Skill };
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
  handleEditSkill: (experienceSkillId: number) => void;
}

export const ProfileEducationAccordion: React.FC<ProfileEducationAccordionProps> = ({
  experience,
  relevantSkills,
  skillsById,
  handleDelete,
  handleEdit,
  handleEditSkill,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const educationType = localizeFieldNonNull(
    locale,
    experience,
    "education_type",
  );
  const { institution } = experience;
  const areaOfStudy = experience.area_of_study;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;

  const accordionTitle = intl.formatMessage(
    accordionMessages.educationHeading,
    {
      educationType,
      areaOfStudy,
      institution,
      b: (value) => <span data-c-font-weight="bold">{value}</span>,
    },
  );
  const subtitle = titleBarDateRange(
    startDate,
    endDate,
    isActive,
    intl,
    locale,
  );
  return (
    <ProfileExperienceAccordion
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      skillsById={skillsById}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleEditSkill={handleEditSkill}
    >
      <ExperienceEducationDetails experience={experience} />
    </ProfileExperienceAccordion>
  );
};

interface ExperienceEducationAccordionProps {
  experience: ExperienceEducation;
  relevantSkills: ExperienceSkill[];
  skills: Skill[];
  irrelevantSkillCount: number;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => Promise<void>;
  handleEdit: () => void;
}

export const ExperienceEducationAccordion: React.FC<ExperienceEducationAccordionProps> = ({
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

  const educationType = localizeFieldNonNull(
    locale,
    experience,
    "education_type",
  );
  const { institution } = experience;
  const areaOfStudy = experience.area_of_study;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;

  const accordionTitle = intl.formatMessage(
    accordionMessages.educationHeading,
    {
      educationType,
      areaOfStudy,
      institution,
      b: (value) => <span data-c-font-weight="bold">{value}</span>,
    },
  );
  const subtitle = titleBarDateRange(
    startDate,
    endDate,
    isActive,
    intl,
    locale,
  );
  return (
    <ApplicationExperienceAccordion
      title={accordionTitle}
      subtitle={subtitle}
      iconClass="fa-book"
      relevantSkills={relevantSkills}
      skills={skills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={experience.is_education_requirement}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
      <ExperienceEducationDetails experience={experience} />
    </ApplicationExperienceAccordion>
  );
};

export default ExperienceEducationAccordion;

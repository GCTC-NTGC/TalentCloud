import React, { useState } from "react";
import { useIntl, IntlShape, defineMessages } from "react-intl";
import { Experience, Skill, ExperienceSkill } from "../../../models/types";
import { accordionMessages } from "../applicationMessages";
import { getJustificationOfExperience } from "../helpers";
import { readableDate } from "../../../helpers/dates";
import {
  Locales,
  localizeFieldNonNull,
  getLocale,
} from "../../../helpers/localize";
import { titleBarDateRange } from "../ExperienceAccordions/BaseExperienceAccordion";

const skillAccordionMessages = defineMessages({
  justificationMissing: {
    id: "application.skillAccordion.justificationMissing",
    defaultMessage:
      "You haven't written an explanation of how you used this skill during this experience.",
    description:
      "Alert displayed when no justification has been added to an Experience.",
  },
});

interface ExperienceContentProps {
  intl: IntlShape;
  locale: Locales;
  experience: Experience;
  justification: string | null;
}

const ExperienceContent: React.FC<ExperienceContentProps> = ({
  intl,
  locale,
  experience,
  justification,
}) => {
  const notApplicable = (
    <p data-c-color="gray">
      {intl.formatMessage(accordionMessages.notApplicable)}
    </p>
  );

  let endDateOrNa;
  if ("end_date" in experience) {
    endDateOrNa = experience.end_date ? (
      <p>{readableDate(locale, experience.end_date)}</p>
    ) : (
      notApplicable
    );
  } else {
    endDateOrNa = notApplicable;
  }

  switch (experience.type) {
    case "experience_award":
      return (
        <>
          <p data-c-color="c2" data-c-margin="top(2)">
            {intl.formatMessage(accordionMessages.awardHeading, {
              title: experience.title,
              institution: experience.issued_by,
              b: (value) => <span data-c-font-weight="bold">{value}</span>,
            })}
          </p>
          <p
            data-c-margin="top(quarter) bottom(1)"
            data-c-colour="c1"
            data-c-font-size="small"
          >
            {intl.formatMessage(accordionMessages.awardSubheading, {
              date: readableDate(locale, experience.awarded_date),
            })}
          </p>
          {justification ? (
            <p data-c-font-style="italic" data-c-margin="bottom(1) top(1)">
              {justification}
            </p>
          ) : (
            <p
              data-c-margin="bottom(1) top(1)"
              data-c-border="all(thin, solid, stop)"
              data-c-padding="all(.5)"
              data-c-radius="rounded"
              data-c-background="stop(10)"
              data-c-color="stop"
            >
              <i
                className="fas fa-exclamation-circle"
                data-c-color="stop"
                data-c-margin="right(.25)"
              />
              {intl.formatMessage(skillAccordionMessages.justificationMissing)}
            </p>
          )}
          <div data-c-grid="gutter(all, 1)">
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
              {experience.title ? <p>{experience.title}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.awardRecipientLabel)}
              </p>
              {experience.award_recipient_type ? (
                <p>
                  {localizeFieldNonNull(
                    locale,
                    experience,
                    "award_recipient_type",
                  )}
                </p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.awardIssuerLabel)}
              </p>
              {experience.issued_by ? (
                <p>{experience.issued_by}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.awardScopeLabel)}
              </p>
              {experience.award_recipient_type ? (
                <p>
                  {localizeFieldNonNull(
                    locale,
                    experience,
                    "award_recipient_type",
                  )}
                </p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.awardDateLabel)}
              </p>
              {experience.awarded_date ? (
                <p>{readableDate(locale, experience.awarded_date)}</p>
              ) : (
                notApplicable
              )}
            </div>
          </div>
          <hr data-c-hr="thin(gray)" data-c-margin="top(2)" />
        </>
      );
    case "experience_community":
      return (
        <>
          <p data-c-color="c2" data-c-margin="top(2)">
            {intl.formatMessage(accordionMessages.communityHeading, {
              title: experience.title,
              group: experience.group,
              b: (value) => <span data-c-font-weight="bold">{value}</span>,
            })}
          </p>
          {titleBarDateRange(
            experience.start_date,
            experience.end_date,
            experience.is_active,
            intl,
            locale,
          )}
          {justification ? (
            <p data-c-font-style="italic" data-c-margin="bottom(1) top(1)">
              {justification}
            </p>
          ) : (
            <p
              data-c-margin="bottom(1) top(1)"
              data-c-border="all(thin, solid, stop)"
              data-c-padding="all(.5)"
              data-c-radius="rounded"
              data-c-background="stop(10)"
              data-c-color="stop"
            >
              <i
                className="fas fa-exclamation-circle"
                data-c-color="stop"
                data-c-margin="right(.25)"
              />
              {intl.formatMessage(skillAccordionMessages.justificationMissing)}
            </p>
          )}
          <div data-c-grid="gutter(all, 1)">
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
              {experience.title ? <p>{experience.title}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(
                  accordionMessages.communityOrganizationLabel,
                )}
              </p>
              {experience.group ? <p>{experience.group}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.communityProjectLabel)}
              </p>
              {experience.project ? <p>{experience.project}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.startDateLabel)}
              </p>
              {experience.start_date ? (
                <p>{readableDate(locale, experience.start_date)}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.endDateLabel)}
              </p>
              {experience.is_active ? (
                <p>{intl.formatMessage(accordionMessages.ongoing)}</p>
              ) : (
                endDateOrNa
              )}
            </div>
          </div>
          <hr data-c-hr="thin(gray)" data-c-margin="top(2)" />
        </>
      );
    case "experience_education":
      return (
        <>
          <p data-c-color="c2" data-c-margin="top(2)">
            {intl.formatMessage(accordionMessages.educationHeading, {
              educationType: localizeFieldNonNull(
                locale,
                experience,
                "education_type",
              ),
              areaOfStudy: experience.area_of_study,
              institution: experience.institution,
              b: (value) => <span data-c-font-weight="bold">{value}</span>,
            })}
          </p>
          {titleBarDateRange(
            experience.start_date,
            experience.end_date,
            experience.is_active,
            intl,
            locale,
          )}
          {justification ? (
            <p data-c-font-style="italic" data-c-margin="bottom(1) top(1)">
              {justification}
            </p>
          ) : (
            <p
              data-c-margin="bottom(1) top(1)"
              data-c-border="all(thin, solid, stop)"
              data-c-padding="all(.5)"
              data-c-radius="rounded"
              data-c-background="stop(10)"
              data-c-color="stop"
            >
              <i
                className="fas fa-exclamation-circle"
                data-c-color="stop"
                data-c-margin="right(.25)"
              />
              {intl.formatMessage(skillAccordionMessages.justificationMissing)}
            </p>
          )}
          <div data-c-grid="gutter(all, 1)">
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
              {experience.education_type ? (
                <p>
                  {localizeFieldNonNull(locale, experience, "education_type")}
                </p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(
                  accordionMessages.educationAreaOfStudyLabel,
                )}
              </p>
              {experience.area_of_study ? (
                <p>{experience.area_of_study}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(
                  accordionMessages.educationInstitutionLabel,
                )}
              </p>
              {experience.institution ? (
                <p>{experience.institution}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.educationStatusLabel)}
              </p>
              {experience.education_status ? (
                <p>
                  {localizeFieldNonNull(locale, experience, "education_status")}
                </p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.startDateLabel)}
              </p>
              {experience.start_date ? (
                <p>{readableDate(locale, experience.start_date)}</p>
              ) : (
                { notApplicable }
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.endDateLabel)}
              </p>
              {experience.is_active ? (
                <p>{intl.formatMessage(accordionMessages.ongoing)}</p>
              ) : (
                endDateOrNa
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.educationThesisLabel)}
              </p>
              {experience.thesis_title ? (
                <p>{experience.thesis_title}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.educationBlockcertLabel)}
              </p>
              {experience.has_blockcert ? (
                <p>
                  {intl.formatMessage(accordionMessages.educationHasBlockcert)}
                </p>
              ) : (
                notApplicable
              )}
            </div>
          </div>
          <hr data-c-hr="thin(gray)" data-c-margin="top(2)" />
        </>
      );
    case "experience_personal":
      return (
        <>
          <p data-c-color="c2" data-c-margin="top(2)">
            <span data-c-font-weight="bold">{experience.title}</span>
          </p>
          {titleBarDateRange(
            experience.start_date,
            experience.end_date,
            experience.is_active,
            intl,
            locale,
          )}
          {justification ? (
            <p data-c-font-style="italic" data-c-margin="bottom(1) top(1)">
              {justification}
            </p>
          ) : (
            <p
              data-c-margin="bottom(1) top(1)"
              data-c-border="all(thin, solid, stop)"
              data-c-padding="all(.5)"
              data-c-radius="rounded"
              data-c-background="stop(10)"
              data-c-color="stop"
            >
              <i
                className="fas fa-exclamation-circle"
                data-c-color="stop"
                data-c-margin="right(.25)"
              />
              {intl.formatMessage(skillAccordionMessages.justificationMissing)}
            </p>
          )}
          <div data-c-grid="gutter(all, 1)">
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.experienceTypeLabel)}
              </p>
              <p>
                <i
                  className="fas fa-mountain"
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
              {experience.title ? <p>{experience.title}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of1)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.personalDescriptionLabel)}
              </p>
              {experience.description ? (
                <p>{experience.description}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.personalShareLabel)}
              </p>
              {experience.is_shareable ? (
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
              {experience.start_date ? (
                <p>{readableDate(locale, experience.start_date)}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.endDateLabel)}
              </p>
              {experience.is_active ? (
                <p>{intl.formatMessage(accordionMessages.ongoing)}</p>
              ) : (
                endDateOrNa
              )}
            </div>
          </div>
          <hr data-c-hr="thin(gray)" data-c-margin="top(2)" />
        </>
      );
    case "experience_work":
      return (
        <>
          <p data-c-color="c2" data-c-margin="top(2)">
            <span data-c-font-weight="bold">{experience.title}</span> -{" "}
            {experience.organization}
          </p>
          {titleBarDateRange(
            experience.start_date,
            experience.end_date,
            experience.is_active,
            intl,
            locale,
          )}
          {justification ? (
            <p data-c-font-style="italic" data-c-margin="bottom(1) top(1)">
              {justification}
            </p>
          ) : (
            <p
              data-c-margin="bottom(1) top(1)"
              data-c-border="all(thin, solid, stop)"
              data-c-padding="all(.5)"
              data-c-radius="rounded"
              data-c-background="stop(10)"
              data-c-color="stop"
            >
              <i
                className="fas fa-exclamation-circle"
                data-c-color="stop"
                data-c-margin="right(.25)"
              />
              {intl.formatMessage(skillAccordionMessages.justificationMissing)}
            </p>
          )}
          <div data-c-grid="gutter(all, 1)">
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
              {experience.title ? <p>{experience.title}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.workOrganizationLabel)}
              </p>
              {experience.organization ? (
                <p>{experience.organization}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.workTeamLabel)}
              </p>
              {experience.group ? <p>{experience.group}</p> : notApplicable}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.startDateLabel)}
              </p>
              {experience.start_date ? (
                <p>{readableDate(locale, experience.start_date)}</p>
              ) : (
                notApplicable
              )}
            </div>
            <div data-c-grid-item="base(1of2) tl(1of3)">
              <p data-c-font-weight="bold">
                {intl.formatMessage(accordionMessages.endDateLabel)}
              </p>
              {experience.is_active && (
                <p>{intl.formatMessage(accordionMessages.ongoing)}</p>
              )}
              {!experience.is_active && experience.end_date ? (
                <p>{readableDate(locale, experience.end_date)}</p>
              ) : (
                notApplicable
              )}
            </div>
          </div>
          <hr data-c-hr="thin(gray)" data-c-margin="top(2)" />
        </>
      );
    default:
      return null;
  }
};

interface SkillAccordionProps {
  skill: Skill;
  skillLevel: string;
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
}

const SkillAccordion: React.FC<SkillAccordionProps> = ({
  skill,
  skillLevel,
  experiences,
  experienceSkills,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-c-accordion=""
      data-c-background="white(100)"
      data-c-card=""
      data-c-margin="bottom(.5)"
      className={`${isExpanded && "active"}`}
    >
      <button
        aria-expanded={isExpanded}
        data-c-accordion-trigger=""
        tabIndex={0}
        type="button"
        onClick={(): void => {
          setIsExpanded(!isExpanded);
        }}
      >
        <div data-c-grid="">
          <div data-c-grid-item="base(1of1)">
            <div data-c-padding="all(1)">
              <div data-c-grid="middle">
                <div data-c-grid-item="tl(3of4)">
                  <p data-c-font-weight="bold" data-c-margin="left(1)">
                    {localizeFieldNonNull(locale, skill, "name")}
                  </p>
                </div>
                <div data-c-grid-item="tl(1of4)" data-c-align="base(left)">
                  <span>{skillLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span data-c-visibility="invisible">
          {intl.formatMessage(accordionMessages.expand)}
        </span>
        {isExpanded ? (
          <i
            aria-hidden="true"
            className="fas fa-angle-up"
            data-c-colour="black"
            data-c-accordion-remove
          />
        ) : (
          <i
            aria-hidden="true"
            className="fas fa-angle-down"
            data-c-colour="black"
            data-c-accordion-add
          />
        )}
      </button>
      <div
        aria-hidden="true"
        data-c-accordion-content=""
        data-c-background="gray(20)"
        data-c-padding="bottom(2)"
      >
        <hr data-c-hr="thin(gray)" />
        <div data-c-padding="lr(2)">
          {experiences.map((experience) => {
            const justification = getJustificationOfExperience(
              skill,
              experience,
              experienceSkills,
            );
            return (
              <ExperienceContent
                key={`${experience.type}=${experience.id}-skill`}
                intl={intl}
                locale={locale}
                experience={experience}
                justification={justification}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillAccordion;

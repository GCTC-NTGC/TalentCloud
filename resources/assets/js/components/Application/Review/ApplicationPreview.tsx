import React, { useState } from "react";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import {
  User,
  Job,
  Criteria,
  Experience,
  Skill,
  ExperienceSkill,
  JobPosterQuestion,
  JobApplicationAnswer,
  ApplicationNormalized,
} from "../../../models/types";
import { languageRequirementDescription } from "../../../models/localizedConstants";
import {
  LanguageRequirementId,
  SkillTypeId,
} from "../../../models/lookupConstants";
import {
  basicInfoMessages,
  experienceMessages,
  fitMessages,
} from "../applicationMessages";
import defaultBasicMessages, {
  citizenshipDeclaration,
  languageRequirementLabel,
  veteranStatus,
} from "../BasicInfo/basicInfoMessages";
import ExperienceAwardAccordion from "../ExperienceAccordions/ExperienceAwardAccordion";
import ExperienceCommunityAccordion from "../ExperienceAccordions/ExperienceCommunityAccordion";
import ExperienceEducationAccordion from "../ExperienceAccordions/ExperienceEducationAccordion";
import ExperiencePersonalAccordion from "../ExperienceAccordions/ExperiencePersonalAccordion";
import ExperienceWorkAccordion from "../ExperienceAccordions/ExperienceWorkAccordion";
import SkillAccordion from "./SkillAccordion";
import {
  getLocale,
  localizeField,
  localizeFieldNonNull,
} from "../../../helpers/localize";
import { getSkillOfCriteria, getRelevantExpSkills } from "../helpers";
import { getSkillLevelName } from "../../../models/jobUtil";
import { Link } from "../../../helpers/router";
import {
  accountSettings,
  applicationBasic,
  applicationExperience,
  applicationFit,
} from "../../../helpers/routes";

const messages = defineMessages({
  edit: {
    id: "application.review.edit",
    defaultMessage: "Edit",
    description: "Link text for editing a section.",
  },
  editTitle: {
    id: "application.review.editTitle",
    defaultMessage: "Edit this section.",
    description: "Link title for editing a section.",
  },
  valueNotSet: {
    id: "application.review.valueNotSet",
    defaultMessage: "Not set",
    description: "Message displayed if a user has not yet set a given value.",
  },
  communicationEn: {
    id: "application.review.communication.english",
    defaultMessage: "I prefer to communicate in English.",
    description:
      "Text displayed when a user selects 'en' in their profile for communication preference.",
  },
  communicationFr: {
    id: "application.review.communication.french",
    defaultMessage: "I prefer to communicate in French.",
    description:
      "Text displayed when a user selects 'fr' in their profile for communication preference.",
  },
  communicationNotSet: {
    id: "application.review.communication.notSet",
    defaultMessage:
      "You haven't set a communication language preference in your profile yet.",
    description:
      "Text displayed if a user has not yet selected a communication preference in their profile.",
  },
});

const submittedApplicationHeaders = defineMessages({
  basicInfo: {
    id: "application.review.manager.basicInfoHeading",
    defaultMessage: "Basic Information",
    description:
      "Manager's heading for the Basic Info section of the Application.",
  },
  experience: {
    id: "application.review.manager.experienceHeading",
    defaultMessage: "Experience",
    description:
      "Manager's heading for the Experience section of the Application.",
  },
  fit: {
    id: "application.review.manager.fitHeading",
    defaultMessage: "Fit",
    description: "Manager's heading for the Fit section of the Application.",
  },
  accountSettings: {
    id: "application.review.manager.accountSettingsHeading",
    defaultMessage: "Account Settings",
    description:
      "Manager's heading for the Account Settings section of the Application.",
  },
});

interface ExperienceAccordionProps {
  experience: Experience;
  experienceSkills: ExperienceSkill[];
  skills: Skill[];
}

const ExperienceAccordion: React.FC<ExperienceAccordionProps> = ({
  experience,
  experienceSkills,
  skills,
}) => {
  switch (experience.type) {
    case "experience_award":
      return (
        <ExperienceAwardAccordion
          experience={experience}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={0}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_community":
      return (
        <ExperienceCommunityAccordion
          experience={experience}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={0}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_education":
      return (
        <ExperienceEducationAccordion
          experience={experience}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={0}
          showSkillDetails
          showButtons={false}
          handleDelete={async (): Promise<void> => {}}
          handleEdit={(): void => {}}
        />
      );
    case "experience_personal":
      return (
        <ExperiencePersonalAccordion
          experience={experience}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={0}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_work":
      return (
        <ExperienceWorkAccordion
          experience={experience}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={0}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    default:
      return null;
  }
};

export type ExperienceView = "experience" | "skills" | "education";

interface ApplicationPreviewProps {
  application: ApplicationNormalized;
  criteria: Criteria[];
  experiences: Experience[];
  experienceSkills: ExperienceSkill[];
  experienceViewState?: ExperienceView;
  experienceViewButtonOrder?: [ExperienceView, ExperienceView, ExperienceView];
  job: Job;
  jobQuestions: JobPosterQuestion[];
  jobApplicationAnswers: JobApplicationAnswer[];
  skills: Skill[];
  user: User;
  isSubmitted?: boolean;
}

const ApplicationPreview: React.FunctionComponent<ApplicationPreviewProps> = ({
  application,
  criteria,
  experiences,
  experienceSkills,
  experienceViewState,
  experienceViewButtonOrder,
  job,
  jobQuestions,
  jobApplicationAnswers,
  isSubmitted,
  skills,
  user,
  children,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [experienceView, setExperienceView] = useState<ExperienceView>(
    experienceViewState || "experience",
  );

  const hardCriteria = criteria
    .filter((criterion) => {
      const skill = getSkillOfCriteria(criterion, skills);
      return skill?.skill_type_id === SkillTypeId.Hard;
    })
    .sort((a, b) => {
      const skillA = getSkillOfCriteria(a, skills);
      const skillB = getSkillOfCriteria(b, skills);
      // Order by essential followed by asset.
      if (a.criteria_type_id > b.criteria_type_id) {
        return 1;
      }
      if (a.criteria_type_id < b.criteria_type_id) {
        return -1;
      }
      // Order by skill name alphabetically.
      if (skillA && skillB) {
        if (
          localizeFieldNonNull(locale, skillA, "name").toUpperCase() >
          localizeFieldNonNull(locale, skillB, "name").toUpperCase()
        ) {
          return 1;
        }
        if (
          localizeFieldNonNull(locale, skillA, "name").toUpperCase() <
          localizeFieldNonNull(locale, skillB, "name").toUpperCase()
        ) {
          return -1;
        }
      }
      return 0;
    });

  const handleViewClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const viewType: ExperienceView = e.currentTarget.getAttribute(
      "data-experience-view",
    ) as ExperienceView;
    if (viewType !== null) {
      setExperienceView(viewType);
    }
  };

  const experienceViewButtons = (
    buttonOrder = ["experience", "skills", "education"],
  ): JSX.Element => {
    const experienceButton = (
      <button
        data-c-button={`${
          experienceView === "experience" ? "solid" : "outline"
        }(c1)`}
        type="button"
        data-c-radius="rounded"
        data-c-margin="right(.5)"
        className="gtag-application-review-all-experience"
        data-experience-view="experience"
        onClick={handleViewClick}
        key="experienceButton"
      >
        <FormattedMessage
          id="application.review.experienceViewButton"
          defaultMessage="All Experience"
          description="Button text for the experience view of the Review page."
        />
      </button>
    );
    const skillsButton = (
      <button
        data-c-button={`${
          experienceView === "skills" ? "solid" : "outline"
        }(c1)`}
        type="button"
        data-c-radius="rounded"
        data-c-margin="right(.5)"
        className="gtag-application-review-skill-experience"
        data-experience-view="skills"
        onClick={handleViewClick}
        key="skillsButton"
      >
        <FormattedMessage
          id="application.review.skillsViewButton"
          defaultMessage="Skills for This Job"
          description="Button text for the skills view of the Review page."
        />
      </button>
    );
    const educationButton = (
      <button
        data-c-button={`${
          experienceView === "education" ? "solid" : "outline"
        }(c1)`}
        type="button"
        data-c-radius="rounded"
        data-c-margin="right(.5)"
        className="gtag-application-review-education-experience"
        data-experience-view="education"
        onClick={handleViewClick}
        key="educationButton"
      >
        <FormattedMessage
          id="application.review.educationViewButton"
          defaultMessage="Education Requirements for This Job"
          description="Button text for the education view of the Review page."
        />
      </button>
    );

    const buttonView = buttonOrder.map((button) => {
      switch (button) {
        case "experience":
          return experienceButton;
        case "skills":
          return skillsButton;
        case "education":
          return educationButton;
        default:
          return null;
      }
    });

    return <>{buttonView}</>;
  };

  return (
    <div data-c-container="medium">
      {!isSubmitted && (
        <>
          <h2
            data-c-heading="h2"
            data-c-margin={!isSubmitted ? "top(3) bottom(1)" : "bottom(1)"}
          >
            <FormattedMessage
              id="application.review.heading"
              defaultMessage="Review Your Application"
              description="Main page heading for the Review page."
            />
          </h2>
          <p data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.review.subheadingOne"
              defaultMessage="Take one last look at your information before you submit it."
              description="First line of the subheading for the Review page."
            />
          </p>
          <p data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.review.subheadingTwo"
              defaultMessage="Make sure everything you've said is as honest and accurate as possible."
              description="Second line of the subheading for the Review page."
            />
          </p>
          <p data-c-margin="bottom(2)">
            <FormattedMessage
              id="application.review.subheadingThree"
              defaultMessage={`Ask yourself, "If I was a manager, and I knew nothing about the applicant other than this application, would I think they could do a good job?"`}
              description="Third line of the subheading for the Review page."
            />
          </p>
        </>
      )}
      <div data-c-grid="gutter(all, 1) middle">
        <div data-c-grid-item="tp(2of3) tl(4of5)" data-c-margin="top(2)">
          <h3 data-c-font-size="h3">
            {!isSubmitted
              ? intl.formatMessage(basicInfoMessages.heading)
              : intl.formatMessage(submittedApplicationHeaders.basicInfo)}
          </h3>
        </div>
        {!isSubmitted && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <Link
              href={applicationBasic(locale, application.id)}
              title={intl.formatMessage(messages.editTitle)}
              data-c-color="c2"
              data-c-font-weight="bold"
            >
              {intl.formatMessage(messages.edit)}
            </Link>
          </div>
        )}
      </div>
      <hr data-c-hr="thin(gray)" data-c-margin="top(1)" />
      <p
        data-c-font-weight="bold"
        data-c-color="c2"
        data-c-margin="top(1) bottom(.5)"
      >
        {intl.formatMessage(basicInfoMessages.citizenshipLabel)}
      </p>
      <p>
        {application.citizenship_declaration_id
          ? intl.formatMessage(
              citizenshipDeclaration(application.citizenship_declaration_id),
            )
          : intl.formatMessage(messages.valueNotSet)}
      </p>
      <p
        data-c-font-weight="bold"
        data-c-color="c2"
        data-c-margin="top(1) bottom(.5)"
      >
        {intl.formatMessage(basicInfoMessages.veteranStatusLabel)}
      </p>
      <p>
        {application.veteran_status_id
          ? intl.formatMessage(veteranStatus(application.veteran_status_id))
          : intl.formatMessage(messages.valueNotSet)}
      </p>
      <p
        data-c-font-weight="bold"
        data-c-color="c2"
        data-c-margin="top(1) bottom(.5)"
      >
        {intl.formatMessage(basicInfoMessages.languageRequirementsHeading)}
      </p>
      <p data-c-margin="bottom(.5)">
        {job.language_requirement_id &&
          intl.formatMessage(
            languageRequirementDescription(job.language_requirement_id),
          )}
      </p>
      {job.language_requirement_id &&
        application.language_requirement_confirmed && (
          <p data-c-margin="bottom(.5)">
            <i
              className="fas fa-check"
              data-c-color="go"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(
              languageRequirementLabel(job.language_requirement_id),
            )}
          </p>
        )}
      {(job.language_requirement_id ===
        LanguageRequirementId.bilingualIntermediate ||
        job.language_requirement_id ===
          LanguageRequirementId.bilingualAdvanced) &&
        application.language_test_confirmed && (
          <p>
            <i
              className="fas fa-check"
              data-c-color="go"
              data-c-margin="right(.25)"
            />
            {intl.formatMessage(defaultBasicMessages.languageTestLabel)}
          </p>
        )}
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(2)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!isSubmitted
              ? intl.formatMessage(experienceMessages.heading)
              : intl.formatMessage(submittedApplicationHeaders.experience)}
          </h3>
        </div>
        {!isSubmitted && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <Link
              href={applicationExperience(locale, application.id)}
              title={intl.formatMessage(messages.editTitle)}
              data-c-color="c2"
              data-c-font-weight="bold"
            >
              {intl.formatMessage(messages.edit)}
            </Link>
          </div>
        )}
      </div>
      <hr data-c-hr="thin(gray)" data-c-margin="tb(1)" />
      <p data-c-padding="bottom(.5)" data-c-font-weight="bold">
        <FormattedMessage
          id="application.review.changeViewHeading"
          defaultMessage="Change Your View:"
          description="Heading for the Review section with the buttons to change the layout."
        />
      </p>
      <div data-c-padding="bottom(1)">
        {experienceViewButtons(experienceViewButtonOrder)}
      </div>
      {experienceView === "experience" && (
        <div className="experience-list">
          <p data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.review.experienceViewHeading"
              defaultMessage="This view is a summary of all the experiences you will be sending as a part of your application."
              description="Heading for the experience view section of the Review page."
            />
          </p>
          <div data-c-accordion-group="">
            {experiences.map((experience) => {
              const relevantSkills = getRelevantExpSkills(
                hardCriteria,
                experience,
                experienceSkills,
              );
              return (
                <ExperienceAccordion
                  key={`${experience.type}-${experience.id}`}
                  experience={experience}
                  experienceSkills={relevantSkills}
                  skills={skills}
                />
              );
            })}
          </div>
        </div>
      )}
      {experienceView === "skills" && (
        <div className="experience-list">
          <p data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.review.skillsViewHeading"
              defaultMessage="This view organizes your experiences by the skills required for this job."
              description="Heading for the skills view section of the Review page."
            />
          </p>
          <div data-c-accordion-group="">
            {hardCriteria.map((criterion) => {
              const skillOfCriterion = getSkillOfCriteria(criterion, skills);

              if (skillOfCriterion !== null) {
                const skillLevel = intl.formatMessage(
                  getSkillLevelName(criterion, skillOfCriterion),
                );

                const experiencesOfCriterion = experienceSkills.filter(
                  (experienceSkill) =>
                    experienceSkill.skill_id === criterion.skill_id,
                );

                const relevantExperiences = experiences.filter((experience) =>
                  experiencesOfCriterion.some(
                    (experienceSkill) =>
                      experienceSkill.experience_id === experience.id &&
                      experienceSkill.experience_type === experience.type,
                  ),
                );

                return (
                  <SkillAccordion
                    key={criterion.id}
                    skill={skillOfCriterion}
                    skillLevel={skillLevel}
                    experiences={relevantExperiences}
                    experienceSkills={experiencesOfCriterion}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
      {experienceView === "education" && (
        <div className="experience-list">
          <p data-c-margin="bottom(1)">
            <FormattedMessage
              id="application.review.educationViewHeading"
              defaultMessage="This view is a summary of all the experiences you have selected that help you meet the education requirements outlined below."
              description="Heading for the education view section of the Review page."
            />
          </p>
          <div
            data-c-background="gray(20)"
            data-c-radius="rounded"
            data-c-padding="all(1)"
            data-c-margin="bottom(1)"
          >
            <p>{localizeField(locale, job, "education")}</p>
          </div>
          <div data-c-accordion-group="">
            {experiences
              .filter((experience) => experience.is_education_requirement)
              .map((educationExperience) => {
                const relevantSkills = getRelevantExpSkills(
                  hardCriteria,
                  educationExperience,
                  experienceSkills,
                );
                return (
                  <ExperienceAccordion
                    key={`${educationExperience.type}-${educationExperience.id}-edu`}
                    experience={educationExperience}
                    experienceSkills={relevantSkills}
                    skills={skills}
                  />
                );
              })}
          </div>
        </div>
      )}
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(2)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!isSubmitted
              ? intl.formatMessage(fitMessages.heading)
              : intl.formatMessage(submittedApplicationHeaders.fit)}
          </h3>
        </div>
        {!isSubmitted && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <Link
              href={applicationFit(locale, application.id)}
              title={intl.formatMessage(messages.editTitle)}
              data-c-color="c2"
              data-c-font-weight="bold"
            >
              {intl.formatMessage(messages.edit)}
            </Link>
          </div>
        )}
      </div>
      <hr data-c-hr="thin(gray)" data-c-margin="top(1)" />
      {jobQuestions.map((jobQuestion, index) => {
        const answer = jobApplicationAnswers.find(
          (appAnswer) => appAnswer.job_poster_question_id === jobQuestion.id,
        );
        return (
          <>
            <p
              data-c-font-weight="bold"
              data-c-color="c2"
              data-c-margin="top(1) bottom(.5)"
            >
              {intl.formatMessage(fitMessages.questionLabel, {
                index: index + 1,
              })}{" "}
              {localizeField(locale, jobQuestion, "question")}
            </p>
            <p>
              {answer ? (
                answer.answer
              ) : (
                <FormattedMessage
                  id="application.review.missingAnswer"
                  defaultMessage="Not yet answered."
                  description="Message displayed if the applicant did not yet answer one of the Fit questions."
                />
              )}
            </p>
          </>
        );
      })}
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(2)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!isSubmitted ? (
              <FormattedMessage
                id="application.review.accountSettingsHeading"
                defaultMessage="My Account Settings"
              />
            ) : (
              intl.formatMessage(submittedApplicationHeaders.accountSettings)
            )}
          </h3>
        </div>
        {!isSubmitted && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <a
              href={accountSettings(locale)}
              title={intl.formatMessage(messages.editTitle)}
              data-c-color="c2"
              data-c-font-weight="bold"
            >
              {intl.formatMessage(messages.edit)}
            </a>
          </div>
        )}
      </div>
      <hr data-c-hr="thin(gray)" data-c-margin="top(1)" />
      <p
        data-c-font-weight="bold"
        data-c-color="c2"
        data-c-margin="top(1) bottom(.5)"
      >
        <FormattedMessage
          id="application.review.contactLabel"
          defaultMessage="Contact & Communication"
        />
      </p>
      {user.contact_language === "en" && (
        <p data-c-margin="bottom(.5)">
          <i
            className="fas fa-check"
            data-c-color="go"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(messages.communicationEn)}
        </p>
      )}
      {user.contact_language === "fr" && (
        <p data-c-margin="bottom(.5)">
          <i
            className="fas fa-check"
            data-c-color="go"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(messages.communicationFr)}
        </p>
      )}
      {user.contact_language !== "en" && user.contact_language !== "fr" && (
        <p data-c-margin="bottom(.5)">
          <i
            className="fas fa-times"
            data-c-color="stop"
            data-c-margin="right(.25)"
          />
          {intl.formatMessage(messages.communicationNotSet)}
        </p>
      )}
      <p data-c-margin={!isSubmitted ? "bottom(.5)" : "bottom(2)"}>
        <i
          className={`fas fa-${user.job_alerts ? "check" : "times"}`}
          data-c-color={user.job_alerts ? "go" : "stop"}
          data-c-margin={`right(.${user.job_alerts ? "25" : "5"})`}
        />
        {user.job_alerts ? (
          <FormattedMessage
            id="application.review.userContact"
            defaultMessage="I would like Talent Cloud to contact me at {email} about related jobs."
            values={{
              email: user.email,
            }}
          />
        ) : (
          <FormattedMessage
            id="application.review.userNoContact"
            defaultMessage="I do not want Talent Cloud to contact me at {email} about related jobs."
            values={{
              email: user.email,
            }}
          />
        )}
      </p>
      {children}
    </div>
  );
};

export default ApplicationPreview;

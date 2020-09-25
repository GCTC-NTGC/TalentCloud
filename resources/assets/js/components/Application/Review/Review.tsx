import React, { useState } from "react";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { Formik, Form, FastField } from "formik";
import {
  Application,
  User,
  Job,
  Criteria,
  Experience,
  Skill,
  ExperienceSkill,
  JobPosterQuestion,
  JobApplicationAnswer,
} from "../../../models/types";
import { languageRequirementDescription } from "../../../models/localizedConstants";
import { LanguageRequirementId } from "../../../models/lookupConstants";
import {
  basicInfoMessages,
  experienceMessages,
  fitMessages,
  navigationMessages,
} from "../applicationMessages";
import defaultBasicMessages, {
  citizenshipDeclaration,
  languageRequirementLabel,
  veteranStatus,
} from "../BasicInfo/basicInfoMessages";
import CheckboxInput from "../../Form/CheckboxInput";
import ExperienceAwardAccordion from "../ExperienceAccordions/ExperienceAwardAccordion";
import ExperienceCommunityAccordion from "../ExperienceAccordions/ExperienceCommunityAccordion";
import ExperienceEducationAccordion from "../ExperienceAccordions/ExperienceEducationAccordion";
import ExperiencePersonalAccordion from "../ExperienceAccordions/ExperiencePersonalAccordion";
import ExperienceWorkAccordion from "../ExperienceAccordions/ExperienceWorkAccordion";
import SkillAccordion from "./SkillAccordion";
import {
  Locales,
  localizeFieldNonNull,
  getLocale,
  localizeField,
} from "../../../helpers/localize";
import { getSkillOfCriteria, getIrrelevantSkillCount } from "../helpers";
import { getSkillLevelName } from "../../../models/jobUtil";
import { Portal } from "../../../models/app";

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
  shareCheckboxLabel: {
    id: "application.review.shareCheckboxLabel",
    defaultMessage:
      "I would like Talent Cloud to share my application with other Government of Canada managers looking for similar sets of skills.",
  },
});

const managerViewHeaders = defineMessages({
  basicInfo: {
    id: "application.review.basicInfoHeading",
    defaultMessage: "Basic Information",
    description:
      "Manager's heading for the Basic Info section of the Application.",
  },
  experience: {
    id: "application.review.experienceHeading",
    defaultMessage: "Experience",
    description:
      "Manager's heading for the Experience section of the Application.",
  },
  fit: {
    id: "application.review.fitHeading",
    defaultMessage: "Fit",
    description: "Manager's heading for the Fit section of the Application.",
  },
  accountSettings: {
    id: "application.review.accountSettingsHeading",
    defaultMessage: "Account Settings",
    description:
      "Manager's heading for the Account Settings section of the Application.",
  },
});

interface ExperienceAccordionProps {
  experience: Experience;
  experienceSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  skills: Skill[];
  locale: Locales;
}

const ExperienceAccordion: React.FC<ExperienceAccordionProps> = ({
  experience,
  experienceSkills,
  irrelevantSkillCount,
  skills,
  locale,
}) => {
  switch (experience.type) {
    case "experience_award":
      return (
        <ExperienceAwardAccordion
          title={experience.title}
          recipient={localizeFieldNonNull(
            locale,
            experience,
            "award_recipient_type",
          )}
          issuer={experience.issued_by}
          scope={localizeFieldNonNull(
            locale,
            experience,
            "award_recognition_type",
          )}
          awardedDate={experience.awarded_date}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={irrelevantSkillCount}
          isEducationJustification={experience.is_education_requirement}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_community":
      return (
        <ExperienceCommunityAccordion
          title={experience.title}
          group={experience.group}
          project={experience.project}
          startDate={experience.start_date}
          endDate={experience.end_date}
          isActive={experience.is_active}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={irrelevantSkillCount}
          isEducationJustification={experience.is_education_requirement}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_education":
      return (
        <ExperienceEducationAccordion
          educationType={localizeFieldNonNull(
            locale,
            experience,
            "education_type",
          )}
          areaOfStudy={experience.area_of_study}
          institution={experience.institution}
          status={localizeFieldNonNull(locale, experience, "education_status")}
          startDate={experience.start_date}
          endDate={experience.end_date}
          isActive={experience.is_active}
          thesisTitle={experience.thesis_title}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={irrelevantSkillCount}
          isEducationJustification={experience.is_education_requirement}
          showSkillDetails
          showButtons={false}
          handleDelete={async (): Promise<void> => {}}
          handleEdit={(): void => {}}
        />
      );
    case "experience_personal":
      return (
        <ExperiencePersonalAccordion
          title={experience.title}
          description={experience.description}
          isShareable={experience.is_shareable}
          startDate={experience.start_date}
          endDate={experience.end_date}
          isActive={experience.is_active}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={irrelevantSkillCount}
          isEducationJustification={experience.is_education_requirement}
          showSkillDetails
          showButtons={false}
          handleEdit={(): void => {}}
          handleDelete={async (): Promise<void> => {}}
        />
      );
    case "experience_work":
      return (
        <ExperienceWorkAccordion
          title={experience.title}
          organization={experience.organization}
          group={experience.group}
          startDate={experience.start_date}
          endDate={experience.end_date}
          isActive={experience.is_active}
          relevantSkills={experienceSkills}
          skills={skills}
          irrelevantSkillCount={irrelevantSkillCount}
          isEducationJustification={experience.is_education_requirement}
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

type ExperienceView = "experience" | "skills" | "education";

export interface ReviewFormValues {
  shareWithManagers: boolean;
}

interface ReviewProps {
  application: Application;
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
  managerView?: boolean;
  handleContinue: (values: ReviewFormValues) => void;
  handleReturn: () => void;
  handleQuit: () => void;
}

// TODO: Replace all of the Edit href's with proper step links.
const Review: React.FC<ReviewProps> = ({
  application,
  criteria,
  experiences,
  experienceSkills,
  experienceViewState,
  experienceViewButtonOrder,
  job,
  jobQuestions,
  jobApplicationAnswers,
  skills,
  user,
  handleContinue,
  handleReturn,
  handleQuit,
  managerView,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const [experienceView, setExperienceView] = useState<ExperienceView>(
    experienceViewState || "experience",
  );

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
  ) => {
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

    return <>{...buttonView}</>;
  };

  return (
    <div data-c-container="medium">
      <h2
        data-c-heading="h2"
        data-c-margin={!managerView ? "top(3) bottom(1)" : "bottom(1)"}
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
      <p>
        <FormattedMessage
          id="application.review.subheadingThree"
          defaultMessage={`Ask yourself, "If I was a manager, and I knew nothing about the applicant other than this application, would I think they could do a good job?"`}
          description="Third line of the subheading for the Review page."
        />
      </p>
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(3)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!managerView
              ? intl.formatMessage(basicInfoMessages.heading)
              : intl.formatMessage(managerViewHeaders.basicInfo)}
          </h3>
        </div>
        {!managerView && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <a
              href="https://talent.test/demo/application-02"
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
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(3)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!managerView
              ? intl.formatMessage(experienceMessages.heading)
              : intl.formatMessage(managerViewHeaders.experience)}
          </h3>
        </div>
        {!managerView && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <a
              href="https://talent.test/demo/application-04"
              title={intl.formatMessage(messages.editTitle)}
              data-c-color="c2"
              data-c-font-weight="bold"
            >
              {intl.formatMessage(messages.edit)}
            </a>
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
              const irrelevantSkillCount = getIrrelevantSkillCount(
                criteria,
                experience,
                experienceSkills,
              );
              const relevantSkills = experienceSkills.filter(
                (experienceSkill) =>
                  experienceSkill.experience_type === experience.type &&
                  experienceSkill.experience_id === experience.id,
              );
              console.log(experienceSkills);
              return (
                <ExperienceAccordion
                  key={`${experience.type}-${experience.id}`}
                  experience={experience}
                  experienceSkills={relevantSkills}
                  skills={skills}
                  irrelevantSkillCount={irrelevantSkillCount}
                  locale={locale}
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
            {criteria.map((criterion) => {
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
                const irrelevantSkillCount = getIrrelevantSkillCount(
                  criteria,
                  educationExperience,
                  experienceSkills,
                );
                const relevantSkills = experienceSkills.filter(
                  (experienceSkill) =>
                    experienceSkill.experience_type ===
                      educationExperience.type &&
                    experienceSkill.experience_id === educationExperience.id,
                );
                return (
                  <ExperienceAccordion
                    key={`${educationExperience.type}-${educationExperience.id}-edu`}
                    experience={educationExperience}
                    experienceSkills={relevantSkills}
                    skills={skills}
                    irrelevantSkillCount={irrelevantSkillCount}
                    locale={locale}
                  />
                );
              })}
          </div>
        </div>
      )}
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(3)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!managerView
              ? intl.formatMessage(fitMessages.heading)
              : intl.formatMessage(managerViewHeaders.fit)}
          </h3>
        </div>
        {!managerView && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <a
              href="https://talent.test/demo/application-07"
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
      <div data-c-grid="gutter(all, 1) middle" data-c-padding="top(3)">
        <div data-c-grid-item="tp(2of3) tl(4of5)">
          <h3 data-c-font-size="h3">
            {!managerView ? (
              <FormattedMessage
                id="application.review.accountSettingsHeading"
                defaultMessage="Account Settings"
              />
            ) : (
              intl.formatMessage(managerViewHeaders.accountSettings)
            )}
          </h3>
        </div>
        {!managerView && (
          <div
            data-c-grid-item="tp(1of3) tl(1of5)"
            data-c-align="base(center) tp(right)"
          >
            <a
              href="https://talent.test/demo/application-07"
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
      <p data-c-margin="bottom(.5)">
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
      {!managerView ? (
        <>
          <hr data-c-hr="thin(c1)" data-c-margin="tb(2)" />
          <div data-c-grid="gutter(all, 1)">
            <Formik
              initialValues={{ shareWithManagers: false }}
              onSubmit={(values): void => {
                // Save data to application object, then navigate to the next step.
                // TODO: This step needs to check overall Application validation status,
                // and only proceed if the entire Application is 'valid'.
                const reviewFormValues: ReviewFormValues = {
                  ...values,
                };

                handleContinue(reviewFormValues);
              }}
            >
              {({ isSubmitting }): React.ReactElement => (
                <Form>
                  <div data-c-grid-item="base(1of1)">
                    <p>
                      <FormattedMessage
                        id="application.review.shareQuestion"
                        defaultMessage="Do you give Talent Cloud permission to share your application with other Government of Canada managers who may be looking for a similar set of skills?"
                      />
                    </p>
                  </div>
                  <div data-c-grid-item="base(1of1)" data-c-margin="left(2)">
                    <FastField
                      id="shareWithManagers"
                      name="shareWithManagers"
                      component={CheckboxInput}
                      label={intl.formatMessage(messages.shareCheckboxLabel)}
                    />
                  </div>
                  <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
                  <div data-c-grid="gutter">
                    <div
                      data-c-alignment="base(centre) tp(left)"
                      data-c-grid-item="tp(1of2)"
                    >
                      <button
                        data-c-button="outline(c2)"
                        data-c-radius="rounded"
                        type="button"
                        disabled={isSubmitting}
                        onClick={(): void => {
                          // Add saveAndReturn Method here.
                          // Method should save the current data and return user to the previous step.
                          handleReturn();
                        }}
                      >
                        {intl.formatMessage(navigationMessages.return)}
                      </button>
                    </div>
                    <div
                      data-c-alignment="base(centre) tp(right)"
                      data-c-grid-item="tp(1of2)"
                    >
                      <button
                        data-c-button="outline(c2)"
                        data-c-radius="rounded"
                        type="button"
                        disabled={isSubmitting}
                        onClick={(): void => {
                          // Add saveAndQuit Method here.
                          // Method should save the current data and return user to My Applications page.
                          handleQuit();
                        }}
                      >
                        {intl.formatMessage(navigationMessages.quit)}
                      </button>
                      <button
                        data-c-button="solid(c1)"
                        data-c-radius="rounded"
                        data-c-margin="left(1)"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {intl.formatMessage(navigationMessages.continue)}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <div data-c-margin="bottom(3)" />
      )}
    </div>
  );
};

export default Review;

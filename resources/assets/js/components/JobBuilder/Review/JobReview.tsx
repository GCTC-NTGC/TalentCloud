import React, { useState, useRef } from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
  defineMessages,
  useIntl,
} from "react-intl";
import {
  JobPosterKeyTask,
  Criteria,
  Job,
  Skill,
  Department,
  Manager,
} from "../../../models/types";
import {
  jobBuilderDetails,
  jobBuilderTasks,
  jobBuilderImpact,
  jobBuilderSkills,
  managerEditProfile,
  jobBuilderEnv,
} from "../../../helpers/routes";
import {
  find,
  mapToObject,
  hasKey,
  getId,
  notEmpty,
} from "../../../helpers/queries";
import {
  provinceName,
  securityClearance,
  languageRequirement,
  languageRequirementDescription,
  languageRequirementContext,
} from "../../../models/localizedConstants";
import {
  CriteriaTypeId,
  LanguageRequirementId,
} from "../../../models/lookupConstants";
import Criterion from "../Criterion";
import JobWorkEnv from "../JobWorkEnv";
import JobWorkCulture from "../JobWorkCulture";
import Modal from "../../Modal";
import { textToParagraphs } from "../../../helpers/textToParagraphs";
import { useUrlHash, Link } from "../../../helpers/router";
import { classificationString } from "../../../models/jobUtil";
import DemoSubmitJobModal from "./DemoSubmitJobModal";
import ManagerSurveyModal from "./ManagerSurveyModal";
import JobReviewActivityFeed from "./JobReviewActivityFeed";

interface JobReviewSectionProps {
  title: string;
  isSubsection?: boolean;
  link: string;
  linkLabel: string;
  description?: string;
  hideLink: boolean;
}

const messages = defineMessages({
  titleHeading: {
    id: "jobBuilder.review.jobPageHeading",
    defaultMessage: "Job Page Heading",
    description: "Section title.",
  },
  infoEditLink: {
    id: "jobBuilder.review.infoEditLink",
    defaultMessage: "Edit This in Step 01: Job Info",
    description: "Link to edit job details.",
  },
  impactEditLink: {
    id: "jobBuilder.review.impactEditLink",
    defaultMessage: "Edit This in Step 03: Impact",
    description: "Link to edit impact statements.",
  },
  tasksEditLink: {
    id: "jobBuilder.review.tasksEditLink",
    defaultMessage: "Edit This in Step 04: Tasks",
    description: "Link to edit tasks.",
  },
  skillsEditLink: {
    id: "jobBuilder.review.skillsEditLink",
    defaultMessage: "Edit This in Step 05: Skills",
    description: "Link to edit skills.",
  },
  workEnvEditLink: {
    id: "jobBuilder.review.workEnvEditLink",
    defaultMessage: "Edit This in Step 02: Work Environment",
    description: "Link to edit work environment.",
  },
  managerProfileLink: {
    id: "jobBuilder.review.managerProfileLink",
    defaultMessage: "Edit This in Your Profile",
    description: "Link to edit a manager's profile.",
  },
  nullProvince: {
    id: "jobBuilder.review.nullProvince",
    defaultMessage: "MISSING PROVINCE",
    description: "Error text for missing province information.",
  },
  basicHeading: {
    id: "jobBuilder.review.basicInformationHeading",
    defaultMessage: "Basic Information",
    description: "Heading for Basic Information section",
  },
  impactHeading: {
    id: "jobBuilder.review.impactHeading",
    defaultMessage: "Impact",
    description: "Heading for Impact section",
  },
  tasksHeading: {
    id: "jobBuilder.review.tasksHeading",
    defaultMessage: "Tasks",
    description: "Heading for Tasks section",
  },
  criteriaSection: {
    id: "jobBuilder.review.criteriaSection",
    defaultMessage: "Criteria",
    description: "Title for criteria section",
  },
  educationalHeading: {
    id: "jobBuilder.review.educationalHeading",
    defaultMessage: "Education Requirements",
    description: "Heading for Educational section",
  },
  skillsHeading: {
    id: "jobBuilder.review.skillsHeading",
    defaultMessage: "Skills You Need to Have",
    description: "Heading for Skills section",
  },
  assetHeading: {
    id: "jobBuilder.review.assetHeading",
    defaultMessage: "Skills That Are Nice to Have",
    description: "Heading for Asset Skills section",
  },
  languageHeading: {
    id: "jobBuilder.review.languageHeading",
    defaultMessage: "Language Requirements",
    description: "Heading for Language section",
  },
  cultureSection: {
    id: "jobBuilder.review.cultureSection",
    defaultMessage: "Environment & Culture",
    description: "Title for culture section",
  },
  managerHeading: {
    id: "jobBuilder.review.managerHeading",
    defaultMessage: "Manager Information",
    description: "Heading for Manager section",
  },
  workCultureHeading: {
    id: "jobBuilder.review.workCultureHeading",
    defaultMessage: "Work Culture",
    description: "Heading for Work Culture section",
  },
  workEnvHeading: {
    id: "jobBuilder.review.workEnvHeading",
    defaultMessage: "Work Environment",
    description: "Heading for Work Environment section",
  },
  workEnvDescription: {
    id: "jobBuilder.review.workDescription",
    defaultMessage:
      "Please note that some Work Environment information is only presented to the applicant after they've clicked the \"View the team's work environment and culture\" button that appears on the job poster.",
    description: "A note about the information in the work description section",
  },
  otherInfoHeading: {
    id: "jobBuilder.review.otherInfoHeading",
    defaultMessage: "Other Team Information",
    description: "Heading for other info section",
  },
});

const JobReviewSection: React.FunctionComponent<JobReviewSectionProps> = ({
  title,
  isSubsection,
  link,
  linkLabel,
  description,
  children,
  hideLink,
}): React.ReactElement => {
  return (
    <>
      <div
        data-c-margin={
          isSubsection ? "tb(normal)" : "top(triple) bottom(normal)"
        }
      >
        <div data-c-grid="gutter middle">
          <div
            data-c-grid-item="tp(1of2)"
            data-c-alignment="base(centre) tp(left)"
          >
            {isSubsection ? (
              <h5 data-c-font-weight="bold" data-c-font-size="h5">
                {title}
              </h5>
            ) : (
              <h4 data-c-colour="c2" data-c-font-size="h4">
                {title}
              </h4>
            )}
          </div>
          {!hideLink && (
            <div
              data-c-grid-item="tp(1of2)"
              data-c-alignment="base(centre) tp(right)"
            >
              <Link href={link} title={linkLabel}>
                <i data-c-colour="c2" className="fas fa-edit" />
                {linkLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
      {description && <p data-c-margin="bottom(normal)">{description}</p>}
      <div
        data-c-border="all(thin, solid, grey)"
        data-c-padding="normal"
        data-c-radius="rounded"
      >
        {children}
      </div>
    </>
  );
};

const sectionTitle = (title: string): React.ReactElement => {
  return (
    <div data-c-margin="top(triple) bottom(normal)">
      <div data-c-grid="gutter middle">
        <div
          data-c-grid-item="base(1of1)"
          data-c-alignment="base(centre) tp(left)"
        >
          <h4 data-c-colour="c2" data-c-font-size="h4">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};

const languageRequirementIcons = (
  languageRequirementId: number,
): React.ReactElement => {
  const enIcon = <img src="/images/icon_english_requirement.svg" alt="" />;
  const frIcon = <img src="/images/icon_french_requirement.svg" alt="" />;
  switch (languageRequirementId) {
    case LanguageRequirementId.bilingualIntermediate:
    case LanguageRequirementId.bilingualAdvanced:
      return (
        <>
          {enIcon}
          &amp;&nbsp;&nbsp;
          {frIcon}
        </>
      );
    case LanguageRequirementId.englishOrFrench:
      return (
        <>
          {enIcon}
          <FormattedMessage
            id="jobBuilder.review.or"
            defaultMessage="or"
            description="Displayed between language icons for the English Or French option."
          />
          &nbsp;&nbsp;
          {frIcon}
        </>
      );
    case LanguageRequirementId.english:
      return enIcon;
    case LanguageRequirementId.french:
      return frIcon;
    default:
      return enIcon;
  }
};

const renderManagerSection = (
  manager: Manager | null,
  managerDeptName: string,
  locale: "en" | "fr",
): React.ReactElement => {
  if (manager === null) {
    return (
      <p>
        <FormattedMessage
          id="jobBuilder.review.managerDataLoading"
          defaultMessage="Manager data is loading..."
          description="Placeholder text as Manager data loads."
        />
      </p>
    );
  }
  const managerTranslation = manager[locale];
  if (managerTranslation) {
    return (
      <>
        <p data-c-margin="bottom(normal)">{manager.full_name}</p>
        <p
          data-c-margin={`${managerTranslation.about_me && "{bottom(normal)"}`}
        >
          <FormattedMessage
            id="jobBuilder.review.managerPosition"
            defaultMessage="{position} at {department}"
            description="Description of the Manager's position & department."
            values={{
              position: managerTranslation.position,
              department: managerDeptName,
            }}
          />
        </p>
        {managerTranslation.about_me && <p>{managerTranslation.about_me}</p>}
      </>
    );
  }
  return (
    <p>
      <FormattedMessage
        id="jobBuilder.review.managerIncomplete"
        defaultMessage="Please complete your manager profile."
        description="Note that the Manager's profile is incomplete and should be edited before continuing."
      />
    </p>
  );
};

interface JobReviewDisplayProps {
  job: Job;
  manager: Manager | null;
  tasks: JobPosterKeyTask[];
  criteria: Criteria[];
  // List of all possible skills.
  skills: Skill[];
  // List of all possible departments.
  departments: Department[];
  hideBuilderLinks: boolean;
}
export const JobReviewDisplay: React.FC<JobReviewDisplayProps> = ({
  job,
  manager,
  tasks,
  criteria,
  skills,
  departments,
  hideBuilderLinks = false,
}) => {
  // Scroll to element specified in the url hash, if possible
  useUrlHash();
  const intl = useIntl();
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }

  const getDeptName = (departmentId: number | null): string => {
    const department =
      departmentId !== null ? find(departments, departmentId) : null;
    return department !== null ? department[locale].name : "MISSING DEPARTMENT";
  };
  const departmentName = getDeptName(job.department_id);
  const managerDeptName = manager ? getDeptName(manager.department_id) : "";

  // Map the skills into a dictionary for quicker access
  const skillsById = mapToObject(skills, getId);
  const getSkillOfCriteria = (criterion: Criteria): Skill | null => {
    return hasKey(skillsById, criterion.skill_id)
      ? skillsById[criterion.skill_id]
      : null;
  };
  const essentialCriteria = criteria.filter(
    (criterion): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Essential,
  );
  const assetCriteria = criteria.filter(
    (criterion): boolean => criterion.criteria_type_id === CriteriaTypeId.Asset,
  );

  const selectedEnvOptions: string[] = job.work_env_features
    ? Object.entries(job.work_env_features)
        .map(([feature, selected]): string | null =>
          selected ? feature : null,
        )
        .filter(notEmpty)
    : [];

  return (
    <>
      <JobReviewSection
        title={intl.formatMessage(messages.titleHeading)}
        linkLabel={intl.formatMessage(messages.infoEditLink)}
        link={jobBuilderDetails(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        <p data-c-font-weight="bold" data-c-margin="bottom(half)">
          {job[locale].title}
        </p>
        <p data-c-margin="bottom(normal)">{departmentName}</p>
        <p data-c-margin="bottom(half)">
          <i
            data-c-colour="c2"
            className="fas fa-map-marker-alt"
            title="Location Icon."
          >
            &nbsp;&nbsp;
          </i>
          {job[locale].city},{" "}
          {job.province_id !== null
            ? intl.formatMessage(provinceName(job.province_id))
            : intl.formatMessage(messages.nullProvince)}
        </p>
        <p>
          <i
            data-c-colour="c2"
            className="fas fa-home"
            title="Remote Work Icon."
          >
            &nbsp;&nbsp;
          </i>
          {job.remote_work_allowed ? (
            <FormattedMessage
              id="jobBuilder.review.remoteAllowed"
              defaultMessage="Remote Work Allowed"
              description="Text displayed when remote work is allowed."
            />
          ) : (
            <FormattedMessage
              id="jobBuilder.review.remoteNotAllowed"
              defaultMessage="Remote Work Not Allowed"
              description="Text displayed when remote work is not allowed."
            />
          )}
        </p>
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.basicHeading)}
        linkLabel={intl.formatMessage(messages.infoEditLink)}
        link={jobBuilderDetails(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        <div data-c-grid="gutter">
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.averageAnnualSalary"
                defaultMessage="Annual Salary Range"
                description="Label for salary information."
              />
            </p>
            <p>
              <FormattedMessage
                id="jobBuilder.review.tCAdds"
                defaultMessage="Talent Cloud will add this."
                description="Information will be added placeholder."
              />
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.languageProfile"
                defaultMessage="Language Profile"
                description="Information will be added placeholder."
              />
            </p>
            <p>
              {job.language_requirement_id
                ? intl.formatMessage(
                    languageRequirement(job.language_requirement_id),
                  )
                : ""}
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.duration"
                defaultMessage="Duration"
                description="Label for duration of Term"
              />
            </p>
            <p>
              <FormattedMessage
                id="jobBuilder.review.months"
                defaultMessage="{termMonths, plural, =0 {No Months} one {# Month} other {# Months}}"
                description="Length of term in months"
                values={{ termMonths: job.term_qty }}
              />
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.securityClearance"
                defaultMessage="Security Clearance"
                description="Label for Security Clearance info"
              />
            </p>
            <p>
              {job.security_clearance_id
                ? intl.formatMessage(
                    securityClearance(job.security_clearance_id),
                  )
                : ""}
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.targetStartDate"
                defaultMessage="Target Start Date"
                description="Label for start date info"
              />
            </p>
            <p>
              <FormattedMessage
                id="jobBuilder.review.comesLater"
                defaultMessage="This comes later."
                description="Placeholder for information that comes later"
              />
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              <FormattedMessage
                id="jobBuilder.review.GovernmentClass"
                defaultMessage="Government Classification"
                description="Placeholder for information that comes later"
              />
            </p>
            <p>{classificationString(job)}</p>
          </div>
        </div>
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.impactHeading)}
        linkLabel={intl.formatMessage(messages.impactEditLink)}
        link={jobBuilderImpact(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        <p data-c-margin="bottom(normal)">{job[locale].dept_impact}</p>
        <p data-c-margin="bottom(normal)">{job[locale].team_impact}</p>
        <p>{job[locale].hire_impact}</p>
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.tasksHeading)}
        linkLabel={intl.formatMessage(messages.tasksEditLink)}
        link={jobBuilderTasks(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        <ul>
          {tasks.map(
            (task: JobPosterKeyTask): React.ReactElement => (
              <li key={task.id}>{task[locale].description}</li>
            ),
          )}
        </ul>
      </JobReviewSection>
      {sectionTitle(intl.formatMessage(messages.criteriaSection))}
      <JobReviewSection
        title={intl.formatMessage(messages.educationalHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.infoEditLink)}
        link={jobBuilderDetails(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        {textToParagraphs(job[locale].education || "")}
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.skillsHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.skillsEditLink)}
        link={jobBuilderSkills(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        {essentialCriteria.length === 0 ? (
          <p>
            <FormattedMessage
              id="jobBuilder.review.skills.nullState"
              defaultMessage="You haven't added any Nice to Have skills to this poster."
              description="The text displayed for skills when you haven't added any skills."
            />
          </p>
        ) : (
          essentialCriteria.map((criterion): React.ReactElement | null => {
            const skill = getSkillOfCriteria(criterion);
            if (skill === null) {
              return null;
            }
            return (
              <Criterion
                criterion={criterion}
                skill={skill}
                key={criterion.id}
              />
            );
          })
        )}
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.assetHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.skillsEditLink)}
        link={jobBuilderSkills(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        {assetCriteria.length === 0 ? (
          <p>
            <FormattedMessage
              id="jobBuilder.review.skills.nullState"
              defaultMessage="You haven't added any Nice to Have skills to this poster."
              description="The text displayed for skills when you haven't added any skills."
            />
          </p>
        ) : (
          assetCriteria.map((criterion): React.ReactElement | null => {
            const skill = getSkillOfCriteria(criterion);
            if (skill === null) {
              return null;
            }
            return (
              <Criterion
                criterion={criterion}
                skill={skill}
                key={criterion.id}
              />
            );
          })
        )}
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.languageHeading)}
        linkLabel={intl.formatMessage(messages.infoEditLink)}
        link={jobBuilderDetails(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        {/** TODO: get lang data from job */}
        {job.language_requirement_id && (
          <>
            <p
              className="job-builder-review-language"
              data-c-margin="bottom(normal)"
            >
              {languageRequirementIcons(job.language_requirement_id)}
              {intl.formatMessage(
                languageRequirement(job.language_requirement_id),
              )}
            </p>
            <p data-c-margin="bottom(normal)">
              {intl.formatMessage(
                languageRequirementDescription(job.language_requirement_id),
              )}
            </p>
            <p data-c-margin="top(normal)">
              {intl.formatMessage(
                languageRequirementContext(job.language_requirement_id),
              )}
            </p>
          </>
        )}
      </JobReviewSection>
      {sectionTitle(intl.formatMessage(messages.cultureSection))}
      <JobReviewSection
        title={intl.formatMessage(messages.managerHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.managerProfileLink)}
        link={managerEditProfile(locale)}
        hideLink={hideBuilderLinks}
      >
        {renderManagerSection(manager, managerDeptName, locale)}
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.workCultureHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.workEnvEditLink)}
        link={jobBuilderEnv(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        {job[locale].culture_summary && <p>{job[locale].culture_summary}</p>}
        {job[locale].culture_special && <p>{job[locale].culture_special}</p>}
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.workEnvHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.workEnvEditLink)}
        link={jobBuilderEnv(locale, job.id)}
        description={intl.formatMessage(messages.workEnvDescription)}
        hideLink={hideBuilderLinks}
      >
        <JobWorkEnv
          teamSize={job.team_size || 0}
          selectedEnvOptions={selectedEnvOptions}
        />
      </JobReviewSection>
      <JobReviewSection
        title={intl.formatMessage(messages.otherInfoHeading)}
        isSubsection
        linkLabel={intl.formatMessage(messages.infoEditLink)}
        link={jobBuilderDetails(locale, job.id)}
        hideLink={hideBuilderLinks}
      >
        <JobWorkCulture job={job} />
      </JobReviewSection>
    </>
  );
};

interface JobReviewProps {
  job: Job;
  manager: Manager | null;
  tasks: JobPosterKeyTask[];
  criteria: Criteria[];
  // List of all possible skills.
  skills: Skill[];
  // List of all possible departments.
  departments: Department[];
  validForSubmission?: boolean;
  handleSubmit: (job: Job) => Promise<void>;
  handleContinue: () => void;
  handleReturn: () => void;
}

export const JobReview: React.FunctionComponent<JobReviewProps &
  WrappedComponentProps> = ({
  job,
  manager,
  tasks,
  criteria,
  skills,
  departments,
  validForSubmission = false,
  handleSubmit,
  handleContinue,
  handleReturn,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSurveyModalVisible, setIsSurveyModalVisible] = useState(false);
  const modalId = "job-review-modal";
  const modalParentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        data-c-container="form"
        data-c-padding="top(triple) bottom(triple)"
        ref={modalParentRef}
      >
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom(double)"
        >
          <FormattedMessage
            id="jobBuilder.review.reviewYourPoster"
            defaultMessage="Review Your Job Poster for:"
            description="Title for Review Job Poster section."
          />{" "}
          <span data-c-colour="c2">{job[locale].title}</span>
        </h3>
        <p>
          <FormattedMessage
            id="jobBuilder.review.headsUp"
            defaultMessage="Just a heads up! We've rearranged some of your information to help you
            understand how an applicant will see it once published."
            description="Description under primary title of review section"
          />
        </p>
        <JobReviewActivityFeed jobId={job.id} isHrAdvisor={false} />
        <JobReviewDisplay
          job={job}
          manager={manager}
          tasks={tasks}
          criteria={criteria}
          skills={skills}
          departments={departments}
          hideBuilderLinks={false}
        />
        <div data-c-grid="gutter">
          <div data-c-grid-item="base(1of1)">
            <hr data-c-margin="top(normal) bottom(normal)" />
          </div>
          <div
            data-c-alignment="base(centre) tp(left)"
            data-c-grid-item="tp(1of2)"
          >
            <button
              data-c-button="outline(c2)"
              data-c-radius="rounded"
              type="button"
              onClick={(): void => handleReturn()}
            >
              <FormattedMessage
                id="jobBuilder.review.button.return"
                defaultMessage="Save &amp; Return to Skills"
                description="Label of 'Previous Step' button."
              />
            </button>
          </div>
          <div
            data-c-alignment="base(centre) tp(right)"
            data-c-grid-item="tp(1of2)"
          >
            {/* Modal trigger, same as last step. */}
            <button
              id="submit"
              data-c-button="solid(c2)"
              data-c-radius="rounded"
              type="button"
              disabled={!validForSubmission}
              onClick={(): void => setIsModalVisible(true)}
            >
              <FormattedMessage
                id="jobBuilder.review.button.submit"
                defaultMessage="Looks good!"
                description="Label of Job Review Submission Button"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        data-c-dialog-overlay={
          isModalVisible || isSurveyModalVisible ? "active" : ""
        }
      />
      {manager === null || manager.is_demo_manager ? (
        <DemoSubmitJobModal
          isVisible={isModalVisible}
          handleCancel={(): void => setIsModalVisible(false)}
          parentElement={modalParentRef.current}
        />
      ) : (
        <Modal
          id={modalId}
          visible={isModalVisible}
          onModalCancel={(): void => setIsModalVisible(false)}
          onModalConfirm={async (): Promise<void> => {
            try {
              await handleSubmit(job);
              setIsModalVisible(false);
              setIsSurveyModalVisible(true);
            } catch {
              setIsModalVisible(false);
            }
          }}
          parentElement={modalParentRef.current}
        >
          <Modal.Header>
            <div
              data-c-background="c1(100)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              <h5
                data-c-colour="white"
                data-c-font-size="h4"
                id={`${modalId}-title`}
              >
                <FormattedMessage
                  id="jobBuilder.review.confirm.title"
                  defaultMessage="Congrats! Are You Ready to Submit?"
                  description="Title of Submit Confirmation modal."
                />
              </h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div data-c-padding="normal">
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.review.readyTosubmit"
                  defaultMessage="If you're ready to submit your poster, click the Submit button below."
                  description="Instructions on how to submit"
                />
              </p>
              <p data-c-font-weight="bold" data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.review.whatHappens"
                  defaultMessage="What happens next?"
                  description="Rhetorical question"
                />
              </p>
              <p data-c-margin="bottom(normal)">
                <FormattedMessage
                  id="jobBuilder.review.sendYourDraft"
                  defaultMessage="Talent Cloud will send your draft to your department's HR advisor who will notify you with comments."
                  description="Information about next steps"
                />
              </p>
              <p>
                <FormattedMessage
                  id="jobBuilder.review.meantime"
                  defaultMessage="In the meantime, feel free to go ahead and create a screening plan for your selection process. Alternatively, you can wait for comments to come back from HR before you take the next step."
                  description="Suggestion on what to do while you wait."
                />
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterCancelBtn>
              <FormattedMessage
                id="jobBuilder.review.confirm.cancel"
                defaultMessage="Cancel"
                description="Cancel button of Job Review confirmation modal."
              />
            </Modal.FooterCancelBtn>
            <Modal.FooterConfirmBtn>
              <FormattedMessage
                id="jobBuilder.review.confirm.submit"
                defaultMessage="Yes, Submit"
                description="Submit button of Job Review confirmation modal."
              />
            </Modal.FooterConfirmBtn>
          </Modal.Footer>
        </Modal>
      )}
      <ManagerSurveyModal
        isVisible={isSurveyModalVisible}
        parentElement={modalParentRef.current}
      />
    </>
  );
};

export default injectIntl(JobReview);

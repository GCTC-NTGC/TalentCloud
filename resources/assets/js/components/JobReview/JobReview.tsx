import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import {
  JobPosterKeyTask,
  Criteria,
  Job,
  Skill,
  Department,
} from "../../models/types";
import {
  jobBuilderIntro,
  jobBuilderDetails,
  jobBuilderTasks,
  jobBuilderImpact,
} from "../../helpers/routes";
import { find } from "../../helpers/queries";
import {
  provinceName,
  securityClearance,
} from "../../models/localizedConstants";

interface JobReviewSectionProps {
  title: string;
  isSubsection?: boolean;
  link: string;
  linkLabel: string;
}

const JobReviewSection: React.FunctionComponent<JobReviewSectionProps> = ({
  title,
  isSubsection,
  link,
  linkLabel,
  children,
}): React.ReactElement => {
  return (
    <>
      <div data-c-margin="top(triple) bottom(normal)">
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
          <div
            data-c-grid-item="tp(1of2)"
            data-c-alignment="base(centre) tp(right)"
          >
            <a href={link}>
              <i data-c-colour="c2" className="fas fa-edit" />
              {linkLabel}
            </a>
          </div>
        </div>
      </div>
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

interface JobReviewProps {
  job: Job;
  tasks: JobPosterKeyTask[];
  criteria: Criteria[];
  // List of all possible skills.
  skills: Skill[];
  // List of all possible departments.
  departments: Department[];
  handleSubmit: (job: Job) => Promise<void>;
  handleContinue: () => void;
  handleReturn: () => void;
}

export const JobReview: React.FunctionComponent<
  JobReviewProps & InjectedIntlProps
> = ({
  job,
  tasks,
  criteria,
  skills,
  departments,
  handleSubmit,
  handleContinue,
  handleReturn,
  intl,
}): React.ReactElement => {
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw new Error("Unknown intl.locale");
  }
  const department =
    job.department_id !== null ? find(departments, job.department_id) : null;
  const departmentName =
    department !== null ? department[locale].name : "MISSING DEPARTMENT";

  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        Review Your Job Poster for:{" "}
        <span data-c-colour="c2">External Recruiter</span>
      </h3>
      <p>
        Just a heads up! We've rearranged some of your information to help you
        understand how an applicant will see it once published.
      </p>

      <JobReviewSection
        title="Job Page Heading"
        linkLabel="Edit This in Step 02: Job Info"
        link={jobBuilderDetails(locale, job.id)}
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
            : "MISSING PROVINCE"}
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
        title="Basic Information"
        linkLabel="Edit This in Step 02: Job Info"
        link={jobBuilderDetails(locale, job.id)}
      >
        <div data-c-grid="gutter">
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Average Annual Salary
            </p>
            <p>Talent Cloud will add this.</p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Language Profile
            </p>
            <p>
              {job.province_id
                ? intl.formatMessage(provinceName(job.province_id))
                : "MISSING PROVINCE"}
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Duration
            </p>
            <p>{job.term_qty} Months</p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Security Clearance
            </p>
            <p>
              {job.security_clearance_id
                ? intl.formatMessage(
                    securityClearance(job.security_clearance_id),
                  )
                : "MISSING SECURITY CLEARANCE"}
            </p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Target Start Date
            </p>
            <p>This comes later.</p>
          </div>
          <div data-c-grid-item="tp(1of2)">
            <p data-c-font-weight="bold" data-c-margin="bottom(quarter)">
              Government Classification
            </p>
            <p>
              {job.classification_code}-0{job.classification_level}
            </p>
          </div>
        </div>
      </JobReviewSection>
      <JobReviewSection
        title="Impact"
        linkLabel="Edit This in Step 04: Impact"
        link={jobBuilderImpact(locale, job.id)}
      >
        <p data-c-margin="bottom(normal)">{job[locale].dept_impact}</p>
        <p data-c-margin="bottom(normal)">{job[locale].team_impact}</p>
        <p>{job[locale].hire_impact}</p>
      </JobReviewSection>
      <JobReviewSection
        title="Tasks"
        linkLabel="Edit This in Step 05: Tasks"
        link={jobBuilderTasks(locale, job.id)}
      >
        <ul>
          {tasks.map(
            (task: JobPosterKeyTask): React.ReactElement => (
              <li key={task.id}>{task[locale].description}</li>
            ),
          )}
        </ul>
      </JobReviewSection>
    </div>
  );
};

export default injectIntl(JobReview);

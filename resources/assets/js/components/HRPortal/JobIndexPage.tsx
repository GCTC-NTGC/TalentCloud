import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { FormattedMessage } from "react-intl";
import JobCard, { JobCardProps } from "../JobCard";
import UnclaimedJobCard, { UnclaimedJobCardProps } from "../UnclaimedJobCard";
import RootContainer from "../RootContainer";
import { JobStatus } from "../../models/lookupConstants";
import { jobActions, unclaimedJobs } from "./fixtures";

interface CompletedJobsAccordionProps {
  completedJobActions: JobCardProps[];
}

const CompletedJobsAccordion: React.FC<CompletedJobsAccordionProps> = ({
  completedJobActions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section data-c-accordion-group data-c-margin="top(triple)">
      <div data-c-accordion="" className={`${isExpanded && "active"}`}>
        <button
          aria-expanded={isExpanded}
          data-c-accordion-trigger
          tabIndex={0}
          type="button"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          <div>
            <h3 data-c-font-size="h3" data-c-color="c3">
              <FormattedMessage
                id="hrPortal.jobPageIndex.completedJobsHeader"
                description="Header for completed jobs accordion section."
                defaultMessage="My Completed Job Actions"
              />
            </h3>
          </div>
          <span data-c-visibility="invisible">
            <FormattedMessage
              id="hrPortal.jobPageIndex.clickToView"
              description="Accordion trigger message for screen readers."
              defaultMessage="Click to view..."
            />
          </span>
          <p
            data-c-accordion-add
            data-c-font-style="underline"
            data-c-color="c2"
          >
            <FormattedMessage
              id="hrPortal.jobPageIndex.showAccordion"
              description="Accordion trigger message to show items."
              defaultMessage="Show"
            />
          </p>
          <p
            data-c-accordion-remove
            data-c-font-style="underline"
            data-c-color="c2"
          >
            <FormattedMessage
              id="hrPortal.jobPageIndex.hideAccordion"
              description="Accordion trigger message to hide items."
              defaultMessage="Hide"
            />
          </p>
        </button>
        <div
          aria-hidden="true"
          data-c-accordion-content
          data-c-padding="top(double)"
        >
          <div>
            {(completedJobActions.length !== 0 &&
              completedJobActions.map(
                (jobAction): React.ReactElement => {
                  return <JobCard {...jobAction} />;
                },
              )) || (
              <p>
                <FormattedMessage
                  id="hrPortal.jobPageIndex.noJobsCompleted"
                  description="Message displayed if the completed jobs list is empty."
                  defaultMessage="No jobs completed yet!"
                />
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface JobIndexPageProps {
  jobActions: JobCardProps[];
  unclaimedJobs: UnclaimedJobCardProps[];
  departmentName: string;
}

const JobIndexPage: React.FunctionComponent<JobIndexPageProps> = ({
  jobActions,
  unclaimedJobs,
  departmentName,
}) => {
  const notCompletedJobActions: JobCardProps[] = useMemo(
    () =>
      jobActions.filter(jobAction => jobAction.status !== JobStatus.Complete),
    [jobActions],
  );

  const completedJobActions: JobCardProps[] = useMemo(
    () =>
      jobActions.filter(jobAction => jobAction.status === JobStatus.Complete),
    [jobActions],
  );

  return (
    <section>
      <div data-c-background="gray(10)">
        <div data-c-container="large" data-c-padding="tb(triple)">
          <p>
            <FormattedMessage
              id="hrPortal.jobPageIndex.welcomeMessage"
              description="Welcome message at beginning of page."
              defaultMessage="Welcome! Introductory copy that explains how this page works, and
                what an HR adviser needs to do to claim a job action as their own.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
                ducimus laboriosam sequi, quis autem minima esse quasi aspernatur
                vero provident quos eligendi, ea officia exercitationem. Obcaecati
                impedit quae veritatis corrupti!"
            />
          </p>
          <h2 data-c-font-size="h2" data-c-margin="top(triple) bottom(normal)">
            <FormattedMessage
              id="hrPortal.jobPageIndex.jobActionsHeader"
              description="Header for my job actions section."
              defaultMessage="My Job Actions"
            />
          </h2>
          <p data-c-margin="bottom(double)">
            <FormattedMessage
              id="hrPortal.jobPageIndex.jobActionsMessage"
              description="Message before list of users job actions."
              defaultMessage="This is a list of all job actions you are currently participating
                in. Looking for an older job? Check the 'My Completed Job Actions'
                section below your active jobs."
            />
          </p>

          {/* Users Job Actions List */}
          {/* Not Completed */}
          {(notCompletedJobActions.length !== 0 &&
            notCompletedJobActions.map(
              (jobAction): React.ReactElement => {
                return <JobCard {...jobAction} />;
              },
            )) || (
            <p>
              <FormattedMessage
                id="hrPortal.jobPageIndex.jobActionsEmpty"
                description="Message displayed if the jobs actions list is empty."
                defaultMessage="Claim a job below!"
              />
            </p>
          )}

          {/* Completed */}
          <CompletedJobsAccordion completedJobActions={completedJobActions} />

          <hr data-c-margin="tb(triple)" data-c-hr="gray" />
          <h2 data-c-font-size="h2" data-c-margin="top(triple) bottom(double)">
            <FormattedMessage
              id="hrPortal.jobPageIndex.preDepartmentName"
              description="Message before department name."
              defaultMessage="All Jobs in"
            />
            {` ${departmentName}`}
          </h2>
          <p data-c-margin="bottom(double)">
            <FormattedMessage
              id="hrPortal.jobPageIndex.unclaimedJobsMessage"
              description="Message before list of unclaimed jobs."
              defaultMessage="This is the list of all active job actions in your department. From
                here you can 'claim' a job, which will move it into your jobs list
                above and allow you to begin working with the hiring manager on
                finding the best talent possible. If you claim a job by accident, no
                fear, for you can click into the job summary and remove yourself
                using the 'Remove Myself From This Job' button."
            />
          </p>

          {/* Unclaimed Jobs List */}
          <section data-c-grid="gutter">
            {unclaimedJobs.length !== 0 &&
              unclaimedJobs.map(
                (unclaimedJob): React.ReactElement => {
                  return <UnclaimedJobCard {...unclaimedJob} />;
                },
              )}
          </section>
          {unclaimedJobs.length === 0 && (
            <p>
              <FormattedMessage
                id="hrPortal.jobPageIndex.unclaimedJobsEmpty"
                description="Message displayed if the unclaimed jobs list is empty."
                defaultMessage="There are currently no active jobs available."
              />
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobIndexPage;

const JobIndexPageRoot: React.FunctionComponent | null = () => {
  return (
    <RootContainer>
      <JobIndexPage
        jobActions={jobActions}
        unclaimedJobs={unclaimedJobs}
        departmentName="Treasury Board of Canada Secretariat"
      />
    </RootContainer>
  );
};

if (document.getElementById("hr-job-index-root")) {
  const root = document.getElementById("hr-job-index-root");
  ReactDOM.render(<JobIndexPageRoot />, root);
}

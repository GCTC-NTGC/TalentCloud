import React from "react";
import {
  injectIntl,
  WrappedComponentProps,
  FormattedMessage,
} from "react-intl";
import { Job, AssessmentPlanNotification } from "../../models/types";
import AssessmentPlanTable from "./AssessmentPlanTable";
import RatingGuideBuilder from "./RatingGuideBuilder";
import AssessmentPlanAlert from "./AssessmentPlanAlert";
import AssessmentPlanBuilder from "./AssessmentPlanBuilder";

interface AssessmentPlanProps {
  job: Job | null;
  notifications: AssessmentPlanNotification[];
}

const AssessmentPlan: React.FunctionComponent<AssessmentPlanProps &
  WrappedComponentProps> = ({
  job,
  notifications,
  intl,
}): React.ReactElement => {
  const jobTitle = (
    <span data-c-colour="c5" data-c-font-size="h3">
      {job && ` ${job[intl.locale].title}`}
    </span>
  );
  return (
    <section data-clone>
      <div
        data-c-padding="top(triple) bottom(triple)"
        data-c-container="layout"
      >
        {/* Assessment & Rating Intro ==================================== */}
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="bottom"
        >
          <FormattedMessage
            id="assessmentPlan.pageTitle"
            defaultMessage="Generate an assessment plan for: {jobTitle}"
            description="Title of the Generate Assessment Plan page"
            values={{ jobTitle }}
          />
        </h3>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="assessmentPlan.instructions.intro"
            defaultMessage="This tool allows you to build an assessment plan and a ratings guide for your job poster. The tool is used in 3 steps:"
            description="Beginning instructions on using Assessment Plan Builder"
          />
        </p>
        <ol data-c-margin="bottom(normal)">
          <li>
            <strong>
              <FormattedMessage
                id="assessmentPlan.assessmentPlanBuilder.title"
                defaultMessage="Assessment Plan Builder"
                description="Title of the Assessment Plan Builder"
              />
            </strong>{" "}
            <FormattedMessage
              id="assessmentPlan.assessmentPlanBuilder.shortDescription"
              defaultMessage="(Select your assessments)"
              description="Short description of Assessment Plan Builder"
            />
          </li>
          <li>
            <strong>
              <FormattedMessage
                id="assessmentPlan.assessmentPlanSummary.title"
                defaultMessage="Assessment Plan Summary"
                description="Title of the Assessment Plan Summary"
              />
            </strong>{" "}
            <FormattedMessage
              id="assessmentPlan.assessmentPlanSummary.shortDescription"
              defaultMessage="(Review your plan)"
              description="Short description of Assessment Plan Summary"
            />
          </li>
          <li>
            <strong>
              <FormattedMessage
                id="assessmentPlan.ratingGuideBuilder.title"
                defaultMessage="Ratings Guide Builder"
                description="Title of the Rating Guide Builder section"
              />
            </strong>{" "}
            <FormattedMessage
              id="assessmentPlan.ratingGuideBuilder.shortDescription"
              defaultMessage="(Customize your evaluations)"
              description="Short description of Rating Guide Builder"
            />
          </li>
        </ol>
        <p>
          <FormattedMessage
            id="assessmentPlan.instructions.narrativeNote"
            defaultMessage="Please note that all assessment plans will include a review of the narrative evidence provided by the applicant."
            description="Note that all plans include a review of narrative evidence."
          />
        </p>
        <AssessmentPlanAlert notifications={notifications} />
        {job !== null && (
          <>
            <AssessmentPlanBuilder jobId={job.id} />
            <AssessmentPlanTable jobId={job.id} />
            <RatingGuideBuilder jobId={job.id} />
          </>
        )}
      </div>
    </section>
  );
};

export default injectIntl(AssessmentPlan);

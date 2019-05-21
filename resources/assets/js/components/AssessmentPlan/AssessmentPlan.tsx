import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Job, Criteria, AssessmentPlanNotification } from "../../models/types";
import { CriteriaTypeId } from "../../models/lookupConstants";
import AssessmentPlanSkill from "./AssessmentPlanSkill";
import AssessmentPlanTable from "./AssessmentPlanTable";
import RatingGuideBuilder from "./RatingGuideBuilder";
import AssessmentPlanAlert from "./AssessmentPlanAlert";
import ErrorToast from "../ErrorToast";

interface AssessmentPlanProps {
  job: Job | null;
  criteria: Criteria[];
  notifications: AssessmentPlanNotification[];
}

const AssessmentPlan: React.FunctionComponent<
  AssessmentPlanProps & InjectedIntlProps
> = ({ job, criteria, notifications, intl }): React.ReactElement => {
  const assetCriteria = criteria.filter(
    (criterion: Criteria): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Asset,
  );
  const essentialCriteria = criteria.filter(
    (criterion: Criteria): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Essential,
  );

  const jobTitle = (
    <span data-c-colour="c5" data-c-font-size="h3">
      {job && ` ${job[intl.locale].title}`}
    </span>
  );
  return (
    <section data-clone>
      <ErrorToast />
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
        {/* Assessment Plan Builder ====================================== */}
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="top(triple) bottom(normal)"
        >
          1.{" "}
          <FormattedMessage
            id="assessmentPlan.assessmentPlanBuilder.title"
            defaultMessage="Assessment Plan Builder"
            description="Title of the Assessment Plan Builder"
          />
        </h3>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="assessmentPlan.assessmentPlanBuilder.instructions"
            defaultMessage="Your first step is to pick some assessments that will allow you to evaluate the criteria you've selected for your job poster. Below you'll find your essential criteria, followed by your asset criteria if you've selected any. The builder will save as you go, so when you're finished, feel free to move to step 2 to review your work."
            description="Instructions on how to get started with the Assessment Plan Builder."
          />
        </p>
        <div
          data-c-background="black(10)"
          data-c-border="all(thin, solid, black)"
          data-c-padding="top(normal) right(normal) left(normal)"
          data-c-margin="top(normal) bottom(normal)"
        >
          <h4
            data-c-colour="c5"
            data-c-font-weight="bold"
            data-c-font-size="h4"
          >
            <FormattedMessage
              id="criteria.essential"
              defaultMessage="Essential Skills"
              description="What essential criteria are called."
            />
          </h4>
          {essentialCriteria.map(
            (criterion): React.ReactElement => (
              <AssessmentPlanSkill
                key={`AssessmentPlanSkill_${criterion.id}`}
                criterion={criterion}
              />
            ),
          )}
          {essentialCriteria.length === 0 && (
            <div
              data-c-radius="rounded"
              data-c-background="black(10)"
              data-c-border="all(thin, solid, black)"
              data-c-padding="normal"
              data-c-alignment="base(center)"
              data-c-margin="top(normal) bottom(normal)"
            >
              <span data-c-colour="black">
                <FormattedMessage
                  id="assessmentPlan.essentialCriteria.nullState"
                  defaultMessage="You have no essential skills selected for this job poster."
                  description="Text displayed when there are no essential criteria."
                />
              </span>
            </div>
          )}
          <h4
            data-c-colour="c5"
            data-c-font-weight="bold"
            data-c-font-size="h4"
          >
            <FormattedMessage
              id="criteria.asset"
              defaultMessage="Asset Skills"
              description="What asset criteria are called."
            />
          </h4>
          {assetCriteria.map(
            (criterion): React.ReactElement => (
              <AssessmentPlanSkill
                key={`AssessmentPlanSkill_${criterion.id}`}
                criterion={criterion}
              />
            ),
          )}
          {assetCriteria.length === 0 && (
            <div
              data-c-radius="rounded"
              data-c-background="black(10)"
              data-c-border="all(thin, solid, black)"
              data-c-padding="normal"
              data-c-alignment="base(center)"
              data-c-margin="top(normal) bottom(normal)"
            >
              <span data-c-colour="black">
                <FormattedMessage
                  id="assessmentPlan.assetCriteria.nullState"
                  defaultMessage="You have no asset skills selected for this job poster."
                  description="Text displayed when there are no asset criteria."
                />
              </span>
            </div>
          )}
        </div>
        {/* Generated Assessment Plan ==================================== */}
        {job !== null && <AssessmentPlanTable jobId={job.id} />}
        {/* Ratings Guide Builder ======================================== */}
        {job !== null && <RatingGuideBuilder jobId={job.id} />}
      </div>
    </section>
  );
};

export default injectIntl(AssessmentPlan);

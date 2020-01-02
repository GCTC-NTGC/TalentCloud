import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import AssessmentPlanSkill from "./AssessmentPlanSkill";
import { RootState } from "../../store/store";
import { getCriteriaIdsOfTypeByJob } from "../../store/Job/jobSelector";
import { CriteriaTypeId } from "../../models/lookupConstants";

interface AssessmentPlanBuilderProps {
  essentialCriteriaIds: number[];
  assetCriteriaIds: number[];
}

export const AssessmentPlanBuilder: React.FunctionComponent<AssessmentPlanBuilderProps> = ({
  essentialCriteriaIds,
  assetCriteriaIds,
}): React.ReactElement => {
  return (
    <div>
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
        <h4 data-c-colour="c5" data-c-font-weight="bold" data-c-font-size="h4">
          <FormattedMessage
            id="criteria.essential"
            defaultMessage="Essential Skills"
            description="What essential criteria are called."
          />
        </h4>
        {essentialCriteriaIds.map(
          (criterionId): React.ReactElement => (
            <AssessmentPlanSkill
              key={`AssessmentPlanSkill_${criterionId}`}
              criterionId={criterionId}
            />
          ),
        )}
        {essentialCriteriaIds.length === 0 && (
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
        <h4 data-c-colour="c5" data-c-font-weight="bold" data-c-font-size="h4">
          <FormattedMessage
            id="criteria.asset"
            defaultMessage="Asset Skills"
            description="What asset criteria are called."
          />
        </h4>
        {assetCriteriaIds.map(
          (criterionId): React.ReactElement => (
            <AssessmentPlanSkill
              key={`AssessmentPlanSkill_${criterionId}`}
              criterionId={criterionId}
            />
          ),
        )}
        {assetCriteriaIds.length === 0 && (
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
    </div>
  );
};

interface AssessmentPlanBuilderContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  { jobId }: AssessmentPlanBuilderContainerProps,
): {
  essentialCriteriaIds: number[];
  assetCriteriaIds: number[];
} => {
  return {
    essentialCriteriaIds: getCriteriaIdsOfTypeByJob(state, {
      jobId,
      criteriaTypeId: CriteriaTypeId.Essential,
    }),
    assetCriteriaIds: getCriteriaIdsOfTypeByJob(state, {
      jobId,
      criteriaTypeId: CriteriaTypeId.Asset,
    }),
  };
};

export const AssessmentPlanBuilderContainer = connect(mapStateToProps)(
  AssessmentPlanBuilder,
);

export default AssessmentPlanBuilderContainer;

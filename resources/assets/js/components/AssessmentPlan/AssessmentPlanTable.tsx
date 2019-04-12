import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Criteria, Assessment } from "../types";
import { find } from "../../helpers/queries";
import { CriteriaTypeId } from "../lookupConstants";
import { assessmentType } from "../localizedConstants";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";

interface AssessmentPlanTableProps {
  /** All assessments to be displayed in this table */
  assessments: Assessment[];
  /** All criteria associated with assessments  */
  criteria: Criteria[];
}

const renderAssessmentTypeBlock = (
  assessmentTypeId: number,
  assessmentTypeName: string,
  criteria: Criteria[],
): React.ReactElement => {
  const essentialSkills = criteria
    .filter(
      criterion => criterion.criteria_type_id === CriteriaTypeId.Essential,
    )
    .map(criterion => criterion.skill);
  const assetSkills = criteria
    .filter(criterion => criterion.criteria_type_id === CriteriaTypeId.Asset)
    .map(criterion => criterion.skill);
  return (
    <div
      key={assessmentTypeId}
      data-c-border="top(thin, solid, black)"
      data-c-margin="top(normal) bottom(normal)"
    >
      <div data-c-grid="gutter">
        <div data-c-grid-item="tl(1of3)">
          <h5
            data-c-font-size="h4"
            data-c-margin="top(normal) bottom(normal)"
            data-c-font-weight="600"
            data-c-font-colour="c5"
          >
            {assessmentTypeName}
          </h5>
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            Assessing {criteria.length} skills.
          </span>
        </div>
        <div data-c-grid-item="tl(1of3)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal) bottom(normal)">
            Essential Skills
          </h5>
          {essentialSkills.length === 0 && (
            <p data-c-font-size="small">
              No skills being assessed by this tool.
            </p>
          )}
          <ul data-c-font-size="small">
            {essentialSkills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>
        <div data-c-grid-item="tl(1of3)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal) bottom(normal)">
            Asset Skills
          </h5>
          {assetSkills.length === 0 && (
            <p data-c-font-size="small">
              No skills being assessed by this tool.
            </p>
          )}
          <ul data-c-font-size="small">
            {assetSkills.map(skill => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AssessmentPlanTable: React.FunctionComponent<
  AssessmentPlanTableProps & InjectedIntlProps
> = ({
  criteria,
  assessments,
  intl,
}: AssessmentPlanTableProps & InjectedIntlProps): React.ReactElement => {
  const uniqueAssessmentTypes: number[] = getUniqueAssessmentTypes(assessments);

  return (
    <React.Fragment>
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="top(triple) bottom(normal)"
      >
        <FormattedMessage
          id="assessmentPlan.summary.title"
          defaultMessage="l10n.missing 2. Assessment Plan Summary"
          description="Title of Assessment Plan Summary Section"
        />
      </h3>
      <p data-c-margin="bottom(normal)">
        <FormattedMessage
          id="assessmentPlan.summary.description"
          defaultMessage="l10n.missing This is a summary of the work you've done above. You'll find
      each assessment accompanied by a consolidated list of the essential and
      asset skills attached to it."
          description="Description of Assessment Plan Summary Section"
        />
      </p>
      <div
        data-c-background="black(10)"
        data-c-border="all(thin, solid, black)"
        data-c-padding="top(normal) right(normal) left(normal)"
        data-c-margin="top(normal) bottom(normal)"
      >
        <h4
          data-c-font-colour="c5"
          data-c-font-weight="bold"
          data-c-font-size="h4"
          data-c-margin="bottom"
        >
          <FormattedMessage
            id="assessmentPlan.summary.assessmentSummary.title"
            defaultMessage="l10n.missing Assessment Summary"
            description="Title of Assessment Plan Summary, Assessment Summary Section"
          />
        </h4>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="assessmentPlan.summary.assessmentSummary.noAssessments"
            defaultMessage="l10n.missing Your plan uses {toolCount, plural, =0 {no tools} one {# tool} other {# tools}}
            to assess {skillCount, plural, =0 {no skills} one {# skill} other {# skills}}."
            description="Place holder text for when there are no assessment summary details"
            values={{
              toolCount: uniqueAssessmentTypes.length,
              skillCount: criteria.length,
            }}
          />
        </p>
        {/* Assessment Null State ------------------------------------ */}
        {assessments.length === 0 && (
          <div
            data-c-radius="rounded"
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-padding="normal"
            data-c-alignment="base(center)"
            data-c-margin="bottom(normal)"
          >
            <span data-c-font-colour="black">
              <FormattedMessage
                id="assessmentPlan.summary.assessmentSummary.noAssessments"
                defaultMessage="l10n.missing You have no assessments selected for this job poster. Add them
              above."
                description="Place holder text for when there are no assessment summary details"
              />
            </span>
          </div>
        )}
        {/* Assessment Tool - To be repeated for each tool. ---------- */}
        {uniqueAssessmentTypes.map(assessmentTypeId => {
          const assessmentsOfThisType = assessments.filter(
            assessment => assessment.assessment_type_id === assessmentTypeId,
          );
          const associatedCriteria = assessmentsOfThisType
            .map(assessment => find(criteria, assessment.criterion_id))
            .filter(criterion => criterion != null) as Criteria[];
          return renderAssessmentTypeBlock(
            assessmentTypeId,
            intl.formatMessage(assessmentType(assessmentTypeId)),
            associatedCriteria,
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default injectIntl(AssessmentPlanTable);

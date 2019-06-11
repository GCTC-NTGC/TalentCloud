import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Criteria, Assessment, Skill } from "../../models/types";
import { find } from "../../helpers/queries";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { assessmentType } from "../../models/localizedConstants";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import { RootState } from "../../store/store";
import { getCriteriaByJob } from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelectorComplex";

interface AssessmentPlanTableProps {
  /** All assessments to be displayed in this table */
  assessments: Assessment[];
  /** All criteria associated with assessments  */
  criteria: Criteria[];
  /** All skills */
  skills: Skill[];
}

const renderAssessmentTypeBlock = (
  assessmentTypeId: number,
  assessmentTypeName: string,
  criteria: Criteria[],
  skills: Skill[],
  locale: string,
): React.ReactElement => {
  const essentialSkills: Skill[] = criteria
    .filter(
      (criterion): boolean =>
        criterion.criteria_type_id === CriteriaTypeId.Essential,
    )
    .map((criterion): Skill => find(skills, criterion.skill_id) as Skill);
  const assetSkills: Skill[] = criteria
    .filter(
      (criterion): boolean =>
        criterion.criteria_type_id === CriteriaTypeId.Asset,
    )
    .map((criterion): Skill => find(skills, criterion.skill_id) as Skill);
  return (
    <div
      key={`assessmentSummary_type${assessmentTypeId}`}
      data-c-border="top(thin, solid, black)"
      data-c-margin="top(normal) bottom(normal)"
    >
      <div data-c-grid="gutter">
        <div data-c-grid-item="tl(1of3)">
          <h5
            data-c-font-size="h4"
            data-c-margin="top(normal) bottom(normal)"
            data-c-font-weight="600"
            data-c-colour="c5"
          >
            {assessmentTypeName}
          </h5>
          <span data-c-font-weight="bold" data-c-margin="bottom(half)">
            <FormattedMessage
              id="assessmentPlan.summary.skillCount"
              defaultMessage={`Assessing {count, plural,
                one {# skill}
                other {# skills}
              }.`}
              description="Labels how many skills are assessed by this assessment tool."
              values={{ count: criteria.length }}
            />
          </span>
        </div>
        <div data-c-grid-item="tl(1of3)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal) bottom(normal)">
            <FormattedMessage
              id="criteria.essential"
              defaultMessage="Essential Skills"
              description="What essential criteria are called."
            />
          </h5>
          {essentialSkills.length === 0 && (
            <p data-c-font-size="small">
              <FormattedMessage
                id="assessmentPlan.summary.skillsNullState"
                defaultMessage="No skills being assessed by this tool."
                description="Replaces list of skills assessed by an assessment tool, if that list is empty."
              />
            </p>
          )}
          <ul data-c-font-size="small">
            {essentialSkills.map(
              (skill): React.ReactElement => (
                <li
                  key={`assessmentSummary_type${assessmentTypeId}_essential_skill${
                    skill.id
                  }`}
                >
                  {skill[locale].name}
                </li>
              ),
            )}
          </ul>
        </div>
        <div data-c-grid-item="tl(1of3)">
          <h5 data-c-font-size="h4" data-c-margin="top(normal) bottom(normal)">
            <FormattedMessage
              id="criteria.asset"
              defaultMessage="Asset Skills"
              description="What asset criteria are called."
            />
          </h5>
          {assetSkills.length === 0 && (
            <p data-c-font-size="small">
              <FormattedMessage
                id="assessmentPlan.summary.skillsNullState"
                defaultMessage="No skills being assessed by this tool."
                description="Replaces list of skills assessed by an assessment tool, if that list is empty."
              />
            </p>
          )}
          <ul data-c-font-size="small">
            {assetSkills.map(
              (skill): React.ReactElement => (
                <li
                  key={`assessmentSummary_type${assessmentTypeId}_asset_skill${
                    skill.id
                  }`}
                >
                  {skill[locale].name}
                </li>
              ),
            )}
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
  skills,
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
          defaultMessage="2. Assessment Plan Summary"
          description="Title of Assessment Plan Summary Section"
        />
      </h3>
      <p data-c-margin="bottom(normal)">
        <FormattedMessage
          id="assessmentPlan.summary.description"
          defaultMessage="This is a summary of the work you've done above. You'll find
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
          data-c-colour="c5"
          data-c-font-weight="bold"
          data-c-font-size="h4"
          data-c-margin="bottom"
        >
          <FormattedMessage
            id="assessmentPlan.summary.assessmentSummary.title"
            defaultMessage="Assessment Summary"
            description="Title of Assessment Plan Summary, Assessment Summary Section"
          />
        </h4>
        <p data-c-margin="bottom(normal)">
          <FormattedMessage
            id="assessmentPlan.summary.assessmentSummary.toolSkillCount"
            defaultMessage="Your plan uses {toolCount, plural, =0 {no tools} one {# tool} other {# tools}}
            to assess {skillCount, plural, =0 {no skills} one {# skill} other {# skills}}."
            description="Describes how many tools and skills your assessment plan involves."
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
            <span data-c-colour="black">
              <FormattedMessage
                id="assessmentPlan.summary.assessmentSummary.noAssessments"
                defaultMessage="You have no assessments selected for this job poster. Add them
              above."
                description="Place holder text for when there are no assessment summary details"
              />
            </span>
          </div>
        )}
        {/* Assessment Tool - To be repeated for each tool. ---------- */}
        {uniqueAssessmentTypes.map(
          (assessmentTypeId): React.ReactElement => {
            const assessmentsOfThisType = assessments.filter(
              (assessment): boolean =>
                assessment.assessment_type_id === assessmentTypeId,
            );
            const associatedCriteria = assessmentsOfThisType
              .map(
                (assessment): Criteria | null =>
                  find(criteria, assessment.criterion_id),
              )
              .filter((criterion): boolean => criterion != null) as Criteria[];
            return renderAssessmentTypeBlock(
              assessmentTypeId,
              intl.formatMessage(assessmentType(assessmentTypeId)),
              associatedCriteria,
              skills,
              intl.locale,
            );
          },
        )}
      </div>
    </React.Fragment>
  );
};

interface AssessmentPlanTableContainerProps {
  jobId: number;
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanTableContainerProps,
): {
  assessments: Assessment[];
  criteria: Criteria[];
  skills: Skill[];
} => ({
  criteria: getCriteriaByJob(state, ownProps),
  assessments: getAssessmentsByJob(state, ownProps),
  skills: getSkills(state),
});
// @ts-ignore
const AssessmentPlanTableContainer: React.FunctionComponent<
  AssessmentPlanTableContainerProps
> = connect(mapStateToProps)(injectIntl(AssessmentPlanTable));

export default AssessmentPlanTableContainer;

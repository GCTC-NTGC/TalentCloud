import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Job, Criteria, Assessment } from "../types";
import { CriteriaTypeId } from "../lookupConstants";
import AssessmentPlanSkill from "./AssessmentPlanSkill";

interface AssessmentPlanProps {
  job: Job;
  criteria: Criteria[];
  assessments: Assessment[];
}

const renderAssessmentPlanSkill = (
  criterion: Criteria,
  assessments: Assessment[]
): React.ReactElement => {
  const assementTypeIds = assessments
    .filter(assessment => assessment.criterion_id === criterion.id)
    .map(assessment => assessment.assessment_type_id);
  return (
    <AssessmentPlanSkill
      key={criterion.id}
      criterion={criterion}
      assessmentTypeIds={assementTypeIds}
      addAssessmentType={(assessmentTypeId: number) =>
        console.log(assessmentTypeId)
      }
      removeAssessmentType={(assessmentTypeId: number) =>
        console.log(assessmentTypeId)
      }
    />
  );
};

const AssessmentPlan: React.FunctionComponent<
  AssessmentPlanProps & InjectedIntlProps
> = ({
  job,
  criteria,
  assessments,
  intl
}: AssessmentPlanProps & InjectedIntlProps): React.ReactElement => {
  const assetCriteria = criteria.filter(
    criterion => criterion.criteria_type_id == CriteriaTypeId.Asset
  );
  const essentialCriteria = criteria.filter(
    criterion => criterion.criteria_type_id == CriteriaTypeId.Essential
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
          Generate an assessment plan for:
          <span data-c-font-colour="c5" data-c-font-size="h3">
            {job.title}
          </span>
        </h3>
        <p data-c-margin="bottom(normal)">
          This tool allows you to build an assessment plan and a ratings guide
          for your job poster. The tool is used in 3 steps:
        </p>
        <ol data-c-margin="bottom(normal)">
          <li>
            <strong>Assessment Plan Builder</strong> (Select your assessments)
          </li>
          <li>
            <strong>Assessment Plan Summary</strong> (Review your plan)
          </li>
          <li>
            <strong>Ratings Guide Builder</strong> (Customize your evaluations)
          </li>
        </ol>
        <p>
          Please note that all assessment plans will include a review of the
          narrative evidence provided by the applicant.
        </p>
        <div
          data-c-alert="error"
          data-c-radius="rounded"
          data-c-padding="half"
          role="alert"
          data-c-margin="top(double)"
        >
          <span
            data-c-margin="bottom(quarter)"
            data-c-heading="h5"
            data-c-font-weight="bold"
          >
            <i aria-hidden="true" className="fa fa-exclamation-circle" />
            Optional Alert Title
          </span>

          <p>
            This is a sample error alert. These alerts are used to display
            critical system and form errors.
          </p>
        </div>

        {/* Assessment Plan Builder ====================================== */}
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="top(triple) bottom(normal)"
        >
          1. Assessment Plan Builder
        </h3>
        <p data-c-margin="bottom(normal)">
          Your first step is to pick some assessments that will allow you to
          evaluate the criteria you{"'"}ve selected for your job poster. Below
          you{"'"}ll find your essential criteria, followed by your asset
          criteria if you{"'"}ve selected any. The builder will save as you go,
          so when you{"'"}re finished, feel free to move to step 2 to review
          your work.
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
          >
            Essential Skills
          </h4>
          <div
            data-c-radius="rounded"
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-padding="normal"
            data-c-alignment="base(center)"
            data-c-margin="top(normal) bottom(normal)"
          >
            {essentialCriteria.map(criterion =>
              renderAssessmentPlanSkill(criterion, assessments)
            )}
            {essentialCriteria.length === 0 && (
              <span data-c-font-colour="black">
                You have no essential skills selected for this job poster.
              </span>
            )}
          </div>
          <h4
            data-c-font-colour="c5"
            data-c-font-weight="bold"
            data-c-font-size="h4"
          >
            Asset Skills
          </h4>
          <div
            data-c-radius="rounded"
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-padding="normal"
            data-c-alignment="base(center)"
            data-c-margin="top(normal) bottom(normal)"
          >
            {assetCriteria.map(criterion =>
              renderAssessmentPlanSkill(criterion, assessments)
            )}
            {assetCriteria.length === 0 && (
              <span data-c-font-colour="black">
                You have no asset skills selected for this job poster.
              </span>
            )}
          </div>
        </div>

        {/* Generated Assessment Plan ==================================== */}
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="top(triple) bottom(normal)"
        >
          2. Assessment Plan Summary
        </h3>
        <p data-c-margin="bottom(normal)">
          This is a summary of the work you{"'"}ve done above. You{"'"}ll find
          each assessment accompanied by a consolidated list of the essential
          and asset skills attached to it.
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
            Assessment Summary
          </h4>
          <p data-c-margin="bottom(normal)">
            Your plan uses <strong>4</strong> tools to assess <strong>6</strong>{" "}
            skills.
          </p>
          {/* Assessment Null State ------------------------------------ */}
          <div
            data-c-radius="rounded"
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-padding="normal"
            data-c-alignment="base(center)"
            data-c-margin="bottom(normal)"
          >
            <span data-c-font-colour="black">
              You have no assessments selected for this job poster. Add them
              above.
            </span>
          </div>
          {/* Assessment Tool - To be repeated for each tool. ---------- */}
          <div
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
                  Narrative Review
                </h5>
                <span data-c-font-weight="bold" data-c-margin="bottom(half)">
                  Assessing 4 skills.
                </span>
              </div>
              <div data-c-grid-item="tl(1of3)">
                <h5
                  data-c-font-size="h4"
                  data-c-margin="top(normal) bottom(normal)"
                >
                  Essential Skills
                </h5>
                <p data-c-font-size="small">
                  No skills being assessed by this tool.
                </p>
                <ul data-c-font-size="small">
                  <li>Skill Name 01</li>
                  <li>Skill Name 02</li>
                  <li>Skill Name 03</li>
                </ul>
              </div>
              <div data-c-grid-item="tl(1of3)">
                <h5
                  data-c-font-size="h4"
                  data-c-margin="top(normal) bottom(normal)"
                >
                  Asset Skills
                </h5>
                <p data-c-font-size="small">
                  No skills being assessed by this tool.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings Guide Builder ======================================== */}
        <h3
          data-c-font-size="h3"
          data-c-font-weight="bold"
          data-c-margin="top(triple) bottom(normal)"
        >
          3. Ratings Guide Builder
        </h3>
        <p data-c-margin="bottom(normal)">
          Below you will create your own ratings guide tool to help you assess
          your candidates. This tool allows you to build your own
          questions/evaluations for each assessment you{"'"}ve selected above,
          and then allows you to jot down the criteria for what a great
          candidate response might be. Please note that {'"'}Narrative Review
          {'"'} is unique in that the content is generated for you below.
        </p>

        {/* Narrative Review (Edge Case) --------------------------------- */}
        <div>
          <h4
            data-c-font-size="h4"
            data-c-font-colour="c5"
            data-c-font-weight="bold"
            data-c-margin="top(double) bottom(normal)"
          >
            Assessment 01: Narrative Review
          </h4>
          <p>
            The goal of a narrative review is to read the content the applicant
            has provided for each skill to get a better understanding of their
            level and competence.
          </p>
          {/* Static Narrative Outline */}
          <div
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-margin="top(normal) bottom(normal)"
            data-c-padding="bottom(normal)"
          >
            {/* Actual Question */}
            <div
              data-c-background="black(10)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="top(normal) bottom(normal)"
            >
              <div data-c-grid="gutter middle">
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <strong>1</strong>
                </div>
                <div data-c-grid-item="base(1of1) tp(7of8)">
                  <p data-c-font-weight="800">
                    Narrative Review of skill includes all descriptions added by
                    the applicant in their application.
                  </p>
                </div>
              </div>
            </div>
            {/* Skill Evaluations repeat this for all skills that area attached to narrative review. */}
            <div data-c-padding="top(normal)">
              <div data-c-grid="gutter middle">
                <div data-c-grid-item="base(1of1) tp(1of8)" />
                <div data-c-grid-item="base(1of1) tp(2of8)">Skill Name</div>
                <div data-c-grid-item="base(1of1) tp(5of8)">
                  Standardized Evaluation Statement
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evaluation Builder ------------------------------------------- */}
        <div>
          <h4
            data-c-font-size="h4"
            data-c-font-colour="c5"
            data-c-font-weight="bold"
            data-c-margin="top(double) bottom(normal)"
          >
            Assessment 02: Interview
          </h4>
          <p>
            The goal of a narrative review is to read the content the applicant
            has provided for each skill to get a better understanding of their
            level and competence.
          </p>
          {/* Evaluation Question - To be repeated as needed ----------- */}
          <div
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-margin="top(normal) bottom(normal)"
            data-c-padding="bottom(normal)"
          >
            {/* Actual Question */}
            <div
              data-c-background="black(10)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="top(normal) bottom(normal)"
            >
              <div data-c-grid="gutter middle">
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <strong>1</strong>
                </div>
                <div data-c-grid-item="base(1of1) tp(6of8)">
                  <div data-c-input="text">
                    <label htmlFor="TI2">Interview Question</label>
                    <span>Required</span>
                    <div>
                      <input
                        data-c-font-weight="800"
                        id="TI2"
                        placeholder="Write your interview question here..."
                        type="text"
                      />
                    </div>
                    <span>This input has an error.</span>
                  </div>
                </div>
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <button className="button-trash" type="button">
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </div>
            </div>
            {/* Skill Evaluations */}
            <div data-c-padding="top(normal)">
              <div data-c-grid="gutter middle">
                <div data-c-grid-item="base(1of1) tp(1of8)" />
                <div data-c-grid-item="base(1of1) tp(2of8)">
                  <div data-c-input="select">
                    <label htmlFor="SEL2">Select a Skill</label>
                    <span>Required</span>
                    <div>
                      <i className="fa fa-caret-down" />
                      <select id="SEL2">
                        <option selected>Select a Skill...</option>
                        <option>Skill 01</option>
                        <option>Skill 02</option>
                        <option>Skill 03</option>
                      </select>
                    </div>
                    <span>This input has an error.</span>
                  </div>
                </div>
                <div data-c-grid-item="base(1of1) tp(4of8)">
                  <div data-c-input="text">
                    <label htmlFor="TI3">Acceptable Passing Answer</label>
                    <span>Required</span>
                    <div>
                      <input
                        id="TI3"
                        placeholder="Write the expected answer to pass the applicant on this skill..."
                        type="text"
                      />
                    </div>
                    <span>This input has an error.</span>
                  </div>
                </div>
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <button className="button-trash" type="button">
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </div>
              {/* New skills get added above here. */}
              <div data-c-grid="gutter middle">
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <button className="button-plus" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* New questions get added here, before the content below. */}
          <div data-c-alignment="center" data-c-margin="bottom(normal)">
            <span data-c-font-weight="bold">
              1 Essential Missing: <span data-c-font-colour="stop">SKILL</span>,
            </span>
            <span data-c-font-weight="bold">0 Asset Missing</span>
          </div>
          <div data-c-alignment="center">
            <button
              data-c-button="solid(c5)"
              data-c-radius="rounded"
              type="button"
            >
              Add a Question
            </button>
          </div>
        </div>

        {/* Copy Content & Button ======================================== */}

        <hr data-c-margin="top(double) bottom(double)" />

        <p data-c-margin="top(normal) bottom(normal)">
          Now that you{"'"}ve built your Ratings Guide, you can use the button
          below to copy the entire thing to your clipboard, making it easy to
          paste in your favourite Word Processor.
        </p>

        <div data-c-alignment="center">
          <button data-c-button="solid(c5)" type="button">
            Click to Copy This Ratings Guide to Your Clipboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default injectIntl(AssessmentPlan);

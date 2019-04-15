import React from "react";
import {
  Criteria,
  Assessment,
  RatingsGuideQuestion,
  RatingsGuideAnswer,
} from "../../models/types";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import RatingsGuideAssessment from "./RatingsGuideAssessment";
import { find } from "../../helpers/queries";

interface RatingsGuildeBuilderProps {
  criteria: Criteria[];
  assessments: Assessment[];
  questions: RatingsGuideQuestion[];
  answers: RatingsGuideAnswer[];
}

const RatingsGuideBuilder: React.FunctionComponent<
  RatingsGuildeBuilderProps
> = ({ criteria, assessments, questions, answers }): React.ReactElement => {
  return (
    <div>
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
        questions/evaluations for each assessment you{"'"}ve selected above, and
        then allows you to jot down the criteria for what a great candidate
        response might be. Please note that {'"'}Narrative Review
        {'"'} is unique in that the content is generated for you below.
      </p>

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

        <div
          data-c-background="black(10)"
          data-c-border="all(thin, solid, black)"
          data-c-margin="top(normal) bottom(normal)"
          data-c-padding="bottom(normal)"
        >
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

      {getUniqueAssessmentTypes(assessments).map((assessmentTypeId, index) => {
        const matchingAssessments = assessments.filter(
          assessment => assessment.assessment_type_id === assessmentTypeId,
        );
        const requiredCriteria = matchingAssessments
          .map(assessment => find(criteria, assessment.criterion_id))
          .filter(criterion => criterion != null) as Criteria[];
        return (
          <RatingsGuideAssessment
            key={assessmentTypeId}
            assessmentIndex={index + 1}
            assessmentTypeId={assessmentTypeId}
            questions={questions.filter(
              question => question.assessment_type_id === assessmentTypeId,
            )}
            requiredCriteria={requiredCriteria}
            ratingsGuideAnswers={answers}
            onQuestionCreate={/** TODO: */ () => {}}
            onAnswerCreate={/** TODO: */ () => {}}
          />
        );
      })}

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
  );
};

export default RatingsGuideBuilder;

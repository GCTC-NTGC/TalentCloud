import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import {
  RatingGuideAnswer,
  Criteria,
  RatingGuideQuestion,
  Skill,
} from "../../models/types";
import { assessmentType } from "../../models/localizedConstants";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { where } from "../../helpers/queries";
import RatingGuideQuestionComponent from "./RatingGuideQuestion";
import RatingGuideAnswerComponent from "./RatingGuideAnswer";

interface RatingGuideAssessmentProps {
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  /** The assessment tool used with this assessment question */
  assessmentTypeId: number;
  /** The interview questions to be asked during this assessment */
  questions: RatingGuideQuestion[];
  /** The Criteria this question is expected to assess */
  requiredCriteria: Criteria[];
  /** The expecteds answers, for each skill, that will considered a pass */
  RatingGuideAnswers: RatingGuideAnswer[];

  /** Handler function for creating a new RatingGuideQuestion */
  onQuestionCreate: () => void;

  /** Handle function for creating a new RatingGuideAnswer */
  onAnswerCreate: () => void;
}

const RatingGuideAssessment: React.FunctionComponent<
  RatingGuideAssessmentProps & InjectedIntlProps
> = ({
  assessmentIndex,
  assessmentTypeId,
  questions,
  requiredCriteria,
  RatingGuideAnswers,
  onQuestionCreate,
  onAnswerCreate,
  intl,
}): React.ReactElement => {
  const missingCriteria = requiredCriteria.filter(
    criterion =>
      /** Filter out any criteria that have at least one expected answer  */
      where(RatingGuideAnswers, "skill_id", criterion.skill.id).length === 0,
  );
  const missingEssentialSkills = missingCriteria
    .filter(
      criterion => criterion.criteria_type_id === CriteriaTypeId.Essential,
    )
    .map(criterion => criterion.skill);
  const missingAssetSkills = missingCriteria
    .filter(criterion => criterion.criteria_type_id === CriteriaTypeId.Asset)
    .map(criterion => criterion.skill);

  const requiredSkills = requiredCriteria.map(criterion => criterion.skill);
  return (
    <div>
      <h4
        data-c-font-size="h4"
        data-c-font-colour="c5"
        data-c-font-weight="bold"
        data-c-margin="top(double) bottom(normal)"
      >
        Assessment {assessmentIndex}:{" "}
        {intl.formatMessage(assessmentType(assessmentTypeId))}
      </h4>
      <p>
        {/** TODO: this should be assessmentType-specific description. Must be added to localizedConstants file. */}
        The goal of a narrative review is to read the content the applicant has
        provided for each skill to get a better understanding of their level and
        competence.
      </p>

      {questions.map((question, index) => {
        const answers = RatingGuideAnswers.filter(
          answer => answer.rating_guide_question_id === question.id,
        );
        const selectedSkillIds = answers.map(answer => answer.skill_id);
        return (
          <div
            key={question.id}
            data-c-background="black(10)"
            data-c-border="all(thin, solid, black)"
            data-c-margin="top(normal) bottom(normal)"
            data-c-padding="bottom(normal)"
          >
            <RatingGuideQuestionComponent
              key={question.id}
              question={question}
              questionIndex={index + 1}
              onQuestionChange={/** TODO: */ () => {}}
              onQuestionDelete={/** TODO: */ () => {}}
            />

            <div data-c-padding="top(normal)">
              {answers.map(answer => {
                const availableSkills = requiredSkills.filter(skill => {
                  return (
                    answer.skill_id === skill.id ||
                    !selectedSkillIds.includes(skill.id)
                  );
                });
                return (
                  <RatingGuideAnswerComponent
                    key={answer.id}
                    answer={answer}
                    availableSkills={availableSkills}
                    onChange={/** TODO: setup */ () => {}}
                    onDelete={/** TODO: setup */ () => {}}
                  />
                );
              })}

              <div data-c-grid="gutter middle">
                <div
                  data-c-alignment="center"
                  data-c-grid-item="base(1of1) tp(1of8)"
                >
                  <button
                    className="button-plus"
                    type="button"
                    onClick={() => onAnswerCreate()}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {(missingEssentialSkills.length > 0 || missingAssetSkills.length > 0) && (
        <div data-c-alignment="center" data-c-margin="bottom(normal)">
          {missingEssentialSkills.length > 0 && (
            <span data-c-font-weight="bold">
              {missingEssentialSkills.length} Essential Missing:{" "}
              <span data-c-font-colour="stop">
                {missingEssentialSkills
                  .map((skill: Skill): string => skill.name)
                  .join(", ")}
              </span>
              {"   "}
            </span>
          )}
          {missingAssetSkills.length > 0 && (
            <span data-c-font-weight="bold">
              {missingAssetSkills.length} Asset Missing:{" "}
              <span data-c-font-colour="stop">
                {missingAssetSkills
                  .map((skill: Skill): string => skill.name)
                  .join(", ")}
              </span>
            </span>
          )}
        </div>
      )}
      <div data-c-alignment="center">
        <button
          data-c-button="solid(c5)"
          data-c-radius="rounded"
          type="button"
          onClick={() => onQuestionCreate()}
        >
          Add a Question
        </button>
      </div>
    </div>
  );
};

export default injectIntl(RatingGuideAssessment);

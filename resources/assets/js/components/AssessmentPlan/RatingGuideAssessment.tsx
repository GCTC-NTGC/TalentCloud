import React, { ReactElement } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  RatingGuideAnswer,
  Criteria,
  RatingGuideQuestion,
  Skill,
} from "../../models/types";
import { assessmentType } from "../../models/localizedConstants";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { where, mapToObjectTrans, getId } from "../../helpers/queries";
import RatingGuideQuestionComponent from "./RatingGuideQuestion";
import RatingGuideAnswerComponent from "./RatingGuideAnswer";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";

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
  /** A map of criteria id to skills, useful for skill names and description */
  criteriaIdToSkill: { [id: number]: Skill | null };

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
  criteriaIdToSkill,
  intl,
}): React.ReactElement => {
  const missingCriteria = requiredCriteria.filter(
    (criterion): boolean =>
      /** Filter out any criteria that have at least one expected answer  */
      where(RatingGuideAnswers, "criterion_id", criterion.id).length === 0,
  );
  const missingEssentialCriteria = missingCriteria.filter(
    (criterion): boolean =>
      criterion.criteria_type_id === CriteriaTypeId.Essential,
  );
  const missingAssetCriteria = missingCriteria.filter(
    (criterion): boolean => criterion.criteria_type_id === CriteriaTypeId.Asset,
  );
  const critiriaSkillName = (criterion: Criteria): string =>
    criteriaIdToSkill[criterion.id] !== null
      ? (criteriaIdToSkill[criterion.id] as Skill)[intl.locale].name
      : "UNKNOWN SKILL";
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

      {questions.map(
        (question, index): ReactElement => {
          const answers = RatingGuideAnswers.filter(
            (answer): boolean =>
              answer.rating_guide_question_id === question.id,
          );
          const selectedCriteria = answers
            .filter((answer): boolean => answer.criterion_id !== null)
            .map((answer): number => answer.criterion_id as number);
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
                {answers.map(
                  (answer): ReactElement => {
                    // The currently selected criterion, plus anyother unselected criteria
                    const availableCriteria = requiredCriteria.filter(
                      (criterion): boolean => {
                        return (
                          answer.criterion_id === criterion.id ||
                          !selectedCriteria.includes(criterion.id)
                        );
                      },
                    );
                    return (
                      <RatingGuideAnswerComponent
                        key={answer.id}
                        answer={answer}
                        availableCriteria={availableCriteria}
                      />
                    );
                  },
                )}

                <div data-c-grid="gutter middle">
                  <div
                    data-c-alignment="center"
                    data-c-grid-item="base(1of1) tp(1of8)"
                  >
                    <button
                      className="button-plus"
                      type="button"
                      onClick={(): void => onAnswerCreate()}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
      {(missingEssentialCriteria.length > 0 ||
        missingAssetCriteria.length > 0) && (
        <div data-c-alignment="center" data-c-margin="bottom(normal)">
          {missingEssentialCriteria.length > 0 && (
            <span data-c-font-weight="bold">
              {missingEssentialCriteria.length} Essential Missing:{" "}
              <span data-c-font-colour="stop">
                {missingEssentialCriteria.map(critiriaSkillName).join(", ")}
              </span>
              {"   "}
            </span>
          )}
          {missingAssetCriteria.length > 0 && (
            <span data-c-font-weight="bold">
              {missingAssetCriteria.length} Asset Missing:{" "}
              <span data-c-font-colour="stop">
                {missingAssetCriteria.map(critiriaSkillName).join(", ")}
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
          onClick={(): void => onQuestionCreate()}
        >
          Add a Question
        </button>
      </div>
    </div>
  );
};

interface RatingGuideAssessmentContainerProps {
  assessmentIndex: number;
  assessmentTypeId: number;
  questions: RatingGuideQuestion[];
  requiredCriteria: Criteria[];
  RatingGuideAnswers: RatingGuideAnswer[];
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAssessmentContainerProps,
): { criteriaIdToSkill: { [id: number]: Skill | null } } => ({
  criteriaIdToSkill: mapToObjectTrans(
    ownProps.requiredCriteria,
    getId,
    (criterion): Skill | null => getSkillById(state, criterion.skill_id),
  ),
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  onQuestionCreate: () => {},
  onAnswerCreate: () => {},
});

const RatingGuideAssessmentContainer: React.FunctionComponent<
  RatingGuideAssessmentContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RatingGuideAssessment));

export default RatingGuideAssessmentContainer;

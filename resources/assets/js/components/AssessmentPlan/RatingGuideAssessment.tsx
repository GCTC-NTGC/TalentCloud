import React, { ReactElement } from "react";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  RatingGuideAnswer,
  Criteria,
  RatingGuideQuestion,
  TempRatingGuideQuestion,
  Skill,
} from "../../models/types";
import {
  createTempRatingGuideQuestion,
  deleteRatingGuideQuestion,
  deleteTempRatingGuideQuestion,
  editRatingGuideQuestion,
  editTempRatingGuideQuestion,
  storeNewRatingGuideQuestion,
  updateRatingGuideQuestion,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionActions";
import {
  assessmentType,
  assessmentTypeDescription,
} from "../../models/localizedConstants";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { where, mapToObjectTrans, getId } from "../../helpers/queries";
import RatingGuideQuestionComponent from "./RatingGuideQuestion";
import RatingGuideAnswerComponent from "./RatingGuideAnswer";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import {
  getRatingGuideQuestionsByAssessment,
  getTempRatingGuideQuestionsByAssessment,
  ratingGuideQuestionsAreEditedByAssessment,
  ratingGuideQuestionsAreUpdatingByAssessment,
  tempRatingGuideQuestionsAreSavingByAssessment,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";

interface RatingGuideAssessmentProps {
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  /** The assessment tool used with this assessment question */
  assessmentTypeId: number;
  /** The interview questions to be asked during this assessment */
  questions: RatingGuideQuestion[];
  questionsEdited: { [id: number]: boolean };
  questionsUpdating: { [id: number]: boolean };
  tempQuestions: RatingGuideQuestion[];
  tempQuestionsSaving: { [id: number]: boolean };
  /** The expecteds answers, for each skill, that will considered a pass */
  ratingGuideAnswers: RatingGuideAnswer[];
  /** A map of criteria id to skills, useful for skill names and description */
  criteriaIdToSkill: { [id: number]: Skill | null };
  requiredCriteria: Criteria[] | null;
  createQuestion: () => void;
  editQuestion: (newQuestion: RatingGuideQuestion) => void;
  updateQuestion: (newQuestion: RatingGuideQuestion) => void;
  removeQuestion: (questionId: number) => void;
  editTempQuestion: (newQuestion: RatingGuideQuestion) => void;
  saveTempQuestion: (question: RatingGuideQuestion) => void;
  removeTempQuestion: (questionId: number) => void;
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
  tempQuestions,
  tempQuestionsSaving,
  requiredCriteria,
  ratingGuideAnswers,
  createQuestion,
  editQuestion,
  editTempQuestion,
  removeQuestion,
  removeTempQuestion,
  updateQuestion,
  saveTempQuestion,
  questionsUpdating,
  onAnswerCreate,
  criteriaIdToSkill,
  intl,
}): React.ReactElement => {
  let missingCriteria = [] as Criteria[];
  if (requiredCriteria && requiredCriteria.length > 0) {
    missingCriteria = requiredCriteria.filter(
      (criterion: Criteria): boolean =>
        /** Filter out any criteria that have at least one expected answer  */
        where(ratingGuideAnswers, "criterion_id", criterion.id).length === 0,
    );
  }
  let missingEssentialCriteria = [] as Criteria[];
  let missingAssetCriteria = [] as Criteria[];
  if (missingCriteria.length > 0) {
    missingEssentialCriteria = missingCriteria.filter(
      (criterion: Criteria): boolean =>
        criterion.criteria_type_id === CriteriaTypeId.Essential,
    );
    missingAssetCriteria = missingCriteria.filter(
      (criterion: Criteria): boolean =>
        criterion.criteria_type_id === CriteriaTypeId.Asset,
    );
  }
  const criteriaSkillName = (criterion: Criteria): string =>
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
        <FormattedMessage
          id="ratingGuideBuilder.sectionTitle"
          defaultMessage="Assessment {index}: {assessmentType}"
          description="Subtitle for given assessment type section in the Rating Guide Builder."
          values={{
            index: assessmentIndex,
            assessmentType: intl.formatMessage(
              assessmentType(assessmentTypeId),
            ),
          }}
        />
      </h4>
      <p>{intl.formatMessage(assessmentTypeDescription(assessmentTypeId))}</p>

      {questions.map(
        (question: RatingGuideQuestion, index: number): ReactElement => {
          const answers = ratingGuideAnswers.filter(
            (answer: RatingGuideAnswer): boolean =>
              answer.rating_guide_question_id === question.id,
          );
          const selectedCriteria = answers
            .filter(
              (answer: RatingGuideAnswer): boolean =>
                answer.criterion_id !== null,
            )
            .map(
              (answer: RatingGuideAnswer): number =>
                answer.criterion_id as number,
            );
          return (
            <div
              key={question.id}
              data-c-background="black(10)"
              data-c-border="all(thin, solid, black)"
              data-c-margin="top(normal) bottom(normal)"
              data-c-padding="bottom(normal)"
            >
              {}
              <RatingGuideQuestionComponent
                key={question.id}
                question={question}
                questionIndex={index + 1}
                isUpdating={questionsUpdating[question.id]}
                onChange={editQuestion}
                onDelete={removeQuestion}
                onSave={updateQuestion}
              />

              <div data-c-padding="top(normal)">
                {answers.map(
                  (answer: RatingGuideAnswer): ReactElement | false => {
                    // The currently selected criterion, plus anyother unselected criteria
                    let availableCriteria = [] as Criteria[];
                    if (requiredCriteria && requiredCriteria.length > 0) {
                      availableCriteria = requiredCriteria.filter(
                        (criterion: Criteria): boolean => {
                          return (
                            answer.criterion_id === criterion.id ||
                            !selectedCriteria.includes(criterion.id)
                          );
                        },
                      );
                    }
                    return (
                      availableCriteria.length > 0 && (
                        <RatingGuideAnswerComponent
                          key={answer.id}
                          answer={answer}
                          availableCriteria={availableCriteria}
                        />
                      )
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
      {tempQuestions.map(
        (question: RatingGuideQuestion, index: number): ReactElement => {
          const answers = ratingGuideAnswers.filter(
            (answer: RatingGuideAnswer): boolean =>
              answer.rating_guide_question_id === question.id,
          );
          const selectedCriteria = answers
            .filter(
              (answer: RatingGuideAnswer): boolean =>
                answer.criterion_id !== null,
            )
            .map(
              (answer: RatingGuideAnswer): number =>
                answer.criterion_id as number,
            );
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
                isUpdating={tempQuestionsSaving[question.id]}
                onChange={editTempQuestion}
                onDelete={removeTempQuestion}
                onSave={saveTempQuestion}
              />

              <div data-c-padding="top(normal)">
                {answers.map(
                  (answer: RatingGuideAnswer): ReactElement | false => {
                    // The currently selected criterion, plus anyother unselected criteria
                    let availableCriteria = [] as Criteria[];
                    if (requiredCriteria && requiredCriteria.length > 0) {
                      availableCriteria = requiredCriteria.filter(
                        (criterion: Criteria): boolean => {
                          return (
                            answer.criterion_id === criterion.id ||
                            !selectedCriteria.includes(criterion.id)
                          );
                        },
                      );
                    }
                    return (
                      availableCriteria.length > 0 && (
                        <RatingGuideAnswerComponent
                          key={answer.id}
                          answer={answer}
                          availableCriteria={availableCriteria}
                        />
                      )
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
              <FormattedMessage
                id="ratingGuideBuilder.essentialMissing"
                defaultMessage="{count} Essential Missing: "
                description="Label for list of missing essential skills."
                values={{ count: missingEssentialCriteria.length }}
              />
              <span data-c-font-colour="stop">
                {missingEssentialCriteria.map(criteriaSkillName).join(", ")}
              </span>
              {"   "}
            </span>
          )}
          {missingAssetCriteria.length > 0 && (
            <span data-c-font-weight="bold">
              <FormattedMessage
                id="ratingGuideBuilder.assetMissing"
                defaultMessage="{count} Asset Missing: "
                description="Label for list of missing asset skills."
                values={{ count: missingAssetCriteria.length }}
              />
              <span data-c-font-colour="stop">
                {missingAssetCriteria.map(criteriaSkillName).join(", ")}
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
          onClick={(): void => createQuestion()}
        >
          <FormattedMessage
            id="ratingGuideBuilder.addQuestion"
            defaultMessage="Add a Question"
            description="Button text for adding a new rating guide question."
          />
        </button>
      </div>
    </div>
  );
};

interface RatingGuideAssessmentContainerProps {
  assessmentIndex: number;
  assessmentTypeId: number;
  jobId: number | null;
  requiredCriteria: Criteria[];
  ratingGuideAnswers: RatingGuideAnswer[];
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAssessmentContainerProps,
): {
  assessmentIndex: number;
  assessmentTypeId: number;
  criteriaIdToSkill: { [id: number]: Skill | null };
  jobId: number | null;
  questions: RatingGuideQuestion[];
  questionsEdited: { [id: number]: boolean };
  questionsUpdating: { [id: number]: boolean };
  tempQuestions: RatingGuideQuestion[];
  tempQuestionsSaving: { [id: number]: boolean };
  requiredCriteria: Criteria[] | null;
  ratingGuideAnswers: RatingGuideAnswer[];
} => ({
  assessmentIndex: ownProps.assessmentIndex,
  assessmentTypeId: ownProps.assessmentTypeId,
  criteriaIdToSkill: mapToObjectTrans(
    ownProps.requiredCriteria,
    getId,
    (criterion: Criteria): Skill | null =>
      getSkillById(state, criterion.skill_id),
  ),
  jobId: ownProps.jobId,
  questions: getRatingGuideQuestionsByAssessment(
    state,
    ownProps.assessmentTypeId,
  ),
  questionsEdited: ratingGuideQuestionsAreEditedByAssessment(
    state,
    ownProps.assessmentTypeId,
  ),
  questionsUpdating: ratingGuideQuestionsAreUpdatingByAssessment(
    state,
    ownProps.assessmentTypeId,
  ),
  tempQuestions: getTempRatingGuideQuestionsByAssessment(
    state,
    ownProps.assessmentTypeId,
  ),
  tempQuestionsSaving: tempRatingGuideQuestionsAreSavingByAssessment(
    state,
    ownProps.assessmentTypeId,
  ),
  requiredCriteria: ownProps.requiredCriteria,
  ratingGuideAnswers: ownProps.ratingGuideAnswers,
});

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  createQuestion: (): void => {
    dispatch(
      createTempRatingGuideQuestion(
        ownProps.jobId,
        ownProps.assessmentTypeId,
        null,
      ),
    );
  },
  editQuestion: (ratingGuideQuestion: RatingGuideQuestion): void => {
    dispatch(editRatingGuideQuestion(ratingGuideQuestion));
  },
  updateQuestion: (ratingGuideQuestion: RatingGuideQuestion): void =>
    dispatch(updateRatingGuideQuestion(ratingGuideQuestion)),
  removeQuestion: (ratingGuideQuestionId: number): void => {
    dispatch(deleteRatingGuideQuestion(ratingGuideQuestionId));
  },
  editTempQuestion: (ratingGuideQuestion: TempRatingGuideQuestion): void => {
    dispatch(editTempRatingGuideQuestion(ratingGuideQuestion));
  },
  removeTempQuestion: (id: number): void => {
    dispatch(deleteTempRatingGuideQuestion(id));
  },
  saveTempQuestion: (ratingGuideQuestion: RatingGuideQuestion): void => {
    dispatch(storeNewRatingGuideQuestion(ratingGuideQuestion));
  },
});

const RatingGuideAssessmentContainer: React.FunctionComponent<
  RatingGuideAssessmentContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RatingGuideAssessment));

export default RatingGuideAssessmentContainer;

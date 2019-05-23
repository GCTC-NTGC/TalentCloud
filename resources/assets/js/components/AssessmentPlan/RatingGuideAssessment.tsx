import React, { ReactElement } from "react";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Criteria, Skill } from "../../models/types";
import { createTempRatingGuideQuestion } from "../../store/RatingGuideQuestion/ratingGuideQuestionActions";
import {
  assessmentType,
  assessmentTypeDescription,
} from "../../models/localizedConstants";
import { CriteriaTypeId } from "../../models/lookupConstants";
import { mapToObjectTrans, getId } from "../../helpers/queries";
import { RootState } from "../../store/store";
import { getSkillById } from "../../store/Skill/skillSelector";
import { DispatchType } from "../../configureStore";
import {
  getRatingGuideQuestionsByAssessment,
  getTempRatingGuideQuestionsByAssessment,
} from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import RatingGuideQuestionWithAnswers from "./RatingGuideQuestionWithAnswers";

interface RatingGuideAssessmentProps {
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  /** The assessment tool used with this assessment question */
  assessmentTypeId: number;
  /** The ids of interview questions to be asked during this assessment */
  questionIds: number[];
  /** Ids of interview questions that have not been saved to the server */
  tempQuestionIds: number[];
  /** A map of criteria id to skills, useful for skill names and description */
  criteriaIdToSkill: { [id: number]: Skill | null };
  /** Handler function for creating a new RatingGuideQuestion */
  createQuestion: () => void;
}

const RatingGuideAssessment: React.FunctionComponent<
  RatingGuideAssessmentProps & InjectedIntlProps
> = ({
  assessmentIndex,
  assessmentTypeId,
  questionIds,
  createQuestion,
  tempQuestionIds,
  criteriaIdToSkill,
  intl,
}): React.ReactElement => {
  const missingCriteria: Criteria[] = [];
  // if (requiredCriteria && requiredCriteria.length > 0) {
  //   missingCriteria = requiredCriteria.filter(
  //     (criterion: Criteria): boolean =>
  //       /** Filter out any criteria that have at least one expected answer  */
  //       where(ratingGuideAnswers, "criterion_id", criterion.id).length === 0,
  //   );
  // }
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
        data-c-colour="c5"
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

      {questionIds.map(
        (questionId: number, index: number): ReactElement => (
          <RatingGuideQuestionWithAnswers
            key={`question${questionId}`}
            questionId={questionId}
            questionIndex={index}
          />
        ),
      )}
      {tempQuestionIds.map(
        (questionId: number, index: number): ReactElement => (
          <RatingGuideQuestionWithAnswers
            key={`tempQuestion${questionId}`}
            questionId={questionId}
            questionIndex={questionIds.length + index}
            temp
          />
        ),
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
              <span data-c-colour="stop">
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
              <span data-c-colour="stop">
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
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAssessmentContainerProps,
): {
  assessmentIndex: number;
  assessmentTypeId: number;
  criteriaIdToSkill: { [id: number]: Skill | null };
  jobId: number | null;
  questionIds: number[];
  tempQuestionIds: number[];
  requiredCriteria: Criteria[] | null;
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
  questionIds: getRatingGuideQuestionsByAssessment(
    state,
    ownProps.assessmentTypeId,
  ).map(question => question.id),
  tempQuestionIds: getTempRatingGuideQuestionsByAssessment(
    state,
    ownProps.assessmentTypeId,
  ).map(question => question.id),
  requiredCriteria: ownProps.requiredCriteria,
});

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps,
): {
  createQuestion: () => void;
} => ({
  createQuestion: (): void => {
    dispatch(
      createTempRatingGuideQuestion(
        ownProps.jobId,
        ownProps.assessmentTypeId,
        null,
      ),
    );
  },
});
// @ts-ignore
const RatingGuideAssessmentContainer: React.FunctionComponent<
  RatingGuideAssessmentContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(RatingGuideAssessment));

export default RatingGuideAssessmentContainer;

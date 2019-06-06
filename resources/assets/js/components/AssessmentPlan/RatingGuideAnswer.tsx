/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { connect } from "react-redux";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import {
  RatingGuideAnswer as RatingGuideAnswerModel,
  Skill,
  Criteria,
} from "../../models/types";
import Select, { SelectOption } from "../Select";
import UpdatingTextArea from "../UpdatingTextArea";
import { getId, hasKey } from "../../helpers/queries";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import {
  editTempRatingGuideAnswer,
  editRatingGuideAnswer,
  updateRatingGuideAnswer,
  storeNewRatingGuideAnswer,
  deleteTempRatingGuideAnswer,
  deleteRatingGuideAnswer,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerActions";
import {
  ratingGuideAnswerIsEdited,
  ratingGuideAnswerIsUpdating,
  getRatingGuideAnswerById,
  getTempRatingGuideAnswerById,
  tempRatingGuideAnswerIsSaving,
} from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { getCriteriaById } from "../../store/Job/jobSelector";
import {
  getCriteriaToSkills,
  getCachedCriteriaUnansweredForQuestion,
} from "../../store/Job/jobSelectorComplex";
import { getTranslatedField } from "../../helpers/translation";

interface RatingGuideAnswerProps {
  answer: RatingGuideAnswerModel | null;
  unansweredCriteria: Criteria[];
  answerCriterion: Criteria | null;
  criteriaIdToSkill: { [id: number]: Skill | null };
  temp?: boolean;
  isUpdating: boolean;
  isEdited: boolean;
  editAnswer: (newAnswer: RatingGuideAnswerModel) => void;
  updateAnswer: (updatedAnswer: RatingGuideAnswerModel) => void;
  deleteAnswer: (id: number) => void;
}

const messages = defineMessages({
  selectLabel: {
    id: "ratingGuideAnswer.selectLabel",
    defaultMessage: "Select a Skill",
    description:
      "Label for the dropdown for selecting the skill this rating guide answer is used to assess.",
  },
  nullSelection: {
    id: "ratingGuideAnswer.nullSelection",
    defaultMessage: "Select a Skill...",
    description:
      "Null selection for the dropdown for selecting a skill this rating guide answer is used to assess.",
  },
  inputLabel: {
    id: "ratingGuideAnswer.answerLabel",
    defaultMessage: "Acceptable Passing Answer / Required to demonstrate",
    description: "Label for the rating guide answer input.",
  },
  inputPlaceholder: {
    id: "ratingGuideAnswer.answerPlaceholder",
    defaultMessage:
      "Write the expected answer to pass the applicant on this skill...",
    description: "Placeholder text for the rating guide answer.",
  },
});

const getAvailableCriteria = (
  availableCriteria: Criteria[],
  answerCriterion: Criteria | null,
): Criteria[] => {
  const availableCriteriaIds = availableCriteria.map(getId);
  // If this answer has a selected criteria, it should be considered available
  if (
    answerCriterion === null ||
    availableCriteriaIds.includes(answerCriterion.id)
  ) {
    return availableCriteria;
  }
  return [...availableCriteria, answerCriterion];
};

const RatingGuideAnswer: React.FunctionComponent<
  RatingGuideAnswerProps & InjectedIntlProps
> = ({
  answer,
  unansweredCriteria,
  answerCriterion,
  criteriaIdToSkill,
  isUpdating,
  editAnswer,
  updateAnswer,
  deleteAnswer,
  intl,
}): React.ReactElement | null => {
  if (answer === null) {
    return null;
  }
  const availableCriteria = getAvailableCriteria(
    unansweredCriteria,
    answerCriterion,
  );
  if (availableCriteria.length === 0) {
    return null;
  }
  const options = availableCriteria.map(
    (criterion): SelectOption<number> => {
      return {
        value: criterion.id,
        label:
          hasKey<Skill | null>(criteriaIdToSkill, criterion.id) &&
          criteriaIdToSkill[criterion.id] !== null
            ? getTranslatedField(
                criteriaIdToSkill[criterion.id] as Skill,
                intl.locale,
                "name",
              )
            : "",
      };
    },
  );
  return (
    <div data-c-grid="gutter top">
      <div data-c-grid-item="base(1of1) tp(1of8)" data-c-alignment="center" />
      <div data-c-grid-item="base(1of1) tp(2of8)">
        <Select
          htmlId={`ratingGuideSelectSkill_${answer.id}`}
          formName="ratingGuideSelectSkill"
          label={intl.formatMessage(messages.selectLabel)}
          required
          options={options}
          onChange={(event): void =>
            updateAnswer({
              ...answer,
              criterion_id: event.target.value
                ? Number(event.target.value)
                : null,
            })
          }
          selected={answer.criterion_id}
          nullSelection={intl.formatMessage(messages.nullSelection)}
        />
      </div>
      <div data-c-grid-item="base(1of1) tp(4of8)">
        <UpdatingTextArea
          htmlId={`ratingGuideAnswer${answer.id}`}
          formName="ratingGuideAnswer"
          label={intl.formatMessage(messages.inputLabel)}
          required
          placeholder={intl.formatMessage(messages.inputPlaceholder)}
          value={answer.expected_answer || ""}
          updateDelay={500}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            const newAnswer = String(event.target.value);
            editAnswer({
              ...answer,
              expected_answer: newAnswer,
            });
          }}
          handleSave={(): void => {
            updateAnswer(answer);
          }}
        />
      </div>
      <div data-c-alignment="center" data-c-grid-item="base(1of1) tp(1of8)">
        <button
          className="button-trash"
          type="button"
          onClick={(): void => deleteAnswer(answer.id)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <i className="fa fa-spinner fa-spin" />
          ) : (
            <i className="fa fa-trash" />
          )}
        </button>
      </div>
    </div>
  );
};

const getAnswer = (
  state: RootState,
  answerId: number,
  temp?: boolean,
): RatingGuideAnswerModel | null =>
  temp
    ? getTempRatingGuideAnswerById(state, { answerId })
    : getRatingGuideAnswerById(state, { answerId });

interface RatingGuideAnswerContainerProps {
  answerId: number;
  temp?: boolean;
}

const emptyCriteria: Criteria[] = [];

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAnswerContainerProps,
): {
  answer: RatingGuideAnswerModel | null;
  unansweredCriteria: Criteria[];
  answerCriterion: Criteria | null;
  criteriaIdToSkill: { [id: number]: Skill | null };
  temp?: boolean;
  isUpdating: boolean;
  isEdited: boolean;
} => {
  const answer = getAnswer(state, ownProps.answerId, ownProps.temp);
  return {
    answer,
    unansweredCriteria: answer
      ? getCachedCriteriaUnansweredForQuestion(state, {
          questionId: answer.rating_guide_question_id,
          isTempQuestion: false,
        })
      : emptyCriteria,
    answerCriterion:
      answer && answer.criterion_id
        ? getCriteriaById(state, { criterionId: answer.criterion_id })
        : null,
    criteriaIdToSkill: getCriteriaToSkills(state),
    isEdited: ratingGuideAnswerIsEdited(state, ownProps),
    isUpdating: ownProps.temp
      ? tempRatingGuideAnswerIsSaving(state, ownProps.answerId)
      : ratingGuideAnswerIsUpdating(state, ownProps.answerId),
  };
};

const mapDispatchToProps = (dispatch: DispatchType, ownProps): any => ({
  editAnswer: ownProps.temp
    ? (ratingGuideAnswer: RatingGuideAnswerModel): void => {
        dispatch(editTempRatingGuideAnswer(ratingGuideAnswer));
      }
    : (ratingGuideAnswer: RatingGuideAnswerModel): void => {
        dispatch(editRatingGuideAnswer(ratingGuideAnswer));
      },
  updateAnswer: ownProps.temp
    ? (ratingGuideAnswer: RatingGuideAnswerModel): void => {
        // We must also edit the local temp answer, because it will be checked
        // against the updated version when the store request succeeds.
        dispatch(editTempRatingGuideAnswer(ratingGuideAnswer));
        dispatch(storeNewRatingGuideAnswer(ratingGuideAnswer));
      }
    : (ratingGuideAnswer: RatingGuideAnswerModel): void =>
        dispatch(updateRatingGuideAnswer(ratingGuideAnswer)),
  deleteAnswer: ownProps.temp
    ? (id: number): void => {
        dispatch(deleteTempRatingGuideAnswer(id));
      }
    : (ratingGuideAnswerId: number): void => {
        dispatch(deleteRatingGuideAnswer(ratingGuideAnswerId));
      },
  // This is only possibly used by mergeProps
  editTempAnswer: (ratingGuideAnswer: RatingGuideAnswerModel): void => {
    dispatch(editTempRatingGuideAnswer(ratingGuideAnswer));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  // If this is a currently saving temp answer, ensure we don't launch another store request
  updateAnswer:
    ownProps.temp && stateProps.isUpdating
      ? dispatchProps.editTempAnswer
      : dispatchProps.updateAnswer,
});
// @ts-ignore
const RatingGuideAnswerContainer: React.FunctionComponent<
  RatingGuideAnswerContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(injectIntl(RatingGuideAnswer));

export default RatingGuideAnswerContainer;

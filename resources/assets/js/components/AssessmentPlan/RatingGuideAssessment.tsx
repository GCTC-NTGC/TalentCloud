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
import RatingGuideMissing from "./RatingGuideMissing";

interface RatingGuideAssessmentProps {
  /** The id of the job Job Poster this is part of */
  jobId: number | null;
  /** Display index of this ratings guide assessment compared to others on the page */
  assessmentIndex: number;
  /** The assessment tool used with this assessment question */
  assessmentTypeId: number;
  /** The ids of interview questions to be asked during this assessment */
  questionIds: number[];
  /** Ids of interview questions that have not been saved to the server */
  tempQuestionIds: number[];
  /** Handler function for creating a new RatingGuideQuestion */
  createQuestion: () => void;
}

const RatingGuideAssessment: React.FunctionComponent<
  RatingGuideAssessmentProps & InjectedIntlProps
> = ({
  jobId,
  assessmentIndex,
  assessmentTypeId,
  questionIds,
  createQuestion,
  tempQuestionIds,
  intl,
}): React.ReactElement | null => {
  if (jobId === null) {
    return null;
  }
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
            questionIndex={index + 1}
          />
        ),
      )}
      {tempQuestionIds.map(
        (questionId: number, index: number): ReactElement => (
          <RatingGuideQuestionWithAnswers
            key={`tempQuestion${questionId}`}
            questionId={questionId}
            questionIndex={questionIds.length + index + 1}
            temp
          />
        ),
      )}
      <RatingGuideMissing jobId={jobId} assessmentTypeId={assessmentTypeId} />
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
}

const mapStateToProps = (
  state: RootState,
  ownProps: RatingGuideAssessmentContainerProps,
): {
  assessmentIndex: number;
  assessmentTypeId: number;
  jobId: number | null;
  questionIds: number[];
  tempQuestionIds: number[];
} => ({
  assessmentIndex: ownProps.assessmentIndex,
  assessmentTypeId: ownProps.assessmentTypeId,
  jobId: ownProps.jobId,
  questionIds: ownProps.jobId
    ? getRatingGuideQuestionsByAssessment(
        state,
        ownProps.jobId,
        ownProps.assessmentTypeId,
      ).map(question => question.id)
    : [],
  tempQuestionIds: ownProps.jobId
    ? getTempRatingGuideQuestionsByAssessment(
        state,
        ownProps.jobId,
        ownProps.assessmentTypeId,
      ).map(question => question.id)
    : [],
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

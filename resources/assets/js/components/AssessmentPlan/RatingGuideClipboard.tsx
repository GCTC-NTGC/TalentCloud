import React from "react";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { RootState } from "../../store/store";
import {
  Criteria,
  Assessment,
  RatingGuideQuestion,
  RatingGuideAnswer,
  Skill,
} from "../../models/types";
import {
  skillLevelName,
  criteriaType,
  assessmentType,
} from "../../models/localizedConstants";
import { getUniqueAssessmentTypes } from "./assessmentHelpers";
import RatingGuideAssessment from "./RatingGuideAssessment";
import { find } from "../../helpers/queries";
import { number } from "prop-types";
import { getAssessmentsByJob } from "../../store/Assessment/assessmentSelector";
import { getCriteriaByJob } from "../../store/Job/jobSelector";
import { getSkills } from "../../store/Skill/skillSelector";
import { getRatingGuideQuestionsByJob } from "../../store/RatingGuideQuestion/ratingGuideQuestionSelectors";
import { getRatingGuideAnswersByJob } from "../../store/RatingGuideAnswer/ratingGuideAnswerSelectors";
import { connect } from "react-redux";

const dummyData: ClipboardTableRowProps[] = [
  {
    title: "Assessment",
    question: "My First Question is why?",
    skillLevel: "3",
    criteriaType: "Essential",
    skillName: "Hacking",
    modelAnswer: "Hack the Planet",
    id: "hacker",
  },
  {
    title: "Assessment",
    question: "My First Question is why?",
    criteriaType: "Asset",
    skillLevel: "1",
    skillName: "Jedi",
    modelAnswer:
      "Strike me down and I will become more powerful than you can imagine.",
    id: "jedi",
  },
  {
    title: "Assessment",
    question: "My First Question is why?",
    criteriaType: "Esential",
    skillLevel: "2",
    skillName: "Detective",
    modelAnswer: "I'll ask the questions here.",
    id: "detective",
  },
  {
    title: "Assessment",
    question: "My Second Question is who?",
    criteriaType: "Essential",
    skillLevel: "4",
    skillName: "Ninja",
    modelAnswer: "*Silence*",
    id: "ninja",
  },
  {
    title: "Assessment",
    question: "My First Question is why?",
    criteriaType: "Asset",
    skillLevel: "3",
    skillName: "Monk",
    modelAnswer: "Quickly as you can, snatch the pebble from my hand.",
    id: "monk",
  },
  {
    title: "Assessment",
    question: "My Third Question is how long?",
    criteriaType: "Essential",
    skillLevel: "4",
    skillName: "Jester",
    modelAnswer:
      "A bear there was, a bear, a bear! All black and brown, and covered with hair. The bear! The bear!",
    id: "jester",
  },
];

export interface ClipboardTableRowProps {
  id: string;
  title: string;
  question: string | null;
  skillLevel: string;
  criteriaType: string;
  skillName: string;
  modelAnswer: string;
}

export const clipboardData = (
  assessments: Assessment[],
  criteria: Criteria[],
  skills: Skill[],
  ratingGuideQuestions: RatingGuideQuestion[],
  ratingGuideAnswers: RatingGuideAnswer[],
  locale: string,
  formatMessage: (message: FormattedMessage.MessageDescriptor) => string,
): ClipboardTableRowProps[] => {
  ratingGuideAnswers = ratingGuideAnswers.filter(answer => answer.criterion_id !== null);
  const data = ratingGuideAnswers.map(
    (answer): ClipboardTableRowProps => {
      const criterion = criteria.find(criterion => criterion.id === answer.criterion_id);
      if (criterion === undefined){
        throw new Error(`Criteria with id ${answer.criterion_id} not found`);
      }
      const skill = skills.find(skill => skill.id === criterion.skill_id);
      if (skill === undefined) {
        throw new Error(`Skill with id ${criterion.skill_id} not found.`);
      }
      const question = ratingGuideQuestions.find(
        question => question.id === answer.rating_guide_question_id,
      );
      if (question === undefined) {
        throw new Error(
          `RatingGuideQuestion ${answer.rating_guide_question_id} not found.`,
        );
      }
      const assessment = assessments.find(
        assessment => criterion.id === assessment.criterion_id,
      );
      if (assessment === undefined) {
        throw new Error(
          `Assessment associated with criterion ${criterion.id} not found.`,
        );
      }
      return {
        title: formatMessage(assessmentType(assessment.assessment_type_id)),
        question: question.question,
        skillLevel: formatMessage(
          skillLevelName(criterion.skill_level_id, skill.skill_type_id),
        ),
        criteriaType: formatMessage(criteriaType(criterion.criteria_type_id)),
        skillName: skill[locale].name,
        modelAnswer: answer.expected_answer,
        id: `A${assessment.id}-Q${question.id}-T${
          criterion.criteria_type_id
        }-C${criterion.id}`,
      };
    },
  );
  const compareRowProps = (
    a: ClipboardTableRowProps,
    b: ClipboardTableRowProps,
  ): number => {
    let num: number = 0;
    if (a.title > b.title) {
      num = 1;
    } else if (a.title < b.title) {
      num = -1;
    } else {
      if (a.question === null || b.question === null) {
        num = 0;
      } else if (a.question > b.question) {
        num = 1;
      } else if (a.question < b.question) {
        num = -1;
      } else {
        if (a.criteriaType > b.criteriaType) {
          num = 1;
        } else if (a.criteriaType < b.criteriaType) {
          num = -1;
        }
      }
    }
    return num;
  };
  data.sort(compareRowProps);
  return data;
};

const TableRow: React.FunctionComponent<ClipboardTableRowProps> = ({
  title,
  question,
  criteriaType,
  skillLevel,
  skillName,
  modelAnswer,
  id,
}): React.ReactElement => (
  <tr>
    <td>{title}</td>
    <td>{question}</td>
    <td>{criteriaType}</td>
    <td>{skillLevel}</td>
    <td>{skillName}</td>
    <td>{modelAnswer}</td>
    <td />
    <td />
  </tr>
);

interface TableProps {
  assessments: Assessment[];
  criteria: Criteria[];
  skills: Skill[];
  ratingGuideQuestions: RatingGuideQuestion[];
  ratingGuideAnswers: RatingGuideAnswer[];
}

const RatingGuideClipboard: React.FunctionComponent<TableProps & InjectedIntlProps> = ({
  assessments,
  criteria,
  skills,
  ratingGuideQuestions,
  ratingGuideAnswers,
  intl,
}): React.ReactElement => {
  //const rows = clipboardData(assessments, criteria, skills, ratingGuideQuestions, ratingGuideAnswers, intl.locale, intl.formatMessage)
  const rows = dummyData;
  return (
  <div className="screening-plan-layout">
    <section className="plan-table">
      <table>
        <tr>
          <th>Title</th>
          <th>Question</th>
          <th>Criteria Type</th>
          <th>Target Level</th>
          <th>Skill</th>
          <th>Rating Guide</th>
          <th>Applicant Answer</th>
          <th>Score</th>
        </tr>
        {rows.map(
          (row): React.ReactElement => (
            <TableRow key={`RatingsGuideTableRow${row.id}`} {...row} />
          ),
        )}
      </table>
    </section>
  </div>
)};

interface RatingGuideClipboardContainerProps {
  jobId: number;
}

const mapStateToProps = (state: RootState, ownProps: RatingGuideClipboardContainerProps): TableProps => ({
  assessments: getAssessmentsByJob(state, ownProps.jobId),
  criteria: getCriteriaByJob(state, ownProps.jobId),
  skills: getSkills(state),
  ratingGuideQuestions: getRatingGuideQuestionsByJob(state, ownProps.jobId),
  ratingGuideAnswers: getRatingGuideAnswersByJob(state, ownProps.jobId),
});

const RatingGuideClipboardContainer: React.FunctionComponent<RatingGuideClipboardContainerProps> = connect(mapStateToProps)(injectIntl(RatingGuideClipboard));




export default RatingGuideClipboardContainer;

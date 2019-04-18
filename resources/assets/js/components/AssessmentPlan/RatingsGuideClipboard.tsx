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

const dummyData = [
  {
    title: "Assessment",
    question: "My First Question is why?",
    skillType: "Essential",
    skillName: "Hacking",
    modelAnswer: "Hack the Planet",
    id: "hacker",
  },
  {
    skillType: "Asset",
    skillName: "Jedi",
    modelAnswer:
      "Strike me down and I will become more powerful than you can imagine.",
      id: "jedi",
  },
  {
    skillType: "Esential",
    skillName: "Detective",
    modelAnswer: "I'll ask the questions here.",
    id: "detective",
  },
  {
    question: "My Second Question is who?",
    skillType: "Essential",
    skillName: "Ninja",
    modelAnswer: "*Silence*",
    id: "ninja",
  },
  {
    skillType: "Asset",
    skillName: "Monk",
    modelAnswer: "Quickly as you can, snatch the pebble from my hand.",
    id: "monk",
  },
  {
    question: "My Third Question is how long?",
    skillType: "Essential",
    skillName: "Jester",
    modelAnswer:
      "A bear there was, a bear, a bear! All black and brown, and covered with hair. The bear! The bear!",
    id: "jester",
  },
];

interface TableRowProps {
  id: string;
  title?: string;
  question?: string;
  skillType: string;
  skillName: string;
  modelAnswer: string;
}

const TableRow: React.FunctionComponent<TableRowProps> = ({
  title,
  question,
  skillType,
  skillName,
  modelAnswer,
  id,
}): React.ReactElement => (
  <tr>
    <td>{title}</td>
    <td>{question}</td>
    <td>{skillType}</td>
    <td>{skillName}</td>
    <td>{modelAnswer}</td>
  </tr>
);

interface TableProps {
  rows: TableRowProps[];
}

const Table: React.FunctionComponent<TableProps> = ({
  rows,
}): React.ReactElement => (
  <table>
    {rows.map(
      (row): React.ReactElement => (
        <TableRow key={`RatingsGuideTableRow${row.id}`} {...row} />
      ),
    )}
  </table>
);

interface RatingsGuildeClipboardProps {
  criteria: Criteria[];
  assessments: Assessment[];
  questions: RatingsGuideQuestion[];
  answers: RatingsGuideAnswer[];
}

const RatingsGuideClipboard: React.FunctionComponent<
  RatingsGuildeClipboardProps
> = ({ criteria, assessments, questions, answers }): React.ReactElement => {
  return <Table rows={dummyData} />;
};

export default RatingsGuideClipboard;

/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import {
  getLocale,
  localizeFieldNonNull,
  localizeField,
} from "../../../helpers/localize";
import { validationMessages } from "../../Form/Messages";
import { countNumberOfWords } from "../../WordCounter/helpers";
import TextAreaInput from "../../Form/TextAreaInput";

const saveButtonMessages = defineMessages({
  default: {
    id: "application.myfit.saveAnswerButton.default",
    defaultMessage: "Save Answer",
    description: "Default message displayed on save answer button.",
  },
  saving: {
    id: "application.myfit.saveAnswerButton.saving",
    defaultMessage: "Saving...",
    description: "Message displayed on button when data is saving.",
  },
  saved: {
    id: "application.myfit.saveAnswerButton.saved",
    defaultMessage: "Saved!",
    description: "Message displayed on button when data is saved.",
  },
  cancel: {
    id: "application.myfit.saveAnswerButton.cancel",
    defaultMessage: "Cancel",
    description: "Cancel button for modal dialogue box.",
  },
  confirm: {
    id: "application.myfit.saveAnswerButton.confirm",
    defaultMessage: "Overwrite Answer",
    description: "Confirm button for modal dialogue box.",
  },
});

interface QuestionProps {
  applicationAnswer: JobApplicationAnswer;
  formRef: any;
  index: number;
  question: JobPosterQuestion;
  handleSubmit: (data: JobApplicationAnswer) => Promise<void>;
}

export interface QuestionValues {
  id: number;
  jobPosterQuestionsId: number;
  jobApplicationId: number;
  answer: string;
}

const answerToValues = (
  applicationAnswer: JobApplicationAnswer,
  locale: "en" | "fr",
): QuestionValues => ({
  id: applicationAnswer.id,
  jobPosterQuestionsId: applicationAnswer.job_poster_questions_id,
  jobApplicationId: applicationAnswer.job_application_id,
  answer: localizeField(locale, applicationAnswer, "answer") || "",
});

const updateAnswerWithValues = (
  applicationAnswer: JobApplicationAnswer,
  locale: "en" | "fr",
  { id, jobPosterQuestionsId, jobApplicationId, answer }: QuestionValues,
): JobApplicationAnswer => ({
  id,
  job_poster_questions_id: jobPosterQuestionsId,
  job_application_id: jobApplicationId,
  answer: {
    ...applicationAnswer.answer,
    [locale]: answer,
  },
});

const Question: React.FunctionComponent<QuestionProps> = ({
  applicationAnswer,
  formRef,
  index,
  question,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const ANSWER_WORD_LIMIT = 250;

  const initialValues: QuestionValues = answerToValues(
    applicationAnswer,
    locale,
  );

  const validationSchema = Yup.object({
    answer: Yup.string()
      .test(
        "wordCount",
        intl.formatMessage(validationMessages.overMaxWords),
        (value) => countNumberOfWords(value) <= ANSWER_WORD_LIMIT,
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }): Promise<void> => {
        const newApplicationAnswer = updateAnswerWithValues(
          applicationAnswer,
          locale,
          values,
        );

        await handleSubmit(newApplicationAnswer);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }): React.ReactElement => (
        <Form>
          <div key={question.id}>
            <p
              data-c-margin="top(3) bottom(1)"
              data-c-font-weight="bold"
              data-c-color="c2"
            >
              <FormattedMessage
                id="application.myfit.question"
                defaultMessage="Question {index}:"
                description="Label for the question on the My Fit step."
                values={{
                  index: index + 1,
                }}
              />{" "}
              {localizeField(locale, question, "question")}
            </p>
            <FastField
              id={`answer-${applicationAnswer.id}`}
              name="answer"
              component={TextAreaInput}
              required
              label={
                <FormattedMessage
                  id="application.myfit.questionLabel"
                  defaultMessage="My Answer to Question {index}"
                  description="Label before the users answer on the My Fit step."
                  values={{
                    index: index + 1,
                  }}
                />
              }
              wordLimit={ANSWER_WORD_LIMIT}
            />
            <div data-c-align="base(center) tl(right)">
              <button
                id={`save-button-${question.id}`}
                data-c-button="solid(c1)"
                data-c-radius="rounded"
                disabled={isSubmitting}
                type="submit"
              >
                <FormattedMessage
                  id="application.myfit.saveAnswerButton.default"
                  defaultMessage="Save Answer"
                  description="Default message displayed on save answer button."
                />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Question;

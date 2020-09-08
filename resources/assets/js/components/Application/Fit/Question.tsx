/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { useIntl, FormattedMessage, defineMessages } from "react-intl";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import { getLocale, localizeField } from "../../../helpers/localize";
import { validationMessages } from "../../Form/Messages";
import { fitMessages } from "../applicationMessages";
import { countNumberOfWords } from "../../WordCounter/helpers";
import TextAreaInput from "../../Form/TextAreaInput";

const saveButtonMessages = defineMessages({
  save: {
    id: "application.fit.saveAnswerButton.default",
    defaultMessage: "Save Answer",
    description: "Default message displayed on save answer button.",
  },
  saved: {
    id: "application.fit.saveAnswerButton.saved",
    defaultMessage: "Saved",
    description: "Message displayed on button when data is saved.",
  },
});

interface QuestionProps {
  jobApplicationAnswer: JobApplicationAnswer;
  formRef: any;
  index: number;
  question: JobPosterQuestion;
  handleSubmit: (data: JobApplicationAnswer) => Promise<void>;
}

export interface QuestionValues {
  answer: string;
}

const answerToValues = ({ answer }: JobApplicationAnswer): QuestionValues => ({
  answer: answer ?? "",
});

const updateAnswerWithValues = (
  applicationAnswer: JobApplicationAnswer,
  { answer }: QuestionValues,
): JobApplicationAnswer => ({
  ...applicationAnswer,
  answer,
});

const Question: React.FunctionComponent<QuestionProps> = ({
  jobApplicationAnswer,
  formRef,
  index,
  question,
  handleSubmit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const ANSWER_WORD_LIMIT = 250;

  const initialValues: QuestionValues = answerToValues(jobApplicationAnswer);

  const validationSchema = Yup.object({
    answer: Yup.string()
      .test(
        "wordCount",
        intl.formatMessage(validationMessages.overMaxWords, {
          numberOfWords: ANSWER_WORD_LIMIT,
        }),
        (value: string) => countNumberOfWords(value) <= ANSWER_WORD_LIMIT,
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const newjobApplicationAnswer = updateAnswerWithValues(
          jobApplicationAnswer,
          values,
        );

        await handleSubmit(newjobApplicationAnswer)
          .then(() => {
            resetForm();
            setSubmitting(false);
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ dirty, isSubmitting }): React.ReactElement => (
        <Form>
          <div key={question.id}>
            <p
              data-c-margin="top(3) bottom(1)"
              data-c-font-weight="bold"
              data-c-color="c2"
            >
              {intl.formatMessage(fitMessages.questionLabel, {
                index: index + 1,
              })}{" "}
              {localizeField(locale, question, "question")}
            </p>
            <FastField
              id={`answer-${question.id}`}
              name="answer"
              component={TextAreaInput}
              required
              label={
                <FormattedMessage
                  id="application.fit.answerLabel"
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
                disabled={!dirty || isSubmitting}
                type="submit"
              >
                <span>
                  {dirty
                    ? intl.formatMessage(saveButtonMessages.save)
                    : intl.formatMessage(saveButtonMessages.saved)}
                </span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Question;

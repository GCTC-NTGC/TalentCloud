/* eslint-disable @typescript-eslint/camelcase */
import React, { createRef, useState, MutableRefObject } from "react";
import { FormattedMessage } from "react-intl";
import { FormikProps } from "formik";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import Question, { QuestionValues } from "./Question";
import { validateAllForms, submitAllForms } from "../../../helpers/forms";

interface MyFitProps {
  /** List of job poster questions. */
  jobQuestions: JobPosterQuestion[];
  jobApplicationAnswers: JobApplicationAnswer[];
  handleSubmit: (values: JobApplicationAnswer) => Promise<void>;
  handleContinue: () => void;
  handleQuit: () => void;
  handleReturn: () => void;
}

export const MyFit: React.FunctionComponent<MyFitProps> = ({
  jobQuestions,
  jobApplicationAnswers,
  handleSubmit,
  handleContinue,
  handleQuit,
  handleReturn,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateAndSubmit = (
    refs: React.MutableRefObject<FormikProps<QuestionValues>>[],
  ): Promise<void> =>
    validateAllForms(refs, "answer-").then((response) => {
      if (response) {
        setIsSubmitting(true);
        submitAllForms(refs).finally(() => {
          setIsSubmitting(false);
        });
      }
    });

  const formRefs = React.useRef<
    Map<number, React.MutableRefObject<FormikProps<QuestionValues>>>
  >(new Map());

  return (
    <section data-c-container="medium">
      <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
        <FormattedMessage
          id="application.myfit.heading"
          defaultMessage="My Fit"
          description="Heading for the My Fit step in the Application Timeline"
        />
      </h2>
      <p>
        <FormattedMessage
          id="application.myfit.firstParagraph"
          defaultMessage="The manager has included a few further questions that they'd like you to answer in order to be considered for this position. Questions that require an answer are marked, while all others are optional."
          description="Paragraph for the My Fit step in the Application Timeline"
        />
      </p>
      {jobQuestions.map((question, index) => {
        if (!formRefs.current.has(question.id)) {
          const ref = createRef() as MutableRefObject<
            FormikProps<QuestionValues>
          >;
          formRefs.current.set(question.id, ref);
        }

        return (
          <Question
            key={question.id}
            jobApplicationAnswer={
              jobApplicationAnswers.find(
                (appAnswer) =>
                  appAnswer.job_poster_questions_id === question.id,
              ) ?? {
                id: 0,
                job_application_id: 0,
                answer: "",
                job_poster_questions_id: 0,
              }
            }
            index={index}
            question={question}
            handleSubmit={handleSubmit}
            formRef={formRefs.current.get(question.id)}
          />
        );
      })}
      <div data-c-container="medium" data-c-padding="tb(2)">
        <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
        <div data-c-grid="gutter">
          <div
            data-c-alignment="base(centre) tp(left)"
            data-c-grid-item="tp(1of2)"
          >
            <button
              data-c-button="outline(c2)"
              data-c-radius="rounded"
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                validateAndSubmit(Array.from(formRefs.current.values())).then(
                  handleReturn,
                )
              }
            >
              <FormattedMessage
                id="application.returnButtonLabel"
                defaultMessage="Save & Return to Previous Step"
                description="The text displayed on the Save & Return button of the Applicant Timeline form."
              />
            </button>
          </div>
          <div
            data-c-alignment="base(centre) tp(right)"
            data-c-grid-item="tp(1of2)"
          >
            <button
              data-c-button="outline(c2)"
              data-c-radius="rounded"
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                validateAndSubmit(Array.from(formRefs.current.values())).then(
                  handleQuit,
                )
              }
            >
              <FormattedMessage
                id="application.quitButtonLabel"
                defaultMessage="Save & Quit"
                description="The text displayed on the Save & Return button of the Applicant Timeline form."
              />
            </button>
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              data-c-margin="left(1)"
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                validateAndSubmit(Array.from(formRefs.current.values())).then(
                  handleContinue,
                )
              }
            >
              <FormattedMessage
                id="application.submitButtonLabel"
                defaultMessage="Save & Continue"
                description="The text displayed on the submit button for the Job Details form."
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFit;

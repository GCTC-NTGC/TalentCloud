/* eslint-disable @typescript-eslint/camelcase */
import React, { createRef, useState, MutableRefObject } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { FormikProps } from "formik";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import Question, { QuestionValues } from "./Question";
import {
  validateAllForms,
  submitAllForms,
  focusOnElement,
} from "../../../helpers/forms";
import { fitMessages, navigationMessages } from "../applicationMessages";

interface FitProps {
  applicationId: number;
  jobQuestions: JobPosterQuestion[];
  jobApplicationAnswers: JobApplicationAnswer[];
  handleSubmit: (values: JobApplicationAnswer) => Promise<void>;
  handleContinue: () => void;
  handleQuit: () => void;
  handleReturn: () => void;
}

export const Fit: React.FunctionComponent<FitProps> = ({
  applicationId,
  jobQuestions,
  jobApplicationAnswers,
  handleSubmit,
  handleContinue,
  handleQuit,
  handleReturn,
}) => {
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   *
   * @param refMap A map of question id to formik Form ref
   * @returns A promise that resolves if submission succeeds, and rejects if validation or submission fails.
   */
  const validateAndSubmit = async (
    refMap: Map<number, React.MutableRefObject<FormikProps<QuestionValues>>>,
  ): Promise<void> => {
    setIsSubmitting(true);
    const refs = Array.from(refMap.values());
    const formsAreValid = await validateAllForms(refs);
    if (formsAreValid) {
      try {
        await submitAllForms(refs);
        setIsSubmitting(false);
        return Promise.resolve();
      } catch {
        setIsSubmitting(false);
        return Promise.reject();
      }
    } else {
      Array.from(refMap.entries()).some((ref) => {
        const [questionId, formRef] = ref;
        if (!formRef.current.isValid) {
          focusOnElement(`answer-${questionId}`);
          return true;
        }
        return false;
      });
      setIsSubmitting(false);
      return Promise.reject();
    }
  };

  const formRefs = React.useRef<
    Map<number, React.MutableRefObject<FormikProps<QuestionValues>>>
  >(new Map());

  return (
    <section data-c-container="medium">
      <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
        {intl.formatMessage(fitMessages.heading)}
      </h2>
      <p>
        <FormattedMessage
          id="application.fit.firstParagraph"
          defaultMessage="The manager has included a few further questions that they'd like you to answer in order to be considered for this position. Questions that require an answer are marked, while all others are optional."
          description="Paragraph for the Fit step in the Application form."
        />
      </p>
      {jobQuestions.map((question, index) => {
        if (!formRefs.current.has(question.id)) {
          const ref = createRef() as MutableRefObject<
            FormikProps<QuestionValues>
          >;
          formRefs.current.set(question.id, ref);
        }

        const jobApplicationAnswer = jobApplicationAnswers.find(
          (appAnswer) => appAnswer.job_poster_question_id === question.id,
        );

        const draftAnswer = {
          id: -1,
          job_application_id: applicationId,
          answer: "",
          job_poster_question_id: question.id,
        };

        return (
          <Question
            key={question.id}
            jobApplicationAnswer={jobApplicationAnswer ?? draftAnswer}
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
              onClick={(): Promise<void> =>
                validateAndSubmit(formRefs.current).then(handleReturn)
              }
            >
              {intl.formatMessage(navigationMessages.return)}
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
              onClick={(): Promise<void> =>
                validateAndSubmit(formRefs.current).then(handleQuit)
              }
            >
              {intl.formatMessage(navigationMessages.quit)}
            </button>
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              data-c-margin="left(1)"
              type="button"
              disabled={isSubmitting}
              onClick={(): Promise<void> =>
                validateAndSubmit(formRefs.current).then(handleContinue)
              }
            >
              {intl.formatMessage(navigationMessages.continue)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fit;

/* eslint-disable @typescript-eslint/camelcase */
import React, { createRef, MutableRefObject, useState } from "react";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { FormikProps } from "formik";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import Question, { QuestionValues } from "./Question";
import { navigate } from "../../../helpers/router";
import { validateAllForms, submitAllForms } from "../../../helpers/forms";

interface MyFitProps {
  /** List of job poster questions. */
  jobQuestions: JobPosterQuestion[];
  appAnswers: JobApplicationAnswer[];
  handleSubmit: (values: JobApplicationAnswer) => Promise<void>;
}

export const MyFit: React.FunctionComponent<MyFitProps> = ({
  jobQuestions,
  appAnswers,
  handleSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateAndSubmit = (
    refs: React.MutableRefObject<
      React.MutableRefObject<FormikProps<QuestionValues>>[]
    >,
    nextStepUrl: string,
  ): Promise<void> =>
    validateAllForms(refs, "answer-").then((response) => {
      if (response) {
        setIsSubmitting(true);
        submitAllForms(refs).finally(() => {
          // TODO: Uncomment navigate when routes have been established.
          // navigate(nextStepUrl);
          console.log("navigate to next step");
          setIsSubmitting(false);
        });
      }
    });

  const formRefs = React.useRef<
    MutableRefObject<FormikProps<QuestionValues>>[]
  >([]);

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
        if (!formRefs.current.includes(formRefs.current[index])) {
          formRefs.current = [
            ...formRefs.current,
            formRefs.current[index] || createRef(),
          ];
        }

        return (
          <Question
            key={question.id}
            applicationAnswer={
              appAnswers.find(
                (appAnswer) =>
                  appAnswer.job_poster_questions_id === question.id,
              ) ?? {
                id: 0,
                job_application_id: 0,
                answer: { en: "", fr: "" },
                job_poster_questions_id: 0,
              }
            }
            index={index}
            question={question}
            handleSubmit={handleSubmit}
            formRef={formRefs.current[index]}
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
                validateAndSubmit(formRefs, "ReplaceWithUrlOfPreviousStep")
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
                validateAndSubmit(formRefs, "ReplaceWithUrlOfMyApplications")
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
                validateAndSubmit(formRefs, "ReplaceWithUrlOfNextStep")
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

/* eslint-disable @typescript-eslint/camelcase */
import React, { createRef, MutableRefObject } from "react";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { FormikProps } from "formik";
import { JobPosterQuestion, JobApplicationAnswer } from "../../../models/types";
import Question, { QuestionValues } from "./Question";
import { navigate } from "../../../helpers/router";

interface MyFitProps {
  /** List of job poster questions. */
  jobQuestions: JobPosterQuestion[];
  appAnswers: JobApplicationAnswer[];
  handleContinue: (values: JobApplicationAnswer[]) => void;
  handleQuit: () => void;
  handleReturn: () => void;
}

interface MyFitValues {
  id: number;
  jobPosterQuestionsId: number;
  jobApplicationId: number;
  answer: string;
}

export const MyFit: React.FunctionComponent<MyFitProps> = ({
  jobQuestions,
  appAnswers,
  handleContinue,
  handleQuit,
  handleReturn,
}) => {
  const focusOnElement = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const validateAllForms = async (
    refs: React.MutableRefObject<
      React.MutableRefObject<FormikProps<QuestionValues>>[]
    >,
  ): Promise<boolean> => {
    for (let i = 0; i < refs.current.length; i += 1) {
      let ref = refs.current[i].current;
      // eslint-disable-next-line no-await-in-loop
      const isFormValid = await refs.current[i].current
        .validateForm()
        .then(() => {
          ref = refs.current[i].current;
          if (!_.isEmpty(ref.errors) && !ref.isSubmitting && !ref.isValid) {
            return false;
          }
          return true;
        });
      if (!isFormValid) {
        focusOnElement(`answer-${ref.values.id}`);
        break;
      }
    }

    const invalidForm = refs.current.some(
      (ref: MutableRefObject<FormikProps<QuestionValues>>) =>
        !ref.current.isValid,
    );

    return invalidForm ? Promise.resolve(false) : Promise.resolve(true);
  };

  const submitAllForms = async (
    refs: React.MutableRefObject<
      React.MutableRefObject<FormikProps<QuestionValues>>[]
    >,
  ): Promise<void[]> => {
    return Promise.all(
      refs.current.map((ref: MutableRefObject<FormikProps<QuestionValues>>) =>
        // TODO: Might need make one mass submission by combining all values into an array.
        ref.current.submitForm(),
      ),
    );
  };

  const validateAndSubmit = (
    refs: React.MutableRefObject<
      React.MutableRefObject<FormikProps<QuestionValues>>[]
    >,
    nextStep: string,
  ): Promise<void> =>
    validateAllForms(refs).then((response) => {
      if (response) {
        submitAllForms(refs).finally(() => {
          // navigate(nextStepUrl);
          console.log("navigate to next step");
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
        formRefs.current = [
          ...formRefs.current,
          formRefs.current[index] || createRef(),
        ];

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
            handleSubmit={async () => {}}
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

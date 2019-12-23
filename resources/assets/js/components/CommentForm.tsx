import * as React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useIntl, defineMessages, FormattedMessage } from "react-intl";
import { validationMessages } from "./Form/Messages";
import { CommentTypeId } from "../models/lookupConstants";
import TextInput from "./Form/TextInput";
import SelectInput from "./Form/SelectInput";
import { Comment } from "../models/types";

const formMessages = defineMessages({
  commentLabel: {
    id: "commentForm.comment.label",
    defaultMessage: "Add a Comment",
    description: "The label displayed for the comment input field.",
  },
  commentPlaceholder: {
    id: "commentForm.comment.placeholder",
    defaultMessage: "eg. Enter your question, recommendation, etc.",
    description: "The placeholder displayed for the comment input field.",
  },
  commentTypeLabel: {
    id: "commentForm.commentType.label",
    defaultMessage: "Type of Comment",
    description: "The label displayed for the comment type select box.",
  },
  commentTypeNullSelection: {
    id: "commentForm.commentType.nullSelection",
    defaultMessage: "Select a comment type...",
    description: "Comment type from list of comment types",
  },
});

const commentTypeMessages = defineMessages({
  question: {
    id: "commentType.question",
    defaultMessage: "Question",
    description: "Comment type from list of comment types",
  },
  recommendation: {
    id: "commentType.recommendation",
    defaultMessage: "Recommendation",
    description: "Comment type from list of comment types",
  },
  requiredAction: {
    id: "commentType.requiredAction",
    defaultMessage: "Required Action",
    description: "Comment type from list of comment types",
  },
});

interface CommentFormProps {
  // It must return true if the submission was successful, false otherwise.
  handleSubmit: (newComment: Comment) => Promise<Comment>;
}

interface CommentFormValues {
  comment: string;
  commentType: number | "";
}

const CommentForm: React.FunctionComponent<CommentFormProps> = ({
  handleSubmit,
}: CommentFormProps): React.ReactElement => {
  const intl = useIntl();
  const initialValues: CommentFormValues = {
    comment: "",
    commentType: "",
  };

  const commentSchema = Yup.object().shape({
    comment: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
    commentType: Yup.number()
      .oneOf(
        Object.values(CommentTypeId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
  });

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={commentSchema}
        onSubmit={(values, actions): void => {
          console.log("submit button clicked!!!!");
        }}
        render={({ isSubmitting }): React.ReactElement => (
          <Form data-c-grid="gutter(all, 1)">
            <Field
              id="comment_form_input"
              type="text"
              name="comment"
              component={TextInput}
              required
              grid="tl(2of3)"
              label={intl.formatMessage(formMessages.commentLabel)}
              placeholder={intl.formatMessage(formMessages.commentPlaceholder)}
            />
            <Field
              id="comment_form_type"
              name="commentType"
              component={SelectInput}
              required
              grid="tl(1of3)"
              label={intl.formatMessage(formMessages.commentTypeLabel)}
              nullSelection={intl.formatMessage(
                formMessages.commentTypeNullSelection,
              )}
              options={[
                {
                  value: 1,
                  label: intl.formatMessage(commentTypeMessages.question),
                },
                {
                  value: 2,
                  label: intl.formatMessage(commentTypeMessages.recommendation),
                },
                {
                  value: 3,
                  label: intl.formatMessage(commentTypeMessages.requiredAction),
                },
              ]}
            />
            <div
              data-c-grid-item="base(1of1)"
              data-c-align="base(center) tl(right)"
            >
              <button
                type="submit"
                // disabled={isSubmitting}
                data-c-button="solid(c1)"
                data-c-radius="rounded"
              >
                <FormattedMessage
                  id="commentForm.submitButton.label"
                  defaultMessage="Submit Comment"
                  description="The text displayed on the submit button in the comment form."
                />
              </button>
            </div>
          </Form>
        )}
      />
    </section>
  );
};

export default CommentForm;

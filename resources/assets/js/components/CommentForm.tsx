/* eslint-disable @typescript-eslint/camelcase, camelcase */
import * as React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useIntl, defineMessages, FormattedMessage } from "react-intl";
import { validationMessages } from "./Form/Messages";
import { CommentTypeId } from "../models/lookupConstants";
import TextInput from "./Form/TextInput";
import SelectInput from "./Form/SelectInput";
import { Comment } from "../models/types";
import { DispatchType } from "../configureStore";
import { createComment } from "../store/Job/jobActions";
import { emptyComment } from "../models/jobUtil";

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

export const commentTypeMessages = defineMessages({
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
  comment: {
    id: "commentType.comment",
    defaultMessage: "Comment",
    description: "Comment type from list of comment types",
  },
});

interface CommentFormProps {
  jobId: number;
  isHrAdviser: boolean;
  location: string;
  handleCreateComment: (jobId: number, newComment: Comment) => Promise<Comment>;
}

interface CommentFormValues {
  comment: string;
  commentType: number | null;
}

const CommentForm: React.FunctionComponent<CommentFormProps> = ({
  isHrAdviser,
  handleCreateComment,
  jobId,
  location,
}: CommentFormProps): React.ReactElement => {
  const intl = useIntl();
  const initialValues: CommentFormValues = {
    comment: "",
    commentType: 0 || null,
  };

  const hrCommentSchema = Yup.object().shape({
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

  const managerCommentSchema = Yup.object().shape({
    comment: Yup.string().required(
      intl.formatMessage(validationMessages.required),
    ),
  });

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={isHrAdviser ? hrCommentSchema : managerCommentSchema}
        onSubmit={(values, { setSubmitting, resetForm }): void => {
          const newComment: Comment = {
            ...emptyComment(),
            location,
            comment: values.comment,
            type_id: isHrAdviser ? Number(values.commentType) : null,
          };
          handleCreateComment(jobId, newComment)
            .then(() => {
              setSubmitting(false);
              resetForm();
            })
            .catch(() => {
              setSubmitting(false);
            });
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
            {isHrAdviser && (
              <Field
                id="comment_form_type"
                name="commentType"
                component={SelectInput}
                required
                grid="tl(1of3)"
                label={intl.formatMessage(formMessages.commentTypeLabel)}
                options={[
                  {
                    value: "",
                    label: intl.formatMessage(
                      formMessages.commentTypeNullSelection,
                    ),
                  },
                  {
                    value: CommentTypeId.question,
                    label: intl.formatMessage(commentTypeMessages.question),
                  },
                  {
                    value: CommentTypeId.recommendation,
                    label: intl.formatMessage(
                      commentTypeMessages.recommendation,
                    ),
                  },
                  {
                    value: CommentTypeId.requiredAction,
                    label: intl.formatMessage(
                      commentTypeMessages.requiredAction,
                    ),
                  },
                ]}
              />
            )}
            <div
              data-c-grid-item={isHrAdviser ? "base(1of1)" : "tl(1of3)"}
              data-c-align="base(center) tl(right)"
              style={
                isHrAdviser ? {} : { display: "flex", alignItems: "center" }
              }
            >
              <button
                type="submit"
                disabled={isSubmitting}
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

const mapDispatchToProps = (
  dispatch: DispatchType,
): {
  handleCreateComment: (jobId: number, newComment: Comment) => Promise<Comment>;
} => ({
  handleCreateComment: async (
    jobId: number,
    newComment: Comment,
  ): Promise<Comment> => {
    const result = await dispatch(createComment(jobId, newComment));
    if (!result.error) {
      const resultComment = await result.payload;
      return resultComment;
    }
    return Promise.reject(result.payload);
  },
});

export default connect(() => ({}), mapDispatchToProps)(CommentForm);

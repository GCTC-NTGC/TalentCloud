/* eslint-disable jsx-a11y/label-has-associated-control, @typescript-eslint/no-non-null-assertion, react/no-array-index-key, @typescript-eslint/camelcase, camelcase, jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef } from "react";
import {
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
  defineMessages,
} from "react-intl";
import {
  Field,
  Form,
  Formik,
  FieldArray,
  FormikErrors,
  FormikValues,
} from "formik";
import { array, object, string } from "yup";

import Modal from "../Modal";
import { validationMessages } from "../Form/Messages";
import TextAreaInput from "../Form/TextAreaInput";
import { JobPosterKeyTask } from "../../models/types";
import { find } from "../../helpers/queries";
import { emptyTasks } from "../../models/jobUtil";

interface JobTasksProps {
  /** Job ID to pass to tasks. */
  jobId: number | null;
  /** Key Tasks collection to populate the form */
  keyTasks: JobPosterKeyTask[] | null;
  /** Amount of tasks on the page considered 'valid'. Adding
   *  additional tasks will insert error markup and add invalid
   *  prop to textareas, as well as prevent form submission.
   */
  validCount: number;
  /** Function to run after successful form validation.
   * It must return true if the submission was succesful, false otherwise.
   */
  handleSubmit: (values: JobPosterKeyTask[]) => Promise<boolean>;
  /** Function to run when modal cancel is clicked. */
  handleModalCancel: () => void;
  /** Function to run when modal confirm is clicked. */
  handleModalConfirm: () => void;
}

interface TaskFormValues {
  id: number | null;
  job_poster_id: number;
  description: string;
}

const formMessages = defineMessages({
  taskPlaceholder: {
    id: "jobTasks.taskPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone...",
    description: "Placeholder shown inside a Task text area.",
  },
  taskLabel: {
    id: "jobTasks.taskLabel",
    defaultMessage: "Task",
    description: "Label shown above a Task text area.",
  },
  tasksRequired: {
    id: "jobTasks.tasksRequired",
    defaultMessage: "At least one task is required.",
    description:
      "Validation message shown when a user tries to submit no tasks.",
  },
  tasksMaximum: {
    id: "jobTasks.tasksMaximum",
    defaultMessage: "Please remove any additional tasks before continuing.",
    description:
      "Validation message shown when a user tries to submit more than the allowed number of tasks.",
  },
});

const JobTasks: React.FunctionComponent<JobTasksProps & InjectedIntlProps> = ({
  jobId,
  keyTasks,
  validCount,
  handleSubmit,
  handleModalCancel,
  handleModalConfirm,
  intl,
}): React.ReactElement => {
  const modalId = "tasks-modal";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalParentRef = useRef<HTMLDivElement>(null);
  const { locale } = intl;
  if (locale !== "en" && locale !== "fr") {
    throw Error("Unexpected intl.locale"); // TODO: Deal with this more elegantly.
  }

  const tasksToValues = (
    tasks: JobPosterKeyTask[] | null,
  ): { tasks: TaskFormValues[] } =>
    tasks
      ? {
          tasks: tasks.map(
            (task: JobPosterKeyTask): TaskFormValues => ({
              id: task.id,
              job_poster_id: task.job_poster_id,
              description: task[locale].description,
            }),
          ),
        }
      : {
          tasks: [],
        };

  const updateTasksWithValues = (
    formTasks: TaskFormValues[],
    canonicalTasks: JobPosterKeyTask[],
  ): JobPosterKeyTask[] => {
    return formTasks.map(
      (task: TaskFormValues): JobPosterKeyTask => {
        const keyTask = task.id ? find(canonicalTasks, task.id) : null;
        if (keyTask) {
          return {
            ...keyTask,
            [locale]: {
              description: task.description,
            },
          };
        }
        return {
          id: 0,
          job_poster_id: task.job_poster_id,
          en: {
            description: locale === "en" ? task.description : "",
          },
          fr: {
            description: locale === "fr" ? task.description : "",
          },
        };
      },
    );
  };

  const taskSchema = object().shape({
    tasks: array()
      .of(
        object().shape({
          description: string().required(
            intl.formatMessage(validationMessages.required),
          ),
        }),
      )
      .required(intl.formatMessage(formMessages.tasksRequired))
      .max(validCount, intl.formatMessage(formMessages.tasksMaximum)),
  });

  const initialValues = tasksToValues(keyTasks || null);

  return (
    <div
      data-c-container="form"
      data-c-padding="top(triple) bottom(triple)"
      ref={modalParentRef}
    >
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        <FormattedMessage
          id="jobTasks.heading"
          defaultMessage="Add Key Tasks"
          description="Job Tasks page heading"
        />
      </h3>
      <ul data-c-margin="bottom(double)">
        <li>
          <FormattedMessage
            id="jobTasks.intro.first"
            defaultMessage="What will your new team member spend their time on? What will they deliver?"
            description="Job Tasks page first intro section"
          />
        </li>
        <li>
          <FormattedMessage
            id="jobTasks.intro.second"
            defaultMessage="Focus on the key tasks. You don’t need to list every detail of the job, but applicants want to know how they will be spending most of their time."
            description="Job Tasks page second intro section"
          />
        </li>
        <li>
          <FormattedMessage
            id="jobTasks.intro.third"
            defaultMessage="Aim to provide between four and six key tasks. (You can add as many key tasks as you want as you brainstorm here, but you can include no more than eight in the final job poster.)"
            description="Job Tasks page third intro section"
          />
        </li>
        <li>
          <FormattedMessage
            id="jobTasks.intro.fourth"
            defaultMessage="Once you have finished entering key tasks, you will move on to identify the individual skills needed to accomplish them."
            description="Job Tasks page fourth intro section"
          />
        </li>
      </ul>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={taskSchema}
        onSubmit={(values, actions): void => {
          // The following only triggers after validations pass
          handleSubmit(
            updateTasksWithValues(values.tasks, keyTasks || emptyTasks()),
          )
            .then((isSuccessful: boolean): void => {
              if (isSuccessful) {
                setIsModalVisible(true);
              }
            })
            .finally(
              (): void => actions.setSubmitting(false), // Required by Formik to finish the submission cycle
            );
          actions.setSubmitting(false); // Required by Formik to finish the submission cycle
        }}
        render={({ isSubmitting, values, errors }): React.ReactElement => (
          <>
            {values.tasks.length > 0 && (
              <p data-c-alignment="tl(right)">
                <FormattedMessage
                  id="jobTasks.taskCount.some"
                  defaultMessage="You have {taskCount, plural,
                      one {# task}
                      other {# tasks}
                    } added."
                  description="Indicates how many tasks are present on the page."
                  values={{
                    taskCount: values.tasks.length,
                  }}
                />
              </p>
            )}
            {values.tasks.length === 0 && (
              <div
                data-c-margin="top(normal) bottom(double)"
                data-c-background="grey(20)"
                data-c-padding="normal"
                data-c-radius="rounded"
                data-c-border="all(thin, solid, grey)"
                data-c-alignment="centre"
              >
                <FormattedMessage
                  id="jobTasks.taskCount.none"
                  defaultMessage="You don't have any tasks added yet!"
                  description="Message displayed when there are no tasks present on the page."
                />
              </div>
            )}
            <Form id="job-tasks">
              <FieldArray
                name="tasks"
                render={(arrayHelpers): React.ReactElement => {
                  const taskArrayErrors = (
                    arrayErrors: FormikErrors<FormikValues>,
                  ): React.ReactElement | null =>
                    typeof arrayErrors.tasks === "string" ? (
                      <div
                        data-c-alert="error"
                        data-c-radius="rounded"
                        role="alert"
                        data-c-margin="top(normal)"
                      >
                        <div data-c-padding="half">
                          <p>{arrayErrors.tasks}</p>
                        </div>
                      </div>
                    ) : null;
                  return (
                    <>
                      <div data-c-grid="gutter">
                        {values.tasks &&
                          values.tasks.length > 0 &&
                          values.tasks.map(
                            (task, index): React.ReactElement => (
                              <>
                                {validCount! === index && (
                                  <div
                                    className="job-builder-task-warning"
                                    data-c-grid-item="base(1of1)"
                                  >
                                    <div
                                      data-c-alert="error"
                                      data-c-radius="rounded"
                                      role="alert"
                                      data-c-margin="bottom(normal)"
                                    >
                                      <div data-c-padding="half">
                                        <span
                                          data-c-margin="bottom(quarter)"
                                          data-c-heading="h5"
                                          data-c-font-weight="bold"
                                        >
                                          <i
                                            aria-hidden="true"
                                            className="fas fa-exclamation-circle"
                                          />
                                          <FormattedMessage
                                            id="jobTasks.taskCount.error.title"
                                            description="Error message displayed when too many tasks are on screen."
                                            defaultMessage="Just a heads up!"
                                          />
                                        </span>
                                        <p>
                                          <FormattedMessage
                                            id="jobTasks.taskCount.error.body"
                                            description="Error message displayed when too many tasks are on screen."
                                            defaultMessage="You have exceeded the maximum number of key tasks allowed, but that’s okay. You can continue to add key tasks as you brainstorm here, but you will be asked to trim your list to 6 key tasks or fewer to proceed."
                                          />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div
                                  key={`listItem${index}`}
                                  className={`job-builder-task${
                                    index + 1 > validCount! ? " invalid" : ""
                                  }`}
                                  data-c-grid-item="base(1of1)"
                                  data-c-input="textarea"
                                  data-tc-up-down-item
                                >
                                  <div>
                                    <button
                                      type="button"
                                      data-tc-move-up-trigger
                                      onClick={(): void =>
                                        arrayHelpers.move(index, index - 1)
                                      }
                                    >
                                      <i className="fas fa-long-arrow-alt-up" />
                                    </button>
                                    <button
                                      type="button"
                                      data-tc-move-down-trigger
                                      onClick={(): void =>
                                        arrayHelpers.move(index, index + 1)
                                      }
                                    >
                                      <i className="fas fa-long-arrow-alt-down" />
                                    </button>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      data-tc-builder-task-delete-trigger
                                      onClick={(): void => {
                                        arrayHelpers.remove(index);
                                      }}
                                    >
                                      <i
                                        className="fas fa-trash"
                                        data-c-colour="stop"
                                      />
                                    </button>
                                  </div>
                                  <Field
                                    id={`task-${index}`}
                                    name={`tasks.${index}.description`}
                                    label={`${intl.formatMessage(
                                      formMessages.taskLabel,
                                    )} ${index + 1}`}
                                    component={TextAreaInput}
                                    placeholder={intl.formatMessage(
                                      formMessages.taskPlaceholder,
                                    )}
                                    required
                                  />
                                </div>
                              </>
                            ),
                          )}
                      </div>
                      <div data-c-grid="gutter">
                        <div
                          data-c-grid-item="base(1of1)"
                          data-c-alignment="base(centre)"
                        >
                          <button
                            data-c-button="solid(c2)"
                            data-c-radius="rounded"
                            type="button"
                            disabled={isSubmitting}
                            onClick={(): void =>
                              arrayHelpers.push({
                                id: 0,
                                job_poster_id: jobId,
                                en: { description: "" },
                                fr: { description: "" },
                              })
                            }
                          >
                            <FormattedMessage
                              id="jobTasks.addJob"
                              description="Text on the Add Task button."
                              defaultMessage="Add a Task"
                            />
                          </button>
                        </div>
                        <div data-c-grid-item="base(1of1)">
                          <hr data-c-margin="top(normal) bottom(normal)" />
                        </div>
                        <div
                          data-c-alignment="base(centre) tp(left)"
                          data-c-grid-item="tp(1of2)"
                        >
                          {/* TODO: Navigate to previous page */}
                          <a
                            href="/builder-04"
                            data-c-button="outline(c2)"
                            data-c-radius="rounded"
                            type="button"
                          >
                            <FormattedMessage
                              id="jobTasks.previous"
                              description="Text on the Previous Step button."
                              defaultMessage="Previous Step"
                            />
                          </a>
                        </div>
                        <div
                          data-c-alignment="base(centre) tp(right)"
                          data-c-grid-item="tp(1of2)"
                        >
                          <button
                            data-c-button="solid(c2)"
                            data-c-dialog-action="open"
                            data-c-dialog-id={modalId}
                            data-c-radius="rounded"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            <FormattedMessage
                              id="jobTasks.preview"
                              description="Text on the Preview Tasks button."
                              defaultMessage="Preview Tasks"
                            />
                          </button>
                          {/* TODO: Figure out how to display FieldArray validation errors. */}
                          {taskArrayErrors(errors)}
                        </div>
                      </div>
                    </>
                  );
                }}
              />
            </Form>
            <Modal
              id={modalId}
              parentElement={modalParentRef.current}
              visible={isModalVisible}
              onModalCancel={(): void => {
                handleModalCancel();
                setIsModalVisible(false);
              }}
              onModalConfirm={(): void => {
                handleModalConfirm();
                setIsModalVisible(false);
              }}
            >
              <Modal.Header>
                <div
                  data-c-background="c1(100)"
                  data-c-border="bottom(thin, solid, black)"
                  data-c-padding="normal"
                >
                  <h5
                    data-c-dialog-focus
                    tabIndex={0}
                    data-c-colour="white"
                    data-c-font-size="h4"
                    id={`${modalId}-title`}
                  >
                    <FormattedMessage
                      id="jobTasks.modal.title"
                      defaultMessage="Keep it up!"
                      description="Text displayed on the title of the Job Task page Modal."
                    />
                  </h5>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div data-c-border="bottom(thin, solid, black)">
                  <div
                    data-c-border="bottom(thin, solid, black)"
                    data-c-padding="normal"
                    id={`${modalId}-description`}
                  >
                    <FormattedMessage
                      id="jobTasks.modal.body"
                      description="Text displayed above the body of the Job Task page Modal."
                      defaultMessage="Here's a preview of the Tasks you just entered. Feel free to go back and edit things or move to the next step if you're happy with it."
                    />
                  </div>
                  <div data-c-background="grey(20)" data-c-padding="normal">
                    <div
                      className="manager-job-card"
                      data-c-background="white(100)"
                      data-c-padding="normal"
                      data-c-radius="rounded"
                    >
                      <h4
                        data-c-border="bottom(thin, solid, black)"
                        data-c-font-size="h4"
                        data-c-font-weight="600"
                        data-c-margin="bottom(normal)"
                        data-c-padding="bottom(normal)"
                      >
                        <FormattedMessage
                          id="jobTasks.modal.body.heading"
                          description="Text displayed above the lists of Tasks inside the Modal body."
                          defaultMessage="Tasks"
                        />
                      </h4>
                      <ul>
                        {values.tasks &&
                          values.tasks.map(
                            (task: TaskFormValues): React.ReactElement => (
                              <li>{task.description}</li>
                            ),
                          )}
                      </ul>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Modal.FooterCancelBtn>
                  <FormattedMessage
                    id="jobTasks.modal.cancelButtonLabel"
                    description="The text displayed on the cancel button of the Job Tasks modal."
                    defaultMessage="Go Back"
                  />
                </Modal.FooterCancelBtn>
                <Modal.FooterConfirmBtn>
                  <FormattedMessage
                    id="jobTasks.modal.confirmButtonLabel"
                    description="The text displayed on the confirm button of the Job Tasks modal."
                    defaultMessage="Next Step"
                  />
                </Modal.FooterConfirmBtn>
              </Modal.Footer>
            </Modal>
            <div data-c-dialog-overlay={isModalVisible ? "active" : ""} />
          </>
        )}
      />
    </div>
  );
};

export const JobTasksIntl = injectIntl(JobTasks);

export default JobTasks;

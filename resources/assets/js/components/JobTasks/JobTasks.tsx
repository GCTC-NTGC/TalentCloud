/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

interface JobTasksProps {}

const JobTasks: React.FunctionComponent<
  JobTasksProps
> = (): React.ReactElement => {
  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        Add Key Tasks
      </h3>
      <ul data-c-margin="bottom(double)">
        <li>
          What will your new team member spend their time on? What will they
          deliver?
        </li>
        <li>
          Focus on the key tasks. You don’t need to list every detail of the
          job, but applicants want to know how they will be spending most of
          their time.
        </li>
        <li>
          Aim to provide between four and six key tasks. (You can add as many
          key tasks as you want as you brainstorm here, but you can include no
          more than eight in the final job poster.)
        </li>
        <li>
          Once you have finished entering key tasks, you will move on to
          identify the individual skills needed to accomplish them.
        </li>
      </ul>
      <p data-c-alignment="tl(right)">You have no tasks added.</p>
      <div
        data-c-margin="top(normal) bottom(double)"
        data-c-background="grey(20)"
        data-c-padding="normal"
        data-c-radius="rounded"
        data-c-border="all(thin, solid, grey)"
        data-c-alignment="centre"
      >
        You don't have any tasks added yet!
      </div>
      <form>
        <div data-c-grid="gutter">
          <div
            className="job-builder-task"
            data-c-input="textarea"
            data-c-grid-item="base(1of1)"
          >
            <div>
              <button type="button" data-tc-builder-task-up-trigger>
                <i className="fas fa-long-arrow-alt-up" />
              </button>
              <button type="button" data-tc-builder-task-down-trigger>
                <i className="fas fa-long-arrow-alt-down" />
              </button>
            </div>
            <div>
              <button type="button" data-tc-builder-task-delete-trigger>
                <i className="fas fa-trash" data-c-colour="stop" />
              </button>
            </div>
            <label htmlFor="TA2">Task 01</label>
            <span>Required</span>
            <div>
              <textarea
                id="TA2"
                placeholder="Try for a casual, frank, friendly tone..."
              />
            </div>
            <span>This input has an error.</span>
          </div>
          <div
            className="job-builder-task"
            data-c-input="textarea"
            data-c-grid-item="base(1of1)"
          >
            <div>
              <button type="button" data-tc-builder-task-up-trigger>
                <i className="fas fa-long-arrow-alt-up" />
              </button>
              <button type="button" data-tc-builder-task-down-trigger>
                <i className="fas fa-long-arrow-alt-down" />
              </button>
            </div>
            <div>
              <button type="button" data-tc-builder-task-delete-trigger>
                <i className="fas fa-trash" data-c-colour="stop" />
              </button>
            </div>
            <label htmlFor="TA2">Task 02</label>
            <span>Required</span>
            <div>
              <textarea
                id="TA2"
                placeholder="Try for a casual, frank, friendly tone..."
              />
            </div>
            <span>This input has an error.</span>
          </div>
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
                  <i aria-hidden="true" className="fas fa-exclamation-circle" />
                  Just a heads up!
                </span>
                <p>
                  You have exceeded the maximum number of key tasks allowed, but
                  that’s okay. You can continue to add key tasks as you
                  brainstorm here, but you will be asked to trim your list to
                  eight key tasks or fewer to proceed.
                </p>
              </div>
            </div>
          </div>
          <div
            className="job-builder-task invalid"
            data-c-input="textarea"
            data-c-grid-item="base(1of1)"
          >
            <div>
              <button type="button" data-tc-builder-task-up-trigger>
                <i className="fas fa-long-arrow-alt-up" />
              </button>
              <button type="button" data-tc-builder-task-down-trigger>
                <i className="fas fa-long-arrow-alt-down" />
              </button>
            </div>
            <div>
              <button type="button" data-tc-builder-task-delete-trigger>
                <i className="fas fa-trash" data-c-colour="stop" />
              </button>
            </div>
            <label htmlFor="TA2">Task 03</label>
            <span>Required</span>
            <div>
              <textarea
                id="TA2"
                placeholder="Try for a casual, frank, friendly tone..."
              />
            </div>
            <span>This input has an error.</span>
          </div>
          <div
            className="job-builder-task invalid"
            data-c-input="textarea"
            data-c-grid-item="base(1of1)"
          >
            <div>
              <button type="button" data-tc-builder-task-up-trigger>
                <i className="fas fa-long-arrow-alt-up" />
              </button>
              <button type="button" data-tc-builder-task-down-trigger>
                <i className="fas fa-long-arrow-alt-down" />
              </button>
            </div>
            <div>
              <button type="button" data-tc-builder-task-delete-trigger>
                <i className="fas fa-trash" data-c-colour="stop" />
              </button>
            </div>
            <label htmlFor="TA2">Task 04</label>
            <span>Required</span>
            <div>
              <textarea
                id="TA2"
                placeholder="Try for a casual, frank, friendly tone..."
              />
            </div>
            <span>This input has an error.</span>
          </div>
        </div>
        <div data-c-grid="gutter">
          <div data-c-grid-item="base(1of1)" data-c-alignment="base(centre)">
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              type="button"
            >
              Add a Task
            </button>
          </div>
          <div data-c-grid-item="base(1of1)">
            <hr data-c-margin="top(normal) bottom(normal)" />
          </div>
          <div data-c-alignment="centre" data-c-grid-item="base(1of1)">
            <button
              data-c-button="solid(c1)"
              data-c-dialog-action="open"
              data-c-dialog-id="example-dialog-01"
              data-c-radius="rounded"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobTasks;

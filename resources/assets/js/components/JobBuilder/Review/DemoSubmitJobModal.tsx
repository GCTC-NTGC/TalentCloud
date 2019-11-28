import React from "react";
import { FormattedMessage } from "react-intl";

export const DemoSubmitJobModal: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      aria-describedby="upgrade-modal-description"
      aria-labelledby="upgrade-modal-title"
      data-c-dialog
      data-c-dialog-id="upgrade-modal"
      data-c-padding="top(double) bottom(double)"
      role="dialog"
    >
      <div data-c-background="white(100)" data-c-radius="rounded">
        <div
          data-c-background="c1(100)"
          data-c-padding="tb(normal) right(triple) left(normal)"
          data-c-border="bottom(thin, solid, black)"
        >
          <h5
            data-c-colour="white"
            data-c-font-size="h4"
            id="upgrade-modal-title"
            data-c-dialog-focus
          >
            <FormattedMessage
              id="demoSubmitJobModal.title"
              defaultMessage="Looks like you're using a demo account!"
              description="Title of modal explaining that demo managers cannot submit jobs."
            />
          </h5>
          <button
            data-c-colour="white"
            data-c-font-size="h3"
            data-c-dialog-action="close"
            data-c-dialog-id="upgrade-modal"
            type="button"
          >
            <i className="fa fa-times-circle"></i>
          </button>
        </div>
        <div data-c-border="bottom(thin, solid, black)" data-c-padding="normal">
          <div id="upgrade-modal-description">
            <p>
              <FormattedMessage
                id="demoSubmitJobModal.explanation"
                defaultMessage="Job Poster review and publishing is only available to Talent Cloud's partner departments."
                description="Summary explanation of why user cannot submit job."
              />
            </p>
            <p>This is the link part</p>
          </div>
        </div>
        <div data-c-padding="normal">
          <div data-c-grid="gutter middle">
            <div data-c-grid-item="base(1of2)">
              <button
                data-c-button="solid(c2)"
                data-c-radius="rounded"
                data-c-dialog-action="close"
                data-c-dialog-id="upgrade-modal"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

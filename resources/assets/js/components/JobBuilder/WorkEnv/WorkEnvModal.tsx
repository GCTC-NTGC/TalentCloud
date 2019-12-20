import React from "react";
import { FormattedMessage } from "react-intl";
import { WorkEnvFormValues } from "./WorkEnvForm";
import Modal from "../../Modal";
import JobWorkEnv from "../JobWorkEnv";

interface WorkEnvModalProps {
  modalConfirm: (values) => void;
  modalCancel: () => void;
  isVisible: boolean;
  parentElement: Element | null;
  values: WorkEnvFormValues;
  cultureSummary: string;
  jobIsComplete: boolean;
  handleSkipToReview: () => void;
}

const WorkEnvModal: React.FunctionComponent<WorkEnvModalProps> = ({
  modalConfirm,
  modalCancel,
  isVisible,
  parentElement,
  values,
  cultureSummary,
  jobIsComplete,
  handleSkipToReview,
}): React.ReactElement => {
  return (
    <>
      <Modal
        id="work-environment-preview"
        parentElement={parentElement}
        visible={isVisible}
        onModalConfirm={modalConfirm}
        onModalCancel={modalCancel}
        onModalMiddle={handleSkipToReview}
      >
        <Modal.Header>
          <div
            data-c-background="c1(100)"
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
          >
            <h5
              data-c-colour="white"
              data-c-font-size="h4"
              id="work-environment-preview-title"
            >
              <FormattedMessage
                id="jobBuilder.workEnv.greatStart"
                defaultMessage="You're off to a great start!"
                description="Kicker message at the start of the modal."
              />
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
            id="work-environment-preview-body"
          >
            <p>
              <FormattedMessage
                id="jobBuilder.workEnv.openingSentence"
                defaultMessage="Here's a preview of the Job Information you just entered. Feel
                free to go back and edit things or move to the next step if
                you're happy with it."
                description="Opening sentence for modal."
              />
            </p>
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
                  id="jobBuilder.workEnvModal.title"
                  defaultMessage="Work Environment"
                  description="Header of job poster builder work environment step."
                />
              </h4>
              <JobWorkEnv
                teamSize={values.teamSize || 0}
                selectedEnvOptions={[
                  ...values.amenities,
                  ...values.physicalEnv,
                  ...values.technology,
                ]}
              />
              <h4
                data-c-border="bottom(thin, solid, black)"
                data-c-font-size="h4"
                data-c-font-weight="600"
                data-c-margin="top(double) bottom(normal)"
                data-c-padding="bottom(normal)"
              >
                <FormattedMessage
                  id="jobBuilder.workEnvModal.workCultureTitle"
                  defaultMessage="Work Culture"
                  description="The title displayed for the work culture section on modal."
                />
              </h4>
              <p>{cultureSummary}</p>
              {values.moreCultureSummary && (
                <p data-c-margin="top(normal)">{values.moreCultureSummary}</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterCancelBtn>
            <FormattedMessage
              id="jobBuilder.workEnvModal.cancelLabel"
              defaultMessage="Go Back"
              description="The label displayed on modal cancel button."
            />
          </Modal.FooterCancelBtn>
          {jobIsComplete && (
            <Modal.FooterMiddleBtn>
              <FormattedMessage
                id="jobBuilder.workEnvModal.modalMiddleLabel"
                defaultMessage="Skip to Review"
                description="The text displayed on the 'Skip to Review' button of the Work Env modal."
              />
            </Modal.FooterMiddleBtn>
          )}
          <Modal.FooterConfirmBtn>
            <FormattedMessage
              id="jobBuilder.workEnvModal.confirmLabel"
              defaultMessage="Next Step"
              description="The label displayed on modal confirm button."
            />
          </Modal.FooterConfirmBtn>
        </Modal.Footer>
      </Modal>
      <div data-c-dialog-overlay={isVisible ? "active" : ""} />
    </>
  );
};

export default WorkEnvModal;

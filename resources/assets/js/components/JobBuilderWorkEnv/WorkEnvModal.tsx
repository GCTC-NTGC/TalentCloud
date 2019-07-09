import React from "react";
import { FormattedMessage } from "react-intl";
import { FormValues } from "./WorkEnvForm";
import Modal from "../Modal";

interface WorkEnvModalProps {
  modalConfirm: (values) => void;
  modalCancel: () => void;
  isVisible: boolean;
  parentElement: Element | null;
  values: FormValues;
  cultureSummary: string;
  physEnvData: { name: string; label: string }[];
  techData: { name: string; label: string }[];
  amenitiesData: { name: string; label: string }[];
}

const WorkEnvModal: React.FunctionComponent<WorkEnvModalProps> = ({
  modalConfirm,
  modalCancel,
  isVisible,
  parentElement,
  values,
  cultureSummary,
  physEnvData,
  techData,
  amenitiesData,
}): React.ReactElement => {
  return (
    <>
      <Modal
        id="work-environment-preview"
        parentElement={parentElement}
        visible={isVisible}
        onModalConfirm={modalConfirm}
        onModalCancel={modalCancel}
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
            <FormattedMessage
              id="jobBuilder.workEnv.openingSentence"
              defaultMessage="Here's a preview of the Job Information you just entered. Feel
                free to go back and edit things or move to the next step if
                you're happy with it."
              description="Opening sentence for modal."
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
                  id="jobBuilder.workEnv.title"
                  defaultMessage="Work Environment"
                  description="Header of job poster builder work environment step."
                />
              </h4>
              <div data-c-grid="gutter">
                <div data-c-grid-item="base(1of1)">
                  <span
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.teamSize"
                      defaultMessage="Team Size"
                      description="Title for Team size section."
                    />
                  </span>
                  <span data-c-margin="left(normal)">{values.teamSize}</span>
                </div>
                <div data-c-grid-item="base(1of1)">
                  <p
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.physicalEnvLabel"
                      defaultMessage="Our Physical Environment"
                      description="The label displayed on the physical environment checkbox group."
                    />
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {physEnvData &&
                        physEnvData.map(
                          ({ label, name }): React.ReactElement => {
                            const checkedPhyEnvValues = values.physicalEnv;
                            const checked =
                              checkedPhyEnvValues.find(
                                (value): boolean => name === value,
                              ) && "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check" />
                                </div>
                                <span>{label}</span>
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                </div>
                <div data-c-grid-item="base(1of1)">
                  <p
                    data-c-colour="c1"
                    data-c-padding="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.technologyLabel"
                      defaultMessage="Technology"
                      description="The label displayed on the technology checkbox group."
                    />
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {techData &&
                        techData.map(
                          ({ label, name }): React.ReactElement => {
                            const checkedTechValues = values.technology;
                            const checked =
                              checkedTechValues.find(
                                (value): boolean => name === value,
                              ) && "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check" />
                                </div>
                                <span>{label}</span>
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                </div>
                <div data-c-grid-item="base(1of1)">
                  <p
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    <FormattedMessage
                      id="jobBuilder.workEnv.technologyLabel"
                      defaultMessage="Technology"
                      description="The label displayed on the technology checkbox group."
                    />
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {amenitiesData &&
                        amenitiesData.map(
                          ({ label, name }): React.ReactElement => {
                            const amenitiesValues = values.amenities;
                            const checked =
                              amenitiesValues.find(
                                (value): boolean => name === value,
                              ) && "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check" />
                                </div>
                                <span>{label}</span>
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                </div>
                {values.envDescription && (
                  <div data-c-grid-item="base(1of1)">
                    <span
                      data-c-colour="c1"
                      data-c-margin="top(half) bottom(half)"
                      data-c-font-weight="bold"
                    >
                      <FormattedMessage
                        id="jobBuilder.workEnv.moreOnWorkEnvLabel"
                        defaultMessage="More About Your Environment"
                        description="The label displayed for the more about your environment textbox."
                      />
                    </span>
                    <p data-c-margin="top(half)">{values.envDescription}</p>
                  </div>
                )}
              </div>
              <h4
                data-c-border="bottom(thin, solid, black)"
                data-c-font-size="h4"
                data-c-font-weight="600"
                data-c-margin="top(double) bottom(normal)"
                data-c-padding="bottom(normal)"
              >
                <FormattedMessage
                  id="jobBuilder.workEnv.workCultureTitle"
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
              id="jobBuilder.workEnv.modalCancelLabel"
              defaultMessage="Go Back"
              description="The label displayed on modal cancel button."
            />
          </Modal.FooterCancelBtn>
          <Modal.FooterConfirmBtn>
            <FormattedMessage
              id="jobBuilder.workEnv.modalConfirmLabel"
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

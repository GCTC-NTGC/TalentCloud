import React from "react";
import {
  FormValues,
  physicalEnvOptions,
  technologyOptions,
  amenitiesOptions,
} from "./WorkEnvForm";
import Modal from "../Modal";

interface WorkEnvModalProps {
  values: FormValues;
  isVisible: boolean;
  parentElement: Element | null;
}

const WorkEnvModal: React.FunctionComponent<WorkEnvModalProps> = ({
  values,
  isVisible,
  parentElement,
}): React.ReactElement => {
  return (
    <>
      <Modal
        id="job-details-preview"
        parentElement={parentElement}
        visible={isVisible}
        onModalConfirm={(): void => {
          console.log("Confirmed");
        }}
        onModalCancel={(): void => {
          console.log("Cancelled");
        }}
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
              id="job-details-preview-title"
            >
              You&apos;re off to a great start!
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            data-c-border="bottom(thin, solid, black)"
            data-c-padding="normal"
            id="job-details-preview"
          >
            Here&apos;s a preview of the Job Information you just entered. Feel
            free to go back and edit things or move to the next step if
            you&apos;re happy with it.
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
                Work Environment
              </h4>
              <div data-c-grid="gutter">
                <div data-c-grid-item="base(1of1)">
                  <span
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    Team Size
                  </span>
                  <span>10</span>
                </div>
                <div data-c-grid-item="base(1of1)">
                  <p
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    Physical Environment
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {physicalEnvOptions &&
                        physicalEnvOptions.map(
                          ({ label, name }): React.ReactElement => {
                            const checkedPhyEnvValues = values.physicalEnv;
                            const checked =
                              checkedPhyEnvValues.find(
                                value => name === value,
                              ) && "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check"></i>
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
                    Technology
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {technologyOptions &&
                        technologyOptions.map(
                          ({ label, name }): React.ReactElement => {
                            const checkedTechValues = values.technology;
                            const checked =
                              checkedTechValues.find(value => name === value) &&
                              "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check"></i>
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
                    Amenities
                  </p>
                  <div data-c-margin="left(quarter)">
                    <div data-c-grid="gutter">
                      {amenitiesOptions &&
                        amenitiesOptions.map(
                          ({ label, name }): React.ReactElement => {
                            const amenitiesValues = values.amenities;
                            const checked =
                              amenitiesValues.find(value => name === value) &&
                              "checked";
                            return (
                              <div data-c-grid-item="tp(1of2)">
                                <div className={`job-builder-check ${checked}`}>
                                  <i className="fa fa-check"></i>
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
                  <span
                    data-c-colour="c1"
                    data-c-margin="top(half) bottom(half)"
                    data-c-font-weight="bold"
                  >
                    More About Your Environment
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur luctus porta ante at ornare. Nam pulvinar ultrices
                    tellus eget lobortis. Etiam efficitur in nibh eget ornare.
                    Duis vel porta ante, at ornare lorem. Sed est eros,
                    dignissim ac auctor eget, pretium at mauris. Nullam vitae
                    lacus id eros hendrerit sollicitudin ac at lectus. Fusce
                    neque odio, facilisis vitae augue in, feugiat pulvinar
                    neque. Nulla pretium et lectus at molestie. Ut eleifend
                    efficitur venenatis. Curabitur non eros at eros finibus
                    condimentum. Nam fringilla auctor quam ut egestas.
                  </p>
                </div>
              </div>
              <h4
                data-c-border="bottom(thin, solid, black)"
                data-c-font-size="h4"
                data-c-font-weight="600"
                data-c-margin="top(double) bottom(normal)"
                data-c-padding="bottom(normal)"
              >
                Work Culture
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur luctus porta ante at ornare. Nam pulvinar ultrices
                tellus eget lobortis. Etiam efficitur in nibh eget ornare. Duis
                vel porta ante, at ornare lorem. Sed est eros, dignissim ac
                auctor eget, pretium at mauris. Nullam vitae lacus id eros
                hendrerit sollicitudin ac at lectus. Fusce neque odio, facilisis
                vitae augue in, feugiat pulvinar neque. Nulla pretium et lectus
                at molestie. Ut eleifend efficitur venenatis. Curabitur non eros
                at eros finibus condimentum. Nam fringilla auctor quam ut
                egestas.
              </p>
              <p data-c-margin="top(normal)">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur luctus porta ante at ornare. Nam pulvinar ultrices
                tellus eget lobortis. Etiam efficitur in nibh eget ornare. Duis
                vel porta ante, at ornare lorem. Sed est eros, dignissim ac
                auctor eget, pretium at mauris. Nullam vitae lacus id eros
                hendrerit sollicitudin ac at lectus. Fusce neque odio, facilisis
                vitae augue in, feugiat pulvinar neque. Nulla pretium et lectus
                at molestie. Ut eleifend efficitur venenatis. Curabitur non eros
                at eros finibus condimentum. Nam fringilla auctor quam ut
                egestas.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterCancelBtn>Go Back</Modal.FooterCancelBtn>
          <Modal.FooterConfirmBtn>Next Step</Modal.FooterConfirmBtn>
        </Modal.Footer>
      </Modal>
      <div data-c-dialog-overlay={isVisible ? "active" : ""} />
    </>
  );
};

export default WorkEnvModal;

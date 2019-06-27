import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Modal from "../components/Modal";
import Input from "../components/Forms/Input";

const stories = storiesOf("Modal", module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs);

stories.add(
  "Basic Modal",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true);
    const modalParent = document.querySelector("#modal-root");
    return (
      <div id="modal-container">
        <div
          id="modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <div>
          <Modal
            id="basic-modal"
            visible={isModalVisible}
            parentElement={modalParent}
            onModalConfirm={action("Confirmed")}
            onModalCancel={action("Cancelled")}
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
                  id="basic-modal-title"
                >
                  {text("Modal Header", "This is the the Modal Header!")}
                </h5>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div
                data-c-border="bottom(thin, solid, black)"
                data-c-padding="normal"
                id="basic-modal-description"
              >
                {text("Modal Body", "This text is in the body of the modal.")}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Modal.FooterCancelBtn>
                {text("Modal Cancel", "Go Back")}
              </Modal.FooterCancelBtn>
              <Modal.FooterConfirmBtn>
                {text("Modal Confirm", "Next Step")}
              </Modal.FooterConfirmBtn>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  },
);
stories.add(
  "Modal with form inputs",
  (): React.ReactElement => {
    const isModalVisible = boolean("Visible", true);
    const modalParent = document.querySelector("#modal-root");
    return (
      <div id="modal-container">
        <div
          id="modal-overlay"
          data-c-dialog-overlay={isModalVisible ? "active" : ""}
        />
        <Modal
          id="form-modal"
          visible={isModalVisible}
          parentElement={modalParent}
          onModalConfirm={action("Confirmed")}
          onModalCancel={action("Cancelled")}
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
                id="form-modal-title"
              >
                {text("Modal Header", "This is the the Modal Header!")}
              </h5>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
              id="form-modal-description"
            >
              {text(
                "Modal Body",
                "This text is in the body of the modal. Try tabbing through all inputs.",
              )}
            </div>
            <form data-c-padding="normal">
              <Input
                id="modal-input-1"
                name="modal-input-1"
                label="This is a text input"
                required
                placeholder="What will you write here?"
                type="text"
                onChange={action("Input 1 changed")}
              />
              <button
                data-c-button="solid(c1)"
                data-c-radius="rounded"
                type="submit"
                onClick={action("Input button clicked")}
              >
                Test Button
              </button>
              <Input
                id="modal-input-2"
                name="modal-input-2"
                label="This is a second input"
                required
                placeholder="Hello World"
                type="text"
                onChange={action("Input 2 changed")}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Modal.FooterCancelBtn>Go Back</Modal.FooterCancelBtn>
            <Modal.FooterConfirmBtn>Next Step</Modal.FooterConfirmBtn>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
);

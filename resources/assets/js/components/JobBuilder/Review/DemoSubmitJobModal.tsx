import React from "react";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import Modal from "../../Modal";
import { managerFaq } from "../../../helpers/routes";

interface DemoSubmitJobModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  parentElement: Element | null;
}

const messages = defineMessages({
  linkTitle: {
    id: "demoSubmitJobModal.link.title",
    defaultMessage:
      "Find out how to access Job Poster review and publishing features.",
    description: "Title of link to further information.",
  },
});

export const DemoSubmitJobModal: React.FC<DemoSubmitJobModalProps> = ({
  isVisible,
  handleCancel,
  parentElement,
}) => {
  const intl = useIntl();
  return (
    <Modal
      id="demo-submit-job-modal"
      visible={isVisible}
      onModalCancel={handleCancel}
      onModalConfirm={handleCancel}
      parentElement={parentElement}
    >
      <Modal.Header>
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
        </div>
      </Modal.Header>
      <Modal.Body>
        <div data-c-padding="normal">
          <div id="upgrade-modal-description">
            <p>
              <FormattedMessage
                id="demoSubmitJobModal.explanation"
                defaultMessage="Job Poster review and publishing is only available to Talent Cloud's partner departments."
                description="Summary explanation of why user cannot submit job."
              />
            </p>
            <p>
              <FormattedMessage
                id="demoSubmitJobModal.link"
                defaultMessage="To find out if you can access these features, <a>click here</a>."
                description="Explanation of where to find more information."
                values={{
                  a: msg => (
                    <a
                      href={managerFaq(intl.locale, "manager-who")}
                      title={intl.formatMessage(messages.linkTitle)}
                    >
                      {msg}
                    </a>
                  ),
                }}
              />
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterCancelBtn>
          <FormattedMessage
            id="demoSubmitJobModal.cancel"
            defaultMessage="Go back"
            description="Cancel button of Demo Submit Job modal."
          />
        </Modal.FooterCancelBtn>
      </Modal.Footer>
    </Modal>
  );
};

export default DemoSubmitJobModal;

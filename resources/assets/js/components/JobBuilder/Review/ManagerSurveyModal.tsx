import React from "react";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";
import Modal from "../../Modal";
import { managerFaq } from "../../../helpers/routes";

interface ManagerSurveyModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  parentElement: Element | null;
}

export const managerSurveyMessages = defineMessages({
  managerSurveyTitle: {
    id: "managerSurveyModal.title",
    defaultMessage: "Your job poster has been submitted!",
    description: "Title of modal explaining managers job has been submitted.",
  },
  managerSurveyExplanation: {
    id: "managerSurveyModal.explanation",
    defaultMessage:
      "Your feedback helps us improve our tools! Please take a few minutes to complete this <a>survey</a>.",
    description: "Explanation of how to get to manager survey.",
  },
  managerSurveyLinkTitle: {
    id: "managerSurveyModal.managerSurveyLinkTitle",
    defaultMessage: "Link to manager survey.",
    description: "Title of link to further information.",
  },
});

export const ManagerSurveyModal: React.FC<ManagerSurveyModalProps> = ({
  isVisible,
  handleCancel,
  parentElement,
}) => {
  const intl = useIntl();
  return (
    <Modal
      id="manager-survey-modal"
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
            {intl.formatMessage(managerSurveyMessages.managerSurveyTitle)}
          </h5>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div data-c-padding="normal">
          <div id="upgrade-modal-description">
            <p>
              {intl.formatMessage(
                managerSurveyMessages.managerSurveyExplanation,
                {
                  a: msg => (
                    <a
                      href="https://talentcloud1.typeform.com/to/MrOkgK"
                      title={intl.formatMessage(
                        managerSurveyMessages.managerSurveyLinkTitle,
                      )}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {msg}
                    </a>
                  ),
                },
              )}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterCancelBtn>
          <FormattedMessage
            id="managerSurveyModal.cancel"
            defaultMessage="Go back to My Job Posters"
            description="Cancel button of Demo Submit Job modal."
          />
        </Modal.FooterCancelBtn>
      </Modal.Footer>
    </Modal>
  );
};

export default ManagerSurveyModal;

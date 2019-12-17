import React from "react";
import { defineMessages, useIntl } from "react-intl";
import Modal from "../../Modal";
import { managerJobIndex } from "../../../helpers/routes";

interface ManagerSurveyModalProps {
  isVisible: boolean;
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
      "Your feedback helps us improve our tools! Please take a few minutes to complete a survey.",
    description: "Explanation of how to get to manager survey.",
  },
  managerSurveyLinkTitle: {
    id: "managerSurveyModal.managerSurveyLinkTitle",
    defaultMessage: "Link to manager survey.",
    description: "Title of link to further information.",
  },
  managerSurveyLink: {
    id: "managerSurveyModal.link",
    defaultMessage: "Take me to the survey",
    description: "Link to manager survey.",
  },
  jobPosterLink: {
    id: "managerSurveyModal.jobPosterLink",
    defaultMessage: "Go back to <a>My Job Posters</>.",
    description: "Link to job poster index.",
  },
  jobPosterLinkTitle: {
    id: "managerSurveyModal.jobPosterLinkTitle",
    defaultMessage: "Visit My Job Posters.",
    description: "Title for link to job poster index.",
  },
});

export const ManagerSurveyModal: React.FC<ManagerSurveyModalProps> = ({
  isVisible,
  parentElement,
}) => {
  const intl = useIntl();
  return (
    <Modal
      id="manager-survey-modal"
      visible={isVisible}
      onModalCancel={(): void => {}}
      onModalConfirm={(): void => {}}
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
              )}
            </p>
            <p data-c-margin="top(normal)">
              {intl.formatMessage(managerSurveyMessages.jobPosterLink, {
                a: msg => (
                  <a
                    href={managerJobIndex(intl.locale)}
                    title={intl.formatMessage(
                      managerSurveyMessages.jobPosterLinkTitle,
                    )}
                  >
                    {msg}
                  </a>
                ),
              })}
            </p>
          </div>
        </div>
      </Modal.Body>
      <div data-c-padding="half" data-c-alignment="base(right)">
        <a
          data-c-button="solid(c1)"
          data-c-dialog-action="close"
          data-c-radius="rounded"
          style={{ textDecoration: "none" }}
          href="https://talentcloud1.typeform.com/to/MrOkgK"
          title={intl.formatMessage(
            managerSurveyMessages.managerSurveyLinkTitle,
          )}
          target="_blank"
          rel="noreferrer noopener"
        >
          {intl.formatMessage(managerSurveyMessages.managerSurveyLink)}
        </a>
      </div>
    </Modal>
  );
};

export default ManagerSurveyModal;

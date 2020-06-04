import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import Modal from "../../Modal";
import { jobShow } from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";

const messages = defineMessages({
  linkToJobTitle: {
    id: "experienceModal.linkToJob.title",
    defaultMessage:
      "Open the job poster in a new tab or window to review the definition of skills.",
    description: "Title attribute for the link back to the job.",
  },
});

interface BaseExperienceModalProps {
  id: string;
  title: string;
  iconClass: string;
  description: string;
  jobId: number;
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: () => void;
}

export const BaseExperienceModal: React.FC<BaseExperienceModalProps> = ({
  id,
  title,
  iconClass,
  description,
  jobId,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
  children,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  return (
    <Modal
      id={id}
      parentElement={parentElement}
      visible={visible}
      onModalCancel={onModalCancel}
      onModalConfirm={onModalConfirm}
      className="application-experience-dialog"
    >
      <Modal.Header>
        <div
          data-c-background="c1(100)"
          data-c-border="bottom(thin, solid, black)"
          data-c-padding="tb(1)"
        >
          <div data-c-container="medium">
            <h5
              data-c-colour="white"
              data-c-font-size="h3"
              data-c-font-weight="bold"
              data-c-dialog-focus
            >
              {title}
            </h5>
          </div>
          <i
            className={`fas ${iconClass}`}
            data-c-font-size="h1"
            data-c-color="c1"
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div data-c-padding="top(1)">
          <div data-c-container="medium">
            <p>{description}</p>
          </div>
        </div>
        <div>
          <div data-c-container="medium">
            <p
              data-c-margin="top(2) bottom(1)"
              data-c-font-size="h4"
              data-c-font-weight="bold"
              data-c-color="c3"
            >
              <FormattedMessage
                id="experienceModal.detailsSubtitle"
                defaultMessage="Experience Details"
                description="Subtitle of Experience Details section."
              />
            </p>
          </div>
          {children}
          <div data-c-container="medium">
            <p
              data-c-margin="top(1) bottom(1)"
              data-c-font-size="h4"
              data-c-font-weight="bold"
              data-c-color="c3"
            >
              <FormattedMessage
                id="experienceModal.connectSubtitle"
                defaultMessage="Connect This Experience to the Job"
                description="Subtitle of Connect-to-skills section."
              />
            </p>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="experienceModal.connectDescription"
                defaultMessage="Below you can select which of the job skills you used during this experience. Later on, you’ll be asked to provide a few sentences to help managers understand how you used this skill. You can <a>review the definitions</a> of the skills on the job poster."
                description="Explanation for Connect-to-skills section."
                values={{
                  a: (...chunks): React.ReactElement => (
                    <a
                      href={jobShow(locale, jobId)}
                      title={intl.formatMessage(messages.linkToJobTitle)}
                      target="_blank"
                    >
                      {chunks}
                    </a>
                  ),
                }}
              />
            </p>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="experienceModal.connectDescription.noSkillsOkay"
                defaultMessage="If none of the skills apply to this experience, feel free to save it without any skills selected."
                description="Explanation that you can save an experience without connecting it to skills yet."
              />
            </p>
          </div>
          {/* {% include "applicant/application/dialogs/skill-selection" %} */}
          <div data-c-container="medium">
            <p
              data-c-margin="top(1) bottom(1)"
              data-c-font-size="h4"
              data-c-font-weight="bold"
              data-c-color="c3"
            >
              <FormattedMessage
                id="experienceModal.educationSubtitle"
                defaultMessage="Use This Experience as an Education Requirement"
                description="Subtitle for the use-as-Education-Requirement section."
              />
            </p>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="experienceModal.educationDescription"
                defaultMessage="You can select the option below if you feel that this experience helps you meet some or all of the specific education requirements for this job. We've included the requirements below to help refresh your memory."
                description="Explanation for the use-as-Education-Requirement section."
              />
            </p>
          </div>
          {/* {% include "applicant/application/dialogs/education-selection" %} */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterCancelBtn>
          <FormattedMessage
            id="experienceModal.cancel"
            defaultMessage="Cancel"
            description="Cancel button text"
          />
        </Modal.FooterCancelBtn>
        <Modal.FooterConfirmBtn>
          <FormattedMessage
            id="experienceModal.save"
            defaultMessage="Save Experience"
            description="Save button text"
          />
        </Modal.FooterConfirmBtn>
      </Modal.Footer>
    </Modal>
  );
};

export default BaseExperienceModal;

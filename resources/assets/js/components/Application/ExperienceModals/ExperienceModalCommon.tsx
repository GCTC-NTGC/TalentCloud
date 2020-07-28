import React from "react";
import { FormattedMessage } from "react-intl";
import Modal from "../../Modal";

export const ExperienceModalHeader: React.FC<{
  title: string;
  iconClass: string;
}> = ({ title, iconClass }) => {
  return (
    <div
      className="dialog-header"
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
  );
};

export const ExperienceDetailsIntro: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <>
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
      </div>
    </>
  );
};

export const ExperienceModalFooter: React.FC<{
  buttonsDisabled: boolean;
}> = ({ buttonsDisabled = false }) => {
  return (
    <Modal.Footer>
      <Modal.FooterCancelBtn disabled={buttonsDisabled}>
        <FormattedMessage
          id="experienceModal.cancel"
          defaultMessage="Cancel"
          description="Cancel button text"
        />
      </Modal.FooterCancelBtn>
      <div data-c-alignment="base(right)">
        {/*
          This submit button doesn't use Modal.FooterConfirmBtn because it needs to
          submit a Formik form instead of triggering onModalConfirm.
        */}
        <button
          disabled={buttonsDisabled}
          data-c-button="solid(c1)"
          data-c-radius="rounded"
          type="submit"
        >
          <FormattedMessage
            id="experienceModal.save"
            defaultMessage="Save Experience"
            description="Save button text"
          />
        </button>
      </div>
    </Modal.Footer>
  );
};

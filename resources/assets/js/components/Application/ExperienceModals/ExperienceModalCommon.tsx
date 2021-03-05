import React from "react";
import { FormattedMessage } from "react-intl";
import { Experience, Skill } from "../../../models/types";
import Dialog from "../../H2Components/Dialog";
import Modal from "../../Modal";

export type ExperienceSubmitData<T extends Experience> = {
  experience: T;
  savedRequiredSkills: Skill[];
  savedOptionalSkills: Skill[];
};

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

export const ExperienceModalHeaderH2: React.FC<{
  title: string;
  iconClass: string;
}> = ({ title, iconClass }) => {
  return (
    <Dialog.Header
      className="dialog-header"
      data-h2-bg-color="b(theme-1, 1)"
      data-h2-border="b(black, bottom, solid, thin)"
      data-h2-padding="b(tb, 1)"
    >
      <div data-h2-container="b(center, medium)">
        <Dialog.Title
          data-h2-font-color="b(white)"
          data-h2-font-size="b(h3)"
          data-h2-font-weight="b(600)"
        >
          {title}
        </Dialog.Title>
      </div>
      <i
        className={`fas ${iconClass}`}
        data-h2-font-size="h1"
        data-h2-font-color="b(theme-1)"
      />
    </Dialog.Header>
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
              id="application.experienceModal.detailsSubtitle"
              defaultMessage="Experience Details"
              description="Subtitle of Experience Details section."
            />
          </p>
        </div>
      </div>
    </>
  );
};
export const ExperienceDetailsIntroH2: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <>
      <div data-h2-padding="b(top, 1)">
        <div data-h2-container="b(center, medium)">
          <p>{description}</p>
        </div>
      </div>
      <div>
        <div data-h2-container="b(center, medium)">
          <p
            data-h2-margin="b(top, 2) b(bottom, 1)"
            data-h2-font-size="b(h4)"
            data-h2-font-weight="b(600)"
            data-h2-font-color="b(theme-3)"
          >
            <FormattedMessage
              id="application.experienceModal.detailsSubtitle"
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
          id="application.experienceModal.cancel"
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
            id="application.experienceModal.save"
            defaultMessage="Save Experience"
            description="Save button text"
          />
        </button>
      </div>
    </Modal.Footer>
  );
};
export const ExperienceModalFooterH2: React.FC<{
  buttonsDisabled: boolean;
}> = ({ buttonsDisabled = false }) => {
  return (
    <Dialog.Actions>
      <div data-h2-grid="b(middle, contained, padded, 1)">
        <div data-h2-grid-item="b(1of1) s(1of2)">
          <div data-h2-grid-content data-h2-align="b(center) s(left)">
            <Dialog.ActionBtn
              buttonStyling="theme-1, round, medium, outline"
              disabled={buttonsDisabled}
            >
              <FormattedMessage
                id="application.experienceModal.cancel"
                defaultMessage="Cancel"
                description="Cancel button text"
              />
            </Dialog.ActionBtn>
          </div>
        </div>
        <div data-h2-grid-item="b(1of1) s(1of2)">
          <div data-h2-grid-content data-h2-align="b(center) s(right)">
            <Dialog.ActionBtn
              buttonStyling="theme-1, round, medium, solid"
              disabled={buttonsDisabled}
              type="submit"
            >
              <FormattedMessage
                id="application.experienceModal.save"
                defaultMessage="Save Experience"
                description="Save button text"
              />
            </Dialog.ActionBtn>
          </div>
        </div>
      </div>
    </Dialog.Actions>
  );
};

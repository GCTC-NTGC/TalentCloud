import React from "react";
import Modal from "../../Modal";

interface BaseExperienceModalProps {
  id: string;
  title: string;
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: () => void;
}

export const BaseExperienceModal: React.FC<BaseExperienceModalProps> = ({
  id,
  title,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
}) => {
  return (
    <Modal
      id={id}
      parentElement={parentElement}
      visible={visible}
      onModalCancel={onModalCancel}
      onModalConfirm={onModalConfirm}
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
            {title}
          </h5>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default BaseExperienceModal;

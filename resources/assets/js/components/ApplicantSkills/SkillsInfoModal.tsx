import * as React from 'react';
import ReactDOM from 'react-dom';
import InfoModal from '../InfoModal';

interface SkillsInfoModalProps {
  /** HTML ID for modal attributes */
  id: string;
  /** Title that appears within the modal when open */
  title: string;
  /** Optional subtitle that appears within the open modal */
  subtitle?: string;
  /** Text displayed on the button that displays the modal */
  openText: string;
  /** Text displayed on the button that hides the modal */
  closeText: string;
  /** Text displayed on the modal confirmation button */
  confirmText: string;
  /** Text displayed on the modal cancellation button */
  cancelText: string;
  /** Text displayed inside the modal */
  modalInfo: any;
}

const SkillsInfoModal: React.FunctionComponent<SkillsInfoModalProps> = ({
  id,
  title,
  subtitle,
  openText,
  closeText,
  confirmText,
  cancelText,
  modalInfo,
}): React.ReactElement => {
  const { subtext, example_lists } = modalInfo;
  return (
    <InfoModal
      id={id}
      title={title}
      openText={openText}
      closeText={closeText}
      confirmText={confirmText}
      cancelText={cancelText}
      // handleConfirm={handleConfirm}
    >
      <div className="modal-info__wrapper">
        <p className="modal-info__subtext">{subtext}</p>
        <div className="modal-info__list-wrapper">
          {Object.values(example_lists).map((exampleList: any, i: number) => {
            return (
              <React.Fragment>
                <h6 className={i === 0 ? 'color-green' : 'color-red'}>
                  {exampleList.title}
                </h6>
                <ul>
                  {Object.values(exampleList.examples).map((example: any) => {
                    return (
                      <li>
                        <p className="list-item__title">
                          {i === 0 ? (
                            <i className="far fa-check-circle" />
                          ) : (
                            <i className="far fa-times-circle" />
                          )}
                          {example.name}
                        </p>
                        <p className="list-item__content">{example.content}</p>
                      </li>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </InfoModal>
  );
};

if (document.querySelectorAll('div[data-skills-info-modal]')) {
  const elements = document.querySelectorAll('div[data-skills-info-modal]');

  Array.prototype.slice.call(elements).forEach(container => {
    if (container != null && container.hasAttribute('data-skills-info-modal')) {
      const id = container.getAttribute('data-skills-info-modal') as string;
      const title = container.getAttribute('data-title') as string;
      const openText = container.getAttribute('data-open-text') as string;
      const closeText = container.getAttribute('data-close-text') as string;
      const confirmText = container.getAttribute('data-confirm-text') as string;
      const cancelText = container.getAttribute('data-cancel-text') as string;
      const modalInfo = JSON.parse(container.getAttribute(
        'data-modal-info',
      ) as string);

      ReactDOM.render(
        <SkillsInfoModal
          key={id}
          id={id}
          title={title}
          openText={openText}
          closeText={closeText}
          confirmText={confirmText}
          cancelText={cancelText}
          modalInfo={modalInfo}
        />,
        container,
      );
    }
  });
}

export default SkillsInfoModal;

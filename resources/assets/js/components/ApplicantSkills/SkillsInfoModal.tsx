/* eslint-disable camelcase, @typescript-eslint/camelcase */
import React from "react";
import ReactDOM from "react-dom";
import InfoModal from "../InfoModal";

interface SkillsInfoModalProps {
  /** HTML ID for modal attributes */
  id: string;
  /** Title that appears within the modal when open */
  title: string;
  /** Text displayed on the button that displays the modal */
  openText: string;
  /** Text displayed on the modal confirmation button */
  confirmText: string;
  /** Text displayed inside the modal */
  modalInfo: any;
}

const SkillsInfoModal: React.FunctionComponent<SkillsInfoModalProps> = ({
  id,
  title,
  openText,
  confirmText,
  modalInfo,
}): React.ReactElement => {
  const { subtext, example_lists } = modalInfo;
  return (
    <InfoModal
      id={id}
      title={title}
      openText={openText}
      confirmText={confirmText}
    >
      <div className="modal-info__wrapper">
        {Object.values(subtext).map(
          (item: string): React.ReactElement => {
            return <p className="modal-info__subtext">{item}</p>;
          },
        )}
        <div className="modal-info__list-wrapper">
          {Object.values(example_lists).map(
            (exampleList: any, i: number): React.ReactElement => {
              return (
                <>
                  <h6 className={i === 0 ? "color-green" : "color-red"}>
                    {exampleList.title}
                  </h6>
                  <ul>
                    {Object.values(exampleList.examples).map(
                      (example: any): React.ReactElement => {
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
                            {Array.isArray(example.content) ? (
                              Object.values(example.content).map(
                                (item: string): React.ReactElement => {
                                  return (
                                    <p className="list-item__content">{item}</p>
                                  );
                                },
                              )
                            ) : (
                              <p className="list-item__content">
                                {example.content}
                              </p>
                            )}
                          </li>
                        );
                      },
                    )}
                  </ul>
                </>
              );
            },
          )}
        </div>
      </div>
    </InfoModal>
  );
};

if (document.querySelectorAll("div[data-skills-info-modal]")) {
  const elements = document.querySelectorAll("div[data-skills-info-modal]");

  Array.prototype.slice.call(elements).forEach((container):
    | void
    | React.Component<any, any, any>
    | Element => {
    if (container != null && container.hasAttribute("data-skills-info-modal")) {
      const id = container.getAttribute("data-skills-info-modal") as string;
      const title = container.getAttribute("data-title") as string;
      const openText = container.getAttribute("data-open-text") as string;
      const confirmText = container.getAttribute("data-confirm-text") as string;
      const modalInfo = JSON.parse(container.getAttribute(
        "data-modal-info",
      ) as string);

      ReactDOM.render(
        <SkillsInfoModal
          key={id}
          id={id}
          title={title}
          openText={openText}
          confirmText={confirmText}
          modalInfo={modalInfo}
        />,
        container,
      );
    }
  });
}

export default SkillsInfoModal;

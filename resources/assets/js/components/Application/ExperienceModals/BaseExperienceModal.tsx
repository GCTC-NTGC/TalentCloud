import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Formik, Form } from "formik";
import Modal from "../../Modal";
import { getLocale } from "../../../helpers/localize";
import SkillSubform, { SkillFormValues } from "./SkillSubform";

interface BaseExperienceModalProps {
  id: string;
  title: string;
  iconClass: string;
  description: string;
  jobId: number;
  requiredSkills: string[];
  savedRequiredSkills: string[];
  optionalSkills: string[];
  savedOptionalSkills: string[];
  parentElement: Element | null;
  visible: boolean;
  onModalCancel: () => void;
  onModalConfirm: (data: any) => void;
}

export const BaseExperienceModal: React.FC<BaseExperienceModalProps> = ({
  id,
  title,
  iconClass,
  description,
  jobId,
  requiredSkills,
  savedRequiredSkills,
  optionalSkills,
  savedOptionalSkills,
  parentElement,
  visible,
  onModalCancel,
  onModalConfirm,
  children,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const initialSkillValues: SkillFormValues = {
    requiredSkills: savedRequiredSkills,
    optionalSkills: savedOptionalSkills,
  };

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
      <Formik
        initialValues={initialSkillValues}
        onSubmit={(values, actions): void => {
          // TODO: do something with values
          onModalConfirm(values);
          actions.setSubmitting(false);
        }}
      >
        {(formikProps): React.ReactElement => (
          <Form>
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
                <SkillSubform
                  jobId={jobId}
                  jobRequiredSkills={requiredSkills}
                  jobOptionalSkills={optionalSkills}
                  formikProps={formikProps}
                />
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
              <div>
                <button
                  data-c-button="outline(c1)"
                  data-c-dialog-action="close"
                  data-c-radius="rounded"
                  type="button"
                  onClick={onModalCancel}
                >
                  <FormattedMessage
                    id="experienceModal.cancel"
                    defaultMessage="Cancel"
                    description="Cancel button text"
                  />
                </button>
              </div>
              <div data-c-alignment="base(right)">
                <button
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BaseExperienceModal;

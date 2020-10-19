/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import { useIntl } from "react-intl";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import messages, {
  citizenshipDeclaration,
  veteranStatus,
  languageRequirementDescription,
  languageRequirementLabel,
} from "./basicInfoMessages";
import {
  basicInfoMessages,
  navigationMessages,
  educationRequirementMessages,
} from "../applicationMessages";
import SelectInput from "../../Form/SelectInput";
import {
  CitizenshipId,
  VeteranId,
  LanguageRequirementId,
  getKeyByValue,
} from "../../../models/lookupConstants";
import { validationMessages } from "../../Form/Messages";
import { Job, ApplicationNormalized } from "../../../models/types";
import CheckboxInput from "../../Form/CheckboxInput";
import { educationMessages } from "../../JobBuilder/Details/JobDetailsMessages";
import textToParagraphs from "../../../helpers/textToParagraphs";
import { getLocale, localizeField } from "../../../helpers/localize";
import { hasKey } from "../../../helpers/queries";
import {
  getClassifications
} from "../../../store/Classification/classificationActions";
import { getClassificationState } from "../../../../../assets/js/store/Classification/classificationSelector";

interface BasicInfoProps {
  application: ApplicationNormalized;
  job: Job;
  handleContinue: (values: ApplicationNormalized) => Promise<void>;
  handleReturn: (values: ApplicationNormalized) => Promise<void>;
  handleQuit: (values: ApplicationNormalized) => Promise<void>;
}

export interface BasicInfoFormValues {
  citizenship: number | "";
  veteranStatus: number | "";
  languageRequirement: boolean;
  languageTest: boolean;
  educationRequirement: boolean;
}

export const BasicInfo: React.FunctionComponent<BasicInfoProps> = ({
  application,
  job,
  handleContinue,
  handleReturn,
  handleQuit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const classification: string = getKeyByValue(
    ClassificationId,
    job.classification_id,
  );

  const initialValues: BasicInfoFormValues = {
    citizenship: application?.citizenship_declaration_id
      ? application.citizenship_declaration_id
      : "",
    veteranStatus: application?.veteran_status_id
      ? application.veteran_status_id
      : "",
    languageRequirement: application?.language_requirement_confirmed
      ? application.language_requirement_confirmed
      : false,
    languageTest: application?.language_test_confirmed
      ? application.language_test_confirmed
      : false,
    educationRequirement: application?.education_requirement_confirmed
      ? application.education_requirement_confirmed
      : false,
  };

  const jobEducationReq = localizeField(locale, job, "education");
  const defaultEducationReq = hasKey(educationMessages, classification)
    ? intl.formatMessage(educationMessages[classification])
    : intl.formatMessage(educationRequirementMessages.missingClassification);
  // If the job is using the default education requirements (for its classification) then we
  //  can predictably style it, by setting the right lines to bold. Otherwise, all we can do is
  //  split it into paragraphs.
  const educationRequirements =
    jobEducationReq === null || jobEducationReq === defaultEducationReq
      ? textToParagraphs(
          defaultEducationReq,
          {},
          {
            0: { "data-c-font-weight": "bold" },
            5: { "data-c-font-weight": "bold" },
          },
        )
      : textToParagraphs(jobEducationReq);

  const validationSchema = Yup.object().shape({
    citizenship: Yup.number()
      .oneOf(
        Object.values(CitizenshipId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    veteranStatus: Yup.number()
      .oneOf(
        Object.values(VeteranId),
        intl.formatMessage(validationMessages.invalidSelection),
      )
      .required(intl.formatMessage(validationMessages.required)),
    languageRequirement: Yup.boolean()
      .required(intl.formatMessage(validationMessages.required))
      .oneOf([true], intl.formatMessage(validationMessages.required)),
    languageTest: Yup.boolean().notRequired(),
    educationRequirement: Yup.boolean()
      .required(intl.formatMessage(validationMessages.required))
      .oneOf([true], intl.formatMessage(validationMessages.required)),
  });

  const updateApplication = (
    oldApplication: ApplicationNormalized,
    values: BasicInfoFormValues,
  ): ApplicationNormalized => {
    const editedApplication: ApplicationNormalized = {
      ...oldApplication,
      citizenship_declaration_id: values.citizenship
        ? Number(values.citizenship)
        : null,
      veteran_status_id: values.veteranStatus
        ? Number(values.veteranStatus)
        : null,
      language_requirement_confirmed: values.languageRequirement,
      language_test_confirmed: values.languageTest,
      education_requirement_confirmed: values.educationRequirement,
    };
    return editedApplication;
  };

  return (
    <div data-c-container="medium" data-c-padding="tb(2)">
      <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
        {intl.formatMessage(basicInfoMessages.heading)}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }): void => {
          // Save data to application object, then navigate to the next step
          const basicInfoFormValues: BasicInfoFormValues = {
            ...values,
          };

          handleContinue(
            updateApplication(application, basicInfoFormValues),
          ).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, values }): React.ReactElement => (
          <Form>
            <div data-c-grid="gutter(all, 1)">
              {/* Citizenship Declaration */}
              <FastField
                id="citizenship"
                name="citizenship"
                component={SelectInput}
                required
                label={intl.formatMessage(basicInfoMessages.citizenshipLabel)}
                grid="base(1of1)"
                nullSelection={intl.formatMessage(messages.nullSelectOption)}
                options={Object.values(CitizenshipId).map((id: number): {
                  value: number;
                  label: string;
                } => ({
                  value: id,
                  label: intl.formatMessage(citizenshipDeclaration(id)),
                }))}
              />
              {/* Veteran Status */}
              <FastField
                id="veteranStatus"
                name="veteranStatus"
                component={SelectInput}
                required
                label={intl.formatMessage(basicInfoMessages.veteranStatusLabel)}
                grid="base(1of1)"
                nullSelection={intl.formatMessage(messages.nullSelectOption)}
                options={Object.values(VeteranId).map((id: number): {
                  value: number;
                  label: string;
                } => ({
                  value: id,
                  label: intl.formatMessage(veteranStatus(id)),
                }))}
              />
            </div>
            {/* Language Requirement */}
            <h3
              data-c-heading="h3"
              data-c-margin="top(2) bottom(1)"
              data-c-padding="bottom(1)"
            >
              {intl.formatMessage(
                basicInfoMessages.languageRequirementsHeading,
              )}
            </h3>
            <p>
              {job.language_requirement_id &&
                intl.formatMessage(
                  languageRequirementDescription(job.language_requirement_id),
                )}
            </p>
            <div data-c-margin="left(2)">
              <FastField
                id="languageRequirement"
                name="languageRequirement"
                component={CheckboxInput}
                required
                label={
                  job.language_requirement_id &&
                  intl.formatMessage(
                    languageRequirementLabel(job.language_requirement_id),
                  )
                }
              />
            </div>
            {/* Language Test (only displayed for bilingual language requirements) */}
            {((job.language_requirement_id &&
              job.language_requirement_id ===
                LanguageRequirementId.bilingualAdvanced) ||
              job.language_requirement_id ===
                LanguageRequirementId.bilingualIntermediate) && (
              <div data-c-margin="left(2)">
                <FastField
                  id="languageTest"
                  name="languageTest"
                  component={CheckboxInput}
                  required
                  label={intl.formatMessage(messages.languageTestLabel)}
                />
              </div>
            )}
            {/* Education Requirement */}
            <h3
              data-c-heading="h3"
              data-c-margin="top(2) bottom(1)"
              data-c-padding="bottom(1)"
            >
              {intl.formatMessage(messages.educationRequirementHeader)}
            </h3>
            <p data-c-margin="bottom(1)">
              {intl.formatMessage(messages.meetEducationRequirement)}
            </p>
            <div
              data-c-background="gray(20)"
              data-c-radius="rounded"
              data-c-padding="all(1)"
              data-c-margin="bottom(1)"
            >
              {educationRequirements}
            </div>
            <div data-c-margin="left(2)">
              <FastField
                id="educationRequirement"
                name="educationRequirement"
                component={CheckboxInput}
                required
                label={intl.formatMessage(messages.educationRequirementLabel)}
              />
            </div>
            <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
            <div data-c-grid="gutter">
              <div
                data-c-alignment="base(centre) tp(left)"
                data-c-grid-item="tp(1of2)"
              >
                <button
                  data-c-button="outline(c2)"
                  data-c-radius="rounded"
                  type="button"
                  disabled={isSubmitting}
                  onClick={(): void => {
                    const basicInfoFormValues: BasicInfoFormValues = {
                      ...values,
                    };
                    // Method should save the current data and return user to the previous step
                    handleReturn(
                      updateApplication(application, basicInfoFormValues),
                    );
                  }}
                >
                  {intl.formatMessage(navigationMessages.return)}
                </button>
              </div>
              <div
                data-c-alignment="base(centre) tp(right)"
                data-c-grid-item="tp(1of2)"
              >
                <button
                  data-c-button="outline(c2)"
                  data-c-radius="rounded"
                  type="button"
                  disabled={isSubmitting}
                  onClick={(): void => {
                    const basicInfoFormValues: BasicInfoFormValues = {
                      ...values,
                    };
                    // Method should save the current data and return user to My Applications page
                    handleQuit(
                      updateApplication(application, basicInfoFormValues),
                    );
                  }}
                >
                  {intl.formatMessage(navigationMessages.quit)}
                </button>
                <button
                  data-c-button="solid(c1)"
                  data-c-radius="rounded"
                  data-c-margin="left(1)"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {intl.formatMessage(navigationMessages.continue)}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicInfo;

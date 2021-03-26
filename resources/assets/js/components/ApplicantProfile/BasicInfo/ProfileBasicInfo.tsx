import React, { useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ApplicantClassification,
  ApplicantProfile,
  Classification,
} from "../../../models/types";
import {
  citizenshipDeclaration as citizenshipDeclarationMessages,
  veteranStatus as veteranStatusMessages,
} from "../../Application/BasicInfo/basicInfoMessages";

import {
  CitizenshipId,
  VeteranId,
  GCEmployeeStatus,
} from "../../../models/lookupConstants";
import Form from "../../H2Components/Form";
import { validationMessages } from "../../Form/Messages";
import Select from "../../H2Components/Select";
import { gcEmployeeStatus as gcEmployeeStatusMessages } from "../../../models/localizedConstants";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { accountSettings } from "../../../helpers/routes";

const messages = defineMessages({
  heading: {
    id: "applicantProfile.basicInfo.heading",
    defaultMessage: "My Basic Information",
    description:
      "Heading for the My Basic Information section of the Applicant Profile.",
  },
  name: {
    id: "applicantProfile.basicInfo.name",
    defaultMessage: "Name",
  },
  personalEmail: {
    id: "applicantProfile.basicInfo.personalEmail",
    defaultMessage: "Personal Email",
  },
  toChangeGoTo: {
    id: "applicantProfile.basicInfo.toChangeGoTo",
    defaultMessage: "To change these go to",
  },
  accountSettings: {
    id: "applicantProfile.basicInfo.accountSettings",
    defaultMessage: "Account Settings",
  },
  govtJobInfoHeading: {
    id: "applicantProfile.basicInfo.govtJobInfo",
    defaultMessage: "Government Job Information",
    description:
      "Heading for the Government Job Information section of the Applicant Profile.",
  },
  citizenStatusLabel: {
    id: "applicantProfile.basicInfo.citizenStatusLabel",
    defaultMessage: "Citizenship Status:",
    description:
      "Label for the My Basic Information section of the Applicant Profile for the citizenship status input.",
  },
  veteranStatusLabel: {
    id: "applicantProfile.basicInfo.veteranStatusLabel",
    defaultMessage:
      "Are you a veteran or a member of the Canadian Armed forces?",
    description:
      "Label for the My Basic Information section of the Applicant Profile for the veteran status input.",
  },
  gcEmployeeStatusLabel: {
    id: "applicantProfile.basicInfo.gcEmployeeStatusLabel",
    defaultMessage: "Currently an employee of the Government of Canada",
    description:
      "Label for the Government Job Information section of the Applicant Profile for the employee status input.",
  },
  currentClassificationAndLevel: {
    id: "applicantProfile.basicInfo.currentClassificationAndLevel",
    defaultMessage: "Current classification and level:",
    description:
      "Label for the Government Job Information section of the Applicant Profile for the current classification input.",
  },
  classificationLabel: {
    id: "applicantProfile.basicInfo.classificationLabel",
    defaultMessage: "Classification:",
    description:
      "Label for the Government Job Information section of the Applicant Profile for the classification input.",
  },
  levelLabel: {
    id: "applicantProfile.basicInfo.levelLabel",
    defaultMessage: "Level:",
    description:
      "Label for the Government Job Information section of the Applicant Profile for the current classification input.",
  },
  addPreviousGcClassification: {
    id: "applicantProfile.basicInfo.addPreviousGcClassification",
    defaultMessage: "Add previous Government classifications:",
    description:
      "Heading for the Government Job Information section of the Applicant Profile for adding previous classification.",
  },
  addClassificationLabel: {
    id: "applicantProfile.basicInfo.addClassificationLabel",
    defaultMessage: "Add Previous Classification",
    description:
      "Label for the Government Job Information section of the Applicant Profile to add a previous classification.",
  },
  removeClassificationLabel: {
    id: "applicantProfile.basicInfo.removeClassification",
    defaultMessage: "Remove",
    description:
      "Label for the Government Job Information section of the Applicant Profile to remove a previous classification.",
  },
  submitFormLabel: {
    id: "applicantProfile.basicInfo.submitFormLabel",
    defaultMessage: "Submit",
    description:
      "Label for the Government Job Information section of the Applicant Profile to submit the form.",
  },
});
export interface ProfileBasicInfoProps {
  applicantId: number;
  currentClassification: number | null;
  currentLevel: number | null;
  citizenshipDeclaration: number | null;
  classifications: Classification[];
  email: string;
  gcEmployeeStatus: number | null;
  name: string;
  previousClassifications: ApplicantClassification[];
  veteranStatus: number | null;
  handleUpdateProfile: (data: ApplicantProfile) => Promise<void>;
}

export const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({
  applicantId,
  currentClassification,
  currentLevel,
  citizenshipDeclaration,
  classifications,
  email,
  gcEmployeeStatus,
  name,
  previousClassifications,
  veteranStatus,
  handleUpdateProfile,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const defaultValues = {
    citizenshipDeclaration: citizenshipDeclaration || "",
    veteranStatus: veteranStatus || "",
    gcEmployeeStatus: gcEmployeeStatus || "",
    currentClassification: currentClassification || "",
    currentLevel: currentLevel || "",
    previousClassifications,
  };

  const validationShema = Yup.object().shape({
    citizenshipDeclaration: Yup.number()
      .typeError(intl.formatMessage(validationMessages.required))
      .required(intl.formatMessage(validationMessages.required)),
    veteranStatus: Yup.number()
      .typeError(intl.formatMessage(validationMessages.required))
      .required(intl.formatMessage(validationMessages.required)),
    gcEmployeeStatus: Yup.number()
      .typeError(intl.formatMessage(validationMessages.required))
      .required(intl.formatMessage(validationMessages.required)),
    currentClassification: Yup.number().when("gcEmployeeStatus", {
      is: GCEmployeeStatus.current,
      then: Yup.number()
        .typeError(intl.formatMessage(validationMessages.required))
        .required(intl.formatMessage(validationMessages.required)),
    }),
    currentLevel: Yup.number().when("gcEmployeeStatus", {
      is: GCEmployeeStatus.current,
      then: Yup.number()
        .typeError(intl.formatMessage(validationMessages.required))
        .required(intl.formatMessage(validationMessages.required)),
    }),
    previousClassifications: Yup.array().of(
      Yup.object().shape({
        classification_id: Yup.number()
          .typeError(intl.formatMessage(validationMessages.required))
          .required(intl.formatMessage(validationMessages.required)),
        level: Yup.number()
          .typeError(intl.formatMessage(validationMessages.required))
          .required(intl.formatMessage(validationMessages.required)),
      }),
    ),
  });

  interface BasicInfoFormValues {
    citizenshipDeclaration: number | string;
    veteranStatus: number | string;
    gcEmployeeStatus: number | string;
    currentClassification: number | string;
    currentLevel: number | string;
    previousClassifications: ApplicantClassification[];
  }

  // Main hook to create a new form. Comes with many optional arguments.
  // https://react-hook-form.com/api#useForm
  const {
    register,
    handleSubmit,
    errors,
    control,
    watch,
  } = useForm<BasicInfoFormValues>({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationShema),
  });

  const gcEmployeeStatusState = watch("gcEmployeeStatus");

  // Custom hook for working with uncontrolled field arrays (dynamic inputs).
  // https://react-hook-form.com/api#useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousClassifications",
    keyName: "key",
  });

  // new applicant classification object used when appending a new field in the fieldArray.
  const newApplicantClassification: ApplicantClassification = {
    id: 0,
    applicant_id: applicantId,
    classification_id: -1,
    level: -1,
    order: -1,
  };

  const NUM_OF_CLASSIFICATION_LEVELS = 9; // Since we do not fetch classification levels from an api the possible levels are 1-9.
  /**
   * This returns a list of classification level Option component (found in the H2 Select component).
   * @returns List of classification level option elements.
   */
  const classificationLevels = (): React.ReactElement[] => {
    const levels: number[] = [];
    for (let i = 1; i <= NUM_OF_CLASSIFICATION_LEVELS; i += 1) {
      levels.push(i);
    }

    return levels.map((level) => (
      <Select.Option key={level} value={level}>
        {level}
      </Select.Option>
    ));
  };

  return (
    <>
      <h2 data-h2-font-size="b(h3)" data-h2-margin="b(bottom, 1)">
        {intl.formatMessage(messages.heading)}
      </h2>
      <p data-h2-margin="b(bottom, 1)">
        <FormattedMessage
          id="profile.experience.preamble"
          defaultMessage="This profile is also shared when you submit a job application."
          description="First section of text on the 'My Basic Information' of the Application Timeline."
        />
      </p>

      <p>
        {intl.formatMessage(messages.name)}:{" "}
        <span data-h2-font-color="b(theme-1)" data-h2-font-weight="b(700)">
          {name}
        </span>
      </p>
      <p>
        {intl.formatMessage(messages.personalEmail)}:{" "}
        <span data-h2-font-color="b(theme-1)" data-h2-font-weight="b(700)">
          {email}
        </span>
      </p>
      <p data-h2-margin="b(bottom, 1)">
        {intl.formatMessage(messages.toChangeGoTo)}:{" "}
        <a data-h2-font-color="b(theme-1)" href={accountSettings(locale)}>
          {intl.formatMessage(messages.accountSettings)}
        </a>
      </p>

      <Form
        onSubmit={handleSubmit(handleUpdateProfile)}
        data-h2-container="b(left, small)"
      >
        <Select
          name="citizenshipDeclaration"
          required
          register={register}
          label={intl.formatMessage(messages.citizenStatusLabel)}
          errorMessage={errors.citizenshipDeclaration?.message}
          data-h2-padding="b(right, 5)"
        >
          {Object.values(CitizenshipId).map(
            (id: number): React.ReactElement => (
              <Select.Option key={id} value={id}>
                {intl.formatMessage(citizenshipDeclarationMessages(id))}
              </Select.Option>
            ),
          )}
        </Select>
        <Select
          name="veteranStatus"
          required
          register={register}
          label={intl.formatMessage(messages.veteranStatusLabel)}
          errorMessage={errors.veteranStatus?.message}
          data-h2-padding="b(right, 5)"
          data-h2-margin="b(bottom, 2)"
        >
          {Object.values(VeteranId).map(
            (id: number): React.ReactElement => (
              <Select.Option key={id} value={id}>
                {intl.formatMessage(veteranStatusMessages(id))}
              </Select.Option>
            ),
          )}
        </Select>
        <h2 data-h2-font-size="b(h3)" data-h2-margin="b(bottom, 1)">
          {intl.formatMessage(messages.govtJobInfoHeading)}
        </h2>
        <Select
          name="gcEmployeeStatus"
          required
          register={register}
          label={intl.formatMessage(messages.gcEmployeeStatusLabel)}
          errorMessage={errors.gcEmployeeStatus?.message}
          data-h2-padding="b(right, 5) b(bottom, 1)"
        >
          {Object.values(GCEmployeeStatus).map((id) => (
            <Select.Option key={id} value={id}>
              {intl.formatMessage(gcEmployeeStatusMessages(id))}
            </Select.Option>
          ))}
        </Select>
        {/* If the user is currently a member of the GOC then allow setting a current classification */}
        {Number(gcEmployeeStatusState) === GCEmployeeStatus.current && (
          <div data-h2-grid="b(top, expanded, flush, 1)">
            <p data-h2-grid-item="b(1of1)">
              {intl.formatMessage(messages.currentClassificationAndLevel)}
            </p>
            <Select
              name="currentClassification"
              defaultValue={`${currentClassification}`}
              required
              register={register}
              label={intl.formatMessage(messages.classificationLabel)}
              errorMessage={errors.currentClassification?.message}
              data-h2-grid-item="b(1of2)"
              data-h2-padding="b(right, 5)"
            >
              {classifications.map((classification) => (
                <Select.Option
                  key={classification.key}
                  value={classification.id}
                >
                  {localizeFieldNonNull(locale, classification, "name")}
                </Select.Option>
              ))}
            </Select>
            <Select
              name="currentLevel"
              defaultValue={`${currentLevel}`}
              required
              register={register}
              label={intl.formatMessage(messages.levelLabel)}
              errorMessage={errors.currentLevel?.message}
              data-h2-grid-item="b(1of2)"
              data-h2-padding="b(right, 5)"
            >
              {classificationLevels()}
            </Select>
          </div>
        )}
        {/* If the user is currently OR a previous member of the GOC then allow creating previous classifications */}
        {Number(gcEmployeeStatusState) !== GCEmployeeStatus.no && (
          <>
            <p data-h2-margin="b(bottom, 1)">
              {intl.formatMessage(messages.addPreviousGcClassification)}
            </p>
            <ul>
              {fields.map((previousClassification, index) => (
                <li
                  data-h2-grid="b(middle, expanded, padded, 1)"
                  key={previousClassification.key}
                >
                  <Select
                    name={`previousClassifications[${index}].classification_id`}
                    defaultValue={`${
                      previousClassification.classification_id !== -1
                        ? previousClassification.classification_id
                        : ""
                    }`}
                    required
                    register={register()}
                    label={intl.formatMessage(messages.classificationLabel)}
                    errorMessage={
                      errors.previousClassifications &&
                      errors.previousClassifications[index]?.classification_id
                        ?.message
                    }
                    data-h2-grid-item="b(5of12)"
                  >
                    {classifications.map((classification) => (
                      <Select.Option
                        key={classification.key}
                        value={classification.id}
                      >
                        {localizeFieldNonNull(locale, classification, "name")}
                      </Select.Option>
                    ))}
                  </Select>
                  <Select
                    name={`previousClassifications[${index}].level`}
                    defaultValue={`${
                      previousClassification.level !== -1
                        ? previousClassification.level
                        : ""
                    }`}
                    required
                    register={register()}
                    label={intl.formatMessage(messages.levelLabel)}
                    errorMessage={
                      errors.previousClassifications &&
                      errors.previousClassifications[index]?.level?.message
                    }
                    data-h2-grid-item="b(5of12)"
                  >
                    {classificationLevels()}
                  </Select>
                  <button
                    data-h2-button=""
                    data-h2-grid-item="b(1of12)"
                    data-h2-font-style="b(underline)"
                    data-h2-font-weight="b(700)"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    {intl.formatMessage(messages.removeClassificationLabel)}
                  </button>
                </li>
              ))}
            </ul>
            <button
              data-h2-button=""
              data-h2-font-style="b(underline)"
              data-h2-font-weight="b(700)"
              data-h2-margin="b(left, 2)"
              type="button"
              onClick={() => append(newApplicantClassification)}
            >
              <i data-h2-padding="b(right, .25)" className="fas fa-plus" />
              {intl.formatMessage(messages.addClassificationLabel)}
            </button>
          </>
        )}
        <div>
          <button
            data-h2-display="b(block)"
            data-h2-button="theme-1, round, medium, solid"
            data-h2-margin="b(top, 2)"
            type="submit"
          >
            {intl.formatMessage(messages.submitFormLabel)}
          </button>
        </div>
      </Form>
    </>
  );
};

export default ProfileBasicInfo;

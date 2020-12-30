import React, { FunctionComponent, ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  GocClassification,
  ProfileBasicInformation as ProfileBasicInformationProp,
  GCEmployeeStatusName
} from "../../models/types";
import { myBasicInformationMessages } from "../Application/applicationMessages";
import { removeDuplicatesById } from "../../helpers/queries";
import SelectInput from "../Form/SelectInput";
import { FastField, Formik, Field, Form } from "formik";
import messages, {
  citizenshipDeclaration,
  veteranStatus,
  gcEmployeeStatus,
} from "../Application/BasicInfo/basicInfoMessages";
import { basicInfoMessages } from "../Application/applicationMessages";
import {
  CitizenshipId,
  VeteranId,
  currentGcEmployeeId,
} from "../../models/lookupConstants";

export interface ProfileBasicInformationProps {
  gocClassifications: GocClassification[];
  basicInformation: ProfileBasicInformationProp;
  name: string;
  email: string;
}

export interface ClassificationDropdownsProps {
  gocClassifications: GocClassification[];
  selectedItem?: GocClassification;
}

export interface GcExperienceProps {
  gocClassifications: GocClassification[];
  previousExperienceProp: GocClassification[];
  currentGcClassification: GocClassification;
  wasGcEmployee: GCEmployeeStatusName;
}



const GcExperience: FunctionComponent<GcExperienceProps> = ({
  previousExperienceProp,
  currentGcClassification,
  gocClassifications,
  wasGcEmployee,
}) => {
  const intl = useIntl();

  const [previousExperience, setPreviousExperience] = useState<
    GocClassification[]
  >(previousExperienceProp);

  const removeExperience = function (gocClassification: GocClassification) {
    setPreviousExperience(
      previousExperience.filter((experience) => {
        return !(
          experience.classification.key ==
            gocClassification.classification.key &&
          experience.level == gocClassification.level
        );
      }),
    );
  };

  const createPreviousExperienceDropdowns = (
    previousGcExperience: GocClassification[],
  ) => {
    return previousGcExperience.map((experience) => {
      return (
        <>
          <li>
            <div data-c-grid="gutter top">
              <ClassificationDropdowns
                gocClassifications={gocClassifications}
                selectedItem={experience}
                data-c-grid-item="base(2of2) tl(2of3)"
              />
              <div data-c-grid-item="base(1of1) tl(1of3)" data-c-input="select">
                <button
                  data-c-button="solid(c1)"
                  onClick={() => removeExperience(experience)}
                >
                  <i className="fa fa-trash" /> Remove
                </button>
                <span>
                  {intl.formatMessage(myBasicInformationMessages.inputError)}
                </span>
              </div>
            </div>
          </li>
        </>
      );
    });
  };

  const addExperience = function () {
    // If the user has not populated their most recent experience, prevent adding a second empty row
    if (
      previousExperience.filter((experience) => {
        return experience.classification.id == 0;
      }).length > 0
    ) {
      return;
    }

    setPreviousExperience([
      ...previousExperience,
      {
        classification: {
          id: 0,
          key: "",
          name: {
            en: "",
            fr: "",
          },
        },
        level: 0,
        order: 0,
      },
    ]);
  };

  if (wasGcEmployee == "no") return <></>;

  if (wasGcEmployee == "previous") {
    return (
      <>
        <label htmlFor="SEL2">
          {intl.formatMessage(myBasicInformationMessages.addPreviousGcExperience)}
        </label>
        <div id="list-previous-gov-class">
          <ol>{createPreviousExperienceDropdowns(previousExperience)}</ol>
        </div>
        <button data-c-button="solid(c1)" onClick={addExperience}>
          {intl.formatMessage(myBasicInformationMessages.addClassification)}
        </button>
      </>
    )
  }

  // if wasGcEmployee == "yes" (the only remainig option)
  else {
    return (
      <>
        <label htmlFor="SEL2">
          {intl.formatMessage(
            myBasicInformationMessages.currentClassificationAndLevel,
          )}
        </label>
        <ClassificationDropdowns
          selectedItem={currentGcClassification}
          gocClassifications={gocClassifications}
        />

        <label htmlFor="SEL2">
          {intl.formatMessage(myBasicInformationMessages.addPreviousGcExperience)}
        </label>
        <div id="list-previous-gov-class">
          <ol>{createPreviousExperienceDropdowns(previousExperience)}</ol>
        </div>
        <button data-c-button="solid(c1)" onClick={addExperience}>
          {intl.formatMessage(myBasicInformationMessages.addClassification)}
        </button>
      </>
    );
  }

};

const ClassificationDropdowns: FunctionComponent<ClassificationDropdownsProps> = ({
  gocClassifications,
  selectedItem,
}) => {
  const intl = useIntl();

  const safeParseInt = function (str: string | null): number {
    if (str == null) return 0;
    else if (typeof str == "string") return parseInt(str);
    else return -1;
  };

  const getInitialSelectedClassification = (): string | null => {
    if (selectedItem?.classification.id) {
      return selectedItem?.classification.id.toString();
    }
    return null;
  };

  const [selectedClassification, setSelectedClassification] = useState<
    string | null
  >(getInitialSelectedClassification());

  const handleSelectedClassification = function (
    e: ChangeEvent<HTMLSelectElement>,
  ) {
    setSelectedClassification(e.target.value);
  };

  const uniqueClassifications = removeDuplicatesById(
    gocClassifications.map((item) => ({
      id: item.classification.id,
      key: item.classification.key,
    })),
  );

  function getLevelsOfClassification(
    classificationKey: number | null,
  ): string[] {
    const correspondingGocClassifications = gocClassifications.filter(
      (item) => item.classification.id == classificationKey,
    );

    let correspondingLevels: string[] = [];
    correspondingGocClassifications.forEach(function (
      correspondingGocClassification: GocClassification,
    ) {
      correspondingLevels.push(correspondingGocClassification.level.toString());
    });

    return correspondingLevels;
  }

  return (
    <>
      <div data-c-grid-item="base(1of3)" data-c-grid="gutter top">
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select
              defaultValue={selectedItem?.classification.id}
              required
              id="SEL2"
              onChange={handleSelectedClassification}
            >
              <option></option>
              {uniqueClassifications.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.key}
                </option>
              ))}
              ;
            </select>
          </div>
          <span>
            {intl.formatMessage(myBasicInformationMessages.inputError)}
          </span>
        </div>
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select defaultValue={selectedItem?.level} required id="SEL2">
              <option></option>
              {getLevelsOfClassification(
                safeParseInt(selectedClassification),
              ).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <span>
            {intl.formatMessage(myBasicInformationMessages.inputError)}
          </span>
        </div>
      </div>
    </>
  );
};

export const ProfileBasicInformation: React.FC<ProfileBasicInformationProps> = ({
  gocClassifications,
  basicInformation,
  name,
  email,
}) => {
  const intl = useIntl();

  const getInitialEmployeeState = (): GCEmployeeStatusName => {
    if (basicInformation.current_classification && basicInformation.previous_classifications.length > 0) {
      return "yes";
    }
    else if (basicInformation.current_classification && basicInformation.previous_classifications.length == 0) {
      return "previous";
    }
    else {
      return "no";
    }
  };

  const [currentGcEmployee, setCurrentGcEmployee] = useState<GCEmployeeStatusName>(
    getInitialEmployeeState(),
  );

  const onChangeSetCurrentGCEmployee = (e : React.ChangeEvent<HTMLSelectElement>, field : any) => {
    if (field.value == 1) setCurrentGcEmployee("yes")
    if (field.value == 2) setCurrentGcEmployee("no")
    if (field.value == 3) setCurrentGcEmployee("previous")
  }

  let initialValues = {
    citizenship: basicInformation.citizenship_status.id,
    veteranStatus: basicInformation.citizenship_status.id,
    currentGcEmployeeStatus: basicInformation.current_gc_employee.id,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values): void => {
          const basicInformationValues = {
            ...values,
          };
        }}
      >
        {({ errors, values, touched, setValues }) => (
          <Form>
            <h2 data-c-heading="h2" data-c-margin="bottom(1)">
              {intl.formatMessage(myBasicInformationMessages.heading)}
            </h2>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="profile.experience.preamble"
                defaultMessage="This profile is also shared when you submit a job application."
                description="First section of text on the 'My Basic Information' of the Application Timeline."
              />
            </p>
            <div>
              <p>
                {intl.formatMessage(myBasicInformationMessages.name)}:{" "}
                <b data-c-color="c1"> {name} </b>{" "}
              </p>
              <p>
                {intl.formatMessage(myBasicInformationMessages.personalEmail)}:{" "}
                <b data-c-color="c1"> {email} </b>{" "}
              </p>
              <p>
                {intl.formatMessage(myBasicInformationMessages.toChangeGoTo)}:{" "}
                <a data-c-color="c1" href="#">
                  {intl.formatMessage(
                    myBasicInformationMessages.accountSettings,
                  )}
                </a>
              </p>
            </div>
            <div data-c-grid-item="base(1of3)">
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
            </div>
            <div data-c-grid-item="base(1of3)">
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
            <h2 data-c-heading="h2" data-c-margin="bottom(1)">
              {intl.formatMessage(myBasicInformationMessages.heading)}
            </h2>

            <FastField required name="currentGcEmployeeStatus" placeholder="F">
              {({ field }) => (
                <div data-c-grid-item="base(1of3)">
                  <div data-c-input="select" data-c-grid-item="base(1of1)" data-c-required="true" >
                    <label htmlFor="currentGcEmployeeStatus">
                      {intl.formatMessage(
                        myBasicInformationMessages.isGCEmployee,
                      )}
                    </label>
                    <div>
                      <i className="fa fa-caret-down" />
                      <select {...field}
                        onChange={e => onChangeSetCurrentGCEmployee(e, field)}
                        id="currentGcEmployeeStatus"
                      >
                        <option value=""></option>
                        {Object.values(currentGcEmployeeId).map(i =>
                          <option key={i} value={i}>{intl.formatMessage(gcEmployeeStatus(i))}</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </FastField>

            <GcExperience
              gocClassifications={gocClassifications}
              previousExperienceProp={basicInformation.previous_classifications}
              currentGcClassification={basicInformation.current_classification}
              wasGcEmployee={currentGcEmployee}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileBasicInformation;

import React, { FunctionComponent, ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { GocClassification, ProfileBasicInformation as ProfileBasicInformationProp } from "../../models/types";
import { myBasicInformationMessages } from "../Application/applicationMessages";
import { removeDuplicatesById } from "../../helpers/queries";
import SelectInput from "../Form/SelectInput";
import { FastField, Formik } from "formik";
import messages, {
  citizenshipDeclaration,
  veteranStatus
} from "../Application/BasicInfo/basicInfoMessages";
import {
  basicInfoMessages,
} from "../Application/applicationMessages";
import {
  CitizenshipId,
  VeteranId,
} from "../../models/lookupConstants";

export interface ProfileBasicInformationProps {
  gocClassifications : GocClassification[],
  basicInformation: ProfileBasicInformationProp,
  name: string,
  email: string,
}

export interface ClassificationDropdownsProps {
  gocClassifications : GocClassification[]
  selectedItem?: GocClassification
}

export interface GcExperienceProps {
  gocClassifications : GocClassification[],
  previousExperienceProp: GocClassification[],
  currentGcClassification: GocClassification,
  wasGcEmployee: boolean
}

const GcExperience: FunctionComponent<GcExperienceProps> = ({
  previousExperienceProp,
  currentGcClassification,
  gocClassifications,
  wasGcEmployee
}) => {

  const intl = useIntl();

  const [previousExperience, setPreviousExperience] = useState<GocClassification[]>(previousExperienceProp);

  const removeExperience = function(gocClassification : GocClassification) {
    setPreviousExperience(
      previousExperience.filter(experience => {
        return !(
          experience.classification.key == gocClassification.classification.key
          && experience.level == gocClassification.level
        )
      })
    )
  }

  const createPreviousExperienceDropdowns = (previousGcExperience : GocClassification[]) => {

    return previousGcExperience.map( experience => {
      return (
        <>
          <li>
            <div data-c-grid="gutter top">
              <ClassificationDropdowns
                gocClassifications={gocClassifications}
                selectedItem={experience}
                data-c-grid-item="base(2of2) tl(2of3)"
              />
              <div
                data-c-grid-item="base(1of1) tl(1of3)"
                data-c-input="select"
              >
                <button
                  data-c-button="solid(c1)"
                  onClick={() => removeExperience(experience)}
                >
                  <i className="fa fa-trash" /> Remove
                </button>
                <span>{intl.formatMessage(myBasicInformationMessages.inputError)}</span>
              </div>
            </div>
          </li>
        </>
      )
    })
  }

  const addExperience = function() {

    // If the user has not populated their most recent experience, prevent adding a second empty row
    if (previousExperience.filter(experience => {
      return experience.classification.id == 0
    }).length > 0) {
      return
    }

    setPreviousExperience(
      [
        ...previousExperience,
        {
          classification: {
            id: 0,
            key: "",
            name: {
              en: "",
              fr: ""
            },
          },
          level: 0,
          order: 0,
        }
      ]
    )
  }

  if (!wasGcEmployee)
    return (<></>)

  return (
    <>
    <label htmlFor="SEL2">{intl.formatMessage(myBasicInformationMessages.currentClassificationAndLevel)}</label>
    <ClassificationDropdowns selectedItem={currentGcClassification} gocClassifications={gocClassifications} />

    <label htmlFor="SEL2">{intl.formatMessage(myBasicInformationMessages.addPreviousGcExperience)}</label>
      <div id="list-previous-gov-class">
        <ol>
          {createPreviousExperienceDropdowns(previousExperience)}
        </ol>
      </div>
      <button data-c-button="solid(c1)" onClick={addExperience}>
        {intl.formatMessage(myBasicInformationMessages.addClassification)}
      </button>
    </>
  );
};

const ClassificationDropdowns: FunctionComponent<ClassificationDropdownsProps> = ({
  gocClassifications,
  selectedItem
}) => {

  const intl = useIntl();

  const safeParseInt = function(str : string | null) : number {
    if (str == null) return 0
    else if (typeof str == "string") return parseInt(str)
    else return -1
  }

  const getInitialSelectedClassification = () : string | null => {
    if (selectedItem?.classification.id) {
      return selectedItem?.classification.id.toString()
    }
    return null
  }

  const [selectedClassification, setSelectedClassification] = useState<string | null>(getInitialSelectedClassification());

  const handleSelectedClassification = function(e : ChangeEvent<HTMLSelectElement>){
    setSelectedClassification(e.target.value)
  }

  const uniqueClassifications = removeDuplicatesById(
    gocClassifications.map((item) => ({
      id: item.classification.id,
      key: item.classification.key,
    })),
  );

  function getLevelsOfClassification(classificationKey : number | null) : string[] {

    const correspondingGocClassifications = gocClassifications.filter(
      item => item.classification.id == classificationKey
    )

    let correspondingLevels : string[] = [];
    correspondingGocClassifications.forEach(function(correspondingGocClassification : GocClassification) {
      correspondingLevels.push(correspondingGocClassification.level.toString())
    })

    return correspondingLevels
  }

  return (
    <>
      <div data-c-grid-item="base(1of3)" data-c-grid="gutter top">
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select defaultValue={selectedItem?.classification.id} required id="SEL2" onChange={handleSelectedClassification} >
              <option></option>
              {uniqueClassifications.map(item =>
                <option key={item.id} value={item.id}>{item.key}</option>
              )};
            </select>
          </div>
          <span>{intl.formatMessage(myBasicInformationMessages.inputError)}</span>
        </div>
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select defaultValue={selectedItem?.level} required id="SEL2">
              <option></option>
              {
                getLevelsOfClassification(safeParseInt(selectedClassification)).map(item =>
                  <option key={item} value={item}>{item}</option>
                )
              }
            </select>
          </div>
          <span>{intl.formatMessage(myBasicInformationMessages.inputError)}</span>
        </div>
      </div>
    </>
  );
};

export const ProfileBasicInformation: React.FC<ProfileBasicInformationProps> = ({
  gocClassifications,
  basicInformation,
  name,
  email
}) => {
  const intl = useIntl();

  const getInitialEmployeeState = () : boolean => {
    if (basicInformation.current_classification) {
      return true
    }

    return false
  }

  const [currentGcEmployee, setCurrentGcEmployee] = useState<boolean>(getInitialEmployeeState());

  return (
    <>
      <Formik
        initialValues={basicInformation}
        onSubmit={(values): void => {
          const basicInformationValues: ProfileBasicInformationProp = {
            ...values,
          };
        }}
      >
        <div>
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
            {intl.formatMessage(myBasicInformationMessages.name)}: <b data-c-color="c1"> {name} </b>{" "}
            </p>
            <p>
              {intl.formatMessage(myBasicInformationMessages.personalEmail)}: <b data-c-color="c1"> {email} </b>{" "}
            </p>
            <p>
              {intl.formatMessage(myBasicInformationMessages.toChangeGoTo)}:{" "}
              <a data-c-color="c1" href="#">
                {intl.formatMessage(myBasicInformationMessages.accountSettings)}
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

          <div data-c-grid-item="base(1of3)" data-c-input="radio">
            <label htmlFor="RG2">
              {intl.formatMessage(myBasicInformationMessages.isGCEmployee)}
            </label>
            <span>Required</span>
            <div id="RG2" role="radiogroup">
              <label htmlFor="rB1">
                <input id="rB1" required name="radioB" type="radio" defaultChecked={currentGcEmployee} onChange={() => setCurrentGcEmployee(true)} />
                <span>Current GC Employee</span>
              </label>
              <label htmlFor="rB2">
                <input id="rB2" required name="radioB" type="radio" onChange={() => setCurrentGcEmployee(false)} />
                <span>Not a GC employee</span>
              </label>
            </div>
            <span>{intl.formatMessage(myBasicInformationMessages.inputError)}</span>
          </div>

          <GcExperience
            gocClassifications={gocClassifications}
            previousExperienceProp={basicInformation.previous_classifications}
            currentGcClassification={basicInformation.current_classification}
            wasGcEmployee={currentGcEmployee}
          />
        </div>
      </Formik>
    </>
  );
};

export default ProfileBasicInformation;

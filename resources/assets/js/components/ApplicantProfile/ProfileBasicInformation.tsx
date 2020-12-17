import React, { FunctionComponent, ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { GocClassification, ProfileBasicInformation as ProfileBasicInformationProp } from "../../models/types";
import { myBasicInformationMessages } from "../Application/applicationMessages";
import { removeDuplicatesById } from "../../helpers/queries";

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

  const removeExperience = function(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.dir(e)
  }

  const addExperience = function(e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    previousExperience.push({
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
    })
    setPreviousExperience(previousExperience)
  }

  if (!wasGcEmployee)
    return (<></>)

  return (
    <>
    <label htmlFor="SEL2">Current classification and level</label>
    <ClassificationDropdowns selectedItem={currentGcClassification} gocClassifications={gocClassifications} />

    <label htmlFor="SEL2">Add previous Government classifications</label>
      <div id="list-previous-gov-class">
      {previousExperience.map( experience =>
        <ol>
          <li>
            {/* Turn this into a reuseable component */}
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
                <button data-c-button="solid(c1)" onClick={removeExperience}>
                  <i className="fa fa-trash" /> Remove
                </button>
                <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
              </div>
            </div>
          </li>
        </ol>
      )}
      </div>
      <a data-c-button="solid(c1)" onClick={addExperience}>
        {intl.formatMessage(myBasicInformationMessages.addClassification)}
      </a>
    </>
  );
};

const ClassificationDropdowns: FunctionComponent<ClassificationDropdownsProps> = ({
  gocClassifications,
  selectedItem
}) => {

  const safeParseInt = function(str : string | null) : number {
    if (str == null) return 0
    else if (typeof str == "string") return parseInt(str)
    else return -1
  }

  const [selectedClassification, setSelectedClassification] = useState<string | null>(
    null,
  );

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
            <select value={selectedItem?.classification.id} required id="SEL2" onChange={handleSelectedClassification} >
              <option></option>
              {uniqueClassifications.map(item =>
                <option key={item.id} value={item.id}>{item.key}</option>
              )};
            </select>
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select value={selectedItem?.level} required id="SEL2">
              <option></option>
              {
                getLevelsOfClassification(safeParseInt(selectedClassification)).map(item =>
                  <option key={item} value={item}>{item}</option>
                )
              }
            </select>
          </div>
          <span>This input has an error.</span>
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
            Name: <b data-c-color="c1"> {name} </b>{" "}
          </p>
          <p>
            Personal Email: <b data-c-color="c1"> {email} </b>{" "}
          </p>
          <p>
            To change these go to:{" "}
            <a data-c-color="c1" href="#">
              Account Settings
            </a>
          </p>
        </div>
        <div data-c-input="select">
          <label htmlFor="SEL2">{intl.formatMessage(myBasicInformationMessages.citizenStatus)}</label>
          <span>Required</span>
          <div data-c-grid-item="base(1of3)">

            <i className="fas fa-caret-down" />
            <select required id="SEL2">
              <option disabled selected>
                Select a status...
              </option>
              <option>Canadian Citizen</option>
              <option>Not a citizen</option>
            </select>
          </div>
          <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
        </div>
        <div data-c-input="select">
          <label htmlFor="SEL2">
            {intl.formatMessage(myBasicInformationMessages.isVerteran)}
          </label>
          <span>Required</span>
          <div data-c-grid-item="base(1of3)">
            <i className="fas fa-caret-down" />
            <select required id="SEL2">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
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
          <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
        </div>

        <GcExperience
          gocClassifications={gocClassifications}
          previousExperienceProp={basicInformation.previous_classifications}
          currentGcClassification={basicInformation.current_classification}
          wasGcEmployee={currentGcEmployee}
        />

      </div>
    </>
  );
};

export default ProfileBasicInformation;


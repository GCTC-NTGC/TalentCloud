import React, { FunctionComponent } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { GocClassification } from "../../models/types";
import { myBasicInformationMessages } from "../Application/applicationMessages";

export interface ProfileBasicInformationProps {
  gocClassifications : GocClassification[]
}

export interface ClassificationDropdownsProps {
  gocClassifications : GocClassification[]
}

const ClassificationDropdowns: FunctionComponent<ClassificationDropdownsProps> = ({
  gocClassifications
}) => {
  const intl = useIntl();

  console.log("gocClassifications ... ")
  console.dir(gocClassifications)

  const handleSelectedClassification : any = function(e : any){
    this.setState({selectedClassification:e.target.value});
  }

  const getSelectedClassification : any = function() {
    //return this.state.selectedClassification
    return ""
  }

  let uniqueClassifications : string[] = [];
  gocClassifications.forEach(function(item : GocClassification) {
    console.log("Checking ... " + item.classification.key)
    if (!uniqueClassifications.includes(item.classification.key)) {
      uniqueClassifications.push(item.classification.key)
    }
  })

  function getLevelsOfClassification(classificationKey : string) {
    let correspondingGocClassifications : GocClassification[] = [];
    gocClassifications.forEach(function( item : GocClassification) {
      if (item.classification.key == classificationKey) {
        correspondingGocClassifications.push(item)
      }
    })

    let correspondingLevels : Number[] = [];
    correspondingGocClassifications.forEach(function(correspondingGocClassification : GocClassification) {
      correspondingLevels.push(correspondingGocClassification.level)
    })

    return correspondingLevels
  }

  return (
    <>
      <div data-c-grid-item="base(1of3)" data-c-grid="gutter top">
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select required id="SEL2" onChange={handleSelectedClassification} >
              {
                gocClassifications.map(item => {
                  <option>{item.classification.key}</option>
                })
              }
              {/*
              <option>CS</option>
              <option>AS</option>
              <option>EC</option>
              <option>EX</option>
              <option>The only option</option>
              */}
            </select>
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1) tl(1of2)" data-c-input="select">
          <div>
            <i className="fas fa-caret-down" />
            <select required id="SEL2">
              {
                getLevelsOfClassification(getSelectedClassification()).map(item => {
                  <option>{item}</option>
                })
              }
              {/*
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
               */}
            </select>
          </div>
          <span>This input has an error.</span>
        </div>
      </div>
    </>
  );
};

export const ProfileBasicInformation: React.FC<ProfileBasicInformationProps> = ({
  gocClassifications
}) => {
  const intl = useIntl();

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
            Name: <b data-c-color="c1">Gerardi Escandon</b>{" "}
          </p>
          <p>
            Personal Email: <b data-c-color="c1">jerbo@personal.com</b>{" "}
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
              <input id="rB1" required name="radioB" type="radio" />
              <span>Current GC Employee</span>
            </label>
            <label htmlFor="rB2">
              <input id="rB2" required name="radioB" type="radio" />
              <span>Not a GC employee</span>
            </label>
          </div>
          <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
        </div>

        <label htmlFor="SEL2">Current classification and level</label>
        <ClassificationDropdowns gocClassifications={gocClassifications} />

        <label htmlFor="SEL2">Add previous Government classifications</label>
        <div id="list-previous-gov-class">
          <ol>
            <li>
              {/* Turn this into a reuseable component */}
              <div data-c-grid="gutter top">
                <ClassificationDropdowns gocClassifications={gocClassifications} data-c-grid-item="base(2of2) tl(2of3)" />
                <div
                  data-c-grid-item="base(1of1) tl(1of3)"
                  data-c-input="select"
                >
                  <a href="#" data-c-color="c1">
                    Remove
                  </a>
                  <span>{intl.formatMessage(myBasicInformationMessages.inputEreror)}</span>
                </div>
              </div>
            </li>
          </ol>
        </div>
        <a href="#">{intl.formatMessage(myBasicInformationMessages.addClassification)}</a>
      </div>
    </>
  );
};

export default ProfileBasicInformation;


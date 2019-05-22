/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Input from "../Input";
import Modal from "../Modal";
import Select from "../Select";

const JobDetails = (): React.ReactElement => {
  const [title, setTitle] = useState("");
  const [termLength, setTermLength] = useState(0);
  const [classification, setClassification] = useState("");
  const [level, setLevel] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [language, setLanguage] = useState(0);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [remoteWork, setRemoteWork] = useState("");
  const [telework, setTelework] = useState("");
  const [flexHours, setFlexHours] = useState("");

  return (
    <div data-c-container="form" data-c-padding="top(triple) bottom(triple)">
      <h3
        data-c-font-size="h3"
        data-c-font-weight="bold"
        data-c-margin="bottom(double)"
      >
        Job Information
      </h3>
      <form id="job-information" data-c-grid="gutter">
        <div data-c-grid-item="tl(1of2)" data-c-input="text">
          <Input
            htmlId="builder02JobTitle"
            formName="builder02JobTitle"
            label="What is the job title?"
            required
            placeholder="e.g. Product Designer"
            value={title}
            onChange={e => setTitle(e.target.value)}
            errorText="This input has an error."
            minLength={3}
            maxLength={150}
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="number">
          <Input
            htmlId="builder02TermLength"
            formName="builder02TermLength"
            label="How long is the term (in months)?"
            required
            type="number"
            placeholder="e.g. 3"
            value={termLength}
            onChange={e => setTermLength(Number(e.target.value))}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="select">
          <Select
            htmlId="builder02Classification"
            formName="builder02Classification"
            label="What is the classification?"
            required
            selected={classification.length > 0 ? classification : null}
            nullSelection="Select a classification..."
            options={[
              { value: "AS", label: "AS - Administrative Services" },
              { value: "BI", label: "BI - Biological Sciences" },
              { value: "CO", label: "CO - Commerce" },
              { value: "CR", label: "CR - Clerical and Regulatory" },
              { value: "CS", label: "CS - Computer Systems" },
              {
                value: "EC",
                label: "EC - Economics and Social Science Services",
              },
              { value: "EX", label: "EX - Executive" },
              { value: "FO", label: "FO - Forestry" },
              { value: "IS", label: "IS - Information Services" },
              { value: "PC", label: "PC - Physical Sciences" },
              { value: "PE", label: "PE - Personnel Administration" },
              { value: "PM", label: "PM - Programme Administration" },
            ]}
            onChange={e => setClassification(e.target.value)}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="select">
          <Select
            htmlId="builder02Level"
            formName="builder02Level"
            label="What is the level?"
            required
            selected={level > 0 ? level : null}
            nullSelection="Select a level..."
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
              { value: 6, label: "6" },
              { value: 7, label: "7" },
              { value: 8, label: "8" },
              { value: 9, label: "9" },
            ]}
            onChange={e => setLevel(Number(e.target.value))}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="select">
          <Select
            htmlId="builder02SecurityLevel"
            formName="builder02SecurityLevel"
            label="What is the security level?"
            required
            selected={securityLevel > 0 ? securityLevel : null}
            nullSelection="Select a security level..."
            options={[
              { value: 1, label: "Reliability" },
              { value: 2, label: "Secret" },
              { value: 3, label: "Top Secret" },
            ]}
            onChange={e => setSecurityLevel(Number(e.target.value))}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="select">
          <Select
            htmlId="builder02Language"
            formName="builder02Language"
            label="What is the language profile?"
            required
            selected={language > 0 ? language : null}
            nullSelection="Select a language profile..."
            options={[
              { value: 1, label: "English - Essential" },
              { value: 2, label: "French - Essential" },
              { value: 3, label: "Bilingual - Advanced (CBC)" },
              { value: 4, label: "Bilingual - Intermediate (BBB)" },
              { value: 5, label: "English or French" },
            ]}
            onChange={e => setLanguage(Number(e.target.value))}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="text">
          <Input
            htmlId="builder02City"
            formName="builder02City"
            label="What city is the team located in?"
            required
            placeholder="e.g. Ottawa"
            value={city}
            onChange={e => setCity(e.target.value)}
            errorText="This input has an error."
            minLength={3}
            maxLength={150}
          />
        </div>
        <div data-c-grid-item="tl(1of2)" data-c-input="select">
          <Select
            htmlId="builder02Province"
            formName="builder02Province"
            label="What province is the team located in?"
            required
            selected={province.length > 0 ? province : null}
            nullSelection="Select a province..."
            options={[
              { value: "AB", label: "Alberta" },
              { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" },
              { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" },
              { value: "NS", label: "Nova Scotia" },
              { value: "NT", label: "Northwest Territories" },
              { value: "NU", label: "Nunavut" },
              { value: "ON", label: "Ontario" },
              { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" },
              { value: "SK", label: "Saskatchewan" },
              { value: "YT", label: "Yukon" },
            ]}
            onChange={e => setProvince(e.target.value)}
            errorText="This input has an error."
          />
        </div>
        <div data-c-grid-item="base(1of1)" data-c-input="radio">
          <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
            Is remote work allowed?
          </p>
          <p data-c-margin="bottom(normal)">
            Want the best talent in Canada? You increase your chances when you
            allow those in other parts of Canada to apply. Regional diversity
            also adds perspective to your team culture. Make sure to discuss
            this in advance with your HR Advisor.
          </p>
          <label htmlFor="builder02RemoteWork">
            Select a remote work option:
          </label>
          <span>Required</span>
          <div id="builder02RemoteWork" role="radiogroup">
            <Input
              htmlId="builder02RemoteWorkOption01"
              formName="builder02RemoteWork"
              label="Yes, I’m willing to supervise employees anywhere in the world."
              value="world"
              checked={remoteWork === "world"}
              type="radio"
              onChange={e => setRemoteWork(e.target.value)}
              errorText="This input has an error."
            />
            {/* <!-- Just a heads up this has a default checked value. --> */}
            <Input
              htmlId="builder02RemoteWorkOption02"
              formName="builder02RemoteWork"
              label="Yes, I’m willing to supervise employees in any province or
              territory in Canada."
              value="canada"
              type="radio"
              checked={remoteWork === "canada" || remoteWork === ""}
              onChange={e => setRemoteWork(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02RemoteWorkOption03"
              formName="builder02RemoteWork"
              label="No, I require the employee in this position to be in the same
              geographic location as the office."
              value="none"
              checked={remoteWork === "none"}
              type="radio"
              onChange={e => setRemoteWork(e.target.value)}
              errorText="This input has an error."
            />
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1)" data-c-input="radio">
          <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
            How often is telework allowed?
          </p>
          <p data-c-margin="bottom(normal)">
            Demonstrate that you trust your employees and you have a positive
            workplace culture. Allow telework as an option.
          </p>
          <label htmlFor="builder02Telework">Select a telework option:</label>
          <span>Required</span>
          <div id="builder02Telework" role="radiogroup">
            <Input
              htmlId="builder02TeleworkOption01"
              formName="builder02Telework"
              label="Almost Always"
              value="always"
              checked={telework === "always"}
              type="radio"
              onChange={e => setTelework(e.target.value)}
              errorText="This input has an error."
            />
            {/* <!-- Just a heads up this has a default checked value. --> */}
            <Input
              htmlId="builder02TeleworkOption02"
              formName="builder02Telework"
              label="Frequently"
              value="frequently"
              checked={telework === "frequently" || telework === ""}
              type="radio"
              onChange={e => setTelework(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02TeleworkOption03"
              formName="builder02Telework"
              label="Sometimes"
              value="sometimes"
              checked={telework === "sometimes"}
              type="radio"
              onChange={e => setTelework(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02TeleworkOption04"
              formName="builder02Telework"
              label="Occasionally"
              value="occasionally"
              checked={telework === "occasionally"}
              type="radio"
              onChange={e => setTelework(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02TeleworkOption05"
              formName="builder02Telework"
              label="Almost Never"
              value="never"
              checked={telework === "never"}
              type="radio"
              onChange={e => setTelework(e.target.value)}
              errorText="This input has an error."
            />
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1)" data-c-input="radio">
          <p data-c-margin="bottom(normal)" data-c-font-weight="bold">
            How often are flexible hours allowed?
          </p>
          <p data-c-margin="bottom(normal)">
            Want to support a more gender inclusive workplace? Studies show
            allowing flex hours is a great way to improve opportunities for
            women and parents.
          </p>
          <label htmlFor="builder02FlexHours">
            Select a flexible hours option:
          </label>
          <span>Required</span>
          <div id="builder02FlexHours" role="radiogroup">
            <Input
              htmlId="builder02FlexHoursOption01"
              formName="builder02FlexHours"
              label="Almost Always"
              value="always"
              checked={flexHours === "always"}
              type="radio"
              onChange={e => setFlexHours(e.target.value)}
              errorText="This input has an error."
            />
            {/* <!-- Just a heads up this has a default checked value. --> */}
            <Input
              htmlId="builder02FlexHoursOption02"
              formName="builder02FlexHours"
              label="Frequently"
              value="frequently"
              checked={flexHours === "frequently" || flexHours === ""}
              type="radio"
              onChange={e => setFlexHours(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02FlexHoursOption03"
              formName="builder02FlexHours"
              label="Sometimes"
              value="sometimes"
              checked={flexHours === "sometimes"}
              type="radio"
              onChange={e => setFlexHours(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02FlexHoursOption04"
              formName="builder02FlexHours"
              label="Occasionally"
              value="occasionally"
              checked={flexHours === "occasionally"}
              type="radio"
              onChange={e => setFlexHours(e.target.value)}
              errorText="This input has an error."
            />
            <Input
              htmlId="builder02FlexHoursOption05"
              formName="builder02FlexHours"
              label="Almost Never"
              value="never"
              checked={flexHours === "never"}
              type="radio"
              onChange={e => setFlexHours(e.target.value)}
              errorText="This input has an error."
            />
          </div>
          <span>This input has an error.</span>
        </div>
        <div data-c-grid-item="base(1of1)">
          <Modal
            id="job-details-preview"
            title="You're off to a great start!"
            subtitle="Here's a preview of the Job Information you just entered. Feel free to go back and edit things or move to the next step if you're happy with it."
            openText="Next"
            cancelText="Go Back"
            confirmText="Next Step"
            handleConfirm={() => console.log("Confirmed")}
          >
            <div
              data-c-background="grey(20)"
              data-c-border="bottom(thin, solid, black)"
              data-c-padding="normal"
            >
              <div
                className="manager-job-card"
                data-c-background="white(100)"
                data-c-padding="normal"
                data-c-radius="rounded"
              >
                <h3
                  data-c-font-size="h3"
                  data-c-font-weight="bold"
                  data-c-margin="bottom(half)"
                >
                  {title}
                </h3>
                <p data-c-font-size="h4" data-c-margin="bottom(normal)">
                  Department
                </p>
                <p data-c-margin="bottom(half)">
                  <i
                    data-c-colour="c1"
                    className="fas fa-map-marker-alt"
                    title="Location Icon."
                  >
                    &nbsp;&nbsp;
                  </i>
                  {city}, {province}
                </p>
                {remoteWork !== "none" && (
                  <p>
                    <i
                      data-c-colour="c1"
                      className="fas fa-home"
                      title="Remote Work Icon."
                    >
                      &nbsp;&nbsp;
                    </i>
                    Remote Work Allowed
                  </p>
                )}
                <h4
                  data-c-font-size="h4"
                  data-c-font-weight="bold"
                  data-c-margin="top(double) bottom(normal)"
                >
                  Basic Information
                </h4>
                <div data-c-grid="gutter">
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Average Annual Salary
                    </span>
                    <span>Talent Cloud will add this.</span>
                  </div>
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Language Profile
                    </span>
                    <span>{language}</span>
                  </div>
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Duration
                    </span>
                    <span>{termLength} Months</span>
                  </div>
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Security Clearance
                    </span>
                    <span>{securityLevel}</span>
                  </div>
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Target Start Date
                    </span>
                    <span>This comes later.</span>
                  </div>
                  <div data-c-grid-item="tp(1of2)">
                    <span data-c-colour="c1" data-c-margin="bottom(quarter)">
                      Government Classification
                    </span>
                    <span>
                      {classification}-{level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default JobDetails;

if (document.getElementById("job-details")) {
  const rootEl = document.getElementById("job-details");
  ReactDOM.render(<JobDetails />, rootEl);
}

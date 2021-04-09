import React from "react";
import { storiesOf } from "@storybook/react";
import { withIntl } from "storybook-addon-intl";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ProfileBasicInfo from "../../components/ApplicantProfile/BasicInfo/ProfileBasicInfo";
import fakeClassifications from "../../fakeData/fakeClassifications";
import {
  CitizenshipId,
  GCEmployeeStatus,
  VeteranId,
} from "../../models/lookupConstants";
import {
  fakeApplicantClassification1,
  fakeApplicantClassification2,
  fakeApplicantClassifications,
} from "../../fakeData/fakeApplicantClassifications";

const stories = storiesOf(
  "Applicant Profile/Basic Information",
  module,
).addDecorator(withIntl);

stories
  .add(
    "Empty Form",
    (): React.ReactElement => {
      return (
        <ProfileBasicInfo
          applicantId={1}
          applicantClassifications={[]}
          citizenshipDeclaration={null}
          classifications={fakeClassifications()}
          email={text("Email", "jerbo@personal.com", "Basic Info")}
          gcEmployeeStatus={null}
          name={text("Name", "Gerardi Escandon", "Basic Info")}
          veteranStatus={null}
          handleUpdateProfile={async (x) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            action("Update Applicant Profile")(x);
          }}
        />
      );
    },
  )
  .add(
    "Not GC Employee",
    (): React.ReactElement => {
      return (
        <ProfileBasicInfo
          applicantId={1}
          applicantClassifications={[]}
          citizenshipDeclaration={CitizenshipId.citizen}
          classifications={fakeClassifications()}
          email={text("Email", "jerbo@personal.com", "Basic Info")}
          gcEmployeeStatus={GCEmployeeStatus.no}
          name={text("Name", "Gerardi Escandon", "Basic Info")}
          veteranStatus={VeteranId.current}
          handleUpdateProfile={async (x) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            action("Update Applicant Profile")(x);
          }}
        />
      );
    },
  );
stories.add(
  "Previous GC Employee",
  (): React.ReactElement => {
    return (
      <ProfileBasicInfo
        applicantId={1}
        applicantClassifications={[
          fakeApplicantClassification1(),
          fakeApplicantClassification2(),
        ]}
        citizenshipDeclaration={CitizenshipId.citizen}
        classifications={fakeClassifications()}
        email={text("Email", "jerbo@personal.com", "Basic Info")}
        gcEmployeeStatus={GCEmployeeStatus.past}
        name={text("Name", "Gerardi Escandon", "Basic Info")}
        veteranStatus={VeteranId.current}
        handleUpdateProfile={async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Update Applicant Profile")(x);
        }}
      />
    );
  },
);
stories.add(
  "Current GC Employee",
  (): React.ReactElement => {
    return (
      <ProfileBasicInfo
        applicantId={1}
        applicantClassifications={fakeApplicantClassifications()}
        citizenshipDeclaration={CitizenshipId.citizen}
        classifications={fakeClassifications()}
        email={text("Email", "jerbo@personal.com", "Basic Info")}
        gcEmployeeStatus={GCEmployeeStatus.current}
        name={text("Name", "Gerardi Escandon", "Basic Info")}
        veteranStatus={VeteranId.current}
        handleUpdateProfile={async (x) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          action("Update Applicant Profile")(x);
        }}
      />
    );
  },
);

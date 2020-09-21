import React from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationExperienceIntro,
  applicationWelcome,
} from "../../../helpers/routes";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import BasicInfo from "./BasicInfo";
import fakeJob from "../../../fakeData/fakeJob";

interface BasicInfoPageProps {
  applicationId: number;
}

export const BasicInfoPage: React.FunctionComponent<BasicInfoPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.
  const job = fakeJob(); // TODO: Get real job associated with application.

  const handleContinue = (values): void => {
    // TODO: Save basic info form values.
    navigate(applicationExperienceIntro(locale, applicationId));
  };
  const handleReturn = (values): void => {
    // TODO: Save basic info form values.
    navigate(applicationWelcome(locale, applicationId));
  };
  const handleQuit = (values): void => {
    // TODO: Save basic info form values.
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(applicationId, application, intl, "basic")}
      />
      <BasicInfo
        job={job}
        handleContinue={handleContinue}
        handleReturn={handleReturn}
        handleQuit={handleQuit}
      />
    </>
  );
};

export default BasicInfoPage;

import React from "react";
import { useIntl } from "react-intl";
import Intro from "./Intro";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import { navigate } from "../../../helpers/router";
import { getLocale } from "../../../helpers/localize";
import { applicationBasic } from "../../../helpers/routes";

interface IntroPageProps {
  applicationId: number;
}

export const IntroPage: React.FunctionComponent<IntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.

  const handleContinue = (): void =>
    navigate(applicationBasic(locale, applicationId));
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.welcome)}
        steps={makeProgressBarSteps(applicationId, application, intl, "other")}
      />
      <Intro handleStart={handleContinue} />
    </>
  );
};

export default IntroPage;

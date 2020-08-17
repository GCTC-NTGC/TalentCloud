import React from "react";
import { useIntl } from "react-intl";
import Intro from "./Intro";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import { fakeApplication } from "../../../fakeData/fakeApplications";

interface IntroPageProps {
  applicationId: number;
}

export const IntroPage: React.FunctionComponent<IntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();

  const application = fakeApplication(); // TODO: get real application.

  const handleContinue = (): void => console.log("Go to next step");
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.welcome)}
        steps={makeProgressBarSteps(application, intl)}
      />
      <Intro handleStart={handleContinue} />
    </>
  );
};

export default IntroPage;

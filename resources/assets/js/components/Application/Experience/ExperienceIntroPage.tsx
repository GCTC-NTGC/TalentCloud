import React from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../../helpers/localize";
import { applicationExperience } from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import { navigate } from "../../../helpers/router";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ExperienceIntro from "./ExperienceIntro";

interface ExperienceIntroPageProps {
  applicationId: number;
}

export const ExperienceIntroPage: React.FunctionComponent<ExperienceIntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.

  const handleStart = (): void =>
    navigate(applicationExperience(locale, applicationId));
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step02)}
        steps={makeProgressBarSteps(
          applicationId,
          application,
          intl,
          "experience",
        )}
      />
      <ExperienceIntro handleStart={handleStart} />
    </>
  );
};

export default ExperienceIntroPage;

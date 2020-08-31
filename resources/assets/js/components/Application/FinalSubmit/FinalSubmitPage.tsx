import React from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationIndex,
  applicationNextSteps,
  applicationReview,
} from "../../../helpers/routes";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { fakeApplication } from "../../../fakeData/fakeApplications";
import { Application } from "../../../models/types";
import FinalSubmit from "./FinalSubmit";

interface FinalSubmitPageProps {
  applicationId: number;
}

export const FinalSubmitPage: React.FunctionComponent<FinalSubmitPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.

  const handleSubmit = async (application: Application): Promise<void> => {
    // TODO: Submit application.
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationNextSteps(locale, applicationId);
  };
  const handleReturn = (): void => {
    navigate(applicationReview(locale, applicationId));
  };
  const handleQuit = (): void => {
    // Because the Applications Index is outside of the Application SPA, we navigate to it differently.
    window.location.href = applicationIndex(locale);
  };
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(application, intl, "submission")}
      />
      <FinalSubmit
        application={application}
        submitApplication={handleSubmit}
        handleReturn={handleReturn}
        handleQuit={handleQuit}
      />
    </>
  );
};

export default FinalSubmitPage;

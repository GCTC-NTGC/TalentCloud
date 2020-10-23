/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import { Experience } from "../../../models/types";
import { navigate } from "../../../helpers/router";
import { applicationSkills } from "../../../helpers/routes";
import { getLocale } from "../../../helpers/localize";
import { DispatchType } from "../../../configureStore";
import { RootState } from "../../../store/store";
import {
  getApplicationById,
  getApplicationIsUpdating,
} from "../../../store/Application/applicationSelector";
import { fetchApplication } from "../../../store/Application/applicationActions";
import { getJob, getJobIsUpdating } from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import {
  getExperienceByApplicant,
  getExperienceByApplication,
  getUpdatingByApplicant,
  getUpdatingByApplication,
} from "../../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplicant,
  fetchExperienceByApplication,
} from "../../../store/Experience/experienceActions";
import { ApplicationStatusId } from "../../../models/lookupConstants";
import {
  getSkills,
  getSkillsUpdating,
} from "../../../store/Skill/skillSelector";
import { fetchSkills } from "../../../store/Skill/skillActions";
import { loadingMessages } from "../applicationMessages";
import {
  useApplication,
  useFetchAllApplicationData,
  useJob,
  useJobApplicationSteps,
} from "../../../hooks/applicationHooks";

interface SkillsIntroPageProps {
  applicationId: number;
}

/**
 * This page displays some instructions for the Skills step, and prefetches the data that will be used there.
 * @param applicationId
 */
export const SkillsIntroPage: React.FunctionComponent<SkillsIntroPageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  useFetchAllApplicationData(applicationId, dispatch);
  const application = useApplication(applicationId);
  const job = useJob(application?.job_poster_id);
  const steps = useJobApplicationSteps();
  const closeDate = job?.close_date_time ?? null;

  const handleContinue = (): void => {
    navigate(applicationSkills(locale, applicationId));
  };

  return (
    <>
      {application && (
        <ProgressBar
          closeDateTime={closeDate}
          currentTitle={intl.formatMessage(stepNames.step03)}
          steps={makeProgressBarSteps(applicationId, steps, intl, "skills")}
        />
      )}
      {!application && (
        <h2
          data-c-heading="h2"
          data-c-align="center"
          data-c-padding="top(2) bottom(2)"
        >
          {intl.formatMessage(loadingMessages.loading)}
        </h2>
      )}
      {application && (
        <div data-c-border="bottom(thin, solid, gray)">
          <div data-c-container="medium">
            <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
              <FormattedMessage
                id="application.skills.intro.header"
                defaultMessage="How You Used Each Skill"
                description="Header for the Skills Intro step."
              />
            </h2>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="application.experience.intro.opening"
                defaultMessage="Now that you've shared your experiences, tell us how they connect to the skills required for the job."
                description="Opening sentence describing the Skills step."
              />
            </p>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="application.experience.intro.explanation"
                defaultMessage="For each experience <b>add a short explanation that demonstrates how you used the skill</b>. These explanations are what the manager will use to decide how strong your application is, so <b>it's important that you share your best examples</b>."
                description="Paragraphs explaining what to expect on the Skills step."
                values={{
                  b: (...chunks) => (
                    <span data-c-font-weight="bold">{chunks}</span>
                  ),
                }}
              />
            </p>
            <p data-c-margin="bottom(1)">
              <FormattedMessage
                id="application.experience.intro.savedToProfile"
                defaultMessage="Just like experience, this information is saved to your profile so that you can reuse it on other applications!"
                description="Paragraph explaining that changes to Skills will be saved to profile."
              />
            </p>
          </div>
          <div data-c-container="medium" data-c-padding="tb(2)">
            <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
            <div data-c-grid="gutter(all, 1)">
              <div data-c-grid-item="tl(1of1)" data-c-align="base(center)">
                <button
                  data-c-button="solid(c1)"
                  data-c-radius="rounded"
                  type="button"
                  onClick={handleContinue}
                >
                  <span>
                    <FormattedMessage
                      id="application.skills.intro.letsGo"
                      defaultMessage="Let's Go"
                      description="Button text for continuing to next step in Application Form."
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkillsIntroPage;

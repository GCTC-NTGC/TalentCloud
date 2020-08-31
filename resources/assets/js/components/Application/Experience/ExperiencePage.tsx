import React from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "@storybook/addons";
import { getLocale } from "../../../helpers/localize";
import fakeJob from "../../../fakeData/fakeJob";
import { navigate } from "../../../helpers/router";
import {
  applicationSkillsIntro,
  applicationBasic,
  applicationIndex,
} from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import Experience, { ExperienceSubmitData } from "./Experience";
import { fakeCriteria } from "../../../fakeData/fakeCriteria";
import fakeExperienceSkills from "../../../fakeData/fakeExperienceSkills";
import fakeExperiences from "../../../fakeData/fakeExperience";
import { Experience as ExperienceType } from "../../../models/types";
import { getApplicationById } from "../../../store/Application/applicationSelector";
import { RootState } from "../../../store/store";
import { fetchApplication } from "../../../store/Application/applicationActions";

interface ExperiencePageProps {
  applicationId: number;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch();

  const application = useSelector((state: RootState) =>
    getApplicationById(state, { id: applicationId }),
  );
  useEffect(() => {
    if (application === null || application.id !== applicationId) {
      dispatch(fetchApplication(applicationId));
    }
  }, [application, applicationId, dispatch]);

  const job = fakeJob(); // TODO: Get real job associated with application.
  const criteria = fakeCriteria(); // TODO: Get criteria associated with job.
  const experiences = fakeExperiences(); // TODO: get experienciences associated with application.
  const experienceSkills = fakeExperienceSkills(); // TODO: Get experienceSkills associated with experiences.

  // TODO: load constants from backend.
  const educationStatuses = [];
  const educationTypes = [];
  const skills = [];
  const recipientTypes = [];
  const recognitionTypes = [];

  const handleSubmit = async (data: ExperienceSubmitData): Promise<void> => {
    console.log(data); // TODO: Save the data.
  };
  const handleDelete = async (
    id: number,
    type: ExperienceType["type"],
  ): Promise<void> => {
    // TODO: Delete the experience.
    console.log(`Delete experience id: ${id}, type: ${type}`);
  };

  const handleContinue = (): void => {
    navigate(applicationSkillsIntro(locale, applicationId));
  };
  const handleReturn = (): void => {
    navigate(applicationBasic(locale, applicationId));
  };
  const handleQuit = (): void => {
    window.location.href = applicationIndex(locale);
  };
  const closeDate = new Date(); // TODO: get from application.
  return (
    <>
      <ProgressBar
        closeDateTime={closeDate}
        currentTitle={intl.formatMessage(stepNames.step01)}
        steps={makeProgressBarSteps(
          applicationId,
          application,
          intl,
          "experience",
        )}
      />
      <Experience
        experiences={experiences}
        educationStatuses={educationStatuses}
        educationTypes={educationTypes}
        experienceSkills={experienceSkills}
        criteria={criteria}
        skills={skills}
        jobId={job.id}
        jobClassificationId={job.classification_id ?? 1}
        recipientTypes={recipientTypes}
        recognitionTypes={recognitionTypes}
        handleSubmitExperience={handleSubmit}
        handleDeleteExperience={handleDelete}
        handleContinue={handleContinue}
        handleReturn={handleReturn}
        handleQuit={handleQuit}
      />
    </>
  );
};

export default ExperiencePage;

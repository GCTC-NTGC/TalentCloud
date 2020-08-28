import React from "react";
import { useIntl } from "react-intl";
import { getLocale } from "../../../helpers/localize";
import { fakeApplication } from "../../../fakeData/fakeApplications";
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
import { EducationSubformProps } from "../ExperienceModals/EducationSubform";

interface ExperiencePageProps {
  applicationId: number;
}

const educationMessages = {
  educationReqTitle: {
    id: "application.experience.education.requirementTitle",
    defaultMessage: "2 year post secondary degree",
    description:
      "Short description of the default education requirement for this job.",
  },
  educationReqDescription: {
    id: "application.experience.education.requirmentDescription",
    defaultMessage:
      "Successful completion of 2 years post secondary degree in a relevant field.",
    description:
      "Longer description of the default education requirement for this job.",
  },
  equivalentReqTitle: {
    id: "application.experience.education.equivalentRequirementTitle",
    defaultMessage: "Combination Experience",
    description:
      "Short description of an equivalent for the education requirement for this job.",
  },
  equivalentReqDescription: {
    id: "application.experience.education.equivalentRequirmentDescription",
    defaultMessage:
      "If you believe your training, education, and/or experiences are equivalent to a 2-year post-secondary requirment, put it forward for consideration.\nThe hiring manager may accept these an alternative to the minimum education requirment.",
    description:
      "Longer description of an equivalent for the default education requirement for this job.",
  },
};

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const application = fakeApplication(); // TODO: get real application.
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
        steps={makeProgressBarSteps(application, intl, "experience")}
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

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { getLocale } from "../../../helpers/localize";
import { navigate } from "../../../helpers/router";
import {
  applicationSkillsIntro,
  applicationBasic,
  applicationIndex,
} from "../../../helpers/routes";
import ProgressBar, { stepNames } from "../ProgressBar/ProgressBar";
import makeProgressBarSteps from "../ProgressBar/progressHelpers";
import Experience, { ExperienceSubmitData } from "./Experience";
import {
  Experience as ExperienceType,
  ExperienceSkill,
} from "../../../models/types";
import {
  getApplicationById,
  getApplicationIsUpdating,
} from "../../../store/Application/applicationSelector";
import { RootState } from "../../../store/store";
import { fetchApplication } from "../../../store/Application/applicationActions";
import {
  getJob,
  getJobIsUpdating,
  getCriteriaByJob,
} from "../../../store/Job/jobSelector";
import { fetchJob } from "../../../store/Job/jobActions";
import {
  getExperienceByApplication,
  getExperienceSkillsByApplication,
  getExperienceByApplicant,
  getUpdatingByApplicant,
  getUpdatingByApplication,
  getExperienceSkillsByApplicant,
} from "../../../store/Experience/experienceSelector";
import {
  fetchExperienceByApplication,
  fetchExperienceByApplicant,
  createExperience,
  createExperienceSkill,
  updateExperience,
  deleteExperienceSkill,
  deleteExperience,
} from "../../../store/Experience/experienceActions";
import { ApplicationStatusId } from "../../../models/lookupConstants";
import { hasKey, getId } from "../../../helpers/queries";
import { DispatchType } from "../../../configureStore";

interface ExperiencePageProps {
  applicationId: number;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({
  applicationId,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const dispatch = useDispatch<DispatchType>();

  const applicationSelector = (state: RootState) =>
    getApplicationById(state, { id: applicationId });
  const application = useSelector(applicationSelector);
  const applicationIsUpdating = useSelector((state: RootState) =>
    getApplicationIsUpdating(state, { applicationId }),
  );
  useEffect(() => {
    if (application === null && !applicationIsUpdating) {
      dispatch(fetchApplication(applicationId));
    }
  }, [application, applicationId, applicationIsUpdating, dispatch]);

  const jobId = application?.job_poster_id;
  const jobSelector = (state: RootState) =>
    jobId ? getJob(state, { jobId }) : null;
  const job = useSelector(jobSelector);
  const jobUpdatingSelector = (state: RootState) =>
    jobId ? getJobIsUpdating(state, jobId) : false;
  const jobIsUpdating = useSelector(jobUpdatingSelector);
  useEffect(() => {
    // If job is null and not already updating, fetch it.
    if (jobId && job === null && !jobIsUpdating) {
      dispatch(fetchJob(jobId));
    }
  }, [jobId, job, jobIsUpdating, dispatch]);

  const criteriaSelector = (state: RootState) =>
    jobId ? getCriteriaByJob(state, { jobId }) : [];
  const criteria = useSelector(criteriaSelector);

  const applicantId = application?.applicant_id ?? 0;

  // When an Application is still a draft, use Experiences associated with the applicant profile.
  // When an Application has been submitted and is no longer a draft, display Experience associated with the Application directly.
  const applicationLoaded = application !== null;
  const useProfileExperience =
    application === null ||
    application.application_status_id === ApplicationStatusId.draft;

  // This selector must be memoized because getExperienceByApplicant/Application uses reselect, and not re-reselect.
  const experienceSelector = useCallback(
    (state: RootState) =>
      useProfileExperience
        ? getExperienceByApplicant(state, { applicantId })
        : getExperienceByApplication(state, { applicationId }),
    [applicationId, applicantId, useProfileExperience],
  );
  const experiencesByType = useSelector(experienceSelector);
  const experiences: ExperienceType[] = [
    ...experiencesByType.award,
    ...experiencesByType.community,
    ...experiencesByType.education,
    ...experiencesByType.personal,
    ...experiencesByType.work,
  ];
  const experiencesUpdating = useSelector((state: RootState) =>
    useProfileExperience
      ? getUpdatingByApplicant(state, { applicantId })
      : getUpdatingByApplication(state, { applicationId }),
  );
  const [experiencesFetched, setExperiencesFetched] = useState(false);
  useEffect(() => {
    // Only load experiences if they have never been fetched by this component (!experiencesFetched),
    //  have never been fetched by another component (length === 0),
    //  and are not currently being fetched (!experiencesUpdating).
    // Also, wait until application has been loaded so the correct source can be determined.
    if (
      applicationLoaded &&
      !experiencesFetched &&
      !experiencesUpdating &&
      experiences.length === 0
    ) {
      if (useProfileExperience) {
        dispatch(fetchExperienceByApplicant(applicantId));
      } else {
        dispatch(fetchExperienceByApplication(applicationId));
      }
      setExperiencesFetched(true);
    }
  }, [
    applicantId,
    applicationId,
    applicationLoaded,
    dispatch,
    experiences.length,
    experiencesFetched,
    experiencesUpdating,
    useProfileExperience,
  ]);

  // ExperienceSkills don't need to be fetched because they are returned inthe Experiences API calls.
  const expSkillSelector = (state: RootState) =>
    useProfileExperience
      ? getExperienceSkillsByApplicant(state, { applicantId })
      : getExperienceSkillsByApplication(state, { applicationId });
  const experienceSkills = useSelector(expSkillSelector);

  // TODO: load constants from backend.
  const educationStatuses = [];
  const educationTypes = [];
  const skills = [];
  const recipientTypes = [];
  const recognitionTypes = [];

  const handleSubmit = async (data: ExperienceSubmitData): Promise<void> => {
    // extract the Experience object from the data.
    let experience: ExperienceType | null = null;
    if ("experienceWork" in data) {
      experience = data.experienceWork;
    } else if ("experienceAward" in data) {
      experience = data.experienceAward;
    } else if ("experienceCommunity" in data) {
      experience = data.experienceCommunity;
    } else if ("experienceEducation" in data) {
      experience = data.experienceEducation;
    } else if ("experiencePersonal" in data) {
      experience = data.experiencePersonal;
    }
    if (experience === null) {
      return;
    }

    const newLinkedSkills = [
      ...data.savedRequiredSkills,
      ...data.savedOptionalSkills,
    ];

    const newExpSkill = (
      skillId: number,
      exp: ExperienceType,
    ): ExperienceSkill => ({
      id: 0,
      skill_id: skillId,
      experience_id: exp.id,
      experience_type: exp.type,
      justification: "",
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (experience.id === 0) {
      // If the experience is brand new, it (and related experience skills) must be created on server.
      const result = await dispatch(createExperience(experience));
      if (!result.error) {
        const newExperience = (await result.payload).experience;
        const saveRequests = newLinkedSkills.map((skill) => {
          const expSkill = newExpSkill(skill.id, newExperience);
          return dispatch(createExperienceSkill(expSkill));
        });
        await Promise.allSettled(saveRequests);
      }
    } else {
      // If the experience already exists it can simply be updated.
      const updateExpRequest = dispatch(updateExperience(experience));
      // Determine which skills were already linked to the experience
      const prevExpSkills = experienceSkills.filter(
        (expSkill) =>
          expSkill.experience_id === experience?.id &&
          expSkill.experience_type === experience?.type,
      );
      const prevSkillIds = prevExpSkills.map((expSkill) => expSkill.skill_id);
      const newSkillIds = newLinkedSkills.map(getId);

      // Delete skills that were removed.
      const deleteRequests = prevExpSkills
        .filter((expSkill) => !newSkillIds.includes(expSkill.skill_id))
        .map((expSkill) =>
          dispatch(
            deleteExperienceSkill(
              expSkill.id,
              expSkill.experience_id,
              expSkill.experience_type,
            ),
          ),
        );
      // Created new Experience Skills for skills which don't exist yet.
      const createRequests = newSkillIds
        .filter((newSkillId) => !prevSkillIds.includes(newSkillId))
        .map((newSkillId) =>
          experience
            ? dispatch(
                createExperienceSkill(newExpSkill(newSkillId, experience)),
              )
            : Promise.reject(),
        );
      await Promise.allSettled([
        updateExpRequest,
        ...deleteRequests,
        ...createRequests,
      ]);
    }
  };
  const handleDelete = async (
    id: number,
    type: ExperienceType["type"],
  ): Promise<void> => {
    // Deleting an Experience automatically handles deleting associated ExperienceSkills.
    await dispatch(deleteExperience(id, type));
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
        jobId={job?.id ?? 1}
        jobClassificationId={job?.classification_id ?? 1}
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

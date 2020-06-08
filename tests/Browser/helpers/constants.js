import dotenv from "dotenv";

dotenv.config();

export const HOMEPAGE = process.env.APP_URL;

export const MANAGER_HOME = `${HOMEPAGE}/manager`;
export const HR_HOME = `${HOMEPAGE}/hr`;
export const ADMIN_HOME = `${HOMEPAGE}/admin`

export const LOGIN = `${HOMEPAGE}/login`;
export const MANAGER_LOGIN = `${HOMEPAGE}/manager/login`;
export const HR_LOGIN = `${HOMEPAGE}/hr/login`;
export const ADMIN_LOGIN = `${HOMEPAGE}/admin/login`

export const REGISTER = `${HOMEPAGE}/register`;
export const MANAGER_REGISTER = `${HOMEPAGE}/manager/register`;
export const HR_REGISTER = `${HOMEPAGE}/hr/register`;

export const MANAGER_FIRST_VISIT = `${HOMEPAGE}/manager/first-visit`;
export const HR_FIRST_VISIT = `${HOMEPAGE}/hr/first-visit`;

export const PROFILE_ABOUT = `${HOMEPAGE}/profile/about`;
export const PROFILE_SKILLS = `${HOMEPAGE}/profile/skills`;
export const PROFILE_EXPERIENCE = `${HOMEPAGE}/profile/experience`;
export const PROFILE_REFERENCES = `${HOMEPAGE}/profile/references`;
export const PROFILE_PORTFOLIO = `${HOMEPAGE}/profile/portfolio`;

export const JOBS = `${HOMEPAGE}/jobs`;
export const MANAGER_JOBS = `${HOMEPAGE}/manager/jobs`;
export const HR_JOBS = `${HOMEPAGE}/hr/jobs`;

export const JOB_BUILDER = `${HOMEPAGE}/manager/jobs/builder`;

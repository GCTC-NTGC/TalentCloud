import { Job } from "./types";

const pad = (n: number, width: number, z = "0"): string => {
  return (String(z).repeat(width) + String(n)).slice(String(n).length);
};

export const classificationString = (job: Job): string =>
  `${job.classification_code}-${pad(job.classification_level, 2)}`;

export default { classificationString };

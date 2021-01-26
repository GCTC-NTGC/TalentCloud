/* eslint-disable camelcase */
import { Application } from "../../models/types";
import { ReviewStatusId } from "../../models/lookupConstants";

type Bucket = "priority" | "citizen" | "non-citizen" | "unqualified";

type Category = "primary" | "optional" | "screened-out";

/**
 * Return the bucket this application belongs to. Either:
 *  priority
 *  citizen
 *  secondary
 *  unqualified
 *
 */
export function applicationBucket(application: Application): Bucket {
  // TODO: Un-hardcode the application version ID.
  if (!application.meets_essential_criteria && application.version_id === 1) {
    if (application.citizenship_declaration.name !== "citizen") {
      return "non-citizen";
    }
    return "unqualified";
  }

  if (application.applicant.user.is_priority) {
    return "priority";
  }

  if (application.citizenship_declaration.name === "citizen") {
    return "citizen";
  }

  return "non-citizen";
}

/**
 * Return the category this application belongs to. Either:
 *  primary
 *  optional
 *  screened-out
 * @param {Application} application
 */
export function applicationCategory(application: Application): Category {
  if (application?.application_review?.review_status?.name === "screened_out") {
    return "screened-out";
  }
  if (application?.application_review?.review_status?.name === "still_in") {
    return "primary";
  }
  const bucket = applicationBucket(application);

  switch (bucket) {
    case "priority":
    case "citizen":
      return "primary";
    case "non-citizen":
    case "unqualified":
    default:
      return "optional";
  }
}

function isVet(application: Application): boolean {
  return application.veteran_status.name !== "none";
}

/**
 * Compare function used for sorting applications
 */
export function applicationCompare(
  first: Application,
  second: Application,
): number {
  // Sort by status in the following order:
  // "still_in", "Not Reviewed", "still_thinking", "screened_out",
  const score = (application: Application): number => {
    switch (
      application.application_review
        ? application.application_review.review_status_id
        : null
    ) {
      case ReviewStatusId.StillIn:
        return 1;
      case null:
        return 2;
      case ReviewStatusId.StillThinking:
        return 3;
      case ReviewStatusId.ScreenedOut:
        return 4;
      default:
        return 2; // Treat default same as "Not Reviewed"
    }
  };

  // Add a preference for veterans within each status group
  const scoreVet = (application: Application): number =>
    score(application) - (isVet(application) ? 0.1 : 0);
  const scoreDiff = scoreVet(first) - scoreVet(second);

  if (scoreDiff !== 0) {
    return scoreDiff;
  }

  // Otherwise, sort alphabetically by name;
  return first.applicant.user.last_name.localeCompare(
    second.applicant.user.last_name,
  );
}

/**
 * Compare function used for sorting applications, which prioritizes veterans over all others.
 */
export function applicationComparePrioritizeVeterans(
  first: Application,
  second: Application,
): number {
  // Veterans come before others
  if (isVet(first) && !isVet(second)) {
    return -1;
  }
  if (!isVet(first) && isVet(second)) {
    return 1;
  }
  return applicationCompare(first, second);
}

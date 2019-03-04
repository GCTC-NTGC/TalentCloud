import { Application } from "../types";
import { ReviewStatusId } from "../lookupConstants";

type Bucket = "priority" | "citizen" | "non-citizen" | "unqualified";

type Category = "primary" | "optional" | "screened-out";

/**
 * Returns true if application has been screened out.
 */
export function isScreenedOut(application: Application): boolean {
  return application.application_review &&
    application.application_review.review_status
    ? application.application_review.review_status.name == "screened_out"
    : false; // non-reviewed applicaitons have not been screened-out yet
}

/**
 * Return the bucket this application belongs to. Either:
 *  priority
 *  citizen
 *  secondary
 *  unqualified
 *
 */
export function applicationBucket(application: Application): Bucket {
  if (!application.meets_essential_criteria) {
    return "unqualified";
  } else if (false) {
    return "priority"; // TODO: decide how to determine priority
  } else if (application.citizenship_declaration.name === "citizen") {
    return "citizen";
  } else {
    return "non-citizen";
  }
}

/**
 * Return the category this application belongs to. Either:
 *  primary
 *  optional
 *  screened-out
 * @param {Application} application
 */
export function applicationCategory(application: Application): Category {
  if (isScreenedOut(application)) {
    return "screened-out";
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
  return application.veteran_status.name != "none";
}

/**
 * Compare function used for sorting applications
 */
export function applicationCompare(
  first: Application,
  second: Application
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
    }
  };

  // Add a preference for veterans within each status group
  const scoreVet = (application: Application): number => {
    return score(application) - (isVet(application) ? 0.1 : 0);
  };
  const scoreDiff = scoreVet(first) - scoreVet(second);

  if (scoreDiff != 0) {
    return scoreDiff;
  }

  // Otherwise, sort alphabetically by name;
  return first.applicant.user.name.localeCompare(second.applicant.user.name);
}

/**
 * Compare function used for sorting applications, which priotizes veterans over all others.
 */
export function applicationComparePrioritizeVeterans(
  first: Application,
  second: Application
): number {
  //Veterans come before others
  if (isVet(first) && !isVet(second)) {
    return -1;
  } else if (!isVet(first) && isVet(second)) {
    return 1;
  }
  return applicationCompare(first, second);
}

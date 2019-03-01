import { Application } from "../types";

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

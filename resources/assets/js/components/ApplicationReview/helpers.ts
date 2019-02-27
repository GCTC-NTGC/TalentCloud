import { Application } from "../types";

type Bucket = "priority" | "citizen" | "non-citizen" | "unqualified";

type Category = "primary" | "optional" | "screened-out";

/**
 * Returns true if application has been screened out.
 */
export function isScreenedOut(application: Application): boolean {
  return false; // TODO: decide how to determin
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
  if (false) {
    return "priority"; // TODO: decide how to determine priority
  } else if (application.citizenship_declaration.name === "citizen") {
    return "citizen";
  } else {
    return "non-citizen";
  }
  return "unqualified";
  // TODO: decide how to determine unqualified
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

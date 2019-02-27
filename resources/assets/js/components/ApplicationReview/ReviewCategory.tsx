import React from "react";
import { Application } from "../types";
import { SelectOption } from "../Select";
import { applicationBucket } from "./application-helpers";
import BucketView from "./ReviewBucket";

interface CategoryViewProps {
  title: string;
  description: string;
  showScreenOutAll: boolean;
  applications: Application[];
  reviewStatusOptions: SelectOption<number>[];
}

const CategoryView: React.StatelessComponent<CategoryViewProps> = (
  props
): React.ReactElement | null => {
  if (props.applications.length === 0) {
    return null;
  }

  const buckets = [
    {
      title: "Priority Applicants",
      description: "blah",
      applications: props.applications.filter(
        application => applicationBucket(application) === "priority"
      )
    },
    {
      title: "Canadian Citizens and Veterans",
      description: "blah",
      applications: props.applications.filter(
        application => applicationBucket(application) === "citizen"
      )
    },
    {
      title: "Non-Canadian Citizens",
      description: "blah",
      applications: props.applications.filter(
        application => applicationBucket(application) === "non-citizen"
      )
    },
    {
      title: "Don't Meed Essential Criteria",
      description: "blah",
      applications: props.applications.filter(
        application => applicationBucket(application) === "unqualified"
      )
    }
  ];

  return (
    <div className="applicant-category">
      <h3 className="heading--03">
        <i className="fas fa-ban" /> {props.title}
      </h3>

      <p>{props.description}</p>

      {/* Category Action
                This section only exists for the "secondary" category, and should generate a confirmation dialogue that prompts the user to decide whether to screen ALL of the candidates in this category out or not.
            */}
      {props.showScreenOutAll && (
        <span className="category-action">
          <button className="button--outline" type="button">
            <i className="fas fa-ban" /> Screen All Optional Candidates Out
          </button>
        </span>
      )}

      {buckets.map(bucket => (
        <BucketView
          key={bucket.title}
          {...bucket}
          reviewStatusOptions={props.reviewStatusOptions}
        />
      ))}
    </div>
  );
};

export default CategoryView;

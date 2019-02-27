import React from "react";
import className from "classnames";
import route from "../../helpers/route";
import Select, { SelectOption } from "../Select";
import { Application } from "../types";

interface ApplicationViewProps {
  application: Application;
  reviewStatusOptions: SelectOption<number>[];
}

interface ApplicationViewState {
  selectedStatusId: number | undefined;
}

/**
 * Applicants and Their States
 * Applicants contain 3 different points of data that can alter their state:
 *   - Their current status:
 *     - in (screened in)
 *     - out (screened out)
 *     - maybe (saved for review)
 *     - null (the manager hasn't yet taken an action on this applicant)
 *   - Whether a note has been created regarding their application:
 *     - true
 *     - false
 */
export default class ApplicationView extends React.Component<
  ApplicationViewProps,
  ApplicationViewState
  > {
  public constructor(props: ApplicationViewProps) {
    super(props);
    this.state = {
      selectedStatusId:
        this.props.application.application_review &&
          this.props.application.application_review.review_status_id
          ? this.props.application.application_review.review_status_id
          : undefined
    };
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  onStatusChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const value = event.target.value ? parseInt(event.target.value) : undefined;
    this.setState({ selectedStatusId: value });
  }

  render() {
    const reviewStatus =
      this.props.application.application_review &&
        this.props.application.application_review.review_status
        ? this.props.application.application_review.review_status.name
        : null;
    const statusIconClass = className("fas", {
      "fa-ban": reviewStatus == "screened_out",
      "fa-question-circle": reviewStatus == "still_thinking",
      "fa-check-circle": reviewStatus == "still_in",
      "fa-exclamation-circle": reviewStatus == null
    });
    return (
      <form className="applicant-summary">
        <div className="flex-grid middle gutter">
          <div className="box lg-1of11 applicant-status">
            <i className={statusIconClass} />
          </div>

          <div className="box lg-2of11 applicant-information">
            <span className="name">
              {this.props.application.applicant.user.name}
            </span>
            <a
              href={"mailto:" + this.props.application.applicant.user.email}
              title="Email this candidate."
            >
              {this.props.application.applicant.user.email}
            </a>
            {/* This span only shown for veterans */}
            {(this.props.application.veteran_status.name == "current" ||
              this.props.application.veteran_status.name == "past") && (
                <span className="veteran-status">
                  <img
                    alt="The Talent Cloud veteran icon."
                    src="/images/icon_veteran.svg"
                  />
                  Veteran
              </span>
              )}
          </div>

          <div className="box lg-2of11 applicant-links">
            <a
              href={route("manager.applications.show", this.props.application)}
              title="View this applicant's application."
            >
              <i className="fas fa-file-alt" />
              View Application
            </a>
            <a
              href={route(
                "manager.applicants.show",
                this.props.application.applicant
              )}
              title="View this applicant's profile."
            >
              <i className="fas fa-user" />
              View Profile
            </a>
          </div>

          <div className="box lg-2of11 applicant-decision">
            <Select
              formName="review_status"
              htmlId={"review_status_" + this.props.application.id}
              label="Decision"
              selected={this.state.selectedStatusId}
              nullSelection="Not Reviewed"
              options={this.props.reviewStatusOptions}
              onChange={this.onStatusChange}
            />
          </div>

          <div className="box lg-2of11 applicant-notes">
            {/* Add a Note
                        This button should trigger a dialogue that allows the manager to edit and save a textarea element unique to this applicant/application. This dialoue should contain a "Cancel" and "Save" button.
                        Change the text depending on whether note exists yet
                    */}
            <button className="button--outline" type="button">
              + Add a Note / Edit Note
            </button>
          </div>

          <div className="box lg-2of11 applicant-save-button">
            {/* Save Button
                        This button should be given a "saved" class when React is finished submitting the data. This class should then be removed when any element for this applicant has been changed, prompting the user to save again.
                    */}
            <button className="button--blue light-bg" type="button">
              <span className="default-copy">Save</span>
              <span className="saved-copy">Saved</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

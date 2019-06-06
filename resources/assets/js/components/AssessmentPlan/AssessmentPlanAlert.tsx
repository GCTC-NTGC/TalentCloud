import React from "react";
import { connect } from "react-redux";
import some from "lodash/some";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { AssessmentPlanNotification, Skill } from "../../models/types";
import {
  notificationIsUpdating,
  notificationsAreFetching,
} from "../../store/AssessmentPlanNotification/assessmentPlanNotificationSelectors";
import { RootState } from "../../store/store";
import { DispatchType } from "../../configureStore";
import { updateAssessmentPlanNotification } from "../../store/AssessmentPlanNotification/assessmentPlanNotificationActions";
import { getSkills } from "../../store/Skill/skillSelector";
import { mapToObject, getId, hasKey } from "../../helpers/queries";
import { getTranslatedField } from "../../helpers/translation";

interface AssessmentPlanAlertProps {
  notifications: AssessmentPlanNotification[];
  skills: Skill[];
  isFetching: boolean;
  isUpdating: boolean;
  handleDismiss: () => void;
}

export const AssessmentPlanAlert: React.FunctionComponent<
  AssessmentPlanAlertProps & InjectedIntlProps
> = ({
  notifications,
  skills,
  isFetching,
  isUpdating,
  handleDismiss,
  intl,
}): React.ReactElement | null => {
  if ((notifications.length === 0 && !isFetching) || isUpdating) {
    return null;
  }
  if (notifications.length === 0 && isFetching) {
    return (
      <div
        data-c-alert="error"
        data-c-radius="rounded"
        data-c-padding="half"
        role="alert"
        data-c-margin="top(double)"
        data-c-grid="middle"
      >
        <p
          data-c-margin="bottom(quarter)"
          data-c-heading="h5"
          data-c-font-weight="bold"
        >
          <i aria-hidden="true" className="fa fa-spinner fa-spin" />
          <FormattedMessage
            id="assessmentPlan.alert.checking"
            defaultMessage="Checking if Job changed recently..."
            description="Alert title while notifications are still being loaded."
          />
        </p>
      </div>
    );
  }
  const skillsById = mapToObject(skills, getId);
  const skillName = (skillId: number): string => {
    const skill = hasKey(skillsById, skillId) ? skillsById[skillId] : null;
    const fallback = "UNKNOWN SKILL";
    if (skill === null) {
      return fallback;
    }
    return getTranslatedField(skill, intl.locale, "name", fallback);
  };

  const createNotifications = notifications.filter(
    (notification): boolean => notification.type === "CREATE",
  );
  const updateSkillNotifications = notifications.filter(
    (notification): boolean =>
      notification.type === "UPDATE" &&
      notification.skill_id !== notification.skill_id_new &&
      notification.skill_id_new !== null &&
      (notification.skill_level_id_new === null ||
        notification.skill_level_id === notification.skill_level_id_new),
  );
  const updateLevelNotifications = notifications.filter(
    (notification): boolean =>
      notification.type === "UPDATE" &&
      notification.skill_level_id !== notification.skill_level_id_new &&
      notification.skill_level_id_new !== null &&
      (notification.skill_id_new === null ||
        notification.skill_id === notification.skill_id_new),
  );
  const updateBothNotifications = notifications.filter(
    (notification): boolean =>
      notification.type === "UPDATE" &&
      notification.skill_id !== notification.skill_id_new &&
      notification.skill_level_id !== notification.skill_level_id_new &&
      notification.skill_id_new !== null &&
      notification.skill_level_id_new !== null,
  );
  const deleteNotifications = notifications.filter(
    (notification): boolean => notification.type === "DELETE",
  );
  return (
    <div
      data-c-alert="error"
      data-c-radius="rounded"
      data-c-padding="half"
      role="alert"
      data-c-margin="top(double)"
      data-c-grid="middle"
    >
      <div data-c-grid-item="base(2of3) tl(4of5)">
        <p
          data-c-margin="bottom(quarter)"
          data-c-heading="h5"
          data-c-font-weight="bold"
        >
          <i aria-hidden="true" className="fa fa-exclamation-circle" />
          <FormattedMessage
            id="assessmentPlan.alert.title"
            defaultMessage="This job changed recently!"
            description="Title for the alert for changes to this job's criteria."
          />
        </p>

        <p>
          <FormattedMessage
            id="assessmentPlan.alert.explanation"
            defaultMessage="Parts of the Screening Plan have been changed to match."
            description="Explanation that the screening plan may have changed."
          />
        </p>

        {createNotifications.length > 0 && (
          <p>
            <FormattedMessage
              id="assessmentPlan.alert.created"
              defaultMessage="{skills} {count, plural, one {was} other {were} } added."
              description="Description of the new criteria that have been added to this job."
              values={{
                skills: createNotifications
                  .map(
                    (notification): string => skillName(notification.skill_id),
                  )
                  .join(", "),
                count: createNotifications.length,
              }}
            />
          </p>
        )}
        {updateLevelNotifications.length > 0 && (
          <p>
            <FormattedMessage
              id="assessmentPlan.alert.skillLevelUpdated"
              defaultMessage="{skills} {count, plural, one {was} other {were} } updated."
              description="Description of the criteria that had their level changed."
              values={{
                skills: updateLevelNotifications
                  .map(
                    (notification): string => skillName(notification.skill_id),
                  )
                  .join(", "),
                count: updateLevelNotifications.length,
              }}
            />
          </p>
        )}
        {updateSkillNotifications.map(
          (notification): React.ReactElement => (
            <p key={`skillUpdatedAlert_${notification.id}`}>
              <FormattedMessage
                id="assessmentPlan.alert.skillUpdated"
                defaultMessage="{oldSkill} was changed to {newSkill}."
                description="Description of a criterion which was changed from one skill to another."
                values={{
                  oldSkill: skillName(notification.skill_id),
                  newSkill:
                    notification.skill_id_new !== null
                      ? skillName(notification.skill_id_new)
                      : "UNKNOWN",
                }}
              />
            </p>
          ),
        )}
        {updateBothNotifications.map(
          (notification): React.ReactElement => (
            <p key={`skillAndLevelUpdatedAlert_${notification.id}`}>
              <FormattedMessage
                id="assessmentPlan.alert.skillAndLevelUpdated"
                defaultMessage="{oldSkill} was changed to {newSkill} and was updated."
                description="Description of a criterion which was changed from one skill to another and had its level changed."
                values={{
                  oldSkill: skillName(notification.skill_id),
                  newSkill:
                    notification.skill_id_new !== null
                      ? skillName(notification.skill_id_new)
                      : "UNKNOWN",
                }}
              />
            </p>
          ),
        )}
        {deleteNotifications.length > 0 && (
          <p>
            <FormattedMessage
              id="assessmentPlan.alert.deleted"
              defaultMessage="{skills} {count, plural, one {was} other {were} } removed."
              description="Description of criteria which were removed from the job."
              values={{
                skills: deleteNotifications
                  .map(
                    (notification): string => skillName(notification.skill_id),
                  )
                  .join(", "),
                count: deleteNotifications.length,
              }}
            />
          </p>
        )}
      </div>

      <div
        data-c-alignment="base(right)"
        data-c-grid-item="base(1of3) tl(1of5)"
      >
        <button
          className="button-trash"
          type="button"
          onClick={(): void => handleDismiss()}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <i className="fa fa-spinner fa-spin" />
          ) : (
            <i className="fa fa-trash" />
          )}
        </button>
      </div>
    </div>
  );
};

interface AssessmentPlanAlertContainerProps {
  notifications: AssessmentPlanNotification[];
}

const mapStateToProps = (
  state: RootState,
  ownProps: AssessmentPlanAlertContainerProps,
): {
  skills: Skill[];
  isFetching: boolean;
  isUpdating: boolean;
} => ({
  skills: getSkills(state),
  isFetching: notificationsAreFetching(state),
  isUpdating: some(
    ownProps.notifications,
    (notification): boolean => notificationIsUpdating(state, notification.id),
  ),
});

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: AssessmentPlanAlertContainerProps,
): { handleDismiss: () => void } => ({
  handleDismiss: (): void => {
    ownProps.notifications.forEach(
      (notification): void => {
        dispatch(
          updateAssessmentPlanNotification({
            ...notification,
            acknowledged: true,
          }),
        );
      },
    );
  },
});
// @ts-ignore
export const AssessmentPlanAlertContainer: React.FunctionComponent<
  AssessmentPlanAlertContainerProps
> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AssessmentPlanAlert));

export default AssessmentPlanAlertContainer;

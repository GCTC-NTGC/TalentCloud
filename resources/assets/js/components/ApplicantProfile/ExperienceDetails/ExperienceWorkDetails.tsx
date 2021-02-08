import React, { FunctionComponent } from "react";
import { useIntl } from "react-intl";
import detailsMessages from "./detailsMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceWork } from "../../../models/types";

const ExperienceWorkDetails: FunctionComponent<{
  experience: ExperienceWork;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const { title, organization, group } = experience;
  const startDate = experience.start_date;
  const endDate = experience.start_date;
  const isActive = experience.is_active;
  const notApplicable = (
    <p data-h2-font-color="b(gray-1)">
      {intl.formatMessage(detailsMessages.notApplicable)}
    </p>
  );
  return (
    <div data-h2-grid="b(middle, contained, flush, 1)">
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.experienceTypeLabel)}
          </p>
          <p>
            <i
              className="fas fa-briefcase"
              data-h2-font-color="b(theme-1)"
              data-h2-margin="b(right, .25)"
            />
            {intl.formatMessage(detailsMessages.workType)}
          </p>
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.workRoleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.workOrganizationLabel)}
          </p>
          {organization ? <p>{organization}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.workTeamLabel)}
          </p>
          {group ? <p>{group}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.startDateLabel)}
          </p>
          {startDate ? <p>{readableDate(locale, startDate)}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.endDateLabel)}
          </p>
          {isActive && <p>{intl.formatMessage(detailsMessages.ongoing)}</p>}
          {!isActive && endDate ? (
            <p>{readableDate(locale, endDate)}</p>
          ) : (
            notApplicable
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceWorkDetails;

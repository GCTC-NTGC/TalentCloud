import React from "react";
import { useIntl } from "react-intl";
import detailsMessages from "./detailsMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDateFromString } from "../../../helpers/dates";
import { ExperienceCommunity } from "../../../models/types";

const ExperienceCommunityDetails: React.FC<{
  experience: ExperienceCommunity;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const { title, group, project } = experience;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;

  const notApplicable = (
    <p data-h2-font-color="b(gray-1)">
      {intl.formatMessage(detailsMessages.notApplicable)}
    </p>
  );
  const endDateOrNa = endDate ? (
    <p>{readableDateFromString(locale, endDate)}</p>
  ) : (
    notApplicable
  );
  return (
    <div data-h2-grid="b(middle, expanded, flush, 1)">
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.experienceTypeLabel)}
          </p>
          <p>
            <i
              className="fas fa-people-carry"
              data-h2-font-color="b(theme-1)"
              data-h2-margin="b(right, .25)"
            />
            {intl.formatMessage(detailsMessages.communityType)}
          </p>
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.communityRoleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.communityOrganizationLabel)}
          </p>
          {group ? <p>{group}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.communityProjectLabel)}
          </p>
          {project ? <p>{project}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.startDateLabel)}
          </p>
          {startDate ? (
            <p>{readableDateFromString(locale, startDate)}</p>
          ) : (
            notApplicable
          )}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.endDateLabel)}
          </p>
          {isActive ? (
            <p>{intl.formatMessage(detailsMessages.ongoing)}</p>
          ) : (
            endDateOrNa
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCommunityDetails;

import React, { FunctionComponent } from "react";
import { useIntl } from "react-intl";
import detailsMessages from "./detailsMessages";
import { getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperiencePersonal } from "../../../models/types";

const ExperiencePersonalDetails: FunctionComponent<{
  experience: ExperiencePersonal;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const { title, description } = experience;
  const isShareable = experience.is_shareable;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;

  const notApplicable = (
    <p data-h2-font-color="b(gray-1)">
      {intl.formatMessage(detailsMessages.notApplicable)}
    </p>
  );
  const endDateOrNa = endDate ? (
    <p>{readableDate(locale, endDate)}</p>
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
              className="fas fa-mountain"
              data-h2-font-color="b(theme-1)"
              data-h2-margin="b(right, .25)"
            />
            {intl.formatMessage(detailsMessages.personalType)}
          </p>
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.personalTitleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of1)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.personalDescriptionLabel)}
          </p>
          {description ? <p>{description}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.personalShareLabel)}
          </p>
          {isShareable ? (
            <p>
              <i
                className="fas fa-check-circle"
                data-h2-font-color="b(go)"
                data-h2-margin="b(right, .25)"
              />
              {intl.formatMessage(detailsMessages.personalShareAllowed)}
            </p>
          ) : (
            <p>
              <i
                className="fas fa-check-circle"
                data-h2-font-color="b(stop)"
                data-h2-margin="b(right, .25)"
              />
              {intl.formatMessage(detailsMessages.personalShareDenied)}
            </p>
          )}
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

export default ExperiencePersonalDetails;

import React from "react";
import { useIntl } from "react-intl";
import detailsMessages from "./detailsMessages";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { ExperienceAward } from "../../../models/types";

const ExperienceAwardDetails: React.FC<{
  experience: ExperienceAward;
}> = ({ experience }): React.ReactElement => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const { title } = experience;
  const recipient = localizeFieldNonNull(
    locale,
    experience,
    "award_recipient_type",
  );
  const issuer = experience.issued_by;
  const scope = localizeFieldNonNull(
    locale,
    experience,
    "award_recognition_type",
  );
  const awardedDate = experience.awarded_date;

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
              className="fas fa-trophy"
              data-h2-font-color="b(theme-1)"
              data-h2-margin="b(right, .25)"
            />
            {intl.formatMessage(detailsMessages.awardType)}
          </p>
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.awardTitleLabel)}
          </p>
          {title ? <p>{title}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.awardRecipientLabel)}
          </p>
          {recipient ? <p>{recipient}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.awardIssuerLabel)}
          </p>
          {issuer ? <p>{issuer}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.awardScopeLabel)}
          </p>
          {scope ? <p>{scope}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.awardDateLabel)}
          </p>
          {awardedDate ? (
            <p>{readableDate(locale, awardedDate)}</p>
          ) : (
            notApplicable
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceAwardDetails;

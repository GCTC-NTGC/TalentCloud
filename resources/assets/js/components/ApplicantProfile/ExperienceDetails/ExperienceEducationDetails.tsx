import React from "react";
import { useIntl } from "react-intl";
import detailsMessages from "./detailsMessages";
import { getLocale, localizeFieldNonNull } from "../../../helpers/localize";
import { readableDateFromString } from "../../../helpers/dates";
import { ExperienceEducation } from "../../../models/types";

const ExperienceEducationDetails: React.FC<{
  experience: ExperienceEducation;
}> = ({ experience }) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);

  const educationType = localizeFieldNonNull(
    locale,
    experience,
    "education_type",
  );
  const { institution } = experience;
  const status = localizeFieldNonNull(locale, experience, "education_status");
  const areaOfStudy = experience.area_of_study;
  const startDate = experience.start_date;
  const endDate = experience.end_date;
  const isActive = experience.is_active;
  const thesisTitle = experience.thesis_title;

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
              className="fas fa-book"
              data-h2-font-color="b(theme-1)"
              data-h2-margin="b(right, .25)"
            />
            {intl.formatMessage(detailsMessages.educationType)}
          </p>
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.educationTypeLabel)}
          </p>
          {educationType ? <p>{educationType}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.educationAreaOfStudyLabel)}
          </p>
          {areaOfStudy ? <p>{areaOfStudy}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.educationInstitutionLabel)}
          </p>
          {institution ? <p>{institution}</p> : notApplicable}
        </div>
      </div>
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.educationStatusLabel)}
          </p>
          {status ? <p>{status}</p> : notApplicable}
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
            { notApplicable }
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
      <div data-h2-grid-item="b(1of2) m(1of3)">
        <div data-h2-grid-content>
          <p data-h2-font-weight="b(600)">
            {intl.formatMessage(detailsMessages.educationThesisLabel)}
          </p>
          {thesisTitle ? <p>{thesisTitle}</p> : notApplicable}
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducationDetails;

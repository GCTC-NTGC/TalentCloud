import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  ExperienceSkill,
  BaseExperienceAccordion,
  titleBarDateRange,
} from "./BaseExperienceAccordion";
import { Locales, getLocale } from "../../../helpers/localize";
import { readableDate } from "../../../helpers/dates";
import { Link } from "../../../models/app";

interface ExperiencePersonalAccordionProps {
  title: string;
  description: string;
  isShareable: boolean;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;

  relevantSkills: ExperienceSkill[];
  irrelevantSkillCount: number;
  isEducationJustification: boolean;
  showSkillDetails: boolean;
  showButtons: boolean;
  handleDelete: () => void;
  handleEdit: () => void;
}

const experiencePersonalDetails = ({
  locale,
  title,
  description,
  isShareable,
  startDate,
  endDate,
  isActive,
}: {
  locale: Locales;
  title: string;
  description: string;
  isShareable: boolean;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}): React.ReactElement => {
  const notApplicable = (
    <p data-c-color="gray">
      <FormattedMessage
        id="experiencePersonalAccordion.notApplicable"
        defaultMessage="N/A"
      />
    </p>
  );
  const endDateOrNa = endDate ? (
    <p>{readableDate(locale, endDate)}</p>
  ) : (
    notApplicable
  );
  return (
    <>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experiencePersonalAccordion.experienceTypeLabel"
            defaultMessage="Type of Experience:"
          />
        </p>
        <p>
          <i
            className="fas fa-trophy"
            data-c-color="c1"
            data-c-margin="right(.25)"
          />
          <FormattedMessage
            id="experiencePersonalAccordion.experienceTypeTitle"
            defaultMessage="Personal Experience"
          />
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experiencePersonalAccordion.titleLabel"
            defaultMessage="Title of Experience:"
          />
          {title ? <p>{title}</p> : notApplicable}
        </p>
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experiencePersonalAccordion.descriptionLabel"
            defaultMessage="Description:"
          />
        </p>
        {description ? <p>{description}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experiencePersonalAccordion.shareableLabel"
            defaultMessage="Consent to Share:"
          />
        </p>
        {isShareable ? (
          <p>
            <i
              className="fas fa-check-circle"
              data-c-color="go"
              data-c-margin="right(.25)"
            ></i>
            <FormattedMessage
              id="experiencePersonalAccordion.isShareable"
              defaultMessage="Sharing Approved"
              description="Text shown when user has consented to share this experience."
            />
          </p>
        ) : (
          <p>
            <i
              className="fas fa-check-circle"
              data-c-color="stop"
              data-c-margin="right(.25)"
            ></i>
            <FormattedMessage
              id="experiencePersonalAccordion.isNotShareable"
              defaultMessage="Sharing Restricted"
              description="Text shown when user has NOT consented to share this experience."
            />
          </p>
        )}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.startDate"
            defaultMessage="Start Date:"
          />
        </p>
        {startDate ? <p>{readableDate(locale, startDate)}</p> : notApplicable}
      </div>
      <div data-c-grid-item="base(1of2) tl(1of3)">
        <p data-c-font-weight="bold">
          <FormattedMessage
            id="experienceCommunityAccordion.endDate"
            defaultMessage="End Date:"
          />
        </p>
        {isActive ? (
          <p>
            <FormattedMessage
              id="experienceCommunityAccordion.ongoing"
              defaultMessage="Ongoing"
            />
          </p>
        ) : (
          endDateOrNa
        )}
      </div>
    </>
  );
};

export const ExperiencePersonalAccordion: React.FC<ExperiencePersonalAccordionProps> = ({
  title,
  description,
  isShareable,
  startDate,
  endDate,
  isActive,

  relevantSkills,
  irrelevantSkillCount,
  isEducationJustification,
  showSkillDetails,
  showButtons,
  handleDelete,
  handleEdit,
}) => {
  const intl = useIntl();
  const locale = getLocale(intl.locale);
  const accordionTitle = (
    <>
      <p>
        <span data-c-font-weight="bold">{title}</span>
      </p>
      {titleBarDateRange(startDate, endDate, isActive, locale)}
    </>
  );
  return (
    <BaseExperienceAccordion
      title={accordionTitle}
      iconClass="fa-trophy"
      relevantSkills={relevantSkills}
      irrelevantSkillCount={irrelevantSkillCount}
      isEducationJustification={isEducationJustification}
      details={experiencePersonalDetails({
        locale,
        title,
        description,
        isShareable,
        startDate,
        endDate,
        isActive,
      })}
      showSkillDetails={showSkillDetails}
      showButtons={showButtons}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ExperiencePersonalAccordion;

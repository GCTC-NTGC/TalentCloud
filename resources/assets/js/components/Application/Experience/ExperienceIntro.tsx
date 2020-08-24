import * as React from "react";
import { FormattedMessage, defineMessages, useIntl } from "react-intl";

interface ExperienceIntroProps {
  handleStart: () => void;
}

const typesOfExperience = defineMessages({
  education: {
    id: "application.experience.intro.educationExperience",
    defaultMessage: "Education Experience",
    description: "Type of experience: Education Experience.",
  },
  work: {
    id: "application.experience.intro.workExperience",
    defaultMessage: "Work Experience",
    description: "Type of experience: Work Experience.",
  },
  community: {
    id: "application.experience.intro.communityExperience",
    defaultMessage: "Community Experience",
    description: "Type of experience: Community Experience.",
  },
  personal: {
    id: "application.experience.intro.personalExperience",
    defaultMessage: "Personal Experience",
    description: "Type of experience: Personal Experience.",
  },
  awards: {
    id: "application.experience.intro.awards",
    defaultMessage: "Awards",
    description: "Type of experience: Award Experience.",
  },
});

const ExperienceIntro: React.FunctionComponent<ExperienceIntroProps> = ({
  handleStart,
}) => {
  const intl = useIntl();
  return (
    <section data-clone>
      <div data-c-container="medium">
        <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
          <FormattedMessage
            id="application.experience.intro.header"
            defaultMessage="Defining Your Experience"
            description="Header for the Experience Intro step."
          />
        </h2>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="application.experience.intro.explanation"
            defaultMessage="The next step in your application is to tell us about the experiences you've had that make you a good fit for this job."
            description="Paragraph explaining what to expect on the Experience step."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="application.experience.intro.typesOfExperiences"
            defaultMessage="On Talent Cloud, you can add these types of experiences:"
            description="Paragraph before list of possible experience types."
          />
        </p>
        <ul data-c-margin="bottom(1)">
          {Object.values(typesOfExperience).map((experience) => (
            <li>{intl.formatMessage(experience)}</li>
          ))}
        </ul>
        <p>
          <FormattedMessage
            id="application.experience.intro.saveToProfile"
            defaultMessage="The best part is that as you add these experiences, the information gets saved to your profile. The next time you go to apply to a job, you'll be able to select from the work you've done to help speed up the process."
            description="Paragraph explaining how experiences will be saved to profile."
          />
        </p>
      </div>
      <div data-c-container="medium" data-c-padding="tb(2)">
        <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
        <div data-c-grid="gutter(all, 1)">
          <div data-c-grid-item="tl(1of1)" data-c-align="base(center)">
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              type="button"
              onClick={handleStart}
            >
              <span>
                <FormattedMessage
                  id="application.experience.intro.letsGo"
                  defaultMessage="Let's Go"
                  description="Button text for continuing to next step in Application Form."
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceIntro;

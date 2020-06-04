import React from "react";
import { FormattedMessage } from "react-intl";

interface IntroProps {
  handleStart: () => void;
}

const ApplicationIntro: React.FC<IntroProps> = ({ handleStart }) => {
  return (
    <div data-c-border="bottom(thin, solid, gray)">
      <div data-c-container="medium">
        <h2 data-c-heading="h2" data-c-margin="top(3) bottom(1)">
          <FormattedMessage
            id="applicationTimeline.intro.heading"
            defaultMessage="Start Your Application"
            description="Heading text on the intro step of the Application Timeline."
          />
        </h2>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="applicationTimeline.intro.preamble"
            defaultMessage="Before you begin we'd like to provide you with some information about what you can expect from our application process."
            description="First section of text on the intro step of the Application Timeline."
          />
        </p>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="applicationTimeline.intro.firstParagraph"
            defaultMessage="Talent Cloud is a skills-based hiring platform, and <bold>this means that we're going to ask you about your experiences in a way that differs from a traditional resume format</bold>. The goal is to get a thorough understanding of the skills you have and how your past experiences have shaped them. This gives the manager reviewing your application a much stronger sense of your abilities."
            description="Paragraph explaining how TC differs from a traditional resumé."
            values={{
              bold: (...chunks): React.ReactElement => (
                <span data-c-font-weight="bold">{chunks}</span>
              ),
            }}
          />
        </p>
        <ul data-c-margin="bottom(1)">
          <li>
            <FormattedMessage
              id="applicationTimeline.intro.firstBullet"
              defaultMessage="We'll begin by asking you about your experiences, varying across academia, work, community, etc."
              description="Bullet point about the beginning of the application process."
            />
          </li>
          <li>
            <FormattedMessage
              id="applicationTimeline.intro.secondBullet"
              defaultMessage="Once we have an understanding of your history, we'll ask you to explain how those experiences relate to the skills needed for this position."
              description="Bullet point about the end of the application process."
            />
          </li>
        </ul>
        <p data-c-margin="bottom(1)">
          <FormattedMessage
            id="applicationTimeline.intro.secondParagraph"
            defaultMessage="During your very first application you'll be starting with a blank slate, but the great thing about Talent Cloud is that <bold>all of your information will be saved to your profile</bold>. This allows us to automatically fill in parts of your future applications, saving you a ton of time."
            description="Paragraph explaining the time saving of the application and profile."
            values={{
              bold: (...chunks): React.ReactElement => (
                <span data-c-font-weight="bold">{chunks}</span>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="applicationTimeline.intro.prompt"
            defaultMessage="Ready to get started?"
            description="Ending text to motivate the applicant to progress."
          />
        </p>
      </div>
      <div data-c-container="medium" data-c-padding="tb(2)">
        <hr data-c-hr="thin(c1)" data-c-margin="bottom(2)" />
        <div data-c-grid="gutter(all, 1)">
          <div
            data-c-grid-item="tl(1of2)"
            data-c-align="base(center) tl(left)"
          />
          <div
            data-c-grid-item="tl(1of2)"
            data-c-align="base(center) tl(right)"
          >
            <button
              data-c-button="solid(c1)"
              data-c-radius="rounded"
              type="button"
              onClick={handleStart}
            >
              <span>
                <FormattedMessage
                  id="applicationTimeline.intro.start"
                  defaultMessage="Start My Application"
                  description="Button text for starting an application."
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationIntro;

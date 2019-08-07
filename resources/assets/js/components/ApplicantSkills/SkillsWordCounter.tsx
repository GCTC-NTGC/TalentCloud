/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import ReactDOM from "react-dom";
import { injectIntl, InjectedIntlProps, defineMessages } from "react-intl";
import WordCounterWrapper from "../WordCounter/WordCounterWrapper";
import IntlContainer from "../../IntlContainer";

export const wordCounterMessages = defineMessages({
  skillsPlaceholder: {
    id: "wordCounter.skills.placeholder",
    defaultMessage: "Start typing your answer above.",
    description:
      "Let's you specify example text that appears in word counter message empty",
  },
  skillsMessage1: {
    id: "wordCounter.skills.skillsMessage1",
    defaultMessage:
      "This seems too short. Did you include examples or lessons learned?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage2: {
    id: "wordCounter.skills.skillsMessage2",
    defaultMessage:
      "This seems a bit short. Do you have another example or lesson learned to add?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage3: {
    id: "wordCounter.skills.skillsMessage3",
    defaultMessage: "This is starting to get a bit long.",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage4: {
    id: "wordCounter.skills.skillsMessage4",
    defaultMessage:
      "This looks too long. Can you summarize some of your response?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage5: {
    id: "wordCounter.skills.skillsMessage5",
    defaultMessage:
      "This is way too long. Check out one of our examples to see what a concise skill description looks like.",
    description: "Message displayed to user on word counter.",
  },
});

interface SkillsWordCounterProps {
  elementId: string;
}

const SkillsWordCounter: React.FunctionComponent<
  SkillsWordCounterProps & InjectedIntlProps
> = ({ elementId, intl }): React.ReactElement => {
  const placeholder = intl.formatMessage(wordCounterMessages.skillsPlaceholder);
  const messages = [
    {
      count: 1,
      message: intl.formatMessage(wordCounterMessages.skillsMessage1),
    },
    {
      count: 10,
      message: intl.formatMessage(wordCounterMessages.skillsMessage2),
    },
    { count: 20, message: "" },
    {
      count: 80,
      message: intl.formatMessage(wordCounterMessages.skillsMessage3),
    },
    {
      count: 100,
      message: intl.formatMessage(wordCounterMessages.skillsMessage4),
    },
    {
      count: 130,
      message: intl.formatMessage(wordCounterMessages.skillsMessage5),
    },
  ];
  const minWords = 20;
  const maxWords = 80;
  const wordLimit = 150;
  return (
    <WordCounterWrapper
      elementId={elementId}
      messages={messages}
      wordLimit={wordLimit}
      minWords={minWords}
      maxWords={maxWords}
      placeholder={placeholder}
    />
  );
};

// Find all skills textarea elements
if (document.querySelectorAll("div[data-word-counter-id]")) {
  const elements = document.querySelectorAll("div[data-word-counter-id]");

  elements.forEach((container): void => {
    if (container != null && container.hasAttribute("data-word-counter-id")) {
      const elementId = JSON.parse(container.getAttribute(
        "data-word-counter-id",
      ) as string);
      const SkillsWordCounterIntl = injectIntl(SkillsWordCounter);
      const locale = document.documentElement.lang;
      ReactDOM.render(
        <IntlContainer locale={locale}>
          <SkillsWordCounterIntl elementId={elementId} />
        </IntlContainer>,
        container,
      );
    }
  });
}

export default injectIntl(SkillsWordCounter);

/* eslint-disable @typescript-eslint/camelcase */
import * as React from "react";
import ReactDOM from "react-dom";
import IntlContainer from "../../IntlContainer";
import WordCounter, { WordCounterProps } from "../WordCounter/WordCounter";

type SkillsWordCounterProps = WordCounterProps;

const SkillsWordCounter: React.FunctionComponent<SkillsWordCounterProps> = ({
  elementId,
  minWords,
  maxWords,
}): React.ReactElement => {
  return (
    <WordCounter
      elementId={elementId}
      minWords={minWords}
      maxWords={maxWords}
    />
  );
};

const addSoftSkillButton: HTMLElement | null = document.getElementById(
  "add-soft-skill",
);
const addHardSkillButton: HTMLElement | null = document.getElementById(
  "add-hard-skill",
);

const updateWordCounters = (): void => {
  if (addSoftSkillButton) {
    addSoftSkillButton.addEventListener("click", () => {
      setTimeout(updateWordCounters, 1000);
    });
  }

  if (addHardSkillButton) {
    addHardSkillButton.addEventListener("click", () => {
      setTimeout(updateWordCounters, 1000);
    });
  }

  // Find all skills textarea elements
  if (document.querySelectorAll("span[data-word-counter-id]")) {
    const wordCounters = document.querySelectorAll(
      "span[data-word-counter-id]",
    );

    wordCounters.forEach((wordCounter): void => {
      if (
        wordCounter !== null &&
        wordCounter.hasAttribute("data-word-counter-id")
      ) {
        const elementId = String(wordCounter.getAttribute("data-id"));
        const maxWords = Number(wordCounter.getAttribute("data-max-words"));
        const minWords = Number(wordCounter.getAttribute("data-min-words"));

        const locale = document.documentElement.lang;
        ReactDOM.render(
          <IntlContainer locale={locale}>
            <SkillsWordCounter
              elementId={elementId}
              maxWords={maxWords}
              minWords={minWords}
            />
          </IntlContainer>,
          wordCounter,
        );
      }
    });
  }
};

updateWordCounters();

export default SkillsWordCounter;

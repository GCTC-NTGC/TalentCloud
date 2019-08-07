import { defineMessages } from "react-intl";

export const wordCounterMessages = defineMessages({
  skillsMessage_1: {
    id: "wordCounter.skills.skillsMessage_1",
    defaultMessage:
      "This seems too short. Did you include examples or lessons learned?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage_2: {
    id: "wordCounter.skills.skillsMessage_2",
    defaultMessage:
      "This seems a bit short. Do you have another example or lesson learned to add?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage_3: {
    id: "wordCounter.skills.skillsMessage_3",
    defaultMessage: "This is starting to get a bit long.",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage_4: {
    id: "wordCounter.skills.skillsMessage_4",
    defaultMessage:
      "This looks too long. Can you summarize some of your response?",
    description: "Message displayed to user on word counter.",
  },
  skillsMessage_5: {
    id: "wordCounter.skills.skillsMessage_5",
    defaultMessage:
      "This is way too long. Check out one of our examples to see what a concise skill description looks like.",
    description: "Message displayed to user on word counter.",
  },
});

export const messages = [
  {
    count: 1,
    message: wordCounterMessages.skillsMessage_1,
  },
  { count: 10, message: wordCounterMessages.skillsMessage_2 },
  { count: 20, message: "" },
  { count: 80, message: wordCounterMessages.skillsMessage_3 },
  { count: 100, message: wordCounterMessages.skillsMessage_4 },
  {
    count: 130,
    message: wordCounterMessages.skillsMessage_5,
  },
];

export const minWords = 20;
export const maxWords = 80;
export const wordLimit = 150;
export const placeholder = "Start typing your answer above.";

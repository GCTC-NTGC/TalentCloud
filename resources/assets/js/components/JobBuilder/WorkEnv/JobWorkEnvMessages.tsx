import { defineMessages } from "react-intl";

export const formMessages = defineMessages({
  ourWorkEnvDesc: {
    id: "jobBuilder.workEnv.ourWorkEnvDesc",
    defaultMessage:
      "Share a little about your physical space, the technology used by your team, and the amenities close to your office. Check all that apply.",
    description:
      "Section 1 description of Job Poster Builder Work Environment Step",
  },
  teamSizeLabel: {
    id: "jobBuilder.workEnv.teamSizeLabel",
    defaultMessage: "Team Size",
    description: "The label displayed on the team size input.",
  },
  teamSizePlaceholder: {
    id: "jobBuilder.workEnv.teamSizePlaceholder",
    defaultMessage: "e.g. 10",
    description: "The placeholder displayed on the team size input.",
  },
  physicalEnvLabel: {
    id: "jobBuilder.workEnv.physicalEnvLabel",
    defaultMessage: "Our Physical Environment",
    description:
      "The label displayed on the physical environment checkbox group.",
  },
  technologyLabel: {
    id: "jobBuilder.workEnv.technologyLabel",
    defaultMessage: "Technology",
    description: "The label displayed on the technology checkbox group.",
  },
  amenitiesLabel: {
    id: "jobBuilder.workEnv.amenitiesLabel",
    defaultMessage: "Amenities",
    description: "The label displayed on the amenities checkbox group.",
  },
  moreOnWorkEnv: {
    id: "jobBuilder.workEnv.moreOnWorkEnv",
    defaultMessage: "More about your Environment",
    description: "The title for the more about your environment textbox.",
  },
  moreOnWorkEnvSubtext: {
    id: "jobBuilder.workEnv.moreOnWorkEnvSubtext",
    defaultMessage:
      "Anything else you'd like to add about your work environment? Highlight features of the physical environment, technology and amenities specific to your team.",
    description:
      "Subtext displayed for the more about your environment textbox.",
  },
  moreOnWorkEnvLabel: {
    id: "jobBuilder.workEnv.moreOnWorkEnvLabel",
    defaultMessage: "More About Your Environment",
    description:
      "The label displayed for the more about your environment textbox.",
  },
  moreOnWorkEnvPlaceholder: {
    id: "jobBuilder.workEnv.moreOnWorkEnvPlaceholder",
    defaultMessage: "Try for a casual, frank, friendly tone.",
    description:
      "The placeholder displayed for the more about your environment textbox.",
  },
  culture: {
    id: "jobBuilder.workEnv.culture",
    defaultMessage: "Our Culture",
    description: "Section 2 radio group title of our culture step.",
  },
  cultureSubtext2: {
    id: "jobBuilder.workEnv.cultureSubtext2",
    defaultMessage:
      "Based on your selections, we'll create a short paragraph summarizing your work culture. You can edit this paragraph to customize it to your team.",
    description: "Subtext 2 displayed of the our culture section.",
  },
  fastPacedSteadyLabel: {
    id: "jobBuilder.workEnv.fastPacedSteadyLabel",
    defaultMessage: "Fast-paced vs. Steady:",
    description: "The label for the fast-paced vs. steady radio group",
  },
  managementLabel: {
    id: "jobBuilder.workEnv.managementLabel",
    defaultMessage: "Horizontal vs. Vertical:",
    description: "The label for the management radio group",
  },
  experimentalLabel: {
    id: "jobBuilder.workEnv.experimentalLabel",
    defaultMessage: "Experimental vs. Ongoing Business:",
    description: "The label for the experimental radio group",
  },
  facingLabel: {
    id: "jobBuilder.workEnv.facingLabel",
    defaultMessage: "Citizen Facing vs. Back Office:",
    description: "The label for the facing radio group",
  },
  collaborativeLabel: {
    id: "jobBuilder.workEnv.collaborativeLabel",
    defaultMessage: "Collaborative vs. Independent:",
    description: 'The label for the "collaborative vs independent" radio group',
  },
  cultureSummary: {
    id: "jobBuilder.workEnv.cultureSummary",
    defaultMessage: "Culture Summary",
    description: "The header for the culture summary section.",
  },
  cultureSummarySubtext: {
    id: "jobBuilder.workEnv.cultureSummarySubtext",
    defaultMessage:
      "Here is the short paragraph summarizing your work culture which will appear on the job poster. Copy and paste it into the text box below if you want to customize it to the personality of your team and the way you work.",
    description: "The subtext for the culture summary section.",
  },
  customCultureSummaryLabel: {
    id: "jobBuilder.workEnv.customCultureSummaryLabel",
    defaultMessage: "Customize your culture summary:",
    description: "The label for the custom culture summary textbox.",
  },
  customCultureSummaryPlaceholder: {
    id: "jobBuilder.workEnv.customCultureSummaryPlaceholder",
    defaultMessage: "Paste here to edit the paragraph.",
    description: "The placeholder for the custom culture summary textbox.",
  },
  specialWorkCulture: {
    id: "jobBuilder.workEnv.specialWorkCulture",
    defaultMessage: "Anything Special About Your Work Culture?",
    description: "Title for subsection in our work culture.",
  },
  specialWorkCultureSubtext: {
    id: "jobBuilder.workEnv.specialWorkCultureSubtext",
    defaultMessage:
      "Does your team care a lot about something else? Proud of the team's record of getting results? Strong commitment to mental wellness? Actively involved in advancing diversity and inclusion? LGBTQ+ champions? Here's a chance to let applicants know about the culture of the team they'll potentially be joining.",
    description: "Subtext for subsection in our work culture.",
  },
  specialWorkCultureLabel: {
    id: "jobBuilder.workEnv.specialWorkCultureLabel",
    defaultMessage: "More About Your Work Culture",
    description: "The label for the 'more on work culture' textarea.",
  },
  textAreaPlaceholder1: {
    id: "jobBuilder.workEnv.textAreaPlaceholder1",
    defaultMessage: "Try for a casual, frank, friendly tone.",
    description: "Default placeholder for textarea element",
  },
  thisIsOptional: {
    id: "jobBuilder.workEnv.thisIsOptional",
    defaultMessage: "This is optional.",
    description: "Text indicator for optional sections within form.",
  },
});

export const culturePaceMessages = defineMessages({
  pace01Title: {
    id: "jobBuilder.culturePace.01.title",
    defaultMessage: "Very Fast-paced",
  },
  pace01Description: {
    id: "jobBuilder.culturePace.01.description",
    defaultMessage:
      "Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
  },
  pace02Title: {
    id: "jobBuilder.culturePace.02.title",
    defaultMessage: "Fast-paced",
  },
  pace02Description: {
    id: "jobBuilder.culturePace.02.description",
    defaultMessage:
      "Our deadlines are usually close together, we balance some tasks at the same time, and our priorities change regularly. Our work keeps us on our toes!",
  },
  pace03Title: {
    id: "jobBuilder.culturePace.03.title",
    defaultMessage: "Steady",
  },
  pace03Description: {
    id: "jobBuilder.culturePace.03.description",
    defaultMessage:
      "Our deadlines are regular and predictable, we balance a couple of tasks at a time, and our priorities change occasionally. We keep things on an even keel.",
  },
  pace04Title: {
    id: "jobBuilder.culturePace.04.title",
    defaultMessage: "Very Steady",
  },
  pace04Description: {
    id: "jobBuilder.culturePace.04.description",
    defaultMessage:
      "Our work is ongoing so there aren't very many deadlines. We don't usually have to balance tasks and our priorities change rarely. We thrive on routine.",
  },
});

export const mgmtStyleMessages = defineMessages({
  style01Title: {
    id: "jobBuilder.mgmtStyle.01.title",
    defaultMessage: "Horizontal",
  },
  style01Description: {
    id: "jobBuilder.mgmtStyle.01.description",
    defaultMessage:
      "There's no middle management here, so we make most big decisions ourselves and you can expect to interact regularly with our executives.",
  },
  style02Title: {
    id: "jobBuilder.mgmtStyle.02.title",
    defaultMessage: "Somewhat Horizontal",
  },
  style02Description: {
    id: "jobBuilder.mgmtStyle.02.description",
    defaultMessage:
      "We have some middle management here but make most day-to-day decisions ourselves. Don't be surprised to interact fairly often with our executives.",
  },
  style03Title: {
    id: "jobBuilder.mgmtStyle.03.title",
    defaultMessage: "Somewhat Vertical",
  },
  style03Description: {
    id: "jobBuilder.mgmtStyle.03.description",
    defaultMessage:
      "Our team has a clearly defined role. We check in regularly with middle-management for approvals and updates on the strategic vision of our executives.",
  },
  style04Title: {
    id: "jobBuilder.mgmtStyle.04.title",
    defaultMessage: "Vertical",
  },
  style04Description: {
    id: "jobBuilder.mgmtStyle.04.description",
    defaultMessage:
      "Our team has a clearly defined role. We check in often with middle-management for approvals and updates on the strategic vision of our executives.",
  },
});

export const experimentalMessages = defineMessages({
  experimental01Title: {
    id: "jobBuilder.experimental.01.title",
    defaultMessage: "Experimental",
  },
  experimental01Description: {
    id: "jobBuilder.experimental.01.description",
    defaultMessage:
      "Our work is defined by trying out brand new ideas, methods, and activities to address persistent problems that traditional approaches have failed to solve.",
  },
  experimental02Title: {
    id: "jobBuilder.experimental.02.title",
    defaultMessage: "Somewhat Experimental",
  },
  experimental02Description: {
    id: "jobBuilder.experimental.02.description",
    defaultMessage:
      "We try out new and proven ideas, methods, and activities to improve how we do our work.",
  },
  experimental03Title: {
    id: "jobBuilder.experimental.03.title",
    defaultMessage: "Somewhat Predictable Work",
  },
  experimental03Description: {
    id: "jobBuilder.experimental.03.description",
    defaultMessage:
      "Our work includes some administrative tasks are repeated on a regular basis. The tools we use work well for us but we are open to improving our processes.",
  },
  experimental04Title: {
    id: "jobBuilder.experimental.04.title",
    defaultMessage: "Predictable Work",
  },
  experimental04Description: {
    id: "jobBuilder.experimental.04.description",
    defaultMessage:
      "Most of our work involves administrative tasks are repeated on a regular basis. Consistency is key here, so we follow a standard process with tried and true tools.",
  },
});

export const facingMessages = defineMessages({
  facing01Title: {
    id: "jobBuilder.facing.01.title",
    defaultMessage: "Citizen Facing",
  },
  facing01Description: {
    id: "jobBuilder.facing.01.description",
    defaultMessage:
      "We are the face of the service we deliver and spend most of our time engaging directly with the public.",
  },
  facing02Title: {
    id: "jobBuilder.facing.02.title",
    defaultMessage: "Mostly Citizen Facing",
  },
  facing02Description: {
    id: "jobBuilder.facing.02.description",
    defaultMessage:
      "We spend a lot of our time engaging directly with the public, but there is also behind the scenes work to support others.",
  },
  facing03Title: {
    id: "jobBuilder.facing.03.title",
    defaultMessage: "Mostly Back Office",
  },
  facing03Description: {
    id: "jobBuilder.facing.03.description",
    defaultMessage:
      "We usually work behind the scenes doing important work that makes service delivery possible.",
  },
  facing04Title: {
    id: "jobBuilder.facing.04.title",
    defaultMessage: "Back Office",
  },
  facing04Description: {
    id: "jobBuilder.facing.04.description",
    defaultMessage:
      "We work behind the scenes doing important work that makes service delivery possible. We thrive on supporting others.",
  },
});

export const collaborativenessMessages = defineMessages({
  collaborativeness01Title: {
    id: "jobBuilder.collaborativeness.01.title",
    defaultMessage: "Collaborative",
  },
  collaborativeness01Description: {
    id: "jobBuilder.collaborativeness.01.description",
    defaultMessage:
      "Our team has diverse backgrounds, viewpoints, and skills and we play to each others strengths. We collectively own the team's goals and are always looking for ways to pitch in.",
  },
  collaborativeness02Title: {
    id: "jobBuilder.collaborativeness.02.title",
    defaultMessage: "Somewhat Collaborative",
  },
  collaborativeness02Description: {
    id: "jobBuilder.collaborativeness.02.description",
    defaultMessage:
      "Our team has a diverse set of skills and we recognize each others strengths. We work together often and are quick to pitch in when someone asks for help.",
  },
  collaborativeness03Title: {
    id: "jobBuilder.collaborativeness.03.title",
    defaultMessage: "Somewhat Independent",
  },
  collaborativeness03Description: {
    id: "jobBuilder.collaborativeness.03.description",
    defaultMessage:
      "Members of our team own their piece of the puzzle and have some freedom to choose how they get their work done.",
  },
  collaborativeness04Title: {
    id: "jobBuilder.collaborativeness.04.title",
    defaultMessage: "Independent",
  },
  collaborativeness04Description: {
    id: "jobBuilder.collaborativeness.04.description",
    defaultMessage:
      "Members of our team own their piece of the puzzle. It doesn't really matter how we get our work done as long as it's high quality.",
  },
});

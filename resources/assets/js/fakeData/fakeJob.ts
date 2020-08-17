/* eslint-disable @typescript-eslint/camelcase */
import {
  Job,
  Criteria,
  JobPosterKeyTask,
  JobPosterQuestion,
  JobApplicationAnswer,
} from "../models/types";

export const fakeJob = (id = 1): Job => ({
  id,
  manager_id: 1,
  chosen_lang: "en",
  term_qty: 12,
  open_date_time: new Date("2019-05-20T07:00:00"),
  close_date_time: new Date("2019-05-30T06:59:59"),
  start_date_time: new Date("2019-07-01T07:00:00"),
  created_at: new Date("2019-04-20T07:00:00"),
  job_poster_status_id: 1,
  department_id: 1,
  province_id: 4,
  salary_min: 85000,
  salary_max: 100000,
  noc: 1234,
  classification_id: 1,
  classification_level: 4,
  security_clearance_id: 1,
  language_requirement_id: 1,
  remote_work_allowed: true,
  team_size: 15,
  work_env_features: {
    openConcept: true,
    private: false,
    assignedSeating: false,
    windows: true,
    naturalLight: true,
    smudging: true,

    videoConferencing: true,
    collaboration: false,
    fileSharing: false,
    taskManagement: false,
    versionControl: true,
    accessToExternal: true,

    cafeteria: false,
    closeToTransit: true,
    restaurants: false,
    downtown: true,
    fitnessCenter: false,
    parking: false,
  },
  fast_vs_steady: 1,
  horizontal_vs_vertical: 2,
  experimental_vs_ongoing: 3,
  citizen_facing_vs_back_office: 4,
  collaborative_vs_independent: 3,
  telework_allowed_frequency_id: 1,
  flexible_hours_frequency_id: 2,
  travel_requirement_id: 1,
  overtime_requirement_id: 1,
  city: {
    en: "Toronto",
    fr: "Toronto",
  },
  title: {
    en: "Technical Advisor",
    fr: "Conseiller(ère) technique",
  },
  dept_impact: {
    en:
      "This is a statement about all the great things you will do in this department.",
    fr:
      "Ceci est une déclaration sur toutes les grandes choses que vous ferez dans ce département.",
  },
  team_impact: {
    en:
      "Internally, our primary goal is to optimize and build applications to best support our clients and ensure we are able to leverage the most of latest technologies. At the government-wide level, we want to be a model that demonstrates that privacy considerations are not an obstacle to technological progress.",
    fr:
      "À l’interne, notre but premier est d’optimiser et bâtir les applications de manière à supporter le mieux possible nos clients et de s’assurer d’être en mesure de tirer parti du meilleur des dernières technologies. À l’échelle du gouvernement, nous désirons être un modèle prouvant que les considérations liées à vie privée ne sont pas un obstacle au progrès technologique.",
  },
  hire_impact: {
    en:
      "As a senior team member, you will be an important pillar in our movement to the cloud, especially with our case management system; Dynamics 365. Your knowledge, insights and analytical skills will be key elements in helping to build an optimal platform to support the Office’s future vision.",
    fr:
      "En tant que membre senior de l’équipe, vous serez un pilier important dans notre mouvement vers le cloud, surtout en ce qui a trait à notre système de gestion de cas; Dynamics 365. Vos connaissances, vos idées et vos capacités d’analyse seront des éléments clés qui contribueront à mettre en place une plateforme optimale supportant la vision future du commissariat.",
  },
  division: {
    en: "suscipit",
    fr: "minima",
  },
  education: {
    en:
      "A secondary school diploma; or \n \n Equivalent Experience: \n If you have on-the-job learning or other non-conventional training that you believe is equivalent to the secondary school diploma, put it forward for consideration. The manager may accept a combination of education, training and/or experience in a related field as an alternative to the minimum education requirement stated above.",
    fr: "Ut odit inventore incidunt.",
  },
  work_env_description: {
    en:
      "Our office also has a couch that is so comfortable it must be hidden from view.",
    fr:
      "Notre bureau dispose également d’un canapé si confortable qu’il doit être caché de la vue.",
  },
  culture_summary: {
    en:
      "Our deadlines are tight, we balance several tasks at the same time, and our priorities are always changing. Our work should come with running shoes!",
    fr:
      "Nos délais sont serrés, nous équilibrons plusieurs tâches en même temps et nos priorités changent constamment. Notre travail devrait venir avec des chaussures de course!",
  },
  culture_special: {
    en: "We're also a very informal, irreverent group.",
    fr: "Nous sommes également un groupe très informel et irrévérencieux.",
  },
});

export const fakeJob2 = (id = 1): Job => ({
  id,
  manager_id: 1,
  chosen_lang: "fr",
  term_qty: 18,
  open_date_time: new Date("2019-05-01T07:00:00"),
  close_date_time: new Date("2019-05-15T06:59:59"),
  start_date_time: new Date("2019-08-01T07:00:00"),
  created_at: new Date("2019-04-25T07:00:00"),
  department_id: 2,
  job_poster_status_id: 2,
  province_id: 1,
  salary_min: 95000,
  salary_max: 110000,
  noc: 1234,
  classification_id: 4,
  classification_level: 3,
  security_clearance_id: 1,
  language_requirement_id: 1,
  remote_work_allowed: true,
  team_size: 40,
  work_env_features: {
    env_open_concept: false,
    env_windows: true,
    amenities_near_transit: false,
    amenities_cafeteria: true,
  },
  fast_vs_steady: 3,
  horizontal_vs_vertical: 4,
  experimental_vs_ongoing: 2,
  citizen_facing_vs_back_office: 1,
  collaborative_vs_independent: 2,
  telework_allowed_frequency_id: 3,
  flexible_hours_frequency_id: 1,
  travel_requirement_id: 1,
  overtime_requirement_id: 1,
  city: {
    en: "Ottawa",
    fr: "Ottawa",
  },
  title: {
    en: "UX Designer",
    fr: "UX Designer",
  },
  dept_impact: {
    en:
      "This is a statement about all the great things you will do in this department.",
    fr:
      "FRENCH: This is a statement about all the great things you will do in this department.",
  },
  team_impact: {
    en:
      "A in excepturi dolorem impedit. Expedita et nihil provident quo soluta neque. Odio et ut nostrum aut. Tenetur odit expedita molestias asperiores qui repudiandae eveniet.",
    fr:
      "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
  },
  hire_impact: {
    en:
      "Aliquam aspernatur possimus est harum in explicabo et ut. Sint iure quaerat impedit et et. Ut dolorum assumenda repellat ducimus itaque.",
    fr:
      "Nulla enim dignissimos ea saepe totam. Deserunt quod deserunt et sed qui nesciunt illo eaque.\n\nVeniam laudantium ab illo. In in et et voluptatem excepturi. Nesciunt deleniti qui vero magni sunt earum rerum.",
  },
  division: {
    en: "",
    fr: "",
  },
  education: {
    en:
      "A secondary school diploma; or \n \n Equivalent Experience: \n If you have on-the-job learning or other non-conventional training that you believe is equivalent to the secondary school diploma, put it forward for consideration. The manager may accept a combination of education, training and/or experience in a related field as an alternative to the minimum education requirement stated above.",
    fr: "Ut odit inventore incidunt.",
  },
  work_env_description: {
    en: "You may be able to pick your own office, if you work remotely.",
    fr: "FR You may be able to pick your own office, if you work remotely.",
  },
  culture_summary: {
    en:
      "Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine.",
    fr:
      "FR Our work is ongoing so there aren’t very many deadlines. We don’t usually have to balance tasks and our priorities change rarely. We thrive on routine.",
  },
  culture_special: {
    en: null,
    fr: null,
  },
});

export const fakeCriterion = (id = 1, jobId = 1): Criteria => ({
  id,
  criteria_type_id: 1,
  job_poster_id: jobId,
  skill_id: 1,
  skill_level_id: 1,
  description: {
    en: "This is the description of skill 1.",
    fr: "Ceci est la description de la compétence 1.",
  },
  specificity: {
    en: "This text is specific to criteria 1",
    fr: "Ce texte est spécifique aux critères 1",
  },
});

export const fakeJobTasks = (jobId = 1): JobPosterKeyTask[] => [
  {
    id: 1,
    job_poster_id: jobId,
    description: {
      en:
        "Consult broadly and recruit executive leadership in digital and technology for federal organizations (e.g., C-Suite level positions like Chief Information Officers, Chief Digital Officers, Chief Technology Officers, and their deputies).",
      fr:
        "Consultez de manière large et recrutez des dirigeants de haut niveau dans les domaines du numérique et de la technologie pour les organisations fédérales (par exemple, des postes de niveau C-Suite tels que directeurs des systèmes d'information, directeurs des technologies numériques, directeurs des technologies et leurs adjoints).",
    },
  },
  {
    id: 2,
    job_poster_id: jobId,
    description: {
      en:
        "Connect partner organizations (departments, agencies) with top talent (i.e., high-performing executives) with an interest and the potential to assume technology leadership roles.",
      fr:
        "Reliez les organisations partenaires (ministères, agences) avec les meilleurs talents (c'est-à-dire des cadres très performants) ayant un intérêt et le potentiel pour assumer des rôles de leadership technologique.",
    },
  },
  {
    id: 3,
    job_poster_id: jobId,
    description: {
      en:
        "Identify and attract exceptional executive candidates, including those who haven’t considered government as an option before.",
      fr:
        "Identifiez et attirez des candidats exceptionnels, y compris ceux qui n’ont jamais envisagé de gouvernement.",
    },
  },
  {
    id: 4,
    job_poster_id: jobId,
    description: {
      en:
        "Build a diverse pipeline of candidates and strong partnerships with government departments. This means proactively going out and building a network and strong relationships with senior level external talent (CIOs and similar senior-level positions) across Canada, as well as with senior leaders in departments and agencies who have vacant positions.",
      fr:
        "Construire un portefeuille diversifié de candidats et des partenariats solides avec les ministères. Cela signifie créer de manière proactive un réseau et des relations étroites avec les talents externes de niveau supérieur (DSI et autres postes de niveau supérieur similaires) partout au Canada, ainsi qu'avec les cadres supérieurs des ministères et des agences ayant des postes vacants.",
    },
  },
  {
    id: 5,
    job_poster_id: jobId,
    description: {
      en:
        "Take a human-centered approach to recruitment by understanding users’ needs (hiring executives and candidates) to deliver exceptional user experience.",
      fr:
        "Adoptez une approche de recrutement centrée sur l'humain en comprenant les besoins des utilisateurs (embauche de dirigeants et de candidats) afin de fournir une expérience utilisateur exceptionnelle.",
    },
  },
  {
    id: 6,
    job_poster_id: jobId,
    description: {
      en:
        "Work creatively using a broad array of traditional and social media approaches.",
      fr:
        "Travaillez de manière créative en utilisant un large éventail d'approches traditionnelles et de médias sociaux.",
    },
  },
  {
    id: 7,
    job_poster_id: jobId,
    description: {
      en: "This is an example of a task that has exceeded the limit.",
      fr: "Voici un exemple de tâche ayant dépassé la limite.",
    },
  },
  {
    id: 8,
    job_poster_id: jobId,
    description: {
      en: "This is an example of a task that has exceeded the limit.",
      fr: "Voici un exemple de tâche ayant dépassé la limite.",
    },
  },
];

export const fakeJobQuestions = (jobId = 1): JobPosterQuestion[] => [
  {
    id: 1,
    job_poster_id: jobId,
    description: {
      en: "Describe why you are interested in this job.",
      fr: "Décrivez pourquoi vous êtes intéressé par cet emploi.",
    },
    question: {
      en: "Why are you interested in this job?",
      fr: "Pourquoi êtes-vous intéressé par cet emploi ?",
    },
  },
  {
    id: 2,
    job_poster_id: jobId,
    description: {
      en: "e.g. I have a few other skills...",
      fr: "e.g. j'ai quelques autres compétences...",
    },
    question: {
      en:
        "Are there any other skills that you bring to the job that you want to highlight to the manager?",
      fr:
        "Y a-t-il d'autres compétences que vous apportez à l'emploi et que vous souhaitez mettre en valeur auprès du responsable ?",
    },
  },
  {
    id: 3,
    job_poster_id: jobId,
    description: {
      en: "e.g. I have a few other skills...",
      fr: "e.g. j'ai quelques autres compétences...",
    },
    question: {
      en:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi exercitationem ipsa distinctio dolore in iure? Nisi ratione architecto velit quos.?",
      fr:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi exercitationem ipsa distinctio dolore in iure? Nisi ratione architecto velit quos. ?",
    },
  },
];

export const fakeJobApplicationAnswers = (
  jobApplicationId = 1,
): JobApplicationAnswer[] => [
  {
    id: 1,
    job_application_id: jobApplicationId,
    job_poster_questions_id: 1,
    answer: "Here is my answer.",
  },
  {
    id: 2,
    job_application_id: jobApplicationId,
    job_poster_questions_id: 2,
    answer: "Please read my answers and see that I am an excellent candidate.",
  },
  {
    id: 3,
    job_application_id: jobApplicationId,
    job_poster_questions_id: 3,
    answer: "Je pourrais ecrire ce reponse en francais si je vourrais.",
  },
];

export default fakeJob;

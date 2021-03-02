import { Classification } from "../models/types";

export const fakeClassification1 = (): Classification => ({
  id: 5,
  key: "CS",
  name: {
    en: "CS - Computer Systems",
    fr: "CS - Systèmes d’ordinateurs",
  },
  education_requirements: {
    en:
      "2 years post-secondary, or equivalent:\nSuccessful completion of two years of post-secondary education in computer science, information technology, information management or another specialty relevant to this position.\n\nor\n\nEquivalent experience:\nIf you have on-the-job learning or other non-conventional training that you believe is equivalent to the 2 year post-secondary requirement, put it forward for consideration. The manager may accept a combination of education, training and/or experience in a related field as an alternative to the minimum post-secondary education stated above.",
    fr:
      "Deux (2) ans d’études postsecondaires ou l’équivalent:\nDeux années d’études postsecondaires en informatique, en technologie de l’information, en gestion de l’information ou dans une autre spécialité pertinente à ce poste.\n\nou\n\nExpérience équivalente:\nSi vous avez reçu une formation en cours d’emploi ou une autre formation non traditionnelle que vous croyez équivalente aux deux années d’études postsecondaires requises, faites-en état afin qu’on en tienne compte. Le gestionnaire pourrait accepter une combinaison d’études, de formation et/ou d’expérience dans un domaine pertinent comme étant équivalente au niveau minimal d’études postsecondaires énoncé ci-dessus.",
  },
});

export const fakeClassification2 = (): Classification => ({
  id: 7,
  key: "EX",
  name: {
    en: "EX - Executive",
    fr: "EX - Direction",
  },
  education_requirements: {
    en:
      "Post-secondary degree, or equivalent:\nPost-secondary degree, or eligibility for a recognized professional designation in one of the provinces or territories of Canada.\n\nor\n\nEquivalent experience:\nIf you have on-the-job learning or other non-conventional training that you believe is equivalent to the post-secondary degree requirement, put it forward for consideration. The manager may accept a combination of education, training and/or experience in a related field as an alternative to the minimum post-secondary education stated above.",
    fr:
      "Diplôme d’études postsecondaires ou l’équivalent:\nDiplôme d’études postsecondaires, ou admissibilité à un titre professionnel reconnu dans une province ou un territoire du Canada.\n\nou\n\nExpérience équivalente:\nSi vous avez reçu une formation en cours d’emploi ou une autre formation non traditionnelle que vous croyez équivalente à l’exigence relative au diplôme d’études postsecondaires, indiquez-le aux fins d’examen. Le gestionnaire pourrait accepter une combinaison d’études, de formation et/ou d’expérience dans un domaine pertinent comme étant équivalente au niveau minimal d’études postsecondaires énoncé ci-dessus.",
  },
});

export const fakeClassification3 = (): Classification => ({
  id: 9,
  key: "IS",
  name: {
    en: "IS - Information Services",
    fr: "IS - Services d’information",
  },
  education_requirements: {
    en:
      "Post-secondary degree, or equivalent:\nSuccessful completion of a post-secondary degree.\n\nor\n\nEquivalent experience:\nIf you have on-the-job learning or other non-conventional training that you believe is equivalent to the post-secondary degree requirement, put it forward for consideration. The manager may accept a combination of education, training and/or experience in a related field as an alternative to the minimum post-secondary education stated above.",
    fr:
      "Diplôme d’études postsecondaires ou l’équivalent:\nDiplôme d’études postsecondaires.\n\nou\n\nExpérience équivalente:\nSi vous avez reçu une formation en cours d’emploi ou une autre formation non traditionnelle que vous croyez équivalente à l’exigence relative au diplôme d’études postsecondaires, indiquez-le aux fins d’examen. Le gestionnaire pourrait accepter une combinaison d’études, de formation et/ou d’expérience dans un domaine pertinent comme étant équivalente au niveau minimal d’études postsecondaires énoncé ci-dessus.",
  },
});

export const fakeClassification4 = (): Classification => ({
  id: 10,
  key: "PC",
  name: {
    en: "PC - Physical Sciences",
    fr: "PC - Sciences physiques",
  },
  education_requirements: {
    en:
      "Post-secondary degree:\nSuccessful completion of a post-secondary degree with specialization in physics, geology, chemistry or some other science relevant to the position.",
    fr:
      "Diplôme d’études postsecondaires:\nDiplôme d’études postsecondaires, avec spécialisation en physique, en géologie, en chimie ou dans une autre science liée aux fonctions du poste.",
  },
});

export const fakeClassifications = (): Classification[] => [
  fakeClassification1(),
  fakeClassification2(),
  fakeClassification3(),
  fakeClassification4(),
];

export default fakeClassifications;

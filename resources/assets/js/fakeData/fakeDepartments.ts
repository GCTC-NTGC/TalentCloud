import { Department } from "../models/types";

export const fakeDept1 = (): Department => ({
  id: 1,
  en: {
    name: "Treasury Board of Canada Secretariat",
    impact:
      "The Treasury Board of Canada Secretariat provides advice and makes recommendations on how the government spends money, how it regulates and how it is managed ensuring tax dollars are spent wisely and effectively for Canadians.",
  },
  fr: {
    name: "Secr\u00e9tariat du Conseil du Tr\u00e9sor du Canada",
    impact:
      "Le Secr\u00e9tariat du Conseil du Tr\u00e9sor du Canada fournit des conseils et des recommandations sur la fa\u00e7on dont le gouvernement investit dans les programmes et les services, ainsi que sur la fa\u00e7on dont il en assure la r\u00e9glementation et la gestion pour faire en sorte que l'argent des contribuables soit utilis\u00e9 de mani\u00e8re judicieuse et efficace pour les Canadiens.",
  },
});

export const fakeDept2 = (): Department => ({
  id: 2,
  en: {
    name: "Natural Resources Canada",
    impact:
      "Natural Resources Canada seeks to enhance the responsible development and use of Canada's natural resources and the competitiveness of Canada's natural resources products.",
  },
  fr: {
    name: "Ressources naturelles Canada",
    impact:
      "Ressources naturelles Canada cherche à renforcer le développement et l'utilisation responsables des ressources naturelles du Canada et la compétitivité des produits tirés des ressources naturelles du pays.",
  },
});

export const fakeDepartments = (): Department[] => [fakeDept1(), fakeDept2()];

export default fakeDepartments;

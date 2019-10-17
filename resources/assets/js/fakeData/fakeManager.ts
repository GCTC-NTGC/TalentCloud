/* eslint-disable @typescript-eslint/camelcase */
import { Manager } from "../models/types";

export const fakeManager = (id = 1, user_id = 1): Manager => ({
  id,
  user_id,
  first_name: "Gray",
  last_name: "O'Byrne",
  department_id: 1,
  twitter_username: null,
  linkedin_url: null,
  en: {
    division: "Talent Cloud",
    position: "Product Owner",
    leadership_style:
      "My goal as a manager is to make sure you have everything you need so you can be as happy and productive as possible. The important part is caring about the people you work with… after that the rest just seems to flow naturally.",
    expectations:
      "Respect everyone else's uniqueness but don't be afraid to speak up. Work hard and manage your own time.",
    employee_learning:
      "I like to see people constantly challenging themselves and prioritize continuous learning quite highly. I find most learning happens on the job when we deliberately find ways to work with the awesome people around us. If courses, conferences or similar are your idea of learning, don't worry we can arrange for some of that too.",
    career_journey:
      "After a short stint in the private sector, I joined government and have been working in a variety of roles since. I started out as a scientist but rapidly got pulled into web development and business transformation. Most recently I've set up a team of developers and designers to build something novel and I'm doing my very best to shield them all from the bureaucracy.",
    learning_path:
      "I did Physics back in school, but honestly I find learning on the job way more fun than academia. These days, my main learning path is to work with people who are better than me and absorb as much as I can. I also do a fair share of throwing myself at new problems I know little about. It often leads to uncomfortable situations… but is great for learning.",
    about_me:
      "I like games of pretty much any short, including sports, video games and table-top. In my free time I listen to podcasts about electric cars, science and skepticism. I'm also very lucky to share a home with my wife and son (soon to add a second!)",
  },
  fr: {
    division: "Nuage de Talents",
    position: "Propriétaire du produit",
    leadership_style:
      "Mon objectif, à titre de gestionnaire, est de veiller à ce que vous ayez tout ce dont vous avez besoin pour être aussi heureux(-se) et productif(-ve) que possible. Ce qui est important, c'est de se soucier des gens avec qui on travaille… après quoi, le reste semble aller de soi.",
    expectations:
      "Qu'ils respectent le caractère unique des autres et qu'ils n'aient pas peur de dire ce qu'ils pensent. Qu'ils travaillent fort et qu'ils gèrent leur propre temps.",
    employee_learning:
      "J'aime voir les gens se lancer constamment des défis et accorder une grande priorité à l'apprentissage continu. À mon avis, la plupart des apprentissages se font au travail lorsque nous trouvons délibérément des façons de travailler avec les gens extraordinaires qui nous entourent. Si, pour vous, l'idée de l'apprentissage passe par des cours, des conférences ou d'autres activités semblables, ne vous en faites pas, nous pouvons également organiser ces types d'activités.",
    career_journey:
      "Après un bref passage dans le secteur privé, je me suis joint au gouvernement et j'ai assumé différents rôles. J'ai commencé à titre de scientifique, mais j'ai rapidement été entraîné dans le développement Web et la transformation des activités. Plus récemment, j'ai mis sur pied une équipe de développeurs et de concepteurs dans le but de construire quelque chose de nouveau et je fais de mon mieux pour la protéger contre la bureaucratie.",
    learning_path:
      "À l'école, j'ai étudié la physique, mais honnêtement, je trouve que l'apprentissage au travail est beaucoup plus amusant que celui que l'on fait dans un milieu universitaire. De nos jours, ma principale voie d'apprentissage est de travailler avec des personnes plus compétentes que moi, ce qui me permet d'absorber le plus de connaissances possible. Je me lance aussi souvent vers de nouveaux problèmes que je connais peu. Cela me mène souvent dans des situations inconfortables, mais c'est fort instructif!",
    about_me:
      "J'aime presque tous les jeux, y compris les sports, les jeux vidéo et les jeux de table. Dans mes temps libres, j'écoute des balados sur les voitures électriques, la science et le scepticisme. J'ai aussi l'énorme chance de partager une maison avec ma femme et mon fils (et bientôt, un deuxième enfant!).",
  },
});

export default { fakeManager };

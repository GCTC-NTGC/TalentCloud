/* eslint-disable @typescript-eslint/camelcase */
import moment from "moment";
import { parseJobResponse } from "./job";

describe("api/job", (): void => {
  describe("parseJobResponse()", (): void => {
    const jobResponse = () => ({
      id: 13,
      job_term_id: 2,
      term_qty: 1,
      open_date_time: "2019-05-17T07:00:00+00:00",
      close_date_time: "2019-06-01T06:59:59+00:00",
      start_date_time: "2019-06-08T07:00:00+00:00",
      department_id: 6,
      province_id: 6,
      salary_min: 79416,
      salary_max: 87467,
      noc: 5378,
      classification: "WS-01",
      security_clearance_id: 3,
      language_requirement_id: 3,
      manager_id: 1,
      created_at: "2019-05-08T14:15:04+00:00",
      updated_at: "2019-05-08T14:15:04+00:00",
      published: false,
      remote_work_allowed: true,
      review_requested_at: null,
      published_at: null,
      submitted_applications_count: 0,
      city: "East Liashire",
      title: "I hadn't quite dull.",
      hire_impact:
        "Delectus facilis nesciunt aut est distinctio sunt. Sunt minus sed minus quaerat eos.\n\nExcepturi voluptate nesciunt voluptatem et. Facilis occaecati iusto asperiores placeat vel dolores. Delectus magni inventore et eos. Ea ullam recusandae sunt accusantium.",
      branch: "eveniet",
      division: "et",
      education: "Veritatis dolorem soluta doloribus doloribus occaecati.",
      manager: {
        id: 1,
        department_id: 2,
        twitter_username: "Milford",
        linkedin_url:
          "http://www.feeney.com/qui-qui-dolor-iusto-et-est-maiores",
        user_id: 2,
        created_at: "2019-05-08T14:14:57+00:00",
        updated_at: "2019-05-08T14:14:57+00:00",
        work_review_frequency_id: 2,
        stay_late_frequency_id: 1,
        engage_team_frequency_id: 1,
        development_opportunity_frequency_id: 4,
        refuse_low_value_work_frequency_id: 2,
        years_experience: 19,
        about_me:
          "Soluta fugit nisi sit quas ut. Sed omnis mollitia officia illum quae aperiam. Minima fugit velit laboriosam ut quaerat.\n\nIpsa illum ad culpa alias. Sunt similique hic repudiandae. Doloremque et nobis et iure eos praesentium nulla.\n\nQuisquam voluptates error libero repellat ea delectus qui. Ut ut et est consectetur. Id deserunt modi ea consectetur. Reiciendis quo animi consequatur accusantium explicabo nobis non.",
        greatest_accomplishment:
          "Adipisci sint deleniti enim ipsum aliquid. Et reprehenderit distinctio qui qui fugiat dolorem. Saepe delectus ullam praesentium. Tempora quia labore est.\n\nSint labore quisquam aut illo. Sunt id iusto fuga dicta totam aspernatur eum rerum. Dolorum maiores omnis vel eos dolor tempora sed.\n\nDoloremque itaque voluptatem reiciendis dolorum. Ea et beatae et vel assumenda dolor. Autem dolorem consequatur a qui pariatur. Et odio fugiat est explicabo commodi eum.",
        branch: "sed",
        division: "quibusdam",
        position: "ut",
        work_experience: null,
        education:
          "Eius veniam modi expedita rem nam ratione. Repellendus animi quam est amet natus. Corrupti et itaque officiis necessitatibus qui qui.\n\nHic eaque quam nulla quia placeat reprehenderit. Dolor ratione deleniti nobis odit cum. Beatae qui et dolor asperiores.\n\nRepellat ea quos fugit praesentium quidem placeat expedita. Hic unde architecto tenetur officia animi atque ut. Temporibus et facere at voluptatum quia.",
        leadership_style:
          "Qui nam alias voluptas culpa vitae consequatur. Facere voluptatum autem qui sequi nisi. Facere rerum laboriosam qui sunt.\n\nIste non maiores ipsa in ut nobis et. In ut pariatur sit dignissimos qui enim. Aut sequi nulla corrupti accusamus quia illum illo. Distinctio ut ut repudiandae adipisci aut doloribus numquam. Provident consequuntur nobis earum dolores.",
        employee_learning:
          "Minima provident harum ea quo. Fuga vel numquam neque esse ipsa. Officiis veniam qui veritatis incidunt. Eum qui voluptas dolores cum harum hic.\n\nEius ipsum et non voluptatem qui. Qui optio adipisci mollitia. Et sapiente et qui eveniet deleniti est atque. Fugiat aliquam voluptatibus adipisci ex eaque.",
        expectations:
          "Dignissimos voluptatibus earum repellat aut sit corrupti ducimus. Animi maxime accusantium et dolorem voluptates. Omnis occaecati temporibus autem qui consectetur quo quo deleniti.\n\nMinima atque doloremque neque cumque et adipisci excepturi natus. Deleniti praesentium rem pariatur quisquam ab adipisci. Id nihil eligendi magni accusantium omnis maiores natus. Molestiae dolorem minus qui ducimus ut vitae quis.",
        career_journey:
          "Ut tempora ipsa rerum id odit. Ullam laudantium qui quo odit assumenda voluptatem esse consequuntur. Placeat perferendis rerum facere qui rem et id in. Ut quidem ratione eaque suscipit culpa.\n\nSequi necessitatibus id et dolor eveniet dolorem. Exercitationem explicabo tempore necessitatibus voluptas.\n\nNecessitatibus explicabo non perspiciatis est ipsa. Laboriosam atque eos dolorem magnam perferendis sunt atque. Aspernatur molestias nisi et qui.",
        learning_path:
          "Neque earum quaerat error saepe nisi. Aut porro est aut et. Voluptatem et assumenda perferendis ipsa sit. Quis tempora laboriosam natus blanditiis maxime velit. Sit provident enim sint necessitatibus eligendi quidem.\n\nEt accusamus enim et molestiae tenetur voluptate odit. Est nostrum iure magnam omnis ipsam pariatur officiis. Minima qui veritatis non soluta fugit deserunt optio numquam. Sit porro accusamus eos suscipit illo.\n\nItaque et et eum id velit vel. Libero quia voluptatibus autem perspiciatis iusto. Iusto cum omnis vel iste fuga vel.",
        user: {
          id: 2,
          email: "manager@test.com",
          name: "Giles Orn",
          is_confirmed: true,
          user_role_id: 2,
          created_at: "2019-05-08T14:14:56+00:00",
          updated_at: "2019-05-08T14:14:56+00:00",
          is_priority: false,
          user_role: {
            id: 2,
            name: "manager",
            created_at: null,
            updated_at: null,
          },
        },
        translations: [
          {
            id: 2,
            locale: "fr",
            about_me:
              "Et esse provident qui. Commodi beatae explicabo harum impedit qui provident dolorem repudiandae. Et exercitationem quasi dolores deleniti.\n\nQuo dolores qui quia eum non. Et perspiciatis nisi recusandae in voluptatem sunt. Voluptatum facilis dolores tempora. Hic assumenda nam quis quidem sint et consequatur.\n\nAliquam molestias et quis culpa minima eos. Delectus et nam et nulla eligendi. Ea porro quia nostrum. Error distinctio eius nisi unde ut.",
            greatest_accomplishment:
              "Placeat ut sint id architecto voluptatem. Repellat architecto harum temporibus et assumenda possimus.\n\nReiciendis suscipit quia neque laudantium quam placeat. Voluptate quibusdam rem est provident. Et doloribus dolores aperiam aut consequatur aliquid at. Placeat maxime aliquid vero rerum doloribus rerum.\n\nUt sed optio ducimus voluptates consequatur. Quisquam fuga amet quae ut. Consequatur sit quia non qui rerum et laudantium.",
            branch: "dolore",
            division: "omnis",
            position: "qui",
            leadership_style:
              "Voluptatem officia sit vel libero minima sit. Voluptatem itaque minus ut qui ut. Nemo quia qui culpa aut veritatis quia. Molestias distinctio qui ipsa blanditiis ea voluptatibus totam. Minima non qui et aut et nostrum consequatur quidem.\n\nDolore atque natus expedita aut. Explicabo consequuntur fuga error repellendus. Tenetur sed aspernatur modi.",
            employee_learning:
              "Eos exercitationem omnis sed. Omnis iste vitae et ea sequi. Quidem et animi facilis nihil officia. Soluta sunt ex qui ut sit fugit. Non inventore nemo magnam deleniti similique velit.\n\nBeatae harum facere eligendi reiciendis accusantium officia nam. Facilis incidunt enim facilis natus nihil eum. Ullam et molestias quasi molestiae voluptatem.",
            expectations:
              "Ut porro corporis iure facere voluptates minima. Rem veritatis non alias aut expedita eos. Recusandae placeat voluptate cupiditate. In porro ea voluptas dolor quidem.\n\nAperiam beatae et optio eos corporis quae eligendi. Aliquam aut dolor officia laboriosam. Et quia fuga delectus voluptatem soluta ut autem est.",
            manager_id: 1,
            education:
              "Quia natus blanditiis nihil recusandae aut optio. Nulla adipisci rerum reiciendis voluptas ea necessitatibus esse. Velit quasi perferendis ut voluptatem consequatur totam.\n\nEt laborum minima omnis reprehenderit quasi pariatur molestiae. Sed doloribus quis et. Consequatur est odit atque non voluptas quo id tempora.\n\nAt ipsam natus harum asperiores fugit ipsa adipisci. Atque aut ut itaque. Ipsam adipisci voluptas quas perspiciatis itaque similique.",
            created_at: "2019-05-08T14:14:57+00:00",
            updated_at: "2019-05-08T14:14:57+00:00",
            career_journey:
              "Atque sunt repellendus accusamus. Quia magnam eos fugit ratione. Praesentium inventore molestias aut et.\n\nMagnam eligendi voluptates optio similique id ut similique. Est fugiat consequatur possimus qui inventore distinctio explicabo quod. Itaque nemo explicabo aliquam et officia.\n\nQui aut saepe quia. Impedit eum sunt velit quae. Architecto qui vel deleniti.",
            learning_path:
              "Nostrum velit quae nam dolores. Recusandae vero est consequuntur. Voluptatibus quasi nihil nihil exercitationem.\n\nQui in ut magnam quisquam tenetur dolorem. Necessitatibus eos et aspernatur totam et.\n\nAssumenda et facere animi illum. Dolores quidem dolores ut numquam. Quos quaerat sunt voluptatibus beatae ullam. Esse consequatur pariatur ut sunt omnis voluptas.",
          },
          {
            id: 1,
            locale: "en",
            about_me:
              "Soluta fugit nisi sit quas ut. Sed omnis mollitia officia illum quae aperiam. Minima fugit velit laboriosam ut quaerat.\n\nIpsa illum ad culpa alias. Sunt similique hic repudiandae. Doloremque et nobis et iure eos praesentium nulla.\n\nQuisquam voluptates error libero repellat ea delectus qui. Ut ut et est consectetur. Id deserunt modi ea consectetur. Reiciendis quo animi consequatur accusantium explicabo nobis non.",
            greatest_accomplishment:
              "Adipisci sint deleniti enim ipsum aliquid. Et reprehenderit distinctio qui qui fugiat dolorem. Saepe delectus ullam praesentium. Tempora quia labore est.\n\nSint labore quisquam aut illo. Sunt id iusto fuga dicta totam aspernatur eum rerum. Dolorum maiores omnis vel eos dolor tempora sed.\n\nDoloremque itaque voluptatem reiciendis dolorum. Ea et beatae et vel assumenda dolor. Autem dolorem consequatur a qui pariatur. Et odio fugiat est explicabo commodi eum.",
            branch: "sed",
            division: "quibusdam",
            position: "ut",
            leadership_style:
              "Qui nam alias voluptas culpa vitae consequatur. Facere voluptatum autem qui sequi nisi. Facere rerum laboriosam qui sunt.\n\nIste non maiores ipsa in ut nobis et. In ut pariatur sit dignissimos qui enim. Aut sequi nulla corrupti accusamus quia illum illo. Distinctio ut ut repudiandae adipisci aut doloribus numquam. Provident consequuntur nobis earum dolores.",
            employee_learning:
              "Minima provident harum ea quo. Fuga vel numquam neque esse ipsa. Officiis veniam qui veritatis incidunt. Eum qui voluptas dolores cum harum hic.\n\nEius ipsum et non voluptatem qui. Qui optio adipisci mollitia. Et sapiente et qui eveniet deleniti est atque. Fugiat aliquam voluptatibus adipisci ex eaque.",
            expectations:
              "Dignissimos voluptatibus earum repellat aut sit corrupti ducimus. Animi maxime accusantium et dolorem voluptates. Omnis occaecati temporibus autem qui consectetur quo quo deleniti.\n\nMinima atque doloremque neque cumque et adipisci excepturi natus. Deleniti praesentium rem pariatur quisquam ab adipisci. Id nihil eligendi magni accusantium omnis maiores natus. Molestiae dolorem minus qui ducimus ut vitae quis.",
            manager_id: 1,
            education:
              "Eius veniam modi expedita rem nam ratione. Repellendus animi quam est amet natus. Corrupti et itaque officiis necessitatibus qui qui.\n\nHic eaque quam nulla quia placeat reprehenderit. Dolor ratione deleniti nobis odit cum. Beatae qui et dolor asperiores.\n\nRepellat ea quos fugit praesentium quidem placeat expedita. Hic unde architecto tenetur officia animi atque ut. Temporibus et facere at voluptatum quia.",
            created_at: "2019-05-08T14:14:57+00:00",
            updated_at: "2019-05-08T14:14:57+00:00",
            career_journey:
              "Ut tempora ipsa rerum id odit. Ullam laudantium qui quo odit assumenda voluptatem esse consequuntur. Placeat perferendis rerum facere qui rem et id in. Ut quidem ratione eaque suscipit culpa.\n\nSequi necessitatibus id et dolor eveniet dolorem. Exercitationem explicabo tempore necessitatibus voluptas.\n\nNecessitatibus explicabo non perspiciatis est ipsa. Laboriosam atque eos dolorem magnam perferendis sunt atque. Aspernatur molestias nisi et qui.",
            learning_path:
              "Neque earum quaerat error saepe nisi. Aut porro est aut et. Voluptatem et assumenda perferendis ipsa sit. Quis tempora laboriosam natus blanditiis maxime velit. Sit provident enim sint necessitatibus eligendi quidem.\n\nEt accusamus enim et molestiae tenetur voluptate odit. Est nostrum iure magnam omnis ipsam pariatur officiis. Minima qui veritatis non soluta fugit deserunt optio numquam. Sit porro accusamus eos suscipit illo.\n\nItaque et et eum id velit vel. Libero quia voluptatibus autem perspiciatis iusto. Iusto cum omnis vel iste fuga vel.",
          },
        ],
      },
      translations: [
        {
          id: 26,
          job_poster_id: 13,
          locale: "fr",
          city: "West Miloview",
          title: "White Rabbit noticed.",
          hire_impact:
            "Fugiat temporibus provident sed accusantium est tenetur nisi. Qui nesciunt velit necessitatibus quam accusantium. Voluptatum aut sed qui soluta voluptatem.\n\nIpsam facilis aut qui et id eaque architecto. Et nihil aliquam suscipit. Dolor placeat voluptas velit velit laboriosam sed nostrum soluta.",
          branch: "omnis",
          division: "omnis",
          education: "Maiores qui eum repellendus ut quisquam ipsa.",
          created_at: "2019-05-08T14:15:04+00:00",
          updated_at: "2019-05-08T14:15:04+00:00",
        },
        {
          id: 25,
          job_poster_id: 13,
          locale: "en",
          city: "East Liashire",
          title: "I hadn't quite dull.",
          hire_impact:
            "Delectus facilis nesciunt aut est distinctio sunt. Sunt minus sed minus quaerat eos.\n\nExcepturi voluptate nesciunt voluptatem et. Facilis occaecati iusto asperiores placeat vel dolores. Delectus magni inventore et eos. Ea ullam recusandae sunt accusantium.",
          branch: "eveniet",
          division: "et",
          education: "Veritatis dolorem soluta doloribus doloribus occaecati.",
          created_at: "2019-05-08T14:15:04+00:00",
          updated_at: "2019-05-08T14:15:04+00:00",
        },
      ],
      fr: {
        city: "West Miloview",
        title: "White Rabbit noticed.",
        hire_impact:
          "Fugiat temporibus provident sed accusantium est tenetur nisi. Qui nesciunt velit necessitatibus quam accusantium. Voluptatum aut sed qui soluta voluptatem.\n\nIpsam facilis aut qui et id eaque architecto. Et nihil aliquam suscipit. Dolor placeat voluptas velit velit laboriosam sed nostrum soluta.",
        branch: "omnis",
        division: "omnis",
        education: "Maiores qui eum repellendus ut quisquam ipsa.",
      },
      en: {
        city: "East Liashire",
        title: "I hadn't quite dull.",
        hire_impact:
          "Delectus facilis nesciunt aut est distinctio sunt. Sunt minus sed minus quaerat eos.\n\nExcepturi voluptate nesciunt voluptatem et. Facilis occaecati iusto asperiores placeat vel dolores. Delectus magni inventore et eos. Ea ullam recusandae sunt accusantium.",
        branch: "eveniet",
        division: "et",
        education: "Veritatis dolorem soluta doloribus doloribus occaecati.",
      },
      criteria: [
        {
          id: 61,
          criteria_type_id: 2,
          job_poster_id: 13,
          skill_id: 20,
          skill_level_id: 4,
          created_at: "2019-05-08T14:15:04+00:00",
          updated_at: "2019-05-08T14:15:04+00:00",
          description:
            "Sint eum accusamus perspiciatis molestias. Magnam et sint voluptatem neque labore.\n\nPossimus ea velit ratione repellendus. Est vel minus quia. Laboriosam dolorem minus eius repudiandae et autem aut.",
          criteria_type: {
            id: 2,
            name: "asset",
            created_at: null,
            updated_at: null,
            value: "Nice to Have",
            description: "",
            translations: [
              {
                id: 4,
                criteria_type_id: 2,
                locale: "fr",
                value: "Qualifications constituant un atout",
                description: "",
                created_at: null,
                updated_at: null,
              },
              {
                id: 3,
                criteria_type_id: 2,
                locale: "en",
                value: "Nice to Have",
                description: "",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          skill: {
            id: 20,
            skill_type_id: 1,
            created_at: null,
            updated_at: "2019-05-08T14:14:55+00:00",
            name: "Integrity",
            description:
              "Defined as: Treating all those in the work environment with fairness, courtesy and respect for differences; performing the job in a manner that upholds the public trust and values co-workers.",
          },
          skill_level: {
            id: 4,
            name: "expert",
            created_at: null,
            updated_at: null,
            value: "Expert",
            translations: [
              {
                id: 8,
                skill_level_id: 4,
                locale: "fr",
                value: "Expert",
                created_at: null,
                updated_at: null,
              },
              {
                id: 7,
                skill_level_id: 4,
                locale: "en",
                value: "Expert",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          translations: [
            {
              id: 121,
              locale: "en",
              criteria_id: 61,
              description:
                "Sint eum accusamus perspiciatis molestias. Magnam et sint voluptatem neque labore.\n\nPossimus ea velit ratione repellendus. Est vel minus quia. Laboriosam dolorem minus eius repudiandae et autem aut.",
              created_at: "2019-05-08T14:15:04+00:00",
              updated_at: "2019-05-08T14:15:04+00:00",
            },
            {
              id: 122,
              locale: "fr",
              criteria_id: 61,
              description:
                "Quae aut ipsam nam laborum. Et est non sequi est saepe. Voluptates soluta laudantium est excepturi. Suscipit repudiandae deserunt quod aut.\n\nIpsum natus harum laborum suscipit enim impedit. Voluptatem sequi quam quae sunt quam. Dolores vero sint nihil non qui autem consequuntur quam. Dicta deleniti voluptas et vel.",
              created_at: "2019-05-08T14:15:04+00:00",
              updated_at: "2019-05-08T14:15:04+00:00",
            },
          ],
          en: {
            description:
              "Sint eum accusamus perspiciatis molestias. Magnam et sint voluptatem neque labore.\n\nPossimus ea velit ratione repellendus. Est vel minus quia. Laboriosam dolorem minus eius repudiandae et autem aut.",
          },
          fr: {
            description:
              "Quae aut ipsam nam laborum. Et est non sequi est saepe. Voluptates soluta laudantium est excepturi. Suscipit repudiandae deserunt quod aut.\n\nIpsum natus harum laborum suscipit enim impedit. Voluptatem sequi quam quae sunt quam. Dolores vero sint nihil non qui autem consequuntur quam. Dicta deleniti voluptas et vel.",
          },
        },
        {
          id: 62,
          criteria_type_id: 2,
          job_poster_id: 13,
          skill_id: 83,
          skill_level_id: 3,
          created_at: "2019-05-08T14:15:04+00:00",
          updated_at: "2019-05-08T14:15:04+00:00",
          description:
            "Non unde sed occaecati odio nemo ea. Rerum voluptas accusamus enim neque repellendus dolore. Magnam tenetur non aut ut sed alias. Impedit rerum perspiciatis tempore reiciendis saepe asperiores dolor.\n\nDeserunt vel quae nisi suscipit. Commodi nemo a asperiores voluptatem. Sunt cupiditate dolor blanditiis aut quia qui aliquid.",
          criteria_type: {
            id: 2,
            name: "asset",
            created_at: null,
            updated_at: null,
            value: "Nice to Have",
            description: "",
            translations: [
              {
                id: 4,
                criteria_type_id: 2,
                locale: "fr",
                value: "Qualifications constituant un atout",
                description: "",
                created_at: null,
                updated_at: null,
              },
              {
                id: 3,
                criteria_type_id: 2,
                locale: "en",
                value: "Nice to Have",
                description: "",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          skill: {
            id: 83,
            skill_type_id: 2,
            created_at: null,
            updated_at: "2019-05-08T14:14:55+00:00",
            name: "Business analysis",
            description:
              "Defined as: Ability to gather, document, and analyze business needs and requirements, and to investigate problems and opportunities to contribute to determining solutions.",
          },
          skill_level: {
            id: 3,
            name: "advanced",
            created_at: null,
            updated_at: null,
            value: "Advanced",
            translations: [
              {
                id: 6,
                skill_level_id: 3,
                locale: "fr",
                value: "Avanc\u00e9",
                created_at: null,
                updated_at: null,
              },
              {
                id: 5,
                skill_level_id: 3,
                locale: "en",
                value: "Advanced",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          translations: [
            {
              id: 123,
              locale: "en",
              criteria_id: 62,
              description:
                "Non unde sed occaecati odio nemo ea. Rerum voluptas accusamus enim neque repellendus dolore. Magnam tenetur non aut ut sed alias. Impedit rerum perspiciatis tempore reiciendis saepe asperiores dolor.\n\nDeserunt vel quae nisi suscipit. Commodi nemo a asperiores voluptatem. Sunt cupiditate dolor blanditiis aut quia qui aliquid.",
              created_at: "2019-05-08T14:15:04+00:00",
              updated_at: "2019-05-08T14:15:04+00:00",
            },
            {
              id: 124,
              locale: "fr",
              criteria_id: 62,
              description:
                "Consequatur voluptatibus consequatur nobis cumque vitae quia dolorum. Iure molestiae cumque sint quisquam voluptates.\n\nImpedit eaque quibusdam quisquam minus animi omnis aut dolorem. Vel sunt nostrum adipisci eius illum quae. Nam reiciendis non quam tempore repudiandae porro voluptatem.",
              created_at: "2019-05-08T14:15:04+00:00",
              updated_at: "2019-05-08T14:15:04+00:00",
            },
          ],
          en: {
            description:
              "Non unde sed occaecati odio nemo ea. Rerum voluptas accusamus enim neque repellendus dolore. Magnam tenetur non aut ut sed alias. Impedit rerum perspiciatis tempore reiciendis saepe asperiores dolor.\n\nDeserunt vel quae nisi suscipit. Commodi nemo a asperiores voluptatem. Sunt cupiditate dolor blanditiis aut quia qui aliquid.",
          },
          fr: {
            description:
              "Consequatur voluptatibus consequatur nobis cumque vitae quia dolorum. Iure molestiae cumque sint quisquam voluptates.\n\nImpedit eaque quibusdam quisquam minus animi omnis aut dolorem. Vel sunt nostrum adipisci eius illum quae. Nam reiciendis non quam tempore repudiandae porro voluptatem.",
          },
        },
        {
          id: 63,
          criteria_type_id: 1,
          job_poster_id: 13,
          skill_id: 75,
          skill_level_id: 2,
          created_at: "2019-05-08T14:15:04+00:00",
          updated_at: "2019-05-08T14:15:04+00:00",
          description:
            "Iste hic laudantium perferendis deserunt quia eos aperiam. Et deleniti expedita architecto. Quis rerum in molestiae quibusdam. Dolor et et quos fuga deleniti enim.\n\nQui distinctio accusamus eos non a impedit rerum. Quidem magni quae voluptatem sint sed ut nihil. Exercitationem ea eos ut vero numquam sed quia officiis.",
          criteria_type: {
            id: 1,
            name: "essential",
            created_at: null,
            updated_at: null,
            value: "Need to Have",
            description: "",
            translations: [
              {
                id: 2,
                criteria_type_id: 1,
                locale: "fr",
                value: "Qualifications essentielles",
                description: "",
                created_at: null,
                updated_at: null,
              },
              {
                id: 1,
                criteria_type_id: 1,
                locale: "en",
                value: "Need to Have",
                description: "",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          skill: {
            id: 75,
            skill_type_id: 2,
            created_at: null,
            updated_at: "2019-05-08T14:14:55+00:00",
            name: "Quality Assurance",
            description:
              "Defined as: Ability to design a wide range of testing techniques, identify the most effective techniques, data sets and tools to use, and communicate the testing approaches to both technical and non-technical stakeholders.",
          },
          skill_level: {
            id: 2,
            name: "intermediate",
            created_at: null,
            updated_at: null,
            value: "Intermediate",
            translations: [
              {
                id: 4,
                skill_level_id: 2,
                locale: "fr",
                value: "Interm\u00e9diaire",
                created_at: null,
                updated_at: null,
              },
              {
                id: 3,
                skill_level_id: 2,
                locale: "en",
                value: "Intermediate",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          translations: [
            {
              id: 125,
              locale: "en",
              criteria_id: 63,
              description:
                "Iste hic laudantium perferendis deserunt quia eos aperiam. Et deleniti expedita architecto. Quis rerum in molestiae quibusdam. Dolor et et quos fuga deleniti enim.\n\nQui distinctio accusamus eos non a impedit rerum. Quidem magni quae voluptatem sint sed ut nihil. Exercitationem ea eos ut vero numquam sed quia officiis.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
            {
              id: 126,
              locale: "fr",
              criteria_id: 63,
              description:
                "Et quod sed atque est sint et. Laudantium praesentium architecto corrupti dolores nobis saepe et. Excepturi laboriosam ea dignissimos harum occaecati at commodi. Fugit nihil possimus pariatur nulla totam eum aut.\n\nAperiam sapiente quia nostrum dolorem explicabo aut nihil. Quo deserunt ut qui incidunt unde ipsa autem. Cupiditate amet molestiae molestiae nostrum rerum. Tenetur pariatur delectus occaecati dolores.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
          ],
          en: {
            description:
              "Iste hic laudantium perferendis deserunt quia eos aperiam. Et deleniti expedita architecto. Quis rerum in molestiae quibusdam. Dolor et et quos fuga deleniti enim.\n\nQui distinctio accusamus eos non a impedit rerum. Quidem magni quae voluptatem sint sed ut nihil. Exercitationem ea eos ut vero numquam sed quia officiis.",
          },
          fr: {
            description:
              "Et quod sed atque est sint et. Laudantium praesentium architecto corrupti dolores nobis saepe et. Excepturi laboriosam ea dignissimos harum occaecati at commodi. Fugit nihil possimus pariatur nulla totam eum aut.\n\nAperiam sapiente quia nostrum dolorem explicabo aut nihil. Quo deserunt ut qui incidunt unde ipsa autem. Cupiditate amet molestiae molestiae nostrum rerum. Tenetur pariatur delectus occaecati dolores.",
          },
        },
        {
          id: 64,
          criteria_type_id: 2,
          job_poster_id: 13,
          skill_id: 36,
          skill_level_id: 1,
          created_at: "2019-05-08T14:15:05+00:00",
          updated_at: "2019-05-08T14:15:05+00:00",
          description:
            "Occaecati id id quidem. Quas commodi tenetur aut occaecati velit at consequatur. Voluptatibus labore deleniti cumque autem.\n\nAtque veniam ut non sequi eum voluptas sunt neque. Dolorem eos quas voluptas quasi. Quia blanditiis error tempore consequatur labore. Amet optio odit quam dolore id.",
          criteria_type: {
            id: 2,
            name: "asset",
            created_at: null,
            updated_at: null,
            value: "Nice to Have",
            description: "",
            translations: [
              {
                id: 4,
                criteria_type_id: 2,
                locale: "fr",
                value: "Qualifications constituant un atout",
                description: "",
                created_at: null,
                updated_at: null,
              },
              {
                id: 3,
                criteria_type_id: 2,
                locale: "en",
                value: "Nice to Have",
                description: "",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          skill: {
            id: 36,
            skill_type_id: 1,
            created_at: null,
            updated_at: "2019-05-08 14:14:55",
            name: "Ability to follow instructions",
            description:
              'Defined as: Ability to "catch on" or understand instructions and underlying principles; to reason and make judgments and complete the task.',
          },
          skill_level: {
            id: 1,
            name: "basic",
            created_at: null,
            updated_at: null,
            value: "Basic",
            translations: [
              {
                id: 2,
                skill_level_id: 1,
                locale: "fr",
                value: "D\u00e9butant",
                created_at: null,
                updated_at: null,
              },
              {
                id: 1,
                skill_level_id: 1,
                locale: "en",
                value: "Basic",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          translations: [
            {
              id: 127,
              locale: "en",
              criteria_id: 64,
              description:
                "Occaecati id id quidem. Quas commodi tenetur aut occaecati velit at consequatur. Voluptatibus labore deleniti cumque autem.\n\nAtque veniam ut non sequi eum voluptas sunt neque. Dolorem eos quas voluptas quasi. Quia blanditiis error tempore consequatur labore. Amet optio odit quam dolore id.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
            {
              id: 128,
              locale: "fr",
              criteria_id: 64,
              description:
                "Possimus animi harum quae a explicabo. Ut fugit ut quia aut aut in optio. Voluptatem molestiae vel iste dolor et. Aut nesciunt quo est et esse.\n\nEum omnis magni molestiae dolorem aut mollitia nam. Quo ducimus quisquam iste autem exercitationem.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
          ],
          en: {
            description:
              "Occaecati id id quidem. Quas commodi tenetur aut occaecati velit at consequatur. Voluptatibus labore deleniti cumque autem.\n\nAtque veniam ut non sequi eum voluptas sunt neque. Dolorem eos quas voluptas quasi. Quia blanditiis error tempore consequatur labore. Amet optio odit quam dolore id.",
          },
          fr: {
            description:
              "Possimus animi harum quae a explicabo. Ut fugit ut quia aut aut in optio. Voluptatem molestiae vel iste dolor et. Aut nesciunt quo est et esse.\n\nEum omnis magni molestiae dolorem aut mollitia nam. Quo ducimus quisquam iste autem exercitationem.",
          },
        },
        {
          id: 65,
          criteria_type_id: 1,
          job_poster_id: 13,
          skill_id: 80,
          skill_level_id: 2,
          created_at: "2019-05-08T14:15:05+00:00",
          updated_at: "2019-05-08T14:15:05+00:00",
          description:
            "Vel repellendus impedit quod exercitationem animi perspiciatis. Maxime fugiat delectus aut incidunt. Aspernatur dolor fugit natus laborum adipisci deleniti. Porro est expedita molestiae similique deserunt ad vel aut.\n\nRepellendus quia corporis fuga. Accusamus voluptas omnis rem. Excepturi pariatur numquam eligendi non est delectus est et. Ut voluptatem nesciunt sit non.",
          criteria_type: {
            id: 1,
            name: "essential",
            created_at: null,
            updated_at: null,
            value: "Need to Have",
            description: "",
            translations: [
              {
                id: 2,
                criteria_type_id: 1,
                locale: "fr",
                value: "Qualifications essentielles",
                description: "",
                created_at: null,
                updated_at: null,
              },
              {
                id: 1,
                criteria_type_id: 1,
                locale: "en",
                value: "Need to Have",
                description: "",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          skill: {
            id: 80,
            skill_type_id: 2,
            created_at: null,
            updated_at: "2019-05-08 14:14:55",
            name: "Mobile Development in the Cloud",
            description:
              "Defined as: Ability to architect, design and develop and/or deploy and test mobile applications on a Cloud (MS Azure or Amazon AWS) platform.",
          },
          skill_level: {
            id: 2,
            name: "intermediate",
            created_at: null,
            updated_at: null,
            value: "Intermediate",
            translations: [
              {
                id: 4,
                skill_level_id: 2,
                locale: "fr",
                value: "Interm\u00e9diaire",
                created_at: null,
                updated_at: null,
              },
              {
                id: 3,
                skill_level_id: 2,
                locale: "en",
                value: "Intermediate",
                created_at: null,
                updated_at: null,
              },
            ],
          },
          translations: [
            {
              id: 129,
              locale: "en",
              criteria_id: 65,
              description:
                "Vel repellendus impedit quod exercitationem animi perspiciatis. Maxime fugiat delectus aut incidunt. Aspernatur dolor fugit natus laborum adipisci deleniti. Porro est expedita molestiae similique deserunt ad vel aut.\n\nRepellendus quia corporis fuga. Accusamus voluptas omnis rem. Excepturi pariatur numquam eligendi non est delectus est et. Ut voluptatem nesciunt sit non.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
            {
              id: 130,
              locale: "fr",
              criteria_id: 65,
              description:
                "Vero qui id qui est. Rerum quaerat voluptate id similique minus sit quae. Est porro alias earum nam quas excepturi inventore. Ut nesciunt sit temporibus odit quibusdam aut.\n\nRerum velit libero cumque debitis temporibus. Recusandae fuga aut neque repudiandae eum sint.",
              created_at: "2019-05-08T14:15:05+00:00",
              updated_at: "2019-05-08T14:15:05+00:00",
            },
          ],
          en: {
            description:
              "Vel repellendus impedit quod exercitationem animi perspiciatis. Maxime fugiat delectus aut incidunt. Aspernatur dolor fugit natus laborum adipisci deleniti. Porro est expedita molestiae similique deserunt ad vel aut.\n\nRepellendus quia corporis fuga. Accusamus voluptas omnis rem. Excepturi pariatur numquam eligendi non est delectus est et. Ut voluptatem nesciunt sit non.",
          },
          fr: {
            description:
              "Vero qui id qui est. Rerum quaerat voluptate id similique minus sit quae. Est porro alias earum nam quas excepturi inventore. Ut nesciunt sit temporibus odit quibusdam aut.\n\nRerum velit libero cumque debitis temporibus. Recusandae fuga aut neque repudiandae eum sint.",
          },
        },
      ],
    });
    it("Can parse a real example of a job response without throwing an error", (): void => {
      expect((): void => {
        parseJobResponse(jobResponse());
      }).not.toThrow();
    });
    it("Parses the close date correctly", (): void => {
      const expectDate = moment("2019-06-01T06:59:59+00:00").toDate();
      expect(parseJobResponse(jobResponse()).job.close_date_time).toEqual(
        expectDate,
      );
    });
  });
});

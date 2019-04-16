import jobReducer from "./jobReducer";

test("reducers", () => {
  const fakeJob = {
    id: 12,
    job_term_id: 1,
    term_qty: 4,
    open_date_time: "2019-04-20 07:00:00",
    close_date_time: "2019-05-20 06:59:59",
    start_date_time: "2019-05-29 07:00:00",
    department_id: 3,
    province_id: 10,
    salary_min: 78872,
    salary_max: 95791,
    noc: 22,
    classification: "PE-04",
    security_clearance_id: 3,
    language_requirement_id: 2,
    manager_id: 1,
    created_at: "2019-04-15 14:34:14",
    updated_at: "2019-04-15 14:34:14",
    published: false,
    remote_work_allowed: true,
    review_requested_at: "2019-04-13 19:50:21",
    published_at: null,
    submitted_applications_count: 0,
    city: "Rempelfort",
    title: "I wonder if I'm on the.",
    impact:
      "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
    branch: "dolor",
    division: "suscipit",
    education: "Dolorem laborum vel sequi quo autem.",
    manager: {
      id: 1,
      department_id: 1,
      twitter_username: "Flavio",
      linkedin_url:
        "http://www.rowe.com/minus-accusantium-corporis-aspernatur-et",
      user_id: 2,
      created_at: "2019-04-15 14:33:56",
      updated_at: "2019-04-15 14:33:56",
      work_review_frequency_id: 2,
      stay_late_frequency_id: 3,
      engage_team_frequency_id: 5,
      development_opportunity_frequency_id: 2,
      refuse_low_value_work_frequency_id: 3,
      years_experience: 25,
      about_me:
        "Et et earum doloremque rerum amet facilis repellendus ab. Iure iste iure voluptas enim. Modi accusantium ut totam hic vel. Distinctio eum quae soluta deserunt.\n\nRerum consequuntur velit recusandae voluptate. Quo aliquam ut ab veniam. Provident aut ipsam est. Libero saepe eum molestiae itaque quibusdam.\n\nQuidem et dicta quo assumenda et cum. Qui qui modi necessitatibus nisi temporibus iure magni. Et accusamus totam laborum voluptatem provident qui quae quam. Facere et aut iusto.",
      greatest_accomplishment:
        "Et aut velit recusandae quis ab laudantium. Minus et eum autem quo minus voluptas et. Velit est aut aut consequuntur.\n\nSint corporis et laboriosam repellat. Cupiditate nostrum ut officiis aut sint eveniet vel. Qui et magnam aliquid commodi. Illum rerum aut et.\n\nAdipisci soluta itaque est est. Rerum modi unde sit non occaecati. Praesentium non blanditiis cupiditate sint.",
      branch: "laboriosam",
      division: "qui",
      position: "quia",
      work_experience: null,
      education:
        "Blanditiis tempore deserunt inventore odio. Pariatur corrupti consequatur vero. Tenetur sed saepe repudiandae neque. Eligendi voluptatum autem praesentium commodi.\n\nQui ut quibusdam vitae iste voluptas ea. Laboriosam odit molestiae nobis illum ratione distinctio nostrum. Ipsa sint ad et laboriosam odit praesentium.\n\nEos ipsum iusto dolorem exercitationem ab inventore. Odit praesentium est rerum rerum facilis error sed at. Aut modi voluptatem aperiam dolorum dolorem inventore vel.",
      leadership_style:
        "Sapiente repellat quia ea repudiandae beatae ratione. Et quia voluptatem dignissimos in. Corrupti earum assumenda sit odio velit.\n\nAlias fugiat quos nesciunt aspernatur voluptatibus cupiditate. Maxime quia eos dolores iste. Consequuntur ut et omnis quisquam voluptate ratione.",
      employee_learning:
        "Cumque debitis qui ullam ipsum. Ut possimus eius suscipit impedit. Quibusdam nobis sit cum ut. Labore est natus aut praesentium.\n\nEst molestiae a repudiandae autem aut quae sed. Dolorum quia ducimus quo natus. Quia et cum voluptatem cumque reprehenderit accusantium error soluta.",
      expectations:
        "Consequatur omnis et mollitia optio velit vero. Quisquam in qui officia repudiandae. Et qui sed et voluptates. Dolorem consectetur laborum consequatur tenetur id vel.\n\nExplicabo est porro eos tempora. Ut tenetur sit delectus fugiat vitae aut repudiandae.",
      career_journey:
        "Doloribus ullam cupiditate et in facere. Omnis magni voluptates officiis quia mollitia aut repellendus. Iste eum eaque consequatur eos. Et repellendus qui illum expedita molestias.\n\nSuscipit natus harum est odit aut odio sit. Enim vel et ut nihil voluptatem. Quasi et aut est voluptas unde dolor. Dolorem velit earum voluptate illum iste. Delectus debitis sit adipisci mollitia ipsum eos fuga aliquid.\n\nUt minus ipsa alias repudiandae sunt vel. Sit neque libero incidunt consequatur eius rerum ipsum. Nam ea quo numquam at maiores autem et. Odio iste amet placeat exercitationem odio. Et modi id animi.",
      learning_path:
        "Quo hic repudiandae consequatur cupiditate culpa quia voluptatem deserunt. Enim voluptatem in qui voluptatem sapiente. Nesciunt dolor temporibus perferendis aut sed eos ipsam.\n\nCommodi dolorum mollitia nulla. Ut autem inventore non ab ea. Possimus nobis quos velit rerum pariatur. Pariatur quia nihil itaque nesciunt.\n\nVoluptatem dolor aut nam aut provident perferendis. Qui omnis sit quia qui. Nemo aliquam magnam impedit inventore dolores cupiditate sed.",
      user: {
        id: 2,
        email: "manager@test.com",
        name: "Mr. Angus Thompson V",
        is_confirmed: true,
        user_role_id: 2,
        created_at: "2019-04-15 14:33:56",
        updated_at: "2019-04-15 14:33:56",
        is_priority: false,
        user_role: {
          id: 2,
          name: "manager",
          created_at: null,
          updated_at: null,
        },
      },
    },
    fr: {
      city: "Lake Robbburgh",
      title: "Queen! The Queen!' and.",
      impact:
        "Nulla enim dignissimos ea saepe totam. Deserunt quod deserunt et sed qui nesciunt illo eaque.\n\nVeniam laudantium ab illo. In in et et voluptatem excepturi. Nesciunt deleniti qui vero magni sunt earum rerum.",
      branch: "et",
      division: "minima",
      education: "Ut odit inventore incidunt.",
    },
    en: {
      city: "Rempelfort",
      title: "I wonder if I'm on the.",
      impact:
        "At iste inventore tempora est. Aspernatur odio autem sapiente est aut. Commodi eius eligendi corrupti repellendus. Enim ad placeat voluptas qui et eum.\n\nEos commodi reprehenderit officiis vero repudiandae. Nisi voluptatem officiis aut molestias incidunt. Doloribus autem est sed non reprehenderit dolores. Et similique et doloribus ea est nam facere.",
      branch: "dolor",
      division: "suscipit",
      education: "Dolorem laborum vel sequi quo autem.",
    },
  };

  const initialState = {
    "12": {
      job: fakeJob,
      isLoading: false,
    },
  };
  const expectState = {
    "12": {
      job: fakeJob,
      isLoading: true,
    },
  };
  const newState = jobReducer(initialState, {
    type: "FETCH_JOB_STARTED",
    payload: 12,
  });
  expect(newState).toEqual(expectState);
});

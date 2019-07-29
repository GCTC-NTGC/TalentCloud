import { Selector, Role } from "testcafe";

fixture(`Critical`).page(`talent.test`);

// Returns an integer between min/max.
function spinTheWheel() {
  const min = 777;
  const max = 7777;

  const random = Math.floor(Math.random() * (+max - +min)) + +min;

  return random;
}

// Returns email with random.
function applicantEmail() {
  const prefix = "applicant";
  const suffix = "@test.com";
  const rng = spinTheWheel();

  let email = prefix;
  email += rng;
  email += suffix;

  return email;
}

// Logins for each user role, allows quick switching.
const applicantUser = Role("http://talent.test/login", async t => {
  await t
    .typeText("#email", "applicant@test.com")
    .typeText("#password", "password")
    .click(Selector("button").withText("Login"));
});
/*
const managerUser = Role("http://talent.test/manager/login", async t => {
  await t
    .typeText("#email", "manager@test.com")
    .typeText("#password", "password")
    .click(Selector("button").withText("Login"));
});

const adminUser = Role("http://talent.test/admin/login", async t => {
  await t
    .typeText(
      Selector(".form-control").withAttribute("name", "email"),
      "admin@test.com",
    )
    .typeText(
      Selector(".form-control").withAttribute("name", "password"),
      "password",
    )
    .pressKey("enter");
});
*/

test("Applicant Profile - My Skills", async t => {
  await t
    // Logged in as applicant.
    .useRole(applicantUser)
    // Go to My Skills page.
    .navigateTo("/profile/skills")
    .expect(Selector("h1").withText("My Skills").visible)
    .ok()
    // Add soft skill (Ability to learn).
    .click(Selector("button").withText("Add soft skill"))
    .click(Selector("select").withAttribute("name", "skill_id"))
    .pressKey("down enter")
    // .click(Selector("option").withAttribute("value", "24"))
    .click(
      Selector(".form__radio-group-span").withText("Deep Level Demonstration"),
    )
    .typeText(
      Selector("textarea").withAttribute("name", "description"),
      "Eating lots of passionfruit.",
    )
    // Check skill help modal before saving.
    .click(Selector("button").withText("(Need help? See example.)"))
    .expect(Selector("h3").withText("Writing my application").visible)
    .ok()
    .click(Selector("button").withText("Got it!"))
    // Save and refresh.
    .click(Selector("button").withText("Save Skill"))
    .wait(1234)
    .navigateTo("/profile/skills")
    .expect(Selector("span").withText("Ability to learn").visible)
    .ok()

    // Delete a hard skill.
    .click(Selector("span").withText("Git"))
    .click(Selector("button").withText("Delete Skill"))
    .click(Selector("button").withText("Delete"))
    .expect(Selector("span").withText("Git").visible)
    .notOk()

    // Add hard skill (Front-end development).
    .click(Selector("button").withText("Add hard skill"))
    .click(
      Selector("select")
        .withAttribute("name", "skill_id")
        .withText("Select a skill..."),
    )
    .pressKey("down enter")
    // .click(Selector("option").withAttribute("value", "12"))
    .click(Selector(".form__radio-group-span").withText("Advanced"))
    .typeText(
      Selector("textarea").withAttribute("name", "description"),
      "Sailing the high seas.",
    )
    .click(Selector("button").withText("Save Skill"))
    .wait(1234)
    .expect(Selector("button").withText("Saved!").visible)
    .ok();
});

test("Applicant Profile - My Experience", async t => {
  await t
    // Logged in as applicant.
    .useRole(applicantUser)
    // Go to My Experience page.
    .navigateTo("/profile/experience")
    .expect(Selector("h1").withText("My Experience").visible)
    .ok()
    // Add new diploma.
    .click(Selector("button").withText("Add Diploma/Degree"))

    .click(Selector("select").withAttribute("id", "degrees[new][1]degreeType"))
    .click(
      Selector("select")
        .withAttribute("id", "degrees[new][1]degreeType")
        .find("option")
        .withAttribute("value", "4"),
    )
    .typeText(
      Selector("input").withAttribute("id", "degrees[new][1]degreeArea"),
      "Computer Science",
    )
    .typeText(
      Selector("input").withAttribute("id", "degrees[new][1]degreeInstitution"),
      "University of Phoenix",
    )
    .click(Selector("button").withAttribute("value", "degrees[new][1]"))
    .expect(Selector("span").withText("Phd, Computer Science").visible)
    .ok()
    // Add new course.
    .click(Selector("button").withText("Add Course/Certification"))

    .typeText(
      Selector("input").withAttribute("id", "courses[new][1]courseName"),
      "Advanced Memes",
    )
    .typeText(
      Selector("input").withAttribute("id", "courses[new][1]courseInstitution"),
      "Yale University",
    )
    .click(
      Selector("select").withAttribute("id", "courses[new][1]courseStatus"),
    )
    .click(
      Selector("select")
        .withAttribute("id", "courses[new][1]courseStatus")
        .find("option")
        .withAttribute("value", "2"),
    )
    .click(Selector("button").withAttribute("value", "courses[new][1]"))
    .expect(Selector("span").withText("Advanced Memes").visible)
    .ok()
    // Add new experience.
    .click(Selector("button").withText("Add Equivalent Experience"))

    .typeText(
      Selector("input").withAttribute("id", "work_experiences[new][1]workRole"),
      "The boss",
    )
    .typeText(
      Selector("input").withAttribute(
        "id",
        "work_experiences[new][1]workCompany",
      ),
      "My house",
    )
    .typeText(
      Selector("textarea").withAttribute(
        "id",
        "work_experiences[new][1]workDescription",
      ),
      "It was the best of times, it was the worst of times.",
    )
    .click(
      Selector("button").withAttribute("value", "work_experiences[new][1]"),
    )
    .expect(Selector("span").withText("The boss").visible)
    .ok();
});

// TODO: References page.
// TODO: Work samples page.

test("Applicant Profile - About Me", async t => {
  await t
    // Logged in as applicant.
    .useRole(applicantUser)
    // Go to About Me page.
    .navigateTo("/profile/about")
    .expect(Selector("h1").withText("About Me").visible)
    .ok()
    // Change password.
    .typeText(
      Selector(".form__input").withAttribute("name", "old_password"),
      "password",
    )
    .typeText(
      Selector(".form__input").withAttribute("name", "new_password"),
      "Password123!@#",
    )
    .typeText(
      Selector(".form__input").withAttribute(
        "name",
        "new_password_confirmation",
      ),
      "Password123!@#",
    )
    // Edit social media / tagline.
    .selectText(
      Selector(".form__input").withAttribute("name", "twitter_username"),
    )
    .typeText(
      Selector(".form__input").withAttribute("name", "twitter_username"),
      "realDonaldTrump",
    )
    .selectText(Selector(".form__input").withAttribute("name", "linkedin_url"))
    .typeText(
      Selector(".form__input").withAttribute("name", "linkedin_url"),
      "https://www.linkedin.com/in/tristanwiseman/",
    )
    .selectText(Selector(".form__input").withAttribute("name", "tagline"))
    .typeText(
      Selector(".form__input").withAttribute("name", "tagline"),
      "I didn't do it.",
    )
    .click(Selector("button").withText("Save Changes"))
    // Relog to check password change.
    .click(Selector("a").withText("Logout"))
    .click(Selector("a").withText("Login"))
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "Password123!@#")
    .click(Selector("button").withText("Login"))
    .expect(Selector("a").withText("My Applications").visible)
    .ok();
});

test("Register Applicant", async t => {
  await t
    .click(Selector("a").withText("Register"))
    .typeText(Selector("#name"), "Test Cafe")
    .typeText(Selector("#email"), applicantEmail())
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"))
    .expect(Selector("a").withText("My Applications").visible)
    .ok();
});

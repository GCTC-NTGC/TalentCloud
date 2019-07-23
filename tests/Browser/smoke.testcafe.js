import { Selector } from "testcafe";

fixture(`Smoke`).page(`talent.test`);

/*

test("Basic Access", async t => {
  await t
    .expect(Selector(".home__about-card").visible)
    .ok()
    .expect(Selector("a").withText("Login").visible)
    .ok()
    .click(Selector("a").withText("Browse Jobs"))
    .expect(Selector("section.browse__index").visible)
    .ok()
    .click(Selector("a").withText("FAQ"))
    .expect(Selector("section.faq").visible)
    .ok()
    .click(Selector("a").withText("Login"))
    .expect(Selector("form > .auth-content").visible)
    .ok();
});

test("No Access Profile", async t => {
  await t
    .navigateTo("/profile/about")
    .expect(Selector("form > .auth-content")())
    .ok();
});

test("Language Switch", async t => {
  await t
    .click(Selector("a").withText("Français"))
    .expect(
      Selector(".home__hero-content.flex-grid.middle")
        .find("div")
        .withText("Votre prochain projet").visible,
    )
    .ok()
    .click(Selector("a").withText("English"))
    .expect(
      Selector(".home__hero-content.flex-grid.middle")
        .find("div")
        .withText("Your next gig").visible,
    )
    .ok();
});

test("User Accounts", async t => {
  await t
    .click(Selector("a").withText("Login"))
    .typeText(Selector("#email"), "applicant@test.com")
    .pressKey("tab")
    .typeText(Selector("#password"), "password")
    .pressKey("enter")
    .expect(Selector("a").withText("My Applications").visible)
    .ok()
    .expect(Selector("a").withText("My Profile").visible)
    .ok()
    .click(Selector("a").withText("Logout"))
    .expect(Selector("a").withText("Login").visible)
    .ok();
});

test("Job Posters", async t => {
  await t
    .expect(Selector("a").withText("Browse Jobs").visible)
    .ok()
    .click(Selector("a").withText("Browse Jobs"))
    .expect(Selector(".browse__index").visible)
    .ok()
    .click(
      Selector(".browse__index-job-card")
        .find("div")
        .withText("View Job"),
    )
    .expect(
      Selector('.job-post__apply-button[title="Log in to apply for this job."]')
        .visible,
    )
    .ok();
});

test("Manager Job Posters", async t => {
  await t
    .click(Selector("a").withText("Login"))
    .typeText(Selector("#email"), "manager@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"))
    .navigateTo("/manager/jobs")
    .expect(Selector(".manager-poster-index").visible)
    .ok();
});

*/

test("Admin Portal", async t => {
  await t
    .navigateTo("/admin/login")
    .typeText(
      Selector(".form-control").withAttribute("name", "email"),
      "admin@test.com",
    )
    .typeText(
      Selector(".form-control").withAttribute("name", "password"),
      "password",
    )
    .pressKey("enter")
    .expect(Selector("h1").withText("Dashboard").visible)
    .ok();
});

test("Applicant Profile", async t => {
  await t
    .click(Selector("a").withText("Login"))
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"))
    .navigateTo("/profile/experience")
    .expect(Selector("h1").withText("My Experience").visible)
    .ok()
    .click(Selector("button").withText("Add Diploma/Degree"))
    .expect(
      Selector("select").withAttribute("id", "degrees[new][1]degreeType")
        .visible,
    )
    .ok()
    .pressKey("tab")
    .click(Selector("select").withAttribute("id", "degrees[new][1]degreeType"))
    .click(
      Selector("select")
        .withAttribute("id", "degrees[new][1]degreeType")
        .find("option")
        .withAttribute("value", "4"),
    )
    .typeText(Selector("#degrees[new][1]degreeArea"), "Computer Science")
    .typeText(
      Selector("#degrees[new][1]degreeInstitution"),
      "University of Phoenix",
    )
    .click(Selector("button").withText("Save Diploma/Degree"))
    .expect(Selector(".accordion-title").withText("PhD, Computer Science"))
    .ok()
    .navigateTo("/profile/about")
    .expect(Selector("h1").withText("About Me").visible)
    .ok()
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
      "https://www.linkedin.com/in/grantbarnes/",
    )
    .selectText(Selector(".form__input").withAttribute("name", "tagline"))
    .typeText(
      Selector(".form__input").withAttribute("name", "tagline"),
      "I didn't do it.",
    )
    .click(Selector("button").withText("Save Changes"))
    .expect(Selector("input").withAttribute("value", "I didn't do it.").exists)
    .ok()
    .click(Selector("a").withText("My Skills"))
    .expect(Selector("h1").withText("My Skills").visible)
    .ok();
});

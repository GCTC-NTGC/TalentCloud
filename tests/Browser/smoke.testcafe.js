import { Selector } from "testcafe";

fixture(`Smoke`).page(`talent.test`);

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

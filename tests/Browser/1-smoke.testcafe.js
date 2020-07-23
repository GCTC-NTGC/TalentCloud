import { Selector } from "testcafe";
import { managerUser, adminUser, hrUser } from "./helpers/roles";
import {
  HOMEPAGE,
  PROFILE_ABOUT,
  MANAGER_HOME,
  MANAGER_JOBS,
  HR_JOBS,
  ADMIN_HOME,
} from "./helpers/constants";

fixture(`Smoke Tests - Hello World`).page(HOMEPAGE).meta("travis", "run");

// Skip when writing new tests
// fixture.skip(`Smoke`);

test("Hello World - Static Page Access", async (t) => {
  await t
    .expect(Selector("#home-heading").visible)
    .ok()
    .expect(Selector("a").withText("Login").visible)
    .ok()
    .click(Selector("a").withText("Browse Jobs"))
    .expect(Selector("section.browse-jobs").visible)
    .ok()
    .click(Selector("a").withText("FAQ"))
    .expect(Selector("section.faq").visible)
    .ok()
    .click(Selector("a").withText("Login"))
    .expect(Selector("form button[type=submit]").withText("Login").visible)
    .ok();
});

test("Hello World - Guest Cannot Access Profile", async (t) => {
  await t
    .navigateTo(PROFILE_ABOUT)
    .expect(Selector("form button[type=submit]").withText("Login").visible)
    .ok();
});

test("Hello World - Language Toggle", async (t) => {
  const frenchLink = Selector("a").withText("Français");
  const englishLink = Selector("a").withText("English");
  await t
    .click(frenchLink)
    .expect(
      Selector("p").withText(
        "Il est désormais plus facile de postuler un emploi au gouvernement.",
      ),
    )
    .ok()
    .click(englishLink)
    .expect(
      Selector("p").withText("Applying to government jobs just got easier."),
    )
    .ok();
});

test("Hello World - Applicant Portal", async (t) => {
  await t
    .click(Selector("a").withText("Login"))
    .typeText("#email", "applicant@test.com")
    .typeText("#password", "password")
    .click(Selector("button").withText("Login"))
    .expect(
      Selector("p").withText("Applying to government jobs just got easier.")
        .visible,
    )
    .ok()
    .expect(Selector("a").withText("My Applications").visible)
    .ok()
    .expect(Selector("a").withText("My Profile").visible)
    .ok()
    .click(Selector("a").withText("Logout"))
    .expect(Selector("a").withText("Login").visible)
    .ok();
});

test("Hello World - Manager Portal", async (t) => {
  await t
    .useRole(managerUser)
    .navigateTo(MANAGER_HOME)
    .expect(
      Selector("p").withText("Hiring for government just got easier.").visible,
    )
    .ok();
});

test("Hello World - Manager Job Posters", async (t) => {
  await t
    .useRole(managerUser)
    .navigateTo(MANAGER_JOBS)
    .expect(Selector("h1").withText("My Job Posters").visible)
    .ok();
});

test("Hello World - HR Job Posters", async (t) => {
  await t
    .useRole(hrUser)
    .navigateTo(HR_JOBS)
    .expect(Selector("h1").withText("Job Index").visible)
    .ok();
});

test("Hello World - Admin Portal", async (t) => {
  await t
    .useRole(adminUser)
    .navigateTo(ADMIN_HOME)
    .expect(Selector("h1").withText("Welcome!").visible)
    .ok();
});

test("Hello World - Applicant Job Posters", async (t) => {
  await t
    .expect(Selector("a").withText("Browse Jobs").visible)
    .ok()
    .click(Selector("a").withText("Browse Jobs"))
    .expect(Selector(".browse-jobs").visible)
    .ok()
    .click(Selector(".job-card").find("p").withText("View This Job"))
    .expect(Selector(".job-post-apply-button").visible)
    .ok();
});

import { Selector, Role, ClientFunction } from "testcafe";
import {
  emptyApplicantUser,
  adminUser,
  assertIsLoggedIn,
} from "./helpers/roles";

const HOMEPAGE = "https://talent.test";

fixture(`Critical - Applicant Profile`).page(HOMEPAGE);

// Skip when writing new tests
// fixture.skip(`Critical - Applicant Profile`);

test("Applicant Profile - My Skills", async t => {
  await t
    // TODO: Applicant user account without prepopulated skills.
    // Logged in as admin (empty skills page).
    .useRole(adminUser)
    // Go to My Skills page.
    .navigateTo("/profile/skills")
    .expect(Selector("h1").withText("My Skills").visible)
    .ok()
    // Add soft skill (Passion).
    .click(Selector("button").withText("Add soft skill"))
    .click(Selector("select").withAttribute("name", "skill_id"))
    .click(
      Selector("select")
        .withAttribute("name", "skill_id")
        .find("option")
        .withText("Passion"),
    )
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
    .wait(500)
    .click(Selector("button").withText("Save Skill"))
    // Add hard skill (Docker).
    .click(Selector("button").withText("Add hard skill"))
    .click(
      Selector("select").withAttribute(
        "id",
        "skill_declarations[new][hard][1]skillSelection",
      ),
    )
    .click(Selector("option").withAttribute("value", "12"))
    .click(Selector(".form__radio-group-span").withText("Advanced"))
    .typeText(
      Selector("textarea").withAttribute(
        "id",
        "skill_declarations[new][hard][1]skillDescription",
      ),
      "Sailing the high seas.",
    )
    .pressKey("tab tab enter")
    // Save and refresh.
    .navigateTo("/profile/skills")
    .expect(Selector("span").withText("Passion").visible)
    .ok()
    .expect(Selector("span").withText("Docker").visible)
    .ok();
});

test("Applicant Profile - My Experience", async t => {
  await t
    // Logged in as applicant.
    .useRole(emptyApplicantUser)
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
    .expect(Selector("span").withText("The boss, My house").visible)
    .ok();
});

test("Applicant Profile - My References", async t => {
  await t
    // Logged in as applicant.
    .useRole(emptyApplicantUser)
    // Go to My References page.
    .navigateTo("/profile/references")
    .expect(Selector("h1").withText("My References").visible)
    .ok()
    .click(Selector("button").withText("Add Reference"))
    .typeText(
      Selector("input").withAttribute("id", "references[1]referenceName"),
      "Richard Cranium",
    )
    .click(
      Selector("select").withAttribute(
        "id",
        "references[1]referenceRelationship",
      ),
    )
    .click(
      Selector("select")
        .withAttribute("id", "references[1]referenceRelationship")
        .find("option")
        .withAttribute("value", "1"),
    )
    .typeText(
      Selector("input").withAttribute("id", "references[1]referenceEmail"),
      "richard@coolfunny.com",
    )
    .typeText(
      Selector("textarea").withAttribute(
        "id",
        "references[1]referenceDescription",
      ),
      "Richard is the CEO of Cool Funny, we had some laughs.",
    )
    .click(Selector("button").withAttribute("value", "references[1]"))
    .navigateTo("/profile/references")
    .expect(Selector("button").withText("Richard Cranium").visible)
    .ok();
});

test("Applicant Profile - My Work Samples", async t => {
  await t
    // Logged in as applicant.
    .useRole(emptyApplicantUser)
    // Go to My Work Samples page.
    .navigateTo("/profile/portfolio")
    .expect(Selector("h1").withText("My Work Samples").visible)
    .ok()
    // Add new work sample.
    .click(Selector("button").withText("Add Sample"))
    .typeText(
      Selector("input").withAttribute("id", "work_samples[1]sampleName"),
      "Cool Funny",
    )
    .click(Selector("select").withAttribute("id", "work_samples[1]sampleType"))
    .click(
      Selector("select")
        .withAttribute("id", "work_samples[1]sampleType")
        .find("option")
        .withAttribute("value", "3"),
    )
    .typeText(
      Selector("input").withAttribute("id", "work_samples[1]sampleLink"),
      "http://www.coolfunny.com",
    )
    .typeText(
      Selector("textarea").withAttribute(
        "id",
        "work_samples[1]sampleDescription",
      ),
      "A website that is both cool and funny.",
    )
    .click(Selector("button").withAttribute("value", "work_samples[1]"))
    .navigateTo("/profile/portfolio")
    .expect(Selector("button").withText("Cool Funny").visible)
    .ok();
});

// Returns an integer between min/max.
function spinTheWheel() {
  const min = 777;
  const max = 7777;

  const random = Math.floor(Math.random() * (+max - +min)) + +min;

  return random;
}

// Returns email with random integer.
function randomEmail() {
  const prefix = "applicant";
  const suffix = "@test.com";
  const rng = spinTheWheel();

  let email = prefix;
  email += rng;
  email += suffix;

  return email;
}

fixture(`Critical - Registration`).page(HOMEPAGE);
// Skip when writing new tests
// fixture.skip(`Critical - Registration`);

test("Registration - Applicant", async t => {
  await t
    .useRole(Role.anonymous())
    .click(Selector("a").withText("Register"))
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"));
  await assertIsLoggedIn(t);
});

test("Registration - Manager", async t => {
  await t
    .useRole(Role.anonymous())
    .navigateTo("/manager/register")
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .click(Selector("#department"))
    .click(
      Selector("#department")
        .find("option")
        .withText("Treasury Board of Canada Secretariat"),
    )
    .expect(Selector("#gov_email").visible)
    .ok()
    .typeText(Selector("#gov_email"), randomEmail())
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"));
  await assertIsLoggedIn(t);
});

// Returns the URL of the current web page
const getPageUrl = ClientFunction(() => window.location.href);

test("Registration - First Manager Visit", async t => {
  await t
    .useRole(Role.anonymous())
    .click(Selector("a").withText("Register"))
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"));
  await assertIsLoggedIn(t);
  await t
    .navigateTo("/manager")
    .click(Selector("#department"))
    .click(
      Selector("#department")
        .find("option")
        .withText("Treasury Board of Canada Secretariat"),
    )
    // Gov email field should be visible after selecting a department
    .expect(Selector("#gov_email").visible)
    .ok()
    .typeText(Selector("#gov_email"), randomEmail())
    .click(Selector("button").withAttribute("type", "submit"))
    // Should now be on the manager homepage
    .expect(getPageUrl())
    .match(/\/manager$/);
});

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Selector } from "testcafe";
import { emptyApplicantUser, applicantUser } from "./helpers/roles";
import {
  HOMEPAGE,
  PROFILE_EXPERIENCE,
  PROFILE_REFERENCES,
  PROFILE_PORTFOLIO,
  PROFILE_SKILLS,
} from "./helpers/constants";

fixture(`Critical - Applicant Profile`).page(HOMEPAGE).meta("travis", "run");

// Skip when writing new tests
// fixture.skip(`Critical - Applicant Profile`);

test("Applicant Profile - My Skills", async (t) => {
  await t
    // TODO: Applicant user account without prepopulated skills.
    // Logged in as admin (empty skills page).
    .useRole(applicantUser)
    // Go to My Skills page.
    .navigateTo(PROFILE_SKILLS)
    .expect(Selector("h1").withText("My Skills").visible)
    .ok()
    // Check for note explaining page has been archived.
    .expect(Selector("p").withText("This page is going away").visible)
    .ok()
    // Check that buttons have been disabled.
    .expect(Selector("button#add-soft-skill").hasAttribute("disabled"))
    .ok()
    .expect(Selector("button#add-hard-skill").hasAttribute("disabled"))
    .ok();
});

test("Applicant Profile - My Experience", async (t) => {
  await t
    // Logged in as applicant.
    .useRole(emptyApplicantUser)
    // Go to My Experience page.
    .navigateTo(PROFILE_EXPERIENCE)
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
    .expect(Selector("p").withText("Phd, Computer Science").visible)
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
    .expect(Selector("p").withText("Advanced Memes").visible)
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
    .expect(Selector("p").withText("The boss").visible)
    .ok();
});

test("Applicant Profile - My References", async (t) => {
  await t
    // Logged in as applicant.
    .useRole(applicantUser)
    // Go to My References page.
    .navigateTo(PROFILE_REFERENCES)
    .expect(Selector("h1").withText("My References").visible)
    .ok()
    // Check for note explaining page has been archived.
    .expect(Selector("p").withText("This page is going away").visible)
    .ok()
    .expect(
      Selector("button").withText("Add Reference").hasAttribute("disabled"),
    )
    .ok();
});

test("Applicant Profile - My Work Samples", async (t) => {
  await t
    // Logged in as applicant.
    .useRole(applicantUser)
    // Go to My Work Samples page.
    .navigateTo(PROFILE_PORTFOLIO)
    .expect(Selector("h1").withText("My Work Samples").visible)
    .ok()
    // Check for note explaining page has been archived.
    .expect(Selector("p").withText("This page is going away").visible)
    .ok()
    .expect(Selector("button").withText("Add Sample").hasAttribute("disabled"))
    .ok();
});

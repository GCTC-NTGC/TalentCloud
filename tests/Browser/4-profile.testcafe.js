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
import { educationModal } from "./helpers/experiencePage";

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
    .expect(Selector("h2").withText("My Experience").visible)
    .ok();

  const education = educationModal();

  // Modal initially hidden.
  await t.expect(education.container.getStyleProperty("opacity")).eql("0");
  // Open modal.
  await t.click(education.openBtn).wait(1000);
  // Test that modal is visible.
  await t.expect(education.container.getStyleProperty("opacity")).eql("1");
  // Fill form.
  await education.fillForm();
  // Save experience.
  await t.click(education.saveBtn).wait(10000);
  // Test that modal closes.
  await t.expect(education.container.getStyleProperty("opacity")).eql("0");
  // Test that saved experience appears in an accordion.
  await t.expect(education.accordion.exists).ok();
  // Test that accordion can be opened by clicking on it.
  await t
    .click(education.accordion)
    .expect(education.accordionBody.visible)
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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Selector, Role, ClientFunction } from "testcafe";
import { assertIsLoggedIn, hrUser } from "./helpers/roles";
import {
  HOMEPAGE,
  MANAGER_REGISTER,
  HR_REGISTER,
  MANAGER_FIRST_VISIT,
  HR_FIRST_VISIT,
} from "./helpers/constants";

fixture(`Critical - Registration`).page(HOMEPAGE).meta("travis", "run");

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

fixture(`Critical - Registration`).page(HOMEPAGE).meta("travis", "run");
// Skip when writing new tests
// fixture.skip(`Critical - Registration`);

test("Registration - Applicant", async (t) => {
  await t
    .useRole(Role.anonymous())
    .click(Selector("a").withText("Register"))
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .click(Selector("#contact_language"))
    .click(Selector("#contact_language").find("option").withText("English"))
    .click(Selector("#job_alerts"))
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"));
  await assertIsLoggedIn(t);
});

test("Registration - Manager", async (t) => {
  await t
    .useRole(Role.anonymous())
    .navigateTo(MANAGER_REGISTER)
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .click(Selector("#contact_language"))
    .click(Selector("#contact_language").find("option").withText("English"))
    .click(Selector("#job_alerts"))
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

test("Registration - HR Advisor", async (t) => {
  await t
    .useRole(Role.anonymous())
    .navigateTo(HR_REGISTER)
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .click(Selector("#contact_language"))
    .click(Selector("#contact_language").find("option").withText("English"))
    .click(Selector("#job_alerts"))
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

fixture(`Critical - First Visit`).page(HOMEPAGE);

test("First Visit - Manager", async (t) => {
  await t
    .useRole(Role.anonymous())
    .click(Selector("a").withText("Register"))
    .typeText(Selector("#first_name"), "Test")
    .typeText(Selector("#last_name"), "Cafe")
    .typeText(Selector("#email"), randomEmail())
    .click(Selector("#contact_language"))
    .click(Selector("#contact_language").find("option").withText("English"))
    .click(Selector("#job_alerts"))
    .typeText(Selector("#password"), "Password123!@#")
    .typeText(Selector("#password-confirm"), "Password123!@#")
    .click(Selector("button").withText("Register"));
  await assertIsLoggedIn(t);
  await t
    .navigateTo(MANAGER_FIRST_VISIT)
    .expect(Selector("#department").visible)
    .ok()
    .click(Selector("#department"))
    .click(Selector("#department").find("option").withText("Not in Government"))
    // Gov email field should be visible after selecting a department
    .expect(Selector("#gov_email").visible)
    .notOk()
    .click(Selector("button").withAttribute("type", "submit"))
    // Should now be on the manager homepage
    .expect(getPageUrl())
    .match(/\/manager$/);
});

test("First Visit - HR Advisor", async (t) => {
  await t
    .useRole(hrUser)
    .navigateTo(HR_FIRST_VISIT)
    .wait(200)
    .expect(Selector("h1").withText("HR Advisor Area").visible)
    .ok()
    .click(Selector("#department"))
    .click(
      Selector("#department").find("option").withText("Global Affairs Canada"),
    )
    // Gov email field should be visible after selecting a department
    .expect(Selector("#gov_email").visible)
    .ok()
    .click(Selector("button").withText("Continue"))
    // Should now be on the HR advisor homepage
    .expect(Selector("p").withText("You're visiting the HR Portal.").visible)
    .ok();
});

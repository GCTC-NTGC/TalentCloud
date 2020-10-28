import { Selector, Role } from "testcafe";
import {
  HOMEPAGE,
  LOGIN,
  MANAGER_LOGIN,
  HR_LOGIN,
  ADMIN_LOGIN,
} from "./constants";

// Logins for each user role, allows quick switching / authentication.
export const applicantUser = Role(LOGIN, async (t) => {
  await t
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const emptyApplicantUser = Role(LOGIN, async (t) => {
  await t
    .typeText(Selector("#email"), "newApplicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const managerUser = Role(MANAGER_LOGIN, async (t) => {
  await t
    .typeText(Selector("#email"), "manager@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const hrUser = Role(HR_LOGIN, async (t) => {
  await t
    .typeText(Selector("#email"), "hr_advisor@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const adminUser = Role(ADMIN_LOGIN, async (t) => {
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const assertIsLoggedIn = async (t) => {
  return t.expect(Selector("a").withText("Logout").visible).ok();
};

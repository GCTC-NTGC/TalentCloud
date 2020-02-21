import { Selector, Role } from "testcafe";

// Logins for each user role, allows quick switching / authentication.
export const applicantUser = Role("https://talent.test/login", async t => {
  await t
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const emptyApplicantUser = Role("https://talent.test/login", async t => {
  await t
    .typeText(Selector("#email"), "newApplicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const managerUser = Role(
  "https://talent.test/manager/login",
  async t => {
    await t
      .typeText(Selector("#email"), "manager@test.com")
      .typeText(Selector("#password"), "password")
      .click(Selector("button").withText("Login"));
  },
);

export const adminUser = Role("https://talent.test/admin/login", async t => {
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

export const assertIsLoggedIn = async t => {
  return t.expect(Selector("a").withText("Logout").visible).ok();
};

import { Selector, Role } from "testcafe";

// Logins for each user role, allows quick switching / authentication.
export const applicantUser = Role("http://localhost/login", async t => {
  await t
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const managerUser = Role("http://localhost/manager/login", async t => {
  await t
    .typeText(Selector("#email"), "manager@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"));
});

export const adminUser = Role("http://localhost/admin/login", async t => {
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

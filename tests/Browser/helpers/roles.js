import { Selector, Role } from "testcafe";

// Logins for each user role, allows quick switching / authentication.
export const applicantUser = Role("http://talent.test/login", async t => {
  await t
    .typeText("#email", "applicant@test.com")
    .typeText("#password", "password")
    .pressKey("enter");
});

export const managerUser = Role("http://talent.test/manager/login", async t => {
  await t
    .typeText("#email", "manager@test.com")
    .typeText("#password", "password")
    .pressKey("enter");
});

export const adminUser = Role("http://talent.test/admin/login", async t => {
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

import { Selector } from "testcafe";

fixture(`Critical`).page(`talent.test`);

test("Applicant Profile", async t => {
  await t
    // Login as test applicant.
    // TODO: register new user instead
    .click(Selector("a").withText("Login"))
    .typeText(Selector("#email"), "applicant@test.com")
    .typeText(Selector("#password"), "password")
    .click(Selector("button").withText("Login"))

    // Experience page (incomplete).
    .navigateTo("/profile/experience")
    .expect(Selector("h1").withText("My Experience").visible)
    .ok()
    .click(Selector("button").withText("Add Diploma/Degree"))
    .expect(
      Selector("select").withAttribute("id", "degrees[new][1]degreeType")
        .visible,
    )
    .ok()
    .pressKey("tab")
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

    // Skills page (incomplete).
    // Regression test for skill help modal.
    .navigateTo("/profile/skills")
    .expect(Selector("h1").withText("My Skills").visible)
    .ok()
    .click(Selector("button").withText("Add Skill"))
    .click(Selector("button").withText("(Need help? See example.)"))
    .expect(Selector("h3").withText("Writing my application").visible)
    .ok()
    .click(Selector("button").withText("Got it!"))

    // About page
    .navigateTo("/profile/about")
    .expect(Selector("h1").withText("About Me").visible)
    .ok()
    .typeText(
      Selector(".form__input").withAttribute("name", "old_password"),
      "password",
    )
    .typeText(
      Selector(".form__input").withAttribute("name", "new_password"),
      "Password123!@#",
    )
    .typeText(
      Selector(".form__input").withAttribute(
        "name",
        "new_password_confirmation",
      ),
      "Password123!@#",
    )
    .selectText(
      Selector(".form__input").withAttribute("name", "twitter_username"),
    )
    .typeText(
      Selector(".form__input").withAttribute("name", "twitter_username"),
      "realDonaldTrump",
    )
    .selectText(Selector(".form__input").withAttribute("name", "linkedin_url"))
    .typeText(
      Selector(".form__input").withAttribute("name", "linkedin_url"),
      "https://www.linkedin.com/in/grantbarnes/",
    )
    .selectText(Selector(".form__input").withAttribute("name", "tagline"))
    .typeText(
      Selector(".form__input").withAttribute("name", "tagline"),
      "I didn't do it.",
    )
    .click(Selector("button").withText("Save Changes"))
    .expect(Selector("input").withAttribute("value", "I didn't do it.").exists)
    .ok()
    .click(Selector("a").withText("My Skills"))
    .expect(Selector("h1").withText("My Skills").visible)
    .ok()
});

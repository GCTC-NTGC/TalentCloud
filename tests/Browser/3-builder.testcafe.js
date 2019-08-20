import { Selector } from "testcafe";
import { managerUser } from "./helpers/roles";

fixture(`Critical - Job Poster Builder`).page(`talent.test`);

// Skip when writing new tests
// fixture.skip(`Critical - Job Poster Builder`);

test("Job Poster Builder - Welcome", async t => {
  await t
    // Login as manager.
    .useRole(managerUser)
    // Go to Job Poster Builder.
    .navigateTo("/manager/jobs/builder")
    .expect(Selector("h3").withText("Welcome to the Job Poster Builder").visible)
    .ok()
    .typeText(
      Selector("input").withAttribute("id", "builder01ManagerJobTitleEN"),
      "Design Manager",
    )
    .typeText(
      Selector("input").withAttribute("id", "builder01ManagerJobTitleFR"),
      "Gestionnaire de la conception",
    )
    .click(Selector("select").withAttribute("id", "builder01ManagerDepartment"))
    .click(
      Selector("select")
        .withAttribute("id", "builder01ManagerDepartment")
        .find("option")
        .withAttribute("value", "7"),
    )
    .typeText(Selector("input").withAttribute("id", "builder01ManagerDivisionEN"), "Digital Change")
    .typeText(Selector("input").withAttribute("id", "builder01ManagerDivisionFR"), "Changement numérique")
    .click(Selector("button").withText("Continue in English"))
    .expect(Selector("h3").withText("Job Details").visible)
    .ok()
    .typeText(
      Selector("input").withAttribute("id", "builder02JobTitle"),
      "Product Designer",
    )
    .typeText(
      Selector("input").withAttribute("id", "builder02TermLength"),
      "7",
    )
    .click(Selector("select").withAttribute("id", "builder02Classification"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Classification")
        .find("option")
        .withAttribute("value", "CS"),
    )
    .click(Selector("select").withAttribute("id", "builder02Level"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Level")
        .find("option")
        .withAttribute("value", "3"),
    )
    .click(Selector("select").withAttribute("id", "builder02SecurityLevel"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02SecurityLevel")
        .find("option")
        .withAttribute("value", "2"),
    )
    .click(Selector("select").withAttribute("id", "builder02Language"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Language")
        .find("option")
        .withAttribute("value", "1"),
    )
    .typeText(
      Selector("input").withAttribute("id", "builder02City"),
      "Ottawa",
    )
    .click(Selector("select").withAttribute("id", "builder02Province"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Province")
        .find("option")
        .withAttribute("value", "9"),
    )
    .click(Selector("button").withText("Save & Preview"))
    .expect(Selector("h5").withText("You're off to a great start!").visible)
    .ok();
});

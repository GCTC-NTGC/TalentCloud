import { Selector } from "testcafe";
import { managerUser } from "./helpers/roles";
import { HOMEPAGE, JOB_BUILDER } from "./helpers/constants";

fixture(`Critical - Job Poster Builder`).page(HOMEPAGE).meta("travis", "run");

// Skip when writing new tests
// fixture.skip(`Critical - Job Poster Builder`);

test("Job Poster Builder - New Job", async (t) => {
  await t
    // Login as manager.
    .useRole(managerUser)
    // Go to Job Poster Builder.
    .navigateTo(JOB_BUILDER)
    .expect(
      Selector("h3").withText("Welcome to the Job Poster Builder").visible,
    )
    .ok()
    // Welcome page.
    .selectText(Selector("input").withAttribute("id", "managerPositionEn"))
    .pressKey("delete")
    .typeText(
      Selector("input").withAttribute("id", "managerPositionEn"),
      "Design Manager",
    )
    .selectText(Selector("input").withAttribute("id", "managerPositionFr"))
    .pressKey("delete")
    .typeText(
      Selector("input").withAttribute("id", "managerPositionFr"),
      "Gestionnaire de la conception",
    )
    .expect(Selector("span").withAttribute("id", "department").visible)
    .ok()
    .selectText(Selector("input").withAttribute("id", "divisionEN"))
    .pressKey("delete")
    .typeText(
      Selector("input").withAttribute("id", "divisionEN"),
      "Digital Change",
    )
    .selectText(Selector("input").withAttribute("id", "divisionFR"))
    .pressKey("delete")
    .typeText(
      Selector("input").withAttribute("id", "divisionFR"),
      "Changement numérique",
    )
    .click(Selector("button").withText("Continue in English"))
    // Job Info page.
    .expect(Selector("h3").withText("Job Details").visible)
    .ok()
    .typeText(
      Selector("input").withAttribute("id", "builder02JobTitle"),
      "Product Designer",
    )
    .typeText(Selector("input").withAttribute("id", "builder02TermLength"), "7")
    .click(Selector("select").withAttribute("id", "builder02Classification"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Classification")
        .find("option")
        .withAttribute("value", "1"),
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
    .typeText(Selector("input").withAttribute("id", "builder02City"), "Ottawa")
    .click(Selector("select").withAttribute("id", "builder02Province"))
    .click(
      Selector("select")
        .withAttribute("id", "builder02Province")
        .find("option")
        .withAttribute("value", "9"),
    )
    .click(Selector("button").withText("Save & Preview"))
    // Job Info review.
    .expect(Selector("h4").withText("Job Information").visible)
    .ok()
    .expect(Selector("p").withText("Product Designer").visible)
    .ok()
    .expect(Selector("p").withText("7 months").visible)
    .ok()
    .expect(Selector("p").withText("Secret").visible)
    .ok()
    .expect(Selector("p").withText("English Essential").visible)
    .ok()
    .expect(Selector("p").withText("Ottawa").visible)
    .ok()
    .expect(Selector("p").withText("Ontario").visible)
    .ok()
    .expect(Selector("p").withText("AS").visible)
    .ok()
    .expect(Selector("p").withText("3").visible)
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Work Environment page.
    .expect(Selector("h3").withText("Work Environment").visible)
    .ok()
    .typeText(Selector("input").withAttribute("id", "teamSize"), "77")
    .wait(200)
    .click(Selector("input").withAttribute("value", "smudging"))
    .wait(200)
    .click(Selector("input").withAttribute("value", "collaboration"))
    .wait(200)
    .click(Selector("input").withAttribute("value", "downtown"))
    .wait(200)
    // For some reason, deleting and retyping the teamSize input gets it recognized correctly
    .selectText(Selector("input").withAttribute("id", "teamSize"))
    .pressKey("delete")
    .typeText(Selector("input").withAttribute("id", "teamSize"), "77")
    .wait(200)
    .click(Selector("input").withAttribute("id", "culturePace04"))
    .wait(200)
    .click(Selector("input").withAttribute("id", "mgmtStyle02"))
    .wait(200)
    .click(Selector("input").withAttribute("id", "experimental03"))
    .wait(200)
    .click(Selector("input").withAttribute("id", "facing01"))
    .wait(200)
    .click(Selector("input").withAttribute("id", "collaborativeness04"))
    .wait(200)
    .click(Selector("button").withText("Save & Preview"))
    // Work Environment review.
    .expect(Selector("span").withText("77").visible)
    .ok()
    .expect(Selector("h4").withText("Work Culture").visible)
    .ok()
    .expect(
      Selector("p").withText(
        "Our work is ongoing so there aren't very many deadlines.",
      ).visible,
    )
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Impact page.
    .expect(Selector("h3").withText("Create an Impact Statement").visible)
    .ok()
    .wait(2000)
    .expect(Selector("p").withAttribute("id", "deptImpactStatement").visible)
    .ok()
    .typeText(
      Selector("textarea").withAttribute("id", "TeamImpact"),
      "Blah de blah blah.",
    )
    .typeText(
      Selector("textarea").withAttribute("id", "HireImpact"),
      "Bibbity bobbity blah.",
    )
    .click(Selector("button").withText("Save & Preview"))
    // Impact review.
    .expect(Selector("h5").withText("Awesome work!").visible)
    .ok()
    .expect(Selector("p").withAttribute("id", "deptImpactPreview").visible)
    .ok()
    .expect(Selector("p").withText("Blah de blah blah.").visible)
    .ok()
    .expect(Selector("p").withText("Bibbity bobbity blah.").visible)
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Key Tasks page.
    .expect(Selector("h3").withText("Add Key Tasks").visible)
    .ok()
    .click(Selector("button").withText("Add a Task"))
    .typeText(
      Selector("textarea").withAttribute("name", "tasks.0.description"),
      "Chopping",
    )
    .click(Selector("button").withText("Add a Task"))
    .typeText(
      Selector("textarea").withAttribute("name", "tasks.1.description"),
      "Grilling",
    )
    .click(Selector("button").withText("Add a Task"))
    .typeText(
      Selector("textarea").withAttribute("name", "tasks.2.description"),
      "Seasoning",
    )
    .click(Selector("button").withText("Add a Task"))
    .typeText(
      Selector("textarea").withAttribute("name", "tasks.3.description"),
      "Disco dancing",
    )
    .click(Selector("button").withText("Save & Preview Tasks"))
    // Key Tasks review.
    .expect(Selector("h5").withText("Keep it up!").visible)
    .ok()
    .expect(Selector("li").withText("Chopping").visible)
    .ok()
    .expect(Selector("li").withText("Grilling").visible)
    .ok()
    .expect(Selector("li").withText("Seasoning").visible)
    .ok()
    .expect(Selector("li").withText("Disco dancing").visible)
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Skills page.
    .expect(Selector("h3").withText("Skills").visible)
    .ok()
    .click(
      Selector("#jpb-occupational-skills")
        .find(".jpb-skill-cloud")
        .find(".jpb-skill-trigger")
        .nth(0),
    )
    .expect(Selector("h5").withText("Add a skill").visible)
    .ok()
    .click(Selector("input").withAttribute("id", "asset"))
    .click(Selector("button").withText("Add Skill"))
    .expect(Selector("h3").withText("Skills").visible)
    .ok()
    .wait(3000)
    .click(Selector("select").withAttribute("id", "jpb-all-skills-select"))
    .click(
      Selector("select")
        .withAttribute("id", "jpb-all-skills-select")
        .find("option")
        .nth(1),
    )
    .expect(Selector("h5").withText("Add a skill").visible)
    .ok()
    .click(Selector("input").withAttribute("id", "advanced"))
    .click(Selector("button").withText("Add Skill"))
    .expect(Selector("h3").withText("Skills").visible)
    .ok()
    .wait(500)
    .click(Selector("button").withText("Save & Preview Skills"))
    // Skills review.
    .expect(Selector("h5").withText("Keep it up!").visible)
    .ok()
    .expect(Selector(".criterion-item").exists)
    .ok()
    .wait(200)
    .click(Selector("button").withText("Next Step"))
    // Review page.
    .expect(Selector("p").withText("Product Designer").visible)
    .ok()
    .expect(Selector("p").withText("Design Manager").visible)
    .ok()
    .click(Selector("button").withText("Save and Return to Summary"))
    // Review confirmation.
    .expect(
      Selector("h5").withText("Congrats! Are You Ready to Submit?").visible,
    )
    .ok()
    .wait(200)
    .click(Selector("button").withText("Yes, Submit"))
    .wait(200)
    .click(Selector("a").withText("Go back to My Job Posters"))
    // Taken back to the Job index page
    .expect(Selector("h1").withText("My Job Posters").visible)
    .ok()
    .expect(Selector("a").withText("Product Designer").visible)
    .ok();
});

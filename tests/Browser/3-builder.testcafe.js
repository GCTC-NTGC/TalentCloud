import { Selector } from "testcafe";
import { managerUser } from "./helpers/roles";

fixture(`Critical - Job Poster Builder`).page(`talent.test`);

// Skip when writing new tests
// fixture.skip(`Critical - Job Poster Builder`);

test("Job Poster Builder - New Job", async t => {
  await t
    // Login as manager.
    .useRole(managerUser)
    // Go to Job Poster Builder.
    .navigateTo("/manager/jobs/builder")
    .expect(Selector("h3").withText("Welcome to the Job Poster Builder").visible)
    .ok()
    // Welcome page.
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
    .typeText(Selector("input").withAttribute("id", "builder01ManagerDivisionEN"),
      "Digital Change",
    )
    .typeText(Selector("input").withAttribute("id", "builder01ManagerDivisionFR"),
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
    .expect(Selector("p").withText("CS").visible)
    .ok()
    .expect(Selector("p").withText("3").visible)
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Work Environment page.
    .expect(Selector("h3").withText("Work Environment").visible)
    .ok()
    .typeText(
      Selector("input").withAttribute("id", "teamSize"),
      "77",
    )
    .click(Selector("input").withAttribute("id", "smudging"))
    .click(Selector("input").withAttribute("id", "culturePace04"))
    .click(Selector("input").withAttribute("id", "mgmtStyle02"))
    .click(Selector("input").withAttribute("id", "experimental03"))
    .click(Selector("input").withAttribute("id", "facing01"))
    .click(Selector("input").withAttribute("id", "collaborativeness04"))
    .click(Selector("button").withText("Save & Preview"))
    // Work Environment review.
    .expect(Selector("span").withText("77").visible)
    .ok()
    .expect(Selector("h4").withText("Work Culture").visible)
    .ok()
    .expect(Selector("p").withText("Our work is ongoing so there aren't very many deadlines. We don't usually have to balance tasks and our priorities change rarely. We thrive on routine. We have some middle management here but make most day-to-day decisions ourselves. Don’t be surprised to interact fairly often with our executives. Our work includes some administrative tasks are repeated on a regular basis. The tools we use work well for us but we are open to improving our processes. We are the face of the service we deliver and spend most of our time engaging directly with the public. Our team has diverse backgrounds, viewpoints, and skills and we play to each others strengths. We collectively own the team’s goals and are always looking for ways to pitch in.").visible)
    .ok()
    .click(Selector("button").withText("Next Step"))
    // Impact page.
    .expect(Selector("h3").withText("Create an Impact Statement").visible)
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
    .expect(Selector("p").withText("Global Affairs Canada manages Canada's diplomatic relations, provides consular services to Canadians, promotes the country's international trade, and leads Canada's international development and humanitarian assistance.").visible)
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
    .expect(Selector("h5").withText("Keep it up!"))
    .ok()
    .expect(Selector("li").withText("Chopping"))
    .ok()
    .expect(Selector("li").withText("Grilling"))
    .ok()
    .expect(Selector("li").withText("Seasoning"))
    .ok()
    .expect(Selector("li").withText("Disco dancing"))
    .ok();
});

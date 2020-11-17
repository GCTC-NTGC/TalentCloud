import { Selector, t } from "testcafe";

function modal(titleText) {
  const header = Selector(".application-experience-dialog h5").withText(
    titleText,
  );
  const container = header.parent(".application-experience-dialog");
  const cancelBtn = Selector(".application-experience-dialog button").withText(
    "Cancel",
  );
  const saveBtn = Selector(".application-experience-dialog button").withText(
    "Save Experience",
  );
  const openBtn = Selector("button").withText(titleText);
  const assertIsOpen = () => {
    return t
      .expect(container.visible)
      .ok()
      .expect(container.getStyleProperty("opacity"))
      .eql("1");
  };
  const assertNotOpen = () => {
    return t.expect(container.getStyleProperty("opaicty")).eql("0");
  };
  return {
    container,
    header,
    cancelBtn,
    saveBtn,
    openBtn,
    assertIsOpen,
    assertNotOpen,
  };
}

export function educationModal() {
  const title = "Add Education";
  const baseModal = modal(title);

  const inputs = {
    type: Selector("#education-educationTypeId"),
    areaOfStudy: Selector("#education-areaOfStudy"),
    institution: Selector("#education-institution"),
    status: Selector("#education-educationStatusId"),
    startDate: Selector("#education-startDate"),
    isActive: Selector("#education-isActive"),
    endDate: Selector("#education-endDate"),
    thesis: Selector("education-thesisTitle"),
    hasBlockcert: Selector("education-hasBlockcert"),
  };

  const fakeValues = {
    type: "Diploma",
    areaOfStudy: "Software Engineering",
    institution: "University of Toronto",
    status: "Complete (credential awarded)",
    startDate: "2010-09-01",
    endDate: "2015-04-30",
  };

  const fillForm = async () => {
    return t
      .click(inputs.type)
      .click(inputs.type.child("option").withText(fakeValues.type))
      .typeText(inputs.areaOfStudy, fakeValues.areaOfStudy)
      .typeText(inputs.institution, fakeValues.areaOfStudy)
      .click(inputs.status)
      .click(inputs.status.child("option").withText(fakeValues.status))
      .typeText(inputs.startDate, fakeValues.startDate)
      .typeText(inputs.endDate, fakeValues.endDate);
  };
  // A selector for an accordion that matches the values entered in fillForm function.
  const accordion = Selector("div[data-c-accordion]").withText(
    `${fakeValues.type} in ${fakeValues.areaOfStudy}`,
  );
  const accordionBody = accordion.child("[data-c-accordion-content]");

  return {
    ...baseModal,
    inputs,
    fakeValues,
    fillForm,
    accordion,
    accordionBody,
  };
}
export function workModal() {
  return modal("Add Work Experience");
}
export function communityModal() {
  return modal("Add Community Experience");
}
export function personalModal() {
  return modal("Add Personal Experience");
}
export function awardModal() {
  return modal("Add an Award");
}

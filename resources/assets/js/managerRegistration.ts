const getDeptInput = (): HTMLSelectElement | null =>
  document.querySelector("select#department");
const getGovEmailWrapper = () => document.querySelector("#gov_email_wrapper");
const getGovEmailInput = (): HTMLInputElement | null =>
  document.querySelector("input#gov_email");

const hideGovEmail = (): void => {
  const wrapper = getGovEmailWrapper();
  if (wrapper !== null) {
    wrapper.setAttribute("data-c-visibility", "hidden");
  }
  const input = getGovEmailInput();
  if (input !== null) {
    input.removeAttribute("required");
  }
};

const showGovEmail = (): void => {
  const wrapper = getGovEmailWrapper();
  if (wrapper !== null) {
    wrapper.removeAttribute("data-c-visibility");
  }
  const input = getGovEmailInput();
  if (input !== null) {
    input.setAttribute("required", "");
  }
};

const handleDeptChange = (event: Event): void => {
  if (event.target instanceof HTMLSelectElement) {
    const value = event.target.value;
    const NOT_IN_GOV = "0";
    if (value !== null && value !== "" && value !== NOT_IN_GOV) {
      showGovEmail();
    } else {
      hideGovEmail();
    }
  }
};

const deptInput = getDeptInput();
if (deptInput !== null) {
  deptInput.addEventListener("change", handleDeptChange);
}

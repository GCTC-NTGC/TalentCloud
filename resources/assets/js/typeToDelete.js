// Settings ===============================================
const emailInput = document.querySelector("#email");
const deleteInput = document.querySelector("#confirm_delete");
const deleteButton = document.querySelector("#delete_account");

deleteInput.addEventListener("keyup", () => {
    deleteButton.disabled = !(deleteInput.value === email.value);
  });

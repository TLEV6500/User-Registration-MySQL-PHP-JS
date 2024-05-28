"use strict";

const setConstraintMessage = (inputElement, message) => {
  if (!inputElement) return;
  inputElement.setCustomValidity(message);
  return;
};

const runValidityCheck = (inputElement) => {
  if (!inputElement) return null;
  const isValid = inputElement.checkValidity();
  if (isValid) {
    setConstraintMessage(inputElement, "");
  }
  else {
    setConstraintMessage(inputElement, inputElement.title);
    inputElement.reportValidity();
  }
  return isValid;
};

const confirmPassword = (pass1, pass2) => {
  if (!pass1 || !pass2) return;
  if (pass1.value !== pass2.value) {
    setConstraintMessage(pass2, "Passwords don't match!");
    pass2.reportValidity();
    return false;
  }
  else {
    setConstraintMessage(pass2, "");
    return true;
  }
}

export { setConstraintMessage, runValidityCheck, confirmPassword };
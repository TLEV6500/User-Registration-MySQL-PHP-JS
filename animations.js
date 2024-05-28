import { confirmPassword, runValidityCheck } from "./formValidation.mjs";
import { getElement } from "./htmlInterface.mjs";

const primaryBtn = getElement('.btn-primary');
const backBtn = getElement('.btn-return');
const nextBtn = getElement('.btn-next');
const welcomeSect = getElement('#section_welcome');
const formSect = getElement('#main_form');
const formBody = getElement('#form_body');
let currentView = getElement('[data-cur-view="true"]');
let currentFields = [formBody.children[0], formBody.children[1]];

const hide = (element, from) => {
  element.classList.add(`hide-${from === 'left' ? 'right' : 'left'}`);
};

const show = (element, from) => {
  element.classList.remove(`hide-${from}`);
};

const changeView = (cur, next, direction) => {
  if (!cur || !next) return;
  cur.dataset.curView = false;
  hide(cur, direction);
  currentView = next;
  currentView.dataset.curView = true;
  show(currentView, direction)
};

const nextBtnClickHandler = () => {
  const input1 = currentFields[0]?.children[1];
  const input2 = currentFields[1]?.children[1];
  if (input1?.dataset.userInput) {
    if (!runValidityCheck(input1)) return;
  }
  if (input2?.dataset.userInput) {
    if (!runValidityCheck(input2)) return;
  }
  if (input2?.type === 'password') {
    if (!confirmPassword(input1, input2)) return;
  }
  proceedToNextFields();
};

const proceedToNextFields = () => {
  if (!currentFields[0] || !currentFields[1]) return;
  if (!(currentFields[1].nextElementSibling.nextElementSibling)) {
    nextBtn.classList.add('hide');
    console.log('nxt');
  }
  for (const field of currentFields) {
    if (!field) break;
    field.dataset.curView = false;
    field.children[1].tabIndex = -1;
    hide(field, 'right');
  }
  currentFields[0] = currentFields[1].nextElementSibling;
  currentFields[1] = currentFields[0].nextElementSibling;
  for (const field of currentFields) {
    if (!field) break;
    field.dataset.curView = true;
    field.children[1].tabIndex = 1;
    show(field, 'right');
  }
  // currentFields[0].children[1].focus({ preventScroll: true });
};

const prevFields = () => {
  if (!currentFields[0]) return;
  if (!currentFields[1]?.nextElementSibling) {
    nextBtn.classList.remove('hide');
    console.log('back');
  }
  for (const field of currentFields) {
    if (!field) break;
    field.dataset.curView = false;
    field.children[1].tabIndex = -1;
    hide(field, 'left');
  }
  currentFields[1] = currentFields[0].previousElementSibling;
  currentFields[0] = currentFields[1].previousElementSibling;
  for (const field of currentFields) {
    if (!field) break;
    field.dataset.curView = true;
    field.children[1].tabIndex = 1;
    show(field, 'left');
  }
  // currentFields[0].children[1].focus({ preventScroll: true });
};

const slideToForm = function slideToForm_Self() {
  changeView(currentView, formSect, 'right');
  primaryBtn.tabIndex = -1;
  formBody.children[0].dataset.curView = true;
  formBody.children[1].dataset.curView = true;
  formBody.children[0].children[1].tabIndex = 1;
  formBody.children[1].children[1].tabIndex = 1;
  currentFields[0].children[1].focus({ preventScroll: true });
};

const returnView = () => {
  if (welcomeSect.dataset.curView == 'true') return;
  if (formBody.children[0].dataset.curView == 'true') {
    formBody.children[0].dataset.curView = false;
    formBody.children[1].dataset.curView = false;
    changeView(currentView, welcomeSect, 'left');
  }
  else {
    prevFields();
  }
};

for (const child of formBody.children) {
  if (child === formBody.children[0] || child === formBody.children[1]) continue;
  child.classList.add('hide-right');
}

backBtn.addEventListener('click', returnView);
nextBtn.addEventListener('click', nextBtnClickHandler);
primaryBtn.addEventListener('click', slideToForm);

formBody.addEventListener('submit', (e) => {
  if (!formBody.lastElementChild.dataset.curView) {
    e.preventDefault();
  }
});

/**  TODO
 * Add: function to move to the next form section/view
 * Test: If back btn works properly
 */
"use strict";
import { toKebabCase, toSnakeCase } from "./formatter.mjs";
import { createElement, initHTMLChildren, initHTMLElement } from "./htmlInterface.mjs";


export default class RegistrationForm {
  #HTML = new Map();
  #HTMLRoot;

  #initHTMLFieldset(labelElement, inputElement, baseId) {
    const fieldSet = initHTMLElement(
      (id, element) => this.#HTML.set(id, element),
      'fieldset',
      baseId,
    );
    fieldSet.replaceChildren(labelElement, inputElement);
    return fieldSet;
  }

  /* fields: {
    fieldLabel:[
      HTMLInputType:'',
      HTMLInputAttributes:{},
      children:{
        [
          HTMLType: '',
          innerText:'',
          HTMLAttributes:{}
        ],
        ...
      }
    ],
    ...
  };
  rootId: ValidHTMLId:'';
  */
  #initFields(fields) {
    for (const [label, data] of Object.entries(fields)) {
      const [HTMLInputType, HTMLAttributes, children] = data;
      const baseId = toSnakeCase(label);
      const baseClassName = toKebabCase(label);

      const inputElement = initHTMLElement(
        (id, element) => this.#HTML.set(id, element),
        HTMLInputType, baseId, baseClassName, HTMLAttributes
      );

      const labelElement = initHTMLElement(
        (id, element) => this.#HTML.set(id, element),
        'label', baseId, baseClassName,
        { htmlFor: inputElement.id, innerText: label }
      );

      if (children) initHTMLChildren(inputElement, children);

      const fieldSet = this.#initHTMLFieldset(labelElement, inputElement, baseId);
      this.#HTMLRoot.append(fieldSet);
    }
  }

  #initSubmitBtn(text) {
    const btn = initHTMLElement(
      (id, element) => this.#HTML.set(id, element),
      'input',
      this.#HTMLRoot.id + '_submit',
      'submit',
      { type: 'submit', value: text, }
    );
    this.#HTMLRoot.append(btn);
  }

  constructor(rootForm, fields = {}) {
    this.#HTMLRoot = rootForm;
    this.#initFields(fields);
    this.#initSubmitBtn('Login/Register');
  }

  // configureSubmit() {

  // }
}

/** TODO
 * Change #HTML to #FIELDS if you're only storing the label and their corresponding input elements of the form
 */
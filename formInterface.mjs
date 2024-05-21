"use strict";
import { toKebabCase, toSnakeCase } from "./formatter.mjs";
import { createElement, insertNewElement, wrapHTML } from "./htmlInterface.mjs";


export default class RegistrationForm {
  #HTML = new Map();
  #DATA = new Map();
  #HTMLRoot;

  #initHTMLElement(HTMLType, baseId, baseClassName, attributes) {
    const id = `${HTMLType}_${baseId}`;
    const element = createElement(HTMLType, {
      id,
      classList: [HTMLType, baseClassName],
      attributes
    });
    this.#HTML.set(id, element);
    return element;
  }

  #initHTMLChildren(element, children) {
    for (const [HTMLtype, innerText, childAttributes] of children) {
      const child = createElement(HTMLtype, {
        id: `${element.id}_${toSnakeCase(innerText)}`,
        attributes: { innerText, ...childAttributes }
      })
      element.append(child);
    }
    return;
  }

  #initHTMLFieldset(labelElement, inputElement, baseId) {
    const fieldSet = createElement('fieldset', {
      id: `fieldset_${baseId}`,
      attributes: { name: baseId }
    });
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

      const inputElement = this.#initHTMLElement(
        HTMLInputType, baseId, baseClassName, HTMLAttributes
      );

      const labelElement = this.#initHTMLElement(
        'label', baseId, baseClassName, { htmlFor: inputElement.id, innerText: label }
      );

      if (children) this.#initHTMLChildren(inputElement, children);

      const fieldSet = this.#initHTMLFieldset(labelElement, inputElement, baseId);
      this.#HTMLRoot.append(fieldSet);
    }
  }

  #initSubmitBtn(text) {
    const btn = createElement('input', {
      id: this.#HTMLRoot.id + 'submit',
      classList: ['submit'],
      attributes: {
        type: 'submit',
        value: text,
      }
    });
    this.#HTMLRoot.append(btn);
  }

  constructor(rootForm, fields = {}) {
    this.#HTMLRoot = rootForm;
    this.#initFields(fields);
    this.#initSubmitBtn('Login/Register');
  }
}


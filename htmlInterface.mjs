"use strict";
import { toKebabCase, toSnakeCase } from "./formatter.mjs";

const createElement = (tagName, { id = '', classList = [], attributes = {} } = {}) => {
  const element = document.createElement(tagName);
  element.id = id;
  for (const className of classList) {
    element.classList.add(className);
  }
  Object.keys(attributes).forEach((attribute) => element[attribute] = attributes[attribute]);
  return element;
};
const getElement = (query = '') => {
  if (query.length === 0) return null;
  return document.querySelector(query);
}

// attributes: {HTMLAttributes}
const insertNewElement = (target = null, { tagName = '', attributes = {} } = {}) => {
  if (!target) throw new Error('Parameter \'target\' of insertNewElement() is null or not specified!');
  const newElement = createElement(tagName, { attributes });
  target.append(newElement);
  return newElement;
}

const wrapHTML = (wrapperTagName, ...contents) => {
  const wrapper = createElement(wrapperTagName);
  wrapper.replaceChildren(...contents);
  return wrapper;
}

const initHTMLElement = (callback = (id, element) => { }, HTMLType, baseId, baseClassName, attributes) => {
  const id = `${HTMLType}_${baseId}`;
  const element = createElement(HTMLType, {
    id,
    classList: [HTMLType, ...(baseClassName ? [baseClassName] : [])],
    attributes
  });
  callback(id, element);
  return element;
}

const initHTMLChildren = (element, children) => {
  for (const [HTMLtype, innerText, childAttributes] of children) {
    const child = createElement(HTMLtype, {
      id: `${element.id}_${toSnakeCase(innerText)}`,
      attributes: { innerText, ...childAttributes }
    })
    element.append(child);
  }
  return;
}

export { createElement, getElement, insertNewElement, wrapHTML, initHTMLElement, initHTMLChildren };
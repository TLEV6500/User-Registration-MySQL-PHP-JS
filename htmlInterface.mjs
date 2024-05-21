"use strict";

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

export { createElement, insertNewElement, wrapHTML };
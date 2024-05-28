"use strict";

const toKebabCase = (string = '') => {
  const newString = string.toLowerCase().replace(/[\s\W]$/, '')
  return newString.replaceAll(/[\s\W]/g, '-');
};
const toSnakeCase = (string = '') => {
  const newString = string.toLowerCase().replace(/[\s\W]$/, '')
  return newString.replaceAll(/[\s\W]/g, '_');
};

export { toKebabCase, toSnakeCase };
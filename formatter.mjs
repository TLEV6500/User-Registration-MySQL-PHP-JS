"use strict";

const toKebabCase = (string = '') => string.toLowerCase().replace(/[\s\W]/, '-');
const toSnakeCase = (string = '') => string.toLowerCase().replace(/[\s\W]/, '_');

export { toKebabCase, toSnakeCase };
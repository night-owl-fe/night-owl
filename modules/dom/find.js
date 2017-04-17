export function find (selector, context) {
  context = context || document
  return context.querySelectorAll(selector);
}

export function findOne (selector, context) {
  context = context || document
  return context.querySelector(selector);
}
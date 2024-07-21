import params from "./var.js";

function add(a, b) {
  return a + b;
}

const { a, b } = params;
console.log(add(a, b));

export default add

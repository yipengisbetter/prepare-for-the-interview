var a = "father";

function outer () {
  var b = "son";

  console.log(a);

  inner();
  function inner() {
    var c = "grandson";

    console.log(a, b, c);
  }
}

outer();

function fn() {
  console.log(a1, b1);

  var a1;

  function b1() {
    return "I am b1";
  }
}

fn();

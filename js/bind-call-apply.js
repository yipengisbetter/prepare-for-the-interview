(
  function (w, d) {
    function myBind(fn, b) {
      if (typeof fn !== "function" && typeof b !== "object") return;

      return function () {
        return fn.apply(b, arguments);
      }
    }

    function myCall(fn, b) {
      if (typeof fn !== "function" && typeof b !== "object") return;

      b["@@fn"] = fn;

      var result = b["@@fn"]();

      delete b["@@fn"];

      return result;
    }

    function myApply(fn, b, param) {
      if (typeof fn !== "function" && typeof b !== "object") return;

      b["@@fn"] = fn;

      var result = b["@@fn"](...param);

      delete b["@@fn"];

      return result;
    }

    var bindResult = run("myBind", myBind, function () { return this; }, { type: "test" });
    console.log(bindResult());
    run("myCall", myCall, function () { return this; }, { type: "test" });
    run("myApply", myApply, function (name) { return { this: this, name }; }, { type: "test" }, ["apply test"]);
  }
)(window, document);

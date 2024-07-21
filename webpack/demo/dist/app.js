
        const modules = {"./add.js":"\n      (function () {\n        const params = __webpack_require__(\"./var.js\");\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconst { a, b } = params;\nconsole.log(add(a, b));\n\nreturn add\n\n      })()\n    ","./var.js":"\n      (function () {\n        const CONST = __webpack_require__(\"./const.js\");\n\nreturn {\n  a: CONST.A,\n  b: 2\n}\n\n      })()\n    ","./const.js":"\n      (function () {\n        return {\n  A: 1\n}\n\n      })()\n    ","./index.js":"\n      (function () {\n        const add = __webpack_require__(\"./add.js\");\n\nconsole.log(add(1, 1));\n\n      })()\n    "};
        function __webpack_require__ (moduleId) {
          const module = modules[moduleId];
          return eval(module);
        }
        __webpack_require__("./index.js");
      
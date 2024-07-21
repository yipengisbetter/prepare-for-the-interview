const fs = require("fs");
const path = require("path");

class Compiler {

  constructor(config) {
    console.log(config);
    this.config = config;
    this.modules = {};
    this.root = process.cwd();
    this.entry = config.entry;
    this.output = config.output;
    this.rules = config.module && config.module.rules;
    this.loader = config.loader;
    this.plugins = config.plugins;

    this.run();
  }

  getSource(p) {
    let content = fs.readFileSync(p, "utf-8");

    return content;
  }

  emit() {
    const { path: p, filename } = this.output;
    const distPath = path.relative(this.root, p);
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath);
    }

    // Object.keys(this.modules).forEach(moduleKey => {
    //   fs.writeFileSync(
    //     path.join(
    //       distPath,
    //       moduleKey
    //     ),
    //     this.modules[moduleKey]
    //   )
    // })

    fs.writeFileSync(
      path.join(
        path.relative(this.root, p),
        filename
      ),
      `
        const modules = ${JSON.stringify(this.modules)};
        function __webpack_require__ (moduleId) {
          const module = modules[moduleId];
          return eval(module);
        }
        __webpack_require__("${this.entryId}");
      `
    )
  }

  parse(p, content) {
    const reg = /(import (.+) from \"(.+)\"|export default (.+))/g;

    content = content.replace(reg, ($, all, dependence, dependencePath, exportedDependence) => {
      if (exportedDependence) return `return ${exportedDependence}`;

      this.modules[dependencePath] = this.getSource(dependencePath);
      this.readFile(dependencePath);

      return `const ${dependence} = __webpack_require__("${dependencePath}")`;
    });

    this.modules[p] = `
      (function () {
        ${content}
      })()
    `;
  }

  readFile(p = this.entry) {
    console.log('p', p);
    const content = this.getSource(p);

    if (p === this.entry) {
      this.entryId = this.entry;
    }

    this.parse(p, content);
  }

  run() {
    this.readFile();
    this.emit();
  }

}

module.exports = Compiler;

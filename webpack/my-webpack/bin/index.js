#! /usr/bin/env node

const path = require("path");
const Compiler = require("../lib/Compiler");

const config = require(path.resolve('./my-webpack.config.js'));

new Compiler(config);

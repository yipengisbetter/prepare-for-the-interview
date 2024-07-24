#! /usr/bin/env node

const path = require("path");
const fs = require("fs");

const express = require('express');

const app = express();
const staticPath = "./";
const serverPort = 8081;

app.use(express.static(staticPath));

app.listen(serverPort, function () {
  console.log(`服务已在端口号${serverPort}启动`);
});

const entry = "./index.js";
const output = "dist";

function readFileContent(p) {
  return fs.readFileSync(p, "utf-8")
}

const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('@@something');

  function readFile(p = entry, code = readFileContent(p)) {
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    function startWrite(content = code) {
      fs.writeFileSync(
        path.join(
          output,
          path.basename(p)
        ),
        content
      )
    }
  
    startWrite();
  
    fs.watchFile(p, () => {
      console.log("write", p);
      startWrite(
        readFileContent(p)
      );
      ws.send("Reload")
    })
  
    const reg = /import .+ from \"(.+)\"/g;
  
    code.replace(reg, ($, $1) => {
      readFile($1);
    });
  }

  readFile();
});

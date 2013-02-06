/**
 * Module dependencies
 */
var express = require("express");

var app = module.exports = express();

var client = require('riemann').createClient({ host: process.env.RIEMANN_HOST, port: 5555 });

client.on('connect', function() {
  console.log("connected");
});

app.use(require("..")(client, {
  host: "test.localhost",
  service: "riemann-node-response-time-tests",
  description: "This is a test",
  tags: ["tests"]
}));

app.use(function(req, res, next) {
  setTimeout(function() {
    res.send("Hello world!");
  }, 300);
});

process.on('SIGTERM', function() {
  client.disconnect();
});

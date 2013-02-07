/**
 * Module dependencies
 */
var express = require("express");

var app = module.exports = express();

client.on('connect', function() {
  console.log("connected");
});

app.use(require("..")({
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

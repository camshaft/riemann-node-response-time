/**
 * Module dependencies
 */
var riemann = require("simple-riemann");

/**
 * 
 */
module.exports = function(client, config) {
  if (typeof config === "undefined") {
    config = client;
    client = riemann();
  };

  var ok = config.ok || 50
    , warning = config.warning || 1000;

  return function riemannResponseTime(req, res, next) {
    var start = new Date;

    if(res._riemannResponseTime) return next();
    res._riemannResponseTime = true;

    res.on(config.event || 'header', function() {
      var duration = new Date - start;
      client.send(client.Event({
        host: config.host,
        service: config.service,
        state: config.state || 
          (duration < ok ? "ok" : 
            (duration < warning ? "warning" : 
              "critical")),
        description: config.description,
        ttl: config.ttl,
        metric: duration,
        tags: config.tags
      }));
    });

    next();
  };
};

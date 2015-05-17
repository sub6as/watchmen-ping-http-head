var request = require('request');

function PingService(){}

exports = module.exports = PingService;

PingService.prototype.ping = function(service, callback){
  var startTime = +new Date();
  request.get({ method: 'HEAD', uri: service.url }, function(error, response, body){
    callback(error, body, response, +new Date() - startTime);
  });
};

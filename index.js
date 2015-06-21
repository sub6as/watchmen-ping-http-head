var request = require('request');

function PingService(){}

exports = module.exports = PingService;

PingService.prototype.ping = function(service, callback){
  var startTime = +new Date();
  var options = {
    method: 'HEAD',
    uri: service.url,
    timeout: service.timeout
  };
  request.get(options, function(error, response, body){
    callback(error, body, response, +new Date() - startTime);
  });
};

PingService.prototype.getDefaultOptions = function(){
  return {}; // no options needed for this service
}

var request = require('request');

function PingService() {
}

exports = module.exports = PingService;

PingService.prototype.ping = function (service, callback) {
  var startTime = +new Date();
  var options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
    },
    uri: service.url,
    port: service.port,
    family: 4,
    method: 'HEAD',
    timeout: service.timeout
  };

  var expectedStatusCode = 200;

  console.log(service.port);
  

  var serviceOptions = (service.pingServiceOptions && service.pingServiceOptions['http-head']) || {};
  if (serviceOptions.statusCode && serviceOptions.statusCode.value) {
    expectedStatusCode = parseInt(serviceOptions.statusCode.value, 10);
  }

  request(options, function (error, response, body) {
    if (error) {
      return callback(error, body, response, +new Date() - startTime);
    }
    if (response && response.statusCode != expectedStatusCode) {
      var errMsg = 'Invalid status code. Found: ' + response.statusCode +
          '. Expected: ' + expectedStatusCode;
      return callback(errMsg, body, response, +new Date() - startTime);
    }
    callback(null, body, response, +new Date() - startTime);
  });
};

PingService.prototype.getDefaultOptions = function () {
  return {
    'statusCode': {
      descr: 'Expected status code (defaults to 200)',
      required: false
    }
  };
};
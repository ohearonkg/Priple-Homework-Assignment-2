/**
 * The main file for the api
 */
var http = require("http");
var url = require("url");
var routes = require("./routes");
var StringDecoder = require("string_decoder").StringDecoder;
var helpers = require("./Util/helpers");

var server = http.createServer(function(req, res) {
  /**
   * Parsing the url to get the pathname
   * and the query string
   */
  var parsedUrl = url.parse(req.url, true); // added true parameter for query string
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  var queryStringObject = parsedUrl.query;

  var method = req.method;
  var headers = req.headers;

  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  /**
   * When we are done with the request
   * we perform our desired sending of
   * the response and logging actions
   */
  req.on("end", function() {
    buffer += decoder.end();

    var requestObject = {
      path: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      body: helpers.parseJsonToObject(buffer)
    };

    /**
     * Pass the data to the appropriate
     * route / handler
     */
    if (routes[trimmedPath] !== undefined) {
      /**
       * Pass the created object off
       * to its appropriate handler
       */
      routes[trimmedPath](requestObject, function(response) {
        res.writeHead(response.status);
        res.end(response.text);
      });
    } else {
      /**
       * Should we have no appropriate route
       * we return a 404
       */
      res.writeHead(404);
      res.end();
    }
  });
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
});

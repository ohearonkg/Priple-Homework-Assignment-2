/**
 * The main file for the api
 */
var http = require("http");
var data = require("./Util/data");
var constants = require("./constants");
var url = require("url");
var routes = require("./routes");

var server = http.createServer(function(req, res) {
  /**
   * Parsing the url to get the pathname
   * and the query string
   */
  var parsedUrl = url.parse(req.url, true); // added true parameter for query string
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  var queryString = parsedUrl.query;

  var method = req.method;
  var headers = req.headers;

  /**
   * Pass the data to the appropriate
   * route / handler
   */
  if (routes[trimmedPath] !== undefined) {
    /**
     * Pass the created object off
     * to its appropriate handler
     */
    routes[trimmedPath]({ a: "some Stuff" });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, function(req, res) {
  console.log("Listening on port 3000");
});

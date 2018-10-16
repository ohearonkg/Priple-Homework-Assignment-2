/**
 * This file is responsible
 * for routing requests to
 * the appropriate handler
 */
var routes = {
  users: usersHandler
};

var usersHandler = function(requestObject) {
  console.log("User handler with ", requestObject);
};

module.exports = routes;

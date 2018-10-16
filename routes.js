/**
 * This file is responsible
 * for routing requests to
 * the appropriate handler
 */

var usersHandler = function(requestObject) {
  console.log("User handler with ", requestObject);
};

var routes = {
  users: usersHandler
};

module.exports = routes;

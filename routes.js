/**
 * This file is responsible
 * for routing requests to
 * the appropriate handler
 */

var usersHandler = function(requestObject, callback) {
  console.log("User handler with ", requestObject);
  callback(false);
};

var routes = {
  users: usersHandler
};

module.exports = routes;

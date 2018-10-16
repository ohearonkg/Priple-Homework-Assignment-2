/**
 * This file is responsible
 * for routing requests to
 * the appropriate handler
 */
var user = require("./Users/create");

var usersHandler = function(requestObject, callback) {
  user._create(requestObject.body, function(error) {
    if (!error) {
      callback({ status: 200, text: "Successfully Created User." });
    } else {
      callback(error);
    }
  });
};

var routes = {
  users: usersHandler
};

module.exports = routes;

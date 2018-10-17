/**
 * This file is responsible
 * for routing requests to
 * the appropriate handler
 */
var users = require("./Users/users");
var constants = require("./constants");

var usersHandler = function(requestObject, callback) {
  var method = requestObject.method.toUpperCase();
  /**
   * First we check to ensure the user has requested
   * one the predetermined allowed methods
   */
  if (constants.allowedMethods.indexOf(method) !== -1) {
    /**
     * A POST request indicates that we are attempting
     * to create a user
     */
    if (method === "POST")
      users._create(requestObject.body, function(error) {
        if (!error) {
          callback({ status: 200, text: "Successfully Created User." });
        } else {
          callback(error);
        }
      });

    /**
     * A DELETE request indicates that we are attempting
     * to remove a user
     */
    if (method === "DELETE") {
      users._delete(requestObject.body, function(error) {
        if (!error) {
          callback({ status: 200, text: "Successfully Deleted User." });
        } else {
          callback(error);
        }
      });
    }
  } else {
    /**
     * If the user has requested a method other
     * than those allow, we return a 400
     */
    callback({ status: 400, text: "Invalid Method!" });
  }
};

var routes = {
  users: usersHandler
};

module.exports = routes;

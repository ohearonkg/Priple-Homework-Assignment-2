/**
 * This file is responsible for handling
 * the creation of a user
 */
var data = require("../Util/data");

user = {};

user._create = function(userObject, callBack) {
  /**
   * Validate all Fields
   */
  var firstName =
    typeof userObject.firstName == "string" &&
    userObject.firstName.trim().length > 0
      ? userObject.firstName
      : false;
  var lastName =
    typeof userObject.lastName == "string" &&
    userObject.lastName.trim().length > 0
      ? userObject.lastName
      : false;
  var email =
    typeof userObject.email == "string" &&
    userObject.email.trim().length > 0 &&
    userObject.email.indexOf("@") !== -1
      ? userObject.email
      : false;
  var address =
    typeof userObject.address == "string" &&
    userObject.address.trim().length > 0
      ? userObject.address
      : false;

  /**
   * Attempt to create the user
   */
  if (firstName && lastName && email && address) {
    /**
     * Attempt to read file for user
     */
    data._read("UsersData", email, function(error, userData) {
      if (!error && userData) {
        callBack({ status: 400, errorText: "User already exists!" });
      } else {
        console.log("can create user");
      }
    });
  } else {
    callBack(400, {
      Error: "Missing or incorrect parameters for user creation"
    });
  }
};

module.exports = user;

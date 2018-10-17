/**
 * This file is responsible for handling
 * CRUD operations for a user
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
     * Attempt to read file for user.
     *
     * No error indicates that the file can be read,
     * and hence a file with the user already exists.
     */
    data._read("UsersData", email, function(error, userData) {
      if (!error && userData) {
        callBack({ status: 400, text: "User already exists!" });
      } else {
        data._write("UsersData", email, JSON.stringify(userObject), function(
          error
        ) {
          if (!error) {
            callBack(false);
          } else {
            callBack(error);
          }
        });
      }
    });
  } else {
    callBack(400, {
      Error: "Missing or incorrect parameters for user creation"
    });
  }
};

user._delete = function(userObject, callBack) {
  /**
   * Validate the parmeters
   */
  email =
    typeof userObject.email == "string" &&
    userObject.email.length > 0 &&
    userObject.email.indexOf("@") !== -1
      ? userObject.email
      : false;

  if (email) {
    /**
     * Attempt to look up the user
     * within the user's collection
     */
    console.log(email);
    data._read("UsersData", email, function(error, userData) {
      if (!error && userData) {
        console.log("found user with email ", email);
      } else {
        callBack({ status: 400, text: "User does not exist" });
      }
    });
  } else {
    callBack({ status: 400, text: "Invalid email format" });
  }
};

module.exports = user;

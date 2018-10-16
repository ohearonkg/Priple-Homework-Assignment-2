/**
 * This file is responsible for handling
 * the creation of a user
 */
var data = require("./Util/data");

user = {};

user._create = function(firstName, lastName, email, address, callBack) {
  /**
   * Validate all Fields
   */
  var firstName =
    typeof firstName == "string" && firstName.trim().length > 0
      ? firstName
      : false;
  var lastName =
    typeof lastName == "string" && lastName.trim().length > 0
      ? lastName
      : false;
  var email =
    typeof email == "string" &&
    email.trim().length > 0 &&
    email.indexOf("@") !== -1
      ? email
      : false;
  var address =
    typeof address == "string" && address.trim().length > 0 ? address : false;

  /**
   * Attempt to create the user
   */
  if (firstName && lastName && email && address) {
    /**
     * Attempt to read file for user
     */
    data.read("UsersData", email, function(error, userData) {
      if (!error && userData) {
        console.log("can read");
      } else {
        callBack(400, { Error: "User already exists" });
      }
    });
  } else {
    callBack(400, {
      Error: "Missing or incorrect parameters for user creation"
    });
  }
};

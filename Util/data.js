/**
 * This file is used for interacting
 * with data via the file system
 */
var fs = require("fs");
var path = require("path");
var helpers = require("./helpers");

var data = {};
var baseDir = path.join(__dirname, "/../.Data/");

data._read = function(directory, fileName, callback) {
  fs.readFile(baseDir + directory + "/" + fileName + ".json", "utf-8", function(
    error,
    data
  ) {
    if (!error && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(error, data);
    }
  });
};

data._write = function(directory, fileName, dataObject, callback) {
  fs.writeFile(
    baseDir + directory + "/" + fileName + ".json",
    dataObject,
    "utf-8",
    function(error) {
      if (!error) {
        callback(false);
      } else {
        callback({ statusCode: 500, text: "Error creating user" });
      }
    }
  );
};

module.exports = data;

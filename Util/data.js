/**
 * This file is used for interacting
 * with data via the file system
 */
var fs = require("fs");

var data = {};
// Base directory where our files will live
// lib.baseDir = path.join(__dirname, "/../.data/");
var baseDir = "Data/";

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

module.exports = data;

/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var githubFunctions = require('./promisification');

var readUsername = function(readFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content.toString().split('\n')[0]);
        // console.log('first line of content IS', content.toString().split('\n')[0]+'END');
      }
    });
  });
};

var writeResponse = function(content, writeFilePath) {
  return new Promise(function(resolve, reject) {
    console.log('content is ', content.login);
    var fileToWriteTo = __dirname + '/../../test/files/file_to_write_to.txt';

    fs.writeFile(fileToWriteTo, JSON.stringify(content), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.stringify(content));
      }
    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  //readUsername(readFilePath).then(githubFunctions.getGitHubProfileAsync).then(console.log);
  return readUsername(readFilePath).then(githubFunctions.getGitHubProfileAsync).then(writeResponse);
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

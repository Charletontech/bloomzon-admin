const ErrorResponse = require("../errorResponse");

const fs = require("fs");

function deleteFile(filepath) {
  fs.unlink(filepath, (err) => {
    if (err) throw new ErrorResponse("Error occurred while deleting file", 501);
    console.log("\n\nfile deleted");
  });
}

module.exports = deleteFile;

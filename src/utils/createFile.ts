// file system module to perform file operations
import fs from "fs";

export default (data: object) => {
  var jsonContent = JSON.stringify(data);

  fs.writeFile("output.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
  return;
};

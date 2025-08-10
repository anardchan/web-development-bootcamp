/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a text file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import * as fs from "node:fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Please enter a URL to generate a QR code:",
      validate: function (value) {
        var pass = value.match(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
        );
        if (pass) {
          return true;
        }
        return "Please enter a valid URL.";
      },
    },
  ])
  .then((answers) => {
    qr.image(answers.url, { type: "png" }).pipe(
      fs.createWriteStream(`${answers.url}.png`)
    );
    console.log("QR code generated and saved as qr_code.png");
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // Add 1 as getMonth() is 0-indexed
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    fs.appendFile(
      "user_input_log.txt",
      `${year}-${month}-${day} ${hours}:${minutes}:${seconds} : ${answers.url}\n`,
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("User input saved to user_input.txt");
        }
      }
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("Prompt couldn't be rendered in the current environment.");
    } else {
      // Something else went wrong
      console.error("An error occurred:", error);
    }
  });

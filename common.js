const axios = require("axios");
const fs = require("fs");
const path = require("path");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function countdown(seconds) {
  for (let i = seconds; i >= 0; i--) {
    console.log(i); // In ra số giây còn lại
    await sleep(1000); // Tạm dừng 1 giây
  }
  console.log("Countdown complete!");
}

function getDateTimeLocal() {
  var d = new Date().toLocaleString();
  return `\x1b[36m ` + d + ` \x1b[0m`;
}

function handleError(key, response) {
  console.log("ERROR-----------------------------------");
  //console.log(`${key} :`, JSON.stringify(response));
  telegram.send(key, JSON.stringify(response));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function handleError(err, data) {
  console.log(err, data);
}

const telegram = {
  botToken: "7304983434:AAHPzgajSjE6grr0NpqaDVOWNmHmoBfqF6w",
  send: async function (message, chatId = "-4101088309") {
    const telegramApiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    });
  },
};

// Function to find index.js files
function findIndexFiles(dir) {
  let results = [];
  function searchDir(currentDir) {
    if (currentDir.includes("node_modules")) {
      return;
    }
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        searchDir(fullPath);
      } else if (file === "index.js") {
        results.push(fullPath);
      }
    }
  }
  searchDir(dir);
  let _results = [];

  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.trim() === "") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  for (const result of results) {
    let _ = result.replace(dir, ".");
    let arrays = _.split("\\");
    let appName = capitalizeFirstLetter(arrays[1]);
    _results.push({
      appName: appName,
      path: arrays.join("/")
    });
  }

  return _results;
}

function getApps() {
  const indexFiles = findIndexFiles(__dirname);
  return indexFiles;
}

module.exports = { getRandomInt, countdown, sleep, getDateTimeLocal, handleError, telegram, getApps };

const fs = require('fs');
const path = require('path');


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


const ignores = ["Bunnycoin", "Mana", "SpinnerCoin"];
const modules = getApps();
let apps = modules
  .filter((i) => !ignores.includes(i.appName))
  .map((i) => {
    const { appName, path } = i;
    return {
      name: appName,
      script: path,
      instances: 1,
      autorestart: true,
      ignore_watch: ["node_modules"],
      watch: false,
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: "90M",
    };
  });

apps.push({
  name: "Hamster Sync",
  script: "./hamster/hamster-sync.js",
  instances: 1,
  autorestart: true,
  ignore_watch: ["node_modules"],
  watch: false,
  watch_options: {
    followSymlinks: false,
  },
  max_memory_restart: "90M",
});

module.exports = {
  apps: apps,
};

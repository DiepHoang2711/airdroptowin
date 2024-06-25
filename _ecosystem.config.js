const { getApps } = require("./common");

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

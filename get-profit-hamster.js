//TUVAN
function sleep(ms) {
  new Promise((resolve) => setTimeout(resolve, ms));
}

function getElements(className) {
  return document.querySelectorAll(className);
}

function convertToNumber(str, char) {
  if (str.endsWith(char)) {
    let numString = str.slice(0, -1);
    if (char === "K") {
      let num = parseFloat(numString) * 1000;
      return Math.floor(num);
    }
    if (char === "M") {
      let num = parseFloat(numString) * 1000000;
      return Math.floor(num);
    }
  }

  return 0;
}

async function main() {
  var items = getElements(".upgrade-item");
  let results = [];
  if (items.length > 0) {
    var itemNames = getElements(".upgrade-item-title");
    var itemUpgradePrices = getElements(".upgrade-item-detail .price-value");

    for (let index = 0; index < items.length; index++) {
      var item = items[index];
      if (!Boolean(itemUpgradePrices[index])) {
        continue;
      }
      var itemUpgradePrice = itemUpgradePrices[index].textContent;
      var extraProfit = 0;
      if (item) {
        item?.dispatchEvent(mdown);
        item?.click();
        await sleep(1000); // 1000 milliseconds = 1 second

        extraProfit = document.querySelector(".upgrade-buy-stats .upgrade-buy-stats-info .price-value");
      }

      console.log("extraProfit ", extraProfit);

      var itemUpgradePriceValue = 0;
      if (itemUpgradePrice.toString().includes("K")) {
        itemUpgradePriceValue = convertToNumber(itemUpgradePrice, "K");
      }

      if (itemUpgradePrice.toString().includes("M")) {
        itemUpgradePriceValue = convertToNumber(itemUpgradePrice, "M");
      }

      var obj = {
        name: itemNames[index].textContent.toString(),
        extraProfitPerHour: extraProfit,
        costToUpgrade: itemUpgradePriceValue,
      };

      if (index == 2) {
        break;
      }

      results.push(obj);
    }
  }

  console.log(results);
}

//new

var mdown = new MouseEvent("pointerdown", { view: null, bubbles: true, cancelable: true });
var items = document.querySelectorAll(".upgrade-item");
async function processItems() {
  for (let index = 0; index < items.length; index++) {
    var item = items[index];

    if (item) {
      item?.dispatchEvent(mdown);
      item?.click();

      var extraProfit = document.querySelector(".upgrade-buy-stats .upgrade-buy-stats-info .price-value");
      console.log("extraProfit ", extraProfit);
    }

    await sleep(2000); // 1000 milliseconds = 1 second
    console.log("hello");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

processItems();

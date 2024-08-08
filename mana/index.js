const axios = require("axios");
const { getDateTimeLocal, writeFile } = require("../common");
const { accounts } = require("./config");
const puppeteer = require('puppeteer');


async function getDataInit(account, url) {
  const userProfile = account?.userProfile;

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: userProfile
  });

  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector('#column-center > div > div > div.bubbles.scrolled-down.has-groups.has-sticky-dates > div.scrollable.scrollable-y > div.bubbles-inner.has-rights > section:last-child > div.bubbles-group.bubbles-group-last > div > div > div.reply-markup > div:nth-child(1) > a');

  await page.evaluate(() => {
    const element = document.querySelector('#column-center > div > div > div.bubbles.scrolled-down.has-groups.has-sticky-dates > div.scrollable.scrollable-y > div.bubbles-inner.has-rights > section:last-child > div.bubbles-group.bubbles-group-last > div > div > div.reply-markup > div:nth-child(1) > a');
    if (element) {
      element.click();
    }
  });

  setTimeout(async () => {
    await page.evaluate(() => {
      const element = document.querySelector('body > div.popup.popup-peer.popup-confirmation.active > div > div.popup-buttons > button:nth-child(1)');
      if (element) {
        element.click();
      }
    });
  }, 1000);

  let initData = null;
  page.on('response', async response => {
    const request = response.request();
    const headers = request.headers();
    if (headers['authorization']) {
      initData = headers['authorization'];
    }
  });

  await new Promise(resolve => setTimeout(resolve, 10000));
  await page.close();
  await browser.close();
  return initData;
};

async function callApiClaim(account) {
  let config = {
    method: 'post', // Set HTTP method to POST
    url: 'https://wallet-api.spell.club/claim', // API endpoint URL
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: `${account?.authorization}`, // Dynamic authorization
      'content-length': '0', // Empty body
      origin: 'https://wallet.spell.club',
      priority: 'u=1, i',
      referer: 'https://wallet.spell.club/', // Lowercase for consistency
      'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' // User-agent header
    },
    mode: 'cors', // Enable CORS for cross-origin requests
    credentials: 'include' // Include cookies for authenticated requests
  };

  var result = await axios
    .request(config)
    .then((response) => {
      return { statusCode: response?.status, ...response.data }; // Combine status and data
    })
    .catch(async (error) => {
      return { statusCode: error?.response?.status }; // Extract error status code
    });

  return result;
}

async function run() {
  for (let index = 0; index < accounts.length; index++) {
    let account = accounts[index];
    console.log("start account --> ", index);
    let isRun = true;
    let authorization = "";

    while (isRun) {
      const claimRes = await callApiClaim(account);
      if (claimRes?.statusCode === 201 || claimRes?.statusCode === 200) {
        console.log("Claim success amount", claimRes);
        isRun = false;
      } else if (claimRes?.statusCode === 400 || claimRes?.statusCode === 401) {
        console.log("Re-login");
        const url = "https://web.telegram.org/k/#@spell_wallet_bot";
        console.log("start account --> ", index);
        authorization = await getDataInit(account, url);
        account.authorization = authorization;
        const response = await callApiClaim(account);
        console.log("Claim done", response);
      }
      else {
        console.log("Job fail", claimRes);
        isRun = false;
      }
      isRun = false;
    }
    if (authorization !== "" && authorization != null) {
      writeFile("mana", "config.js", index, authorization, "authorization");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log("DONE AT ", getDateTimeLocal());
  setTimeout(() => {
    run();
  }, 245 * 1000 * 60);
}

run();


const axios = require("axios");
const puppeteer = require('puppeteer');
const { accounts } = require("./config");

async function getDataInit(account, url) {
    const userProfile = account?.userProfile;

    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: userProfile
    });

    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('#column-center > div > div > div.bubbles.scrolled-down.has-groups.has-sticky-dates > div.scrollable.scrollable-y > div.bubbles-inner.has-rights > section > div.bubbles-group.bubbles-group-last > div > div > div.reply-markup > div:nth-child(3) > button');

    await page.evaluate(() => {
        const element = document.querySelector('#column-center > div > div > div.bubbles.scrolled-down.has-groups.has-sticky-dates > div.scrollable.scrollable-y > div.bubbles-inner.has-rights > section > div.bubbles-group.bubbles-group-last > div > div > div.reply-markup > div:nth-child(3) > button');
        if (element) {
            element.click();
        }
    });

    let initData = null;
    page.on('response', async response => {
        const request = response.request();
        const headers = request.headers();
        if (headers['telegram-data']) {
            initData = headers['telegram-data'];
            return;
        }
    });

    await new Promise(resolve => setTimeout(resolve, 10000));
    await page.close();
    await browser.close();
    return initData;
};

async function callApiIsLeader(account) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/bird/is-leader',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'content-length': '0',
            'origin': 'https://cf.seeddao.org',
            'priority': 'u=1, i',
            'referer': 'https://cf.seeddao.org/',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function callApiMeAll(account) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/worms/me-all',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'content-length': '0',
            'origin': 'https://cf.seeddao.org',
            'priority': 'u=1, i',
            'referer': 'https://cf.seeddao.org/',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function callApiClaim(account, birdId) {
    let data = JSON.stringify({
        "bird_id": birdId,
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/bird-hunt/complete',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'origin': 'https://cf.seeddao.org',
            'priority': 'u=1, i',
            'referer': 'https://cf.seeddao.org/',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36'
        },
        data: data
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function callApiBirdFeed(account, birdId, wormId) {
    let data = JSON.stringify({
        "bird_id": birdId,
        "worm_ids": [wormId]
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/bird-feed',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
        },
        data: data
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function callApiBirdHappiness(account, birdId) {
    let data = JSON.stringify({
        "bird_id": birdId,
        "happiness_rate": 10000,
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/bird-happiness',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
        },
        data: data
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function callApiStart(account, birdId) {
    let data = JSON.stringify({
        "bird_id": birdId,
        "task_level": 0,
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://elb.seeddao.org/api/v1/bird-hunt/start',
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'priority': 'u=1, i',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'telegram-data': `${account?.initData}`,
        },
        data: data
    };

    var result = await axios
        .request(config)
        .then((response) => {
            return { statusCode: response?.status, ...response.data };
        })
        .catch(async (error) => {
            return { statusCode: error?.response?.status };
        });

    return result;
}

async function feedBird(account, birdId) {
    const resMeAll = await callApiMeAll(account);
    if (resMeAll.data) {
        const myWorms = resMeAll.data.sort((a, b) => a.reward - b.reward).filter(x => x.status == "successful");
        const myCommonWorms = myWorms.filter(x => x.type == "common").map(x => x.id);
        const myUnCommonWorms = myWorms.filter(x => x.type == "uncommon").map(x => x.id);
        const myRareWorms = myWorms.filter(x => x.type == "rare").map(x => x.id);
        let indexCommonWorms = 0;
        let indexUnCommonWorms = 0;
        let indexRareWorms = 0;

        const firstWormUse = myCommonWorms.length > 0 ? myCommonWorms[indexCommonWorms++] :
            myUnCommonWorms > 0 ? myUnCommonWorms[indexUnCommonWorms++] : myRareWorms[indexRareWorms++];

        let resApiBirdFeed = await callApiBirdFeed(account, birdId, firstWormUse);
        if (resApiBirdFeed.statusCode == 200 || resApiBirdFeed.statusCode == 201) {
            if (resApiBirdFeed.data) {
                let needEnergy = (resApiBirdFeed.data.energy_max - resApiBirdFeed.data.energy_level) / 1000000000;
                if (needEnergy == 0) {
                    console.log('Full energy');
                    return true;
                }
                while (needEnergy > 0) {
                    if (needEnergy < 20) {
                        if (needEnergy < 3) {
                            resApiBirdFeed = await callApiBirdFeed(account, birdId, myCommonWorms[indexCommonWorms++]);
                            console.log('Feed Common worms', indexCommonWorms);
                        } else {
                            resApiBirdFeed = await callApiBirdFeed(account, birdId, myUnCommonWorms[indexUnCommonWorms++]);
                            console.log('Feed Uncommon worms', indexUnCommonWorms);
                        }
                    } else {
                        resApiBirdFeed = await callApiBirdFeed(account, birdId, myRareWorms[indexRareWorms++]);
                        console.log('Feed Rare worms', indexRareWorms);
                    }
                    needEnergy = (resApiBirdFeed.data.energy_max - resApiBirdFeed.data.energy_level) / 1000000000;
                }
            }
        } else {
            console.log("========= Bird is FULL ============");
        }
    } else {
        return false;
    }
    return true;
}

async function run() {
    for (let index = 0; index < accounts.length; index++) {
        let account = accounts[index];
        console.log("start account --> ", index);
        let isRun = true;

        const url = "https://web.telegram.org/k/#@seed_coin_bot";
        const initData = await getDataInit(account, url);
        account.initData = initData;

        while (isRun) {
            let birdId;
            const resIsLeader = await callApiIsLeader(account);
            if (resIsLeader.data) {
                birdId = resIsLeader.data?.id;
            }
            if (birdId) {
                console.log('BIRD ID: ', birdId);
                const resClaim = await callApiClaim(account, birdId);
                if (resClaim?.statusCode === 201 || resClaim?.statusCode === 200) {
                    console.log('Claim successfully');
                } else {
                    console.log('Claim fail: ', resClaim);
                }
                const isFeedSuccess = await feedBird(account, birdId);
                if (isFeedSuccess) {
                    const resBirdHappiness = await callApiBirdHappiness(account, birdId);
                    if (resBirdHappiness?.statusCode === 201 || resBirdHappiness?.statusCode === 200) {
                        console.log("Make bird happy success");
                    } else {
                        console.log("Make bird happy fail");
                    }
                    const response = await callApiStart(account, birdId);
                    if (response?.statusCode === 201 || response?.statusCode === 200) {
                        console.log("Hunting success");
                        isRun = false;
                    } else {
                        console.log("hunting time is not over yet");
                        isRun = false;
                    }
                }
            } else {
                isRun = false;
            }

        }
    }

    console.log("DONE AT ", new Date());
    setTimeout(() => {
        run();
    }, 362 * 1000 * 60);
}

run();

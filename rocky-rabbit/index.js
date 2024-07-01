const { default: axios } = require("axios");
const { accounts } = require("./config");
const { getDateTimeLocal } = require("../common");


async function callAppStart(account) {
    let config = {
        method: 'post',
        url: 'https://api.rockyrabbit.io/api/v1/account/start',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            authorization: `tma ${account.token}`,
            priority: 'u=1, i',
            'sec-ch-ua': '"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site'
        },
        referrer: 'https://app.rockyrabbit.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        // No body data in the original request, so leave it as null
        data: null, // Or set it to an object if there's body data
        // CORS mode and credentials are handled by Axios by default
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

async function callApiSync(account) {
    let config = {
        method: 'post',
        url: 'https://api.rockyrabbit.io/api/v1/mine/sync',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            authorization: `tma ${account.token}`,
            priority: 'u=1, i',
            'sec-ch-ua': '"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site'
        },
        referrer: 'https://app.rockyrabbit.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        // No body data in the original request, so leave it as null
        data: null, // Or set it to an object if there's body data
        // CORS mode and credentials are handled by Axios by default
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

async function callApiConfig(account) {
    let config = {
        method: 'post',
        url: 'https://api.rockyrabbit.io/api/v1/config',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          authorization: `tma ${account.token}`,
          priority: 'u=1, i',
          'sec-ch-ua': '"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site'
        },
        referrer: 'https://app.rockyrabbit.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        // No body data in the original request, so leave it as null
        data: null, // Or set it to an object if there's body data
        // CORS mode and credentials are handled by Axios by default
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

async function callApiUpdate(account, upgradeId) {
    let config = {
        method: 'post',
        url: 'https://api.rockyrabbit.io/api/v1/mine/upgrade',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            authorization: `tma ${account.token}`,
            'content-type': 'application/json; charset=utf-8',
            priority: 'u=1, i',
            'sec-ch-ua': '"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site'
        },
        referrer: 'https://app.rockyrabbit.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        data: { upgradeId: upgradeId },
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

async function run() {
    for (let index = 0; index < accounts.length; index++) {
      let account = accounts[index];
      console.log("start account --> ", index);
      let isRun = true;
      while (isRun) {
        const response = await callAppStart(account);
        if (response?.statusCode === 201 || response?.statusCode === 200) {

            const resConfig = await callApiConfig(account);

            const sectionFighter = resConfig.config.upgrade.filter(x => x.section === 'fighter' && x.type == 'level-up').sort((a,b) => b.sort - a.sort);
            await sectionFighter.forEach(async x => {
                 const resUpdate = await callApiUpdate(account, x.upgradeId);
                 console.log("🚀 ~ run ~ resUpdate:", resUpdate);
            })

            const sectionFighterClaim = resConfig.config.upgrade.filter(x => x.section === 'fighter' && x.type == 'daily').sort((a,b) => b.sort - a.sort);
            await sectionFighterClaim.forEach(async x => {
                const resUpdate = await callApiUpdate(account, x.upgradeId);
                console.log("🚀 ~ run ~ resUpdate:", resUpdate);
            })
            
            const sectionCoach = resConfig.config.upgrade.filter(x => x.section === 'coach' && x.type == 'level-up').sort((a,b) => b.sort - a.sort);
            await sectionCoach.forEach(async x => {
                const resUpdate = await callApiUpdate(account, x.upgradeId);
                console.log("🚀 ~ run ~ resUpdate:", resUpdate);
            })

            const sectionCoachClaim = resConfig.config.upgrade.filter(x => x.section === 'coach' && x.type == 'daily').sort((a,b) => b.sort - a.sort);
            await sectionCoachClaim.forEach(async x => {
                const resUpdate = await callApiUpdate(account, x.upgradeId);
                console.log("🚀 ~ run ~ resUpdate:", resUpdate);
            })

            // const sectionChampion = resConfig.config.upgrade.filter(x => x.section === 'champion' && x.type == 'level-up').sort((a,b) => b.sort - a.sort);
            // console.log("🚀 ~ run ~ sectionChampion:", JSON.stringify(sectionChampion));
            // sectionChampion.forEach(async x => {
            //     const resUpdate = await callApiUpdate(account, x.upgradeId);
            //     console.log("🚀 ~ run ~ resUpdate:", resUpdate);
            // })

          isRun = false;
        } else {
          console.log("Job fail", response);
          isRun = false;
        }
      }
    }
  
    console.log("DONE AT ", getDateTimeLocal());
    setTimeout(() => {
      run();
    }, 15 * 1000 * 60);
  }
  
  run();

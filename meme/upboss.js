// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NmQ1MjZlMzM0NmU4MDdkODNmMmJjYyIsInVzZXJuYW1lIjoiIn0sInNlc3Npb25JZCI6IjY2NmRjN2I3Njk5NzE4MTJlYWJlOWYwOCIsInN1YiI6IjY2NmQ1MjZlMzM0NmU4MDdkODNmMmJjYyIsImlhdCI6MTcxODQ3MDU4MywiZXhwIjoxNzI2MjQ2NTgzfQ.8F8Drp6qRgQ9j473_LxYjuVr0tWwyi_7-i_kl8RSisw";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NmU3ZWM2NzgwOTlmZGEwOTkxNzgwZSIsInVzZXJuYW1lIjoiIn0sInNlc3Npb25JZCI6IjY2NzI2ZWVlMmE2ZTlhODU4MjNkZGIzZiIsInN1YiI6IjY2NmU3ZWM2NzgwOTlmZGEwOTkxNzgwZSIsImlhdCI6MTcxODc3NTUzNCwiZXhwIjoxNzI2NTUxNTM0fQ.gnPDgRTxpdiK5kjJr4_UmpjtwU1DNUbK1PtVve1hboQ"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NmU1ZGYwNzgwOTlmZGEwOTgwNTc4YyIsInVzZXJuYW1lIjoiIn0sInNlc3Npb25JZCI6IjY2NzI3MmVjY2JhN2VkOWI1NjQwYjhhOSIsInN1YiI6IjY2NmU1ZGYwNzgwOTlmZGEwOTgwNTc4YyIsImlhdCI6MTcxODc3NjU1NiwiZXhwIjoxNzI2NTUyNTU2fQ.vpuaczqbmFzXgzGcXUqgLbdaZ5cEjk7snEsWgejUyCk"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NzFiOGRiNGUwNWUzYzRhZDAzMTIzYyIsInVzZXJuYW1lIjoiIn0sInNlc3Npb25JZCI6IjY2NzIzY2FlMGY3ODY4YmVmZTZmOWM1ZiIsInN1YiI6IjY2NzFiOGRiNGUwNWUzYzRhZDAzMTIzYyIsImlhdCI6MTcxODc2MjY3MCwiZXhwIjoxNzI2NTM4NjcwfQ.zcy49p36vry7iVEbSlZhJt3nO2MOQFcHggTAiF098Vc"

const _mineConfig = {
  nonce: "f49b6e671c1fd853953879549e197167b6f3a9bd98a507e9feeb844b0427f011",
  boot: true,
  authorization: `Bearer ${token}`,
}

function getTabCounts(boot = false) {
  const tabCounts = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
  if (boot == true) {
    return 500000;
  } else {
    return tabCounts;
  }
}

async function run(mineConfig) {
  const { nonce, boot, authorization } = mineConfig;
  const tabCounts = getTabCounts(boot);

  let data = {
    query: `mutation MutationGameProcessTapsBatch($payload: TelegramGameTapsBatchInput!) {
        telegramGameProcessTapsBatch(payload: $payload) {
          ...FragmentBossFightConfig
          __typename
        }
      }
      
      fragment FragmentBossFightConfig on TelegramGameConfigOutput {
        _id
        coinsAmount
        currentEnergy
        maxEnergy
        weaponLevel
        energyLimitLevel
        energyRechargeLevel
        tapBotLevel
        currentBoss {
          _id
          level
          currentHealth
          maxHealth
          __typename
        }
        freeBoosts {
          _id
          currentTurboAmount
          maxTurboAmount
          turboLastActivatedAt
          turboAmountLastRechargeDate
          currentRefillEnergyAmount
          maxRefillEnergyAmount
          refillEnergyLastActivatedAt
          refillEnergyAmountLastRechargeDate
          __typename
        }
        bonusLeaderDamageEndAt
        bonusLeaderDamageStartAt
        bonusLeaderDamageMultiplier
        nonce
        __typename
      }`,
    variables: { payload: { nonce: nonce, tapsCount: tabCounts } }
  };

  let config = {
    method: "POST",
    headers: {
      "accept": "*/*",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
      "authorization": authorization,
      "content-type": "application/json",
      "dnt": "1",
      "origin": "https://tg-app.memefi.club",
      "priority": "u=1, i",
      "referer": "https://tg-app.memefi.club/",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch("https://api-gw-tg.memefi.club/graphql", config);
    const responseData = await response.json();

    const { nonce: newNonce, currentEnergy, coinsAmount } = responseData.data.telegramGameProcessTapsBatch;

    console.log("nonce:", newNonce);
    console.log("coinsAmount:", coinsAmount);
    console.log("currentEnergy:", currentEnergy);

    if (currentEnergy < 100 && boot == false) {
      console.log("DONE AT", new Date());
      setTimeout(() => {
        run({ ...mineConfig, nonce: newNonce });
      }, 1000 * 60 * 10); // 10 mins
    } else {
      run({ ...mineConfig, nonce: newNonce });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

await run(_mineConfig);

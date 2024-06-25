const _mineConfig = {
    nonce: "12bd5d7f119bfe0cb4cc81564f75a529433c3d8922ec43095614477612f73ba8",
    boot: true,
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MThlODVmY2EzZGYxYmVkZDE4NmMyZSIsInVzZXJuYW1lIjoidHZhbmNvbmcifSwic2Vzc2lvbklkIjoiNjY3MGUxMzAzNjM2MmQ0MTEyZTIwYjc4Iiwic3ViIjoiNjYxOGU4NWZjYTNkZjFiZWRkMTg2YzJlIiwiaWF0IjoxNzE4NjczNzEyLCJleHAiOjE3MjY0NDk3MTJ9.IfvQww4xJj2DMxpZed9Q0jTB0h_qh4F4JB4Q0irybqI",
  };
  
  const getKeyConfig2M = {
    vector: "2,2,2,2", /// Setting change every day
  };
  
  async function run(mineConfig) {
    const { nonce, boot, authorization } = mineConfig;
    const vector = getKeyConfig2M.vector;
    const tabCounts = vector.split(",").length;
  
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
      variables: { payload: { nonce: nonce, tapsCount: tabCounts, vector: vector } },
    };
  
    let config = {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
        authorization: authorization,
        "content-type": "application/json",
        dnt: "1",
        origin: "https://tg-app.memefi.club",
        priority: "u=1, i",
        referer: "https://tg-app.memefi.club/",
        "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch("https://api-gw-tg.memefi.club/graphql", config);
      const responseData = await response.json();
      const { nonce: newNonce, currentEnergy, coinsAmount } = responseData.data.telegramGameProcessTapsBatch;
      console.log("nonce:", newNonce);
      console.log("coinsAmount:", coinsAmount);
      console.log("currentEnergy:", currentEnergy);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  await run(_mineConfig);
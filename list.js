const MarketsList = [
  {
    name: "Fan tokens",
    extraProfitPerHour: 21420,
    costToUpgrade: 0,
  },
  {
    name: "Staking",
    extraProfitPerHour: 15080,
    costToUpgrade: 0,
  },
  {
    name: "BTC pairs",
    extraProfitPerHour: 1000,
    costToUpgrade: 1000,
  },
  {
    name: "ETH pairs",
    extraProfitPerHour: 1000,
    costToUpgrade: 1000,
  },
  {
    name: "Top 10 cmc pairs",
    extraProfitPerHour: 2009,
    costToUpgrade: 2009,
  },
  {
    name: "GameFi tokens",
    extraProfitPerHour: 1760,
    costToUpgrade: 1760,
  },
  {
    name: "Defi2.0 tokens",
    extraProfitPerHour: 0,
    costToUpgrade: 0,
  },
  {
    name: "SocialFi tokens",
    extraProfitPerHour: 1130,
    costToUpgrade: 1130,
  },
  {
    name: "Meme coins",
    extraProfitPerHour: 2770,
    costToUpgrade: 0,
  },
  {
    name: "Shit coins",
    extraProfitPerHour: 14830,
    costToUpgrade: 0,
  },
  {
    name: "Margin trading x10",
    extraProfitPerHour: 6200,
    costToUpgrade: 6200,
  },
  {
    name: "Margin trading x20",
    extraProfitPerHour: 7890,
    costToUpgrade: 7890,
  },
  {
    name: "Margin trading x30",
    extraProfitPerHour: 12560,
    costToUpgrade: 0,
  },
  {
    name: "Margin trading x50",
    extraProfitPerHour: 24810,
    costToUpgrade: 0,
  },
  {
    name: "Margin trading x75",
    extraProfitPerHour: 27640,
    costToUpgrade: 0,
  },
  {
    name: "Margin trading x100",
    extraProfitPerHour: 24500,
    costToUpgrade: 0,
  },
  {
    name: "Derivatives",
    extraProfitPerHour: 12440,
    costToUpgrade: 0,
  },
  {
    name: "Prediction markets",
    extraProfitPerHour: 9620,
    costToUpgrade: 0,
  },
  {
    name: "Web3 integration",
    extraProfitPerHour: 17820,
    costToUpgrade: 0,
  },
  {
    name: "DAO",
    extraProfitPerHour: 6410,
    costToUpgrade: 0,
  },
  {
    name: "P2P trading",
    extraProfitPerHour: 9800,
    costToUpgrade: 0,
  },
  {
    name: "Trading bots",
    extraProfitPerHour: 6010,
    costToUpgrade: 0,
  },
  {
    name: "LayerZero Listing",
    extraProfitPerHour: 5180,
    costToUpgrade: 5180,
  },
].map((item) => ({ ...item, type: "Markets" }));

const PRandTeamList = [
  {
    name: "CEO",
    extraProfitPerHour: 2510,
    costToUpgrade: 725360,
  },
  {
    name: "Marketing",
    extraProfitPerHour: 1580,
    costToUpgrade: 332300,
  },
  {
    name: "IT team",
    extraProfitPerHour: 6690,
    costToUpgrade: 3330000,
  },
  {
    name: "Support team",
    extraProfitPerHour: 1580,
    costToUpgrade: 249220,
  },
  {
    name: "HamsterBook",
    extraProfitPerHour: 1580,
    costToUpgrade: 166150,
  },
  {
    name: "HamsterTube",
    extraProfitPerHour: 2780,
    costToUpgrade: 2400000,
  },
  {
    name: "X",
    extraProfitPerHour: 2009,
    costToUpgrade: 398950,
  },
  {
    name: "Cointelegraph",
    extraProfitPerHour: 1000,
    costToUpgrade: 253880,
  },
  {
    name: "HamsterGram",
    extraProfitPerHour: 1390,
    costToUpgrade: 831270,
  },
  {
    name: "TikTok",
    extraProfitPerHour: 2260,
    costToUpgrade: 249220,
  },
  {
    name: "Сoindesk",
    extraProfitPerHour: 2009,
    costToUpgrade: 725360,
  },
  {
    name: "Influencers",
    extraProfitPerHour: 6790,
    costToUpgrade: 1810000,
  },
  {
    name: "Partnership program",
    extraProfitPerHour: 1580,
    costToUpgrade: 166150,
  },
  {
    name: "Product team",
    extraProfitPerHour: 2510,
    costToUpgrade: 725360,
  },
  {
    name: "BisDev team",
    extraProfitPerHour: 1130,
    costToUpgrade: 166150,
  },
  {
    name: "Two factor authentication",
    extraProfitPerHour: 2820,
    costToUpgrade: 332300,
  },
  {
    name: "UX and UI team",
    extraProfitPerHour: 4400,
    costToUpgrade: 551280,
  },
  {
    name: "Security team",
    extraProfitPerHour: 5030,
    costToUpgrade: 725360,
  },
  {
    name: "QA team",
    extraProfitPerHour: 4770,
    costToUpgrade: 924840,
  },
  {
    name: "Antihacking shield",
    extraProfitPerHour: 2220,
    costToUpgrade: 319680,
  },
  {
    name: "Risk management team",
    extraProfitPerHour: 5980,
    costToUpgrade: 664590,
  },
  {
    name: "Security Audition",
    extraProfitPerHour: 1790,
    costToUpgrade: 242190,
  },
  {
    name: "Anonymous transactions ban",
    extraProfitPerHour: 8370,
    costToUpgrade: 1500000,
  },
  {
    name: "Blocking suspicious accounts",
    extraProfitPerHour: 4019,
    costToUpgrade: 906700,
  },
  {
    name: "Tokenomics expert",
    extraProfitPerHour: 11270,
    costToUpgrade: 1660000,
  },
  {
    name: "Consensus Explorer pass",
    extraProfitPerHour: 30210,
    costToUpgrade: 4000000,
  },
  {
    name: "VC Labs",
    extraProfitPerHour: 10070,
    costToUpgrade: 2480000,
  },
  {
    name: "Compliance officer",
    extraProfitPerHour: 2710,
    costToUpgrade: 1160000,
  },
  {
    name: "Welcome to Amsterdam",
    extraProfitPerHour: 8170,
    costToUpgrade: 2180000,
  },
  {
    name: "Development Hub Mumbai",
    extraProfitPerHour: 4000,
    costToUpgrade: 90000,
  },
].map((item) => ({ ...item, type: "PR&Team" }));

const LegalList = [
  {
    name: "KYC",
    extraProfitPerHour: 0,
    costToUpgrade: 0,
  },
  {
    name: "KYB",
    extraProfitPerHour: 1510,
    costToUpgrade: 1510,
  },
  {
    name: "Legal opinion",
    extraProfitPerHour: 1350,
    costToUpgrade: 1350,
  },
  {
    name: "SEC transparancy",
    extraProfitPerHour: 1350,
    costToUpgrade: 1350,
  },
  {
    name: "Anti money loundering",
    extraProfitPerHour: 7040,
    costToUpgrade: 0,
  },
  {
    name: "Licence UAE",
    extraProfitPerHour: 14070,
    costToUpgrade: 0,
  },
  {
    name: "Licence Europe",
    extraProfitPerHour: 20080,
    costToUpgrade: 0,
  },
  {
    name: "Licence Asia",
    extraProfitPerHour: 8340,
    costToUpgrade: 0,
  },
  {
    name: "Licence South America",
    extraProfitPerHour: 8790,
    costToUpgrade: 0,
  },
  {
    name: "Licence Australia",
    extraProfitPerHour: 15330,
    costToUpgrade: 0,
  },
  {
    name: "Licence North America",
    extraProfitPerHour: 21650,
    costToUpgrade: 0,
  },
  {
    name: "Licence Nigeria",
    extraProfitPerHour: 4270,
    costToUpgrade: 0,
  },
  {
    name: "Licence Japan",
    extraProfitPerHour: 52370,
    costToUpgrade: 0,
  },
  {
    name: "Licence Ethiopia",
    extraProfitPerHour: 40590,
    costToUpgrade: 0,
  },
  {
    name: "Licence India",
    extraProfitPerHour: 25650,
    costToUpgrade: 25650,
  },
  {
    name: "Licence Bangladesh",
    extraProfitPerHour: 35910,
    costToUpgrade: 35910,
  },
  {
    name: "Licence Indonesia",
    extraProfitPerHour: 51300,
    costToUpgrade: 51300,
  },
  {
    name: "Licence Vietnam",
    extraProfitPerHour: 4000,
    costToUpgrade: 4000,
  },
].map((item) => ({ ...item, type: "Legal" }));

const SpecialList = [
  {
    name: "Sports integration",
    extraProfitPerHour: 3000,
    costToUpgrade: 3000,
  },
  {
    name: "Hamsters break records",
    extraProfitPerHour: 2750,
    costToUpgrade: 2750,
  },
  {
    name: "Web3 Game Con",
    extraProfitPerHour: 1200,
    costToUpgrade: 1200,
  },
  {
    name: "Hamster Green energy",
    extraProfitPerHour: 4140,
    costToUpgrade: 4140,
  },
  {
    name: "YouTube 25 Million",
    extraProfitPerHour: 15020,
    costToUpgrade: 15020,
  },
  {
    name: "Premarket Launch",
    extraProfitPerHour: 7500,
    costToUpgrade: 7500,
  },
  {
    name: "YouTube Gold Button",
    extraProfitPerHour: 6970,
    costToUpgrade: 6970,
  },
].map((item) => ({
  ...item,
  type: "Special",
}));

module.exports = { PRandTeamList, MarketsList, LegalList, SpecialList };

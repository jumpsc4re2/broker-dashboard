import { PrismaClient, TradeType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.trade.deleteMany();
  await prisma.position.deleteMany();
  await prisma.account.deleteMany();
  await prisma.moderator.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.symbol.deleteMany();

  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        name: "James Mitchell",
        email: "james.mitchell@email.com",
        phone: "+44 7700 900123",
        country: "United Kingdom",
        currency: "GBP",
        balance: 52480.75,
      },
    }),
    prisma.account.create({
      data: {
        name: "Sophie Laurent",
        email: "sophie.laurent@email.fr",
        phone: "+33 6 12 34 56 78",
        country: "France",
        currency: "EUR",
        balance: 31250.0,
      },
    }),
    prisma.account.create({
      data: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 415 555 0198",
        country: "United States",
        currency: "USD",
        balance: 87500.5,
      },
    }),
    prisma.account.create({
      data: {
        name: "Emma van der Berg",
        email: "emma.vanderberg@email.nl",
        phone: "+31 6 12345678",
        country: "Netherlands",
        currency: "EUR",
        balance: 19875.25,
      },
    }),
    prisma.account.create({
      data: {
        name: "Liam O'Connor",
        email: "liam.oconnor@email.ie",
        phone: "+353 87 123 4567",
        country: "Ireland",
        currency: "EUR",
        balance: 44120.0,
      },
    }),
  ]);

  const positionData = [
    { accountId: accounts[0].id, symbol: "USDGBP", type: TradeType.buy, openPrice: 0.7892, stopLoss: 0.785, takeProfit: 0.795, volume: 0.5 },
    { accountId: accounts[1].id, symbol: "EURUSD", type: TradeType.sell, openPrice: 1.0845, stopLoss: 1.088, takeProfit: 1.08, volume: 1.0 },
    { accountId: accounts[2].id, symbol: "GBPJPY", type: TradeType.buy, openPrice: 189.45, stopLoss: 188.5, takeProfit: 191.0, volume: 0.3 },
    { accountId: accounts[0].id, symbol: "AUDUSD", type: TradeType.buy, openPrice: 0.6523, stopLoss: 0.648, takeProfit: 0.658, volume: 0.8 },
    { accountId: accounts[3].id, symbol: "USDCAD", type: TradeType.sell, openPrice: 1.3625, stopLoss: 1.366, takeProfit: 1.358, volume: 0.6 },
    { accountId: accounts[1].id, symbol: "EURJPY", type: TradeType.buy, openPrice: 162.78, stopLoss: 162.0, takeProfit: 164.0, volume: 0.4 },
    { accountId: accounts[4].id, symbol: "NZDUSD", type: TradeType.sell, openPrice: 0.5987, stopLoss: 0.602, takeProfit: 0.594, volume: 0.7 },
    { accountId: accounts[2].id, symbol: "GBPUSD", type: TradeType.buy, openPrice: 1.2734, stopLoss: 1.268, takeProfit: 1.28, volume: 1.2 },
    { accountId: accounts[3].id, symbol: "USDJPY", type: TradeType.sell, openPrice: 149.85, stopLoss: 150.2, takeProfit: 149.2, volume: 0.5 },
    { accountId: accounts[4].id, symbol: "EURGBP", type: TradeType.buy, openPrice: 0.8512, stopLoss: 0.848, takeProfit: 0.855, volume: 0.9 },
  ];

  await prisma.position.createMany({ data: positionData });

  const tradeData = [
    { accountId: accounts[0].id, symbol: "EURUSD", type: TradeType.buy, openPrice: 1.0820, closePrice: 1.0865, stopLoss: 1.078, takeProfit: 1.09, swap: -2.35, profit: 450.0 },
    { accountId: accounts[1].id, symbol: "GBPUSD", type: TradeType.sell, openPrice: 1.2750, closePrice: 1.2710, stopLoss: 1.279, takeProfit: 1.268, swap: -1.80, profit: 400.0 },
    { accountId: accounts[2].id, symbol: "USDJPY", type: TradeType.buy, openPrice: 148.50, closePrice: 149.20, stopLoss: 148.0, takeProfit: 149.5, swap: -3.10, profit: 700.0 },
    { accountId: accounts[0].id, symbol: "AUDUSD", type: TradeType.sell, openPrice: 0.6550, closePrice: 0.6510, stopLoss: 0.658, takeProfit: 0.648, swap: -1.25, profit: 400.0 },
    { accountId: accounts[3].id, symbol: "EURJPY", type: TradeType.buy, openPrice: 161.20, closePrice: 162.50, stopLoss: 160.5, takeProfit: 163.0, swap: -2.90, profit: 1300.0 },
    { accountId: accounts[4].id, symbol: "USDCAD", type: TradeType.sell, openPrice: 1.3650, closePrice: 1.3600, stopLoss: 1.368, takeProfit: 1.358, swap: -1.50, profit: 500.0 },
    { accountId: accounts[1].id, symbol: "NZDUSD", type: TradeType.buy, openPrice: 0.5950, closePrice: 0.5995, stopLoss: 0.592, takeProfit: 0.602, swap: -0.95, profit: 450.0 },
    { accountId: accounts[2].id, symbol: "GBPJPY", type: TradeType.sell, openPrice: 190.10, closePrice: 189.20, stopLoss: 190.8, takeProfit: 188.5, swap: -4.20, profit: 900.0 },
    { accountId: accounts[3].id, symbol: "EURGBP", type: TradeType.buy, openPrice: 0.8490, closePrice: 0.8525, stopLoss: 0.846, takeProfit: 0.855, swap: -1.10, profit: 350.0 },
    { accountId: accounts[4].id, symbol: "USDGBP", type: TradeType.sell, openPrice: 0.7910, closePrice: 0.7875, stopLoss: 0.794, takeProfit: 0.784, swap: -1.65, profit: 350.0 },
  ];

  await prisma.trade.createMany({ data: tradeData });

  const moderatorData = [
    { name: "Admin One", email: "admin1@broker.com", isSuperAdmin: true },
    { name: "Mod Two", email: "mod2@broker.com", isSuperAdmin: false },
    { name: "Mod Three", email: "mod3@broker.com", isSuperAdmin: false },
  ];
  await prisma.moderator.createMany({ data: moderatorData });

  const currencyData = [
    { name: "USD", description: "United States Dollar" },
    { name: "EUR", description: "Euro" },
    { name: "JPY", description: "Japanese yen" },
    { name: "GBP", description: "Pound sterling" },
    { name: "AUD", description: "Australian dollar" },
    { name: "CAD", description: "Canadian dollar" },
    { name: "CHF", description: "Swiss franc" },
    { name: "CNH", description: "Chinese renminbi" },
    { name: "HKD", description: "Hong Kong dollar" },
    { name: "NZD", description: "New Zealand dollar" },
  ];
  await prisma.currency.createMany({ data: currencyData });

  const symbolData = [
    { symbolName: "EURUSD", category: "Forex", description: "Euro vs US Dollar", isActive: true },
    { symbolName: "GBPUSD", category: "Forex", description: "British Pound vs US Dollar", isActive: true },
    { symbolName: "USDJPY", category: "Forex", description: "US Dollar vs Japanese Yen", isActive: true },
    { symbolName: "USDCHF", category: "Forex", description: "US Dollar vs Swiss Franc", isActive: true },
    { symbolName: "AUDUSD", category: "Forex", description: "Australian Dollar vs US Dollar", isActive: true },
    { symbolName: "USDCAD", category: "Forex", description: "US Dollar vs Canadian Dollar", isActive: true },
    { symbolName: "NZDUSD", category: "Forex", description: "New Zealand Dollar vs US Dollar", isActive: true },
    { symbolName: "EURGBP", category: "Forex", description: "Euro vs British Pound", isActive: true },
    { symbolName: "EURJPY", category: "Forex", description: "Euro vs Japanese Yen", isActive: true },
    { symbolName: "GBPJPY", category: "Forex", description: "British Pound vs Japanese Yen", isActive: true },
  ];
  await prisma.symbol.createMany({ data: symbolData });

  console.log("Seeded 5 accounts, 10 positions, 10 trades, 3 moderators, 10 currencies, and 10 symbols.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

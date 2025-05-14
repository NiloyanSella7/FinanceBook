/**
 * Function for calculating transaction stats
 * @param {Transaction[]} transactions
 * @returns revenue, purchase, profitLoss as number
 */
const calculateStats = (transactions) => {
  let revenue = 0;
  let purchase = 0;
  let profitloss = 0;

  transactions.forEach((calc) => {
    if (calc.type === "Income") {
      revenue += calc.amount;
    } else if (calc.type === "Purchase") {
      purchase += calc.amount;
    }
  });

  profitloss = revenue - purchase;
  let res = Math.round(profitloss * 1000) / 1000;

  return { profitLoss: res, revenue, purchase };
};

module.exports = calculateStats;

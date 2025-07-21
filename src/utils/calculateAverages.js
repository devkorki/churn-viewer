export default function calculateAverages(data) {
  const keys = [
    "total_spend",
    "visit_count",
    "buy_count",
    "cart_conversion_rate",
    "remove_count",
    "category_loyalty_score",
    "days_since_last_buy"
  ];

  const totals = {};
  const counts = {};

  keys.forEach((key) => {
    totals[key] = 0;
    counts[key] = 0;
  });

  data.forEach((client) => {
    keys.forEach((key) => {
      const value = client[key];
      if (!isNaN(value) && value !== null && value !== undefined) {
        totals[key] += value;
        counts[key] += 1;
      }
    });
  });

  const averages = {};
  keys.forEach((key) => {
    averages[key] = counts[key] > 0 ? totals[key] / counts[key] : 0;
  });

  return averages;
}

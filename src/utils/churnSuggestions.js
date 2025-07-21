// src/utils/churnSuggestions.js

export default function getChurnSuggestions(client) {
  const suggestions = [];

  if (client.days_since_last_buy > 30) {
    suggestions.push("Send a re-engagement email with a personalized offer.");
  }

  if (client.cart_conversion_rate < 0.05) {
    suggestions.push("Offer free shipping or a discount at checkout.");
  }

  if (client.visit_count > 10 && client.buy_count === 0) {
    suggestions.push("Display targeted product recommendations.");
  }

  if (client.remove_count > 5) {
    suggestions.push("Improve product descriptions or provide more reviews.");
  }

  if (client.category_loyalty_score < 1) {
    suggestions.push("Introduce a loyalty program to encourage repeat purchases.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Client appears engaged. Maintain current engagement strategy.");
  }

  return suggestions;
}

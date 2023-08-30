const { EmbedBuilder } = require("discord.js");

const pokemonCardEmbed = (data) => {
  return new EmbedBuilder()
    .setTitle(data.name || " ")
    .setDescription(`No. ${data.number}` || " ")
    .setThumbnail(data.set.images.symbol || " ")
    .setFields([
      {
        name: "Type of card",
        value: data?.supertype,
      },
      {
        name: "Set",
        value: data?.set?.name ? data?.set?.name : " ",
      },
      {
        name: data?.evolvesFrom ? "Evolves From" : " ",
        value: data?.evolvesFrom ? data.evolvesFrom : " ",
      },
      {
        name: data?.cardmarket?.prices?.averageSellPrice
          ? "Average Sell Price (Cardmarket)"
          : " ",
        value: data?.cardmarket?.prices?.averageSellPrice
          ? data.cardmarket.prices.averageSellPrice.toString() + "€"
          : " ",
      },
    ])
    .setImage(data.images.large || data.images.small || " ");
};

module.exports = pokemonCardEmbed;

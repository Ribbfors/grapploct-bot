const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const pokemonCardEmbed = require("../../Embeds/pokemonCardEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("card")
    .setDescription("Get a pokemon card from the pokemon TCG")
    .addStringOption((option) =>
      option
        .setName("set")
        .setDescription("Get information about a pokemon")
        .setRequired(true)
        .addChoices(
          { name: "Base", value: "Base" },
          { name: "Gym", value: "Gym" },
          { name: "Neo", value: "Neo" },
          { name: "Other", value: "Other" },
          { name: "E-Card", value: "E-Card" },
          { name: "EX", value: "EX" },
          { name: "NP", value: "NP" },
          { name: "POP", value: "POP" },
          { name: "Diamond & Pearl", value: "Diamond" },
          { name: "Platinum", value: "Platinum" },
          { name: "HeartGold & SoulSilver", value: "HeartGold" },
          { name: "Black & White", value: "Black" },
          { name: "XY", value: "XY" },
          { name: "Sun & Moon", value: "Sun" },
          { name: "Sword & Shield", value: "Sword" },
          { name: "Scarlet & Violet", value: "Scarlet" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("pokemon")
        .setDescription("What pokemon do you want to fetch?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const pokemon = interaction.options.getString("pokemon").toLowerCase();
    try {
      const set = interaction.options.getString("set");

      const fetchPokemon = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=set.series:${set} name:${pokemon}`
      );

      let timeout = false;

      const timeoutPromise = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          timeout = true;
          reject();
        }, 2400);
      });

      try {
        const result = await Promise.race([fetchPokemon, timeoutPromise]);

        if (result.data.data.length === 0)
          return await interaction.reply(`${pokemon} dosen't exist.`);
        if (timeout) {
          await interaction.deferReply();
          await interaction.editReply({
            embeds: result.data.data.map((card) => pokemonCardEmbed(card)),
          });
        } else {
          await interaction.reply({
            embeds: result.data.data.map((card) => pokemonCardEmbed(card)),
          });
        }
      } catch (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      await interaction.reply(
        "There was an error trying to execute that command!"
      );
    }
  },
};

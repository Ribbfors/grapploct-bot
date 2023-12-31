const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const pokemonEmbed = require("../../Embeds/pokemonEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokedex")
    .setDescription("Get information about a pokemon")
    .addStringOption((option) =>
      option
        .setName("pokemon")
        .setDescription("Get information about a pokemon")
        .setRequired(true)
    ),

  async execute(interaction) {
    let pokemon = interaction.options.getString("pokemon").toLowerCase();
    try {
      if (pokemon === "giratina") {
        pokemon = "giratina-altered";
      }
      const fetchPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      let timeout = false;

      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          timeout = true;
          reject();
        }, 2400);
      });

      try {
        const result = await Promise.race([fetchPokemon, timeoutPromise]);

        const embed = pokemonEmbed(result.data);
        if (timeout) {
          await interaction.deferReply();
          await interaction.editReply({ embeds: [embed] });
        } else {
          await interaction.reply({ embeds: [embed] });
        }
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      if (error?.response?.status === 404)
        return await interaction.reply(`${pokemon} dosen't exist.`);
      await interaction.reply(
        "There was an error trying to execute that command!"
      );
    }
  },
};

const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const pokemonEmbed = require("../../Embeds/pokemonEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Get a random pokemon from specified generation")
    .addStringOption((option) =>
      option
        .setName("generation")
        .setDescription("What generation do you want to fetch?")
        .setRequired(true)
        .addChoices(
          { name: "Gen 1 / RBY", value: "1" },
          { name: "Gen 2 / GSC", value: "2" },
          { name: "Gen 3 / RSE", value: "3" },
          { name: "Gen 4 / DPP", value: "4" },
          { name: "Gen 5 / BW", value: "5" },
          { name: "Gen 6 / XY", value: "6" },
          { name: "Gen 7 / SM", value: "7" },
          { name: "Gen 8 / SWSH", value: "8" }
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("visable")
        .setDescription("Do you want it to be visable?")
        .setRequired(false)
    ),

  async execute(interaction) {
    const generation = interaction.options
      .getString("generation")
      .toLowerCase();

    const generationNumbers = [
      {
        name: "Gen 1 / RBY",
        min: 1,
        max: 151,
      },
      {
        name: "Gen 2 / GSC",
        min: 152,
        max: 251,
      },
      {
        name: "Gen 3 / RSE",
        min: 252,
        max: 386,
      },
      {
        name: "Gen 4 / DPP",
        min: 387,
        max: 493,
      },
      {
        name: "Gen 5 / BW",
        min: 494,
        max: 649,
      },
      {
        name: "Gen 6 / XY",
        min: 650,
        max: 721,
      },
      {
        name: "Gen 7 / SM",
        min: 722,
        max: 809,
      },
      {
        name: "Gen 8 / SWSH",
        min: 810,
        max: 898,
      },
    ];

    try {
      const randomPokemonFromSpecifiedGen = Math.floor(
        Math.random() *
          (generationNumbers[generation - 1].max -
            generationNumbers[generation - 1].min +
            1) +
          generationNumbers[generation - 1].min
      );

      const fetchPokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonFromSpecifiedGen}`
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

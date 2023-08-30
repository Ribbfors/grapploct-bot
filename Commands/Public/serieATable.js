const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const tableEmbed = require("../../Embeds/tableEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seriea")
    .setDescription("Serie A Table"),

  async execute(interaction) {
    try {
      const headers = {
        "X-Auth-Token": process.env.FOOTBALL_TOKEN,
        "Content-Type": "application/json",
      };

      const { data } = await axios.get(
        "http://api.football-data.org/v4/competitions/SA/standings",
        { headers }
      );

      interaction.reply({
        embeds: [tableEmbed(data)],
      });
    } catch (error) {
      interaction.reply(`Something went wrong: ${error.message}`);
    }
  },
};

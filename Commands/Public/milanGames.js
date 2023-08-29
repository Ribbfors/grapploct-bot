const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const { footballGameEmbed } = require("../../Embeds/footballGameEmbed.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("milan")
    .setDescription("Recent and upcomming games for AC Milan"),
  async execute(interaction) {
    try {
      const headers = {
        "X-Auth-Token": process.env.FOOTBALL_TOKEN,
        "Content-Type": "application/json",
      };

      const { data } = await axios.get(
        "http://api.football-data.org/v4/teams/98/matches/",
        { headers }
      );

      const theTwoMostRecentGames = data.matches.slice(0, 2);
      const theThreeUpcomingGames = data.matches.slice(2, 5);
      const allData = [...theTwoMostRecentGames, ...theThreeUpcomingGames];

      interaction.reply({
        embeds: allData.map((game) => footballGameEmbed(game)),
      });
    } catch (error) {
      interaction.reply(`Something went wrong: ${error.message}`);
    }
  },
};

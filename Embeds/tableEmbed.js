const { EmbedBuilder } = require("discord.js");

const tableEmbed = (data) => {
  return new EmbedBuilder()
    .setTitle("Serie A Table")
    .setThumbnail(data.competition.emblem)
    .setFields([
      {
        name: "Table",
        value: data.standings[0].table
          .map((team) => {
            return `${team.position}. ${team.team.shortName} - ${team.points} pts`;
          })
          .join("\n"),
      },
    ]);
};

module.exports = { tableEmbed };

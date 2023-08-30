const { EmbedBuilder } = require("discord.js");

const footballGameEmbed = (data) => {
  const milanWon = (data) => {
    if (data.status !== "FINISHED") return " ";
    if (
      data.score.winner === "HOME_TEAM" &&
      data.homeTeam.shortName === "Milan"
    )
      return "✅";
    if (
      data.score.winner === "AWAY_TEAM" &&
      data.awayTeam.shortName === "Milan"
    )
      return "✅";
    else return "❌";
  };

  return new EmbedBuilder()
    .setTitle("AC Milan")
    .setDescription(milanWon(data))
    .setThumbnail(data.awayTeam.crest)
    .setFields([
      {
        name: `${data?.homeTeam?.shortName} vs ${data?.awayTeam?.shortName}`,
        value: " ",
      },
      {
        name: "Date",
        value:
          `${data?.utcDate.slice(0, 10)} ${data?.utcDate.slice(11, 16)}` ||
          "TBD",
      },
      {
        name: data?.status === "FINISHED" ? "Score" : " ",
        value:
          data?.status === "FINISHED"
            ? `${data?.score?.fullTime?.home} - ${data?.score?.fullTime?.away}`
            : " ",
      },
    ]);
};

module.exports = footballGameEmbed;

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("se")
    .setDescription("Pong!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //Example of an admin command

  execute(interaction) {
    interaction.reply({ content: "Pong!", ephemeral: true });
  },
};

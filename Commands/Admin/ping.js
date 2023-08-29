const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("Super secret admin command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //Example of an admin command

  execute(interaction) {
    interaction.reply({ content: "Pong!", ephemeral: true });
  },
};

require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const {
  Guilds,
  GuildMembers,
  GuildMessages,
  MessageContent,
  GuildEmojisAndStickers,
  GuildInvites,
  GuildModeration,
  GuildMessageReactions,
} = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildMessages,
    MessageContent,
    GuildEmojisAndStickers,
    GuildInvites,
    GuildModeration,
    GuildMessageReactions,
  ],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();

client.login(process.env.BOT_TOKEN).then(() => {
  loadCommands(client), loadEvents(client);
});

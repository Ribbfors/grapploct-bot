const { EmbedBuilder } = require("discord.js");
const capitalizeName = require("../utils/capitalizeName.js");
const trimWeightHeight = require("../utils/trimWeightHeight.js");

const pokemonEmbed = (data) => {
  return new EmbedBuilder()
    .setTitle(data.name.charAt(0).toUpperCase() + data.name.slice(1))
    .setDescription(`No. ${data.id}`)
    .setThumbnail(data?.sprites?.front_default)
    .setFields([
      {
        name: `Type${data.types[1] ? "s" : ""}`,
        value: `${capitalizeName(data.types[0].type.name)}${
          data.types[1] ? "/" + capitalizeName(data.types[1].type.name) : ""
        }`,
      },

      {
        name: `${data.abilities[1] ? "Abilities" : "Ability"}`,
        value: `${capitalizeName(data.abilities[0].ability.name)}${
          data.abilities[1]
            ? "/" + capitalizeName(data.abilities[1].ability.name)
            : ""
        }`,
      },
      {
        name: "Height",
        value: `${trimWeightHeight(data.height)}m`,
      },
      {
        name: "Weight",
        value: `${trimWeightHeight(data.weight)}kg`,
      },
      {
        name: "Stats",
        value: `HP: ${data.stats[0].base_stat}\nAttack: ${data.stats[1].base_stat}\nDefense: ${data.stats[2].base_stat}\nSpecial Attack: ${data.stats[3].base_stat}\nSpecial Defense: ${data.stats[4].base_stat}\nSpeed: ${data.stats[5].base_stat}`,
      },
    ]);
};

module.exports = pokemonEmbed;

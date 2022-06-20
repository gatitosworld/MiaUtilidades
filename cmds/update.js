const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { DiscordAPIError, MessageEmbed } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("actualizar")
        .setDescription("Refresca los comandos mediante REST.")
        .setDMPermission(true),
    async execute(interaction) {
    
            if(interaction.user.id !== "620359406537670677") return interaction.reply({ embeds: [new MessageEmbed().setTitle("¡No puedes ejecutar esto!").setColor("RED")], ephemeral: true})

    }
}
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whitelist")
        .setDescription("Agrega un enlace a la whitelist en la API.")
        .addStringOption(option => 
            option.setName("enlace")
            .setDescription("Agrega el enlace en sí: ponerlo sin HTTP o HTTPS.")
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages, PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(db, interaction) {

        const whitelist = db.table('wl');
        await whitelist.set('wl', ['discord.com', 'discord.gift']);

        const wloutput = await whitelist.get('wl');

        interaction.reply({ content: "a"+wloutput })


    }
        
}
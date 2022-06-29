const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed } = require("discord.js");
const gw = require("gatitosworld-api");
const ajustes = require("../../../config");

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

    let enlace = interaction.options.getString("enlace");
    let link = gw.links(enlace);
    
    const embed_yaesta = new MessageEmbed()
        .setTitle(`Parece que el término ${enlace} ya se encuentra en la base de datos.`)
        .setColor(ajustes.colores.incorrecto)
    
    const embed_nolink = new MessageEmbed()
        .setTitle("Hey! Pon únicamente la página sin los HTTP(S) o //")
        .setColor(ajustes.colores.incorrecto);

    if(link) return interaction.reply({ embeds: [embed_nolink], ephemeral: true });
    
    
    const whitelist = db.table("whitelist");
    let uwu = await whitelist.get('wl'); // Array
    let arrayastring = uwu.join(', ');
    
    await whitelist.push('wl', enlace);
    
    const embed_correcto = new MessageEmbed()
        .setTitle(`Se ha añadido ${enlace} correctamente.`)
        .setDescription(`${arrayastring}`)
        .setColor(ajustes.colores.correcto);
    
    interaction.reply({ embeds: [embed_correcto], ephemeral: true })

        

    }
        
}
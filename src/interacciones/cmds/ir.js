const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed, MessageButton } = require("discord.js");
const manager = require("../../../manager");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ir")
        .setDescription("Ir al canal de voz de un usuario determinado.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option => option.setName("usuario").setDescription("Te mueve al canal en el que se encuentra un usuario.").setRequired(true)),

    async execute(interaction, client) {
        const soporte1 = client.channels.cache.get("935623143421251744");
        const soporte2 = client.channels.cache.get("984943509503090708");

        let miembro = interaction.options.getMember("usuario");
        let yo = interaction.member;


        let vc_ir = miembro.voice.channel;
        let vc_volver = yo.voice.channel;
        manager.post("vc_volver/ir", vc_volver);
        manager.post("miembro_ir", miembro);

        const embed = new MessageEmbed()
            .setTitle("¿Está realmente seguro de que quiere hacer esto?")
            .setColor("#4373d1");
        const ir_btn = new MessageButton()
            .setCustomId("ir_btn")
            .setStyle("PRIMARY")
            .setEmoji("845983633134059520")
            .setLabel("Ir")
        const volver_btn = new MessageButton()
            .setCustomId("volver_btn")
            .setStyle("SECONDARY")
            .setEmoji("↩️")
        const ir_soporte1 = new MessageButton()
            .setCustomId("ir_soporte1")
            .setStyle("DANGER")
            .setEmoji("990780011298566174")
            .setLabel("Soporte")
        const ir_soporte2 = new MessageButton()
            .setCustomId("ir_soporte2")
            .setStyle("DANGER")
            .setEmoji("990780011298566174")
            .setLabel("Soporte")
        

        interaction.reply({ embeds: [], components: [] })

    }

}
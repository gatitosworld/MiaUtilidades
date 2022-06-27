const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
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
        let vc_volver = yo.voice.channel; // Canal de voz en el que estaba antes de ser movido
        manager.post("vc_volver/ir", vc_volver); // ^ se guarda en la base de datos temporal
        manager.post("miembro_ir", miembro); // Se guarda el miembro mencionado en la interacción para actuar con él en los botones

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
            .setLabel("Soporte 1")
        const ir_soporte2 = new MessageButton()
            .setCustomId("ir_soporte2")
            .setStyle("DANGER")
            .setEmoji("990780011298566174")
            .setLabel("Soporte 2")

        const ir_row = new MessageActionRow()
            .addComponents(ir_btn)
            .addComponents(volver_btn)
            .addComponents(ir_soporte1)
            .addComponents(ir_soporte2)

        interaction.reply({ embeds: [embed], components: [ir_row] });

    }

}